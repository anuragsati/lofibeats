import path from 'path';
import fs from 'fs';
const __dirname = path.resolve();


//get lofi data
let songs = fs.readdirSync(path.join(__dirname, '/public/lofi'));
let names = fs.readdirSync(path.join(__dirname, '/public/lofi'));

let temp=[];
for(let x of names){
	temp.push(x.split('.')[0]);
}
names = temp;


let data = [];
for(let i=0; i<songs.length; ++i){
	//only match mp3 | wav songs
	if(songs[i].match(/\.(?:wav|mp3)$/)){
		data.push({
			lofi_url: songs[i],
			name : names[i],
		});
	}
}



// ======================
var lofiNumber = 0;

function getRandomLofi(){
	// making sure it doesnot generate same no.
	let generatedLofiNumber= Math.floor(Math.random() * data.length);
	if(generatedLofiNumber === lofiNumber)
		generatedLofiNumber = (generatedLofiNumber+1)%(data.length);
	
	lofiNumber = generatedLofiNumber;
}


const getLofiData = (req, res) => {
	// setting it here bcz of callback it will be called first
	getRandomLofi();
	// console.log(lofiNumber)

	res.send(data[lofiNumber]);
}

const getLofi  = (req, res) => {
	// server random lofi
	res.writeHead(200, {'Content-Type': 'audio/mp3'});
	let opStream = fs.createReadStream(path.join(__dirname, '/public/lofi/' + data[lofiNumber].lofi_url));
	opStream.pipe(res)
};


export default {
	getLofi, 
	getLofiData,
}