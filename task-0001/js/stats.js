//DOM
let $row1 = document.getElementById('row1')
let $row2 = document.getElementById('row2')
let $row3 = document.getElementById('row3')

//Declaraciones
// Declaraciones
let eventosFuturos;
let eventosPasados;

// API
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((data) => data.json())
  .then((data) => {
    // Data Storage
    let eventos = data.events;
    let fechaActual = data.currentDate;

    // Filtros
    eventosFuturos = eventos.filter((objeto) => objeto.date > fechaActual);
    eventosPasados = eventos.filter((objeto) => objeto.date < fechaActual);

    // Funciones ejecutadas
    logicaTablaUno();
    logicaTablas(eventosFuturos, "estimate", $row2);
    logicaTablas(eventosPasados, "assistance", $row3);
  })
  .catch((error) => console.log(error));

function printTableOne(container, prop2, prop1, prop3) {
  // El container lo traigo por parámetro para que sea dinámico, al igual que las propiedades.
  container.innerHTML += `
    <tr>
      <td>${prop1[0].name} with ${prop1[0].percentageAssitance.toFixed(2)}%.</td>
      <td>${prop2[0].name} with ${prop2[0].percentageAssitance.toFixed(2)}%.</td>
      <td>${prop3[0].name} with ${prop3[0].capacity.toLocaleString()}.</td>
    </tr>
    `;
}

function logicaTablaUno() {
  // Agrego una propiedad nueva al array de eventos pasados
  eventosPasados.map((i) => {
    i.percentageAssitance = (i.assistance / i.capacity) * 100;
  });

  // Ordeno los arrays de menor a mayor y mayor a menor
  let minorAssistance = [...eventosPasados].sort(
    (a, b) => a.percentageAssitance - b.percentageAssitance
  );
  let majorAssistance = [...eventosPasados].sort(
    (a, b) => b.percentageAssitance - a.percentageAssitance
  );
  // Esto es para que me ordene por mayor capacidad.
  let majorCapacity = [...eventosPasados].sort(
    (a, b) => b.capacity - a.capacity
  );
  // Llamo a la función que imprime la tabla
  printTableOne($row1, minorAssistance, majorAssistance, majorCapacity);
}

function printTables(container, array) {
  // Esta función imprime la tabla de los eventos futuros y pasados
  array.forEach((e) => {
    // El container lo traigo por parámetro para que sea dinámico, al igual que las propiedades.
    container.innerHTML += `
    <tr>
      <td>${e.category}</td>
      <td>$${e.earn.toLocaleString()}</td>
      <td>${e.percentageAssitance.toFixed(2)}%</td>
    </tr>
    `;
  });
}
function logicaTablas(typeEvent, prop, container) {
  // El metodo map me permite agregar una propiedad nueva al array que me llega
  eventosFuturos.map((i) => {
    i.percentageAssitance = (i.estimate / i.capacity) * 100;
  });
  // Esto agrega dos propiedades nuevas al array que me llega
  typeEvent.map((e) => {
    e.earn = e[prop] * e.price;
  });
  // Llamo a la función que imprime la tabla
  printTables(container, typeEvent);

}

