function randInt(){
  return Math.floor((Math.random() * 4));
}

function failSound(){
  var failFile = new Audio("sounds/BUZZ.mp3");
  failFile.play();
}

function buttonProps(audioLink, colorClass, colorVal){
  var audio = new Audio(audioLink);
  $(colorClass).css('background','white');
  audio.play(); 
  setTimeout(function(){
    $(colorClass).css('background','white');
    $(colorClass).css('box-shadow','0 5px 155px rgba(145, 92, 182, .7');
    setTimeout(function(){
      $(colorClass).css('background', colorVal);
      $(colorClass).css('box-shadow','0 5px 155px rgba(145, 92, 182, 0');
    }, 300);
  }, 50);
}

var colors = {
  pushRed : function(){
    buttonProps("sounds/SOUND_1.mp3", '.red', '#ff2626')
  },
  pushGreen : function(){
    buttonProps("sounds/SOUND_2.mp3", '.green', '#00ff59')
  },
  pushOrange : function(){
    buttonProps("sounds/SOUND_3.mp3", '.orange', '#ffaa00')
  },
  pushBlue : function(){
    buttonProps("sounds/SOUND_4.mp3", '.blue', '#00bfff')
  }
}

var i = 0;    
var simonArr = [];

function myLoop () {          
  setTimeout(function () {    
    switch(simonArr[i]){
      case 0:
        colors.pushRed();
        break;
      case 1:
        colors.pushGreen();
        break;
      case 2:
        colors.pushOrange();
        break;
      case 3:
        colors.pushBlue();
        break;
    }         
    i++;                     
    if (i < simonArr.length) {            
      myLoop();             
    }                        
  }, 500)
} 

function disable(){
  $(".btn-primary").prop("disabled",true);
}

function enable(){
  $(".btn-primary").prop("disabled",false);
}  

var mode = false;

$(document).ready(function(){
  $('#mode').on('click', function(){
    if($('#strict').html() == 'Strict Mode: Off'){
      $('#strict').html('Strict Mode: On');
      mode = true;
    }
    else{
      $('#strict').html('Strict Mode: Off');
      mode = false;
    }
  });
    
  var counter = 0;

  $('#start').on('click', function(){
    $('#start').remove();
    $('#btnholder').append('<button id="reset" class="btn btn-info">RESET</button>');
  
    simonArr = [];
    simonArr.push(randInt());
      
    $('.overlay').html(1);
    i = 0;
    counter = 0;
    myLoop();

    function success(){
      counter++;  
      if(counter == 20){
        colors.pushRed();
        colors.pushGreen();
        colors.pushOrange();
        colors.pushBlue();
        $('.overlay').html('You Win!');
        disable();
      }
      else if(counter == simonArr.length){
        colors.pushRed();
        colors.pushGreen();
        colors.pushOrange();
        colors.pushBlue();
        simonArr.push(randInt());
        $('.overlay').html(simonArr.length);
        counter = 0;
        i=0;
        setTimeout(function(){
          myLoop();
        }, 500);
      }
    }

    function fail(){
      failSound();
      $('.overlay').html('Fail!');
      i = 0;
      counter = 0;
      
      if(mode){
        simonArr = [];
        simonArr.push(randInt());
        enable();
        setTimeout(function(){
          $('.overlay').html(1);
          myLoop();
        }, 1500);
      }
      else{
        setTimeout(function(){
          $('.overlay').html(simonArr.length);
          myLoop();
        }, 1500);
      }
    }

    $('.red').on('click',function(){
      if(simonArr[counter] == 0){
        colors.pushRed();
        success();
      }
      else{
        fail(); 
      }
    });

    $('.green').on('click',function(){
      if(simonArr[counter] == 1){
        colors.pushGreen();
        success();
      }
      else{
        fail();
      }
    });

    $('.orange').on('click',function(){
      if(simonArr[counter] == 2){
        colors.pushOrange();
        success();
      }
      else{
        fail();
      }
    });

    $('.blue').on('click',function(){
      if(simonArr[counter] == 3){
        colors.pushBlue();
        success();
      }
      else{
        fail();
      }
    });

    $('#reset').on('click', function(){
         simonArr = []
         simonArr.push(randInt());
         enable();
         $('.overlay').html(1);
         i = 0;
         counter = 0;
         myLoop();
    }); 
  });    
});