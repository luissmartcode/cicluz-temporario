import { carregar_est_area, carregar_topicos, carregar_topicos_polaridades, deletarTopico, carregar_subtopicos, carregar_topico, deletarSubtopico, deletarSubtopicos, atualizarSubtopico, atualizarTopico } from './scripts-banco.js';
import { abrirModalAdd } from './scripts-modal.js';


export function exibirLista() {
    document.getElementById('divescolhas-items').innerHTML = '';
    document.getElementById("divescolhas").style.display = "none";
    let listaRecuperada = JSON.parse(sessionStorage.getItem('minhaLista'));


    if (listaRecuperada) {
        if (listaRecuperada.length > 0) {
            document.getElementById("divescolhas").style.display = "flex";
        }
        listaRecuperada.forEach(i => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'divescolhas-item';
            itemDiv.style.backgroundColor = i.est == "eu" ? "var(--cor-eu)" : i.est == "ser" ? "var(--cor-ser)" : i.est == "ter" ? "var(--cor-ter)" : i.est == "memorias" ? "var(--cor-memorias)" : "var(--cor-personagem)";
            itemDiv.style.color = i.est == "ser" ? 'black' : 'white';
            const span = document.createElement('span');
            span.innerHTML = `<span class="escolha-area">${i.est_area}</span> <span class="escolha-conteudo"><i>${i.nome_topico == undefined ? "" : `${i.nome_topico} |`}</i> <b>${i.nome}</b></span>`

            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-circle-xmark';
            icon.addEventListener('click', () => {
                itemDiv.remove();
                removerItem(i.id);
            });

            itemDiv.appendChild(span);
            itemDiv.appendChild(icon);

            const container = document.getElementById('divescolhas-items');
            container.appendChild(itemDiv);

        })

    }

}

export function listarItem(item) {
    let listaRecuperada = JSON.parse(sessionStorage.getItem('minhaLista'));
    if (listaRecuperada) {
        listaRecuperada.push(item);
        sessionStorage.setItem('minhaLista', JSON.stringify(listaRecuperada));
    } else {
        sessionStorage.setItem('minhaLista', JSON.stringify([item]));
    }
    exibirLista();

}

export function removerItem(id) {
    let listaRecuperada = JSON.parse(sessionStorage.getItem('minhaLista'));
    if (listaRecuperada) {
        listaRecuperada = listaRecuperada.filter(i => {
            return i.id !== id;
        });
        sessionStorage.setItem('minhaLista', JSON.stringify(listaRecuperada));
        if (listaRecuperada.length == 0) {
            document.getElementById("divescolhas").style.display = "none";
        }
        exibirLista();
    }

}

function removerSubitems(id) {
    let listaRecuperada = JSON.parse(sessionStorage.getItem('minhaLista'));
    if (listaRecuperada) {
        listaRecuperada = listaRecuperada.filter(i => {
            return i.id_topico !== id;
        });
        sessionStorage.setItem('minhaLista', JSON.stringify(listaRecuperada));
        if (listaRecuperada.length == 0) {
            document.getElementById("divescolhas").style.display = "none";
        }
        exibirLista();
    }

}

function estaNaLista(id) {
    let listaRecuperada = JSON.parse(sessionStorage.getItem('minhaLista'));
    if (listaRecuperada) {
        return listaRecuperada.filter(i => i.id == id).length
    }
    return false;
}

function criarItemTopicoESubtopico(item, tipo) {
    const caixaOpcoesItem = document.createElement('div');
    caixaOpcoesItem.classList.add('caixa-opcoes-item', 'item');
    caixaOpcoesItem.setAttribute("data-id", item.id);

    caixaOpcoesItem.setAttribute("data-posicao", item.posicao);

    const itemTextElement = document.createElement('span');
    itemTextElement.textContent = item.nome;

    // const iconElement = document.createElement('i');
    // iconElement.classList.add('btn-excluir-item-topico', "fa", "fa-trash");
    // iconElement.setAttribute('aria-hidden', 'true');


    // iconElement.addEventListener("click", async (e) => {
    //     if (tipo == "tópico") {
    //         try {
    //             document.getElementById("opcoes3").style.display = "none";
    //             caixaOpcoesItem.remove();
    //             removerItem(item.id);
    //             removerSubitems(item.id);
    //             await deletarTopico(item.id)
    //             await deletarSubtopicos(item.id);



    //         } catch (error) {
    //             console.error('Erro ao deletar tópico:', error);
    //         }
    //     } else {
    //         try {
    //             await deletarSubtopico(item.id);
    //             caixaOpcoesItem.remove();
    //             // await exibirSubtopicos(item.id_topico);
    //         } catch (error) {
    //             console.error('Erro ao deletar subtópico:', error);
    //         }
    //     }

    // });


    const anotherIconElement = document.createElement('i');
    anotherIconElement.classList.add('btn-editar-item', "fa", estaNaLista(item.id) ? 'fa-solid' : 'fa-regular', "fa-circle-check");
    anotherIconElement.setAttribute('aria-hidden', 'true');

    anotherIconElement.addEventListener("click", async (e) => {
        let objeto = { categoria: "teste", assunto: "teste", topico: "teste", subtopico: "teste", idtopico: "teste", idsubtopico: "teste" }
        if (e.target.classList.contains("fa-regular")) {
            e.target.classList.remove("fa-regular");
            e.target.classList.add("fa-solid");
            listarItem(item);

        } else {
            e.target.classList.remove("fa-solid");
            e.target.classList.add("fa-regular");
            removerItem(item.id)
        }


    });


    // const btnEditar = document.createElement('i');
    // btnEditar.classList.add('btn-editar-item', 'fa-solid', "fa-pen");
    // btnEditar.setAttribute('aria-hidden', 'true');
    // btnEditar.setAttribute('id', item.id);



    // btnEditar.addEventListener("click", async (e) => {
    //     abrirModalAdd(e, tipo, item.id, "editar", tipo == "tópico" ? item.est_id : item.id_topico, item.posicao);
    // });

    // const btnUp = document.createElement('i');
    // btnUp.classList.add('btn-editar-item', 'fa-solid', "fa-arrow-up");
    // btnUp.setAttribute('aria-hidden', 'true');
    // btnUp.setAttribute('id', item.id);

    // btnUp.addEventListener("click", async (e) => {
    //     mudarPosicao(e, tipo, item)
    // });

    // const btnDown = document.createElement('i');
    // btnDown.classList.add('btn-editar-item', 'fa-solid', "fa-arrow-down");
    // btnDown.setAttribute('aria-hidden', 'true');
    // btnDown.setAttribute('id', item.id);

    // btnDown.addEventListener("click", async (e) => {
    //     mudarPosicao(e, tipo, item)
    // });


    const btnMenu = document.createElement('i');
    btnMenu.classList.add('btn-editar-item', 'fa-solid', "fa-ellipsis-vertical");
    btnMenu.setAttribute('aria-hidden', 'true');
    btnMenu.setAttribute('id', item.id);
    btnMenu.style.padding = "0 0.2rem"

    btnMenu.addEventListener("click", async (e) => {
        atribuirEventos(e, tipo, item, caixaOpcoesItem);
        exibirModalOpcoes(e, tipo)
    });


    const caixaIcones = document.createElement('div');
    caixaIcones.classList.add('caixa-icones');


    caixaOpcoesItem.appendChild(itemTextElement);
    caixaIcones.appendChild(anotherIconElement);
    // caixaIcones.appendChild(btnUp);
    // caixaIcones.appendChild(btnDown);
    //caixaIcones.appendChild(btnEditar);
    //caixaIcones.appendChild(iconElement);
    caixaIcones.appendChild(btnMenu);
    caixaOpcoesItem.appendChild(caixaIcones);
    return caixaOpcoesItem;
}

let movimentar;
let editar;
let deletar;

function atribuirEventos(ev, tipo, item, caixaOpcoesItem) {
    // Inicialize as funções se não estiverem definidas
    if (movimentar) {
        document.getElementById('btnupopcao').removeEventListener("click", movimentar);
        document.getElementById('btndownopcao').removeEventListener("click", movimentar);
    }
    movimentar = (e) => {
        mudarPosicao(ev, tipo, item, e);
        fecharModalOpcoes();
    };
    document.getElementById('btnupopcao').addEventListener("click", movimentar);
    document.getElementById('btndownopcao').addEventListener("click", movimentar);

    if (editar) {
        document.getElementById('btneditaropcao').removeEventListener("click", editar);
    }
    editar = (e) => {
        abrirModalAdd(ev, tipo, item.id, "editar", tipo == "tópico" ? item.est_id : item.id_topico, item.posicao);
        fecharModalOpcoes();
    };
    document.getElementById('btneditaropcao').addEventListener("click", editar);

    if (deletar) {
        document.getElementById('btndeletaropcao').removeEventListener("click", deletar);
    }
    deletar = async (e) => {
        console.log(item);
        if (tipo == "tópico") {
            try {
                document.getElementById("opcoes3").style.display = "none";
                caixaOpcoesItem.remove();
                removerItem(item.id);
                removerSubitems(item.id);
                await deletarTopico(item.id);
                await deletarSubtopicos(item.id);
            } catch (error) {
                console.error('Erro ao deletar tópico:', error);
            }
        } else {
            try {
                await deletarSubtopico(item.id);
                caixaOpcoesItem.remove();
            } catch (error) {
                console.error('Erro ao deletar subtópico:', error);
            }
        }
        fecharModalOpcoes();
    };
    document.getElementById('btndeletaropcao').addEventListener("click", deletar);

}



function exibirModalOpcoes(e, tipo,) {
    const parent = tipo == "tópico" ? document.getElementById('opcoes2') : document.getElementById('opcoes3')
    const modalarea = document.getElementById('modalopcoes-area')
    const modal = document.getElementById('modalopcoes')
    modalarea.style.display = "flex";
    modal.style.display = "flex";
    modal.style.color = tipo == "tópico" ? document.getElementById('opcoes2').style.backgroundColor : document.getElementById('opcoes3').style.backgroundColor
    if (modal.style.color == 'white' || modal.style.color == '#ffffff') {
        modal.style.color = tipo == "tópico" ? document.getElementById('opcoes2').style.color : document.getElementById('opcoes3').style.color
    }
    const x = window.innerWidth - e.clientX - modal.clientWidth / 2
    const y = e.target.getBoundingClientRect().top - modal.clientHeight - 10

    modal.style.top = `${y}px`;
    modal.style.right = `${x}px`;


    modalarea.addEventListener("click", () => fecharModalOpcoes())
}

function fecharModalOpcoes() {
    const modalarea = document.getElementById('modalopcoes-area')
    modalarea.style.display = "none"
}

async function mudarPosicao(ev, tipo, item, e) {
    const divOrigem = ev.target.parentElement.parentElement;
    const textoOrigem = divOrigem.firstChild.textContent
    const posicaoOrigem = divOrigem.getAttribute('data-posicao')
    const idOrigem = divOrigem.getAttribute('data-id')

    if ((ev.target.className.includes('up') && posicaoOrigem == 1) || (ev.target.className.includes('down') && posicaoOrigem == divOrigem.parentElement.childElementCount - 1)) {
        return
    }

    const divDestino = e.target.className.includes('up') ? divOrigem.previousElementSibling : divOrigem.nextElementSibling
    const textoDestino = divDestino.firstChild.textContent
    const posicaoDestino = divDestino.getAttribute('data-posicao')
    const idDestino = divDestino.getAttribute('data-id')
    const parent = tipo == 'tópico' ? item.est_id : item.id_topico

    if (tipo == "tópico") {
        try {
            await atualizarTopico(textoOrigem, idOrigem, posicaoDestino);
            await atualizarTopico(textoDestino, idDestino, posicaoOrigem);
            await exibirTopicos(parent);

        } catch (er) {
            console.log(er)
            console.log('errraço')
        }

    } else if (tipo == "subtópico") {
        try {
            await atualizarSubtopico(textoOrigem, idOrigem, posicaoDestino);
            await atualizarSubtopico(textoDestino, idDestino, posicaoOrigem);
            await exibirSubtopicos(parent);
        } catch (er) {
            console.log('errraço')
        }

    }


}


function criarTituloTopicoESubtopico(item, tipo) {
    // Cria a div principal
    const tituloItem = document.createElement('div');
    tituloItem.classList.add('caixa-opcoes-item', "titulo");

    // Cria o elemento de título do tópico
    const topicoTituloElement = document.createElement('span');
    topicoTituloElement.classList.add('topico-caixa-opcoes');
    topicoTituloElement.textContent = item.est_id;

    // Cria a div para o título e o botão
    const divTituloElement = document.createElement('div');
    divTituloElement.classList.add('divtitulo-caixa-opcoes');

    // Cria o elemento de título
    const tituloElement = document.createElement('div');
    tituloElement.classList.add('titulo-caixa-opcoes');

    // Cria o ícone do título
    const topicoIconeElement = document.createElement('i');
    topicoIconeElement.id = 'titulo-topico-icone';
    topicoIconeElement.classList.add('fa', item.icone, 'item-conteudo');

    // Cria o nome do título
    const topicoNomeElement = document.createElement('span');
    topicoNomeElement.id = 'titulo-topico-nome';
    topicoNomeElement.textContent = item.nome;

    // Cria o botão
    const btnTopicoElement = document.createElement('span');
    btnTopicoElement.id = 'btntopico';
    btnTopicoElement.classList.add('btntopico', 'fa', 'fa-circle-plus');

    btnTopicoElement.addEventListener("click", (e) => {
        abrirModalAdd(e, tipo, item.id, "adicionar", tipo == "tópico" ? item.est_id : item.id_topico, item.posicao);
    })

    // Adiciona os elementos à estrutura
    tituloElement.appendChild(topicoIconeElement);
    tituloElement.appendChild(topicoNomeElement);
    divTituloElement.appendChild(tituloElement);
    divTituloElement.appendChild(btnTopicoElement);
    tituloItem.appendChild(topicoTituloElement);
    tituloItem.appendChild(divTituloElement);

    return tituloItem;

}



export async function exibirSubtopicos(id) {
    let caixaSubtopico = document.getElementById("opcoes3");
    caixaSubtopico.innerHTML = "";
    let topico = await carregar_topico(id);
    caixaSubtopico.style.backgroundColor = document.getElementById("opcoes2").style.backgroundColor;
    caixaSubtopico.style.color = document.getElementById("opcoes2").style.color;
    // caixaSubtopico.style.filter = document.getElementById("opcoes2").style.filter;
    let titulo = criarTituloTopicoESubtopico(topico[0], "subtópico");
    titulo.addEventListener("mouseleave", (e) => {

        if (!(document.getElementById("modal2-area").contains(e.toElement))) {
            document.getElementById("opcoes3").innerHTML = '';
            document.getElementById("modal2").style.display = "none";
            document.getElementById("input-modal2").value = "";
        }
    })
    let subtopicos = await carregar_subtopicos(id);
    caixaSubtopico.appendChild(titulo);
    subtopicos.forEach(i => {
        let item = criarItemTopicoESubtopico(i, "subtópico");
        document.getElementById("opcoes3").appendChild(item);
        item.addEventListener("mouseleave", (e) => {
            console.log(e.toElement);
            if (!(document.getElementById("container-caixa-opcoes").contains(e.toElement) || document.getElementById("caixa-opcoes-item").contains(e.toElement) || document.getElementById("modal2-area").contains(e.toElement))) {

                document.getElementById("opcoes3").innerHTML = ''
                document.getElementById("modal2").style.display = "none";
                document.getElementById("input-modal2").value = "";
            }
        });
    });
}

export async function exibirTopicos(id, polaridade = null) {

    document.getElementById("opcoes2").innerHTML = '';
    document.getElementById("opcoes3").innerHTML = '';

    let caixaTopico = document.getElementById("opcoes2")
    if (polaridade) {
        caixaTopico.setAttribute("data-polaridade", polaridade.id);
    } else {
        caixaTopico.removeAttribute("data-polaridade");
    }
    caixaTopico.innerHTML = "";
    let est = await carregar_est_area(id);

    caixaTopico.style.backgroundColor = est[0].est == "eu" ? "var(--cor-eu)" : est[0].est == "ser" ? "var(--cor-ser)" : est[0].est == "ter" ? "var(--cor-ter)" : est[0].est == "memorias" ? "var(--cor-memorias)" : polaridade.corFundo;
    caixaTopico.style.color = est[0].est == "ser" ? 'black' : est[0].est != "personagem" ? 'white' : polaridade.corFrente;
    let titulo = criarTituloTopicoESubtopico(est[0], "tópico");

    titulo.addEventListener("mouseleave", (e) => {
        if (!(document.getElementById("container-caixa-opcoes").contains(e.toElement) || document.getElementById("modal2-area").contains(e.toElement))) {
            document.getElementById("opcoes2").innerHTML = '';
            document.getElementById("opcoes3").innerHTML = '';
            document.getElementById("modal2").style.display = "none";
            document.getElementById("logo").style.display = "block";
            document.getElementById("input-modal2").value = "";
        }
    })

    titulo.addEventListener("mouseenter", (e) => {

        document.getElementById("opcoes3").style.display = "none";
    })

    let topicos = polaridade ? await carregar_topicos_polaridades(id, polaridade.id) : await carregar_topicos(id)
    document.getElementById("opcoes2").appendChild(titulo);
    topicos.forEach(i => {
        let item = criarItemTopicoESubtopico(i, "tópico");
        document.getElementById("opcoes2").appendChild(item);
        item.addEventListener("mouseleave", (e) => {
            if (!(document.getElementById("container-caixa-opcoes").contains(e.toElement) || document.getElementById("modal2-area").contains(e.toElement) || document.getElementById("modalopcoes-area").contains(e.toElement))) {
                document.getElementById("opcoes2").style.display = "none";
                document.getElementById("opcoes3").style.display = "none";
                document.getElementById("modal2").style.display = "none";
                document.getElementById("logo").style.display = "block";
                document.getElementById("input-modal2").value = "";
            }
        });

        item.addEventListener("mouseenter", async (e) => {
            // let subtopicos = await carregar_subtopicos(i.id);

            exibirSubtopicos(i.id);

            document.getElementById("opcoes3").style.display = "block";
        })
    })
    document.getElementById("logo").style.display = "none";
    caixaTopico.style.display = "block";


}


