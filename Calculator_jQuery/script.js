$(document).ready(function(){

var count = 0;
$("button").click(function(){
  console.log("button clicked!");
  $("#display").val($("#display").val() + $(this).val());
  count++;
  if (count > 30) {
    $("#display").val("LIMIT IS REACHED! ENTER AC!");
    count = 0;
  }
});

$("#clear").click(function(){
  $("#display").val("");
});

$("#equals").on("click", function(){
  var result = $("#display").val();
  $("#display").val(eval(result));
  count = 0;
});


});
