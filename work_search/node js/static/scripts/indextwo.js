
  $(document).ready(function(){
    $("#image").click(function(){
      $("#contactform").fadeToggle("slow");
      
    });
  });

  $(document).ready(function(){
    $("#newcar1").click(function(){
      $("#learner").fadeOut("slow");
      $("#newcar").fadeToggle("slow");
      
    });
  });

  $(document).ready(function(){
    $("#learner1").click(function(){
      $("#newcar").fadeOut("slow");
      $("#learner").fadeToggle("slow"); // toggle comes after the fade out. looks better
      
    });
  });
