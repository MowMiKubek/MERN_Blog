function formularzInit(){
	var forms = document.getElementsByClassName('needs-validation');
	// Loop over them and prevent submission
	var validation = Array.prototype.filter.call(forms, function(form) {
		form.addEventListener('submit', function(event) {
		var failed = false;
		if (form.checkValidity() === false) {
			failed = true;
		}
		if(failed){
		  event.preventDefault();
		  event.stopPropagation();
		}
		form.classList.add('was-validated');
	  }, false);
	});
}

function wyslijFormularz(){
	var object = {};
	//Plec
	if(document.getElementById('kobieta').checked)
		object.plec = 'kobieta';
	else if(document.getElementById('mezczyzna').checked)
		object.plec = 'mezczyzna';
	// Imie
	var imie = document.getElementById('imie').value;
	object.imie = imie;
	// Drugie imie
	var drugieimie = document.getElementById('drugieimie').value;
	if(drugieimie)
		object.drugieimie = drugieimie;
	// Nazwisko
	var nazwisko = document.getElementById('nazwisko').value;
	object.nazwisko = nazwisko;
	// Nazwisko
	var email = document.getElementById('email').value;
	object.email = email;
	// Temat
	var temat = document.getElementById('temat').value;
	object.temat = temat;
	// Wiadomosc
	var wiadomosc = document.getElementById('wiadomosc').value;
	object.wiadomosc = wiadomosc;
	console.log(object);
	localStorage.setItem('formularzPAI', JSON.stringify(object));
	alert('Wszystko OK, formularz został wysłany');
	location.reload();
}