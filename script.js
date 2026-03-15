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

// --- FUNCIÓN PARA EL PDF ---
async function descargarPDF() {
    const element = document.getElementById('pdf-template');
    const textoOriginal = document.getElementById('carta-container').innerHTML;
    const clonDestino = document.getElementById('pdf-text-clone');

    // 1. Copiamos el texto al molde del PDF
    clonDestino.innerHTML = textoOriginal;

    // 2. Opciones optimizadas para evitar el PDF en blanco
    const opt = {
        margin: 0,
        filename: 'Carta_Para_Mi_Lady.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            letterRendering: true,
            scrollY: 0,
            scrollX: 0,
            windowWidth: 750 // Forzamos el ancho de renderizado
        },
        jsPDF: { unit: 'px', format: [750, 1050], orientation: 'portrait' }
    };

    // 3. Ejecutar la descarga
    try {
        await html2pdf().set(opt).from(element).save();
    } catch (error) {
        console.error("Error al generar PDF:", error);
    }
}