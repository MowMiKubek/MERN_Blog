async function getWCAData() {
	const responce = await fetch('http://localhost:5000/api/getwcadata');
	const res_json = await responce.json();
	return res_json;
}

function loadTable() {
	getWCAData().then(result => {
		const table = makeTable(result);
		document.querySelector('#tresc').appendChild(table);
	})
	.catch(error => {
		console.log(error);
		document.getElementById("tresc").innerHTML = "Nie udało się wczytać tabelki";
	});
}

function getStringTime(time){
	var sekundy = Math.floor(time/100);
	var minuty = 0;
	while(sekundy>=60)
	{
		sekundy -= 60;
		minuty++;
	}
	var result = "";
	if(minuty>0)
		result += minuty.toString() + ":";
	if(minuty>0 && sekundy<10)
		result += "0";
	result += sekundy.toString() + '.';
	if(time%100<10)
		result += "0";
	result += time%100;
	return result;
}

const makeTable = (data) => {
	var events = ["333", "222", "444", "555", "pyram", "333oh", "skewb", "clock", "minx"];
	var e_names = ["3x3x3", "2x2x2", "4x4x4", "5x5x5", "Pyraminx", "3x3x3 jedną ręką", "Skewb", "Clock", "Megaminx", "Skewb"];
	const table = document.createElement("table");
	table.classList.add("table", "table-striped");
	const headers = [];
	for (var i = 0; i < events.length; i++) {
		headers.push(document.createElement("th"));
	}
	for (var i = 0; i < 3; i++) {
		headers[i].classList.add("link-dark");
	}
	headers[0].innerHTML = 'Event';
	headers[1].innerHTML = "NR";
	headers[2].innerHTML = "CR";
	headers[3].innerHTML = "WR";
	headers[4].innerHTML = "Single";
	headers[5].innerHTML = "Average";
	headers[6].innerHTML = "WR";
	headers[7].innerHTML = "CR";
	headers[8].innerHTML = "NR";

	const thead = document.createElement("thead");
	const tbody = document.createElement("tbody");

	headers.forEach(header => thead.append(header));

	for(let event in events){
		const row = document.createElement("tr");

		const name = document.createElement("td");
		const nr_single = document.createElement("td");
		const cr_single = document.createElement("td");
		const wr_single = document.createElement("td");
		const nr_average = document.createElement("td");
		const cr_average = document.createElement("td");
		const wr_average = document.createElement("td");
		const single = document.createElement("td");
		const average = document.createElement("td");

		name.innerHTML = e_names[event];
		nr_single.innerHTML = data[events[event]]["single"]["country_rank"]
		cr_single.innerHTML = data[events[event]]["single"]["continent_rank"];
		wr_single.innerHTML = data[events[event]]["single"]["world_rank"];
		nr_average.innerHTML = data[events[event]]["average"]["country_rank"]
		cr_average.innerHTML = data[events[event]]["average"]["continent_rank"];
		wr_average.innerHTML = data[events[event]]["average"]["world_rank"];
		single.innerHTML = getStringTime(data[events[event]]["single"]["best"]);
		average.innerHTML = getStringTime(data[events[event]]["average"]["best"]);

		row.appendChild(name);
		row.appendChild(nr_single);
		row.appendChild(cr_single);
		row.appendChild(wr_single);
		row.appendChild(single);
		row.appendChild(average);
		row.appendChild(wr_average);
		row.appendChild(cr_average);
		row.appendChild(nr_average);

		tbody.appendChild(row);
	}

	table.append(tbody);
	table.append(thead);

	return table;
}

loadTable();