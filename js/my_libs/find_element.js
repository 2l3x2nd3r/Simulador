function find_element(data,value){
    var a = data.c_1
    var elem_want = parseFloat(value);
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
        // alert("elemento 1 data.c_1 inferior: "+ data.c_1[element_find.index_i]+"elemento 1 data.c_2 inferior: "+ data.c_2[element_find.index_i] +
        // "\n" + "elemento 2 data.c_1 superior: "+ data.c_1[element_find.index_f]+"elemento 2 data.c_2 superior: "+ data.c_2[element_find.index_f])

    var result1 = (data.c_2[element_find.index_f] - data.c_2[element_find.index_i]);
    var result2 = (data.c_1[element_find.index_f] - data.c_1[element_find.index_i]);
    var result3 = (result1 / result2);
    var result4 = (result3 * ((data.c_1[element_find.index_f])-elem_want));
    var result5 = ((data.c_2[element_find.index_f]) - (result4));
    return result5;
}