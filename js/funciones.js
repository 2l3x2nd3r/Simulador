$(document).on('ready',constructor);
function constructor()
{
  unoydos();

}
function unoydos()
{
  $('#ejercicios').on('change','#pcarga,#qcarga,#vcarga,#polos,#sp,#fnom,#nvacio,#RA,#X,S,#Vnom', change_values)
}
function change_values(){
   var num1=parseInt($('#pcarga').val());
   var num2=parseInt($('#qcarga').val());
   var num3=parseInt($('#vcarga').val());

  if (isNaN(num1))
    {
      num1=0;
    }
   if (isNaN(num2))
    {
      num2=0;
    }
  if (isNaN(num3))
    {
      num3=0;
    }
  //PASO 1
  var pot=(Math.pow(num1,2));
  var pot1=(Math.pow(num2,2));
  var rpot=pot+pot1;
  var resul=(Math.pow(rpot,0.5))

 //PASO 2
  var r3=(Math.sqrt(3));
  var r4=resul/(r3*num3);
  $('#total').val(r4);

  //PASO 3
  var r5=num1/resul;
  $('#total1').val(r5);


//salida 3
  var p=parseInt($('#polos').val());
  var s=parseFloat($('#sp').val());
  var f=parseInt($('#fnom').val());
  var n=parseInt($('#nvacio').val());

  var fsc=(p * n) / 120;
  var fsc1=(fsc-f);
  var fsc2= s * fsc1;
  $('#pgen').val(fsc2);

  //salida 7
  var ra=parseInt($('#RA').val());
  var xs=parseInt($('#XS').val());
//   arcotangente
  var raxs=Math.atan(ra/xs);
//  potencia
  var ra1=Math.pow(ra,2);
  var ra2=Math.pow(xs,2);
//  suma de potencias
  var ra3=ra1+ra2;
//  raiz
  var raizt=Math.sqrt(ra3);
  // var pare=(ra2/ra1);

  var  a =  document.getElementById('if_a').value;
  var  b =  document.getElementById('if_b').value;
  var  c = 3 * a * b;
  //division VF/EA
  $('#delta').val(c);

  var vnom=parseInt($('#Vnom').val());
    if(vnom==220) {
      // alert(vnom);
  var vnom=220;	}
      else {
  var vnom=vnom*Math.sqrt(3);
        // alert(vnom);
    }
};


// function tresysiete()
// {
//   $('#ejercicicios').on('change','#polos,#sd,#fnom,#nvacio',function(){
//      var p=parseInt($('#polos').val());
//      var s=parseInt($('#sd').val());
//      var f=parseInt($('#fnom').val());
//      var n=parseInt($('#nvacio').val());
//
//     if (isNaN(p))
//       {
//         p=0;
//       }
//      if (isNaN(s))
//       {
//         s=0;
//       }
//     if (isNaN(f))
//       {
//         f=0;
//       }
//       if (isNaN(n))
//         {
//           n=0;
//         }
//         var fsc= (p * n) / 120
//        $('#pgen').val(fsc);
//   })
// }
