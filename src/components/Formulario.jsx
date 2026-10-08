import { useState, useEffect } from 'react';
import ListaUsuarios from './ListaUsuarios';

function Formulario() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
  const [provincia, setProvincia] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');

  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const usuariosGuardados = localStorage.getItem('usuarios');

    if (usuariosGuardados) {
      setUsuarios(JSON.parse(usuariosGuardados));
    }
  }, []);

  const eliminarUsuarios = () => {
    localStorage.removeItem('usuarios');
    setUsuarios([]);
    setMensajeExito('');
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    const nuevosErrores = {};
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nombre.trim() === '') {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }

    if (apellido.trim() === '') {
      nuevosErrores.apellido = 'El apellido es obligatorio';
    }

    if (email.trim() === '') {
      nuevosErrores.email = 'El email es obligatorio';
    } else if (!emailValido.test(email)) {
      nuevosErrores.email = 'El email no es válido';
    }

    if (edad === '') {
      nuevosErrores.edad = 'La edad es obligatoria';
    } else if (edad < 18 || edad > 100) {
      nuevosErrores.edad = 'La edad debe estar entre 18 y 100 años';
    }

    if (provincia === '') {
      nuevosErrores.provincia = 'Seleccioná una provincia';
    }

    if (password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (confirmarPassword !== password) {
      nuevosErrores.confirmarPassword = 'Las contraseñas no coinciden';
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      const nuevoUsuario = {
        nombre,
        apellido,
        email,
        edad,
        provincia,
      };

      const usuariosActualizados = [...usuarios, nuevoUsuario];

      setUsuarios(usuariosActualizados);

      localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));

      setMensajeExito('¡Registro realizado correctamente!');
    } else {
      setMensajeExito('');
    }
  };

  return (
    <form onSubmit={manejarEnvio}>
      <div className="campo">
        <label>Nombre:</label>

        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        {errores.nombre && <span className="error">{errores.nombre}</span>}
      </div>

      <div className="campo">
        <label>Apellido:</label>

        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />

        {errores.apellido && <span className="error">{errores.apellido}</span>}
      </div>

      <div className="campo">
        <label>Email:</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {errores.email && <span className="error">{errores.email}</span>}
      </div>

      <div className="campo">
        <label>Edad:</label>

        <input
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />

        {errores.edad && <span className="error">{errores.edad}</span>}
      </div>

      <div className="campo">
        <label>Provincia:</label>

        <select
          value={provincia}
          onChange={(e) => setProvincia(e.target.value)}
        >
          <option value="">Seleccioná una provincia</option>
          <option value="buenos-aires">Buenos Aires</option>
          <option value="cordoba">Córdoba</option>
          <option value="santa-fe">Santa Fe</option>
          <option value="mendoza">Mendoza</option>
          <option value="entre-rios">Entre Ríos</option>
        </select>

        {errores.provincia && (
          <span className="error">{errores.provincia}</span>
        )}
      </div>

      <div className="campo">
        <label>Contraseña:</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errores.password && <span className="error">{errores.password}</span>}
      </div>

      <div className="campo">
        <label>Confirmar contraseña:</label>

        <input
          type="password"
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
        />

        {errores.confirmarPassword && (
          <span className="error">{errores.confirmarPassword}</span>
        )}
      </div>

      <button type="submit">Registrarse</button>

      {mensajeExito && <p className="exito">{mensajeExito}</p>}
      {usuarios.length > 0 && (
        <ListaUsuarios
          usuarios={usuarios}
          eliminarUsuarios={eliminarUsuarios}
        />
      )}
    </form>
  );
}

export default Formulario;
