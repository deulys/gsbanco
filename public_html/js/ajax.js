$(document).ready(function () {
    ///////DataTable
   $('#users').dataTable({
        "aProcessing": true,
        "aServerSide": true,
        "ajax": "/enrutador/listarVentas.php",
        "order": [[ 0, "desc" ]],
        language: {
        "decimal": "",
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ Entradas",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": ">",
            "previous": "<"
        }
    }
    
        
    });
   
    
    
    
    
    
    ///LLenado de footer
    
    $('#cantidadVentas').load(function(){
        
    });



////////HACE EL CAMBIO DE IMAGEN DEL PORTAFOLIO AL PRESIONAR CLICK EN LA IMAGENES MINIATURAS

    $('#zoom').click(function () {
        console.log($('#zoom').attr('src'));
    });
    $(window).scroll(function () {
        if ($("#myNavbar ul li").hasClass("active")) {
            $(".navbar").removeClass("transparency");
        } else {
            $(".navbar").addClass("transparency");
        }
    });

    ////////Ir arriba 
    $('.ir-arriba').click(function () {
        $('body, html').animate({
            scrollTop: '0px'
        }, 300);
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.ir-arriba').slideDown(300);
        } else {
            $('.ir-arriba').slideUp(300);
        }
    });
    /////////EFECTO DE APARICION DE IMAGENES        
    $(window).scroll(function () {
        $(".slideanim").each(function () {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });
    $(window).scroll(function () {
        $(".slideanim").each(function () {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });

                  
////PRECIO
$.ajax({
        // En data puedes utilizar un objeto JSON, un array o un query string
        data: {cr: 'valor', cl: 'tutibia', campos: ''},
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
                    var response = JSON.parse(data);
                    $('#precio').html(response.valor*10+ ' Bs');
                    //onsole.log(data);

                }
            });




    // Initialize Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {

            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });


});

var origheight = $("#trans1").height();
var height = $(window).height();
if (height > origheight) {
    $("#trans1").height(height);
}

$(window).scroll(function () {
    var x = $(this).scrollTop();
    $('#trans1').css('background-position', 'center -' + parseInt(x / 5) + 'px');


});
$(window).on('load', function () {




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

function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
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