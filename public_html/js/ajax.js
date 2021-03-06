$(document).ready(function () {
    ///////DataTable
//   $('#users').dataTable({
//        "aProcessing": true,
//        "aServerSide": true,
//        "ajax": "/enrutador/listarVentas.php",
//        "order": [[ 0, "desc" ]],
//        language: {
//        "decimal": "",
//        "emptyTable": "No hay información",
//        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
//        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
//        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
//        "infoPostFix": "",
//        "thousands": ",",
//        "lengthMenu": "Mostrar _MENU_ Entradas",
//        "loadingRecords": "Cargando...",
//        "processing": "Procesando...",
//        "search": "Buscar:",
//        "zeroRecords": "Sin resultados encontrados",
//        "paginate": {
//            "first": "Primero",
//            "last": "Ultimo",
//            "next": ">",
//            "previous": "<"
//        }
//    }
//    
//        
//    });
   
   
            
    
    //// ajax que carga cuentas inactivas
    $.ajax({
        // En data puedes utilizar un objeto JSON, un array o un query string
        data: {cr: 'gsbancoGetCuentas', cl: 'gsbanco', campos: 'numero'},
        //Cambiar a type: POST si necesario
        type: "POST",
        // Formato de datos que se espera en la respuesta
        //dataType: "json",
        // URL a la que se enviará la solicitud Ajax
        url: "../public_html/enrutador/index.php",
    })
            .done(function (data, textStatus, jqXHR) {
                if (console && console.log) {
                    //console.log("La solicitud se ha completado correctamente.");
                    console.log(data);
                    var response = JSON.parse(data);
                    //console.log(response[0].id);
                    var a=0;
                    
                    $.each(response, function(){
                        
                        //console.log(response[a].id);
                        $("#cuenta").append('<option value="'+response[a].id+'">'+response[a].numero+'</option>');
                        a++;
                     });
                   
                    //onsole.log(data);

                }
            });
    
    //Agregar movimiento
    $("#nuevo").click(function (e) { 
    $('#movimiento').removeClass()('hidden');
    });

});

 //// ajax que carga movimientos po cuentas
  $('#cuenta').on('change', function() {
    var array = {'monto': 'monto', 'tipo_movimiento':'tipo_movimiento' , 'fecha_movimiento': 'fecha_movimiento', 'descripcion': 'descripcion','cuenta':'cuenta_id'};
    var condicion=$('#cuenta').val();
    $.ajax({
        // En data puedes utilizar un objeto JSON, un array o un query string
        data: {cr: 'gsbancoGetMovimiento', cl: 'gsbanco', campos: array,condicion:condicion},
        //Cambiar a type: POST si necesario
        type: "POST",
        // Formato de datos que se espera en la respuesta
        //dataType: "json",
        // URL a la que se enviará la solicitud Ajax
        url: "../public_html/enrutador/index.php",
    })
            .done(function (data, textStatus, jqXHR) {
                if (console && console.log) {
                    //console.log("La solicitud se ha completado correctamente.");
                    //console.log(data);
                    var response = JSON.parse(data);
                    //console.log(response[0]);
                    var a=0;
                    agregar_mov_tabla(response);
                   

                }
            });
        });
/////REALIZAR COMPRA

function contactar() {

    var email = validarEmail('email');
    var banco = validarTexto('banco');
    var tipoCuenta = validarTexto('tipoCuenta');
    var numeroCuenta = validarnumcuenta('numeroCuenta');
    var nombre = validarTexto('nombre');
    var cedula = validarVacio('cedula');
    var cantidad = validarVacio('cantidad');
    var nameChart = validarTexto('nameChart')
    var mensajeError = 'La información suministrada es incorrecta';


    if ((email == true && nombre == true && cantidad == true && banco == true && tipoCuenta == true && numeroCuenta == true && cedula == true && nameChart == true)) {

        var email = $('#email').val();
        var banco = $('#banco').val();
        var tipoCuenta = $('#tipoCuenta').val();
        var numeroCuenta = $('#numeroCuenta').val();
        var nombre = $('#nombre').val();
        var cedula = $('#cedula').val();
        var cantidad = $('#cantidad').val();
        var nameChart = $('#nameChart').val();
        var comentario = $('#comentario').val();
        var telefono = $('#telefono').val();
        //SE arma el array      
        var array = {'email': email, 'nombre': nombre, 'comentario': comentario, 'telefono': telefono, 'banco': banco, 'tipoCuenta': tipoCuenta, 'numeroCuenta': numeroCuenta, 'nameChart': nameChart, 'cantidad': cantidad, 'cedula': cedula};
        ajax_general_('tutibia', 'tutibia', array);
        cleanForm('vender');

    } else {

        alerta(3, mensajeError, 1300);
    }
}
function guardar_movimiento() {

   
   
    var monto = validarVacio('monto');
    var tipo_movimiento = validarVacio('tipo_movimiento');
    var fecha_movimiento = validarVacio('fecha_movimiento');
    var descripcion = validarTexto('descripcion');
    var cuenta=validarVacio('cuenta');


    if ((monto == true && tipo_movimiento == true && fecha_movimiento == true && descripcion == true && cuenta==true)) {

        var monto = $('#monto').val();
        var tipo_movimiento = $('#tipo_movimiento').val();
        var fecha_movimiento = $('#fecha_movimiento').val();
        var descripcion = $('#descripcion').val();
        var cuenta_id=$('#cuenta').val();
        
        //SE arma el array      
        var array = {'monto': monto, 'tipo_movimiento':tipo_movimiento , 'fecha_movimiento': fecha_movimiento, 'descripcion': descripcion,'cuenta_id':cuenta_id};
       
        var data=ajax_guardar_movimiento('gsbanco', 'guardarMovimiento', array);
        agregar_mov_tabla(data);
        limpiar_movimiento();
        

    } else {

        alerta(3, mensajeError, 1300);
    }
}


///Agregar dinamicamente movimiento
function agregar_mov_tabla(data) {
    console.log(data);
    var table = document.getElementById("js-table");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3= row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(3);
    cell1.innerHTML = data[0].tipo_movimiento;
    cell2.innerHTML = data[0].fecha_movimiento;
    cell3.innerHTML = data[0].descripion;
    cell4.innerHTML = data[0].monto;
    cell5.innerHTML = '<button type="button" class="btn input-lg pull-right btn-success col-xs-12 col-md-5 pull-right" name="activar" id="activar" disabled="disabled">Activar</button>';
 
}
/////limpia campos movimiento
function limpiar_movimiento(){
    $('#monto').val('');
    $('#tipo_movimiento').val('');
    $('#fecha_movimiento').val('');
    $('#descripcion').val('');    
}

function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

function ajax_guardar_movimiento(cl, cr, data) {
    //cargador();
    //console.log(data);

    //var $form = $("#vender");
    //var data = getFormData($form);
    //console.log(form);

    $.ajax({
        // En data puedes utilizar un objeto JSON, un array o un query string
        data: {cr: cr, cl: cl, campos: data},
        //Cambiar a type: POST si necesario
        type: "POST",
        // Formato de datos que se espera en la respuesta
        //dataType: "json",
        // URL a la que se enviará la solicitud Ajax
        url: "enrutador/index.php",
    })
            .done(function (data, textStatus, jqXHR) {
                if (console && console.log) {
                    //console.log("La solicitud se ha completado correctamente.");
                    //$('#precio').html(response.valor);
                    console.log(data);

                    var response = JSON.parse(data);
                    //console.log(response);
                    if (response.mensaje == 'mensaje') {
                        //console.log('estoy aca perro');
                        alerta(response.tipo_mensaje, response.mensaje_pantalla, response.tiempo);

                    }
                    if (response.valor > 0) {
                        //console.log(response);
                        $('#valor').val(response.valor);
                        //console.log(response.valor);
                       
                    }
                    if (response.resultado != 'undefined') {
                        $('#revision_result').val(response.resultado);
                    }

                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("La solicitud a fallado: " + textStatus);
                
                    //console.log("La solicitud se ha completado correctamente.");
                    console.log(data);
                    var response = JSON.parse(data);
                    //console.log(response[0].id);
                    //si hay error en la carga
                    if (response[0].tipo_mensaje=='3'){
                        alerta(response[0].tipo_mensaje,response[0].mensaje_pantalla,response[0].tiempo);
                    }else{
                        
                        agregar_mov_tabla(response[0]);
                    }
                    
                }
                
            });
    //cargador();

}




function ajax_general_(cl, cr, data) {
    cargador();
    //console.log(data);

    //var $form = $("#vender");
    //var data = getFormData($form);
    //console.log(form);

    $.ajax({
        // En data puedes utilizar un objeto JSON, un array o un query string
        data: {cr: cr, cl: cl, campos: data},
        //Cambiar a type: POST si necesario
        type: "POST",
        // Formato de datos que se espera en la respuesta
        //dataType: "json",
        // URL a la que se enviará la solicitud Ajax
        url: "/enrutador/index.php",
    })
            .done(function (data, textStatus, jqXHR) {
                if (console && console.log) {
                    //console.log("La solicitud se ha completado correctamente.");
                    //$('#precio').html(response.valor);
                    console.log(data);

                    var response = JSON.parse(data);
                    //console.log(response);
                    if (response.mensaje == 'mensaje') {
                        //console.log('estoy aca perro');
                        alerta(response.tipo_mensaje, response.mensaje_pantalla, response.tiempo);

                    }
                    if (response.valor > 0) {
                        //console.log(response);
                        $('#valor').val(response.valor);
                        //console.log(response.valor);
                       
                    }
                    if (response.resultado != 'undefined') {
                        $('#revision_result').val(response.resultado);
                    }

                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("La solicitud a fallado: " + textStatus);
                }
            });
    cargador();

}

//$("#vender").on("submit", function(e){
//    var name = $('#nombre').val();
//    if (name.checkValidity() == false) {
//        
//    }else{
//        ajax_general_();
//    }
//    
//    //
//});











//Video-background code
$(document).ready(function () {


    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function () {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(".filter").height();
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height', unitHeight);

}
function validarnumcuenta(campo) {
    var valor = $('#' + campo).val();

    if (valor.length < 20 || valor.length > 20) {
        campoError(campo);
        return false;
    } else if (valor.length == 20) {
        return true;
    }
}


function initBannerVideoSize(element) {

    $(element).each(function () {
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element) {

    var windowWidth = $(window).width(),
            windowHeight = $(window).height() + 5,
            videoWidth,
            videoHeight;

    //console.log(windowHeight);

    $(element).each(function () {
        var videoAspectRatio = $(this).data('height') / $(this).data('width');

        $(this).width(windowWidth);

        if (windowWidth < 1000) {
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top': 0, 'margin-left': -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}


////FUNCION QUE QUITA LOS ESPACIO EN BLANCO A PRINCIPIO Y AL FINAL DE LA CADENA Y VERIFICA QUE EL VALOR NO SEA NULO

function quitarSpacio(valor) {
    if (valor !== undefined) {
        //console.log('estoy aqui');
        var retorno = valor.replace(/^\s+/g, '');
        retorno = retorno.replace(/\s+$/g, '');
        return retorno;
    } else {
        valor = '';
    }
    return valor;
}


//FUNCION QUE VALIDA CAMPO MAIL DESDE EL CLIENTE
function validarEmail(campo) {
    var valor = $('#' + campo).val();

    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
        return true;
    } else {
        campoError(campo);
        return false;
    }
}
//FUNCION QUE VALIDA CAMPOS SOLO LETRAS DESDE EL CLIENTE
function validarTexto(campo) {
    //console.log(campo);
    var valor = $('#' + campo).val();
    //console.log(valor);
    valor = quitarSpacio(valor);

    if (/^[zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+$/i.test(valor) || valor != '') {
        return true;
    } else {
        campoError(campo);
        //console.log('estoy aqui');
        return false;
    }
}

function validarVacio(campo) {
    var valor = $('#' + campo).val();
    valor = quitarSpacio(valor);

    if (valor != '') {
        return true;
    } else {
        campoError(campo);
        //console.log('estoy aqui');
        return false;
    }
}
//CAMBIA EL ATTRIBUTO CSS BORDER COLOR A LOS CAMPOS EN CASO DE ESTAR MARCADO POR ERROR
function campoError(campo) {
    $('#' + campo).css('border-color', 'red');
}
function restaura(campo) {
    $('#' + campo).css('border-color', '#ccc');
}
function selecciona(campo) {
    $('#' + campo).css('border-color', '#66afe9');
}

/////////FUNCION PARA LIMPIAR LE FORMULARIO 
function cleanForm(frm) {
    $("#" + frm)[0].reset();
}

//Valida Saldos para activar botton

function btn_activar(){
  
    if ($('#saldo_libro').val()==$('#saldo_banco').val() && $('#cuenta').val()!='' && $('#saldo_libro').val()!='' && $('#saldo_banco').val()!='' && $('#fecha').val()!=''  ){
        
        $('#activar').removeAttr('disabled');    
        $('#movimiento').addClass('hidden');
    }else{
        $('#activar').attr('disabled',true);
    }


if ($('#saldo_libro').val()!=$('#saldo_banco').val() && $('#cuenta').val()!='' && $('#saldo_libro').val()!='' && $('#saldo_banco').val()!='' && $('#fecha').val()!=''  ){
        
        $('#nuevo').removeAttr('disabled');
        
        
    }else{
        $('#nuevo').attr('disabled',true);
    }
}

//activar boon guardar
function btn_activar_guardar(){
    
    if ($('#fecha_movimiento').val()!='' && $('#tipo_movimiento').val()!='' && $('#descripcion').val()!='' && $('#monto').val()!=''){
        
        $('#guardar').removeAttr('disabled');      
    }else{
        $('#guardar').attr('disabled',true);
    }
}


//Mensaje de alerta

function alerta(tipo, msj, tiempo) {
    //ALERTAS:
    //1 = INFORMACION
    //2 = ALERTA
    //3 = PELIGRO
    //4 = CORRECTO
    if (tipo == 1) {
        var mensaje = "<div class='alert alert-info'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + msj + "</div>";
    }
    else if (tipo == 2) {
        var mensaje = "<div class='alert alert-warning'><i class='info_icon fa fa-exclamation-triangle' aria-hidden='true'></i>" + msj + "</div>";
    }
    else if (tipo == 3) {
        var mensaje = "<div class='alert alert-danger'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + msj + "</div>";
    }
    else if (tipo == 4) {
        var mensaje = "<div class='alert alert-success'><i class='info_icon fa fa-check' aria-hidden='true'></i>" + msj + "</div>";
    }

    var div = document.getElementById('info-top');
    div.style.display = 'block';
    div.innerHTML = mensaje;

    setTimeout(function () {
        $(div).css({'display': 'none'});
    }, tiempo);
}

function cargador() {
    notis('cargador');
    document.getElementById('cargador').innerHTML = '<div id="cargador_notis" style="text-align:center;"><i class="fa fa-refresh fa-spin fa-2x fa-fw" aria-hidden="true"></i></div>';
}
function revisar() {
    var revisar = $('#revisar').val();

    if (revisar)
        ajax_general_('tutibia', 'revisar', $('#revisar').val());

    if ($('#revisar').val() == '')
        $('#revision_result').val('');
}


function calculadora(x, z) {

    ajax_general_('tutibia', 'valor', '');
    var precio = $('#valor').val();
    var y = 0;

    //console.log($('#'+x).val());
    //console.log(100%25);
    if ($('#' + x).val() == 25 || ($('#' + x).val() % 25) <= 0) {
        //console.log('estoy aca');
        if ($('#' + x).val() > 2500) {
            $('#' + x).val(2500);
        }
        y = ($('#' + x).val() * precio / 25);
        //format(y);
        $('#' + z).val(y + ' BSF');

    }
    else {
        $('#' + z).val('Solo Multiplos de 25');
    }
}
function redondea(x, z) {

    var residuo = 0;
    var redondeo = 0;
    if ($('#' + x).val() > 25) {
        residuo = Math.round($('#' + x).val() / 25);
        //console.log(residuo);
        redondeo = 25 * residuo;
        $('#' + x).val(redondeo);

    } else if ($('#' + x).val() < 25) {
        //console.log('estoy aqui');
        $('#' + x).val(25);
    }
    calculadora(x, z);
}


//Funcion oculta y muestra un elemento X
function notis(cual) {
    var elElemento = document.getElementById(cual);
    if (elElemento.style.display == 'block') {
        elElemento.style.display = 'none';
    } else {
        elElemento.style.display = 'block';
    }
}
$(function () {
    $('.button-checkbox').each(function () {

        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            }
            else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i>');
            }
        }
        init();
    });
});