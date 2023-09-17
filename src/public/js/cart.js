// Obtener el elemento que contiene el valor del cartId
const cartIdElement = document.getElementById('cartId');
// Obtener el valor de cartId
const cartId = cartIdElement.innerText;

const buyButton = document.getElementById("buyButton");

buyButton.addEventListener('click', e =>{
    e.preventDefault();

    try {
      // Enviar una solicitud POST al servidor para finalizar la compra
      fetch(`/api/carts/${cartId}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async result=>{
        if(result.status == 200){
          const data = await result.json();
          const ticketId = data.payload._id;
          window.location.replace(`/tickets/${ticketId}`);
        }
      });
    } catch (error) {
      console.log('Error:', error);
    }
});