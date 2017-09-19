"use strict";

let max = 8 //inpt;
let clicks = 0;
let minas = crearJuego(max);
let tablero = document.getElementById("tablerominas");
let btnStart = document.getElementById("start");
let btnReset = document.getElementById("reset");

function crearJuego(max) {
	let tabla = [];
	for (let i = 0; i < max; i++) {
		tabla[i] = crearArr(max);
	}
	return tabla;

    function crearArr(max) {
		let arr = [];
		for (let i = 0; i < max; i++){
			arr[i] = 0;
		}
        return arr;
    }
}

function crearTablero(max) {
	let divTablero = document.createElement("id");
	divTablero.id = "tableroCompleto";
	for (let i = 0; i < max; i++) {
		for (let j = 0; j < max; j++) {
			let div = document.createElement("div");
			div.id = i + "" + j;
			div.className = "espacio";
			div.addEventListener("click", mostrarNumero, true);
			div.addEventListener("dblclick",ponerBandera, true);
			divTablero.appendChild(div);
		}
	}
	tablero.appendChild(divTablero);
}

function mostrarNumero(e) {
	let divID = this.id.split("");
	let posicion = crearPosiciones();
	let divClickeado = document.getElementById(posicion);
	let pos = minas[parseInt(divID[0])][parseInt(divID[1])];
	if (pos == 0) {
		divClickeado.classList.add("blanco");
		mostrar(parseInt(divID[0]), parseInt(divID[1]), minas);
	} else {
		if (pos != "*") {
			document.getElementById(posicion).innerHTML = `<p>${pos}</p>`;
			divClickeado.classList.add("blanco");
		} else {
			divClickeado.classList.add("bomba");
			let espacios = document.getElementsByClassName("espacio");
			for(let i = 0; i < espacios.length; i++){
				espacios[i].removeEventListener("click", mostrarNumero,true);
				espacios[i].removeEventListener("dblclick", ponerBandera,true);		
			}
			abrirTablero(minas, max);
		}
	}

    function crearPosiciones() {
        return divID[0] + divID[1];
    }
}

function ponerBandera(e){
	e.preventDefault();
	let divID = this.id.split("");
	let posicion = divID[0] + divID[1];
	let divClickeado = document.getElementById(posicion);
	divClickeado.classList.add("bandera");
}

function ponerNumeros(tablero, max) {
	let num = max - 1;
	for (let i = 0; i < max; i++) {
		for (let j = 0; j < max; j++) {
			if (tablero[i][j] == "*") {
				if (i == 0 && j == 0) {
					crearNumeros(i, j, i + 1, j + 1, tablero);
				} else if (i == 0 && (j > 0 && j < num)) {
					crearNumeros(i, j - 1, i + 1, j + 1, tablero);
				} else if (i == 0 && j == num) {
					crearNumeros(i, j - 1, i + 1, j, tablero);
				} else if (j == num && (i > 0 && i < num)) {
					crearNumeros(i - 1, j - 1, i + 1, j, tablero);
				} else if (i == num && j == num) {
					crearNumeros(i - 1, j - 1, i, j, tablero);
				} else if (i == num && (j > 0 && j < num)) {
					crearNumeros(i - 1, j - 1, i, j + 1, tablero);
				} else if (i == num && j == 0) {
					crearNumeros(i - 1, j, i, j + 1, tablero);
				} else if (j == 0 && (i > 0 && i < num)) {
					crearNumeros(i - 1, j, i + 1, j + 1, tablero);
				} else {
					crearNumeros(i - 1, j - 1, i + 1, j + 1, tablero);
				}
			}
		}
	}
}

function crearNumeros(vari, varj, fini, finj, tablero) {
	for (let i = vari; i <= fini; i++) {
		for (let j = varj; j <= finj; j++) {
			if (tablero[i][j] != "*") {
				tablero[i][j] = (parseInt(tablero[i][j]) + 1);
			}
		}
	}
}

function generarBombas(tablero, max) {
	let filas = 0;
	let columnas = 0;
	let num = max - 1;

	filas = Math.floor((Math.random() * num) + 0);
	columnas = Math.floor((Math.random() * num) + 0);

	for (let i = 0; i < max; i++) {
		while (tablero[filas][columnas] == "*") {
			filas = Math.floor((Math.random() * num) + 0);
			columnas = Math.floor((Math.random() * num) + 0);
		}
		tablero[filas][columnas] = "*";
	}
}

function mostrarVacio(inicioI, inicioJ, finalI, finalJ, posicionI, posicionJ, tablero) {
	for (let i = inicioI; i <= finalI; i++) {
		for (let j = inicioJ; j <= finalJ; j++) {
			let divID = i + "" + j;
			let divClickeado = document.getElementById(divID)
			if (divClickeado.textContent == "") {
				if (tablero[i][j] == 0) {
					if (i == posicionI && j == posicionJ) {
						divClickeado.textContent = "";
						divClickeado.style.backgroundColor = "white";
					} else {
						if (divClickeado.style.backgroundColor != "white") {
							mostrar(i, j, tablero);
						}
					}
				} else {
					if (tablero[i][j] != "*") {
						document.getElementById(divID).innerHTML = `<p>${tablero[i][j]}</p>`;
						divClickeado.style.backgroundColor = "white";
					}
				}
			}
		}
	}
}

function mostrar(posI, posJ, tablero) {
	let num = max - 1;
	if (posI == 0 && posJ == 0) {
		mostrarVacio(posI, posJ, posI + 1, posJ + 1, posI, posJ, tablero);
	} else if (posI == 0 && (posJ > 0 && posJ < num)) {
		mostrarVacio(posI, posJ - 1, posI + 1, posJ + 1, posI, posJ, tablero);
	} else if (posI == 0 && posJ == num) {
		mostrarVacio(posI, posJ - 1, posI + 1, posJ, posI, posJ, tablero);
	} else if (posJ == num && (posI > 0 && posI < num)) {
		mostrarVacio(posI - 1, posJ - 1, posI + 1, posJ, posI, posJ, tablero);
	} else if (posI == num && posJ == num) {
		mostrarVacio(posI - 1, posJ - 1, posI, posJ, posI, posJ, tablero);
	} else if (posI == num && (posJ > 0 && posJ < num)) {
		mostrarVacio(posI - 1, posJ - 1, posI, posJ + 1, posI, posJ, tablero);
	} else if (posI == num && posJ == 0) {
		mostrarVacio(posI - 1, posJ, posI, posJ + 1, posI, posJ, tablero);
	} else if (posJ == 0 && (posI > 0 && posI < num)) {
		mostrarVacio(posI - 1, posJ, posI + 1, posJ + 1, posI, posJ, tablero);
	} else {
		mostrarVacio(posI - 1, posJ - 1, posI + 1, posJ + 1, posI, posJ, tablero);
	}
}

function abrirTablero(tablero, max) {
	for (let i = 0; i < max; i++) {
		for (let j = 0; j < max; j++) {
			let divID = i + "" + j;
			let divClickeado = document.getElementById(divID);
			if (tablero[i][j] == "*") {
				divClickeado.classList.add("bomba");
			}
		}
	}
}

btnStart.onclick = function (){
	cargarJuego();
}


function cargarJuego(){
	clicks += 1;
	if(clicks == 1){
		crearTablero(max);
		generarBombas(minas, max);
		ponerNumeros(minas, max);
		btnStart.classList.add("no-display");
		btnReset.classList.remove("no-display");
	} 
}

function reset(){
	$("#tablero").remove();
	crearTablero(max);
	generarBombas(minas);
	ponerNumeros(minas, max);
}