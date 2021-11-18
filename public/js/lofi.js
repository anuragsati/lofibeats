const audio = document.getElementById('audio');
const lofiName = document.getElementById('lofi-name');
const animationLines = document.getElementsByClassName('line');

function playPauseShuffle(){

	// play audio if it is paused
	if(audio.paused)
		audio.play();
	else
		audio.pause();


	// show pause button when audio is playing and vice versa
	if(audio.paused){
		document.getElementsByClassName('play-button')[0].style.display = "inline-block";
		document.getElementsByClassName('pause-button')[0].style.display = "none";
	}
	else{
		document.getElementsByClassName('play-button')[0].style.display = "none";
		document.getElementsByClassName('pause-button')[0].style.display = "inline-block";
	}

	//when paused stop animation 
	for(let i=0; i<5; ++i){
		if(audio.paused)
			animationLines[i].style.animationPlayState = "paused";
		else
			animationLines[i].style.animationPlayState = "running";
	}

};

audio.addEventListener("ended", function(){
	getAudio();
});


//get audio from backend and play it (which audio to play is defined on backend we just call that endpoint to get audio url)
function getAudio(){
	axios.get('/api/lofidata')
	.then(res =>{
		console.log(res.data);
		audio.src = '/api/lofi';
		lofiName.innerHTML = res.data.name;
	});

}


function closeInitialOverlay(){
	document.getElementById('initial-overlay').style.display = "none";

	//when we close overlay set audio and play it
	getAudio();
	audio.play();

}
