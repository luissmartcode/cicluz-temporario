import {atualizarCirculos} from './scripts-circulo-correto.js'

export class PedacoCirculo {
    constructor(item, circulo, icone, texto) {
        this.circulo = circulo;
        this.forma = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.conteudo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
        this.grupo = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.item = item;
        this.conteudoId = `${circulo.tipo}-${item}`
        this.icone = icone;
        this.texto = texto;
        this.cor = circulo.cores[0],
        this.tipo = circulo.tipo
        this.itemEscolhido = circulo.itemEscolhido;

    }
        
    getCoordFromDegrees(angle, radius, diametro) {
        const adjustedAngle = angle - 90;

        const x = Math.cos(adjustedAngle * Math.PI / 180);
        const y = Math.sin(adjustedAngle * Math.PI / 180);

        const coordX = x * radius + diametro / 2;
        const coordY = y * radius + diametro / 2;

        return [coordX, coordY];
    }

    definirPropriedadesForma(grauParte = null, grauInicial = null) {
        if(grauParte != null && grauInicial != null) {
            const inicio = this.item * grauParte + grauInicial;
            this.anguloInicial = this.tipo != "memorias" ? inicio - (grauParte/2) : grauParte * this.item;
            this.anguloFinal = this.tipo != "memorias" ? inicio + (grauParte/2) : grauParte * this.item;  
        }    

        this.coordenadasExternas = this.getCoordFromDegrees(this.anguloInicial, this.circulo.raioExterno, this.circulo.areaCirculos.getBoundingClientRect().width);
        this.coordenadasInternas = this.getCoordFromDegrees(this.anguloFinal, this.circulo.raioExterno, this.circulo.areaCirculos.getBoundingClientRect().width);    
        this.ligacaoDireita = this.getCoordFromDegrees(this.anguloFinal, this.circulo.raioInterno, this.circulo.areaCirculos.getBoundingClientRect().width);
        this.ligacaoEsquerda = this.getCoordFromDegrees(this.anguloInicial, this.circulo.raioInterno, this.circulo.areaCirculos.getBoundingClientRect().width);

        this.raioCirculosInternos = this.circulo.raioCirculosCentro
        this.coordenadasInternasCirculo = this.getCoordFromDegrees(this.anguloInicial, this.circulo.raioExterno - this.raioCirculosInternos, this.circulo.areaCirculos.getBoundingClientRect().width);
        if(this.tipo != "memorias") {
        this.d = `M ${this.coordenadasExternas} 
        A ${this.circulo.raioExterno} ${this.circulo.raioExterno} 0 0 1 ${this.coordenadasInternas} 
        L ${this.ligacaoDireita}
        A ${this.circulo.raioInterno} ${this.circulo.raioInterno} 0 0 0 ${this.ligacaoEsquerda}Z`  
        } else {
            this.d=`M ${this.coordenadasInternasCirculo}
           m -${this.raioCirculosInternos}, 0
           a ${this.raioCirculosInternos},${this.raioCirculosInternos} 0 1,0 ${this.raioCirculosInternos*2},0
           a ${this.raioCirculosInternos},${this.raioCirculosInternos} 0 1,0 -${this.raioCirculosInternos*2},0`;          
        }
        this.raioCentroPedaco = (this.circulo.raioExterno + this.circulo.raioInterno) / 2

        
        

    }

    criarLogoCentral(altura) {
        const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        image.setAttributeNS(null, "href", "logo.svg"); 
        image.setAttributeNS(null, 'id', "logo-centro"); 
        return image
    }

    criarCirculoCentral() {
        const grupo = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        var circuloCentro = document.getElementById('circulo-centro')
        const x = (this.circulo.areaCirculos.getBoundingClientRect().width/2);
        const y = (this.circulo.areaCirculos.getBoundingClientRect().height/2);
        if(!circuloCentro) {
            this.circuloCentro = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            this.circuloCentro.setAttribute("id", "circulo-centro")
            this.circuloCentro.setAttribute("cx", x); 
            this.circuloCentro.setAttribute("cy", y); 
            this.circuloCentro.setAttribute("r", this.circulo.raioExternoCentro);  
            grupo.appendChild(this.circuloCentro)  
            grupo.appendChild(this.criarLogoCentral())             
            this.circulo.areaCirculos.firstChild.appendChild(grupo);
            const mouseEnterHandler = (e) => {
                const origem = e.relatedTarget;    
                if (this.circulo.tipo != this.circulo.itemEscolhido) {
                    console.log('a')
                    atualizarCirculos(this.tipo);
                } else {
                    console.log(origem)
                }   
                
            };   
            this.circuloCentro.addEventListener('mouseenter', mouseEnterHandler);
        } else {

            circuloCentro.setAttribute("cx", x); 
            circuloCentro.setAttribute("cy", y); 
            circuloCentro.setAttribute("r", this.circulo.raioExternoCentro);   
            this.circuloCentro = circuloCentro;
        }
    }


    atribuirPropriedadesForma(atribuirItemHtml = null) {
        const elemento = atribuirItemHtml ? atribuirItemHtml : this.forma
        elemento.setAttribute("fill", this.cor);
        elemento.setAttribute("stroke", this.cor);
        elemento.setAttribute("stroke-width", "0.8px");
        elemento.setAttribute("d",this.d); 
    }

    definirPropriedadesConteudo() {
        this.conteudo.classList = "conteudo-texto-circulo"
        this.conteudo.setAttribute('id', this.conteudoId)   
        const div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
        this.conteudo.appendChild(div);
    }

    adicionarConteudo() {
        const div = this.conteudoHtml.firstChild
        div.style.width = "fit-content"
        div.innerHTML = `<i class="bi ${this.icone}"></i><span>${this.texto}</span>`;
        div.classList = "texto-circulo"
    }

    removerConteudo() {
        const div = this.conteudoHtml.firstChild
        div.innerHTML = "";
    }

    definirPropriedadesGrupo() {
        const pontoCentralElemento = `50% 50%`;
        this.grupo.classList = `partes-circulos parte-circulo-${this.tipo} status-${this.itemEscolhido}`
        this.grupo.style.transformOrigin = pontoCentralElemento 
    }

    formarGrupo() {
        this.grupo.appendChild(this.forma)
        this.grupo.appendChild(this.conteudo)
    }
    
    criarElementosHtml() {
        this.conteudoHtml = document.getElementById(this.conteudoId);
        this.grupoHtml = this.conteudoHtml.parentElement
        this.formaHtml = this.grupoHtml.firstChild;
        this.textoCirculo = this.conteudoHtml.firstChild
    }

    adicionarAtributosPosteriores(criarElementos = false) {
        if(criarElementos) {
            this.criarElementosHtml()
        }
        
        const centroPedaco = (this.anguloFinal+this.anguloInicial) / 2
        const [centroItemX, centroItemY] = this.getCoordFromDegrees(centroPedaco, this.raioCentroPedaco, this.circulo.areaCirculos.getBoundingClientRect().width);
        const alturaItemHtml = this.textoCirculo.clientHeight
        const larguraItemHtml =  this.textoCirculo.clientWidth

        this.conteudoHtml.setAttribute("transform", `translate(${centroItemX - (larguraItemHtml / 2)}, ${centroItemY - (alturaItemHtml / 2)})` )
        this.conteudoHtml.setAttribute("width", larguraItemHtml)
        this.conteudoHtml.setAttribute("height", alturaItemHtml)
        if(this.circulo.tipo == "memorias") {
            const logoCentral = document.getElementById('logo-centro')
            logoCentral.setAttribute('height', this.circulo.itemEscolhido == "memorias" ? this.circulo.raioExternoCentro * 0.9 : this.circulo.raioExternoCentro*1.1)
            logoCentral.setAttribute('x', this.circulo.areaCirculos.getBoundingClientRect().width / 2 - logoCentral.getBoundingClientRect().width / 2)
            logoCentral.setAttribute('y', this.circulo.areaCirculos.getBoundingClientRect().height / 2 - logoCentral.getBoundingClientRect().height / 2)
        }

        this.adicionarEventosGrupoHtml()
    }

    adicionarEventosGrupoHtml() {

        const mouseEnterHandler = (e) => {


            const origem = e.relatedTarget;
            if(this.circulo.tipo != this.circulo.itemEscolhido) {
                atualizarCirculos(this.tipo);
                console.log('b')
            }
            

            this.grupoHtml.parentElement.appendChild(this.grupoHtml);
            this.grupoHtml.setAttribute('filter', 'url(#sombra)');
            this.grupoHtml.classList.add("parte-expandida")
        };
    
        const mouseLeaveHandler = (e) => {
            this.grupoHtml.setAttribute('filter', '');
            this.grupoHtml.classList.remove("parte-expandida")
            const destino = e.relatedTarget;

            if (destino && destino.nodeName === 'svg' || destino.nodeName === 'div' ) {
                atualizarCirculos('padrao');
            }
        };
    
        this.grupoHtml.removeEventListener('mouseenter', this.mouseEnterHandler);
        this.grupoHtml.removeEventListener('mouseleave', this.mouseLeaveHandler);
    
        this.grupoHtml.addEventListener('mouseenter', mouseEnterHandler);
        this.grupoHtml.addEventListener('mouseleave', mouseLeaveHandler);

        this.mouseEnterHandler = mouseEnterHandler;
        this.mouseLeaveHandler = mouseLeaveHandler;
    }

    criarPedaco(grauParte, grauInicial) {
        this.definirPropriedadesForma(grauParte, grauInicial);
        if(this.circulo.tipo == "memorias") {
            this.criarCirculoCentral();
        }
        this.atribuirPropriedadesForma()
        this.definirPropriedadesConteudo();
        this.definirPropriedadesGrupo()
        this.formarGrupo();
    }

    redimensionar() {
        if(this.circulo.tipo == this.circulo.itemEscolhido) {
            this.adicionarConteudo();
        } else {
            this.removerConteudo()
        }
        this.definirPropriedadesForma()
        if(this.circulo.tipo == "memorias") {
            this.criarCirculoCentral()
        }


        this.definirPropriedadesGrupo()
        const cor = this.circulo.itemEscolhido == this.circulo.tipo ? this.circulo.cores[this.item] : this.cor
        this.formaHtml.setAttribute("fill", cor);
        this.formaHtml.setAttribute("stroke", cor);
        this.formaHtml.setAttribute("stroke-width", "0.8px");
        this.formaHtml.setAttribute("d",this.d);  
        this.adicionarAtributosPosteriores()
    }
    
}








