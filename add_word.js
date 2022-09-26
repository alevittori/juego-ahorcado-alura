

let btn_guardar =document.getElementById('btn-save-word');
let btn_cancelar = document.getElementById('btn-cancel-word');

btn_guardar.onclick = ()=>{
    let input_palabra = document.getElementById('input-word').value.toUpperCase();
    let input = document.getElementById('input-word');

    swal({
        // title: "Are you sure?",
        text: `Desea guardar la palabra? ${input_palabra}`,
        // icon: "warning",
        buttons: true,
        // dangerMode: true,
      })
      .then((guardar) => {
        if (guardar) {
            palabras.push(input_palabra);

            // lo guardamos en el almacenamiento local (Local Store )
            localStorage.setItem("palabras" , palabras);
    
            input.value = '';
            input.focus();
            
            swal(`La palabra: ${input_palabra} se guardo con exito`);;
        } 
      });
}

btn_cancelar.onclick = () => {
    window.location.href = "./index.html";
}
