import { Circulo, criarCirculos, redimensionarCirculos } from './scripts-circulo.js';
import { exibirLista, removerItem, listarItem, exibirTopicos } from './scripts-top-subtop.js';
import { carregar_est_areas, carregar_topicos_polaridades } from './scripts-banco.js';
function listarOutraPagina() {
  let lb = document.getElementById('categoria-memorias');
  let le = document.getElementById('categoria-eu');
  let ls = document.getElementById('categoria-ser');
  let lt = document.getElementById('categoria-ter');
  let lm = document.getElementById("categoria-maturidade")
  lb.children[1].innerHTML = '';
  le.children[1].innerHTML = '';
  ls.children[1].innerHTML = '';
  lt.children[1].innerHTML = '';
  lm.children[1].innerHTML = '';

  let listaRecuperada = JSON.parse(sessionStorage.getItem('minhaLista'));


  if (listaRecuperada) {
    listaRecuperada.forEach(i => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'divescolhas-item';
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

      let container = i.est == "eu" ? le.children[1] : i.est == "ser" ? ls.children[1] : i.est == "ter" ? lt.children[1] : i.est == "memorias" ? lb.children[1] : lm.children[1];
      container.appendChild(itemDiv);

    })

  }
}

async function carregarPersonagens() {
  const cores = ['#ff0001', '#ffc700', '#ffff00', '#03ff00', '#0000ff', '#d126ff']
  const personagens = await carregar_est_areas('personagem')
  const div = document.getElementsByClassName('divpersonagens')
  div.innerHTML = '';
  personagens.forEach(p => {
    let img = document.createElement("img");

    img.classList.add("personagens-itens");
    img.src = `estilos/personagens/${p.icone}.jpeg`;

    img.addEventListener("click", (e) => {
      document.getElementById("modal-polaridades").setAttribute("data-id", p.id)
      document.getElementById('modal-polaridades').setAttribute('data-cor', cores[p.posicao - 1])
      document.getElementById("container").style.filter = "blur(3px)"
      document.getElementById("modal-polaridades").style.display = "flex";
    })

    div[0].appendChild(img)
  })

}

function atribuirFuncoesModal() {
  const areaModal = document.getElementById("modal-polaridades");
  areaModal.addEventListener("click", (e) => {
    document.getElementById("modal-polaridades").removeAttribute("data-id")
    document.getElementById("container").style.filter = ""
    document.getElementById("modal-polaridades").style.display = "none";
  })
  const polaridades = document.getElementsByClassName("polaridades");
  const clickPolaridades = async (e) => {
    await exibirTopicos(document.getElementById("modal-polaridades").getAttribute("data-id"), { id: e.target.getAttribute('data-id'), corFundo: e.target.getAttribute('data-id') == 1 ? "black" : "white", corFrente: document.getElementById("modal-polaridades").getAttribute("data-cor") })
    document.getElementById("modal-polaridades").removeAttribute("data-id")
    document.getElementById("container").style.filter = ""
    document.getElementById("modal-polaridades").style.display = "none";
  }
  [...polaridades].forEach(p => {
    p.removeEventListener("click", clickPolaridades)
    p.addEventListener("click", clickPolaridades)
  })
}

document.addEventListener("DOMContentLoaded", async () => {

  carregarPersonagens()
  atribuirFuncoesModal()



  // let itens = document.getElementsByClassName("personagens-itens");
  // Array.from(itens).forEach(i => {
  //   i.addEventListener("click", (e) => {
  //     let objeto = { categoria: "teste", assunto: "teste", topico: "teste", subtopico: "teste", idtopico: "teste", idsubtopico: "teste" }
  //     if (e.target.classList.contains("fa-regular")) {
  //       e.target.classList.remove("fa-regular");
  //       e.target.classList.add("fa-solid");
  //       listarItem(objeto);

  //     }
  //   })
  // });
});



document.getElementById("divescolhas-btn").addEventListener("click", (e) => {
  listarOutraPagina();

  document.getElementById("teste2").style.display = "none";
  document.getElementById("teste5").style.display = "flex";
})

document.getElementById("divnav-btn").addEventListener("click", (e) => {
  document.getElementById("teste5").style.display = "none";
  document.getElementById("teste2").style.display = "flex";
})

document.addEventListener("DOMContentLoaded", () => {
  let circulos = [
    new Circulo("green", "maior", "padrao"),
    new Circulo("yellow", "central", "padrao"),
    new Circulo("blue", "menor", "padrao"),
    new Circulo("white", "fixo", "padrao", true)
  ];
  criarCirculos(circulos);
});

window.addEventListener("resize", () => {
  let circulos = [
    new Circulo("green", "maior", "padrao"),
    new Circulo("yellow", "central", "padrao"),
    new Circulo("blue", "menor", "padrao"),
    new Circulo("blue", "fixo", "padrao")
  ];
  redimensionarCirculos(circulos);
});

exibirLista();











