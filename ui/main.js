var c= 0;
var button = document.getElementById('counter');
var span = document.getElementById('count');
button.onclick = function() {
c = c + 1;
span.innerHTML = c.toString();
};
