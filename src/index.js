let progressEl = document.querySelector("#progress")

let musicList = [
    {
        artist:"Игорь Скляр",
        song:"Комарово",
        src:"./music/music-1.mp3"
    },
    {
        artist:"Ёлка",
        song:"Прованс",
        src:"./music/music-2.mp3"
    },
    {
        artist:"Григорий Лепс",
        song:"Я счастливый",
        src:"./music/music-3.mp3"
    },
    {
        artist:"Високосный год",
        song:"Тихий огонёк",
        src:"./music/music-4.mp3"
    },
    {
        artist:"Леприконсы",
        song:"Хали-Гали, Паратрупер",
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
}
function handlePrev(){
    currentIndex > 0 ? currentIndex-- : currentIndex= musicList.length - 1;
    currentMusic.src = musicList[currentIndex%musicList.length].src;
    currentMusic.play();
}
controls.play.addEventListener("click", handleAction)
controls.next.addEventListener("click", handleNext)
controls.prev.addEventListener("click", handlePrev)

currentMusic.addEventListener("timeupdate",(e) => {
    currentTime = e.target.currentTime;

    let precent = (currentTime / currentMusic.duration) * 100;
    progressEl.style.width = `${precent}%`
})
