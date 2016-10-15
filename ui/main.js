console.log('Loaded!');
var ele=document.getElementById('madi');
mRight= 0;
function move(){
  mRight= mRight + 10;  
  ele.style.marginRight= mRight + 'px';
}
ele.onclick = function(){
var interval= ele.setInteval(move,10);
};

var button=document.getElementById('counter');
button.onClick = function() {
    counter=0;
    counter=counter+1;
    var span=document.getElementById('count');
    span.innerHTML = counter.toString();
    
};