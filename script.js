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

    // 1. Inyectamos el texto
    clonDestino.innerHTML = textoOriginal;

    // 2. Quitamos la transparencia un momento para que la librería lo vea al 100%
    element.style.opacity = "1";

    const opt = {
        margin: 0,
        filename: 'Carta_Para_Mi_Lady.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            letterRendering: true,
            // Importante: forzar que capture desde el inicio de la página
            scrollY: 0,
            scrollX: 0
        },
        jsPDF: { unit: 'px', format: [750, 1050], orientation: 'portrait' }
    };

    try {
        // 3. Esperamos un suspiro para que el navegador procese el cambio de opacity
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 4. Generamos y guardamos
        await html2pdf().set(opt).from(element).save();
    } catch (error) {
        console.error("Error al generar PDF:", error);
        alert("Hubo un error al generar el PDF, intenta de nuevo.");
    } finally {
        // 5. Lo volvemos a hacer invisible
        element.style.opacity = "0";
    }
}