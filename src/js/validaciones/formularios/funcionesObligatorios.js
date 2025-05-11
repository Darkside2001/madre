import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';



export function validarCamposGeneral(formData) {

  for (let campo in formData) {
    let keys = Object.keys(formData);
    let keyString=keys[0].toString();
    if (!formData[campo].trim()) { 
      document.querySelector('input[name="'+keyString+'"]').classList.add('error-border');
      return false;
    }
  }
  return true;

}

export function validarFormulario(observables, callback) {
  const observablesConInicio = observables.map(obs => obs.pipe(startWith(false)));
  
  const formularioValido$ = combineLatest(observablesConInicio).pipe(
    map(values => values.every(value => value))
  );

  formularioValido$.subscribe(valido => callback(valido));

}

export function handleBlur(field, formData, observables, vueInstance) {
  // Asegúrate de que 'vueInstance.$refs.formulario' y 'field' estén definidos
  if (!vueInstance.$refs.formulario) {
      return; // Salimos si no existe el formulario
  }

  const fieldValido$ = observables[field];

  // Asegúrate de que 'fieldValido$' esté definido
  if (!fieldValido$) {
      console.error(`No se encontró el observable para el campo: ${field}`);
      return; // Salimos si no se encuentra el observable
  }

  const fieldValue = formData[field];

  // Asegúrate de que 'fieldValue' esté definido y no esté vacío
  if (fieldValue === undefined || fieldValue.trim() === '') {
      const fieldElement = vueInstance.$refs.formulario.querySelector(`#${field}`);
      
      if (fieldElement) {
          fieldElement.classList.add('error-border');
      }

      fieldValido$.next(false);
  } else {
      const fieldElement = vueInstance.$refs.formulario.querySelector(`#${field}`);
      
      if (fieldElement) {
          fieldElement.classList.remove('error-border');
      }

      fieldValido$.next(true);
  }
}


  export function validarCampos(formData, formularioRef) {
    Object.keys(formData).forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        formularioRef.querySelector(`#${field}`).classList.add('error-border');
      }
    });
  }
  
  export function mensajeSatisfactorio__sin() {

    Swal.fire({
      title: '¡Operación exitosa!',
      text: '',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      timer: 5000,
      timerProgressBar: true,
      allowOutsideClick: false, 
      allowEscapeKey: true,
    });
    
    
  }

  export function mensajeSatisfactorio() {

    Swal.fire({
      title: '¡Operación exitosa!',
      text: '',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      timer: 5000,
      timerProgressBar: true,
      allowOutsideClick: false, 
      allowEscapeKey: true,
    });
    
    
  }

  export function mensajeCheckedsSectorObligatorio() {

    Swal.fire({
        title: 'Error',
        text: 'Obligatorio escoger al menos un sector',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: 5000, 
        timerProgressBar: true, 
        allowOutsideClick: true,
        allowEscapeKey: true 
      });

    
  } 

  export function mensajeCheckedsObligatorio() {

    Swal.fire({
        title: 'Error',
        text: 'Obligatorio escoger al menos un componente',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: 5000, 
        timerProgressBar: true, 
        allowOutsideClick: true,
        allowEscapeKey: true 
      });

    
  }

  export function mensajeError__celular() {

    Swal.fire({
        title: 'Error',
        text: 'Es necesario que el campo tenga mínimo 10 y máximo 10',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: 5000, // Tiempo en milisegundos (en este caso, 2 segundos)
        timerProgressBar: true, // Muestra una barra de progreso del temporizador
        allowOutsideClick: true, // No permite cerrar la alerta haciendo clic fuera de ella
        allowEscapeKey: true // No permite cerrar la alerta con la tecla "Esc"
      });

    
  }

  export function mensajeError__necesarioEscoger() {

    Swal.fire({
        title: 'Error',
        text: 'Al tener discapacidad debe escoger si requiere representante',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: 5000, // Tiempo en milisegundos (en este caso, 2 segundos)
        timerProgressBar: true, // Muestra una barra de progreso del temporizador
        allowOutsideClick: true, // No permite cerrar la alerta haciendo clic fuera de ella
        allowEscapeKey: true // No permite cerrar la alerta con la tecla "Esc"
      });

    
  }

  export function mensajeErrorCorreo_ministerio__no__iguales() {

    Swal.fire({
        title: 'Error',
        text: 'El correo electrónico ya fue ingresado en campos anteriores',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: 5000, // Tiempo en milisegundos (en este caso, 2 segundos)
        timerProgressBar: true, // Muestra una barra de progreso del temporizador
        allowOutsideClick: true, // No permite cerrar la alerta haciendo clic fuera de ella
        allowEscapeKey: true // No permite cerrar la alerta con la tecla "Esc"
      });

    
  }

  export function mensajeErrorCorreo_ministerio() {

    Swal.fire({
        title: 'Error',
        text: 'Por favor registre una dirección de correo electrónico válida a través de la cual el Ministerio del Deporte le remitirá información importante del proceso',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: 5000, // Tiempo en milisegundos (en este caso, 2 segundos)
        timerProgressBar: true, // Muestra una barra de progreso del temporizador
        allowOutsideClick: true, // No permite cerrar la alerta haciendo clic fuera de ella
        allowEscapeKey: true // No permite cerrar la alerta con la tecla "Esc"
      });

    
  }


  export function mensajeErrorDatosOrganismo() {

    Swal.fire({
        title: 'Error',
        text: 'Organismo obligatorio para deportista federado',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: 5000, // Tiempo en milisegundos (en este caso, 2 segundos)
        timerProgressBar: true, // Muestra una barra de progreso del temporizador
        allowOutsideClick: true, // No permite cerrar la alerta haciendo clic fuera de ella
        allowEscapeKey: true // No permite cerrar la alerta con la tecla "Esc"
      });

    
  }


  export function mensajeErrorDatos() {

    Swal.fire({
        title: 'Error',
        text: 'Complete los campos obligatorios',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: 5000, // Tiempo en milisegundos (en este caso, 2 segundos)
        timerProgressBar: true, // Muestra una barra de progreso del temporizador
        allowOutsideClick: true, // No permite cerrar la alerta haciendo clic fuera de ella
        allowEscapeKey: true // No permite cerrar la alerta con la tecla "Esc"
      });

    
  }


  export function mensajeErrorDatos__bandeja__reasignar() {

    Swal.fire({
        title: 'Error',
        text: 'Obligatorio seleccionar una opcióm',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: 5000, // Tiempo en milisegundos (en este caso, 2 segundos)
        timerProgressBar: true, // Muestra una barra de progreso del temporizador
        allowOutsideClick: true, // No permite cerrar la alerta haciendo clic fuera de ella
        allowEscapeKey: true // No permite cerrar la alerta con la tecla "Esc"
      });

    
  }


  export function mensajeDeRegistro() {

    Swal.fire({
        title: '',
        text: 'Registro realizado satisfactoriamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        timer: 5000, 
        timerProgressBar: true,
        allowOutsideClick: true,
        allowEscapeKey: true 
      });

    
  }

  export function mensajeDeError() {

    Swal.fire({
        title: 'Error',
        text: 'Sucedio un error',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: 5000, 
        timerProgressBar: true,
        allowOutsideClick: true,
        allowEscapeKey: true 
      });

    
  }


  export function mensajeDeAuth() {

    Swal.fire({
        title: 'Error',
        text: 'Credenciales no válidas',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: 5000, 
        timerProgressBar: true,
        allowOutsideClick: true,
        allowEscapeKey: true 
      });

    
  }

  export function mensajeConfirmacion() {

    Swal.fire({
        title: '',
        text: 'Registro guardado satisfactoriamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        timer: 5000, 
        timerProgressBar: true, 
        allowOutsideClick: true, 
        allowEscapeKey: true
      });

    
  }

  export function mensaje__cedula__no() {

    Swal.fire({
        title: '',
        text: 'Cédula no existente',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: 5000, 
        timerProgressBar: true, 
        allowOutsideClick: true, 
        allowEscapeKey: true
      });

    
  }

  export function mensaje__ruc__no() {

    Swal.fire({
        title: '',
        text: 'Ruc no existente',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: 5000, 
        timerProgressBar: true, 
        allowOutsideClick: true, 
        allowEscapeKey: true
      });

    
  }

  export function calcularEdad(fechaNacimiento) {
    // Dividir la fecha de nacimiento en día, mes y año
    const partesFecha = fechaNacimiento.split('/');
    const dia = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10) - 1; // Los meses en JavaScript son de 0 a 11
    const anio = parseInt(partesFecha[2], 10);

    // Crear un objeto Date para la fecha de nacimiento
    const fechaNac = new Date(anio, mes, dia);

    // Obtener la fecha actual
    const hoy = new Date();

    // Calcular la edad
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();

    // Ajustar la edad si la fecha actual es antes del cumpleaños de este año
    if (mesActual < mes || (mesActual === mes && diaActual < dia)) {
        edad--;
    }

    return edad;

}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}