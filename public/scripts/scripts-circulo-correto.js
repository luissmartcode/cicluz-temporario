import {Circulo} from './circulo.js'


const circulos = []

document.addEventListener("DOMContentLoaded", function() {
    criarCirculos()
});

window.addEventListener("resize", () => {
    circulos.forEach(circulo => {circulo.redimensionar(); })        
  });


export function atualizarCirculos(itemEscolhido) {
    
    circulos.forEach(circulo => {
        circulo.atualizar(itemEscolhido)
    })
}




function criarCirculo(tipo) {
    const circulo = new Circulo(tipo);
    if(tipo != "memorias") {
        circulo.criarPartesCirculo(10);
    } else {
        circulo.criarPartesCirculo(6);
    }


    circulos.push(circulo);
}

function criarCirculos() {
    document.getElementsByClassName('svg-circulos')[0].innerHTML = '';
    criarCirculo('ter');
    criarCirculo('ser');
    criarCirculo('eu');
    criarCirculo('memorias');
}