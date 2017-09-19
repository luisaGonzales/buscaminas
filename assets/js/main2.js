"use strict";

const buscaminas = {
    max : 8,//inpt;
    clicks : 0,
    minas : buscaminas.crearJuego(buscaminas.max),
    tablero : document.getElementById("tablerominas"),
    btnStart : document.getElementById("start"),
    btnReset : document.getElementById("reset"),
    crearJuego: function (max) {
        let tabla = [];
        for (let i = 0; i < max; i++) {
            tabla[i] = buscaminas.crearArr(max);
        }
        return tabla;
    },
    crearArr: function (max) {
        let arr = [];
        for (let i = 0; i < max; i++){
            arr[i] = 0;
        }
        return arr;
    },
    crearNumeros: function (vari, varj, fini, finj, tablero) {
        for (let i = vari; i <= fini; i++) {
            for (let j = varj; j <= finj; j++) {
                if (tablero[i][j] != "*") {
                    tablero[i][j] = (parseInt(tablero[i][j]) + 1);
                }
            }
        }
    },
    crearTablero: function (max) {
        let divTablero = document.createElement("id");
        divTablero.id = "tableroCompleto";
        for (let i = 0; i < max; i++) {
            for (let j = 0; j < max; j++) {
                let div = document.createElement("div");
                div.id = i + "" + j;
                div.className = "espacio";
                div.addEventListener("click", buscaminas.mostrarNumero, true);
                div.addEventListener("dblclick", buscaminas.ponerBandera, true);
                divTablero.appendChild(div);
            }
        }
        tablero.appendChild(divTablero);
    },
    mostrarNumero: function (e) {
        let divID = this.id.split("");
        let posicion = crearPosiciones();
        let divClickeado = document.getElementById(posicion);
        let pos = buscaminas.minas[parseInt(divID[0])][parseInt(divID[1])];
        if (pos == 0) {
            divClickeado.classList.add("blanco");
            buscaminas.mostrar(parseInt(divID[0]), parseInt(divID[1]), buscaminas.minas);
        } else {
            if (pos != "*") {
                document.getElementById(posicion).innerHTML = `<span>${pos}</span>`;
                divClickeado.classList.add("blanco");
            } else {
                divClickeado.classList.add("bomba");
                let espacios = document.getElementsByClassName("espacio");
                for(let i = 0; i < espacios.length; i++){
                    espacios[i].removeEventListener("click", buscaminas.mostrarNumero,true);
                    espacios[i].removeEventListener("dblclick", buscaminas.ponerBandera,true);		
                }
                buscaminas.abrirTablero(buscaminas.minas, buscaminas.max);
            }
        }
    
        function crearPosiciones() {
            return divID[0] + divID[1];
        }
    },
    ponerBandera: function (e){
        e.preventDefault();
        let divID = this.id.split("");
        let posicion = divID[0] + divID[1];
        let divClickeado = document.getElementById(posicion);
        divClickeado.classList.add("bandera");
    },
    ponerNumeros: function (tablero, max) {
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
    },
    generarBombas: function (tablero, max) {
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
    },
    mostrarVacio: function (inicioI, inicioJ, finalI, finalJ, posicionI, posicionJ, tablero) {
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
                                buscaminas.mostrar(i, j, tablero);
                            }
                        }
                    } else {
                        if (tablero[i][j] != "*") {
                            document.getElementById(divID).innerHTML = `<span>${tablero[i][j]}</span>`;
                            divClickeado.style.backgroundColor = "white";
                        }
                    }
                }
            }
        }
    },
    mostrar: function (posI, posJ, tablero) {
        let num = buscaminas.max - 1;
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
    },
    abrirTablero: function (tablero, max) {
        for (let i = 0; i < max; i++) {
            for (let j = 0; j < max; j++) {
                let divID = i + "" + j;
                let divClickeado = document.getElementById(divID);
                if (tablero[i][j] == "*") {
                    divClickeado.classList.add("bomba");
                }
            }
        }
    },
    cargarJuego: function (){
        clicks += 1;
        if(clicks == 1){
            buscaminas.crearTablero(buscaminas.max);
            buscaminas.generarBombas(buscaminas.minas, buscaminas.max);
            buscaminas.ponerNumeros(buscaminas.minas, buscaminas.max);
            btnStart.classList.add("no-display");
            btnReset.classList.remove("no-display");
        } 
    },
    reset: function (){
        $("#tablero").remove();
        buscaminas.crearTablero(buscaminas.max);
        buscaminas.generarBombas(buscaminas.minas);
        buscaminas.ponerNumeros(buscaminas.minas, buscaminas.max);
    }
};

btnStart.onclick = function (){
	buscaminas.cargarJuego();
}




