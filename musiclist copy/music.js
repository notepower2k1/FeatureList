// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom : false,
  isRepeat : false,
  // (1/2) Uncomment the line below to use localStorage
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "SÀI GÒN HÔM NAY MƯA",
      singer:  "JSOL & HOÀNG DUYÊN",
      path: "/audio/music1.mp3",
      image: "/image/img1.jpg"
    },
    {
      name: "Thở",
      singer:   "DaLab",
      path:  "/audio/music2.mp3",
      image:  "/image/canada.jpg"
    },   
     {
      name: "KHI EM LỚN",
      singer:  "Orange & Hoàng Dũng",
      path: "/audio/music3.mp3",
      image:  "/image/content2.jpg"
    },
    {
      name: "Last",
      singer:  "Orange & Hoàng Dũng",
      path: "/audio/music1.mp3",
      image:  "/image/content2.jpg"
    },
    {
      name: "SÀI GÒN HÔM NAY MƯA",
      singer:  "JSOL & HOÀNG DUYÊN",
      path: "/audio/music1.mp3",
      image: "/image/img1.jpg"
    },
    {
      name: "Thở",
      singer:   "DaLab",
      path:  "/audio/music2.mp3",
      image:  "/image/canada.jpg"
    },
  ],

  render: function()
  {
    const htmls = this.songs.map((songs, index) =>{
      return `
      <div class="song ${index === this.currentIndex ?'active':''}" data-index="${index}">
          <div class="thumb"
              style="background-image: url('${songs.image}')">
          </div>
          <div class="body">
              <h3 class="title">${songs.name}</h3>
              <p class="author">${songs.singer}</p>
          </div>
          <div class="option">
              <i class="fas fa-ellipsis-h"></i>
          </div>
      </div>
      `

    })
    playlist.innerHTML = htmls.join('')
    
  },
  defineProperties:function(){
      Object.defineProperty(this,'currentSong',{
        get:function()
        {
          return this.songs[this.currentIndex];
        }
      })
  },

  handleEvents: function(){
    const _this = this;
   
    const cdWidth = cd.offsetWidth;

    const cdThumbAnimate = cdThumb.animate([{transform: "rotate(360deg)"}],{
      duration: 10000, // 10s
      iterations: Infinity
    })
   
    cdThumbAnimate.pause();
    document.onscroll = function()
    {
      const scrollTop = window.scrollY;
      const newCdWidth = cdWidth -scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
      cd.style.opacity = newCdWidth / cdWidth;
        
    }
    playBtn.onclick = function(){
      if(_this.isPlaying) audio.pause();     
      else audio.play() 
    }
    nextBtn.onclick = function()
    {
      if(_this.isRandom){
        _this.playRadomSong()
      }else
     { _this.nextSong();}
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    }
    prevBtn.onclick = function()
    {
      if(_this.isRandom){
        _this.playRadomSong()
      }else
     { _this.previousSong();}
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    }
    randomBtn.onclick = function()
    {
      _this.isRandom =!_this.isRandom
      randomBtn.classList.toggle('active',_this.isRandom);
     
    }
    repeatBtn.onclick = function()
    {
      _this.isRepeat = !_this.isRepeat
      repeatBtn.classList.toggle('active',_this.isRepeat);
    }
    audio.onended = function()
    {
      if(_this.isRepeat)
      {
        audio.play();
      }
      else
      nextBtn.click();
    }

    playlist.onclick = function(e){
      const songNode  = e.target.closest('.song:not(.active)')
      if(songNode|| e.target.closest('.option'))
      {
        if(songNode){
         _this.currentIndex = Number(songNode.dataset.index)
         _this.load_CurrentSong();
         audio.play()
         _this.render();
        }
      }
    }   
    audio.onplay = function()
    {
      _this.isPlaying = true;
      player.classList.add('playing');
      cdThumbAnimate.play();
    }
    
    audio.onpause = function()
    {
      _this.isPlaying = false;
      player.classList.remove('playing');
      cdThumbAnimate.pause();
    }

    audio.ontimeupdate = function()
    { 
      if(audio.duration)
      {  
       const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
       progress.value = progressPercent;
      }
    }

    progress.oninput = function()
    {
      const seekTime = audio.duration / 100 * progress.value;
    
      audio.currentTime = seekTime;
    }
  },

  scrollToActiveSong:function(){
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior:'smooth',
        block:'nearest',
      })
    },300)
  },
  load_CurrentSong : function()
  {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage =`url('${this.currentSong.image}')`
    audio.src = this.currentSong.path;
  },

  nextSong: function()
  {
    this.currentIndex++;
    if(this.currentIndex >= this.songs.length){
      this.currentIndex = 0;
    }
    this.load_CurrentSong();
  },
  previousSong:function()
  {
    this.currentIndex--;
    if(this.currentIndex < 0){
      this.currentIndex = this.songs.length -1;
    }
    this.load_CurrentSong();
  },
  playRadomSong:function()
  {
    let NewIndex;
    do{
      NewIndex = Math.floor(Math.random()*this.songs.length)
    }
    while(NewIndex === this.currentIndex)
    this.currentIndex = NewIndex;
    this.load_CurrentSong();

  },
  start:function()
  {
    this.defineProperties();

    this.handleEvents();

    this.load_CurrentSong();

    this.render();
  }
  
};

app.start();
