import path from 'path';
import fs from 'fs';
const __dirname = path.resolve();

let lofiNumber = -1;

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


const getLofiData = (req, res) => {
	res.send(data[lofiNumber]);
}

const getLofi  = (req, res) => {
	//change lofi whenever /lofi is called
	lofiNumber = (lofiNumber+1) % data.length;

	res.writeHead(200, {'Content-Type': 'audio/mp3'});
	let opStream = fs.createReadStream(path.join(__dirname, '/public/lofi/' + data[lofiNumber].lofi_url));
	opStream.pipe(res)
};


export default {
	getLofi, 
	getLofiData,
}