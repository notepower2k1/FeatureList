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
const brightnessValue = document.querySelector('#input--brightness')
const saturateValue = document.querySelector('#input--saturate')

const normal = document.querySelector('#html')
const horizontal = document.querySelector('#css')
const vertical = document.querySelector('#javascript')


const inputvalue = document.querySelectorAll('.input');

 for(i=0;i<inputvalue.length;i++)
 {
   inputvalue[i].oninput = function(){
    output.style.filter = 'saturate(' + saturateValue.value+ '%' +')' + 'brightness(' + brightnessValue.value+ '%' +')' + 'blur(' + blurValue.value/10 + 'px' +')' + 'contrast(' + constrastValue.value+ '%' +')' +'hue-rotate(' + hueValue.value+ 'deg' +')' +'sepia(' + sepiaValue.value+ '%' +')';

   }
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
  constrastValue.value = 100;
  hueValue.value = 0;
  sepiaValue.value = 0;
  horizontal.checked = false;
  normal.checked = false;
  vertical.checked = false;
  saturateValue.value = 100;
  brightnessValue.value = 100;
  output.style.transform = 'none';
  output.style.filter ='none'
}
