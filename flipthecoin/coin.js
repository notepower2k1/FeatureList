 const $ = document.querySelector.bind(document);
 const $$ = document.querySelectorAll.bind(document);
 let like = 0;
 let dislike = 0;
 let coin = $(".coin");
 let flipbtn = $("#flip-btn")
 let resetbtn = $("#reset-btn");
 const likepoint = $("#like-count");
 const dislikepoint = $("#dislike-count");
 const game = {
   images:[
       {
            name:"like-coin",
            path:"/images/coin_thumbs__up.svg"
       },
       {
           name:"dislike-coin",
           path:"/images/coin_thumbs__down.svg"
       }
   ],

    handleEvents: function () {

        flipbtn.onclick = function () {
            let i = Math.floor(Math.random()*2)
            coin.style.animation ="none";
            if(i)
            {
                setTimeout(function () {
                    coin.style.animation = "spin-like 3s forwards";
                },100);
                like++;
            }
            else{
                setTimeout(function () {
                    coin.style.animation = "spin-dislike 3s forwards";
                },100);
                dislike++;
            }
          setTimeout(LoadData,3000)

           flipbtn.disabled = true;
           setTimeout(function () {
               flipbtn.disabled = false;
           },3000)
        }
      
        resetbtn.onclick = function () {
            coin.style.transform = "rotateX(0)"
            like = 0;
            dislike = 0;
           LoadData();
        }
        LoadData = function () {
            likepoint.textContent = "Like: " + like;
            dislikepoint.textContent ="Dislike: " + dislike;
        }
    },
   
    start:function (){
        this.handleEvents();
        
    }
 }
 game.start();
 