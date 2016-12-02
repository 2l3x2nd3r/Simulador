var a = c_2
var elem_want = parseFloat(document.getElementById('if_b').value);
var element_find = {}
a.find(function(element, index) {
        element = parseFloat(element)
        if (index < a.length - 1) {
            if (element <= elem_want && a[index + 1] >= elem_want) {
                element_find = {
                    e_i: element,
                    index_i: index,
                    e_f: a[index + 1],
                    index_f: index + 1
                }
                return true;
            }
        }
    })
    // alert("elemento 1 c_1 inferior: "+ c_1[element_find.index_i]+"elemento 1 c_2 inferior: "+ c_2[element_find.index_i] +
    // "\n" + "elemento 2 c_1 superior: "+ c_1[element_find.index_f]+"elemento 2 c_2 superior: "+ c_2[element_find.index_f])

var result1 = (c_1[element_find.index_f] - c_1[element_find.index_i]);
var result2 = (c_2[element_find.index_f] - c_2[element_find.index_i]);
var result3 = (result1 / result2);
var result4 = (result3 * result2);
var result5 = ((c_1[element_find.index_f]) * (result4));
    //alert(result5.toFixed(3));