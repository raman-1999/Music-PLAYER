const allMusic = [{
    name : "Something In The Way",
    artist : "Nirvana",
    img :"sitw",
    src :"Nirvana - Something In The Way(Full Epic Trailer Version) _ The Batman Trailer Song"
},
    {
    name : "No Glory",
    artist : "Skan",
    img :"no glory",
    src :"Skan & Krale - No Glory (feat. M.I.M.E & Drama B)"
},
{
    name : "As We Fall",
    artist : "League Of Legends",
    img :"as we fall",
    src :"As We Fall _ Varus - League of Legends"
},
{
    name : "Cold Steel",
    artist : "UAV",
    img :"cold steel",
    src :"UNAVERAGE GANG - COLD STEEL"
},
{
    name : "It Has Begun",
    artist : "Starset",
    img :"it has begun",
    src :"Starset - It Has Begun (audio)"
},
{
    name : "Seven Nation Army",
    artist : "The White Stripes",
    img :"svn",
    src :"The White Stripes - Seven Nation Army"
},
]
const container = document.querySelector(".container"),
    musicImg = container.querySelector("#img"),
    musicName = container.querySelector(".name"),
    musicArtist = container.querySelector(".artist"),
    mainAudio = container.querySelector("#audio"),
    playPauseBtn = container.querySelector(".play-pause"),
    prevBtn = container.querySelector('#prev'),
    nextBtn = container.querySelector("#next"),
    listBtn = container.querySelector('#list'),
    library = container.querySelector('.library'),
    closeBtn = container.querySelector('#close'),
    progressBar = container.querySelector('.progress-bar'),
    progressArea = container.querySelector('.progress-area')


function random() {
    return Math.floor(Math.random() * 5);
}
let musicIndex = random();

// load music function

function loadMusic(index) {
    musicName.textContent = allMusic[index].name;
    musicArtist.textContent = allMusic[index].artist;
    musicImg.src = 'Images/' + allMusic[index].img + '.jpg';
    mainAudio.src = 'Audio/' + allMusic[index].src + '.mp3';
};

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingNow();
});

const pIcon = playPauseBtn.querySelector('.fa-solid');

// play function

function playMusic() {
    container.classList.add('paused');
    pIcon.classList.add('fa-circle-pause');
    pIcon.classList.remove('fa-circle-play');
    mainAudio.play();
}

// pause function 

function pauseMusic() {
    container.classList.remove('paused');
    pIcon.classList.add('fa-circle-play');
    pIcon.classList.remove('fa-circle-pause');
    mainAudio.pause();
}

// play or pause button event

playPauseBtn.addEventListener('click', () => {
    const isMusicPaused = container.classList.contains('paused');
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();
});
// previous music function

function previous() {
    musicIndex--;
    musicIndex < 0 ? musicIndex = allMusic.length - 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

// next music function

function next() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 0 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

// previous event

prevBtn.addEventListener('click', () => {
    previous();
});

nextBtn.addEventListener('click', () => {
    next();
});

// updating progress bar width and duration display as music plays

mainAudio.addEventListener('timeupdate', (e) => {
    const duration = e.target.duration;
    const currentTime = e.target.currentTime;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicTime = container.querySelector('.current'),
        musicTotal = container.querySelector('.total');

    mainAudio.addEventListener('loadeddata', () => {
        let audioTime = mainAudio.duration;

        let totalMin = Math.floor(audioTime / 60), totalSec = Math.floor(audioTime % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicTotal.textContent = `${totalMin}:${totalSec}`;
    });
    let cMin = Math.floor(currentTime / 60), cSec = Math.floor(currentTime % 60);
    if (cSec < 10) {
        cSec = `0${cSec}`;
    }
    musicTime.textContent = `${cMin}:${cSec}`;
});

// updating progress area according to click location on progress bar
progressArea.addEventListener('click', (e) => {
    let progress = progressArea.clientWidth;
    let clickLoc = e.offsetX;

    mainAudio.currentTime = (clickLoc / progress) * mainAudio.duration;
    playMusic();
});

// repeat and shuffle functionality
const repeatBtn = container.querySelector('.fa-repeat');
const rClass = repeatBtn.classList;
repeatBtn.addEventListener('click', () => {
    const rClass = repeatBtn.classList;
    if (rClass.contains('fa-repeat')) {
        rClass.remove('fa-repeat');
        rClass.add('fa-shuffle');
    }
    else {
        rClass.remove('fa-shuffle');
        rClass.add('fa-repeat');
    }
});

function randomSong() {
    musicIndex = random();
    playMusic();
}
mainAudio.addEventListener('ended', () => {
    if (rClass.contains('fa-repeat')) {
        mainAudio.currentTime = 0;
        playMusic();
    }
    else {
        musicIndex = random();
        loadMusic(musicIndex);
        playMusic();
    }
});

// music library functionality

listBtn.addEventListener('click', () => {
    library.classList.toggle('show');
});
closeBtn.addEventListener('click', () => {
    library.classList.remove('show');
});

const ulTag = container.querySelector('ul');

for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li li-index="${i}">
                    <div class="item">
                    <span>${allMusic[i].name}</span>
                    <span id="${allMusic[i].name}"></span>
                    </div>
                    <audio id="${allMusic[i].src}" src="Audio/${allMusic[i].src}.mp3"></audio>
                    <p>${allMusic[i].artist}</p>
                </li>`;
    ulTag.insertAdjacentHTML('beforeend', liTag)

    let liDuration = document.getElementById(`${allMusic[i].name}`),
    liAudioTag = document.getElementById(`${allMusic[i].src}`);


    liAudioTag.addEventListener('loadeddata', ()=>{
        let audioTime = liAudioTag.duration;

        let totalMin = Math.floor(audioTime / 60), totalSec = Math.floor(audioTime % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        liDuration.textContent = `${totalMin}:${totalSec}`;
        // liDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    });
}

// play particular song on click

const allLi = ulTag.querySelectorAll('li');
function playingNow(){
    for(let j = 0;j<allLi.length;j++){
        if(allLi[j].classList.contains('playing')){
            allLi[j].classList.remove('playing');
        }
        if(allLi[j].getAttribute("li-index") == musicIndex){
            allLi[j].classList.add('playing');
        }
        allLi[j].setAttribute('onclick', 'clicked(this)');
    }
}

function clicked(element){
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}