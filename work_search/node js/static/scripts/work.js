
$(document).ready(function(){
    $("#image").click(function(){
      $("#contactform").fadeToggle("slow");
      
    });
});

// Car

$(document).ready(function(){
    $("#carlink").click(function(){
      $("#output").load("car");
    });
  });

// Bus

$(document).ready(function(){
    $("#buslink").click(function(){
      $("#output").load("bus");
    });
  });

// Lorry

$(document).ready(function(){
    $("#lorrylink").click(function(){
      $("#output").load("lorry");
    });
  });