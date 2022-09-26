// caja de palabras iniciales 
var palabras = ['AMARILLO', 'ROJO', 'VIOLETA'];
// conjunto de letras validas para el juego 
const letras_validas = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';

var palabra_sorteada, letra_usuario, palabra_sifrada,intentos,palabra_completa;
var letras_seleccionadas ='';

// Funcion que valida si la letra esta en la caja de letras previamentes clickeadas.  
function valida_letra_contra_preClickeadas(letra){
    return letras_seleccionadas.includes(letra.toUpperCase());   //return true o false  
}

//Funcion que valida si la letra clickeada forma parte de la palabra sorteda
function valida_letra_en_palabraSorteada(letra){
    return palabra_sorteada.includes(letra.toUpperCase()); //return true o false
}

//Funcion que agrega letra a la caja de letras incorrectas
function agrega_letra_incorrecta(letra){

     if(valida_letra_contra_preClickeadas(letra)){
        letras_seleccionadas.push(letra);
    }
}

function sortea_palabra (){
    palabra_sorteada = palabras[Math.floor(Math.random() * palabras.length )];
}

// sortea_palabra();

// dibujo palabra con guiones inicial
var cifra_palabra = () =>{
    palabra_sifrada = palabra_sorteada.replace(/./g, "_ ");
}
//Funcion que cambia los guiones por la letra si esta en la palabra
String.prototype.replaceAt=function(index, character) { return this.substring(0, index) + character + this.substring(index+character.length); }

var comprueba_letra = ()=>{
    //primero pregunto si la letra no esta en las letras ya clickeadas
    if(!valida_letra_contra_preClickeadas(letra_usuario)){
        //si no esta, pregunto si la letra esta en la palabra sorteada
        if(valida_letra_en_palabraSorteada(letra_usuario)){
            //si esta en la palabra sorteada, reemplazo los guiones por la letra
            for(const i in palabra_sorteada){
                if(letra_usuario == palabra_sorteada[i]){
                    palabra_sifrada = palabra_sifrada.replaceAt(i*2,letra_usuario);
                    
                    //sumo 1 por cada letra al contador de palabra completada
                    palabra_completa += 1;
                }
            }
             //valido si se completo la palabra
            if(palabra_completa >= palabra_sorteada.length){
                //muestro mensaje de victoria
                document.getElementById('palabra_secreta').innerHTML = 'GANASTE!!';
                
        }
        }else{
            //si no esta en las letras clickedas, y tampoco esta en la palabra sorteada.
            //descuento intentos
            intentos -= 1;
            //agrego letra a palabras clickeadas
            letras_seleccionadas.push(letra_usuario);
            
            //compruebo si me quede sin intentos
            if (intentos < 0 ){
                document.getElementById('palabra_secreta').innerHTML = 'PERDISTE';
                }
            
        }

    }
        // else, si la letra esta en las letras clikeadas no hago nada 

}


// Funcion para obtener letra que se cliquea 
function toma_letra(e){
    let key = e.keyCode 
    let tecla = String.fromCharCode(key).toString();

    // letras especiales ( enter, retroceso)
    especiales = [8,13] //codigo ascii de las teclas enter y retroceso
    let tecla_especial = false;
    for(var i in especiales){
        if(key == especiales[i]){
            tecla_especial = true;
            break;
        }
    }

    if(letras_validas.indexOf(tecla) == -1 && !tecla_especial){
        alert("Debe precionar solo letras del abecedario");
    }else{
        
        // guardamos la letra presionada por el usuario 
        letra_usuario = tecla.toUpperCase();
        console.log(letra_usuario)

        //ahora comprobamos letra
        comprueba_letra();
        document.getElementById('palabra_secreta').innerHTML = palabra_sifrada;
    }




}


    //sorteo palabra
    sortea_palabra();

    //asigno la cantidad de intentos
    intentos = 10;

    // pongo en cero el contador de completar palabra 
    palabra_completa = 0;

    //cifro palabra
    cifra_palabra();

    //muestro palabra cifrada
    document.getElementById('palabra_secreta').innerHTML = palabra_sifrada;

    //escucho letra
     window.onkeydown = toma_letra;
        
   