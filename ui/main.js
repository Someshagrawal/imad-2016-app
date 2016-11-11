   document.getElementById('login').onmouseover= function(){visible1()};
  document.getElementById('login').onmouseout= function(){invisible1()}; 
  document.getElementById('signup').onmouseover= function(){visible2()};
  document.getElementById('signup').onmouseout= function(){invisible2()}; 
function visible1(){
              document.getElementById('img1').style.opacity = 1;
                    } 
function invisible1(){       
            document.getElementById('img1').style.opacity = 0;
                   }
function visible2(){
               document.getElementById('img2').style.opacity = 1;
                   } 
function invisible2(){
               document.getElementById('img2').style.opacity = 0;
                   } 
var dotanim = document.getElementById('ani');
function dot(){
               dotanim.innerHTML="";
     function dot1(){      
                dotanim.innerHTML=".";
                     }
     function dot2(){
                    dotanim.innerHTML="..";
                    }
     function dot3(){
                    dotanim.innerHTML="..."; 
                     } 
     setTimeout(dot1,1000);
     setTimeout(dot2,2000);
     setTimeout(dot3,3000);                       
     }
  dot();
  var inter = setInterval(dot,4000);