$(document).ready(function() {
  var accum = [];
  var multiDigit = '';

  $(".calc").click(function(){
    multiDigit += $(this).text()
    $("#accum").html(accum.join("") + multiDigit);
      $("#display").html(multiDigit);
  });
  
  $("#clear").click(function(){
    accum = [];
    multiDigit = '';
    $("#display").html(0);
    $("#accum").html(0);
  });
  
  $("#equals").click(function(){
    accum.push(multiDigit);
    multiDigit = '';
    var total = accum.reduce(function(final, index){
      return final + index;
    });
    total = eval(total);
    total = parseFloat(total.toFixed(4))
    
    if (total.toString().length >11){
      $("#display").html("Too Large");
      accum = [];
      multiDigit ='';
    }
    else{
      accum = [];
      accum.push(total);
      $("#display").html(total);
      $("#accum").append("=" + total);
    }
  });
});