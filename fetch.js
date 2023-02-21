function loadPlayerlist(){
	fetch ('/players', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({token: localStorage.getItem("entity_token")})
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			if (data.length > 0){
				let list = document.getElementById("list");
				list.innerHTML = ""; // clear the list

				for (i = 0; i < data.length; i++) {
					var player = data[i];
					var li = document.createElement("li");
					li.innerHTML = `<div class="row align-items-center">
					<div class="col">${player}</div>
					<div class="col" style="text-align: right;"><button type="button" class="btn btn-danger" style="right: auto;" onclick="kick('${player}')">X</button></div>
					</div>`
					li.classList.add("list-group-item");
					list.appendChild(li);
				}
			}
			else if(data.status === 'failed'){
				let list = document.getElementById("list");
				list.innerHTML = ""; // clear the list
				li = document.createElement("li");
				li.appendChild(document.createTextNode("Fail to connect server"));
				li.classList.add("list-group-item");
				li.style.backgroundColor = "red";
				li.style.color = "white";
				list.appendChild(li);
			}
			else {
				let list = document.getElementById("list");
				list.innerHTML = ""; // clear the list
				li = document.createElement("li");
				li.appendChild(document.createTextNode("No Players Online"));
				li.classList.add("list-group-item");
				li.style.color = "red";
				list.appendChild(li);
			}
		})
		.catch((error) => {
			console.error('Error:', error);
	});
};

function loginServer(){
	let name = document.getElementById("username").value;
	console.log(name)
	let send = {username: name, token: localStorage.getItem("entity_token")};
	let jsonSend = JSON.stringify(send);
	console.log(jsonSend);


	fetch ('/loginServer', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: jsonSend
		})
		.then(response => response.json())
		.then(data => {
			console.log(data.data);
			if (data.data === "Done. You are the first one, starting server..."){
				location.reload();
			}else{
				console.log('Error:\n' + data);
			}
		})
		.catch((error) => {
			console.log(error);
			console.log('Could not connect to the server!')
	});
}

function logoutServer(){
	let name = document.getElementById("username").value;
	console.log(name)
	let send = {username: name, token: localStorage.getItem("entity_token")};
	let jsonSend = JSON.stringify(send);
	console.log(jsonSend);

	fetch ('/logoutServer', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: jsonSend
		})
		.then(response => response.json())
		.then(data => {
			console.log(data.data);
			if (data.data === "Done. Bye."){
				location.reload();
			}
			else{
				console.log('Error:\n' + data);
			}
		})
		.catch((error) => {
			console.log(error);
			console.log('Could not connect to the server!')

	});
}

function kick(name){

	console.log(name)
	let send = {username: name, token: localStorage.getItem("entity_token")};
	let jsonSend = JSON.stringify(send);
	console.log(jsonSend);

	fetch ('/logoutServer', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: jsonSend
		})
		.then(response => response.json())
		.then(data => {
			console.log(data.data);
			if (data.data === "Done. Bye."){
				location.reload();
			}
			else{
				console.log('Error:\n' + data);
			}
		})
		.catch((error) => {
			console.log(error);
			console.log('Could not connect to the server!')

	});
}

function initServerData(serverIp,serverPort){
	fetch(`https://mcapi.us/server/status?ip=${serverIp}&port=${serverPort}`)
	.then(response => response.json())
	.then(data => {
		console.log(data);

		let info = document.getElementById("info");
		if (data.online){
			info.innerHTML = `
			<li class="list-group-item">
				<div class="row align-items-center">
					<div class="col">ServerStatus : <span style="color: green;">Online</span></div>
				</div>
			</li>
			<li class="list-group-item">
				<div class="row align-items-center">
					<div class="col">Players : ${data.players.now}/${data.players.max}</div>
				</div>
			</li>
			<li class="list-group-item">
				<div class="row align-items-center">
					<div class="col">Version : ${data.server.name}</div>
				</div>
			</li>
			<li class="list-group-item">
				<div class="row align-items-center">
					<div class="col">Description : ${data.motd}</div>
				</div>
			</li>`
		}else{
			info.innerHTML = `
			<li class="list-group-item">
				<div class="row align-items-center">
					<div class="col">ServerStatus : <span style="color: red;">Offline</span></div>
				</div>
			</li>`;
		}
	});
}

function loginWeb(){
	fetch ('/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: document.getElementById("username").value,
			password: document.getElementById("password").value
		})
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			if (data.status === "success"){
				localStorage.setItem("entity_token", data.token);
				window.location.href = "/server";

			}else{
				alert('wrong username or password');
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
};

function logout(){
	localStorage.removeItem("entity_token");
	window.location.href = "/";
}

function authen(){
	var token = localStorage.getItem("entity_token");
	if (token === null){
		window.location.href = "/";
	}else{
		fetch ('/authen', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({token: token})
			})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				if (data.status === "success"){
					if (window.location.href.indexOf("server") > -1){
					
					}
					else{
						window.location.href = "/server";
					}
				}else{
					logout();
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		}
}

function authenIndex(){
	var token = localStorage.getItem("entity_token");
	if (token === null){

	}else{
		fetch ('/authen', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({token: token})
			})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				if (data.status === "success"){
					window.location.href = "/server";
				}else{
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		}
}
