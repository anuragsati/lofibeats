const toggleButton = document.getElementById('tgl');
const audio = document.getElementById('audio');
const lofiElement = document.getElementById('lofi');
const maincContent = document.getElementsByClassName('main-content')[0];
const lofiName = document.getElementById('lofi-name');

window.onload = function() {
	lofiElement.style.opacity = 0.9;

	setAudio();
};

maincContent.addEventListener('click', function(e){
	audio.play();

	if(audio.muted){
		lofiElement.style.opacity = 1;
	}
	else{
		lofiElement.style.opacity = 0.9;
	}

	toggleButton.classList.toggle('toggler');
	audio.muted = !(audio.muted);
});

audio.addEventListener("ended", function(){
	setAudio();
	console.log("ended");
});

function setAudio(){
	audio.src = '/api/lofi';

	fetch('/api/lofidata')
	.then(res => res.json())
	.then(data =>{
		console.log(data);
		lofiName.innerHTML = data.name;
	});

}
