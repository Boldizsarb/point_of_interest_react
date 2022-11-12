// quick inbox icon and fucntion 
  $(document).ready(function(){
    $("#image").click(function(){
      $("#contactform").fadeToggle("slow");
      
    });
  });


// advertisement loading with jquerry 
$(document).ready(function(){
  $("#advertlink").click(function(){
    $("#output").load("adverts");
  });
});

// faq2 
$(document).ready(function(){
  $("#faq2").click(function(){
    $("#output").load("faq2");
  });
});

// tips
$(document).ready(function(){
  $("#tipslink").click(function(){
    $("#output").load("tips");
  });
});




