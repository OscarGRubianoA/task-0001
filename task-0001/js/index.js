const contenedor = document.getElementById("main__container");

function createCard(element, array) {

    for (let event of array.events) {
        element.innerHTML += `<section>
        <img src='${event.image}' alt="${event.name}">
        <h5>${event.name}</h5>
        <p>${event.description}</p>
        <div>
        <p>${event.price}</p>
        <button>Read more...</button>
        </div>
        </section>`
    
    }
}

createCard(contenedor, data);
