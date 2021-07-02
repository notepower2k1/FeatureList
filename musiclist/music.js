
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


let previous = $('#pre');
let play = $('#play');
let next = $('#next');
let shuffle = document.getElementById('shuffle');
let repeat = document.getElementById('repeat');

let title = $('#title');
let artist = $('#artist');
let music_image = $('#music_img');


let slider = $('#duration_slider');
let end_duration = $('#end-duration');
let current_duration = $('#current-duration');

let recent_volume= $('#volume');
let volume_icon = $('#volume_icon');

var before_volume = 0;
let autoplay = 0;
let autoshuffle = 0;

let timer;
let index = 0;
let playing = false;
let ishadvolume = false;

let music = document.createElement('audio');


let song_list = [
    {
        name: "SÀI GÒN HÔM NAY MƯA",
        path: "/audio/music1.mp3",
        img: "/image/img1.jpg",
        singer: "JSOL & HOÀNG DUYÊN"
    },
    {
        name: "Thở",
        path: "/audio/music2.mp3",
        img: "/image/canada.jpg",
        singer: "DaLab"
    },
    {
        name: "KHI EM LỚN",
        path: "/audio/music3.mp3",
        img: "/image/content2.jpg",
        singer: "Orange & Hoàng Dũng"
    },{
        name: "KHI EM LỚN (1)",
        path: "/audio/music4.mp3",
        img: "/image/content3.jpg",
        singer: "Orange & Hoàng Dũng"
    }

]


function load_song(index)
{
    clearInterval(timer);
    reset_slider();
    music.src = song_list[index].path;
    title.innerHTML = song_list[index].name;
    music_image.src = song_list[index].img;
    artist.innerHTML = song_list[index].singer;
    music.load();
    timer = setInterval(range_slider ,1000);
    
}
load_song(index);


function just_play()
{
    if(playing == false)
    {
        play_song();
       
    }
    else
        pause_song();
    
}

function play_song()
{
   music.play();
   playing = true;
   play.innerHTML =  '<i class="fa fa-pause" aria-hidden="true"></i>';
   
}

function pause_song()
{
    music.pause();
    playing = false;
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

function just_volume()
{
    music.volume = recent_volume.value / 100;
    if(music.volume > 0 && music.volume < 0.99)
    {
        volume_icon.classList.remove("fa-volume-up");
        volume_icon.classList.remove("fa-volume-off");
        volume_icon.classList.add("fa-volume-down");
    }
    else if(music.volume == 1){
        volume_icon.classList.remove("fa-volume-down");
        volume_icon.classList.add("fa-volume-up");
    }
    else if(music.volume == 0){
        volume_icon.classList.remove("fa-volume-down");
        volume_icon.classList.add("fa-volume-off");
    }
    before_volume = music.volume;
    
}
function just_mute()
{
    if(ishadvolume)
    {
    music.volume = before_volume;
    recent_volume.value = before_volume*100;
    volume_icon.style.color="white"
    ishadvolume = false;
       
         }

   else{
    music.volume = 0;
    recent_volume.value = 0;
    volume_icon.style.color="red"
    ishadvolume = true;
   }
}

function reset_slider(){
    slider.value = 0;
}
function change_duration()
{
    slider_position = music.duration * (slider.value / 100);
	music.currentTime = slider_position;
}
function just_repeat()
{
    if(autoplay==1)
    {
        autoplay = 0;
        repeat.style.color = "white";
       
        
    }
    else{
        autoplay = 1;  
        repeat.style.color = "gray"; 
      
    }
   
}

function just_shuffle(){
    if(autoshuffle==1)
    {
        autoshuffle = 0;
        shuffle.style.color = "white";  
    }
    else{
        autoshuffle = 1;  
        shuffle.style.color = "gray"; 
      
    }
}
music.ontimeupdate = function () {
    let ct = music.currentTime;
    current_duration.innerHTML = timeFormat(ct);
    //progress
  
   
   
  }
  function range_slider(){
	let position = 0;
        
        // update slider position
		if(!isNaN(music.duration)){
		   position = music.currentTime * (100 / music.duration);
		   slider.value =  position;
          end_duration.innerHTML = Math.floor((music.duration)%3600/60)+":"+Math.floor((music.duration)%60);
	      }

       
       // function will run when the song is over
       if(music.ended && autoplay == 0 && autoshuffle == 0){
       	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
            
            if(index == song_list.length -1 )
            {
                index = 0;
            }
            else
             {
                 index+=1;
             }
                load_song(index);
                play_song();
            }
            if(music.ended && autoplay == 1){
                load_song(index);
                play_song();
           }
           if(music.ended && autoshuffle ==1)
           {
            index = Math.floor(Math.random() * song_list.length);
            load_song(index);
            play_song();
           }
          
             
 }
     function timeFormat(ct) {
        minutes = Math.floor(ct / 60);
        seconds = Math.floor(ct % 60);
      
        if (seconds < 10) {
          seconds = "0"+seconds;
        }
      
        return minutes + ":" + seconds;
      }
function just_next(){
    if(index < song_list.length - 1){
        index +=1;
        load_song(index)
        play_song()
    }
    else{
        index = 0;
        load_song(index)
        play_song()
    }
    
}

function just_previous()
{
    if(index > 0){
        index -=1;
        load_song(index)
        play_song()
      
    }
    else{
       index = song_list.length-1;
       load_song(index)
       play_song()
        
    }
   
}


const playlist = $(".playlist");

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: {},
    // (1/2) Uncomment the line below to use localStorage
    // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    song_list: [
        {
            name: "SÀI GÒN HÔM NAY MƯA",
            path: "/audio/music1.mp3",
            img: "/image/img1.jpg",
            singer: "JSOL & HOÀNG DUYÊN"
        },
        {
            name: "Thở",
            path: "/audio/music2.mp3",
            img: "/image/canada.jpg",
            singer: "DaLab"
        },
        {
            name: "KHI EM LỚN",
            path: "/audio/music3.mp3",
            img: "/image/content2.jpg",
            singer: "Orange & Hoàng Dũng"
        },{
            name: "KHI EM LỚN (1)",
            path: "/audio/music4.mp3",
            img: "/image/content3.jpg",
            singer: "Orange & Hoàng Dũng"
        }
    
    ],
    
    render: function ()  {
      const htmls = this.song_list.map((song_list, index) => {
        return `
                          <div class="song ${
                            index === this.currentIndex ? "active" : ""
                          }" data-index="${index}">
                              <div class="thumb"
                                  style="background-image: url('${song_list.img}')">
                              </div>
                              <div class="body">
                                  <h3 class="title">${song_list.name}</h3>
                                  <p class="author">${song_list.singer}</p>
                              </div>
                              <div class="option">
                                  <i class="fas fa-ellipsis-h"></i>
                              </div>
                          </div>
                      `;
      });
      playlist.innerHTML = htmls.join("");
    },


    start: function()
    {
        this.render();
    }

}
app.start();