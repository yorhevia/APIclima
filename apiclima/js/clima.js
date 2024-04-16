//crear selectores
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const contenedor = document.querySelector('.container');

//eventoss

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit',buscarClima)
})

function buscarClima(e){
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    ///console.log(ciudad,pais)
   if(ciudad==='' || pais===''){
    //console.log('campos vacio')
    mostrarError('los campos son obligatorios')
   }else{
   // console.log('campos llenas')
   consultarAPI(ciudad,pais);
   }
  
    

}



function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100')
   // console.log(alerta)
   if(!alerta){

    //console.log(mensaje)
    const alertaMsj = document.createElement('div');

    alertaMsj.classList.add('bg-red-100','text-center', 'mt-6', 'px-4', 'py-3', 'mx-auto', 'text-red-700', 'rounded');
    alertaMsj.innerHTML = `
    <strong class="font-bold">Error</strong>
    <span>${mensaje} </span>
    `
    contenedor.appendChild(alertaMsj);
    
    setTimeout(()=>{
        alertaMsj.remove()
    },3000)
   
   }
}

function consultarAPI(ciudad,pais){
    const appid = 'd6f981ad3ea28ea444c81eabe8cae7c1';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`
    Spinner();
    fetch(url)
  .then(resultado => {return resultado.json()})
  .then(datos =>  {
        console.log(datos)
        if(datos.cod === '404'){
            mostrarError('La ciudad no ha sido encontrada, ingrese una ciudad valida');
        }else{
            limpiarHTML()
            mostrarClima(datos)
        }
    })
    .catch(error=>{console.log(error)})

}

function mostrarClima(infoClima){
    console.log(infoClima)
    const {name,main:{temp,temp_max,temp_min}} = infoClima

    const tempA = kelvinC(temp)
    const min = kelvinC(temp_min)
    const max = kelvinC(temp_max
    )

    // MOSTRAR en el html
    
    const nombreCiudad = document.createElement('p')
    nombreCiudad.classList.add('font-bold','text-2xl')
    nombreCiudad.innerHTML = `Clima en la ciudad: ${name}`

    const tempActual = document.createElement('p')
    tempActual.classList.add('font-bold','text-6xl')
    tempActual.innerHTML = `Actual: ${tempA}  &#176 C`

    const tempMin = document.createElement('p')
    tempMin.classList.add('text-xl')
    tempMin.innerHTML = ` Minimo: ${min}  &#176 C`

    const tempMax = document.createElement('p')
    tempMax.classList.add('text-xl')
    tempMax.innerHTML = `Maximo: ${max} &#176 C`

    const res = document.createElement('div')
    res.classList.add('text-white', 'text-center')

    res.appendChild(nombreCiudad)
    res.appendChild(tempActual)
    res.appendChild(tempMin)
    res.appendChild(tempMax)

    resultado.appendChild(res)
   
    console.log(tempA)
}

function kelvinC(temperatura){
    return parseInt(temperatura - 273.15)
}

function limpiarHTML(){
    while(resultado.firstChild){
     resultado.removeChild(resultado.firstChild)
    }
}

function Spinner(){
    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML =  ` 
    <div class= "sk-circle1 sk-circle"></div>
    <div class= "sk-circle2 sk-circle"></div>
    <div class= "sk-circle3 sk-circle"></div>
    <div class= "sk-circle4 sk-circle"></div>
    <div class= "sk-circle5 sk-circle"></div>
    <div class= "sk-circle6 sk-circle"></div>
    <div class= "sk-circle7 sk-circle"></div>
    <div class= "sk-circle8 sk-circle"></div>
    <div class= "sk-circle9 sk-circle"></div>
    <div class= "sk-circle10 sk-circle"></div>
    <div class= "sk-circle11 sk-circle"></div>
    <div class= "sk-circle12 sk-circle"></div>
    `
    resultado.appendChild(divSpinner);
}
