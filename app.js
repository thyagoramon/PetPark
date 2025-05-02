const container = document.getElementById("carrossel-container");
const btnVoltar = document.getElementById("voltar");
const btnAvancar = document.getElementById("avancar");
const lista = document.querySelector('.carrossel-lista');
const itens = document.querySelectorAll('.carrossel-item');
const larguraItem = itens[0].offsetWidth; //pega a largura de um item do carrossel
const scrollPorClique = larguraItem; //define quantos itens avançam por clique

//avançar
btnAvancar.addEventListener("click", () => {
    const posicaoMaxima = lista.scrollWidth - lista.clientWidth;
        //lista.scrollWidth: largura total do conteúdo do carrossel (incluindo o que está fora da tela).
        //lista.clientWidth: largura visível do carrossel.

    if (lista.scrollLeft + 5 >= posicaoMaxima) {
            //lista.scrollLeft: posição atual da rolagem.
        lista.scrollLeft = 0; //volta para o inicio se tá no fim
    } else {
        lista.scrollLeft += scrollPorClique;
    }
});

//voltar
btnVoltar.addEventListener("click", () => {
    if (lista.scrollLeft <= 0) {
        lista.scrollLeft = lista.scrollWidth; //vai para o final se tá no começo
    } else {
        lista.scrollLeft -= scrollPorClique;
    }
});

//autoplay
let autoplay;
let intervalo = 3000; //intervalo do autoplay em ms

function iniciarAutoplay() {
    autoplay = setInterval(() => {
        const posicaoMaxima = lista.scrollWidth - lista.clientWidth;
        if (lista.scrollLeft + 5 >= posicaoMaxima) {
            lista.scrollLeft = 0;
        } else {
            lista.scrollLeft += scrollPorClique;
        }    
    }, intervalo);
}

function pararAutoplay() {
    clearInterval(autoplay);
    autoplay = null; //pausa sem reiniciar
}

iniciarAutoplay(); //inicia o autoplay

//pausar ao posicionar o mouse sobre
container.addEventListener("mouseenter", pararAutoplay);

//continuar ao remover o mouse
container.addEventListener("mouseleave", () => {
    if (!autoplay) iniciarAutoplay();
});

//menu suspenso no mobile
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", function (e) {
    e.preventDefault(); //evita que o link recarregue a página

    //verifica se o menu já está aberto
    const isOpen = mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== "0px";

    if (isOpen) {
        mobileMenu.style.maxHeight = "0px";
        menuToggle.style.transform = "rotate(0deg)";
    } else {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
        menuToggle.style.transform = "rotate(90deg)";
    }
})