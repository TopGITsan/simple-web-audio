// create an AudioContext instance inside which to manipulate our track
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// create constants that store references to our <audio>, <button>, and <input> elements
const audioElement = document.querySelector('audio');
const playBtn = document.querySelector('button');
const volumeSlider = document.querySelector('.volume');

// create an MediaElementAudioSourceNode representing the source of our audio
const audioSource = audioCtx.createMediaElementSource(audioElement);

// include a couple of event handlers that serve to toggle between play and pause 
document.addEventListener('DOMContentLoaded',function() {
    playBtn.onclick = function(){
        // check if context is in suspended state (autoplay policy)
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        // if track is stoped, play it
        if (this.getAttribute('class') === 'paused') {
            audioElement.play();
            this.setAttribute('class','playing');
            this.textContent='Pause';
            console.log('track is playing');
        // if track is playing, stop it
        } else if ( this.getAttribute('class') === 'playing'){
            audioElement.pause();
            this.setAttribute('class','paused');
            this.textContent= 'Play';
            console.log('track is paused');
        }
    };
    // if track ends
    audioElement.ended= function(){
        playBtn.setAttribute('class','paused');
        this.textContent = 'Play';
    };
    // adjust the volume of audio
    const gainNode = audioCtx.createGain();
    volumeSlider.addEventListener('input',function(){
        gainNode.gain.value = this.value;
    });
    // connect the different nodes in the audio graph up
    audioSource.connect(gainNode).connect(audioCtx.destination);
});