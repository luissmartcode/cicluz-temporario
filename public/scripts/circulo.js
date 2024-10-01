import {PedacoCirculo} from './pedacoCirculo.js'
import {atualizarCirculos} from './scripts-circulo-correto.js'
export class Circulo {
    constructor(tipo) {
        this.svgCirculo = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svgCirculo.appendChild(this.criarSombraCirculo())


        this.tipo = tipo;
        this.itemEscolhido = 'padrao'
        this.status = this.itemEscolhido == this.tipo ? "expandido" : this.itemEscolhido == "padrao" ? this.itemEscolhido : "recolhido";
        this.pedacosCirculos = [];
        this.cor = tipo == "ter" ? "ff0000": tipo == "ser" ? "00ff00" : tipo == "eu" ? "0000ff" : "ff00ff"
        this.areaCirculos = document.getElementsByClassName('svg-circulos')[0]
        this.definirInformacoesBasicas();
        this.criarCirculoFundo();


    }

    definirInformacoesBasicas() {
        const areaCirculosEmPx = this.areaCirculos.getBoundingClientRect().width
        const grossuraStatus = {"expandido": 0.2, "padrao" : 0.05, "recolhido": 0.03}
        const grossuraStatusCentral = {"expandido": 0.25, "padrao" : 0.18, "recolhido": 0.15}
        const taxaEspaco = this.itemEscolhido == "padrao" ? 0.025 : 0.015
        const espacoEntreCirculos = areaCirculosEmPx * taxaEspaco
        this.raioExternoTer = (areaCirculosEmPx * 0.95) / 2;
        const raioInternoTer = this.raioExternoTer - (areaCirculosEmPx * grossuraStatus[this.itemEscolhido == "ter" ? "expandido" : this.itemEscolhido == "padrao" ? this.itemEscolhido : "recolhido"])
        const raioExternoSer = raioInternoTer - espacoEntreCirculos;
        const raioInternoSer = raioExternoSer - (areaCirculosEmPx * grossuraStatus[this.itemEscolhido == "ser" ? "expandido" : this.itemEscolhido == "padrao" ? this.itemEscolhido : "recolhido"])
        const raioExternoEu = raioInternoSer - espacoEntreCirculos;
        const raioInternoEu = raioExternoEu - (areaCirculosEmPx * grossuraStatus[this.itemEscolhido == "eu" ? "expandido" : this.itemEscolhido == "padrao" ? this.itemEscolhido : "recolhido"])
        this.raioExternoCentro = raioInternoEu - espacoEntreCirculos;
        this.raioCirculosCentro = this.raioExternoCentro  * grossuraStatusCentral[this.itemEscolhido == "memorias" ? "expandido" : this.itemEscolhido == "padrao" ? this.itemEscolhido : "recolhido"]
        this.raioInternoCentro = this.raioExternoCentro - this.raioCirculosCentro *2 

        this.diametro = this.tipo == "ter" ? this.raioExternoTer * 2 : this.tipo == "ser" ? raioExternoSer * 2 : this.tipo == "eu" ? raioExternoEu * 2 : this.raioExternoCentro * 2;
        this.grossura = areaCirculosEmPx * grossuraStatus[this.status];  
        this.raioExterno = this.tipo == "ter" ? this.raioExternoTer : this.tipo == "ser" ? raioExternoSer  : this.tipo == "eu" ? raioExternoEu : this.raioExternoCentro;
        this.raioInterno = this.tipo == "ter" ? raioInternoTer : this.tipo == "ser" ? raioInternoSer  : this.tipo == "eu" ? raioInternoEu : this.raioInternoCentro;


    }

    criarCirculoFundo() {
        var circuloFundo = document.getElementById('circulo-fundo')
        const x = (this.areaCirculos.getBoundingClientRect().width/2);
        const y = (this.areaCirculos.getBoundingClientRect().height/2);
        if(!circuloFundo) {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("id", "circulo-fundo")
            circle.setAttribute("cx", x); 
            circle.setAttribute("cy", y); 
            circle.setAttribute("r", this.raioExternoTer);              
            this.svgCirculo.appendChild(circle);
        } else {
            circuloFundo.setAttribute("cx", x); 
            circuloFundo.setAttribute("cy", y); 
            circuloFundo.setAttribute("r", this.raioExternoTer);   
        }

    }

    // criarOpcoesCentrais(quantidadeOpcoes) {
        
    //     var circuloCentro = document.getElementById('circulo-centro')
    //     const x = (this.areaCirculos.getBoundingClientRect().width/2);
    //     const y = (this.areaCirculos.getBoundingClientRect().height/2);
    //     if(!circuloCentro) {
    //         let grupo = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    //         const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    //         circle.setAttribute("id", "circulo-centro")
    //         circle.setAttribute("cx", x); 
    //         circle.setAttribute("cy", y); 
    //         circle.setAttribute("r", this.raioExternoCentro);           
            
    //         const mouseEnterHandler = (e) => {
    //             console.log('a')
    //             const origem = e.relatedTarget;
    //             if (origem && origem.nodeName === 'svg' || origem.getAttribute('id') == "circulo-fundo") {
    //                 atualizarCirculos(this.tipo);
    //             }
                
    //         };
        
    //         grupo.removeEventListener('mouseenter', this.mouseEnterHandler);
    //         grupo.addEventListener('mouseenter', mouseEnterHandler);
    //         grupo.mouseEnterHandler = mouseEnterHandler;
    //         grupo.appendChild(circle);
    //         this.areaCirculos.firstChild.appendChild(grupo);
    //         this.criarPartesCirculo(6);
    //     } else {
    //         circuloCentro.setAttribute("cx", x); 
    //         circuloCentro.setAttribute("cy", y); 
    //         circuloCentro.setAttribute("r", this.raioExternoCentro);   
    //     }

    // }

    criarPartesCirculo(quantidadePartes) {
        this.grauParte = 360 / quantidadePartes;
        this.cores = this.gerarCores(this.cor, quantidadePartes)
        this.grauInicial = 0;
        for(let i =0; i<quantidadePartes; i++) {             
            const pedacoCirculo = new PedacoCirculo(i, this, 'bi-star', 'asdasdsdasd asdasd'); 
            pedacoCirculo.criarPedaco(this.grauParte, this.grauInicial);
            this.pedacosCirculos.push(pedacoCirculo)         

            if(this.areaCirculos.hasChildNodes()) {
                this.areaCirculos.firstChild.appendChild(pedacoCirculo.grupo);
            } else {
                this.svgCirculo.style.height = this.areaCirculos.getBoundingClientRect().width;
                this.svgCirculo.style.width = this.areaCirculos.getBoundingClientRect().width;
                this.svgCirculo.appendChild(pedacoCirculo.grupo); 
                this.svgCirculo.addEventListener('mouseleave', () => {
                    atualizarCirculos('padrao')
                }) 
                this.areaCirculos.appendChild(this.svgCirculo);
            }
            
        }
        this.adicionarAtributosPosteriores(true);  
    
    }  
    

    criarSombraCirculo() {
    const svg = document.getElementById('meuSvg');
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'sombra');

    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('in', 'SourceAlpha');
    feGaussianBlur.setAttribute('stdDeviation', '5');

    const feOffset = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
    feOffset.setAttribute('dx', '2');
    feOffset.setAttribute('dy', '2');
    feOffset.setAttribute('result', 'offsetblur');

    const feFlood = document.createElementNS('http://www.w3.org/2000/svg', 'feFlood');
    feFlood.setAttribute('flood-color', 'rgba(0, 0, 0, 0.2)');

    const feComposite = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
    feComposite.setAttribute('in2', 'offsetblur');
    feComposite.setAttribute('operator', 'in');

    const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode2.setAttribute('in', 'SourceGraphic');

    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    filter.appendChild(feGaussianBlur);
    filter.appendChild(feOffset);
    filter.appendChild(feFlood);
    filter.appendChild(feComposite);
    filter.appendChild(feMerge);
    defs.appendChild(filter);

    return defs
    }
    
    adicionarAtributosPosteriores() {
        this.pedacosCirculos.forEach(pedaco => pedaco.adicionarAtributosPosteriores(true))
    }

    redimensionar() {
        this.definirInformacoesBasicas()
        this.criarCirculoFundo()
        this.pedacosCirculos.forEach(pedaco => pedaco.redimensionar()) 


        this.svgCirculo.style.height = this.areaCirculos.getBoundingClientRect().width;
        this.svgCirculo.style.width = this.areaCirculos.getBoundingClientRect().width;
    }

    hexadecimalParaRgb(hex) {
        hex = hex.replace('#', '');
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }
        return [
            parseInt(hex.substring(0, 2), 16),
            parseInt(hex.substring(2, 4), 16),
            parseInt(hex.substring(4, 6), 16)
        ];
    }
    
    rgbParaHexadecimal(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
    
    gerarCores(hex, variacoes) {
        const [r, g, b] = this.hexadecimalParaRgb(hex);
        const cores = [];
    
        const limite = 0.7; 
    
        for (let i = 0; i < variacoes; i++) {
            const intensidade = ((i + 1) / (variacoes + 1)) * limite;
    
            const novoR = Math.floor(r + (255 - r) * intensidade);
            const novoG = Math.floor(g + (255 - g) * intensidade);
            const novoB = Math.floor(b + (255 - b) * intensidade);
    
            cores.push(this.rgbParaHexadecimal(novoR, novoG, novoB));
        }
    
        return cores;
    }

    atualizar(itemEscolhido) {
        this.itemEscolhido = itemEscolhido;
        this.definirInformacoesBasicas()
        this.pedacosCirculos.forEach(pedaco => pedaco.redimensionar()) 
        this.svgCirculo.style.height = this.areaCirculos.getBoundingClientRect().width;
        this.svgCirculo.style.width = this.areaCirculos.getBoundingClientRect().width;
    }

}