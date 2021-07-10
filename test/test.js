var canvas = document.getElementById('image');
var ctx = canvas.getContext('2d');
ctx.filter = "sepia(20%)";
var img = document.getElementById("dataimage");
ctx.drawImage(img,0,0, canvas.width, canvas.height);

var downloadFile = document.getElementById('download');
downloadFile.addEventListener('click', download, false);


function download() {
   var dt = canvas.toDataURL('image/jpeg');
   this.href = dt;
};