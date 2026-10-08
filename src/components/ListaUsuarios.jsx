function ListaUsuarios({ usuarios, eliminarUsuarios }) {
  return (
    <div className="lista-usuarios">
      <h2>Usuarios registrados</h2>

      {usuarios.map((usuario, index) => (
        <div className="usuario" key={index}>
          <p>
            <strong>
              {usuario.nombre} {usuario.apellido}
            </strong>
          </p>

          <p>Email: {usuario.email}</p>
          <p>Edad: {usuario.edad}</p>
          <p>Provincia: {usuario.provincia}</p>
        </div>
      ))}

      <button
        type="button"
        className="boton-eliminar"
        onClick={eliminarUsuarios}
      >
        Eliminar usuarios
      </button>
    </div>
  );
}

export default ListaUsuarios;
