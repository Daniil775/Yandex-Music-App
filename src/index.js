let progressEl = document.querySelector("#progress")
let timeEl = document.querySelector("#time")
let playlistEl = document.querySelector("#playlist")
let playlistBtn = document.querySelector(".app-playlist")
let playlistTable = document.querySelector(".playlist-table")

let musicList = [
    {
        artist:"Игорь Скляр",
        song:"Комарово",
        duration:"02:26",
        src:"./music/music-1.mp3"
    },
    {
        artist:"Ёлка",
        song:"Прованс",
        duration:"03:34",
        src:"./music/music-2.mp3"
    },
    {
        artist:"Григорий Лепс",
        song:"Я счастливый",
        duration:"03:57",
        src:"./music/music-3.mp3"
    },
    {
        artist:"Високосный год",
        song:"Тихий огонёк",
        duration:"04:20",
        src:"./music/music-4.mp3"
    },
    {
        artist:"Леприконсы",
        song:"Хали-Гали, Паратрупер",
        duration:"04:08",
        src:"./music/music-5.mp3"
    }
]

let controls = {
    play: document.querySelector('#action'),
    next: document.querySelector('#next'),
    prev: document.querySelector('#prev')
}

let currentTime = 0;
let isPlaying = false;
let currentIndex = Math.floor(musicList.length / 2);
let currentMusic = new Audio(musicList[currentIndex].src)
let mins = 0;
let secs = 0;

function handleAction(){
    if(isPlaying){
        currentMusic.pause();
        isPlaying = false;
        controls.play.src = "./img/play.png"
    } else{
        currentMusic.play();
        isPlaying = true;
        controls.play.src = "./img/pause.png"
    }
}

function handleNext(){
    currentIndex<musicList.length?currentIndex++:currentIndex=0;
    currentMusic.src = musicList[currentIndex].src;
    currentMusic.play();
    controls.play.src = "./img/pause.png"
}
function handlePrev(){
    currentIndex > 0 ? currentIndex-- : currentIndex= musicList.length - 1;
    currentMusic.src = musicList[currentIndex%musicList.length].src;
    currentMusic.play();
    controls.play.src = "./img/pause.png"
}

function openPlaylist(){
   playlistEl.classList.toggle("active")
    if(playlistEl.classList.contains("active")){

        playlistTable.innerHTML = " ";

        musicList.forEach((music,index) => {
            let li = `<li class="playlist-card"><div>#${index + 1}</div> <div>${music.song}</div> <div>${music.artist}</div> <div>${music.duration}</div></li>`
            playlistTable.innerHTML += li;
        })
    }
}

controls.play.addEventListener("click", handleAction)
controls.next.addEventListener("click", handleNext)
controls.prev.addEventListener("click", handlePrev)

currentMusic.addEventListener("timeupdate",(e) => {
    currentTime = e.target.currentTime;
    mins = String(Math.floor(currentTime / 60)).padStart(2, "0");
    secs = String(Math.floor(currentTime%60)).padStart(2, "0");
    timeEl.innerHTML = `${mins}:${secs}`

    console.log(currentTime)
    let precent = (currentTime / currentMusic.duration) * 100;
    progressEl.style.width = `${precent}%`
})

playlistBtn.addEventListener("click", openPlaylist)