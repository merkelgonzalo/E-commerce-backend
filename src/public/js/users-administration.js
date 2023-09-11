$(document).ready(function(){
    $('#table_users').DataTable();
});

// Obtener todos los botones "Change Rol"
const changeRoleButtons = document.querySelectorAll('button[data-user-id-changerole]');
const deleteButtons = document.querySelectorAll('button[data-user-id-delete]');

// Agregar un controlador de eventos a cada botón de modificar rol
changeRoleButtons.forEach(button => {
  button.addEventListener('click', async () => {
    // Obtener el ID del user desde el atributo "data-user-id-changerole"
    const userId = button.getAttribute('data-user-id-changerole');

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

// Agregar un controlador de eventos a cada botón de delete user
deleteButtons.forEach(button => {
  button.addEventListener('click', async () => {
    // Obtener el ID del user desde el atributo "data-user-id-delete"
    const userId = button.getAttribute('data-user-id-delete');

    try {
      // Enviar una solicitud DELETE al servidor para eliminar el usuario
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Manejar la respuesta del servidor
      const data = await response.json();
      if (response.ok) {
        // El usuario se eliminó exitosamente
        console.log('User deleted');
      } else {
        // Ocurrió un error
        console.log('Error deleting user: ', data.error);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  });
});