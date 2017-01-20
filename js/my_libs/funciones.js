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
    var op = JSON.parse($("input[name=opg]:checked").val())
    if(!op){
      $('#outred').hide()
    }else{
      $('#outred').show()
    }
    change_values()
  })
});
function constructor()
{
  $('input:not(.disabled_always)').prop('disabled', false) // habilito todos los input exepto los de salida
  $('#xlf').prop('disabled', true)
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

function descent(points){
  return (points.y2 - points.y1)/(points.x2 - points.x1);
}

function calculate_ecuation(points) {
  sign1 = ' - ';
  sign2 = ' + ';
  if(points.x1 < 0){
    sign1 = ' + ';
    points.x1 *= -1;
  }
  if(points.y1 < 0){
    sign2 = ' - ';
    points.y1 *= -1;
  }
  ecuation = descent(points) + " * (theta" + sign1 + points.x1 + ")" + sign2 + points.y1;
  console.log(ecuation);
  return ecuation;
}

function change_values(){
  var ok = $('.input_always').toArray().every(function (input) {
    if ($(input).val())
      return true
    else
      return false
  })
  var ea_find = find_element(values_xls,$("#if_a").val())
  if(ok){
    $('#s_g').show()
    var pcarga=parseFloat($('#pcarga').val());
    var qcarga=parseFloat($('#qcarga').val());
    var vcarga=parseFloat($('#vcarga').val());
    var op = JSON.parse($("input[name=opg]:checked").val())

    //PASO 1
    var pot=(Math.pow(pcarga,2));
    var pot1=(Math.pow(qcarga,2));
    var rpot=pot+pot1;
    var resul=(Math.pow(rpot,0.5))

   //PASO 2
    var r3=(Math.sqrt(3));
    var r4=resul/(r3*vcarga);
    $('#i_a').val(r4);

    //PASO 3
    var r5=pcarga/resul;
    $('#fp').val(r5);

  //salida 3
    var polos=parseFloat($('#polos').val());
    var sp=parseFloat($('#sp').val());
    var fnom=parseFloat($('#fnom').val());
    var nvacio=parseFloat($('#nvacio').val());

    if (op){
      var fsc = (polos * nvacio) / 120;
      var fsc1 = (fsc-fnom);
      var pgen = sp * fsc1;
    }else{
      var pgen = pcarga
    }
    $('#pgen').val(pgen);

    //salida 7
    var ra=parseFloat($('#RA').val());
    var xs=parseFloat($('#XS').val());
    var rad = 180/(Math.PI) //180/pi()
    //  potencia
    var ra1=Math.pow(ra,2);
    var ra2=Math.pow(xs,2);
    //  suma de potencias
    var ra3=ra1+ra2;
    //  raiz
    var raizt=Math.sqrt(ra3); // raiz de la suma de potencias

    var  vn  =  document.getElementById('Vnom').value;
    var Vf = 0
    var Vt = null
    if(!op){
      var A = 1
      var B = 2 * ra * (pcarga/3) + 2 * xs * (qcarga/3) - Math.pow(ea_find,2)
      var C = (ra3 * rpot) / 9
      Vf = Math.sqrt(((B * -1) + Math.sqrt(Math.pow(B,2)-4*A*C))/(2*A))
      if(!document.getElementById('Conexion').checked){
        Vt= Vf*Math.sqrt(3);
      }else{
        Vt = Vf
      }
      $('#vt').val(Vt.toFixed(3));
      $('#vt_div').show()

    }else{
      if(!document.getElementById('Conexion').checked){
        Vf=parseFloat(vn) / Math.sqrt(3);
      }else{
        Vf=parseFloat(vn);
      }
      $('#vt_div').hide()
    }
    var prt3 = 3 * ea_find * Vf;
    var prt31= (pgen/prt3);
    var prt32= raizt * prt31 // primera parte de la suma RAIZ(G8^2+H8^2)*Q15/(3*Q6*Q7)


    var raxs=Math.atan(xs/ra);

    var raxs2 = Math.cos(raxs* -1) / ea_find;

    var raxs3 = Vf * raxs2 // segunda parte de la suma Q7*COS(-ATAN(H8/G8))/Q6

    var raizt1=Math.acos(prt32 + raxs3); // arcoseno grande ACOS(RAIZ(G8^2+H8^2)*Q15/(3*Q6*Q7) + Q7*COS(-ATAN(H8/G8))/Q6)

    //ope salida 7
    var ope= rad * ( (raizt1 * -1) + raxs)
    $('#delta').val(ope.toFixed(3));

    if (op){
    //salida N°4
      var sen1 = -3 * ea_find * Vf * Math.sin(((ope * Math.PI)/180 )- Math.atan(xs/ra)) //1ra suma del parentesis -3*Q6*Q7*SENO(Q16*PI()/180-ATAN(H8/G8))
      var sen2 = (3*Vf*Vf)*(Math.sin((raxs * -1))) // 2da suma del parentesis grande 3*Q7*Q7*SENO(-ATAN(H8/G8))
      var qgen = (sen1 + sen2) / raizt // operacion (-3*Q6*Q7*SENO(Q16*PI()/180-ATAN(H8/G8))+3*Q7*Q7*SENO(-ATAN(H8/G8)))/RAIZ(G8^2+H8^2)
    }else{
      var qgen = qcarga
    }
    $('#qgen').val(qgen);

    //salida 5
    var pote  = Math.pow(pgen,2);
    var pote1 = Math.pow(qgen,2);
    var fpgen = pgen/(Math.sqrt(pote+pote1));
    $('#fpnom').val(fpgen);

    //salida 6
    var sal = Math.sqrt((Math.pow(pgen,2)+Math.pow(qgen,2)))/(Math.sqrt(3)*parseFloat(vn));
    $('#ia').val(sal);

    //salida 8
    var acos = Math.acos(fpgen)*rad;
    $('#teta').val(acos);

    if (op){
      var sn = pcarga-pgen
      var sd = qcarga-qgen
      var sd1 =(Math.pow(sn,2)+(Math.pow(sd,2)));
      var sred = Math.sqrt(sd1)
      var fpred = sn/sred
    }else{
      var sn = 0
      var sd = 0
      var sred = 0
      var fpred = 0
    }
    //salida 9
    $('#pred').val(sn);
    //salida 10
    $('#pred2').val(sd);
    //salida 11
    $('#sred').val(sred);
    //salida 12
    $('#fpred').val(fpred);

    if(op){
    //salida 13 1
      var EAx = ea_find*Math.cos(ope*Math.PI/180);
    //salida 13 2
      var EAy= ea_find*Math.sin(ope*Math.PI/180);
    }else{
    //salida 13 1
      var EAx = ea_find*Math.cos(acos*Math.PI/180);
    //salida 13 2
      var EAy= ea_find*Math.sin(acos*Math.PI/180);
    }

    //salida 14 1
    var VRAx= sal*ra*(Math.cos(-acos*Math.PI/180));
    //salida 14 2
    var VRAy= sal*ra*(Math.sin(-acos*(Math.PI/180)));

    //salida 15 1
    var VXSx= sal*xs*Math.cos(Math.PI/2-acos*Math.PI/180);
    //salida 15 2
    var VXSy= sal*xs*Math.sin(Math.PI/2-acos*Math.PI/180);

    //salida 16 1
    var Vfx = Vf;
    //salida16 2
    var Vfy=0;

    $('#plot').empty();

    gr = new jsGraphics(document.getElementById("plot"));
    gr.setOrigin(new jsPoint(1, 300));
    gr.setCoordinateSystem("cartecian");
    gr.showGrid(20);

    console.log(EAx, ' - ', EAy);
    console.log(VRAx, ' - ', VRAy);
    console.log(VXSx, ' - ', VXSy);
    console.log(Vfx, ' - ', Vfy);

    pts = {_1: new jsPoint(0, 0), _2: new jsPoint(Vfx + VRAx + VXSx, VRAy + VXSy)}
    gr.drawLine(new jsPen(new jsColor("red"), 2), pts._1, pts._2);
    // console.log(pts._1, ' - ', pts._2);
    pts = {_1: new jsPoint(Vfx, Vfy), _2: new jsPoint(Vfx + VRAx, VRAy)}
    gr.drawLine(new jsPen(new jsColor("blue"), 2), pts._1, pts._2);
    // console.log(pts._1, ' - ', pts._2);
    pts = {_1: new jsPoint(Vfx + VRAx, VRAy), _2: new jsPoint(Vfx + VRAx + VXSx, VRAy + VXSy)}
    gr.drawLine(new jsPen(new jsColor("green"), 2), pts._1, pts._2);
    // console.log(pts._1, ' - ', pts._2);
    pts = {_1: new jsPoint(0, 0), _2: new jsPoint(Vfx, 0)}
    gr.drawLine(new jsPen(new jsColor("yellow"), 2), pts._1, pts._2);
    // console.log(pts._1, ' - ', pts._2);
  }

};
