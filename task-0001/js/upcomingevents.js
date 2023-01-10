/* const contenedor = document.getElementById("main__container");



const checkselec = document.getElementById('category__container');
const checkmenu = document.getElementById('menu');
const formsearch = document.forms[0];//formulario en cada pagina
const selection = document.querySelector('a[href="#"]').id;

let upcomingevents;
let pastevents;
let events;
let date;
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((response) => {
    let data = response;

    date = data.currentDate;
    events = data.events;
    upcomingevents = events.filter((event) => event.date > date);
    pastevents = events.filter((event) => event.date < date);
    
    checksgenerator(arraycategorys(events));
    imprimir(upcomingevents);
    formsearch.addEventListener("submit", (e) => {
  e.preventDefault();
  let tex = formsearch[0].value;
  let varserchfilter = serchfilter(tex, upcomingevents);
  imprimir(categoryfilter(varserchfilter));
});

  })
  .catch((error) => console.log(error));

function arraycategorys(data){
    let arr=[];
    data.forEach(events =>arr.push(events.category));const dataarr= new Set(arr);let arraycategory=[...dataarr];
    return arraycategory;
}
function checksgenerator(rcategorys){
    checkmenu.innerHTML=''
    checkselec.innerHTML=''
    rcategorys.forEach(element => {
        let limenu=document.createElement('li');
        let divselec=document.createElement('div');
        limenu.innerHTML=`<div>
        <input type="checkbox" name="${element}" id="checboxfrom" value="${element}" />
        <label for="${element}">${element}</label></div>` 
        divselec.innerHTML= `<input type="checkbox" name="${element}" id="checboxfrom" value="${element}">
        <label for="${element}">${element}</label>` 
        checkmenu.appendChild(limenu) ;
        checkselec.appendChild(divselec);
    }); 
}
/* function datefilterid(selec,data,fecha){ 
    if(selec=="up"){
        let eventsfilter=data.filter((dat) => dat.date>=fecha);
        return eventsfilter;}else if(selec=="past"){
        let eventsfilter=data.filter((date) => date.date<=fecha);
        return eventsfilter; }else{
            return eventsfilter=data;
        };
}; */
    ///-------------------function filter-serch---------------------//
/* function serchfilter(serchtex,dataserch){
    let evserchfilter=dataserch.filter((evento) =>evento.name.toLowerCase().includes(serchtex.toLowerCase()))
    return evserchfilter;
} 
  ///-------------------function filter-categorys---------------------//
function categoryfilter(datacheck){
    let checksactive= Array.from(document.querySelectorAll("input[type='checkbox']"))
    let checkactive=checksactive.filter(checkbox=>checkbox.checked)
    console.log(datacheck)
    let checkboxValue=checkactive.map(checkbox=>checkbox.value)
    console.log(checkboxValue)
    let fcategory=datacheck.filter(dat => checkboxValue.includes(dat.category));
    console.log(fcategory)
    if(fcategory.length){
        return fcategory
    }
    return datacheck
    
}

function imprimir(array){
contenedor.innerHTML = ""
  
    if (array.length == 0) {
       // imprima algo que diga que no hay elementos
        let cartelito = document.createElement('div')
        cartelito.className = 'cartelito '
        cartelito.innerHTML =  `<img id="er404"src="https://www.tuexperto.com/wp-content/uploads/2019/03/error-404-not-found.jpg" alt="">`
        contenedor.appendChild(cartelito)
    }else{
      array.forEach(carta => {
      let divCard = document.createElement("div")
    divCard.className= "card cartas filtro-serch"
    divCard.innerHTML =`<section>
    <img src='${carta.image}' alt="${carta.name}">
    <h5>${carta.name}</h5>
    <p>${carta.description}</p>
    <div>
    <p>${carta.price}</p>
    <button>Read more...</button>
    </div>
    </section>`

      contenedor.appendChild(divCard)
    })
    }
}
   */
const $cards = document.getElementById("main__container");
const $search = document.getElementById("search");
const $categorys = document.getElementById("menu");
// Async
let eventos;
let fecha;
let future;
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(data => data.json())
  .then(data => {
    fecha = data.date
    eventos = data.events;
    future = eventos.filter((event) => event.date > fecha);
    crearCheckbox(future, $categorys)
    imprimirCards(future, $cards)
    $search.addEventListener('keyup', filtrar)
    $categorys.addEventListener('change', filtrar)
  })
  .catch(error => console.log(error));

// DOM | CheckBox
function crearCheckbox(eventos, contenedor) {
  let fn = eventos => eventos.category
  let categorias = new Set(eventos.filter(fn).map(fn))
  categorias.forEach(par => {
    contenedor.innerHTML += `
    <label class="form-check-label" for="${par}">
    <input class="form-check-input" value="${par}" type="checkbox" role="switch" id="${par}">${par}
    </label>
    `
  })
}

function crearCard(eventos) {
  let div = document.createElement('DIV')
  div.classList = 'class="card cardD'
  div.style = 'width: 14rem'
  div.innerHTML += `
    <img src="${eventos.image}" class="card-img-top" alt="${eventos.name}"/> 
    <div class="card-body">
    <h5 class="card-title">${eventos.name}</h5>
    <p class="card-text">${eventos.description}</p>
    <a class="btn btn-dark">U$D ${eventos.price}</a>
    <a href="./onlycard.html?id=${eventos.id}" class="btn btn-danger">See more</a>
    </div> 
    `
  return div
}
function imprimirCards(eventos, contenedor) {
  contenedor.innerHTML = ''
  if (eventos.length > 0) {
    let fragment = document.createDocumentFragment()
    eventos.forEach(eventos => fragment.appendChild(crearCard(eventos)))
    contenedor.appendChild(fragment)
  }
  else {
    contenedor.innerHTML = `<h2>Sin coincidencias...</h2>`
  }
}

function filtrar() {
  let checked = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(ele => ele.value)
  let filtradosPorCategoria = future.filter(eventos => checked.includes(eventos.category) || checked.length == 0)
  let filtradosPorSearch = filtradosPorCategoria.filter(value => value.name.toLowerCase().includes($search.value.toLowerCase()))
  imprimirCards(filtradosPorSearch, $cards)
}

/* function createCard(element, array) {

    for (let event of array) {

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

createCard(contenedor, upcomingevents);  */