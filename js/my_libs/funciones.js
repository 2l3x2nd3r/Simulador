$(document).on('ready',function(){
  $('input:not([type=file])').prop('disabled', true) // deshabilito todos los input hasta que se carge el archivo

  //Se 'amarra' el slide con el input
  $("#if_a").on('input',function(){
    $("#if_a_slide").val($(this).val())
  })
  $("#pcarga").on('input',function(){
    $("#pcarga_range").val($(this).val())
  })
  $("#qcarga").on('input',function(){
    $("#qcarga_range").val($(this).val())
  })
  $("input[name=opg]").change(function(){
    change_values()
  })
});
function constructor()
{
  $('input:not(.disabled_always)').prop('disabled', false) // habilito todos los input exepto los de salida
  $('input[type=range],input[type=number]').each(function(){
    $(this).prop('step',0.001) //se define el step de todos los input range
  })
  //Se definen rangos en sliders
  $('#if_a_slide').prop(
    {
      'min': values_xls.c_1[0],
      'max': values_xls.c_1[values_xls.c_1.length-1]
    }
  ).val(values_xls.c_1[0]);
  $('#if_a').val(values_xls.c_1[0]);
  $('#pmax').change(function(){
    $('#pcarga_range').prop(
      {
        'min': 0,
        'max': $(this).val()
      }
    ).val($(this).val()/2)
    $('#pcarga').val($(this).val()/2)
  })
  $('#qmax').change(function(){
    $('#qcarga_range').prop(
      {
        'min': 0,
        'max': $(this).val()
      }
    ).val($(this).val()/2)
    $('#qcarga').val($(this).val()/2)
  })
  //finaliza
  $('.input_always').on('change', change_values) //se agrega el listener
}

function if_a_slide(value) {
  $("#if_a").val(value)
  change_values()
}
function pcarga_range(value) {
  $("#pcarga").val(value)
  change_values()
}
function qcarga_range(value) {
  $("#qcarga").val(value)
  change_values()
}

function change_values(){
  var ok = $('.input_always').toArray().every(function (input) {
    if (!$(input).val())
      return false
  })
  if(ok){
    var result5 = find_element(values_xls,$("#if_a").val())
    var pcarga=parseFloat($('#pcarga').val());
    var qcarga=parseFloat($('#qcarga').val());
    var vcarga=parseFloat($('#vcarga').val());

    //PASO 1
    var pot=(Math.pow(pcarga,2));
    var pot1=(Math.pow(qcarga,2));
    var rpot=pot+pot1;
    var resul=(Math.pow(rpot,0.5))

   //PASO 2
    var r3=(Math.sqrt(3));
    var r4=resul/(r3*vcarga);
    $('#total').val(r4);

    //PASO 3
    var r5=pcarga/resul;
    $('#total1').val(r5);

  //salida 3
    var polos=parseFloat($('#polos').val());
    var sp=parseFloat($('#sp').val());
    var fnom=parseFloat($('#fnom').val());
    var nvacio=parseFloat($('#nvacio').val());

    var fsc=(polos * nvacio) / 120;
    var fsc1=(fsc-fnom);
    var fsc2= sp * fsc1;
    $('#pgen').val(fsc2);

    //salida 7
    var ra=parseFloat($('#RA').val());
    var xs=parseFloat($('#XS').val());
  // parentesis(1)
    var raxs=Math.atan(ra/xs);

  //  potencia
    var ra1=Math.pow(ra,2);
    var ra2=Math.pow(xs,2);

  //  suma de potencias
    var ra3=ra1+ra2;
  //  raiz
    var raizt=Math.sqrt(ra3);

    var  con =  document.getElementById('Conexion').value;
    var  vn  =  document.getElementById('Vnom').value;


    if(con==220 && vn==220) {
      var conex=220;
  	}else {
      var conex=document.getElementById('Conexion').value * Math.sqrt(3);
    }

    //parentesis (2)
    var raxs1= (raxs/conex);
    var raxs2 = Math.cos(raxs1);

    //parentesis (3)
    var prt3 = 3 * (conex * result5);
    var prt31= (fsc2/prt3);
    var prt32=(prt31 + conex);

    //parentesis (4)
    var raizt1=Math.acos(raizt);
    var rad= (180/(Math.PI))*(raizt1);

    //ope salida 7
    var ope= (rad * prt32 * raxs2) + (conex  + raxs);
    $('#delta').val(ope.toFixed(3));

    //salida N°4
    //parentesis
    var sen = (3*conex*conex)*(Math.sin(raxs/raizt1));
    var sen1 = 3*result5*conex * Math.sin(ope * Math.PI/180 ) - (raxs + sen);
    $('#qgen').val(sen1);

    //salida 5
    var pote  = Math.pow(ope,2);
    var pote1 = Math.pow(sen1,2);
    var pote3 = fsc2/(Math.sqrt(pote+pote1));
    $('#fpnom').val(pote3);

    //salida 6
    var sal = Math.sqrt(Math.pow(fsc2,2)+Math.pow(sen1,2)/Math.sqrt(3)*document.getElementById('Vnom').value);
    $('#ia').val(sal);

    //salida 8
    var acos = Math.acos(pote3*180/Math.PI);
    $('#teta').val(acos);

    //salida 9
     var sn = $('#pred').val(document.getElementById('pcarga').value-(fsc2));

    //salida 10
     var sd = $('#pred2').val(document.getElementById('qcarga').value-(sen1));

    //salida 11
    var sd1 =(Math.pow(sn.val(),2))+(Math.pow(sd.val(),2));
    $('#sred').val(Math.sqrt(sd1));

    //salida 12
    $('#fpred').val(sn.val()/sd1);

    //salida soledad 1
    var sol = result5*Math.cos(ope*Math.PI/180);
    //salida soledad2
    var sol1= result5*Math.sin(ope*Math.PI/180);


    //salida 14 1
    var s14= sal*document.getElementById('RA').value*(Math.cos(-acos*Math.PI/180));
    //salida 14 2
    var s142= sal*document.getElementById('RA').value*(Math.PI/180);

    //salida 15 1
    var s15= sal*document.getElementById('XS').value*Math.cos(Math.PI/2-acos*Math.PI/180);
    console.log(s15);
    //salida 15 2
    var s151= sal*document.getElementById('XS').value*Math.sin(Math.PI/2-acos*Math.PI/180);
    console.log(s151);

    //salida 16 1
    var s16 = conex;
    //salida16 2
    var s161=0;
  }
};
