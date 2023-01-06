const info=data.events;
const params= new URLSearchParams(location.search) ;
const id=params.get('id');
const contenedor=document.getElementById('main__Detail');
let  parametro =(info[id-1])
cardgeneratord(parametro)

function cardgeneratord(elemento){ 
    contenedor.innerHTML = ''
        let bcardet=document.createElement('div');
        bcardet.innerHTML= ` <img class="detail__img" src="${elemento.image}"
        alt="logo">

        <div>
        <p><b>Name: </b>${elemento.name}</p>
        <p><b>Date: </b>${elemento.date}</p>
        <p><b>Description:</b> ${elemento.description},</p>
        <p><b>Category:</b>  ${elemento.date}</p>
        <p><b>Place:</b>${elemento.place}</p>
        <p><b>Capacity:</b>${elemento.capacity}</p>
        <p><b>Assistance:</b> ${elemento.assistance}</p>
        <p><b>Price:</b> ${elemento.price}</p>
       </div>`

                contenedor.appendChild(bcardet);
    }
