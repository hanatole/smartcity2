$(document).ready(function(){
	let mymap = L.map("mymap").setView( [0, 0],2);
	let marker=L.marker([51.508, -0.11]).addTo(mymap);
	let firstTime =true;
	let url = "https://api.wheretheiss.at/v1/satellites/25544";

	mymap.on("click", function(e){
		L.popup()
			.setLatLng(e.latlng)
			.setContent("<strong>"+e.latlng+"</strong>")
			.openOn(mymap);
	});

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 20,
			minZoom: 1,
			attribution: ' <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(mymap);
	
	setInterval(async function(){
		let data  = await fetch(url).then((response)=>{
			return response.json();
		});
		update(data);
	},1000);

	function update(data){
		let coord = [data["latitude"], data["longitude"]];

		if(firstTime){
			mymap.setView(coord,2);
			firstTime=false;
		}
		marker.setLatLng(coord);
		marker.bindPopup("<strong>"+ data["name"] +"</strong>");
	}
});