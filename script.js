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
    // 1. Buscamos el contenido original y el contenedor del PDF
    const cartaOriginal = document.getElementById('carta-container');
    const contenedorPDF = document.getElementById('pdf-template');
    const clonTexto = document.getElementById('pdf-text-clone');

    // 2. Copiamos el contenido HTML de la carta original al div del PDF
    clonTexto.innerHTML = cartaOriginal.innerHTML;

    // 3. Mostramos el PDF temporalmente para capturarlo
    contenedorPDF.style.display = 'block';

    const opt = {
        margin: 0,
        filename: 'Carta_Terroncito.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'px', format: [750, 1050], orientation: 'portrait' }
    };

    // 4. Generamos el PDF y luego ocultamos el contenedor de nuevo
    html2pdf().set(opt).from(contenedorPDF).save().then(() => {
        contenedorPDF.style.display = 'none';
        clonTexto.innerHTML = ''; // Limpiamos para que no ocupe memoria
    });
}