$(document).ready(function(){
    $('#table_users').DataTable();
});

// Obtener todos los botones "Change Rol"
const changeRoleButtons = document.querySelectorAll('button[data-user-id]');

// Agregar un controlador de eventos a cada botón
changeRoleButtons.forEach(button => {
  button.addEventListener('click', async () => {
    // Obtener el ID del user desde el atributo "data-user-id"
    const userId = button.getAttribute('data-user-id');
    console.log(userId);

    try {
      // Enviar una solicitud PUT al servidor para cambiar el rol del usuario
      const response = await fetch(`/api/users/premium/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Manejar la respuesta del servidor
      const data = await response.json();
      if (response.ok) {
        // El rol se cambió exitosamente
        console.log('Role changed');
      } else {
        // Ocurrió un error
        console.log('Error changing role: ', data.error);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  });
});