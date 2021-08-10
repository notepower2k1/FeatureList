let inputText = document.querySelector('#input-text')
let wordcount = document.querySelector('.word-count')
let charcount = document.querySelector('.character-count')

inputText.addEventListener('input',() =>{
    charcount.textContent = inputText.value.length;
    //remove space
    let txt = inputText.value.trim();
    if(inputText.value === '') wordcount.textContent = '0'
    else
    wordcount.textContent = txt.split(/\s+/).length
})

document.querySelector(".count").onclick = function(){
    document.querySelector("textarea").select();
    document.execCommand('copy');
    alert('Copy!')
}