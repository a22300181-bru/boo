function createBalloon() {
    const container = document.getElementById('balloon-container');
    if (!container) return; // Seguridad por si el elemento no existe

    const balloon = document.createElement('div');
    balloon.className = 'balloon';

    // Selecciona una imagen aleatoria del 1 al 15
    const imgNumber = Math.floor(Math.random() * 15) + 1;
    balloon.style.backgroundImage = `url('img/${imgNumber}.jpg')`;

    // Posición horizontal aleatoria
    balloon.style.left = Math.random() * 100 + "vw";
    
    // Tamaño y velocidad aleatoria para que se vea natural
    const size = Math.random() * (120 - 70) + 70;
    balloon.style.width = size + "px";
    balloon.style.height = (size * 1.2) + "px";
    balloon.style.animationDuration = Math.random() * (15 - 7) + 7 + "s";

    container.appendChild(balloon);

    // Eliminar el globo después de que termine la animación
    setTimeout(() => {
        balloon.remove();
    }, 15000);
}

// --- INICIO DE LA ANIMACIÓN ---
// Esto hace que se cree un globo cada 800 milisegundos
setInterval(createBalloon, 800);
function descargarPDF() {
    // Clonar texto
    const textoOriginal = document.getElementById('carta-container').innerHTML;
    document.getElementById('pdf-text-clone').innerHTML = textoOriginal;

    const element = document.getElementById('pdf-template');
    element.style.display = 'block'; // Mostrar para la captura

    const opt = {
        margin: 0,
        filename: 'Carta_Boo.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
            scale: 2, 
            useCORS: true,
            width: 750, // Ancho fijo del papel
            windowWidth: 750, // Ignora el ancho del navegador
            x: 0,
            y: 0
        },
        jsPDF: { 
            unit: 'px', 
            format: [750, 1050], 
            orientation: 'portrait',
            hotfixes: ['px_scaling'] 
        }
    };
    html2pdf().set(opt).from(element).save().then(() => {
        element.style.display = 'none'; // Ocultar de nuevo
    });
}