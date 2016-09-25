console.log('Loaded!');
var ele=document.getElementById('madi');
mRight= 0;
function move(){
  mRight= mRight + 10;  
  ele.style.marginRight= mRight + 'px';
}
 ele.setInteval(move,100);
