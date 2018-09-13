notes = [

];

tempo = 130;

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let oscillator = audioCtx.createOscillator();
let gain = audioCtx.createGain();
oscillator.start();



function testPlay(frequency) {

//let oscillator = audioCtx.createOscillator();

	// create Oscillator node
	oscillator.frequency.value = frequency; // value in hertz
  gain.gain.value = 0;
  gain.gain.setValueAtTime(0, 0);
  gain.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.015);
  
	oscillator.connect(gain);
  gain.connect(audioCtx.destination);
	
  
}

function testStop() {
  gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.015);
	//oscillator.stop(); 
  
}

function addNote(frequency){
    notes.push([frequency,16]);
    showQueue();
}

function showQueue(){
    let data = [];
    for(i in notes){
        switch(notes[i][0]) {
          case 19600:
            data[i] = 0;
            break;
          case 20000:
            data[i] = 1;
            break;
          case 20400:
            data[i] = 2;
            break;
          case 20800:
            data[i] = 3;
            break;
        }
    }
    document.getElementById("streamQueue").innerHTML = data;
}

function playMelody(){
  	setTimeout(
		function(){
      if (notes.length > 0){
        note = notes.pop();
        playNote(note[0],1000*256/(note[1]*tempo));
        showQueue();
      }
		}, 20);

}

function playNote(frequency, duration) {
	// create Oscillator node
	/*let oscillator = audioCtx.createOscillator();
	let gain = audioCtx.createGain();
	oscillator.type = 'square';
	oscillator.frequency.value = frequency; // value in hertz
	oscillator.connect(gain);
  gain.connect(audioCtx.destination);
  
	oscillator.start();*/
  testPlay(frequency);
  
	setTimeout(
		function(){
			testStop();
			playMelody();
		}, duration);
  
}

//playMelody();
