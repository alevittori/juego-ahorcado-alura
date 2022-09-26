// palabra completada
var palabra_completa = false;

// palabra a completar
var palabra_a_completar = 0;

//palabra sorteada
var palabra_sorteada;

// transforma la palabra sorteada en guiones por cada caracter qu eocntenga la msima
var palabra_sorteada_conGuiones;

//Caja de letras seleccionadas que no estan en la palabra sorteada
var letras_seleccionadas = "";

// letra seleccionada por el usuario
var letra_usuario = "";

// conjunto de letras validas para el juego
const letras_validas = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

//Caja de indices obtenidos
var indices_obtenidos = [];

// canvas de la palabra sorteada
var canvas_palabra;
var ctx_palabra;
// canvas_palabra = document.getElementById("canvas_palabra");
// ctx_palabra = canvas_palabra.getContext('2d');

//canvas del muñeco
var canvas_muneco;
var ctx_muneco;
canvas_muneco = document.getElementById("canvas_muneco");
ctx_muneco = canvas_muneco.getContext("2d");

//variable para valdiar inicio de una neuva partida
var nueva_partida = false;
//variable para manejar el estado del muñeco
var estado = 1;

//Intentos
var intentos;

//Tamaño de pantalla
var tamanio_pantalla = [];

/*********** FUNCIONES ************** */

//FUNCION PARA SORTEAR PALABRA DE LA CAJA DE PALABRAS ESTABLECIDAS
function sortea_palabra() {
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];

    //guarda la palabra sorteada en la palabra con guiones
    // palabra_sorteada_conGuiones = palabra.replace(/./g, "_ ");

    //retorna la palabra sorteada
    return palabra;
}
//FUncion que reemplaza palbra sorteada por por guiones
function reemplaza_sorteada_por_guiones() {
    //guarda la palabra sorteada en la palabra con guiones
    palabra_sorteada_conGuiones = palabra_sorteada.replace(/./g, "_ ");
}
// Funcion que muestra en pantalla la palagra con guiones
function muestra_palabra(id_element) {
    document.getElementById(id_element).innerHTML = palabra_sorteada_conGuiones;
}
// palabra_sorteada = sortea_palabra();
// muestra_palabra('#palabra');

//FUncion que muestra en pantalla las letras que fueron ya clickeadas
function muestra_letras_preClickeadas(id_element) {
    // document.querySelector(id_element).innerHTML = letras_seleccionadas.join('');
    document.getElementById(id_element).innerHTML = letras_seleccionadas;
}

// Funcion que valida si no apreto una letra y convierte letra a mayuscula
function upLetra(letra) {
    return letra.toUpperCase();
}

//Funcion limpiar un array
function vacia_arreglo(arreglo) {
    arreglo = [];
}

// Funcion que valida si la letra esta en la caja de letras previamentes clickeadas.
function valida_letra_contra_preClickeadas(letra) {
    return letras_seleccionadas.includes(letra.toUpperCase()); //return true o false
}

//Funcion que valida si la letra clickeada forma parte de la palabra sorteda
function valida_letra_en_palabraSorteada(letra) {
    return palabra_sorteada.includes(letra.toUpperCase()); //return true o false
}

//Funcion que agrega letra a la caja de letras incorrectas
function agrega_letra_incorrecta(letra) {
    if (!valida_letra_contra_preClickeadas(letra.toUpperCase())) {
        letras_seleccionadas += upLetra(letra);
    }
}

// Funcion que guarda la  o las posiciones que coincidan con la letra clickeada en la palabra sorteada
function guarda_pos_de_letra_en_palabraSorteada(letra) {
    let p = Array.from(palabra_sorteada); //convertimos la plabra sorteada en un string para guardar su posicion
    if (valida_letra_en_palabraSorteada(letra)) {
        p.forEach((element, indice) => {
            if (element == letra.toUpperCase()) {
                indices_obtenidos.push(indice);
                palabra_a_completar.push(element); //ARREGLAR ESTO!
            }
        });
    }
}

// Funcion que dibuja los guiones de la palabra sorteada en el canvas
function dibuja_guion(x, y) {
    let canvas_palabra = document.getElementById("canvas_palabra");
    let ctx_palabra = canvas_palabra.getContext("2d");

    // color del traso
    ctx_palabra.strokeStile = dark_blue_300;
    // ctx_palabra.strokeStile = '#000000';

    // grosor de linea
    ctx_palabra.lineWidth = 2;
    // posicionamos el puntero con moveTo(x,y)
    ctx_palabra.moveTo(x, y);

    //trasamos la linea
    ctx_palabra.lineTo(x + 30, y);

    //rellenamos traso con stroke
    ctx_palabra.stroke();
}

// funcion que dibuja los guiones segun la cantidad de letras que contenga palabra sorteada
function dibuja_guiones() {
    let x = 30;
    for (let i = 0; i < palabra_sorteada.length; i++) {
        dibuja_guion(x, 50);
        x = x + 50;
    }
}
//Funcion que valida el  tamaño de pantalla acual
function obtenerTamanioActual() {
    let width = document.documentElement.clientWidth;
    let heigth = document.documentElement.clientHeight;
    let tamanio = [width, heigth];
    tamanio_pantalla[0] = width;
    tamanio_pantalla[1] = heigth;
    return tamanio;

}

//Uso: <body onload = 'obtenerTamanioActual();' onriseze = 'obtenerTamanioActual();'></body>

//funciona para dimensionar el canvas segun el tamaño de pantalla
function dimensiona_medidas_canvas() {

    // window.location.reload();
    obtenerTamanioActual();
    if (tamanio_pantalla[0] > 2000) {
        document.getElementById('canvas_muneco').width = tamanio_pantalla[0] * 0.35;

    } else if (tamanio_pantalla[0] > 1000 && tamanio_pantalla[0] < 2000) {
        document.getElementById('canvas_muneco').width = tamanio_pantalla[0] * 0.45;

    } else {
        document.getElementById('canvas_muneco').width = tamanio_pantalla[0] * 0.7;

    }
    document.getElementById('canvas_muneco').height = tamanio_pantalla[1] / 2;

    canvas_muneco = document.getElementById('canvas_muneco');
    ctx_muneco = document.getElementById('canvas_muneco').getContext('2d');

    dibuja_muneco(estado);

}
// Funcion para dibujar el muñeco
function dibuja_muneco(estado = 0, canvas_w = 320, canvas_h = 400) {
    // canvas_muneco = document.getElementById(id_canvas);
    // ctx_muneco = canvas_muneco.getContext('2d');
    // canvas_muneco.width = tamanio_pantalla[0];
    // canvas_muneco.heigth = tamanio_pantalla[1];
    canvas_w = canvas_muneco.width;
    canvas_h = canvas_muneco.height;

    ctx_muneco.lineWidth = 5;
    ctx_muneco.strokeStyle = dark_blue_500;
    ctx_muneco.lineCap = 'round';

    for (let i = 0; i <= estado; i++) {
        switch (i) {
            case 1:
                // base - estado inicial
                ctx_muneco.moveTo(canvas_w * 0.2, canvas_h * 0.8);
                ctx_muneco.lineTo(canvas_w * 0.8, canvas_h * 0.8);
                ctx_muneco.stroke();
                break;
            case 2:
                //mastil - estado 2
                ctx_muneco.moveTo(canvas_w * 0.3, canvas_h * 0.8);
                ctx_muneco.lineTo(canvas_w * 0.3, canvas_h * 0.15);
                ctx_muneco.stroke();
                break;
            case 3:
                //travesaño - estado 3
                ctx_muneco.moveTo(canvas_w * 0.3, canvas_h * 0.15);
                ctx_muneco.lineTo(canvas_w * 0.55, canvas_h * 0.15);
                ctx_muneco.stroke();
                break;
            case 4:
                //soga - estado 4
                ctx_muneco.moveTo(canvas_w * 0.55, canvas_h * 0.15);
                ctx_muneco.lineTo(canvas_w * 0.55, canvas_h * 0.25);
                ctx_muneco.stroke();
                break;
            case 5:
                //cabeza - estado 5
                // ctx_muneco.arc(x,y,radio,angulo_inicial,angulo_final,direccion_de_giro) el angulos es en radianes
                ctx_muneco.beginPath();
                ctx_muneco.arc(
                    canvas_w * 0.55,
                    canvas_h * 0.3,
                    canvas_h * 0.05,
                    0,
                    2 * Math.PI
                );
                ctx_muneco.stroke();
                break;
            case 6:
                //cuerpo - estado 6
                // ctx_muneco.beginPath();
                ctx_muneco.moveTo(canvas_w * 0.55, canvas_h * 0.35);
                ctx_muneco.lineTo(canvas_w * 0.55, canvas_h * 0.6);
                ctx_muneco.stroke();
                break;
            case 7:
                //pierna derecha - estado 7
                // ctx_muneco.beginPath();
                ctx_muneco.moveTo(canvas_w * 0.55, canvas_h * 0.6);
                ctx_muneco.lineTo(canvas_w * 0.5, canvas_h * 0.7);
                ctx_muneco.stroke();
                break;
            case 8:
                //pierna izquierda - estado 8
                // ctx_muneco.beginPath();
                ctx_muneco.moveTo(canvas_w * 0.55, canvas_h * 0.6);
                ctx_muneco.lineTo(canvas_w * 0.6, canvas_h * 0.7);
                ctx_muneco.stroke();
                break;
            case 9:
                //brazo derecho - estado 9
                // ctx_muneco.beginPath();
                ctx_muneco.moveTo(canvas_w * 0.55, canvas_h * 0.4);
                ctx_muneco.lineTo(canvas_w * 0.5, canvas_h * 0.5);
                ctx_muneco.stroke();
                break;
            case 10:
                //brazo izquierdo - estado 10
                // ctx_muneco.beginPath();
                ctx_muneco.moveTo(canvas_w * 0.55, canvas_h * 0.4);
                ctx_muneco.lineTo(canvas_w * 0.6, canvas_h * 0.5);
                ctx_muneco.stroke();
                break;
            case 0:
                ctx_muneco.clearRect(0, 0, 800, 800);
        }

    }
}

// Funcion para vacias caja de letras seleccionadas
function vacia_letras_usadas() {
    letras_seleccionadas = [];
}

// Funcion para obtener letra que se cliquea
function toma_letra(e) {
    let key = e.keyCode;
    let tecla = String.fromCharCode(key).toString();

    // letras especiales ( enter, retroceso)
    especiales = [8, 13]; //codigo ascii de las teclas enter y retroceso
    let tecla_especial = false;
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras_validas.indexOf(tecla) == -1 && !tecla_especial) {
        // alert("Debe precionar solo letras del abecedario");
        swal("Debe precionar solo letras del abecedario");

    } else {
        // guardamos la letra presionada por el usuario
        letra_usuario = tecla.toUpperCase();
        console.log(letra_usuario);
    }
}

// window.onkeydown = toma_letra;

// Funcion para dibujar una letra
function dibuja_letra(letra, x, y) {
    // canvas_palabra = document.getElementById("canvas_palabra");
    // ctx_palabra = canvas_palabra.getContext('2d');

    // color del traso
    ctx_palabra.strokeStile = dark_blue_300;
    // ctx_palabra.strokeStile = '#000000';

    // grosor de linea
    ctx_palabra.lineWidth = 2;
    //fuente y tamaño
    ctx_palabra.font = "35px Inter";

    // dibujamos letra
    ctx_palabra.fillText(letra, x, y);
}

// Funcion que dibuja la letra en el canvas, si la misma forma parte de la palabra sorteada
function dibuja_letra_en_canvas() {
    //receteamos el vector con las posiciones guardadas previaente
    vacia_arreglo(indices_obtenidos);
    //guardamos las nuevas posiciones
    guarda_pos_de_letra_en_palabraSorteada(letra_usuario);

    for (var i in indices_obtenidos) {
        dibuja_letra(letra_usuario, i * 10, 50);
    }
}

// Funcion que valida si la palabra se completo A
// function valida_palabra_completada_A(){
//     if(palabra_sorteada.length == palabra_a_completar.length){
//         return true
//     }else{
//         return false
//     }
// }

//Funcion Valida si se completo palabra comparando si quedaron sin reemplazar guiones
function valida_palabra_completa() {
    return palabra_sorteada_conGuiones.includes("_");
    // true si todavia no se completo
    // false si se completo
}
//Funcion para sustitur un caracter en una posicion
String.prototype.replaceAt = function (index, character) {
    return (
        this.substr(0, index) + character + this.substr(index + character.length)
    );
    //Uso: palabraConGuiones = paralabraConGuiones.replaceAt(i*2, letra);
};

// Funcion remplaza el guion por letra, si letra del usuario esta en palabra sorteada
function letra_por_guion_en_palabraSorteada() {
    for (const i in palabra_sorteada) {
        if (letra_usuario.toUpperCase() == palabra_sorteada[i]) {
            palabra_sorteada_conGuiones = palabra_sorteada_conGuiones.replaceAt(
                i * 2,
                letra_usuario.toUpperCase()
            );
        }
    }
}

//funcion agrega palabra nueva
function agrega_palabra_nueva(palabra) {

    palabras.push(palabra.toUpperCase());
}
//FUncion para dibujar fin del juego en pantalla
function gameover() {
    ctx_muneco.clearRect(0, 0, 2000, 2000);
    dibuja_muneco();
    ctx_muneco.font = "bold 25px Inter";
    ctx_muneco.textAlign = "center";
    ctx_muneco.fillStyle = "red";
    ctx_muneco.fillText("GAME OVER", (canvas_muneco.width / 2), (canvas_muneco.height / 2));
}
//funcion para cuando gana el juego
function gamewin() {
    ctx_muneco.clearRect(0, 0, 2000, 2000);
    dibuja_muneco();
    ctx_muneco.fillStyle = "green";
    ctx_muneco.textAlign = "center";
    ctx_muneco.font = "bold 25px Inter";
    ctx_muneco.fillText("GANASTE!!", (canvas_muneco.width / 2), (canvas_muneco.height / 2));

}

//Funcion que optiene del local store el nuevo array de palabras, si el usuario agrego palabras
function obtiene_palabras_del_LocalSotore() {
    if (localStorage.getItem("palabras")) {

        //obtengo el array como un string 
        let p = localStorage.getItem("palabras");
        //ahora lo convierto de nuevo en array 
        palabras = p.split(',');


    }

}
/****** LOGICA DEL JUEGO *******/

//Saca el cartel de iniciar juego, y con el clik del boton da comienzo a los otros parametros necesarios para comenzar la
function inicia_partida() {
    if (!nueva_partida) {
        // let opcion = confirm("Desea Iniciar nuevo juego?");
        // if (opcion) {
        //     document.getElementById("txt_iniciaJuego").style.display = "none";
        //     // document.getElementById("muneco-container").style.display = "block !important";

        //     nueva_partida = true;
        //     dibuja_muneco(0);

        //     // carga_parametros_iniciales();
        //     // dibuja_muneco('canvas_muneco',estado);
        //     btn_desistir.textContent = 'Desistir';
        // }
        swal({
                title: "Dese Iniciar Nuevo Juego?",
                // text: "Once deleted, you will not be able to recover this imaginary file!",
                // icon: "warning",
                buttons: true,
                // dangerMode: true,
            })
            .then((iniciar) => {
                if (iniciar) {
                    document.getElementById("txt_iniciaJuego").style.display = "none";
                    nueva_partida = true;
                    dibuja_muneco(0);
                    carga_parametros_iniciales();
                    btn_desistir.textContent = 'Desistir';
                } else {
                    return -1
                }
            });
    }

    // carga_parametros_iniciales();

}

//Funcion que recesetea todos los parametros.
function resetea_parametros() {
    palabra_completa = false;
    palabra_a_completar = 0;
    palabra_sorteada = "";

    palabra_sorteada_conGuiones = "";

    letras_seleccionadas = "";
    muestra_letras_preClickeadas("letras-elegidas");
    letra_usuario = "";
    indices_obtenidos = [];
    // canvas_palabra;
    // ctx_palabra ;

    //limpia canvas muneco por las dudas
    // ctx_muneco.clearRect(0, 0, 2000, 2000);
    dibuja_muneco();

    // canvas_muneco = document.getElementById("canvas_muneco");
    // ctx_muneco = canvas_muneco.getContext("2d");
    nueva_partida = false;
    estado = 1;
    intentos = 10;

    dimensiona_medidas_canvas();
}
//Funcion para iniciar las variables de juego
function carga_parametros_iniciales() {
    // limpia canvas muneco por las dudas
    ctx_muneco.clearRect(0, 0, 2000, 2000)

    // cargamos Array de palabras, y tomamos del local store si se llego a cargar alguna palabra nueva 
    obtiene_palabras_del_LocalSotore();


    //receteamos todos los parametros a cero
    resetea_parametros();

    //sorteamos una palabra a jugar secreta
    palabra_sorteada = sortea_palabra();
    //cifro la palabra sorteada por guiones
    reemplaza_sorteada_por_guiones();
    //la precento en pantalla
    muestra_palabra("palabra");

    //inicio la cantantidad de letras para saber cuando complete la plabra.
    palabra_a_completar = palabra_sorteada.length;
    // palabra_completa = false;
    // intentos = 10;
    // estado = 1;

    //Dibuja muneco en el estado 1
    dibuja_muneco();
    dibuja_muneco(estado);
}

/**** CUANDO APRETAN UNA LETRA, TODO EL DESARROLO DEL JUEGO EN ESTA FUNCION *******/
function jugar(ev) {
    /* aca podemos hacer una validacion onda */

    if (palabra_completa == false && intentos != 0) {
        //aca hacemos todo el desarrollo del juego, de lo contrario ya no hace nada.

        // AL Precionar una tecla
        // 1) Tomo letra ingresada
        toma_letra(ev); //(Guarda la letra en letra_usuario)

        //2) Valido si la letra esta en el grupo de letras ya clickeadas anteriormente.
        if (!valida_letra_contra_preClickeadas(letra_usuario)) {
            // si no esta en en el grupo de letras clickeadas
            // valido si no se encuentra en la palabra sorteada
            if (valida_letra_en_palabraSorteada(letra_usuario)) {
                // SI esta en la palabra sorteada
                // A) Corremos la funcion que reemplaza los guiones por la letra, para despues validar si se completo la palabra o no.
                letra_por_guion_en_palabraSorteada();
                // B) Controlamos si se completo la palabra
                if (valida_palabra_completa()) {
                    // SI TRUE - ES PORQUE NO SE COMPLETO

                    //C) agregamos letra al conjunto de letras clickeadas
                    agrega_letra_incorrecta(letra_usuario);

                    //D) Mostramos la palabra en pantalla
                    muestra_palabra("palabra");
                } else {
                    //SI FALSE - ES PORQUE SE COMPLETO

                    letra_por_guion_en_palabraSorteada();

                    muestra_palabra("palabra");

                    // carga_parametros_iniciales();

                    // ctx_muneco.clearRect(0, 0, 800, 800);
                    // dibuja_muneco('canvas_muneco', 1);
                    // ctx_muneco.fillStyle = "green";
                    // ctx_muneco.font = "25px Inter";
                    // ctx_muneco.fillText("Ganaste!!", 100, 200);
                    gamewin();

                    // // alert('FELICIDADES USTED A GANADO!');

                    /****
                    Aca podemos guardar el estado de ganado, por ejemplo 
                        palabra_completada = true;
                    y validamos al terminar todo. Y ahi mandamos a llamar las funciones de de reset y renicio, o las funciones que se requieran.
    
                    ****/
                    palabra_completa = true;
                }
            } else {
                // SI NO ESTA EN LA PALABRA SORTEADA
                // Y TAMPOCO EN LAS LETRAS YA CLICKEADAS

                // A) Descuento intento
                intentos -= 1; //lo puedo validar con los estados

                //B) Guardo letra en letras clickeadas, y la muestro
                agrega_letra_incorrecta(letra_usuario.toUpperCase());

                muestra_letras_preClickeadas("letras-elegidas");

                //C) Dibujo otro estado en el muñeco
                estado += 1;
                dibuja_muneco(estado);

                //D) Valido si quedan intentos. Con intentos o con estado = 10
                if (intentos <= 0) {
                    //limpiamos canvas del muñeco
                    // ctx_muneco.clearRect(0,0,2000,2000);
                    // let x = canvas_muneco.width;
                    // let y = canvas_muneco.heigth;
                    gameover(200, 200);
                    // alert('PERDISTE, TE QUEDASTE SIN INTENTOS');

                    nueva_partida = false;
                    // inicia_partida();
                    // resetea_parametros();
                    // carga_parametros_iniciales();
                }
            }
        }

        /* ACA PODEMOS VALIDAR TODAS LAS OPCIONES Y DISPARAR LOS MENSAJES Y LO QUE
            SE NEECESITE REALIZAR */
    }

}

/*********** BOTON DESISTIR *********/
function desistir() {
    swal({
            title: "Seguro que desea Desistir?",
            text: "No te des por vencido!",
            buttons: true,
            dangerMode: true,
        })
        .then((desistir) => {
            if (desistir) {
                //reiniciamos todo a cero, y volvemos a mostrar el parrafo txt_iniciaJuego, para que haga clik si quiere iniciar a jugar
                document.getElementById("txt_iniciaJuego").style.display = "block";

                //limpiamos canvas del muñeco
                dibuja_muneco();

                nueva_partida = false;
               
                palabra_sorteada_conGuiones = "";
                muestra_palabra("palabra");

                //volvemos al index.
                window.location.href = "./index.html";
            } else {
                swal("Genial, sigamos intentando!");
            }
        });
}

/*********** BOTON NUEVO JUEGO ***********/
// function nuevo_juego() {
//     // 1) preguntamos si realemten quiere iniciar una nuevo juego
//     let op = confirm("Seguro quiere comenzar un nuevo juego?");
//     if (op) {
//         //limpiamos canvas del muñeco
//         dibuja_muneco(0);
//         //cargamos parametros iniciales
//         carga_parametros_iniciales();
//     } else {
//         // limpiamos canvas
//         dibuja_muneco(0)
//     }
// }

window.onkeydown = jugar;
let btn_desistir = document.getElementById("btn-desistir");
btn_desistir.onclick = desistir;
let btn_jugar = document.getElementById('btn-newGame');
btn_jugar.onclick = inicia_partida;