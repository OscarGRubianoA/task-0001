
function filtros() {
    if (arrayfiltrado.length != 0) {
        imprimir(arrayfiltrado, 'main__container');
    } else {
        imprimir(arrayfiltrado, 'main__container');
    }
}
filtros()
function categoryfilter(datacheck) {
    let checksactive = Array.from(document.querySelectorAll("input[type='checkbox']"))
    let checkactive = checksactive.filter(checkbox => checkbox.checked)
    
    let checkboxValue = checkactive.map(checkbox => checkbox.value)
   
    let fcategory = datacheck.filter(dat => checkboxValue.includes(dat.category));
    
    if (fcategory.length) {
        return fcategory
    }
    return datacheck

}
