let [computer_score,player_score] = [0,0];
let result = document.getElementById('result');
let choices_object = {
    'rock':{
        'rock' : 'draw',
        'paper': 'lose',
        'scrissor': 'win'
        
    },
    'paper':{
        'rock' : 'win',
        'paper': 'draw',
        'scrissor': 'lose'
        
    },
    'scrissor':{
        'rock' : 'lose',
        'paper': 'win',
        'scrissor': 'draw'
        
    }
}




function checker(input)
{
    var choices = ["rock","paper","scrissor"];
    var num = Math.floor(Math.random()*3);
    var container = document.getElementById('container');

    document.getElementById('computer_choice').innerHTML =
    "Computer choose "  + choices[num].toUpperCase();

    document.getElementById('user_choice').innerHTML =
    "User choose "  +  input.toUpperCase();

    let computer_choice = choices[num];

    console.log(choices_object[input][computer_choice])
    
    switch(choices_object[input][computer_choice])
    {
        case 'win':
            result.innerHTML = 'YOU WIN';
            result.style.cssText = "background-color:#8bc24a;color:white"
            player_score++;
            break;
        case 'lose':
            result.innerHTML = 'YOU LOSE';
            result.style.cssText = "background-color:#f34233;color:white"
            computer_score++;
            break;
        default:
            result.innerHTML = 'DRAW';
            result.style.cssText = "background-color:#ffc007;color:white"
            break;
    }

    document.getElementById('player_score').textContent =  player_score;
    document.getElementById('computer_score').textContent = computer_score;


    var win_notify = document.getElementById('win_notify');
    var lose_notify = document.getElementById('lose_notify');
    var win_sound = new Audio("win_sound.wav"); 
    var lose_sound = new Audio("lose_sound.wav"); 
    

    if(player_score == 10)
    {
        win_notify.style.display="inline";
           
        setTimeout(function Notify(){
            win_notify.style.display="none";
        },4000);
        win_sound.play();
        player_score = 0;
        computer_score = 0;
        document.getElementById('player_score').textContent =  player_score;
        document.getElementById('computer_score').textContent = computer_score;
    }
    else if(computer_score == 10)
    {
        lose_notify.style.display="inline";
           
        setTimeout(function Notify(){
            lose_notify.style.display="none";
        },4000);
        lose_sound.play();
        player_score = 0;
        computer_score = 0;
        document.getElementById('player_score').textContent =  player_score;
        document.getElementById('computer_score').textContent = computer_score;
    }
}