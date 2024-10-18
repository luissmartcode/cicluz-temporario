import { criarTopico, criarSubtopico, atualizarSubtopico, atualizarTopico, carregar_topico } from './scripts-banco.js';
import { exibirTopicos, exibirSubtopicos } from './scripts-top-subtop.js';
var container = document.getElementById("container");
export function abrirModalAdd(e, tipo, id, tipoAcao, parent, posicao) {
    const root = document.documentElement;
    root.style.setProperty('--cor-modal', document.getElementById("opcoes2").style.backgroundColor);
    var modal = document.getElementById("modal2");
    const x = window.innerWidth - e.clientX + 10; // Coordenada X em relação à janela
    const y = e.clientY + 10; // Coordenada Y em relação à janela
    modalarea.style.display = "flex";
    modal.style.top = `${y}px`;
    modal.style.right = `${x}px`;
    modal.style.display = "flex";
    modal.setAttribute("data-tipo", tipo);
    modal.setAttribute("data-id", id);
    modal.setAttribute("data-parent", parent);
    modal.setAttribute('data-posicao', posicao)
    container.style.filter = "blur(2px)";

    if (tipoAcao == 'editar') {
        document.getElementById('modal2edit-btn').classList.remove("d-none")
        document.getElementById('modal2-btn').classList.add("d-none")
        document.getElementById("input-modal2").value = e.target.parentElement.parentElement.firstChild.textContent
    } else {
        document.getElementById('modal2-btn').classList.remove("d-none")
        document.getElementById('modal2edit-btn').classList.add("d-none")
        document.getElementById("input-modal2").placeholder = `Adicione o ${tipo}`;
    }
}

var inputmodal = document.getElementById("input-modal2");
var modal = document.getElementById("modal2");
var modalarea = document.getElementById("modal2-area");
modalarea.addEventListener("click", (e) => {
    if (!modal.contains(e.target)) {
        container.style.filter = "";
        modalarea.style.display = "none";
        inputmodal.value = "";
    }
})

var modalbtn = document.getElementById("modal2-btn");

modalbtn.addEventListener("click", async (e) => {
    const tipo = modal.getAttribute("data-tipo");
    const id = modal.getAttribute("data-id");
    const nome = document.getElementById("input-modal2").value;
    let posicao;
    if (tipo == "tópico") {
        posicao = document.getElementById('opcoes2').childElementCount == 1 ? 1 : parseInt(document.getElementById('opcoes2').lastChild.getAttribute('data-posicao')) + 1;
    } else {
        posicao = document.getElementById('opcoes3').childElementCount == 1 ? 1 : parseInt(document.getElementById('opcoes3').lastChild.getAttribute('data-posicao')) + 1;
    }

    const parent = modal.getAttribute('data-parent');
    const polaridade = document.getElementById("opcoes2").hasAttribute('data-polaridade') ? { id: document.getElementById("opcoes2").getAttribute('data-polaridade'), corFundo: document.getElementById("opcoes2").style.backgroundColor, corFrente: document.getElementById("opcoes2").style.color } : null
    console.log(polaridade)
    if (tipo == "tópico") {
        try {
            await criarTopico(nome, id, posicao, polaridade ? polaridade.id : null);
            await exibirTopicos(id, polaridade);
            container.style.filter = "";
            modalarea.style.display = "none";
            inputmodal.value = "";
        } catch (er) {
            console.log(er)
            console.log('errraço')
        }

    } else if (tipo == "subtópico") {
        try {
            await criarSubtopico(nome, id, posicao);
            await exibirSubtopicos(id);
            container.style.filter = "";
            modalarea.style.display = "none";
            inputmodal.value = "";
        } catch (er) {
            console.log(er)
            console.log('errraço')
        }

    }

});


var modal2editBtn = document.getElementById("modal2edit-btn");
modal2editBtn.addEventListener("click", async (e) => {
    const tipo = modal.getAttribute("data-tipo");
    const id = modal.getAttribute("data-id");
    const nome = document.getElementById("input-modal2").value;
    const posicao = modal.getAttribute("data-posicao");
    const parent = modal.getAttribute('data-parent')
    if (tipo == "tópico") {
        try {
            await atualizarTopico(nome, id, posicao);
            await exibirTopicos(parent);
            container.style.filter = "";
            modalarea.style.display = "none";
            inputmodal.value = "";
        } catch (er) {
            console.log(er)
            console.log('errraço')
        }

    } else if (tipo == "subtópico") {
        try {
            await atualizarSubtopico(nome, id, posicao);
            await exibirSubtopicos(parent);
            container.style.filter = "";
            modalarea.style.display = "none";
            inputmodal.value = "";
        } catch (er) {
            console.log('errraço')
        }

    }

});