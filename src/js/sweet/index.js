import Swal from 'sweetalert2';
import { Observable,forkJoin } from "rxjs";
import axios from "axios";
import {mensajeConfirmacion} from "@/js/validaciones/formularios/funcionesObligatorios.js";
import { observableAxios__codigo,observableAxios__codigo__final__registro__usuario,actualiza__archivos__infraestructura,buscar__documentos__infraestructura } from '@/js/axios/index.js';
import { actualizar__reporteria__usuario,recuperar__reporteria__asignada } from '@/js/axios/reportes.js';
import { longitud,caracteresEspeciales__sin__espacios } from '@/js/validaciones/validacion.js';

export function anexos__infraestructura(codigo,anioObtenido) {
  Swal.fire({
    title: '<span class="text-lg font-bold text-sm text-sky-900">CARGA DE ARCHIVOS</span>',
    text: "",
    showCancelButton: false,
    showConfirmButton: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    width: '50%', 
    confirmButtonText: 'Cerrar',
    html: `
      <div class="w-full flex flex-col justify-center items-center">

        <table class="min-w-full leading-normal bg-blue-600 text-white">

          <tbody>
        
            <tr>
        
              <th class="bg-blue-600 px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider text-center" id="anexoCronograma">Encabezado 1</th>
              <th class="bg-blue-600 px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider text-center" id="anexoPresupuesto">Encabezado 2</th>
        
            </tr>
        
        
          </tbody>
    
        </table>

        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/4">
                Descripción del Archivo
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Subir documento
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Documento
              </th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm font-bold text-left">
                Presupuesto que contenga el detalle por rubro, suscrito por el/la profesional de la rama;
              </td>
              <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm text-left">
                <label class="relative inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
                  <i class="fas fa-file-pdf mr-2"></i> Seleccionar PDF
                  <input type="file" accept="application/pdf" class="absolute inset-0 opacity-0 cursor-pointer archivoSeleccion" attr="presupuestoRubro">
                </label>
              </td>
              <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm text-left" id="presupuestoRubro"></td>
            </tr>   

            <tr>
              <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm font-bold text-left">
                Cronograma valorado de la obra, suscrito por el/la profesional de la rama; y, (pdf)
              </td>
              <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm text-left">
                <label class="relative inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
                  <i class="fas fa-file-pdf mr-2"></i> Seleccionar PDF
                  <input type="file" accept="application/pdf" class="absolute inset-0 opacity-0 cursor-pointer archivoSeleccion" attr="cronogramaValoradoPdf">
                </label>
              </td>
              <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm text-left" id="cronogramaValoradoPdf"></td>
            </tr>   



            <tr>
              <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm font-bold text-left">
              Cronograma valorado de la obra, suscrito por el/la profesional de la rama; y, (excel)
              </td>
              <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm text-left">
                <label class="relative inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
                  <i class="fas fa-file-pdf mr-2"></i> Seleccionar Excel
                  <input type="file" accept=".xlsx" class="absolute inset-0 opacity-0 cursor-pointer archivoSeleccion" attr="cronogramaValoradoExcel">
                </label>
              </td>
              <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm text-left" id="cronogramaValoradoExcel"></td>
            </tr>   


          </tbody>
        </table>
      </div>
    `,
    didOpen: () => {

      forkJoin([buscar__documentos__infraestructura(codigo,anioObtenido)]).subscribe({
        next: (results) => {

          const anexoCronogramasBase64 = results[0].anexoCronogramas; 
          const ancoreCronograma =`<a href="${anexoCronogramasBase64}" download="anexoCronograma">Descargar anexo Cronograma</a>`;
          document.getElementById("anexoCronograma").innerHTML = ancoreCronograma;

          const anexoPresupuestoBase64 = results[0].anexoPresupuesto; 
          const ancoreanexoPresupuesto =`<a href="${anexoPresupuestoBase64}" download="anexoPresupuesto">Descargar anexo Presupuesto</a>`;
          document.getElementById("anexoPresupuesto").innerHTML = ancoreanexoPresupuesto;

          const presupuestoRubroBase64 = results[0].presupuestoRubro; 
          if (presupuestoRubroBase64.trim() !== '' && presupuestoRubroBase64.trim() !== ' ' && presupuestoRubroBase64.trim() !== undefined && presupuestoRubroBase64.trim() !== null) {
            if(presupuestoRubroBase64!=="data:directory;base64,"){
              const embedTagplanospresupuestoRubro=`<a href="${presupuestoRubroBase64}" download="presupuestoRubro">Descargar documento</a>`;
              document.getElementById("presupuestoRubro").innerHTML = embedTagplanospresupuestoRubro;
            }
          }

          const cronogramaValoradoPdfBase64 = results[0].cronogramaValoradoPdf; 
          if (cronogramaValoradoPdfBase64.trim() !== '' && cronogramaValoradoPdfBase64.trim() !== ' ' && cronogramaValoradoPdfBase64.trim() !== undefined && cronogramaValoradoPdfBase64.trim() !== null) {
            if(cronogramaValoradoPdfBase64!=="data:directory;base64,"){
              const embedTagcronogramaValoradoPdf=`<a href="${cronogramaValoradoPdfBase64}" download="cronogramaValoradoPdf">Descargar documento</a>`;
              document.getElementById("cronogramaValoradoPdf").innerHTML = embedTagcronogramaValoradoPdf;
            }
          }

          const cronogramaValoradoExcelPdfBase64 = results[0].cronogramaValoradoExcel; 
          if (cronogramaValoradoExcelPdfBase64.trim() !== '' && cronogramaValoradoExcelPdfBase64.trim() !== ' ' && cronogramaValoradoExcelPdfBase64.trim() !== undefined && cronogramaValoradoExcelPdfBase64.trim() !== null) {
            if(cronogramaValoradoExcelPdfBase64!=="data:directory;base64,"){
              const embedTagcronogramaValoradoExcel=`<a href="${cronogramaValoradoExcelPdfBase64}" download="cronogramaValoradoExcel">Descargar documento</a>`;
              document.getElementById("cronogramaValoradoExcel").innerHTML = embedTagcronogramaValoradoExcel;
            }
          }

        },
      
      });   

      document.querySelectorAll('.archivoSeleccion').forEach(function(element) {
        element.addEventListener('change', function() {
          const campo = this.getAttribute('attr');
      
          const archivo = this.files[0];
      
          forkJoin([actualiza__archivos__infraestructura(campo, archivo, codigo,anioObtenido)]).subscribe({
            next: (results) => {
              const mensaje = results[0].mensaje;
              const respaldosDigitales = results[0].respaldosDigitales;
      
              if (mensaje === 2) {
                Swal.fire({
                  title: '¡Supera el tamaño máximo que son 5 MB!',
                  text: '',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  timer: 5000,
                  timerProgressBar: true,
                  allowOutsideClick: false,
                  allowEscapeKey: true,
                });
              } else if (mensaje === 0) {
                Swal.fire({
                  title: '¡Error al subir el archivo, compruebe su conexión!',
                  text: '',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  timer: 5000,
                  timerProgressBar: true,
                  allowOutsideClick: false,
                  allowEscapeKey: true,
                });
              } else {

                const archivoBase64 = mensaje;  
                const embedTag = `<a href="${archivoBase64}" download="${campo}">Descargar documento</a>`;
                document.getElementById(campo).innerHTML = embedTag;
                
              }
            },
          });
        });
      });
      

    }
  }).then((result) => {
    if (result.isConfirmed) {

    }
  });
}


export function envioSatisfactorio(validez,formData) {

  if(parseInt(validez,10)===2){

    document.getElementById('enviarRegistroInformacion').classList.remove('hidden');
    
    document.getElementById('mensaje__esperaRegistro').innerText = ' ';

    Swal.fire({
      title: 'Error',
      text: 'Credenciales ya existentes intente con otras credenciales por favor',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      timer: 5000,
      timerProgressBar: true, 
      allowOutsideClick: true, 
      allowEscapeKey: true
    });
    

  }else{

    document.getElementById('mensaje__esperaRegistro').innerText = ' ';
    document.getElementById('enviarRegistroInformacion').classList.add('hidden');

    document.querySelectorAll('.readonly__especifico__guardado').forEach(el => el.setAttribute('disabled', 'disabled'));
    document.getElementById('flexCheckDefault').disabled = true;

    Swal.fire({
      title: '<span class="text-lg font-bold text-sm text-sky-900">USUARIO CREADO SATISFACTORIAMENTE</span>',
      text: "",
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      html: `
        <div class="w-full flex justify-center items-center">
          <div class="text-sm font-bold w-4/12">Código de validación:</div>
          <input type="text" class="h-8" placeholder id="codigoEnviado" name="codigoEnviado" style="border:1px solid black!important;"/>
          <button class="rounded-lg px-2 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300 ml-2" id="codigoBuscarE">
            <i class="fa-solid fa-share-from-square"></i>
          </button>
        </div>
        <div class="ocultar__textos text-center w-full" style="color:red;"></div>
        <br>
        <div id="contenedorClaves" class="hidden">
          <div class="flex">
            <input type="password" id="contrasena1" class="h-8 mb-2 w-10/12" style="border:1px solid black; font-size:12px;" placeholder="Ingrese Contraseña"/>
            <button type="button" id="toggleContrasena1" class="ml-1 text-sm font-bold">Mostrar</button>
          </div>
          <div class="flex">
            <input type="password" id="contrasena2" class="h-8 mb-2 w-10/12" style="border:1px solid black; font-size:12px;"  placeholder="Repita su Contraseña por favor"/>
            <button type="button" id="toggleContrasena2" class="ml-1 text-sm font-bold">Mostrar</button>
          </div>
        </div>
        <br>
        <div class="ocultar__textos__2 text-center w-full" style="color:red;"></div>
        <div class="ocultar__textos__3 text-center w-full" style="color:green; font-bold;"></div>

        <div id="contadorReloj" class="text-center w-full text-xs font-bold" style="color:black;"></div>

      `,
      footer: `<button type="button" id="buscarCodigo" class="btn btn-primary hidden" style="background:#3085d6;" ><i class="fas fa-check"></i>&nbsp;&nbsp;Enviar</button>`,
      didOpen: () => {
        const contrasena1 = document.getElementById("contrasena1");
        const contrasena2 = document.getElementById("contrasena2");
    
        longitud(contrasena1, 15);
        longitud(contrasena2, 15);
        caracteresEspeciales__sin__espacios(contrasena1);
        caracteresEspeciales__sin__espacios(contrasena2);
    
        function togglePasswordVisibility(input, button) {
          if (input.type === "password") {
            input.type = "text";
            button.textContent ='Ocultar'; 
          } else {
            input.type = "password";
            button.textContent = 'Mostrar'; 
          }
        }
    
        document.getElementById("toggleContrasena1").addEventListener("click", () => {
          togglePasswordVisibility(contrasena1, document.getElementById("toggleContrasena1"));
        });
    
        document.getElementById("toggleContrasena2").addEventListener("click", () => {
          togglePasswordVisibility(contrasena2, document.getElementById("toggleContrasena2"));
        });
        
        // generar código
        let tiempoRestante = 5 * 60; 
        // let tiempoRestante = 1 * 3; 

        function actualizarContador() {
            const minutos = Math.floor(tiempoRestante / 60);
            const segundos = tiempoRestante % 60;
            
            const minutosFormateados = minutos.toString().padStart(2, '0');
            const segundosFormateados = segundos.toString().padStart(2, '0');
            
            document.getElementById('contadorReloj').textContent = `${minutosFormateados}:${segundosFormateados}`;
            
            tiempoRestante--;

            if (tiempoRestante < 0) {
              clearInterval(intervalo); 
              Swal.close(); 
              document.querySelectorAll('.ocultos__despues__registro').forEach(el => el.classList.remove('hidden'));

            }
        }

        const intervalo = setInterval(actualizarContador, 1000);

      }
    }).then((result) => {
      if (result.isConfirmed) {

      }
    });

    document.getElementById('buscarCodigo').addEventListener('click', () => {

        const contrasena1 = document.getElementById("contrasena1");
        const contrasena2 = document.getElementById("contrasena2");

        const codigoEnviado = document.getElementById("codigoEnviado");
        

        const password1 = contrasena1.value.trim(); 
        const password2 = contrasena2.value.trim();

        const codigoEnviadoD = codigoEnviado.value.trim();

        if (password1 === '') {
            document.querySelector(".ocultar__textos__2").textContent = "La contraseña no puede estar vacía.";
            return; 
        }else{
            document.querySelector(".ocultar__textos__2").textContent = " ";
        }

        if (password2 === '') {
            document.querySelector(".ocultar__textos__2").textContent = "La contraseña no puede estar vacía.";
            return; 
        }else{
            document.querySelector(".ocultar__textos__2").textContent = " ";
        }
        
        if (password1 === password2) {

            forkJoin([observableAxios__codigo__final__registro__usuario(password1,codigoEnviadoD,formData)]).subscribe({
                next: () => {

                    document.getElementById('buscarCodigo').classList.add('hidden');

                    document.querySelector(".ocultar__textos__3").textContent = "Se activo su usuario satisfactoriamente ya puede ingresar con sus nuevas credenciales";

                    setTimeout(() => {
                        window.location.href = "/ingreso";
                    }, 3000);                    
                    
                }
            });  
        

        } else {
            document.querySelector(".ocultar__textos__2").textContent = "Las contraseñas no coinciden. Inténtalo de nuevo.";
            return; 
        }

    });

    document.getElementById('codigoBuscarE').addEventListener('click', () => {

        let elemento = document.getElementById("codigoEnviado");
        let valor = elemento.value;

        forkJoin([observableAxios__codigo(valor)]).subscribe({
            next: (results) => {
    
                const data1 = results[0].codigo;

                if (data1 && Object.keys(data1).length > 0) {
                    document.querySelector(".ocultar__textos").textContent = " ";
                    document.getElementById('contenedorClaves').classList.remove('hidden');
                    document.getElementById('buscarCodigo').classList.remove('hidden');
                } else {
                    document.querySelector(".ocultar__textos").textContent = "El código ingresado no es valido";
                    document.getElementById('contenedorClaves').classList.add('hidden');
                    document.getElementById('buscarCodigo').classList.add('hidden');
                }

            },
            error: (error) => {
              console.error("Error al cargar tipos de usuario:", error);
            }
          });

    });

  }

    
  }


const alertaGeneral__administrarPerfiles = (htmlContent,id,arrayRoles,arrayPerfiles,arrayInformacionGeneral,perrfilArrayE,rolArrayE,transaccionArrayE) => {
    Swal.fire({
      title: '<div class="title-style"><div>Ministerio del deporte</div><div class="font-bold text-sm bold">'+arrayInformacionGeneral[0].nombreCompleto+'</div><div class="font-bold text-sm bold">'+arrayInformacionGeneral[0].usuario+'</div></div>',
      html: htmlContent,
      icon: false,
      showCancelButton: false, 
      showConfirmButton: false, 
      width: '50%',
      scrollbarPadding: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      footer: `
          <button type="button" id="cancelButton" class="btn btn-secondary" style="background:#f99b07;"><i class="fas fa-times"></i>&nbsp;&nbsp;Cerrar</button>
          <button type="button" id="saveButton" class="btn btn-primary" style="background:#3085d6;"><i class="fas fa-check"></i>&nbsp;&nbsp;Guardar</button>
      `,
      didOpen: () => {
        forkJoin([recuperar__reporteria__asignada(id)]).subscribe({

          next: (results) => {
  
              for (let i = 0; i < perrfilArrayE.length; i++) {
                $('#idPerfil__'+perrfilArrayE[i]).prop('checked', true);
                $(".id__perfil__oculto__"+perrfilArrayE[i]).removeClass('hidden');
              }
                
              for (let i = 0; i < rolArrayE.length; i++) {
                $('#rol__'+rolArrayE[i]).prop('checked', true);
                $(".id__transaccion__oculto__"+perrfilArrayE[i]).removeClass('hidden');
                $(".id__transaccion__oculto__"+rolArrayE[i]).removeClass('hidden');
              }
                
              for (let i = 0; i < transaccionArrayE.length; i++) {
                $('#transaccion__'+transaccionArrayE[i]).prop('checked', true);
              }
                
      
      
              $('.perfilSeleccionado').change(function() {
                      
                  let idPerfil=$(this).attr('idPerfil');
      
                  if (this.checked) {
                      $(".id__perfil__oculto__"+idPerfil).removeClass('hidden');
                  } else {
                      $(".id__perfil__oculto__"+idPerfil).addClass('hidden');
                      $('.idPerfil__alineados__'+idPerfil).prop('checked', false);
                      $(".id__transaccion__perfil__oculto__"+idPerfil).addClass('hidden');
                      $('.idTransaccion_alineados__'+idPerfil).prop('checked', false);
                  }
      
              });
      
              $('.rolSeleccionado').change(function() {
                      
                let idRol=$(this).attr('idRol');
      
                if (this.checked) {
                    $(".id__transaccion__oculto__"+idRol).removeClass('hidden');
                } else {
                    $(".id__transaccion__oculto__"+idRol).addClass('hidden');
                    $('.idTransaccion_alineados__'+idRol).prop('checked', false);
                }
      
            });
      
            const calificacionSelector = Swal.getHtmlContainer().querySelectorAll('input[name="calificacionSelector'+id+'"]');
            const certificacionSelector = Swal.getHtmlContainer().querySelectorAll('input[name="certificacionSelector'+id+'"]');
            const seguimientoSelector = Swal.getHtmlContainer().querySelectorAll('input[name="seguimientoSelector'+id+'"]');
            const seguimientoSelectorVersion1 = Swal.getHtmlContainer().querySelectorAll('input[name="seguimientoSelectorVersion1'+id+'"]');

            const calificacion = results[0].calificacion;
            const certificacion = results[0].certificacion;
            const seguimiento = results[0].seguimiento;
            const seguimientoV1 = results[0].seguimientoV1;

            if(calificacion.length>0){

              calificacionSelector.forEach(input => {
                if (input.value === calificacion[0].permiso) {
                    input.checked = true;
                }
              });

            }

            if(certificacion.length>0){

              certificacionSelector.forEach(input => {
                if (input.value === certificacion[0].permiso) {
                    input.checked = true;
                }
              });

            }

            if(seguimiento.length>0){

              seguimientoSelector.forEach(input => {
                if (input.value === seguimiento[0].permiso) {
                    input.checked = true;
                }
              });

            }

            if(seguimientoV1.length>0){

              seguimientoSelectorVersion1.forEach(input => {
                if (input.value === seguimientoV1[0].permiso) {
                    input.checked = true;
                }
              });

            }


            calificacionSelector.forEach(radio => {
              radio.addEventListener('change', () => {
                if (radio.checked) {
      
                  forkJoin([actualizar__reporteria__usuario('calificacion',radio.value,id,localStorage.getItem('idUsuario'))]).subscribe({
                    next: (results) => {
            
                    
                    },
                  });   
      
                }
              });
            });
      
            certificacionSelector.forEach(radio => {
              radio.addEventListener('change', () => {
                if (radio.checked) {
      
                  forkJoin([actualizar__reporteria__usuario('certificacion',radio.value,id,localStorage.getItem('idUsuario'))]).subscribe({
                    next: (results) => {
            
                    
                    },
                  });   
      
                }
              });
            });
      
            seguimientoSelector.forEach(radio => {
              radio.addEventListener('change', () => {
                if (radio.checked) {
      
                  forkJoin([actualizar__reporteria__usuario('seguimiento',radio.value,id,localStorage.getItem('idUsuario'))]).subscribe({
                    next: (results) => {
            
                    
                    },
                  });   
      
                }
              });
            });

            seguimientoSelectorVersion1.forEach(radio => {
              radio.addEventListener('change', () => {
                if (radio.checked) {
      
                  forkJoin([actualizar__reporteria__usuario('seguimientoV1',radio.value,id,localStorage.getItem('idUsuario'))]).subscribe({
                    next: (results) => {
            
                    
                    },
                  });   
      
                }
              });
            });

          },
        });   

      }
    });
    

    document.getElementById('cancelButton').addEventListener('click', () => {
        Swal.close(); 
    });
    

    document.getElementById('saveButton').addEventListener('click', () => {


        let idTransaccionSeleccionados = [];

        $('.checkbox__transaccion:checked').each(function() {

          let idPerfil = this.getAttribute('idPerfil');
          let idRol = this.getAttribute('idRol');
          let idTransaccion = this.getAttribute('idTransaccion');
          idTransaccionSeleccionados.push(idPerfil+"__"+idRol+"__"+idTransaccion);

        });


        let paqueteDeDatos = new FormData();

        //paqueteDeDatos.append("aplicativo", process.env.VUE_APP_URL_APLICATIVO_INCENTIVO);
        paqueteDeDatos.append("idUsuario", id);
        paqueteDeDatos.append("idTransaccionSeleccionados", JSON.stringify(idTransaccionSeleccionados));

        const observableAxios__auth = new Observable((observer) => {
            axios({
                method: "post",
                url: process.env.VUE_APP_URL_AXIOS + 'asignacion__perfil__roles',
                data: paqueteDeDatos,
                headers: { "Content-Type": "multipart/form-data" },
            }).then((response) => {
                observer.next(response.data);
                observer.complete();
            }).catch((error) => {
                observer.error(error);
            });
        });

        const subscription = observableAxios__auth.subscribe({
            next: (data) => {

                if(data.mensaje==1){

                    mensajeConfirmacion();

                }

            },
        });

    });
}
  
export  {alertaGeneral__administrarPerfiles};