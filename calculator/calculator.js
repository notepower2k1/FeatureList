var input = document.querySelector('.input');
var overlay = document.querySelector('.overlay');
var items = Array.from(document.querySelectorAll('.item'));
items.forEach(function(btn){
    btn.addEventListener('click',function(){
        if(input.innerHTML =='0' || input.innerHTML =='ERROR' )
        input.innerHTML ='';
        
        if(btn.innerHTML =='AC')
       { input.innerHTML = '0';
       overlay.innerHTML='';
    }
        else if(btn.innerHTML =='DEL')
        {
            var arrayText = Array.from(input.innerHTML);
            arrayText.splice(arrayText.length-1,1);
            if(arrayText.length !=0)  
                input.innerHTML = arrayText.join('');
            else
                input.innerHTML = '0';
        }
        else if(btn.innerHTML =='=')
           { 
               if(hasNumber(input.innerHTML)==false){
                input.innerHTML = 'ERROR'
               }
               else
               try{
                overlay.innerHTML = input.innerHTML;
                input.innerHTML = eval(input.innerHTML);
               }
               catch{
                input.innerHTML = 'ERROR';
                overlay.innerHTML='';
               }
           
         
                
        }
        
        else
        input.innerHTML+=btn.innerHTML;
    })

})

function hasNumber(myString) {
    return /\d/.test(myString);
}

function hasdot(myString) {
    return /^[a-zA-Z0-9,]*[.]{0,1}[a-zA-Z0-9,]*$/.test(myString);
}
function Number_Round()
{      
    input.innerHTML = parseFloat(input.innerHTML).toFixed(3);
}