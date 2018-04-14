function ajax() {
	//Form
	let message = new Object();
	message.loading = 'Loading....';
	message.success = 'ok';
	message.failure = 'Error 500';

	let form = document.getElementsByClassName('main-form')[0];
	let form2 = document.getElementById('form');
	let input = form.getElementsByTagName('input');
	let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');

			//действие на отправку данных
		form.addEventListener('submit', sendForm);
		form2.addEventListener('submit', sendForm); 
		
		function sendForm(event) {
			event.preventDefault();
			this.appendChild(statusMessage);

			//AJAX
			let request = new XMLHttpRequest();
			request.open("POST", 'server.php');

			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			let formData = new FormData(form);

			request.send(formData);

			request.onreadystatechange = function() {
				if (request.readyState < 4) {
					statusMessage.innerHTML = message.loading;
				} else if (request.readyState === 4) {
						if (request.status == 200 && request.status < 300) {
							statusMessage.innerHTML = message.success;
							//Можно добавить любой контент на страницу
						}
						else {
							statusMessage.innerHTML = message.failure;
						}
				}
			}
			//Чистим инпуты
			for (let i = 0; i < input.length; i++) {
				input[i].value = '';
			}
		}
}
module.exports = ajax;