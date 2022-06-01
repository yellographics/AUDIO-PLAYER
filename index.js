'use strict';

const songImage = document.querySelector('.song-image');
const favoirite = document.querySelector('.like');
const audio = document.querySelector('audio');
const playBtn = document.querySelector('.play');
const backwardBtn = document.querySelector('.backward');
const forwardBtn = document.querySelector('.forward');
const like = document.querySelector('.like');
const timeline = document.querySelector('.timeline');
const currentTime = document.querySelector('.now');
const duration = document.querySelector('.duration');
const sound = document.querySelector('.sound');
const songName = document.querySelector('.song-name');
const songPlaying = document.querySelector('.song-playing');
let isPlay = false;
let isSound = true;


// Music: https://www.bensound.com
let audios = [];

const audio1 = new Audio('assets/audio/1.mp3');
audio1.title = 'A new Beginning';
const audio2 = new Audio('assets/audio/2.mp3');
audio2.title = 'The Jazz Piano';
const audio3 = new Audio('assets/audio/3.mp3');
audio3.title = 'Retrosoul';
const audio4 = new Audio('assets/audio/4.mp3');
audio4.title = 'Once Again';
const audio5 = new Audio('assets/audio/5.mp3');
audio5.title = 'Adventure';
const audio6 = new Audio('assets/audio/6.mp3');
audio6.title = 'Happy Rock';

audios.push(audio1, audio2, audio3, audio4, audio5, audio6);


function playAudio() {
    audio.play();
    const nowPlaying = audios[`${audio.id - 1}`];
    songName.innerText = nowPlaying.title;   
    songPlaying.innerText = songName.innerText;
    isPlay = true;
    playBtn.classList.add('pause');
}

function pauseAudio() {
    audio.pause();
    isPlay = false;
    playBtn.classList.remove('pause');
}

playBtn.addEventListener('click', () => {
    if (!isPlay) {
        playAudio(audio);        
    } else {
        pauseAudio(audio);
    }
})

like.addEventListener('click', (event) => {
    event.target.classList.toggle('liked');
})

function readableDuration(seconds) {
    let sec = Math.floor(seconds);
    let min = Math.floor(sec / 60);
    min = min >= 10 ? min : '0' + min;
    sec = Math.floor(sec % 60);
    sec = sec >= 10 ? sec : '0' + sec;
    return min + ':' + sec;
}

audio.addEventListener('loadedmetadata', () => {
    setInterval(() => {
        const progressBar = document.querySelector(".progress");
        progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    }, 100);


    setInterval(() => {
        currentTime.innerHTML = `${readableDuration(audio.currentTime)}`;
        duration.innerHTML = `${readableDuration(audio.duration)}`
    }, 500);
})

timeline.addEventListener("click", (event) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = event.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}, false);

forwardBtn.addEventListener('click', () => {
    if (+audio.id === audios.length) {
        audio.id = '1';
        audio.src = `assets/audio/${+audio.id}.mp3`; 
        songImage.style.backgroundImage = `url('assets/img/${+audio.id}.jpg')`;
        playAudio(audio);
        const nowPlaying = audios[`${audio.id - 1}`];
        songName.innerText = nowPlaying.title;
        songPlaying.innerText = songName.innerText;
    } else {
        audio.id = `${+audio.id + 1}`;        
        audio.src = `assets/audio/${+audio.id}.mp3`;   
        songImage.style.backgroundImage = `url('assets/img/${+audio.id}.jpg')`;
        playAudio(audio);
        const nowPlaying = audios[`${audio.id - 1}`];
        songName.innerText = nowPlaying.title;
        songPlaying.innerText = songName.innerText;
    }
})

backwardBtn.addEventListener('click', () => {
    if (+audio.id === 1) {
        audio.id = `${audios.length}`;
        audio.src = `assets/audio/${+audio.id}.mp3`;
        songImage.style.backgroundImage = `url('assets/img/${+audio.id}.jpg')`;
        playAudio(audio);
        const nowPlaying = audios[`${audio.id - 1}`];
        songName.innerText = nowPlaying.title;
        songPlaying.innerText = songName.innerText;
    } else {
        audio.id = `${+audio.id - 1}`;        
        audio.src = `assets/audio/${+audio.id}.mp3`;
        songImage.style.backgroundImage = `url('assets/img/${+audio.id}.jpg')`;
        playAudio(audio);
        const nowPlaying = audios[`${audio.id - 1}`];
        songName.innerText = nowPlaying.title;
        songPlaying.innerText = songName.innerText;
    }
})


sound.addEventListener('click', () => {
    if (isSound) {
        audio.muted = true;
        sound.classList.add('muted');
        isSound = false;
    } else {
        audio.muted = false;
        sound.classList.remove('muted');
        isSound = true;
    }
})

















