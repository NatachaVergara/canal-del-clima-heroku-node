// Tu codigo JS va acá
let inputCiudad = document.getElementById('ciudad')
let btn = document.querySelector('.btn')


let textoCiudad = document.querySelector('#texto-ciudad')

let temperatura = document.querySelector('#temperatura')

let icono = document.querySelector('#icono')


let pronostico = document.querySelector('#pronostico')

let humedad = document.querySelector('#humedad')

let viento = document.querySelector('#viento')


// //Llamar a la informacion de la api de
const peticionClima = async (ciudad) => {
    //guardo la api en una variable
    const url = `/api?q=${ciudad}`
    //espero a la respuesta y la guardo en la variable
    const res = await fetch(url)
    //transformo los datos en .json para poder ser trabajados mas adelante
    const data = await res.json()

    //Si la informacion ingresada en ciudad no es valida, al usuario le avisa con un alerta
    if (data.cod === '404') {
        alert('No se encontró la ciudad')
        inputCiudad.value = ""
        return
    }

    //guardo los datos provenientes de la api en un objeto
    const mostrarData = {
        ciudad: data.name,
        pronostico: `${data.weather[0].description}`,
        temperatura: `${kelvinACelcius(data.main.temp)}°`,//
        humedad: `${data.main.humidity}%`,
        viento: data.wind.speed
    }

    //envio los datos del objeto en forma de callback
    mostrarDataHtml(mostrarData)


}
//convierto la temperatura a Celcius
const kelvinACelcius = (temp) => {
    temp = parseFloat(temp)
    return temp = Math.ceil(temp - 273.15)
}



let mostrarDatos = document.querySelector('.mostrarData')
//innetHTML, llamo al callback y presento los datos dentro de un temple literal
const mostrarDataHtml = (data) => {
    mostrarDatos.innerHTML = `
    <div class="city-name">
                    <p class="text-center display-4" id="texto-ciudad">${data.ciudad} </p>
                </div>
                <div
                    class="mx-auto text-center circle-weather d-flex flex-column justify-content-center align-items-center">
                    <p class="h4" id="temperatura">${data.temperatura}</p>
                    <img class="w-50" id="icono" src="http://openweathermap.org/img/w/04n.png" alt="">
                    <p id="pronostico">${data.pronostico}</p>
                </div>
                <!-- fin -->

                <!-- humedad y viento -->
                <div class="row mx-auto w-50 my-5">
                    <div class="col-6 text-end">
                        <p>Humedad</p>
                    </div>
                    <div class="col-6">
                        <p id="humedad">${data.humedad}</p>
                    </div>
                    <div class="col-6 text-end">
                        <p>Viento</p>
                    </div>
                    <div class="col-6">
                        <p id="viento">${data.viento}</p>
                    </div>
                </div>  

    `

    //borro el campo de busqueda
    inputCiudad.value = ""
}
//creo el evento click para mostrar los datos obtenidos. 
btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputCiudad.value === "") {
        alert('No ha ingresado una ciudad')
    } else {
        peticionClima(inputCiudad.value)
    }

})
//El mapa siempre empieza con Buenos aires
peticionClima('Buenos aires')


