// Tu codigo JS va acá
let inputCiudad = document.getElementById('ciudad')
let btn = document.querySelector('.btn')


let textoCiudad = document.querySelector('#texto-ciudad')

let temperatura = document.querySelector('#temperatura')

let icono = document.querySelector('#icono')


let pronostico = document.querySelector('#pronostico')

let humedad = document.querySelector('#humedad')

let viento = document.querySelector('#viento')
//creo una variable coon mi api, de esta forma se lee mejor en la ruta
const api = `a89dac52a766017467944b8f47420333`;


//Forma 1 con async/await

// //Llamar a la informacion de la api de
const peticionClima = async (ciudad) => {
    //guardo la api en una variable
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${api}&lang=sp`
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
        temperatura: `${data.main.temp}°`,
        humedad: `${data.main.humidity}%`,
        viento: data.wind.speed
    }

    //envio los datos del objeto en forma de callback
    mostrarDataHtml(mostrarData)


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


//Forma 2 solo con fetch

//creo una funcion que al hacer click en buscar me va a realizar una busqueda por api 

// const peticionClima = () => {git 
//     btn.addEventListener('click', () => {



//         //dentro de la url ingreso la variable que el usuario ingresa en el campo de ciudad  y ademas la api key
//         fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCiudad.value}&units=metric&appid=${api}&lang=sp`)
//             .then(res => res.json())
//             .then(data => {
//                 //con el resultado de la data empiezo a ingresar los datos en mi innerHTML
//                 console.log(data)
//                 textoCiudad.innerHTML = data.name
//                 pronostico.innerHTML = data.weather[0].description
//                 temperatura.innerHTML = `${data.main.temp}°`

//                 let imgIcono = data.weather[0].icon
//                 icono.innerHTML = `<img class="w-50" id="icono" src=http://openweathermap.org/img/w/${imgIcono}.png" alt="imagen del clima ${data.weather[0].description}">
//                 `
//                 humedad.innerHTML = `${data.main.humidity}%`
//                 viento.innerHTML = data.wind.speed

//             })
//             .catch(err => console.log(err))

//         //borro el campo de busqueda
//         inputCiudad.value = ""



//     }

//     )}
// peticionClima()