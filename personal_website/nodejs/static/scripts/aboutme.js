 /*
  $(document).ready(function(){
    $("#mee").click(function(){
      $("#output").load("aboutmestory");
    });
  });  it is working as well  */ 

  $(document).ready(function(){
    $("#mee").click(function(){
      $("#not").animate({
        height: 'toggle'
      });
    });
  });