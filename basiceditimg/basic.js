var output = document.getElementById('output');
 var loadFile = function(event) {
    var reader = new FileReader();
    reader.onload = function(){
     
      output.src = reader.result;
    
     
    };
    reader.readAsDataURL(event.target.files[0])
   

  };
const blurValue = document.querySelector('#input--blur')
const constrastValue = document.querySelector('#input--constrast')
const hueValue = document.querySelector('#input--hue')
const sepiaValue = document.querySelector('#input--sepia')
const normal = document.querySelector('#html')
const horizontal = document.querySelector('#css')
const vertical = document.querySelector('#javascript')


blurValue.oninput = function(){
    output.style.filter = 'blur(' + blurValue.value/10 + 'px' +')';
}

constrastValue.oninput = function(){
   
    output.style.filter = 'contrast(' + constrastValue.value+ '%' +')';
}

hueValue.oninput = function(){
  output.style.filter = 'hue-rotate(' + hueValue.value+ 'deg' +')';
}

sepiaValue.oninput = function(){
  output.style.filter = 'sepia(' + sepiaValue.value+ '%' +')';
}

horizontal.onchange = function(){
  output.style.transform = 'scaleX(-1)'
}
normal.onchange = function(){
  output.style.transform = 'none'
}

vertical.onchange = function(){
  output.style.transform = 'scaleY(-1)'
}

function Reset(){
  blurValue.value = 0;
  constrastValue.value = 50;
  hueValue.value = 0;
  sepiaValue.value = 0;
  horizontal.checked = false;
  normal.checked = false;
  vertical.checked = false;
  output.style.transform = 'none';
  output.style.filter ='none'
}