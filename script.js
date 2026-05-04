// 1. CANON BÍBLICO COMPLETO (Estructura Católica Tradicional)
// =============================================================
const canonBiblico = {
    "Antiguo Testamento": [
        // PENTATEUCO
        { nombre: "Génesis", caps: 50 },
        { nombre: "Éxodo", caps: 40 },
        { nombre: "Levítico", caps: 27 },
        { nombre: "Números", caps: 36 },
        { nombre: "Deuteronomio", caps: 34 },
        
        // HISTÓRICOS
        { nombre: "Josué", caps: 24 },
        { nombre: "Jueces", caps: 21 },
        { nombre: "Rut", caps: 4 },
        { nombre: "Primer Libro de Samuel", caps: 31 },
        { nombre: "Segundo Libro de Samuel", caps: 24 },
        { nombre: "Primer Libro de los Reyes", caps: 22 },
        { nombre: "Segundo Libro de los Reyes", caps: 25 },
        { nombre: "Primer Libro de las Crónicas", caps: 29 },
        { nombre: "Segundo Libro de las Crónicas", caps: 36 },
        { nombre: "Esdras", caps: 10 },
        { nombre: "Nehemías", caps: 13 },
        { nombre: "Tobías", caps: 14 },
        { nombre: "Judit", caps: 16 },
        { nombre: "Ester", caps: 10 },
        { nombre: "Ester (Suplementos Griegos)", caps: [1, 3, 4, 5, 8, 10] },
        { nombre: "Primer Libro de los Macabeos", caps: 16 },
        { nombre: "Segundo Libro de los Macabeos", caps: 15 },
        
        // SAPIENCIALES Y POÉTICOS
        { nombre: "Job", caps: 42 },
        { nombre: "Salmos", caps: 150 },
        { nombre: "Proverbios", caps: 31 },
        { nombre: "Eclesiastés", caps: 12 },
        { nombre: "Cantar de los Cantares", caps: 8 },
        { nombre: "Sabiduría", caps: 19 },
        { nombre: "Eclesiástico", caps: 51 },
        
        // PROFÉTICOS (Mayores y Menores)
        { nombre: "Isaías", caps: 66 },
        { nombre: "Jeremías", caps: 52 },
        { nombre: "Lamentaciones", caps: 5 },
        { nombre: "Baruc", caps: 5 },
        { nombre: "Carta de Jeremías", caps: 1 },
        { nombre: "Ezequiel", caps: 48 },
        { nombre: "Daniel", caps: 12 },
        { nombre: "Daniel (Suplementos Griegos)", caps: [3, 13, 14] },
        { nombre: "Oseas", caps: 14 },
        { nombre: "Joel", caps: 4 },
        { nombre: "Amos", caps: 9 },
        { nombre: "Abdías", caps: 1 },
        { nombre: "Jonás", caps: 4 },
        { nombre: "Miqueas", caps: 7 },
        { nombre: "Nahúm", caps: 3 },
        { nombre: "Habacuc", caps: 3 },
        { nombre: "Sofonías", caps: 3 },
        { nombre: "Ageo", caps: 2 },
        { nombre: "Zacarías", caps: 14 },
        { nombre: "Malaquías", caps: 3 }
    ],
    "Nuevo Testamento": [
        { nombre: "Evangelio según San Mateo", caps: 28 },
        { nombre: "Evangelio según San Marcos", caps: 16 },
        { nombre: "Evangelio según San Lucas", caps: 24 },
        { nombre: "Evangelio según San Juan", caps: 21 },
        { nombre: "Hechos de los Apóstoles", caps: 28 },
        { nombre: "Carta a los Romanos", caps: 16 },
        { nombre: "Primera Carta a los Corintios", caps: 16 },
        { nombre: "Segunda Carta a los Corintios", caps: 13 },
        { nombre: "Carta a los Gálatas", caps: 6 },
        { nombre: "Carta a los Efesios", caps: 6 },
        { nombre: "Carta a los Filipenses", caps: 4 },
        { nombre: "Carta a los Colosenses", caps: 4 },
        { nombre: "Primera Carta a los Tesalonicenses", caps: 5 },
        { nombre: "Segunda Carta a los Tesalonicenses", caps: 3 },
        { nombre: "Primera Carta a Timoteo", caps: 6 },
        { nombre: "Segunda Carta a Timoteo", caps: 4 },
        { nombre: "Carta a Tito", caps: 3 },
        { nombre: "Carta a Filemón", caps: 1 },
        { nombre: "Carta a los Hebreos", caps: 13 },
        { nombre: "Carta de Santiago", caps: 5 },
        { nombre: "Primera Carta de San Pedro", caps: 5 },
        { nombre: "Segunda Carta de San Pedro", caps: 3 },
        { nombre: "Primera Carta de San Juan", caps: 5 },
        { nombre: "Segunda Carta de San Juan", caps: 1 },
        { nombre: "Tercera Carta de San Juan", caps: 1 },
        { nombre: "Carta de San Judas", caps: 1 },
        { nombre: "Apocalipsis", caps: 22 }
    ]
};

const ORDEN_LIBROS_BIBLICOS = (() => {
    const orden = new Map();
    let indice = 0;

    for (const testamento of Object.values(canonBiblico)) {
        for (const libro of testamento) {
            orden.set(libro.nombre, indice++);
        }
    }

    return orden;
})();

function inicializarIndiceV2() {
    const contenedor = document.getElementById('contenedor-libros');
    if (!contenedor) return;

    contenedor.innerHTML = '';
    for (const [testamento, libros] of Object.entries(canonBiblico)) {
        const divTestamento = document.createElement('div');
        divTestamento.className = 'flex flex-col items-center w-full';
        const progresoTestamento = obtenerProgresoTestamento(testamento);
        divTestamento.innerHTML = `
            <h3 class="text-xl font-bold mb-3 text-oro font-sans uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-2 w-full text-center mx-auto">${testamento}</h3>
            <div class="progreso-testamento-vista mb-4 rounded-2xl p-4 w-full" data-progreso-testamento="${sanearIdDom(testamento)}">
            <div class="flex items-center justify-between gap-3 mb-2">
                <span class="text-[11px] uppercase tracking-wider font-sans font-bold text-gray-500 dark:text-gray-400">Progreso del testamento</span>
                <span class="texto-progreso-testamento text-xs font-sans font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                    <span data-progreso-texto-testamento>${progresoTestamento.leidos}/${progresoTestamento.total}</span>
                </span>
            </div>
                <div class="relative w-full pt-6">
                    <div class="w-full h-2 rounded-full overflow-hidden bg-black/10 dark:bg-white/10">
                        <div data-progreso-barra-testamento class="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300" style="width: ${progresoTestamento.porcentaje}%"></div>
                    </div>
                    <div data-progreso-burbuja-testamento class="progreso-burbuja" style="left: ${limitarPorcentajeBurbuja(progresoTestamento.porcentaje)}%">${progresoTestamento.porcentaje}%</div>
                </div>
            </div>`;

        const gridLibros = document.createElement('div');
        gridLibros.className = 'grid grid-cols-2 gap-2 w-full';

        libros.forEach(libro => {
            const fila = document.createElement('div');
            const libroLeido = estaLibroLeido(libro.nombre);
            fila.className = 'flex items-stretch gap-2';
            fila.innerHTML = `
                <button type="button"
                    class="btn-libro-principal flex-1 flex items-center gap-3 text-left py-2 px-3 rounded text-lg transition-all hover:bg-yellow-50 dark:hover:bg-gray-800 hover:text-oro hover:border-l-4 hover:border-oro bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm ${libroLeido ? 'libro-leido' : ''}"
                    data-libro-principal="${libro.nombre}"
                    title="${libroLeido ? `${libro.nombre} (leído)` : libro.nombre}"
                    aria-label="${libroLeido ? `${libro.nombre}, libro leído` : `${libro.nombre}, libro no leído`}">
                    <span>${libro.nombre}</span>
                </button>
            `;
            fila.querySelector('.btn-libro-principal').onclick = () => abrirCapitulos(libro.nombre, libro.caps);
            gridLibros.appendChild(fila);
        });

        divTestamento.appendChild(gridLibros);
        contenedor.appendChild(divTestamento);
    }

    actualizarBotonesReproduccionListas();
    actualizarBotonesLeidoLibros();
    actualizarProgresoTestamentosVista();
    actualizarProgresoBibliaVista();
}

function abrirCapitulosV2(nombreLibro, cantidadCapitulos) {
    libroActual = nombreLibro;
    const titulo = document.getElementById('titulo-libro-capitulos');
    if (titulo) titulo.innerText = nombreLibro;

    const contenedor = document.getElementById('contenedor-capitulos');
    if (!contenedor) return;

    contenedor.innerHTML = '';
    const evangelios = ['Evangelio según San Mateo', 'Evangelio según San Marcos', 'Evangelio según San Lucas', 'Evangelio según San Juan'];

    if (evangelios.includes(nombreLibro)) {
        const prefacioBtn = document.createElement('button');
        prefacioBtn.textContent = '📜 Prefacio';
        prefacioBtn.className = 'prefacio-btn col-span-full py-3 rounded-xl shadow-sm transition-all font-sans font-bold text-base flex items-center justify-center gap-2';
        prefacioBtn.onclick = () => abrirPrefacio(nombreLibro);
        contenedor.appendChild(prefacioBtn);
    }

    const libroLeido = estaLibroLeido(nombreLibro);
    const barraLibro = document.createElement('div');
    barraLibro.className = 'col-span-full flex justify-center mb-2';
    barraLibro.innerHTML = `
        <button type="button"
                id="btn-leido-libro-vista"
                class="btn-leido-capitulo-vista inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-900 text-gray-200 font-sans font-bold text-sm transition hover:scale-[1.02]"
                onclick="event.stopPropagation(); toggleLeidoLibro('${nombreLibro}'); return false;"
                title="${libroLeido ? 'Marcar como no leído' : 'Marcar como leído'}"
                aria-label="${libroLeido ? 'Marcar como no leído' : 'Marcar como leído'}"
                aria-pressed="${libroLeido ? 'true' : 'false'}">
            <i class="fas ${libroLeido ? 'fa-check-circle' : 'fa-circle'} icono-leido"></i>
            <span class="texto-leido-libro">${libroLeido ? 'LIBRO LEÍDO' : 'LIBRO NO LEÍDO'}</span>
        </button>
    `;
    contenedor.appendChild(barraLibro);

    const progresoLibro = obtenerProgresoLibro(nombreLibro);
    const bloqueProgresoLibro = document.createElement('div');
    bloqueProgresoLibro.id = 'progreso-libro-vista';
    bloqueProgresoLibro.className = 'progreso-libro-capitulos col-span-full mb-5';
    bloqueProgresoLibro.innerHTML = `
        <div class="progreso-libro-shell">
            <div class="progreso-libro-head">
                <div class="progreso-libro-title-wrap">
                    <span class="progreso-libro-icono" aria-hidden="true">
                        <i class="fas fa-book-open"></i>
                    </span>
                    <div class="progreso-libro-copy">
                        <span class="progreso-libro-kicker">Camino del libro</span>
                        <strong class="progreso-libro-title">Progreso de lectura</strong>
                    </div>
                </div>
                <div class="progreso-libro-resumen">
                    <span class="progreso-libro-resumen-label">Capítulos completados</span>
                    <span class="texto-progreso-capitulo progreso-libro-resumen-valor">
                        <span data-progreso-texto-libro>${progresoLibro.leidos}/${progresoLibro.total}</span>
                    </span>
                </div>
            </div>
            <div class="progreso-libro-track-wrap">
                <div class="progreso-libro-track"
                     data-progreso-track-libro
                     role="progressbar"
                     aria-label="Progreso del libro"
                     aria-valuemin="0"
                     aria-valuemax="100"
                     aria-valuenow="${progresoLibro.porcentaje}">
                    <div data-progreso-barra-libro class="progreso-libro-fill ${claseBarraProgresoBiblioteca()}" style="width: ${progresoLibro.porcentaje}%"></div>
                </div>
                <div data-progreso-burbuja-libro class="progreso-burbuja progreso-burbuja-libro" style="left: ${limitarPorcentajeBurbuja(progresoLibro.porcentaje)}%">${progresoLibro.porcentaje}%</div>
            </div>
            <div class="progreso-libro-leyenda" aria-hidden="true">
                <span>Inicio</span>
                <span>Libro completo</span>
            </div>
        </div>
    `;
    contenedor.appendChild(bloqueProgresoLibro);

    const listaCaps = obtenerListaCapitulos(nombreLibro);
    for (const cap of listaCaps) {
        const capituloLeido = estaCapituloLeido(nombreLibro, cap);
        const fila = document.createElement('div');
        fila.className = 'col-span-full flex items-stretch gap-2';
        fila.innerHTML = `
            <button type="button" data-capitulo-principal="${cap}" class="btn-capitulo-principal flex-1 py-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-oro hover:text-oro transition-all font-sans font-bold text-base flex items-center justify-between px-3 group">
                <span>${cap}</span>
                <span class="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 group-hover:text-oro transition-colors">Abrir</span>
            </button>
            <button type="button"
                    class="btn-reproducir-capitulo w-12 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-oro hover:border-oro transition-all flex items-center justify-center"
                    data-tipo-reproduccion="capitulo"
                    data-libro="${nombreLibro.replace(/"/g, '&quot;')}"
                    data-capitulo="${cap}"
                    title="Escuchar todo el capítulo"
                    aria-label="Escuchar todo el capítulo ${cap}">
                <i class="fas fa-volume-up text-sm"></i>
            </button>
            <button type="button"
                    id="leido_capitulo_${sanearIdDom(nombreLibro)}_${cap}"
                    class="btn-leido-capitulo w-12 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all flex items-center justify-center ${capituloLeido ? 'activo text-emerald-600 dark:text-emerald-400' : ''}"
                    data-tipo-leido="capitulo"
                    data-libro="${nombreLibro.replace(/"/g, '&quot;')}"
                    data-capitulo="${cap}"
                    onclick="event.stopPropagation(); toggleLeidoCapitulo('${nombreLibro}', ${cap}); return false;"
                    title="${capituloLeido ? 'Marcar como no leído' : 'Marcar como leído'}"
                    aria-label="${capituloLeido ? 'Marcar como no leído' : 'Marcar como leído'} ${cap}"
                    aria-pressed="${capituloLeido ? 'true' : 'false'}">
                <i class="fas ${capituloLeido ? 'fa-check-circle' : 'fa-circle'} icono-leido text-sm"></i>
            </button>
        `;
        fila.querySelector('.btn-capitulo-principal').onclick = () => abrirLectura(cap);
        fila.querySelector('.btn-reproducir-capitulo').onclick = e => {
            e.stopPropagation();
            leerCapituloEspecifico(cap);
        };
        contenedor.appendChild(fila);
    }

    actualizarBotonesReproduccionListas();
    actualizarBotonesLeidoLibros();
    actualizarProgresoLibroVista();
    mostrarVista('vista-capitulos');
}

// --------------------------------------------------------------
// 2. MAPA DE NOMBRES (Diccionario Exacto del Vaticano a Lumina)
// --------------------------------------------------------------
const mapaNombres = {
    "GENESIS": "Génesis",
    "EXODO": "Éxodo",
    "LEVITICO": "Levítico",
    "NUMEROS": "Números",
    "DEUTERONOMIO": "Deuteronomio",
    "JOSUE": "Josué",
    "JUECES": "Jueces",
    "PRIMER LIBRO DE SAMUEL": "Primer Libro de Samuel",
    "SEGUNDO LIBRO DE SAMUEL": "Segundo Libro de Samuel",
    "PRIMER LIBRO DE LOS REYES": "Primer Libro de los Reyes",
    "SEGUNDO LIBRO DE LOS REYES": "Segundo Libro de los Reyes",
    "PRIMER LIBRO DE LAS CRONICAS": "Primer Libro de las Crónicas",
    "SEGUNDO LIBRO DE LAS CRONICAS": "Segundo Libro de las Crónicas",
    "ESDRAS": "Esdras",
    "NEHEMIAS": "Nehemías",
    "TOBIAS": "Tobías",
    "JUDIT": "Judit",
    "ESTER": "Ester",
    "PRIMER LIBRO DE LOS MACABEOS": "Primer Libro de los Macabeos",
    "SEGUNDO LIBRO DE LOS MACABEOS": "Segundo Libro de los Macabeos",
    "JOB": "Job",
    "SALMOS": "Salmos",
    "PROVERBIOS": "Proverbios",
    "RUT": "Rut",
    "ECLESIASTES": "Eclesiastés",
    "CANTAR DE LOS CANTARES": "Cantar de los Cantares",
    "SABIDURIA": "Sabiduría",
    "ECLESIASTICO": "Eclesiástico",
    "ISAIAS": "Isaías",
    "JEREMIAS": "Jeremías",
    "LAMENTACIONES": "Lamentaciones",
    "BARUC": "Baruc",
    "EZEQUIEL": "Ezequiel",
    "DANIEL": "Daniel",
    "OSEAS": "Oseas",
    "JOEL": "Joel",
    "AMOS": "Amos",
    "ABDIAS": "Abdías",
    "JONAS": "Jonás",
    "MIQUEAS": "Miqueas",
    "NAHUM": "Nahúm",
    "HABACUC": "Habacuc",
    "SOFONIAS": "Sofonías",
    "AGEO": "Ageo",
    "ZACARIAS": "Zacarías",
    "MALAQUIAS": "Malaquías",
    "ESTER SUPLEMENTOS GRIEGOS": "Ester (Suplementos Griegos)",
    "DANIEL SUPLEMENTOS GRIEGOS": "Daniel (Suplementos Griegos)",
    "CARTA DE JEREMIAS": "Carta de Jeremías",
    "EVANGELIO SEGUN SAN MATEO": "Evangelio según San Mateo",
    "EVANGELIO SEGUN SAN MARCOS": "Evangelio según San Marcos",
    "EVANGELIO SEGUN SAN LUCAS": "Evangelio según San Lucas",
    "EVANGELIO SEGUN SAN JUAN": "Evangelio según San Juan",
    "HECHOS DE LOS APOSTOLES": "Hechos de los Apóstoles",
    "CARTA A LOS ROMANOS": "Carta a los Romanos",
    "PRIMERA CARTA A LOS CORINTIOS": "Primera Carta a los Corintios",
    "SEGUNDA CARTA A LOS CORINTIOS": "Segunda Carta a los Corintios",
    "CARTA A LOS GALATAS": "Carta a los Gálatas",
    "CARTA A LOS EFESIOS": "Carta a los Efesios",
    "CARTA A LOS FILIPENSES": "Carta a los Filipenses",
    "CARTA A LOS COLOSENSES": "Carta a los Colosenses",
    "PRIMERA CARTA A LOS TESALONICENSES": "Primera Carta a los Tesalonicenses",
    "SEGUNDA CARTA A LOS TESALONICENSES": "Segunda Carta a los Tesalonicenses",
    "PRIMERA CARTA A TIMOTEO": "Primera Carta a Timoteo",
    "SEGUNDA CARTA A TIMOTEO": "Segunda Carta a Timoteo",
    "CARTA A TITO": "Carta a Tito",
    "CARTA A FILEMON": "Carta a Filemón",
    "CARTA A LOS HEBREOS": "Carta a los Hebreos",
    "CARTA DE SANTIAGO": "Carta de Santiago",
    "PRIMERA CARTA DE SAN PEDRO": "Primera Carta de San Pedro",
    "SEGUNDA CARTA DE SAN PEDRO": "Segunda Carta de San Pedro",
    "PRIMERA CARTA DE SAN JUAN": "Primera Carta de San Juan",
    "SEGUNDA CARTA DE SAN JUAN": "Segunda Carta de San Juan",
    "TERCERA CARTA DE SAN JUAN": "Tercera Carta de San Juan",
    "CARTA DE SAN JUDAS": "Carta de San Judas",
    "APOCALIPSIS": "Apocalipsis"
};


const MENSAJES_LIBROS = {
    "Génesis": { mensaje: "¡Vio Dios que era bueno! Has recorrido el origen de toda la creación.", referencia: "Gn 1, 31" },
    "Éxodo": { mensaje: "Has cruzado el desierto. ¡La Libertad te espera en la Tierra Prometida!", referencia: "Ex 14, 30" },
    "Levítico": { mensaje: "Has profundizado en la Ley. 'Sean santos, porque Yo soy Santo'.", referencia: "Lv 19, 2" },
    "Números": { mensaje: "Has atravesado la aridez del desierto confiando en la providencia divina.", referencia: "Nm 14, 14" },
    "Deuteronomio": { mensaje: "Escucha, Israel. Has renovado la Alianza de amor con tu Dios.", referencia: "Dt 6, 4" },
    "Josué": { mensaje: "¡Fuerte y valiente! Has conquistado la tierra de la promesa.", referencia: "Jos 1, 9" },
    "Jueces": { mensaje: "En medio del caos, has visto cómo el Señor siempre suscita libertadores.", referencia: "Jue 2, 16" },
    "Primer Libro de Samuel": { mensaje: "Habla, Señor, que tu siervo escucha. El inicio del reino de Israel.", referencia: "1 S 3, 9" },
    "Segundo Libro de Samuel": { mensaje: "Has contemplado la promesa de un trono eterno para la casa de David.", referencia: "2 S 7, 16" },
    "Primer Libro de los Reyes": { mensaje: "La sabiduría y el Templo. Has visto la gloria y la fragilidad del reino.", referencia: "1 R 8, 20" },
    "Segundo Libro de los Reyes": { mensaje: "Hasta el exilio. Un recordatorio de que solo en Dios hay verdadera seguridad.", referencia: "2 R 17, 39" },
    "Isaías": { mensaje: "El profeta del Emmanuel. Has vislumbrado al Siervo Sufriente que nos salva.", referencia: "Is 7, 14" },
    "Jeremías": { mensaje: "Seducido por el Señor. Has sentido el fuego ardiente de la profecía en tus huesos.", referencia: "Jr 20, 9" },
    "Ezequiel": { mensaje: "¡Infundiré mi espíritu en ustedes! Has visto los huesos secos volver a la vida.", referencia: "Ez 37, 14" },
    "Oseas": { mensaje: "Un amor inquebrantable. Has comprendido la ternura de un Dios esposo.", referencia: "Os 2, 21" },
    "Joel": { mensaje: "¡Derramaré mi Espíritu sobre toda carne! Un llamado vibrante al arrepentimiento.", referencia: "Jl 3, 1" },
    "Amos": { mensaje: "Que fluya el derecho como agua. Un grito por la justicia social y divina.", referencia: "Am 5, 24" },
    "Abdías": { mensaje: "El orgullo derribado y la realeza del Señor restaurada.", referencia: "Ab 1, 21" },
    "Jonás": { mensaje: "La inmensa misericordia de Dios, que abraza incluso a los que consideramos enemigos.", referencia: "Jon 4, 11" },
    "Miqueas": { mensaje: "Has descubierto qué exige el Señor: practicar la justicia y amar la bondad.", referencia: "Mi 6, 8" },
    "Nahúm": { mensaje: "El Señor es un refugio seguro en el día de la angustia.", referencia: "Na 1, 7" },
    "Habacuc": { mensaje: "El justo vivirá por su fidelidad. Has aprendido a esperar en medio de la prueba.", referencia: "Ha 2, 4" },
    "Sofonías": { mensaje: "El Señor se alegrará en ti con cantos de júbilo.", referencia: "So 3, 17" },
    "Ageo": { mensaje: "¡Manos a la obra! Has participado en la reconstrucción de la casa del Señor.", referencia: "Ag 2, 4" },
    "Zacarías": { mensaje: "¡Alégrate, hija de Sión! Tu rey viene a ti, humilde y montado en un asno.", referencia: "Za 9, 9" },
    "Malaquías": { mensaje: "Brillará el sol de justicia. Has preparado el camino para el mensajero.", referencia: "Ml 3, 20" },
    "Salmos": { mensaje: "Tu corazón ha vibrado con todas las cuerdas del arpa de David. ¡Alabado sea el Señor!", referencia: "Sal 150" },
    "Job": { mensaje: "El misterio del sufrimiento iluminado por la majestad incomprensible de Dios.", referencia: "Jb 42, 2" },
    "Proverbios": { mensaje: "El principio de la sabiduría es el temor del Señor. Has acumulado tesoros para el alma.", referencia: "Pr 1, 7" },
    "Rut": { mensaje: "Donde tú vayas, yo iré. Has presenciado la providencia en lo cotidiano y la lealtad perfecta.", referencia: "Rt 1, 16" },
    "Cantar de los Cantares": { mensaje: "Grábame como un sello en tu corazón. El amor humano como reflejo del divino.", referencia: "Cnt 8, 6" },
    "Eclesiastés": { mensaje: "Todo es vanidad, excepto temer a Dios y guardar sus mandamientos.", referencia: "Qo 12, 13" },
    "Lamentaciones": { mensaje: "La misericordia del Señor no termina, se renueva cada mañana.", referencia: "Lm 3, 22-23" },
    "Ester": { mensaje: "Para un momento como este has llegado. Dios actúa providencialmente en la historia.", referencia: "Est 4, 14" },
    "Daniel": { mensaje: "El Dios del cielo levantará un reino que jamás será destruido.", referencia: "Dn 2, 44" },
    "Primer Libro de las Crónicas": { mensaje: "La liturgia y el canto. Has repasado la historia desde la adoración al Señor.", referencia: "1 Cr 16, 23" },
    "Segundo Libro de las Crónicas": { mensaje: "Si mi pueblo se humilla y ora, yo perdonaré su pecado.", referencia: "2 Cr 7, 14" },
    "Esdras": { mensaje: "La reconstrucción de la fe y el regreso a la Palabra después del destierro.", referencia: "Esd 7, 10" },
    "Nehemías": { mensaje: "El gozo del Señor es nuestra fortaleza. Has levantado los muros de la ciudad santa.", referencia: "Ne 8, 10" },
    "Ester (Suplementos Griegos)": { mensaje: "Señor, no tenemos otro socorro fuera de ti. La oración confiadísima de la reina.", referencia: "Est (gr) 14, 3" },
    "Judit": { mensaje: "El Señor ha herido al enemigo por mano de una mujer. Una fe valiente.", referencia: "Jdt 13, 15" },
    "Tobías": { mensaje: "Dios es quien nos guía. Has caminado junto al arcángel Rafael en esta hermosa historia.", referencia: "Tb 12, 18" },
    "Primer Libro de los Macabeos": { mensaje: "Celo por la Ley y el Templo. La resistencia heroica por la fe de los padres.", referencia: "1 Mac 2, 27" },
    "Segundo Libro de los Macabeos": { mensaje: "La esperanza invencible en la resurrección de los muertos y la oración por los difuntos.", referencia: "2 Mac 7, 9" },
    "Sabiduría": { mensaje: "Las almas de los justos están en las manos de Dios. Un puente perfecto entre fe y razón.", referencia: "Sb 3, 1" },
    "Eclesiástico": { mensaje: "Toda sabiduría viene del Señor. Consejos eternos para la vida práctica.", referencia: "Si 1, 1" },
    "Baruc": { mensaje: "Vuelve a la fuente de la Sabiduría. Un llamado luminoso a la conversión y la esperanza.", referencia: "Ba 3, 12" },
    "Carta de Jeremías": { mensaje: "Los ídolos no son nada. Un recordatorio para adorar solo al Dios verdadero.", referencia: "C. Jr 6, 6" },
    "Daniel (Suplementos Griegos)": { mensaje: "¡Obras del Señor, bendigan al Señor! Has cantado en el horno y visto a Dios salvar a la inocente.", referencia: "Dn (gr) 3, 57" },
    "Evangelio según San Mateo": { mensaje: "Has caminado con la Verdad. Ahora, ¡vayan y anuncien la Buena Noticia!", referencia: "Mc 16, 15" },
    "Evangelio según San Marcos": { mensaje: "Has caminado con la Verdad. Ahora, ¡vayan y anuncien la Buena Noticia!", referencia: "Mc 16, 15" },
    "Evangelio según San Lucas": { mensaje: "Has caminado con la Verdad. Ahora, ¡vayan y anuncien la Buena Noticia!", referencia: "Mc 16, 15" },
    "Evangelio según San Juan": { mensaje: "Has caminado con la Verdad. Ahora, ¡vayan y anuncien la Buena Noticia!", referencia: "Mc 16, 15" },
    "Los Cuatro Evangelios": { mensaje: "Has caminado con la Verdad. Ahora, ¡vayan y anuncien la Buena Noticia!", referencia: "Mc 16, 15" },
    "Hechos de los Apóstoles": { mensaje: "Has recibido la fuerza del Espíritu Santo para ser testigo hasta los confines de la tierra.", referencia: "Hch 1, 8" },
    "Carta a los Romanos": { mensaje: "Justificados por la fe y el amor de Dios derramado en nuestros corazones. Una cumbre teológica.", referencia: "Rm 5, 5" },
    "Primera Carta a los Corintios": { mensaje: "El amor nunca pasará. Has comprendido que sin caridad, no somos nada.", referencia: "1 Co 13, 8" },
    "Segunda Carta a los Corintios": { mensaje: "Te basta mi gracia. En la debilidad, se manifiesta la fuerza de Cristo.", referencia: "2 Co 12, 9" },
    "Carta a los Gálatas": { mensaje: "Cristo nos liberó para ser libres. Una defensa apasionada del Evangelio de la gracia.", referencia: "Ga 5, 1" },
    "Carta a los Efesios": { mensaje: "Un solo Señor, una sola fe. Has contemplado el misterio profundo de la Iglesia.", referencia: "Ef 4, 5" },
    "Carta a los Filipenses": { mensaje: "¡Alégrense siempre en el Señor! Has aprendido a tener los mismos sentimientos de Cristo.", referencia: "Flp 4, 4" },
    "Carta a los Colosenses": { mensaje: "Él es la imagen del Dios invisible. En Cristo habitan todos los tesoros de la sabiduría.", referencia: "Col 1, 15" },
    "Primera Carta a los Tesalonicenses": { mensaje: "Vivan siempre alegres y oren sin cesar mientras esperan al Señor.", referencia: "1 Ts 5, 16-17" },
    "Segunda Carta a los Tesalonicenses": { mensaje: "Manténganse firmes y conserven las tradiciones que les hemos enseñado.", referencia: "2 Ts 2, 15" },
    "Primera Carta a Timoteo": { mensaje: "Combate el buen combate de la fe. Instrucciones esenciales para pastorear.", referencia: "1 Tm 6, 12" },
    "Segunda Carta a Timoteo": { mensaje: "He combatido el buen combate, he terminado la carrera, he conservado la fe.", referencia: "2 Tm 4, 7" },
    "Carta a Tito": { mensaje: "La gracia de Dios se ha manifestado para salvarnos. Un llamado a vivir con sobriedad y justicia.", referencia: "Tit 2, 11" },
    "Carta a Filemón": { mensaje: "Ya no como esclavo, sino como un hermano muy querido. El poder transformador del perdón.", referencia: "Flm 1, 16" },
    "Carta a los Hebreos": { mensaje: "Cristo, Sumo Sacerdote eterno. Mantengamos firme la confesión de nuestra esperanza.", referencia: "Hb 4, 14" },
    "Carta de Santiago": { mensaje: "La fe sin obras está muerta. Un impulso para llevar la Palabra a la acción concreta.", referencia: "St 2, 26" },
    "Primera Carta de San Pedro": { mensaje: "Son una raza elegida, un sacerdocio real. Firmes en la fe frente a las pruebas.", referencia: "1 P 2, 9" },
    "Segunda Carta de San Pedro": { mensaje: "Esperamos cielos nuevos y una tierra nueva donde habite la justicia.", referencia: "2 P 3, 13" },
    "Primera Carta de San Juan": { mensaje: "Dios es amor. Quien permanece en el amor, permanece en Dios.", referencia: "1 Jn 4, 16" },
    "Segunda Carta de San Juan": { mensaje: "Que nos amemos unos a otros, caminando según sus mandamientos.", referencia: "2 Jn 1, 6" },
    "Tercera Carta de San Juan": { mensaje: "No hay mayor alegría que saber que mis hijos caminan en la verdad.", referencia: "3 Jn 1, 4" },
    "Carta de San Judas": { mensaje: "Edifíquense sobre los cimientos de su santísima fe, orando en el Espíritu Santo.", referencia: "Jud 1, 20" },
    "Apocalipsis": { mensaje: "¡Marana thá! Has llegado al final de la historia. El Cordero ha vencido.", referencia: "Ap 22, 20" }
};

const EVANGELIOS_CELEBRACION = [
    "Evangelio según San Mateo",
    "Evangelio según San Marcos",
    "Evangelio según San Lucas",
    "Evangelio según San Juan"
];
// --------------------------------------------------------------
// 3. CONTENIDO BÍBLICO (se carga desde JSON)
// --------------------------------------------------------------
let bibleContent = {};
let datosBibliaCargados = false;

async function cargarBibliaJSON() {
    try {
        bibleContent = {};
        datosBibliaCargados = false;
        const response = await fetch("Biblia_Catolica_Completa.json");
        if (!response.ok) throw new Error("Error HTTP " + response.status);
        const data = await response.json();

        data.forEach(item => {
            // PLANCHADO DE TILDES: Eliminamos acentos y pasamos a mayúsculas para igualar al diccionario
            let libroCrudo = item.Libro.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim();

            // Mapeamos el nombre limpio al nombre canónico
            let libroNorm = mapaNombres[libroCrudo] || item.Libro;
            let capitulo = parseInt(item.Capitulo);
            let versiculo = parseFloat(item.Versiculo);
            let texto = item.Texto;

            if (!bibleContent[libroNorm]) bibleContent[libroNorm] = {};
            if (!bibleContent[libroNorm][capitulo]) bibleContent[libroNorm][capitulo] = {};
            bibleContent[libroNorm][capitulo][versiculo] = texto;
        });

        datosBibliaCargados = true;
        inicializarIndice();
        construirIndiceConcordancia();
        construirIndiceBusqueda();

        if (libroActual) {
            if (capituloActual) abrirLectura(capituloActual);
            else abrirCapitulos(libroActual, obtenerCantidadCapitulos(libroActual));
        }
    } catch (err) {
        console.error("Error cargando Biblia JSON:", err);
        iniciarBibliaMock();
    }
}

function obtenerCantidadCapitulos(libro) {
    for (let test of Object.values(canonBiblico)) {
        let encontrado = test.find(l => l.nombre === libro);
        if (encontrado) {
            if (Array.isArray(encontrado.caps)) return encontrado.caps.length;
            return encontrado.caps;
        }
    }
    return 1;
}

function obtenerListaCapitulos(libro) {
    for (let test of Object.values(canonBiblico)) {
        let encontrado = test.find(l => l.nombre === libro);
        if (encontrado) {
            if (Array.isArray(encontrado.caps)) return encontrado.caps;
            let caps = [];
            for (let i = 1; i <= encontrado.caps; i++) caps.push(i);
            return caps;
        }
    }
    return [1];
}

// --------------------------------------------------------------
// 4. CONCORDANCIA
// --------------------------------------------------------------
let indiceConcordancia = {};
let palabrasImportantes = new Set([
    // Divinidad y Naturaleza de Dios
    "Dios", "señor", "Jesús", "cristo", "espíritu", "espiritu", "padre", "hijo", "paráclito", "paraclito", "mesías", "mesias", "trinidad", "creador", "todopoderoso",

    // Conceptos Teológicos y Sacramentales
    "amor", "fe", "gracia", "salvación", "salvacion", "pecado", "justicia", "misericordia", "vida", "muerte", "resurrección", "resurreccion", "redención", "redencion", "santidad", "gloria", "paz", "sabiduría", "sabiduria", "verdad", "luz", "oscuridad", "misterio", "providencia",

    // Historia de la Salvación y Alianza
    "reino", "palabra", "alianza", "promesa", "ley", "mandamiento", "evangelio", "testimonio", "cruz", "sangre", "cuerpo", "sacrificio", "pascua", "pentecostés", "pentecostes", "Éxodo", "exodo", "exilio",

    // Figuras y Vocaciones
    "hombre", "mujer", "ángel", "angel", "profeta", "apóstol", "apostol", "discípulo", "discipulo", "sacerdote", "rey", "virgen", "maría", "maria", "pedro", "pablo", "juan", "david", "abraham", "moisés", "moises", "israel",

    // Prácticas y Vida de la Iglesia
    "oración", "oracion", "perdón", "perdon", "iglesia", "bautismo", "eucaristía", "eucaristia", "caridad", "esperanza", "ayuno", "limosna", "tentación", "tentacion", "obediencia", "humildad", "compasión", "compasion", "temor", "paciencia", "pureza", "fidelidad",

    // Lugares Bíblicos Clave
    "cielo", "tierra", "sinaí", "sinai", "jerusalén", "jerusalem", "sión", "sion", "templo", "tabernáculo", "tabernaculo", "arca", "desierto", "pueblo", "horeb"
]);
let concordanciaActiva = false;
let llegadaBusquedaPendiente = null;

// FUNCIÓN DE NORMALIZACIÓN (elimina acentos y convierte a minúsculas)
function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function crearRegexPalabras() {
    return /[\p{L}\p{M}']+/gu;
}

function extraerPalabras(texto) {
    return texto.match(crearRegexPalabras()) || [];
}

// Normalizamos las palabras importantes para que coincidan con el Índice normalizado
palabrasImportantes = new Set(Array.from(palabrasImportantes).map(normalizarTexto));

function construirIndiceConcordancia() {
    indiceConcordancia = {};
    const palabrasNormalizadas = Array.from(palabrasImportantes);
    console.log("Palabras en el set (primeras 10 normalizadas):", palabrasNormalizadas.slice(0, 10));

    for (let libro in bibleContent) {
        for (let cap in bibleContent[libro]) {
            for (let ver in bibleContent[libro][cap]) {
                let texto = bibleContent[libro][cap][ver];
                let textoNormalizado = normalizarTexto(texto);
                let palabras = extraerPalabras(textoNormalizado);
                let palabrasUnicas = new Set(palabras);
                for (let palabra of palabrasUnicas) {
                    if (palabrasImportantes.has(palabra)) {
                        if (!indiceConcordancia[palabra]) indiceConcordancia[palabra] = [];
                        indiceConcordancia[palabra].push({
                            libro, capitulo: parseInt(cap), versiculo: parseFloat(ver),
                            texto: texto
                        });
                    }
                }
            }
        }
    }

    // Debug: mostrar qué palabras fueron encontradas
    console.log("Palabras concordancia encontradas:", Object.keys(indiceConcordancia).sort());

    for (let palabra in indiceConcordancia) {
        indiceConcordancia[palabra].sort((a, b) => {
            if (a.libro !== b.libro) return a.libro.localeCompare(b.libro);
            if (a.capitulo !== b.capitulo) return a.capitulo - b.capitulo;
            return a.versiculo - b.versiculo;
        });
    }
}

// CORRECCIÓN: resaltar palabras usando tokenización por palabra, normalizando cada una
function resaltarPalabras(texto) {
    if (!concordanciaActiva) return escapeHtml(texto);
    const regexPalabras = crearRegexPalabras();
    let partes = [];
    let lastIndex = 0;
    let match;
    while ((match = regexPalabras.exec(texto)) !== null) {
        const palabraOriginal = match[0];
        const palabraNormalizada = normalizarTexto(palabraOriginal);
        // Agregar el texto que hay antes de la palabra
        partes.push(escapeHtml(texto.substring(lastIndex, match.index)));
        // Verificar si la palabra es importante y tiene entradas en el Índice
        if (palabrasImportantes.has(palabraNormalizada) && indiceConcordancia[palabraNormalizada] && indiceConcordancia[palabraNormalizada].length > 0) {
            partes.push(`<span class="palabra-concordancia cursor-pointer text-oro underline decoration-dotted hover:text-amber-600 transition" onclick="event.stopPropagation(); mostrarResultadosBusqueda('${palabraNormalizada}'); return false;">${escapeHtml(palabraOriginal)}</span>`);
        } else {
            partes.push(escapeHtml(palabraOriginal));
        }
        lastIndex = match.index + palabraOriginal.length;
    }
    // Agregar el resto después de la última palabra
    if (lastIndex < texto.length) {
        partes.push(escapeHtml(texto.substring(lastIndex)));
    }
    return partes.join('');
}

function refrescarConcordanciaVistaActual() {
    if (!estaVistaVisible('vista-lectura') || !libroActual || !capituloActual) return;

    const versiculosObj = bibleContent[libroActual]?.[capituloActual] || {};

    document.querySelectorAll('[data-versiculo-texto]').forEach(nodo => {
        const versiculo = nodo.dataset.versiculoTexto;
        const textoOriginal = versiculosObj?.[versiculo];
        if (typeof textoOriginal !== 'string') return;
        nodo.innerHTML = resaltarPalabras(textoOriginal);
    });
}

function activarEfectoLlegadaElemento(elemento, claseAnimacion, hacerScroll = false) {
    if (!elemento || !claseAnimacion) return;

    elemento.classList.remove(claseAnimacion);
    void elemento.offsetWidth;

    if (hacerScroll) {
        elemento.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }

    elemento.classList.add(claseAnimacion);

    setTimeout(() => {
        elemento.classList.remove(claseAnimacion);
    }, 2800);
}

function registrarLlegadaBusqueda(libro, capitulo, versiculo, terminoBusqueda = '') {
    llegadaBusquedaPendiente = {
        libro,
        capitulo: Number(capitulo),
        versiculo: Number(versiculo),
        terminoBusqueda: normalizarTerminoBusqueda(terminoBusqueda),
        tradicionAplicada: false,
        personalAplicada: false
    };
}

function obtenerLlegadaBusquedaPendiente(libro, capitulo, versiculo) {
    if (!llegadaBusquedaPendiente) return null;

    if (
        llegadaBusquedaPendiente.libro !== libro ||
        llegadaBusquedaPendiente.capitulo !== Number(capitulo) ||
        llegadaBusquedaPendiente.versiculo !== Number(versiculo)
    ) {
        return null;
    }

    return llegadaBusquedaPendiente;
}

function limpiarLlegadaBusquedaPendienteSiCorresponde() {
    if (!llegadaBusquedaPendiente) return;

    if (llegadaBusquedaPendiente.tradicionAplicada && llegadaBusquedaPendiente.personalAplicada) {
        llegadaBusquedaPendiente = null;
    }
}

function obtenerTerminoBusquedaLlegada(libro, capitulo, versiculo, termino = '') {
    const terminoNormalizado = normalizarTerminoBusqueda(termino);
    if (terminoNormalizado) return terminoNormalizado;

    const llegada = obtenerLlegadaBusquedaPendiente(libro, capitulo, versiculo);
    return normalizarTerminoBusqueda(llegada?.terminoBusqueda || '');
}

function aplicarResaltadoBusquedaEnVersiculoLectura(libro, capitulo, versiculo, termino = '') {
    const terminoNormalizado = obtenerTerminoBusquedaLlegada(libro, capitulo, versiculo, termino);
    if (!terminoNormalizado) return;

    const textoOriginal = bibleContent[libro]?.[capitulo]?.[versiculo];
    if (typeof textoOriginal !== 'string') return;

    const target = document.getElementById(`verse_${libro}_${capitulo}_${versiculo}`);
    if (!target) return;

    target.querySelectorAll(`[data-versiculo-texto="${versiculo}"]`).forEach(nodo => {
        nodo.innerHTML = renderizarTextoBusquedaResaltadoHtml(textoOriginal, terminoNormalizado);
    });
}

function aplicarLlegadaBusquedaPanel(libro, capitulo, versiculo, tipo) {
    const llegada = obtenerLlegadaBusquedaPendiente(libro, capitulo, versiculo);
    if (!llegada) return;

    if (tipo === 'tradicion' && !llegada.tradicionAplicada) {
        activarEfectoLlegadaElemento(
            document.getElementById('contenido-panel-tradicion'),
            'highlight-glow-comentario'
        );
        llegada.tradicionAplicada = true;
    }

    if (tipo === 'personal' && !llegada.personalAplicada) {
        activarEfectoLlegadaElemento(
            document.getElementById('contenido-panel-personales'),
            'highlight-glow-nota'
        );
        llegada.personalAplicada = true;
    }

    limpiarLlegadaBusquedaPendienteSiCorresponde();
}

function resaltarAnotacionPanel(tipo, idx) {
    if (!Number.isInteger(idx)) return;

    const esComentario = tipo === 'tradicion';
    const selector = esComentario
        ? `#contenido-panel-tradicion [data-panel-comentario-idx="${idx}"]`
        : `#lista-notas-personales [data-panel-nota-idx="${idx}"]`;
    const contenedorFallback = esComentario
        ? document.getElementById('contenido-panel-tradicion')
        : document.getElementById('contenido-panel-personales');
    const clase = esComentario ? 'highlight-glow-comentario' : 'highlight-glow-nota';
    const elemento = document.querySelector(selector) || contenedorFallback;

    activarEfectoLlegadaElemento(elemento, clase, true);
}

const PANELES_LATERALES_DERECHA = [
    'panel-busqueda',
    'panel-comentarios',
    'panel-favoritos',
    'panel-concordancia'
];

function esPanelLateralDerecha(id) {
    return PANELES_LATERALES_DERECHA.includes(id);
}

function obtenerPanelLateralActivoDerecha() {
    return PANELES_LATERALES_DERECHA
        .map(id => document.getElementById(id))
        .find(panel => {
            if (!panel || panel.classList.contains('translate-x-full')) return false;
            if (panel.id === 'panel-busqueda' && panel.classList.contains('panel-busqueda-asomado')) return false;
            return true;
        }) || null;
}

function actualizarOverlayPanelesDerecha() {
    const overlay = document.getElementById('overlay-paneles-derecha');
    if (!overlay) return;

    const hayPanelActivo = !!obtenerPanelLateralActivoDerecha();
    overlay.classList.toggle('hidden', !hayPanelActivo);
    overlay.setAttribute('aria-hidden', hayPanelActivo ? 'false' : 'true');
}

function tieneResultadosBusquedaActivos() {
    return document.getElementById('contenido-busqueda')?.classList.contains('busqueda-con-resultados')
        && !!terminoBusquedaActual.trim();
}

function ocultarPanelBusquedaCompleto() {
    const panel = document.getElementById('panel-busqueda');
    if (!panel) return;

    panel.classList.remove('panel-busqueda-asomado');
    panel.classList.add('translate-x-full');

    const tirador = panel.querySelector('.panel-busqueda-tirador');
    if (tirador) tirador.hidden = true;
}

function cerrarPanelBusquedaAsomado() {
    const panel = document.getElementById('panel-busqueda');
    if (!panel) return;

    if (!tieneResultadosBusquedaActivos()) {
        ocultarPanelBusquedaCompleto();
        actualizarOverlayPanelesDerecha();
        return;
    }

    panel.classList.add('panel-busqueda-asomado');
    panel.classList.remove('translate-x-full');

    const tirador = panel.querySelector('.panel-busqueda-tirador');
    if (tirador && panel.dataset.abiertoAlMenosUnaVez === 'true') {
        tirador.hidden = false;
    }

    actualizarOverlayPanelesDerecha();
}

function cerrarPanelBusquedaCompleto() {
    if (tieneResultadosBusquedaActivos()) {
        cerrarPanelBusquedaAsomado();
        return;
    }

    ocultarPanelBusquedaCompleto();
    actualizarOverlayPanelesDerecha();
}

function abrirPanelLateral(id) {
    const panel = document.getElementById(id);
    if (!panel) return;

    PANELES_LATERALES_DERECHA.forEach(panelId => {
        const panelActual = document.getElementById(panelId);
        if (!panelActual || panelId === id) return;
        panelActual.style.transform = '';
        panelActual.classList.remove('panel-lateral-arrastrando');
        if (panelId === 'panel-busqueda') {
            ocultarPanelBusquedaCompleto();
        } else {
            panelActual.classList.add('translate-x-full');
        }
    });

    cerrarPanelLumina();
    mostrarBuscadorMovil(false);
    panel.style.transform = '';
    panel.classList.remove('panel-lateral-arrastrando');
    panel.classList.remove('translate-x-full');
    if (id === 'panel-busqueda') {
        panel.classList.remove('panel-busqueda-asomado');
        panel.dataset.abiertoAlMenosUnaVez = 'true';
        const tirador = panel.querySelector('.panel-busqueda-tirador');
        if (tirador) tirador.hidden = true;
    }
    actualizarOverlayPanelesDerecha();
}

function cerrarPanelActivoLateral() {
    const panelActivo = obtenerPanelLateralActivoDerecha();
    if (panelActivo) {
        cerrarPanel(panelActivo.id);
    }
}

function inicializarTiradorPanelBusqueda() {
    const tirador = document.querySelector('#panel-busqueda .panel-busqueda-tirador');
    if (!tirador) return;

    tirador.addEventListener('click', () => {
        abrirPanelLateral('panel-busqueda');
    });
}

function inicializarGestosPanelesLaterales() {
    document.querySelectorAll('[data-panel-lateral="derecha"]').forEach(panel => {
        if (panel.dataset.gestosInicializados === 'true') return;
        panel.dataset.gestosInicializados = 'true';

        let inicioX = 0;
        let inicioY = 0;
        let deltaX = 0;
        let arrastrando = false;
        let gestoHorizontal = false;

        const resetearPanel = () => {
            panel.style.transform = '';
            panel.classList.remove('panel-lateral-arrastrando');
            deltaX = 0;
            arrastrando = false;
            gestoHorizontal = false;
        };

        panel.addEventListener('touchstart', event => {
            if (panel.classList.contains('translate-x-full')) return;

            const toque = event.touches[0];
            inicioX = toque.clientX;
            inicioY = toque.clientY;
            deltaX = 0;
            arrastrando = false;
            gestoHorizontal = false;
        }, { passive: true });

        panel.addEventListener('touchmove', event => {
            if (panel.classList.contains('translate-x-full')) return;

            const toque = event.touches[0];
            const desplazamientoX = toque.clientX - inicioX;
            const desplazamientoY = toque.clientY - inicioY;

            if (!arrastrando) {
                if (Math.abs(desplazamientoX) < 10 && Math.abs(desplazamientoY) < 10) {
                    return;
                }

                if (desplazamientoX <= 0 || Math.abs(desplazamientoX) <= Math.abs(desplazamientoY)) {
                    gestoHorizontal = false;
                    return;
                }

                arrastrando = true;
                gestoHorizontal = true;
                panel.classList.add('panel-lateral-arrastrando');
            }

            if (!gestoHorizontal) return;

            deltaX = Math.max(0, desplazamientoX);
            panel.style.transform = `translateX(${deltaX}px)`;
            if (event.cancelable) event.preventDefault();
        }, { passive: false });

        const finalizarGesto = () => {
            if (!arrastrando || !gestoHorizontal) {
                resetearPanel();
                return;
            }

            const umbralCierre = Math.min(140, panel.offsetWidth * 0.3);
            if (deltaX >= umbralCierre) {
                resetearPanel();
                cerrarPanel(panel.id);
                return;
            }

            resetearPanel();
        };

        panel.addEventListener('touchend', finalizarGesto);
        panel.addEventListener('touchcancel', finalizarGesto);
    });
}

function mostrarConcordancia(palabra) {
    let resultados = indiceConcordancia[palabra] || [];
    let panel = document.getElementById('panel-concordancia');
    let titulo = document.getElementById('titulo-concordancia');
    let contenido = document.getElementById('contenido-concordancia');
    titulo.innerHTML = `Concordancia: "${palabra.charAt(0).toUpperCase() + palabra.slice(1)}"`;
    if (resultados.length === 0) {
        contenido.innerHTML = '<div class="text-gray-400 italic text-center py-8">No se encontraron versículos con esta palabra.</div>';
    } else {
        contenido.innerHTML = resultados.map(ref => `
            <div class="p-3 bg-amber-50 dark:bg-gray-700 rounded-lg border-l-4 border-oro cursor-pointer hover:bg-amber-100 dark:hover:bg-gray-600 transition" onclick="irAVersiculo('${ref.libro}', ${ref.capitulo}, ${ref.versiculo}, 'busqueda')">
                <div class="font-bold text-oro text-sm">${ref.libro} ${ref.capitulo}, ${ref.versiculo}</div>
                <div class="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">${escapeHtml(ref.texto)}</div>
            </div>
        `).join('');
    }
    abrirPanelLateral('panel-concordancia');
}

function irAVersiculo(libro, capitulo, versiculo, origen = '', terminoBusqueda = '') {
    // Cerramos paneles laterales si están abiertos
    cerrarPanel('panel-concordancia');
    cerrarPanel('panel-busqueda');
    cerrarPanel('panel-favoritos');

    if (origen === 'busqueda') {
        registrarLlegadaBusqueda(libro, capitulo, versiculo, terminoBusqueda);
    } else {
        llegadaBusquedaPendiente = null;
    }

    let libroObj = null;
    for (let test of Object.values(canonBiblico)) {
        libroObj = test.find(l => l.nombre === libro);
        if (libroObj) break;
    }

    if (libroObj) {
        // 1. Cargamos la vista de capítulos del libro
        abrirCapitulos(libro, libroObj.caps);

        setTimeout(() => {
            // 2. Cargamos la lectura del capítulo específico
            abrirLectura(capitulo);

            setTimeout(() => {
                // 3. Buscamos el elemento del versículo en el DOM
                const targetId = `verse_${libro}_${capitulo}_${versiculo}`;
                const target = document.getElementById(targetId);

                if (target) {
                    // 4. Scroll suave hacia el versículo
                    target.scrollIntoView({ behavior: "smooth", block: "center" });

                    if (origen === 'busqueda') {
                        aplicarResaltadoBusquedaEnVersiculoLectura(libro, capitulo, versiculo, terminoBusqueda);
                    }

                    // 5. Aplicamos el EFECTO GLOW
                    target.classList.add('highlight-glow');

                    // 6. Limpiamos la clase después de 3s (duración de la animación) 
                    // para que pueda volver a dispararse en el futuro
                    setTimeout(() => {
                        target.classList.remove('highlight-glow');
                    }, 3000);
                }
            }, 250); // Tiempo para que el DOM de los versículos se renderice
        }, 150); // Tiempo para que la vista de capítulos procese
    }
}

// --------------------------------------------------------------
// 5. COMENTARIOS (Catena Aurea)
// --------------------------------------------------------------
let comentariosDB = { __ranges: [] };
let datosComentariosCargados = false;
let secuenciaComentariosDB = 0;

function limpiarTextoComentarioTradicion(texto) {
    return String(texto || '')
        .replace(/\r\n?/g, '\n')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

function crearComentarioTradicion(autor, texto) {
    const textoLimpio = limpiarTextoComentarioTradicion(texto);
    if (!textoLimpio) return null;

    return {
        autor: autor || 'Tradición',
        texto: textoLimpio,
        orden: secuenciaComentariosDB++
    };
}

function agregarComentarioTradicion(key, autor, texto) {
    const comentario = crearComentarioTradicion(autor, texto);
    if (!comentario) return;

    if (!comentariosDB[key]) comentariosDB[key] = [];
    comentariosDB[key].push(comentario);
}

function registrarComentarioTradicionEnRango(libro, capitulo, desde, hasta, autor, texto) {
    const rangeKey = `${libro}_${capitulo}_${desde}-${hasta}`;
    const esNuevoRango = !comentariosDB[rangeKey];

    agregarComentarioTradicion(rangeKey, autor, texto);

    if (esNuevoRango) {
        comentariosDB.__ranges.push({
            libro,
            capitulo,
            desde,
            hasta,
            key: rangeKey
        });
    }
}

function obtenerCapituloPrefacio(libro, capitulo = 0) {
    return libro === 'Salmos' ? Number(capitulo) || 0 : 0;
}

function obtenerClavePrefacio(libro, capitulo = 0) {
    const capituloPrefacio = obtenerCapituloPrefacio(libro, capitulo);
    return capituloPrefacio > 0
        ? `${libro}_${capituloPrefacio}_prefacio`
        : `${libro}_prefacio`;
}

function obtenerComentariosPrefacio(libro, capitulo = 0) {
    const comentarios = comentariosDB[obtenerClavePrefacio(libro, capitulo)];
    return Array.isArray(comentarios) ? comentarios : [];
}

function tienePrefacio(libro, capitulo = 0) {
    return obtenerComentariosPrefacio(libro, capitulo).length > 0;
}

function esReferenciaPrefacioTradicion(capitulo, versiculo) {
    return Number(versiculo) === 0;
}

function formatearReferenciaPrefacio(libro, capitulo = 0) {
    const capituloPrefacio = obtenerCapituloPrefacio(libro, capitulo);
    return capituloPrefacio > 0
        ? `${libro} ${capituloPrefacio} (Prefacio)`
        : `${libro} (Prefacio)`;
}

function formatearReferenciaComentarioTradicion(libro, capitulo, versiculo) {
    return esReferenciaPrefacioTradicion(capitulo, versiculo)
        ? formatearReferenciaPrefacio(libro, capitulo)
        : formatearReferenciaCompartida(libro, capitulo, versiculo);
}

async function cargarComentariosCatenaJSON() {
    try {
        const response = await fetch("Catena_Aurea_Completa.json");
        if (!response.ok) throw new Error("No se encontró el archivo de la Catena Aurea");
        const data = await response.json();

        data.forEach(item => {
            let ref = item.Referencia_Biblica;
            if (!ref) return;

            let libroMatch = ref.match(/Evangelio según san (Mateo|Marcos|Lucas|Juan)/i);
            if (!libroMatch) return;

            let libro = libroMatch[1].charAt(0).toUpperCase() + libroMatch[1].slice(1).toLowerCase();
            if (libro === "Mateo") libro = "Evangelio según San Mateo";
            else if (libro === "Marcos") libro = "Evangelio según San Marcos";
            else if (libro === "Lucas") libro = "Evangelio según San Lucas";
            else if (libro === "Juan") libro = "Evangelio según San Juan";

            let parte = ref.replace(libroMatch[0], '').trim();

            if (parte.includes("(Prefacio)")) {
                agregarComentarioTradicion(obtenerClavePrefacio(libro), item.Autor, item.Texto_Comentario);
                return;
            }

            let matchCapituloVersos = parte.match(/,?\s*(\d+):([\d\-]+)/);
            if (!matchCapituloVersos) return;

            let capitulo = parseInt(matchCapituloVersos[1], 10);
            let versosStr = matchCapituloVersos[2];
            let rango = versosStr.split('-').map(v => parseInt(v, 10));

            if (rango.length === 1 || rango[0] === rango[1]) {
                agregarComentarioTradicion(`${libro}_${capitulo}_${rango[0]}`, item.Autor, item.Texto_Comentario);
                return;
            }

            registrarComentarioTradicionEnRango(libro, capitulo, rango[0], rango[1], item.Autor, item.Texto_Comentario);
        });

        console.log("Comentarios de la Catena Aurea cargados en la memoria.");
        return true;
    } catch (err) {
        console.error("Aviso: no se pudo cargar la Catena Aurea:", err);
        return false;
    }
}

function normalizarTextoMetaSalmo(texto) {
    return String(texto || '')
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();
}

function esLineaMetaSalmoAgustin(linea) {
    const limpio = String(linea || '').trim();
    if (!limpio) return true;

    const normalizado = normalizarTextoMetaSalmo(limpio);

    if (/^\[[^\]]+\]$/.test(limpio)) return true;
    if (/^[A-ZÁÉÍÓÚÜÑ0-9 .,:;!?'"()\-]+$/.test(limpio) && limpio.length <= 40) return true;

    return /^(revision|traduccion|traductor|sermon(?:\s|$)|continuacion del sermon|cartago\b|hipona\b|entre (?:el|los anos)\b|despues del\b|en el ano\b|sobre el salmo\b|motivo por el que|prologo\b)/.test(normalizado);
}

function limpiarLineaComentarioSalmoAgustin(linea) {
    return String(linea || '')
        .replace(/^\s*[\dIl]+\.?\s*\[v\.[^\]]+\]\.?\s*/i, '')
        .replace(/^\s*[\dIl]+\.?\s*/, '')
        .trim();
}

function extraerRangoVersiculosSalmoAgustin(linea) {
    const match = String(linea || '').match(/\[v\.\s*([^\]]+)\]/i);
    if (!match) return null;

    let valor = match[1]
        .replace(/â€”/g, '-')
        .replace(/[—–]/g, '-')
        .replace(/\s+/g, '')
        .replace(/[lI]/g, '1')
        .replace(/^\-+/, '')
        .replace(/\.+$/, '');

    if (/^\d+\.\d+$/.test(valor)) {
        valor = valor.replace('.', '-');
    }

    const rangoMatch = valor.match(/^(\d+)(?:-(\d+))?$/);
    if (!rangoMatch) return null;

    const desde = parseInt(rangoMatch[1], 10);
    const hasta = parseInt(rangoMatch[2] || rangoMatch[1], 10);

    if (!Number.isFinite(desde) || !Number.isFinite(hasta)) return null;

    return {
        desde: Math.min(desde, hasta),
        hasta: Math.max(desde, hasta)
    };
}

function guardarBloqueComentarioSalmoAgustin(capitulo, rango, lineas) {
    const texto = limpiarTextoComentarioTradicion(lineas.join('\n\n'));
    if (!texto) return;

    if (!rango) {
        agregarComentarioTradicion(obtenerClavePrefacio('Salmos', capitulo), 'San Agustín', texto);
        return;
    }

    if (rango.desde === rango.hasta) {
        agregarComentarioTradicion(`Salmos_${capitulo}_${rango.desde}`, 'San Agustín', texto);
        return;
    }

    registrarComentarioTradicionEnRango('Salmos', capitulo, rango.desde, rango.hasta, 'San Agustín', texto);
}

function procesarSegmentoAgustinSalmo(capitulo, lineas) {
    let rangoActual = null;
    let buffer = [];

    const cerrarBloque = () => {
        if (buffer.length === 0) return;
        guardarBloqueComentarioSalmoAgustin(capitulo, rangoActual, buffer);
        buffer = [];
    };

    lineas.forEach(lineaOriginal => {
        const linea = String(lineaOriginal || '').trim();
        if (!linea || esLineaMetaSalmoAgustin(linea)) return;

        const rango = extraerRangoVersiculosSalmoAgustin(linea);
        if (rango) {
            cerrarBloque();
            rangoActual = rango;
            const contenido = limpiarLineaComentarioSalmoAgustin(linea);
            if (contenido) buffer.push(contenido);
            return;
        }

        const contenido = limpiarLineaComentarioSalmoAgustin(linea);
        if (!contenido) return;
        buffer.push(contenido);
    });

    cerrarBloque();
}

async function cargarComentariosAgustinSalmosJSON() {
    try {
        const response = await fetch("agustin_salmos.json");
        if (!response.ok) throw new Error("No se encontró el archivo de los salmos comentados por San Agustín");
        const data = await response.json();

        Object.entries(data).forEach(([clave, lineas]) => {
            const matchSalmo = clave.match(/^Salmo_(\d+)/i);
            if (!matchSalmo || !Array.isArray(lineas)) return;

            const capitulo = parseInt(matchSalmo[1], 10);
            if (!Number.isFinite(capitulo)) return;

            procesarSegmentoAgustinSalmo(capitulo, lineas);
        });

        console.log("Comentarios de San Agustín sobre los Salmos cargados en la memoria.");
        return true;
    } catch (err) {
        console.error("Aviso: no se pudo cargar el JSON de Agus para los Salmos:", err);
        return false;
    }
}

async function cargarComentariosJSON() {
    comentariosDB = { __ranges: [] };
    secuenciaComentariosDB = 0;

    const resultados = await Promise.all([
        cargarComentariosCatenaJSON(),
        cargarComentariosAgustinSalmosJSON()
    ]);

    datosComentariosCargados = resultados.some(Boolean);
}

function obtenerComentarios(libro, capitulo, versiculo) {
    const comentarios = [];
    const key = `${libro}_${capitulo}_${versiculo}`;

    if (Array.isArray(comentariosDB[key])) {
        comentarios.push(...comentariosDB[key]);
    }

    for (let r of (comentariosDB.__ranges || [])) {
        if (r.libro === libro && r.capitulo === capitulo && versiculo >= r.desde && versiculo <= r.hasta) {
            comentarios.push(...(comentariosDB[r.key] || []));
        }
    }

    return comentarios.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
}

// --------------------------------------------------------------
// 6. NOTAS PERSONALES Y FAVORITOS
// --------------------------------------------------------------
let notasPersonales = {};
let favoritos = new Set();
let estadoSeccionesFavoritos = {
    versiculos: false,
    comentarios: false,
    notas: false
};
let coleccionesVersiculos = [];
let panelGuardadosTabActiva = 'favoritos';
let coleccionAbiertaPanelId = null;
let contextoModalColecciones = null;
let lectioDivinaRegistros = [];
let lectioRegistroActivoId = null;
let vistaRetornoLectio = 'vista-libros';
let busquedasRecientes = [];
let estadoSeccionesBusqueda = {
    versiculos: false,
    comentarios: false,
    notas: false
};
const CLAVE_NOTAS = 'lumina_notas';
const CLAVE_FAVORITOS = 'lumina_favoritos';
const CLAVE_LEIDOS = 'lumina_leidos';
const CLAVE_MODO_DESIERTO = 'lumina_modo_desierto_v1';
const CLAVE_TEXTO_CORRIDO = 'lumina_texto_corrido_v1';
const CLAVE_VERSICULO_INICIO = 'lumina_versiculo_inicio_v1';
const CLAVE_COLECCIONES_VERSICULOS = 'lumina_colecciones_versiculos_v1';
const CLAVE_ULTIMA_COLECCION_VERSICULOS = 'lumina_ultima_coleccion_versiculos_v1';
const CLAVE_LECTIO_DIVINA = 'lumina_lectio_divina_v1';
const CLAVE_BUSQUEDAS_RECIENTES = 'lumina_busquedas_recientes_v1';
const CLAVE_DARKMODE = 'lumina_darkmode';
const CLAVE_CONCORDANCIA = 'lumina_concordancia';
const CLAVE_BIENVENIDA = 'lumina_bienvenida_v1';
const LIMITE_BUSQUEDAS_RECIENTES = 12;
let modoDesiertoActivo = false;
let textoCorridoActivo = false;
let versiculoInicioGuardado = null;
let versiculoInicioMostradoEnSesion = false;
let versiculoInicioPendienteTrasBienvenida = false;
let leidos = new Set();
let ultimaColeccionVersiculosId = null;
// Lumina cuenta 76 libros en su canon interno: 73 del canon católico + 3 suplementarios.
const TOTAL_BIBLIA_LUMINA = 76;
let bibliaCompletaCelebrada = false;
let celebracionBibliaPendiente = false;
const CLAVE_EVENTO_BIBLIA_COMPLETA = "lumina_biblia_completa_evento_v1";
const CLAVE_CONTADOR_CELEBRACION_BIBLIA = "lumina_biblia_completa_contador_v1";
const PREFIJO_CLAVE_LUMINA = 'lumina_';
const NOMBRE_BD_PERSISTENCIA_LUMINA = 'lumina_persistencia';
const VERSION_BD_PERSISTENCIA_LUMINA = 1;
const STORE_BD_PERSISTENCIA_LUMINA = 'estado';
const VERSION_RESPALDO_LUMINA = 2;
const ESTADO_NUBE_LUMINA = {
    sinFirebase: 'Firebase no está disponible. Lumina sigue guardando todo localmente.',
    sinSesion: 'Sin sesión iniciada. Tus datos siguen guardados en este dispositivo.',
    conectando: 'Conectando con Google...',
    sincronizando: 'Sincronizando con la nube...',
    sincronizado: 'Sincronizado con la nube.',
    pendiente: 'Cambios pendientes de subir cuando haya conexión.',
    error: 'No se pudo completar la sincronización.'
};
let faseCelebracionBibliaActual = 1;
const TITULOS_CELEBRACION_BIBLIA = [
    "¡Misión cumplida!",
    "¡A profundizar!",
    "¡Nuevo comienzo!"
];
const MENSAJES_CELEBRACION_BIBLIA = [
    "¡Misión cumplida! Has caminado de la mano de la Tradición desde el Génesis hasta el Amén final. Ahora, dejá que la Palabra baje de la pantalla al corazón. Reiniciá tu lectura, invocá al Espíritu y dejate sorprender: Dios siempre tiene algo nuevo que decirte en el mismo versículo de siempre.",
    "La Palabra de Dios es un océano: has cruzado la superficie, ahora te toca bucear. No leas para terminar, leé para escuchar. Te invitamos a reiniciar este camino sin prisa, invocando al Espíritu para que cada versículo que hoy te es familiar, mañana te hable como si fuera la primera vez. La meta no es el libro, es el Encuentro.",
    "¿Has recorrido toda la Escritura! Pero recuerda: \"Desconocer la Escritura es desconocer a Cristo\". Que este final sea solo un nuevo comienzo. Te invitamos a volver al primer verso, ahora con un corazón más ancho, dejando que el Espíritu Santo sople vida sobre cada palabra que ya conocés, para que te transforme en lo que leés."
];
const CATEGORIAS_RESPALDO_LUMINA = [
    {
        id: 'progreso',
        titulo: 'Progreso de lectura',
        descripcion: 'Marcas de lectura y celebraciones del recorrido.',
        claves: [CLAVE_LEIDOS, CLAVE_EVENTO_BIBLIA_COMPLETA, CLAVE_CONTADOR_CELEBRACION_BIBLIA]
    },
    {
        id: 'notas',
        titulo: 'Notas personales',
        descripcion: 'Tus anotaciones y comentarios propios.',
        claves: [CLAVE_NOTAS]
    },
    {
        id: 'favoritos',
        titulo: 'Favoritos',
        descripcion: 'Versículos y comentarios guardados.',
        claves: [CLAVE_FAVORITOS]
    },
    {
        id: 'colecciones',
        titulo: 'Colecciones',
        descripcion: 'Tus agrupaciones temáticas de versículos.',
        claves: [CLAVE_COLECCIONES_VERSICULOS, CLAVE_ULTIMA_COLECCION_VERSICULOS]
    },
    {
        id: 'lectio',
        titulo: 'Lectio Divina',
        descripcion: 'Tu cuaderno espiritual de Lectios.',
        claves: [CLAVE_LECTIO_DIVINA]
    },
    {
        id: 'busquedas',
        titulo: 'Búsquedas guardadas',
        descripcion: 'Tu historial reciente para retomar búsquedas rápido.',
        claves: [CLAVE_BUSQUEDAS_RECIENTES]
    },
    {
        id: 'preferencias',
        titulo: 'Preferencias y bienvenida',
        descripcion: 'Tema, concordancias, modos de lectura y versículo de entrada.',
        claves: [
            CLAVE_DARKMODE,
            CLAVE_CONCORDANCIA,
            CLAVE_MODO_DESIERTO,
            CLAVE_TEXTO_CORRIDO,
            CLAVE_VERSICULO_INICIO,
            CLAVE_BIENVENIDA
        ]
    }
];
let persistenciaLuminaCache = new Map();
let persistenciaLuminaMeta = new Map();
let persistenciaLuminaInicializada = false;
let persistenciaLuminaUsaFallbackLocal = false;
let basePersistenciaLumina = null;
let contextoModalRespaldoLumina = null;
let accionRespaldoLuminaEnCurso = false;
let firebaseLumina = null;
let usuarioFirebaseLumina = null;
let unsubscribeAuthLumina = null;
let firebaseLuminaInicializado = false;
let sincronizacionNubeLuminaEnCurso = false;
let aplicandoDatosNubeLumina = false;
let temporizadorSincronizacionNubeLumina = null;
let ultimoEstadoNubeLumina = ESTADO_NUBE_LUMINA.sinSesion;
const TIMEOUT_OPERACION_NUBE_LUMINA = 30000;
const TIMEOUT_LECTURA_NUBE_LUMINA = 25000;
const TIMEOUT_ESCRITURA_NUBE_LUMINA = 60000;
const RUTA_FIRESTORE_NUBE_LUMINA = 'users/{uid}/lumina_estado/{clave}';
const cambiosPendientesNubeLumina = new Map();
const dispositivoNubeLuminaId = (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function')
    ? crypto.randomUUID()
    : `lumina-${Date.now()}-${Math.random().toString(36).slice(2)}`;

function esClaveLuminaPersistible(clave) {
    return String(clave || '').startsWith(PREFIJO_CLAVE_LUMINA);
}

function normalizarValorPersistencia(valor) {
    return typeof valor === 'string' ? valor : String(valor);
}

function obtenerMarcaTiempoPersistencia() {
    return new Date().toISOString();
}

function obtenerUpdatedAtPersistencia(clave) {
    return persistenciaLuminaMeta.get(clave) || '1970-01-01T00:00:00.000Z';
}

function actualizarMetaPersistencia(clave, updatedAt = obtenerMarcaTiempoPersistencia()) {
    if (!esClaveLuminaPersistible(clave)) return updatedAt;
    persistenciaLuminaMeta.set(clave, updatedAt);
    return updatedAt;
}

function compararFechasPersistencia(a, b) {
    const tiempoA = Date.parse(a || '') || 0;
    const tiempoB = Date.parse(b || '') || 0;
    return tiempoA - tiempoB;
}

function obtenerEntradasLuminaLegadasLocalStorage() {
    const entradas = [];

    try {
        for (let i = 0; i < localStorage.length; i++) {
            const clave = localStorage.key(i);
            if (!esClaveLuminaPersistible(clave)) continue;
            const valor = localStorage.getItem(clave);
            if (valor !== null) {
                entradas.push([clave, valor]);
            }
        }
    } catch (error) {
        console.warn('No se pudieron leer los datos legados de localStorage:', error);
    }

    return entradas;
}

function limpiarEntradasLocalStorageLumina(claves = null) {
    const clavesObjetivo = Array.isArray(claves)
        ? claves.filter(esClaveLuminaPersistible)
        : obtenerEntradasLuminaLegadasLocalStorage().map(([clave]) => clave);

    clavesObjetivo.forEach(clave => {
        try {
            localStorage.removeItem(clave);
        } catch (_) {
            // Si el navegador bloquea localStorage, ya estamos usando caché en memoria.
        }
    });
}

function obtenerDefinicionCategoriaRespaldo(id) {
    return CATEGORIAS_RESPALDO_LUMINA.find(categoria => categoria.id === id) || null;
}

function obtenerClavesCategoriasRespaldo(categorias = []) {
    const claves = new Set();

    categorias.forEach(id => {
        const categoria = obtenerDefinicionCategoriaRespaldo(id);
        categoria?.claves.forEach(clave => claves.add(clave));
    });

    return Array.from(claves);
}

function obtenerCategoriasRespaldoPresentesEnMapa(mapa, categoriasExplicitas = []) {
    const explicitas = new Set(
        Array.isArray(categoriasExplicitas)
            ? categoriasExplicitas.filter(id => obtenerDefinicionCategoriaRespaldo(id))
            : []
    );

    return CATEGORIAS_RESPALDO_LUMINA
        .filter(categoria => explicitas.has(categoria.id) || categoria.claves.some(clave => mapa.has(clave)))
        .map(categoria => categoria.id);
}

async function abrirBasePersistenciaLumina() {
    if (persistenciaLuminaUsaFallbackLocal) {
        throw new Error('Lumina está usando localStorage como respaldo de compatibilidad');
    }

    if (basePersistenciaLumina) {
        return basePersistenciaLumina;
    }

    if (!('indexedDB' in window)) {
        throw new Error('IndexedDB no está disponible en este navegador');
    }

    basePersistenciaLumina = await new Promise((resolve, reject) => {
        const solicitud = indexedDB.open(NOMBRE_BD_PERSISTENCIA_LUMINA, VERSION_BD_PERSISTENCIA_LUMINA);

        solicitud.onupgradeneeded = () => {
            const db = solicitud.result;
            if (!db.objectStoreNames.contains(STORE_BD_PERSISTENCIA_LUMINA)) {
                db.createObjectStore(STORE_BD_PERSISTENCIA_LUMINA, { keyPath: 'key' });
            }
        };

        solicitud.onsuccess = () => resolve(solicitud.result);
        solicitud.onerror = () => reject(solicitud.error || new Error('No se pudo abrir IndexedDB'));
    });

    return basePersistenciaLumina;
}

async function obtenerEntradasPersistenciaLuminaDB() {
    const db = await abrirBasePersistenciaLumina();

    return new Promise((resolve, reject) => {
        const transaccion = db.transaction(STORE_BD_PERSISTENCIA_LUMINA, 'readonly');
        const store = transaccion.objectStore(STORE_BD_PERSISTENCIA_LUMINA);
        const solicitud = store.getAll();

        solicitud.onsuccess = () => {
            resolve(Array.isArray(solicitud.result) ? solicitud.result : []);
        };
        solicitud.onerror = () => reject(solicitud.error || new Error('No se pudieron leer los datos persistidos'));
        transaccion.onerror = () => reject(transaccion.error || solicitud.error || new Error('La lectura de IndexedDB falló'));
        transaccion.onabort = () => reject(transaccion.error || new Error('La lectura de IndexedDB fue cancelada'));
    });
}

async function guardarEntradasPersistenciaLuminaDB(registros) {
    if (!Array.isArray(registros) || registros.length === 0) return;

    const db = await abrirBasePersistenciaLumina();

    return new Promise((resolve, reject) => {
        const transaccion = db.transaction(STORE_BD_PERSISTENCIA_LUMINA, 'readwrite');
        const store = transaccion.objectStore(STORE_BD_PERSISTENCIA_LUMINA);

        registros.forEach(({ key, value, updatedAt }) => {
            store.put({
                key,
                value: normalizarValorPersistencia(value),
                updatedAt: updatedAt || new Date().toISOString()
            });
        });

        transaccion.oncomplete = () => resolve(true);
        transaccion.onerror = () => reject(transaccion.error || new Error('No se pudieron guardar los datos en IndexedDB'));
        transaccion.onabort = () => reject(transaccion.error || new Error('La escritura en IndexedDB fue cancelada'));
    });
}

async function eliminarClavesPersistenciaLuminaDB(claves) {
    if (!Array.isArray(claves) || claves.length === 0) return;

    const db = await abrirBasePersistenciaLumina();

    return new Promise((resolve, reject) => {
        const transaccion = db.transaction(STORE_BD_PERSISTENCIA_LUMINA, 'readwrite');
        const store = transaccion.objectStore(STORE_BD_PERSISTENCIA_LUMINA);

        claves.forEach(clave => store.delete(clave));

        transaccion.oncomplete = () => resolve(true);
        transaccion.onerror = () => reject(transaccion.error || new Error('No se pudieron eliminar datos de IndexedDB'));
        transaccion.onabort = () => reject(transaccion.error || new Error('La eliminación en IndexedDB fue cancelada'));
    });
}

async function vaciarPersistenciaLuminaDB() {
    const db = await abrirBasePersistenciaLumina();

    return new Promise((resolve, reject) => {
        const transaccion = db.transaction(STORE_BD_PERSISTENCIA_LUMINA, 'readwrite');
        const store = transaccion.objectStore(STORE_BD_PERSISTENCIA_LUMINA);
        store.clear();

        transaccion.oncomplete = () => resolve(true);
        transaccion.onerror = () => reject(transaccion.error || new Error('No se pudo vaciar IndexedDB'));
        transaccion.onabort = () => reject(transaccion.error || new Error('El vaciado de IndexedDB fue cancelado'));
    });
}

async function inicializarPersistenciaLumina() {
    if (persistenciaLuminaInicializada) return;

    const entradasLegadas = obtenerEntradasLuminaLegadasLocalStorage();

    try {
        const registrosPersistidos = await obtenerEntradasPersistenciaLuminaDB();

        registrosPersistidos.forEach(({ key, value, updatedAt }) => {
            if (esClaveLuminaPersistible(key) && value !== null && typeof value !== 'undefined') {
                persistenciaLuminaCache.set(key, normalizarValorPersistencia(value));
                actualizarMetaPersistencia(key, updatedAt || obtenerMarcaTiempoPersistencia());
            }
        });

        const faltantesLegados = entradasLegadas.filter(([clave]) => !persistenciaLuminaCache.has(clave));
        if (faltantesLegados.length > 0) {
            faltantesLegados.forEach(([clave, valor]) => {
                persistenciaLuminaCache.set(clave, valor);
                actualizarMetaPersistencia(clave);
            });

            await guardarEntradasPersistenciaLuminaDB(
                faltantesLegados.map(([key, value]) => ({
                    key,
                    value,
                    updatedAt: obtenerUpdatedAtPersistencia(key)
                }))
            );
        }

        limpiarEntradasLocalStorageLumina();
    } catch (error) {
        console.warn('Lumina no pudo inicializar IndexedDB; seguimos con localStorage como compatibilidad.', error);
        persistenciaLuminaUsaFallbackLocal = true;

        entradasLegadas.forEach(([clave, valor]) => {
            persistenciaLuminaCache.set(clave, valor);
            actualizarMetaPersistencia(clave);
        });
    }

    persistenciaLuminaInicializada = true;
}

function leerPersistencia(clave, fallback = null) {
    return persistenciaLuminaCache.has(clave) ? persistenciaLuminaCache.get(clave) : fallback;
}

function escribirPersistencia(clave, valor) {
    if (!esClaveLuminaPersistible(clave)) return Promise.resolve();

    const valorNormalizado = normalizarValorPersistencia(valor);
    const updatedAt = actualizarMetaPersistencia(clave);
    persistenciaLuminaCache.set(clave, valorNormalizado);
    encolarCambioNubeLumina({ key: clave, value: valorNormalizado, updatedAtLocal: updatedAt, deleted: false });

    if (persistenciaLuminaUsaFallbackLocal) {
        try {
            localStorage.setItem(clave, valorNormalizado);
        } catch (error) {
            console.error(`Lumina no pudo guardar ${clave} en localStorage:`, error);
        }
        return Promise.resolve();
    }

    limpiarEntradasLocalStorageLumina([clave]);
    return guardarEntradasPersistenciaLuminaDB([{ key: clave, value: valorNormalizado, updatedAt }]).catch(error => {
        console.error(`Lumina no pudo guardar ${clave} en IndexedDB. Volvemos a localStorage para no perder el dato.`, error);
        persistenciaLuminaUsaFallbackLocal = true;

        try {
            localStorage.setItem(clave, valorNormalizado);
        } catch (fallbackError) {
            console.error(`Lumina tampoco pudo guardar ${clave} en localStorage:`, fallbackError);
        }
    });
}

function eliminarPersistencia(clave) {
    if (!esClaveLuminaPersistible(clave)) return Promise.resolve();

    const updatedAt = actualizarMetaPersistencia(clave);
    persistenciaLuminaCache.delete(clave);
    encolarCambioNubeLumina({ key: clave, value: null, updatedAtLocal: updatedAt, deleted: true });

    if (persistenciaLuminaUsaFallbackLocal) {
        try {
            localStorage.removeItem(clave);
        } catch (error) {
            console.error(`Lumina no pudo eliminar ${clave} de localStorage:`, error);
        }
        return Promise.resolve();
    }

    limpiarEntradasLocalStorageLumina([clave]);
    return eliminarClavesPersistenciaLuminaDB([clave]).catch(error => {
        console.error(`Lumina no pudo eliminar ${clave} de IndexedDB. Intentamos retirarlo de localStorage.`, error);
        persistenciaLuminaUsaFallbackLocal = true;

        try {
            localStorage.removeItem(clave);
        } catch (fallbackError) {
            console.error(`Lumina tampoco pudo eliminar ${clave} de localStorage:`, fallbackError);
        }
    });
}

function obtenerMapaPersistenciaLuminaActual() {
    return new Map(
        [...persistenciaLuminaCache.entries()]
            .filter(([clave]) => esClaveLuminaPersistible(clave))
    );
}

async function reemplazarPersistenciaPorCategorias(mapaEntradas, categoriasSeleccionadas) {
    const clavesSeleccionadas = obtenerClavesCategoriasRespaldo(categoriasSeleccionadas);
    const registrosAImportar = [];

    clavesSeleccionadas.forEach(clave => {
        persistenciaLuminaCache.delete(clave);
        actualizarMetaPersistencia(clave);
        encolarCambioNubeLumina({
            key: clave,
            value: null,
            updatedAtLocal: obtenerUpdatedAtPersistencia(clave),
            deleted: true
        });
    });

    mapaEntradas.forEach((valor, clave) => {
        if (!clavesSeleccionadas.includes(clave)) return;
        const valorNormalizado = normalizarValorPersistencia(valor);
        const updatedAt = actualizarMetaPersistencia(clave);
        persistenciaLuminaCache.set(clave, valorNormalizado);
        encolarCambioNubeLumina({ key: clave, value: valorNormalizado, updatedAtLocal: updatedAt, deleted: false });
        registrosAImportar.push({
            key: clave,
            value: valorNormalizado,
            updatedAt
        });
    });

    limpiarEntradasLocalStorageLumina(clavesSeleccionadas);

    if (persistenciaLuminaUsaFallbackLocal) {
        registrosAImportar.forEach(({ key, value }) => {
            try {
                localStorage.setItem(key, value);
            } catch (error) {
                console.error(`Lumina no pudo restaurar ${key} en localStorage:`, error);
            }
        });
        return;
    }

    await eliminarClavesPersistenciaLuminaDB(clavesSeleccionadas);
    await guardarEntradasPersistenciaLuminaDB(registrosAImportar);
}

async function fusionarPersistenciaPorCategorias(mapaEntradas, categoriasSeleccionadas) {
    const clavesSeleccionadas = obtenerClavesCategoriasRespaldo(categoriasSeleccionadas);
    const cambios = [];

    clavesSeleccionadas.forEach(clave => {
        if (!mapaEntradas.has(clave)) return;

        const valorImportado = normalizarValorPersistencia(mapaEntradas.get(clave));
        const existeLocal = persistenciaLuminaCache.has(clave);
        const valorLocal = existeLocal ? persistenciaLuminaCache.get(clave) : null;
        let valorFinal = null;

        if (clavePersistenciaUsaFusion(clave)) {
            valorFinal = fusionarValorPersistenciaLumina(clave, valorLocal, valorImportado);
        } else if (!existeLocal) {
            valorFinal = valorImportado;
        }

        if (valorFinal === null || typeof valorFinal === 'undefined') return;

        const valorNormalizado = normalizarValorPersistencia(valorFinal);
        if (existeLocal && String(valorLocal ?? '') === valorNormalizado) return;

        cambios.push([clave, valorNormalizado]);
    });

    await Promise.all(cambios.map(([clave, valor]) => escribirPersistencia(clave, valor)));
    return cambios.length;
}

async function vaciarPersistenciaLuminaCompleta() {
    persistenciaLuminaCache.clear();
    persistenciaLuminaMeta.clear();
    cambiosPendientesNubeLumina.clear();
    limpiarEntradasLocalStorageLumina();

    if (persistenciaLuminaUsaFallbackLocal) {
        return;
    }

    await vaciarPersistenciaLuminaDB();
}

function cargarNotasPersonales() {
    const stored = leerPersistencia(CLAVE_NOTAS);
    if (stored) notasPersonales = JSON.parse(stored);
}

function cargarLeidos() {
    const stored = leerPersistencia(CLAVE_LEIDOS);
    if (stored) leidos = new Set(JSON.parse(stored));
    limpiarMarcasLeidoNoLeibles();
}

function guardarLeidos() {
    escribirPersistencia(CLAVE_LEIDOS, JSON.stringify(Array.from(leidos)));
}

function normalizarVersiculoInicio(data) {
    if (!data || typeof data !== 'object') return null;

    const libro = String(data.libro || '').trim();
    const capitulo = Number(data.capitulo);
    const versiculo = Number(data.versiculo);
    const texto = String(data.texto || '').trim();

    if (!libro || !Number.isFinite(capitulo) || capitulo <= 0 || !Number.isFinite(versiculo) || versiculo <= 0 || !texto) {
        return null;
    }

    return {
        libro,
        capitulo,
        versiculo,
        texto
    };
}

function cargarVersiculoInicioGuardado() {
    try {
        versiculoInicioGuardado = normalizarVersiculoInicio(JSON.parse(leerPersistencia(CLAVE_VERSICULO_INICIO, 'null')));
    } catch (_) {
        versiculoInicioGuardado = null;
    }
}

function guardarVersiculoInicioGuardado() {
    if (!versiculoInicioGuardado) {
        eliminarPersistencia(CLAVE_VERSICULO_INICIO);
        return;
    }

    escribirPersistencia(CLAVE_VERSICULO_INICIO, JSON.stringify(versiculoInicioGuardado));
}

function esVersiculoInicio(libro, capitulo, versiculo) {
    if (!versiculoInicioGuardado) return false;

    return versiculoInicioGuardado.libro === libro
        && Number(versiculoInicioGuardado.capitulo) === Number(capitulo)
        && Number(versiculoInicioGuardado.versiculo) === Number(versiculo);
}

function obtenerNodosVersiculoInicio(libro, capitulo, versiculo) {
    const identificador = `${libro}_${capitulo}_${versiculo}`;
    return Array.from(document.querySelectorAll(`[data-versiculo-inicio="${identificador}"]`));
}

function actualizarBotonVersiculoInicioUI(libro, capitulo, versiculo) {
    const activo = esVersiculoInicio(libro, capitulo, versiculo);
    const titulo = activo ? 'Quitar versículo de bienvenida' : 'Usar como versículo de bienvenida';
    const label = activo
        ? `Quitar ${formatearReferenciaCompartida(libro, capitulo, versiculo)} como versículo de bienvenida`
        : `Usar ${formatearReferenciaCompartida(libro, capitulo, versiculo)} como versículo de bienvenida`;

    obtenerNodosVersiculoInicio(libro, capitulo, versiculo).forEach(btn => {
        btn.classList.toggle('activa', activo);
        btn.setAttribute('title', titulo);
        btn.setAttribute('aria-label', label);
        btn.setAttribute('aria-pressed', activo ? 'true' : 'false');
    });
}

function refrescarBotonesVersiculoInicio() {
    document.querySelectorAll('[data-versiculo-inicio]').forEach(btn => {
        const { libroVersiculoInicio, capituloVersiculoInicio, versiculoVersiculoInicio } = btn.dataset;
        if (!libroVersiculoInicio) return;
        actualizarBotonVersiculoInicioUI(
            libroVersiculoInicio,
            Number(capituloVersiculoInicio),
            Number(versiculoVersiculoInicio)
        );
    });
}
function guardarNota(libro, capitulo, versiculo, texto) {
    const key = `${libro}_${capitulo}_${versiculo}`;
    if (!notasPersonales[key]) notasPersonales[key] = [];

    // Lógica original
    notasPersonales[key].push({ texto, fecha: new Date().toLocaleString() });
    escribirPersistencia(CLAVE_NOTAS, JSON.stringify(notasPersonales));

    // --- EFECTO DE SONIDO ---
    const sonido = document.getElementById('sonido-guardar');
    if (sonido) {
        sonido.currentTime = 0;
        sonido.play().catch(error => console.log("El navegador bloqueó el audio inicial:", error));
    }

    // --- NOTIFICACIÓN VISUAL (TOAST) ---
    lanzarToast("Nota guardada en el pergamino");

    mostrarNotasPersonales(libro, capitulo, versiculo);
}

function detenerAudioCelebracion(audio) {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
}

function detenerAudiosCelebracion() {
    detenerAudioCelebracion(document.getElementById('audio-celebracion-biblia'));
    detenerAudioCelebracion(document.getElementById('audio-celebracion-libro'));
}

function reproducirAudioCelebracion(audioId) {
    detenerAudiosCelebracion();
    const audio = document.getElementById(audioId);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(error => console.log("El navegador bloqueó el audio de celebración:", error));
}

// Función auxiliar para el Toast
function lanzarToast(mensaje) {
    const toast = document.getElementById('toast-confirmacion');
    toast.querySelector('span').textContent = mensaje;
    toast.classList.remove('hidden', 'opacity-0');

    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.classList.add('hidden'), 500);
    }, 2500);
}

function renderizarModalVersiculoInicio() {
    const referencia = document.getElementById('versiculo-inicio-referencia');
    const texto = document.getElementById('versiculo-inicio-texto');
    if (!referencia || !texto || !versiculoInicioGuardado) return;

    referencia.textContent = formatearReferenciaCompartida(
        versiculoInicioGuardado.libro,
        versiculoInicioGuardado.capitulo,
        versiculoInicioGuardado.versiculo
    );
    texto.textContent = versiculoInicioGuardado.texto;
}

function abrirModalVersiculoInicio() {
    if (!versiculoInicioGuardado || versiculoInicioMostradoEnSesion) return;

    const modal = document.getElementById('modal-versiculo-inicio');
    if (!modal) return;

    renderizarModalVersiculoInicio();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    versiculoInicioMostradoEnSesion = true;
    versiculoInicioPendienteTrasBienvenida = false;
}

function cerrarModalVersiculoInicio() {
    const modal = document.getElementById('modal-versiculo-inicio');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function intentarMostrarVersiculoInicio() {
    if (!versiculoInicioGuardado || versiculoInicioMostradoEnSesion) return;

    const modalBienvenida = document.getElementById('modal-bienvenida');
    const bienvenidaVisible = modalBienvenida && !modalBienvenida.classList.contains('hidden');

    if (bienvenidaVisible) {
        versiculoInicioPendienteTrasBienvenida = true;
        return;
    }

    abrirModalVersiculoInicio();
}

function elegirVersiculoComoInicio(libro, capitulo, versiculo, texto) {
    const textoFuente = bibleContent?.[libro]?.[capitulo]?.[versiculo] ?? texto;
    const textoLimpio = String(textoFuente || '').trim();
    if (!textoLimpio) return;

    versiculoInicioGuardado = normalizarVersiculoInicio({ libro, capitulo, versiculo, texto: textoLimpio });
    guardarVersiculoInicioGuardado();
    refrescarBotonesVersiculoInicio();
    renderizarModalVersiculoInicio();
    lanzarToast('Te estará esperando cuando regreses');
}

function toggleVersiculoInicio(libro, capitulo, versiculo, texto) {
    if (esVersiculoInicio(libro, capitulo, versiculo)) {
        desactivarVersiculoInicio();
        return;
    }

    elegirVersiculoComoInicio(libro, capitulo, versiculo, texto);
}

function desactivarVersiculoInicio() {
    if (!versiculoInicioGuardado) return;

    versiculoInicioGuardado = null;
    guardarVersiculoInicioGuardado();
    refrescarBotonesVersiculoInicio();
    cerrarModalVersiculoInicio();
    lanzarToast('Versículo de bienvenida desactivado');
}

function abrirVersiculoInicioGuardado() {
    if (!versiculoInicioGuardado) return;

    cerrarModalVersiculoInicio();
    cerrarPanelLumina();
    cerrarPanelActivoLateral();

    libroActual = versiculoInicioGuardado.libro;
    const selectorCapitulos = document.getElementById('selector-rapido-capitulos');
    const selectorLectura = document.getElementById('selector-rapido-lectura');
    if (selectorCapitulos) selectorCapitulos.value = versiculoInicioGuardado.libro;
    if (selectorLectura) selectorLectura.value = versiculoInicioGuardado.libro;

    abrirLectura(versiculoInicioGuardado.capitulo);

    requestAnimationFrame(() => {
        resaltarVersiculo(
            versiculoInicioGuardado.libro,
            versiculoInicioGuardado.capitulo,
            versiculoInicioGuardado.versiculo
        );
    });
}

function escucharVersiculoInicioGuardado() {
    if (!versiculoInicioGuardado) return;

    escucharVersiculo(
        versiculoInicioGuardado.libro,
        versiculoInicioGuardado.capitulo,
        versiculoInicioGuardado.versiculo,
        versiculoInicioGuardado.texto
    );
}
// Variable temporal para guardar qué nota estamos por borrar
let notaAPuntoDeBorrar = null;

function eliminarNota(libro, capitulo, versiculo, index) {
    // 1. Guardamos los datos de la nota
    notaAPuntoDeBorrar = { libro, capitulo, versiculo, index };

    // 2. Mostramos el modal
    const modal = document.getElementById('modal-confirmacion');
    modal.classList.remove('hidden');

    // 3. Obtenemos el botón y le damos el "sacudón" de advertencia
    const btnConfirmar = document.getElementById('btn-confirmar-borrado');

    btnConfirmar.classList.add('animacion-alerta');

    // Quitamos la clase después de 500ms para que está lista para la próxima
    setTimeout(() => {
        btnConfirmar.classList.remove('animacion-alerta');
    }, 500);

    // 4. Configuramos el click
    btnConfirmar.onclick = ejecutarEliminacion;
}

function ejecutarEliminacion() {
    if (!notaAPuntoDeBorrar) return;

    const { libro, capitulo, versiculo, index } = notaAPuntoDeBorrar;
    const key = `${libro}_${capitulo}_${versiculo}`;

    // Lógica de borrado original
    notasPersonales[key].splice(index, 1);
    if (notasPersonales[key].length === 0) delete notasPersonales[key];

    escribirPersistencia(CLAVE_NOTAS, JSON.stringify(notasPersonales));

    // Feedback visual y cierre
    cerrarModalConfirmacion();
    mostrarNotasPersonales(libro, capitulo, versiculo);

    // Opcional: podrías disparar un console.log o un toast de "éxito" aqué
    notaAPuntoDeBorrar = null;
}

function cerrarModalConfirmacion() {
    document.getElementById('modal-confirmacion').classList.add('hidden');
    notaAPuntoDeBorrar = null;
}
function obtenerNotasPersonales(libro, capitulo, versiculo) {
    const key = `${libro}_${capitulo}_${versiculo}`;
    return notasPersonales[key] || [];
}
function mostrarNotasPersonales(libro, capitulo, versiculo, terminoBusqueda = '') {
    const container = document.getElementById('lista-notas-personales');
    const notas = obtenerNotasPersonales(libro, capitulo, versiculo);
    if (notas.length === 0) {
        container.innerHTML = '<div class="text-gray-500 dark:text-gray-400 italic text-center py-4">No hay notas personales para este versículo.</div>';
        return;
    }
    container.innerHTML = notas.map((nota, idx) => {
        const esFav = esFavoritoComentario(libro, capitulo, versiculo, 'personal', idx);
        const accionFavorito = esFav ? 'Quitar de favoritos' : 'Agregar a favoritos';
        const identificadorFavorito = obtenerIdentificadorFavoritoComentario(libro, capitulo, versiculo, 'personal', idx);
        return `
        <div class="nota-panel-item border-l-4 border-oro/30 pl-4 py-3 bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-lg mb-3 shadow-sm" data-panel-nota-idx="${idx}">
            <p class="text-gray-800 dark:text-gray-200 text-sm mb-2 font-medium">${renderizarTextoBusquedaResaltadoHtml(nota.texto, terminoBusqueda, { preservarSaltos: true })}</p>
            <div class="flex justify-between items-center mt-2 border-t border-gray-200 dark:border-gray-700 pt-2">
                <span class="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-sans font-bold">${nota.fecha}</span>
                <div class="flex gap-2">
                    <button id="audio_nota_${idx}" data-texto="${escapeHtml(nota.texto).replace(/"/g, '&quot;')}" 
                            class="btn-audio-nota text-gray-500 dark:text-gray-400 hover:text-oro transition p-1" 
                            title="Escuchar nota">
                        <i class="fas fa-volume-up text-sm"></i>
                    </button>
                    <button class="btn-compartir-nota text-gray-500 dark:text-gray-400 hover:text-oro transition p-1"
                            data-libro="${libro.replace(/"/g, '&quot;')}"
                            data-capitulo="${capitulo}"
                            data-versiculo="${versiculo}"
                            data-texto="${escapeHtml(nota.texto).replace(/"/g, '&quot;')}"
                            title="Compartir nota"
                            aria-label="Compartir nota">
                        <i class="fas fa-share-alt text-sm"></i>
                    </button>
                    <button id="star_com_${libro}_${capitulo}_${versiculo}_personal_${idx}" 
                            data-favorito-comentario="${identificadorFavorito}"
                            onclick="toggleFavoritoComentario('${libro}', ${capitulo}, ${versiculo}, 'personal', ${idx})" 
                            class="estrella-fav-comentario ${esFav ? 'activa' : ''} transition-all"
                            title="${accionFavorito}"
                            aria-label="${accionFavorito} nota de ${escapeHtml(formatearReferenciaCompartida(libro, capitulo, versiculo))}"
                            aria-pressed="${esFav ? 'true' : 'false'}">
                        <i class="fas fa-star"></i>
                    </button>
                    <button onclick="eliminarNota('${libro}', ${capitulo}, ${versiculo}, ${idx})" 
                            class="text-red-400 hover:text-red-600 dark:text-red-500 dark:hover:text-red-400 transition-colors text-xs">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    `}).join('');

    container.querySelectorAll('.btn-audio-nota').forEach(btn => {
        btn.onclick = function (e) {
            e.preventDefault();
            escucharNota(this.dataset.texto || '', this);
        };
    });

    container.querySelectorAll('.btn-compartir-nota').forEach(btn => {
        btn.onclick = function (e) {
            e.preventDefault();
            compartirNota(
                this.dataset.libro,
                parseInt(this.dataset.capitulo),
                parseFloat(this.dataset.versiculo),
                this.dataset.texto || ''
            );
        };
    });
}

function cargarFavoritos() {
    let stored = leerPersistencia(CLAVE_FAVORITOS);
    if (stored) favoritos = new Set(JSON.parse(stored));
}
function guardarFavoritos() {
    escribirPersistencia(CLAVE_FAVORITOS, JSON.stringify(Array.from(favoritos)));
}

function cargarColeccionesVersiculos() {
    try {
        const stored = JSON.parse(leerPersistencia(CLAVE_COLECCIONES_VERSICULOS, '[]'));
        coleccionesVersiculos = Array.isArray(stored)
            ? stored.map(normalizarColeccionVersiculos).filter(Boolean)
            : [];
    } catch (_) {
        coleccionesVersiculos = [];
    }

    const ultimaId = String(leerPersistencia(CLAVE_ULTIMA_COLECCION_VERSICULOS, '') || '').trim();
    ultimaColeccionVersiculosId = coleccionesVersiculos.some(coleccion => coleccion.id === ultimaId) ? ultimaId : null;
}

function guardarColeccionesVersiculos() {
    escribirPersistencia(CLAVE_COLECCIONES_VERSICULOS, JSON.stringify(coleccionesVersiculos));

    if (ultimaColeccionVersiculosId) {
        escribirPersistencia(CLAVE_ULTIMA_COLECCION_VERSICULOS, ultimaColeccionVersiculosId);
    } else {
        eliminarPersistencia(CLAVE_ULTIMA_COLECCION_VERSICULOS);
    }
}

function normalizarBusquedaReciente(item) {
    const termino = normalizarTerminoBusqueda(item?.termino || item?.texto || item?.query || '');
    if (!termino) return null;

    const filtro = normalizarFiltroLibroBusqueda(item?.filtro || item?.libro || FILTRO_BUSQUEDA_TODOS);
    const fecha = typeof item?.updatedAt === 'string' && item.updatedAt ? item.updatedAt : new Date().toISOString();

    return {
        termino,
        filtro,
        updatedAt: fecha
    };
}

function ordenarBusquedasRecientes(items = []) {
    return [...items].sort((a, b) => {
        const fechaA = Date.parse(a?.updatedAt || 0) || 0;
        const fechaB = Date.parse(b?.updatedAt || 0) || 0;
        return fechaB - fechaA;
    });
}

function cargarBusquedasRecientes() {
    try {
        const stored = JSON.parse(leerPersistencia(CLAVE_BUSQUEDAS_RECIENTES, '[]'));
        busquedasRecientes = Array.isArray(stored)
            ? ordenarBusquedasRecientes(stored.map(normalizarBusquedaReciente).filter(Boolean)).slice(0, LIMITE_BUSQUEDAS_RECIENTES)
            : [];
    } catch (_) {
        busquedasRecientes = [];
    }
}

function guardarBusquedasRecientes() {
    if (busquedasRecientes.length > 0) {
        escribirPersistencia(CLAVE_BUSQUEDAS_RECIENTES, JSON.stringify(busquedasRecientes));
    } else {
        eliminarPersistencia(CLAVE_BUSQUEDAS_RECIENTES);
    }
}

function registrarBusquedaReciente(termino, filtro = filtroLibroBusquedaActual) {
    const terminoNormalizado = normalizarTerminoBusqueda(termino);
    if (!terminoNormalizado) return;

    const filtroNormalizado = normalizarFiltroLibroBusqueda(filtro);
    const nuevaBusqueda = {
        termino: terminoNormalizado,
        filtro: filtroNormalizado,
        updatedAt: new Date().toISOString()
    };

    busquedasRecientes = [
        nuevaBusqueda,
        ...busquedasRecientes.filter(item => !(item.termino === terminoNormalizado && item.filtro === filtroNormalizado))
    ].slice(0, LIMITE_BUSQUEDAS_RECIENTES);

    guardarBusquedasRecientes();
}

function limpiarHistorialBusquedasRecientes() {
    busquedasRecientes = [];
    eliminarPersistencia(CLAVE_BUSQUEDAS_RECIENTES);
    actualizarVistaBusquedaSinResultados(terminoBusquedaActual, filtroLibroBusquedaActual);
    lanzarToast('Historial de búsquedas limpiado');
}

function eliminarBusquedaReciente(termino, filtro = FILTRO_BUSQUEDA_TODOS) {
    const terminoNormalizado = normalizarTerminoBusqueda(termino);
    if (!terminoNormalizado) return;

    const filtroNormalizado = normalizarFiltroLibroBusqueda(filtro);
    const cantidadAnterior = busquedasRecientes.length;

    busquedasRecientes = busquedasRecientes.filter(item => !(
        item.termino === terminoNormalizado &&
        normalizarFiltroLibroBusqueda(item.filtro) === filtroNormalizado
    ));

    if (busquedasRecientes.length === cantidadAnterior) return;

    guardarBusquedasRecientes();
    actualizarVistaBusquedaSinResultados(terminoBusquedaActual, filtroLibroBusquedaActual);
    lanzarToast('Búsqueda eliminada del historial');
}

function generarIdLectioDivina() {
    return `lectio_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function obtenerPrefijoRespuestaLectio(tipo) {
    switch (tipo) {
        case 'leer':
            return '📖';
        case 'meditar':
            return '💭';
        case 'orar':
            return '🙏';
        default:
            return '•';
    }
}

function normalizarRespuestaLectio(tipo, texto) {
    const limpio = String(texto || '').trim();
    if (!limpio) return '';

    const sinPrefijo = limpio.replace(/^(?:•|-|\*|📖|💭|🙏)\s*/u, '').trim();
    return `${obtenerPrefijoRespuestaLectio(tipo)} ${sinPrefijo}`;
}

function normalizarRegistroLectioDivina(item) {
    if (!item || typeof item !== 'object') return null;

    const libro = String(item.libro || '').trim();
    const capitulo = Number(item.capitulo);
    const desde = Number(item.desde);
    const hasta = Number(item.hasta);

    if (!libro || !Number.isFinite(capitulo) || capitulo <= 0 || !Number.isFinite(desde) || !Number.isFinite(hasta) || desde <= 0 || hasta < desde) {
        return null;
    }

    return {
        id: String(item.id || generarIdLectioDivina()),
        libro,
        capitulo,
        desde,
        hasta,
        leer: normalizarRespuestaLectio('leer', item.leer),
        meditar: normalizarRespuestaLectio('meditar', item.meditar),
        orar: normalizarRespuestaLectio('orar', item.orar),
        createdAt: typeof item.createdAt === 'string' && item.createdAt ? item.createdAt : new Date().toISOString(),
        updatedAt: typeof item.updatedAt === 'string' && item.updatedAt ? item.updatedAt : new Date().toISOString()
    };
}

function cargarLectioDivinaRegistros() {
    try {
        const stored = JSON.parse(leerPersistencia(CLAVE_LECTIO_DIVINA, '[]'));
        lectioDivinaRegistros = Array.isArray(stored)
            ? stored.map(normalizarRegistroLectioDivina).filter(Boolean)
            : [];
    } catch (_) {
        lectioDivinaRegistros = [];
    }
}

function guardarLectioDivinaRegistros() {
    escribirPersistencia(CLAVE_LECTIO_DIVINA, JSON.stringify(lectioDivinaRegistros));
}

function generarIdColeccionVersiculos() {
    return `coleccion_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function normalizarNombreColeccionVersiculos(nombre) {
    return String(nombre || '').trim().replace(/\s+/g, ' ');
}

function obtenerClaveVersiculoColeccion(libro, capitulo, versiculo) {
    return `${String(libro || '').trim()}_${Number(capitulo)}_${Number(versiculo)}`;
}

function normalizarModoOrdenColeccion(modo) {
    return modo === 'manual' ? 'manual' : 'biblico';
}

function compararEntradasColeccionSegunBiblia(a, b) {
    const ordenLibroA = ORDEN_LIBROS_BIBLICOS.get(a.libro);
    const ordenLibroB = ORDEN_LIBROS_BIBLICOS.get(b.libro);

    if (ordenLibroA !== ordenLibroB) {
        if (Number.isFinite(ordenLibroA) && Number.isFinite(ordenLibroB)) {
            return ordenLibroA - ordenLibroB;
        }
        if (Number.isFinite(ordenLibroA)) return -1;
        if (Number.isFinite(ordenLibroB)) return 1;
        return String(a.libro || '').localeCompare(String(b.libro || ''), 'es');
    }

    if (Number(a.capitulo) !== Number(b.capitulo)) {
        return Number(a.capitulo) - Number(b.capitulo);
    }

    if (Number(a.versiculo) !== Number(b.versiculo)) {
        return Number(a.versiculo) - Number(b.versiculo);
    }

    return String(a.texto || '').localeCompare(String(b.texto || ''), 'es');
}

function ordenarVersiculosColeccionSegunBiblia(versiculos) {
    return [...versiculos].sort(compararEntradasColeccionSegunBiblia);
}

function obtenerVersiculosColeccionOrdenados(coleccion) {
    if (!coleccion) return [];
    if (coleccion.modoOrden === 'manual') return [...coleccion.versiculos];
    return ordenarVersiculosColeccionSegunBiblia(coleccion.versiculos);
}

function coleccionUsaOrdenManual(coleccion) {
    return normalizarModoOrdenColeccion(coleccion?.modoOrden) === 'manual';
}

function normalizarEntradaColeccionVersiculos(item) {
    if (!item || typeof item !== 'object') return null;

    const libro = String(item.libro || '').trim();
    const capitulo = Number(item.capitulo);
    const versiculo = Number(item.versiculo);
    const texto = String(item.texto || '').trim();

    if (!libro || !Number.isFinite(capitulo) || capitulo <= 0 || !Number.isFinite(versiculo) || versiculo <= 0) {
        return null;
    }

    return {
        libro,
        capitulo,
        versiculo,
        texto,
        agregadoEn: typeof item.agregadoEn === 'string' && item.agregadoEn ? item.agregadoEn : new Date().toISOString()
    };
}

function normalizarColeccionVersiculos(item) {
    if (!item || typeof item !== 'object') return null;

    const nombre = normalizarNombreColeccionVersiculos(item.nombre);
    if (!nombre) return null;
    const modoOrden = normalizarModoOrdenColeccion(item.modoOrden);

    const entradasNormalizadas = Array.isArray(item.versiculos)
        ? item.versiculos.map(normalizarEntradaColeccionVersiculos).filter(Boolean)
        : [];
    const vistas = new Set();
    const versiculos = entradasNormalizadas.filter(entrada => {
        const clave = obtenerClaveVersiculoColeccion(entrada.libro, entrada.capitulo, entrada.versiculo);
        if (vistas.has(clave)) return false;
        vistas.add(clave);
        return true;
    });
    const createdAt = typeof item.createdAt === 'string' && item.createdAt ? item.createdAt : new Date().toISOString();
    const updatedAt = typeof item.updatedAt === 'string' && item.updatedAt ? item.updatedAt : createdAt;

    return {
        id: String(item.id || generarIdColeccionVersiculos()),
        nombre,
        createdAt,
        updatedAt,
        modoOrden,
        versiculos: modoOrden === 'manual' ? versiculos : ordenarVersiculosColeccionSegunBiblia(versiculos)
    };
}

function obtenerColeccionVersiculosPorId(coleccionId) {
    return coleccionesVersiculos.find(coleccion => coleccion.id === coleccionId) || null;
}

function obtenerColeccionesVersiculosOrdenadas() {
    return [...coleccionesVersiculos].sort((a, b) => {
        const fechaA = Date.parse(a.updatedAt || a.createdAt || 0) || 0;
        const fechaB = Date.parse(b.updatedAt || b.createdAt || 0) || 0;
        return fechaB - fechaA || a.nombre.localeCompare(b.nombre, 'es');
    });
}

function buscarColeccionVersiculosPorNombre(nombre) {
    const nombreNormalizado = normalizarNombreColeccionVersiculos(nombre).toLocaleLowerCase('es');
    if (!nombreNormalizado) return null;
    return coleccionesVersiculos.find(
        coleccion => normalizarNombreColeccionVersiculos(coleccion.nombre).toLocaleLowerCase('es') === nombreNormalizado
    ) || null;
}

function crearColeccionVersiculos(nombre) {
    const nombreNormalizado = normalizarNombreColeccionVersiculos(nombre);
    if (!nombreNormalizado) {
        return { coleccion: null, creada: false, mensaje: 'Poné un nombre para la colección' };
    }

    const existente = buscarColeccionVersiculosPorNombre(nombreNormalizado);
    if (existente) {
        return { coleccion: existente, creada: false, mensaje: 'Ya existe una colección con ese nombre' };
    }

    const ahora = new Date().toISOString();
    const nuevaColeccion = {
        id: generarIdColeccionVersiculos(),
        nombre: nombreNormalizado,
        createdAt: ahora,
        updatedAt: ahora,
        modoOrden: 'biblico',
        versiculos: []
    };

    coleccionesVersiculos = [nuevaColeccion, ...coleccionesVersiculos];
    ultimaColeccionVersiculosId = nuevaColeccion.id;
    guardarColeccionesVersiculos();
    return { coleccion: nuevaColeccion, creada: true, mensaje: `Colección "${nombreNormalizado}" creada` };
}

function coleccionTieneVersiculo(coleccion, libro, capitulo, versiculo) {
    if (!coleccion) return false;
    const claveBuscada = obtenerClaveVersiculoColeccion(libro, capitulo, versiculo);
    return coleccion.versiculos.some(item => obtenerClaveVersiculoColeccion(item.libro, item.capitulo, item.versiculo) === claveBuscada);
}

function agregarVersiculoAColeccion(coleccionId, libro, capitulo, versiculo, texto) {
    const coleccion = obtenerColeccionVersiculosPorId(coleccionId);
    if (!coleccion) {
        return { agregado: false, duplicado: false, coleccion: null, mensaje: 'No encontramos esa colección' };
    }

    if (coleccionTieneVersiculo(coleccion, libro, capitulo, versiculo)) {
        ultimaColeccionVersiculosId = coleccion.id;
        guardarColeccionesVersiculos();
        return { agregado: false, duplicado: true, coleccion, mensaje: `Ese versículo ya está en "${coleccion.nombre}"` };
    }

    const nuevaEntrada = {
        libro,
        capitulo,
        versiculo,
        texto: String(texto || '').trim(),
        agregadoEn: new Date().toISOString()
    };

    coleccion.versiculos = coleccionUsaOrdenManual(coleccion)
        ? [...coleccion.versiculos, nuevaEntrada]
        : ordenarVersiculosColeccionSegunBiblia([...coleccion.versiculos, nuevaEntrada]);
    coleccion.updatedAt = new Date().toISOString();
    ultimaColeccionVersiculosId = coleccion.id;
    guardarColeccionesVersiculos();

    return { agregado: true, duplicado: false, coleccion, mensaje: `Versículo agregado a "${coleccion.nombre}"` };
}

function quitarVersiculoDeColeccion(coleccionId, libro, capitulo, versiculo) {
    const coleccion = obtenerColeccionVersiculosPorId(coleccionId);
    if (!coleccion) return false;

    const longitudAnterior = coleccion.versiculos.length;
    coleccion.versiculos = coleccion.versiculos.filter(
        item => obtenerClaveVersiculoColeccion(item.libro, item.capitulo, item.versiculo) !== obtenerClaveVersiculoColeccion(libro, capitulo, versiculo)
    );

    if (coleccion.versiculos.length === longitudAnterior) return false;

    coleccion.updatedAt = new Date().toISOString();
    guardarColeccionesVersiculos();
    return true;
}

function eliminarColeccionVersiculos(coleccionId) {
    const longitudAnterior = coleccionesVersiculos.length;
    coleccionesVersiculos = coleccionesVersiculos.filter(coleccion => coleccion.id !== coleccionId);

    if (coleccionesVersiculos.length === longitudAnterior) return false;

    if (ultimaColeccionVersiculosId === coleccionId) {
        ultimaColeccionVersiculosId = coleccionesVersiculos[0]?.id || null;
    }

    guardarColeccionesVersiculos();
    return true;
}

function renombrarColeccionVersiculos(coleccionId, nuevoNombre) {
    const coleccion = obtenerColeccionVersiculosPorId(coleccionId);
    if (!coleccion) {
        return { ok: false, mensaje: 'No encontramos esa colección' };
    }

    const nombreNormalizado = normalizarNombreColeccionVersiculos(nuevoNombre);
    if (!nombreNormalizado) {
        return { ok: false, mensaje: 'Poné un nombre para la colección' };
    }

    const duplicada = coleccionesVersiculos.find(
        item => item.id !== coleccionId
            && normalizarNombreColeccionVersiculos(item.nombre).toLocaleLowerCase('es') === nombreNormalizado.toLocaleLowerCase('es')
    );
    if (duplicada) {
        return { ok: false, mensaje: 'Ya existe otra colección con ese nombre' };
    }

    coleccion.nombre = nombreNormalizado;
    coleccion.updatedAt = new Date().toISOString();
    guardarColeccionesVersiculos();
    return { ok: true, mensaje: `Colección renombrada a "${nombreNormalizado}"`, coleccion };
}

function moverVersiculoEnColeccion(coleccionId, libro, capitulo, versiculo, direccion) {
    const coleccion = obtenerColeccionVersiculosPorId(coleccionId);
    if (!coleccion) return { ok: false, coleccion: null };

    const desplazamiento = direccion === 'arriba'
        ? -1
        : direccion === 'abajo'
            ? 1
            : 0;
    if (!desplazamiento) return { ok: false, coleccion };

    const versiculosOrdenados = obtenerVersiculosColeccionOrdenados(coleccion);
    const claveBuscada = obtenerClaveVersiculoColeccion(libro, capitulo, versiculo);
    const indiceActual = versiculosOrdenados.findIndex(
        item => obtenerClaveVersiculoColeccion(item.libro, item.capitulo, item.versiculo) === claveBuscada
    );
    if (indiceActual === -1) return { ok: false, coleccion };

    const nuevoIndice = indiceActual + desplazamiento;
    if (nuevoIndice < 0 || nuevoIndice >= versiculosOrdenados.length) {
        return { ok: false, coleccion };
    }

    [versiculosOrdenados[indiceActual], versiculosOrdenados[nuevoIndice]] = [versiculosOrdenados[nuevoIndice], versiculosOrdenados[indiceActual]];

    coleccion.versiculos = versiculosOrdenados;
    coleccion.modoOrden = 'manual';
    coleccion.updatedAt = new Date().toISOString();
    ultimaColeccionVersiculosId = coleccion.id;
    guardarColeccionesVersiculos();
    return { ok: true, coleccion };
}

function restablecerOrdenBiblicoColeccion(coleccionId) {
    const coleccion = obtenerColeccionVersiculosPorId(coleccionId);
    if (!coleccion) {
        return { ok: false, mensaje: 'No encontramos esa colección' };
    }

    coleccion.versiculos = ordenarVersiculosColeccionSegunBiblia(coleccion.versiculos);
    coleccion.modoOrden = 'biblico';
    coleccion.updatedAt = new Date().toISOString();
    ultimaColeccionVersiculosId = coleccion.id;
    guardarColeccionesVersiculos();
    return { ok: true, mensaje: `Orden bíblico restaurado en "${coleccion.nombre}"`, coleccion };
}

function formatearFechaColeccion(fechaIso) {
    if (!fechaIso) return '';
    const fecha = new Date(fechaIso);
    if (Number.isNaN(fecha.getTime())) return '';
    return fecha.toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

function obtenerClaveFavoritoVersiculo(libro, capitulo, versiculo) {
    return `versiculo:${libro}_${capitulo}_${versiculo}`;
}

function obtenerIdentificadorFavoritoVersiculo(libro, capitulo, versiculo) {
    return `${libro}_${capitulo}_${versiculo}`;
}

function obtenerNodosFavoritoVersiculo(libro, capitulo, versiculo) {
    const identificador = obtenerIdentificadorFavoritoVersiculo(libro, capitulo, versiculo);
    return Array.from(document.querySelectorAll('[data-favorito-versiculo]'))
        .filter(nodo => nodo.dataset.favoritoVersiculo === identificador);
}

function obtenerClaveFavoritoComentario(libro, capitulo, versiculo, tipo, idx) {
    return `comentario:${libro}_${capitulo}_${versiculo}_${tipo}_${idx}`;
}

function obtenerIdentificadorFavoritoComentario(libro, capitulo, versiculo, tipo, idx) {
    return `${libro}_${capitulo}_${versiculo}_${tipo}_${idx}`;
}

function obtenerNodosFavoritoComentario(libro, capitulo, versiculo, tipo, idx) {
    const identificador = obtenerIdentificadorFavoritoComentario(libro, capitulo, versiculo, tipo, idx);
    return Array.from(document.querySelectorAll('[data-favorito-comentario]'))
        .filter(nodo => nodo.dataset.favoritoComentario === identificador);
}

function toggleFavoritoVersiculo(libro, capitulo, versiculo) {
    const key = obtenerClaveFavoritoVersiculo(libro, capitulo, versiculo);
    if (favoritos.has(key)) favoritos.delete(key);
    else favoritos.add(key);
    guardarFavoritos();
    actualizarEstrella(libro, capitulo, versiculo);

    const stars = obtenerNodosFavoritoVersiculo(libro, capitulo, versiculo);

    if (stars.length > 0) {
        if (favoritos.has(obtenerClaveFavoritoVersiculo(libro, capitulo, versiculo))) {
            stars.forEach(star => star.classList.add('animacion-fav'));
            lanzarToast("Versículo guardado ?");
        } else {
            lanzarToast("Versículo quitado");
        }

        setTimeout(() => {
            stars.forEach(star => star.classList.remove('animacion-fav'));
        }, 300);
    }
    refrescarPanelGuardadosSiVisible();
}
function toggleFavoritoComentario(libro, capitulo, versiculo, tipo, idx) {
    const key = obtenerClaveFavoritoComentario(libro, capitulo, versiculo, tipo, idx);
    const seAgrega = !favoritos.has(key);

    if (seAgrega) favoritos.add(key);
    else favoritos.delete(key);

    guardarFavoritos();
    actualizarFavoritoComentarioUI(libro, capitulo, versiculo, tipo, idx);

    const stars = obtenerNodosFavoritoComentario(libro, capitulo, versiculo, tipo, idx);

    if (stars.length > 0) {
        if (seAgrega) {
            stars.forEach(star => star.classList.add('animacion-fav'));
            lanzarToast(tipo === 'personal' ? 'Nota guardada en favoritos' : 'Comentario guardado en favoritos');
        } else {
            lanzarToast(tipo === 'personal' ? 'Nota quitada de favoritos' : 'Comentario quitado de favoritos');
        }

        setTimeout(() => {
            stars.forEach(star => star.classList.remove('animacion-fav'));
        }, 300);
    }
    refrescarPanelGuardadosSiVisible();
}
function esFavoritoVersiculo(libro, capitulo, versiculo) {
    return favoritos.has(obtenerClaveFavoritoVersiculo(libro, capitulo, versiculo));
}
function esFavoritoComentario(libro, capitulo, versiculo, tipo, idx) {
    return favoritos.has(obtenerClaveFavoritoComentario(libro, capitulo, versiculo, tipo, idx));
}
function actualizarEstrella(libro, capitulo, versiculo) {
    const esFavorito = esFavoritoVersiculo(libro, capitulo, versiculo);
    const textoAccion = esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos';
    const label = `${textoAccion} ${libro} ${capitulo}, ${versiculo}`;

    obtenerNodosFavoritoVersiculo(libro, capitulo, versiculo).forEach(starSpan => {
        starSpan.classList.toggle("activa", esFavorito);
        starSpan.textContent = esFavorito ? "\u2605" : "\u2606";
        starSpan.setAttribute('title', textoAccion);
        starSpan.setAttribute('aria-label', label);
        starSpan.setAttribute('aria-pressed', esFavorito ? 'true' : 'false');
    });
}

function actualizarFavoritoComentarioUI(libro, capitulo, versiculo, tipo, idx) {
    const esFavorito = esFavoritoComentario(libro, capitulo, versiculo, tipo, idx);
    const textoAccion = esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos';
    const descripcion = tipo === 'personal' ? 'nota' : 'comentario';
    const referencia = esReferenciaPrefacioTradicion(capitulo, versiculo)
        ? formatearReferenciaPrefacio(libro, capitulo)
        : formatearReferenciaCompartida(libro, capitulo, versiculo);
    const label = referencia
        ? `${textoAccion} ${descripcion} de ${referencia}`
        : `${textoAccion} ${descripcion}`;

    obtenerNodosFavoritoComentario(libro, capitulo, versiculo, tipo, idx).forEach(star => {
        star.classList.toggle('activa', esFavorito);
        star.setAttribute('title', textoAccion);
        star.setAttribute('aria-label', label);
        star.setAttribute('aria-pressed', esFavorito ? 'true' : 'false');
    });
}

function obtenerOrdenLibroBiblico(libro) {
    return ORDEN_LIBROS_BIBLICOS.get(libro) ?? Number.MAX_SAFE_INTEGER;
}

function truncarTextoFavorito(texto, maximo = 120) {
    const limpio = String(texto || '').trim();
    if (limpio.length <= maximo) return limpio;
    return `${limpio.slice(0, maximo).trimEnd()}…`;
}

function compararFavoritosPorOrdenBiblico(a, b) {
    return obtenerOrdenLibroBiblico(a.libro) - obtenerOrdenLibroBiblico(b.libro)
        || a.capitulo - b.capitulo
        || a.versiculo - b.versiculo
        || (a.idx ?? 0) - (b.idx ?? 0);
}

function obtenerFavoritosClasificados() {
    const grupos = {
        versiculos: [],
        comentarios: [],
        notas: []
    };

    for (const key of favoritos) {
        if (key.startsWith('versiculo:')) {
            const ref = key.substring(10);
            const [libro, capituloStr, versiculoStr] = ref.split('_');
            const capitulo = parseInt(capituloStr, 10);
            const versiculo = parseFloat(versiculoStr);
            const texto = bibleContent[libro]?.[capituloStr]?.[versiculoStr];

            if (!texto) continue;

            grupos.versiculos.push({
                libro,
                capitulo,
                versiculo,
                texto
            });
            continue;
        }

        if (!key.startsWith('comentario:')) continue;

        const parts = key.substring(11).split('_');
        const libro = parts[0];
        const capitulo = parseInt(parts[1], 10);
        const versiculo = parseFloat(parts[2]);
        const tipo = parts[3];
        const idx = parseInt(parts[4], 10);

        if (!Number.isInteger(idx)) continue;

        if (tipo === 'tradicion') {
            const comentarios = esReferenciaPrefacioTradicion(capitulo, versiculo)
                ? obtenerComentariosPrefacio(libro, capitulo)
                : obtenerComentarios(libro, capitulo, versiculo);
            const comentario = comentarios[idx];
            if (!comentario) continue;

            grupos.comentarios.push({
                libro,
                capitulo,
                versiculo,
                idx,
                prefacio: esReferenciaPrefacioTradicion(capitulo, versiculo),
                autor: comentario.autor || 'Tradición',
                texto: comentario.texto || ''
            });
            continue;
        }

        if (tipo === 'personal') {
            const notas = obtenerNotasPersonales(libro, capitulo, versiculo);
            const nota = notas[idx];
            if (!nota) continue;

            grupos.notas.push({
                libro,
                capitulo,
                versiculo,
                idx,
                fecha: nota.fecha || '',
                texto: nota.texto || ''
            });
        }
    }

    grupos.versiculos.sort(compararFavoritosPorOrdenBiblico);
    grupos.comentarios.sort(compararFavoritosPorOrdenBiblico);
    grupos.notas.sort(compararFavoritosPorOrdenBiblico);

    return grupos;
}

function configurarEntradaPanelFavoritos(entrada, onOpen) {
    entrada.setAttribute('role', 'button');
    entrada.tabIndex = 0;
    entrada.addEventListener('click', onOpen);
    entrada.addEventListener('keydown', (event) => {
        if (event.target !== entrada) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onOpen();
        }
    });
}

function crearBotonFavoritoVersiculo(item) {
    const entrada = document.createElement('div');
    const referencia = formatearReferenciaCompartida(item.libro, item.capitulo, item.versiculo);
    const favorito = esFavoritoVersiculo(item.libro, item.capitulo, item.versiculo);
    const accionFavorito = favorito ? 'Quitar de favoritos' : 'Agregar a favoritos';
    const identificadorFavorito = obtenerIdentificadorFavoritoVersiculo(item.libro, item.capitulo, item.versiculo);

    entrada.className = 'favorito-entrada favorito-item favorito-item-versiculo';
    entrada.innerHTML = `
        <div class="favorito-entrada-superior">
            <div class="favorito-entrada-contenido">
                <div class="favorito-entrada-cabecera">
                    <i class="fas fa-bible favorito-entrada-icono" aria-hidden="true"></i>
                    <span class="favorito-entrada-ref">${escapeHtml(referencia)}</span>
                </div>
                <p class="favorito-entrada-texto">${escapeHtml(truncarTextoFavorito(item.texto))}</p>
            </div>
            <button
                type="button"
                data-favorito-versiculo="${identificadorFavorito}"
                class="favorito-entrada-fav estrella-fav ${favorito ? 'activa' : ''}"
                title="${accionFavorito}"
                aria-label="${accionFavorito} ${escapeHtml(referencia)}"
                aria-pressed="${favorito ? 'true' : 'false'}">${favorito ? '★' : '☆'}</button>
        </div>
    `;
    configurarEntradaPanelFavoritos(entrada, () => {
        cerrarPanel('panel-favoritos');
        irAVersiculo(item.libro, item.capitulo, item.versiculo);
    });

    const botonFavorito = entrada.querySelector('[data-favorito-versiculo]');
    botonFavorito?.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleFavoritoVersiculo(item.libro, item.capitulo, item.versiculo);
    });

    return entrada;
}

function abrirFavoritoAnotacion(libro, capitulo, versiculo, tipo, idx, opciones = {}) {
    cerrarPanel('panel-busqueda');
    cerrarPanel('panel-favoritos');

    if (tipo === 'tradicion' && esReferenciaPrefacioTradicion(capitulo, versiculo)) {
        abrirPrefacio(libro, capitulo, opciones);
        return;
    }

    const esBusqueda = opciones?.origen === 'busqueda';
    irAVersiculo(
        libro,
        capitulo,
        versiculo,
        esBusqueda ? 'busqueda' : '',
        opciones?.terminoBusqueda || ''
    );
    setTimeout(() => {
        abrirPanel(
            libro,
            capitulo,
            versiculo,
            bibleContent[libro]?.[capitulo]?.[versiculo] || "",
            {
                tipoLlegada: tipo,
                idxLlegada: idx,
                terminoBusqueda: opciones?.terminoBusqueda || ''
            }
        );
    }, 200);
}

function crearBotonFavoritoComentario(item) {
    const referencia = item.prefacio
        ? formatearReferenciaPrefacio(item.libro, item.capitulo)
        : formatearReferenciaComentarioTradicion(item.libro, item.capitulo, item.versiculo);
    const favorito = esFavoritoComentario(item.libro, item.capitulo, item.versiculo, 'tradicion', item.idx);
    const accionFavorito = favorito ? 'Quitar de favoritos' : 'Agregar a favoritos';
    const identificadorFavorito = obtenerIdentificadorFavoritoComentario(item.libro, item.capitulo, item.versiculo, 'tradicion', item.idx);
    const entrada = document.createElement('div');

    entrada.className = 'favorito-entrada favorito-item';
    entrada.innerHTML = `
        <div class="favorito-entrada-superior">
            <div class="favorito-entrada-contenido">
                <div class="favorito-entrada-cabecera">
                    <i class="fas fa-comment-dots favorito-entrada-icono" aria-hidden="true"></i>
                    <span class="favorito-entrada-ref">${escapeHtml(referencia)}</span>
                </div>
                <p class="favorito-entrada-meta">${escapeHtml(item.autor)}</p>
                <p class="favorito-entrada-texto">"${escapeHtml(truncarTextoFavorito(item.texto))}"</p>
            </div>
            <button
                type="button"
                data-favorito-comentario="${identificadorFavorito}"
                class="favorito-entrada-fav estrella-fav-comentario ${favorito ? 'activa' : ''}"
                title="${accionFavorito}"
                aria-label="${accionFavorito} comentario de ${escapeHtml(referencia)}"
                aria-pressed="${favorito ? 'true' : 'false'}"><i class="fas fa-star"></i></button>
        </div>
    `;
    configurarEntradaPanelFavoritos(entrada, () => abrirFavoritoAnotacion(item.libro, item.capitulo, item.versiculo, 'tradicion', item.idx));

    const botonFavorito = entrada.querySelector('[data-favorito-comentario]');
    botonFavorito?.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleFavoritoComentario(item.libro, item.capitulo, item.versiculo, 'tradicion', item.idx);
    });

    return entrada;
}

function crearBotonFavoritoNota(item) {
    const referencia = formatearReferenciaCompartida(item.libro, item.capitulo, item.versiculo);
    const favorito = esFavoritoComentario(item.libro, item.capitulo, item.versiculo, 'personal', item.idx);
    const accionFavorito = favorito ? 'Quitar de favoritos' : 'Agregar a favoritos';
    const identificadorFavorito = obtenerIdentificadorFavoritoComentario(item.libro, item.capitulo, item.versiculo, 'personal', item.idx);
    const entrada = document.createElement('div');

    entrada.className = 'favorito-entrada favorito-item';
    entrada.innerHTML = `
        <div class="favorito-entrada-superior">
            <div class="favorito-entrada-contenido">
                <div class="favorito-entrada-cabecera">
                    <i class="fas fa-pen favorito-entrada-icono" aria-hidden="true"></i>
                    <span class="favorito-entrada-ref">${escapeHtml(referencia)}</span>
                </div>
                ${item.fecha ? `<p class="favorito-entrada-meta">${escapeHtml(item.fecha)}</p>` : ''}
                <p class="favorito-entrada-texto">${escapeHtml(truncarTextoFavorito(item.texto))}</p>
            </div>
            <button
                type="button"
                data-favorito-comentario="${identificadorFavorito}"
                class="favorito-entrada-fav estrella-fav-comentario ${favorito ? 'activa' : ''}"
                title="${accionFavorito}"
                aria-label="${accionFavorito} nota de ${escapeHtml(referencia)}"
                aria-pressed="${favorito ? 'true' : 'false'}"><i class="fas fa-star"></i></button>
        </div>
    `;
    configurarEntradaPanelFavoritos(entrada, () => abrirFavoritoAnotacion(item.libro, item.capitulo, item.versiculo, 'personal', item.idx));

    const botonFavorito = entrada.querySelector('[data-favorito-comentario]');
    botonFavorito?.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleFavoritoComentario(item.libro, item.capitulo, item.versiculo, 'personal', item.idx);
    });

    return entrada;
}

function crearSeccionPanel(claseBase, estadoStore, clave, titulo, icono, items, crearItem, mensajeVacio) {
    const seccion = document.createElement('section');
    seccion.className = `${claseBase}-seccion`;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = `${claseBase}-seccion-toggle`;

    const contenido = document.createElement('div');
    contenido.className = `${claseBase}-seccion-contenido`;

    const sincronizar = () => {
        const expandida = estadoStore[clave] !== false;
        toggle.setAttribute('aria-expanded', expandida ? 'true' : 'false');
        contenido.hidden = !expandida;
        seccion.classList.toggle('seccion-expandida', expandida);
    };

    toggle.innerHTML = `
        <span class="${claseBase}-seccion-etiqueta">
            <span class="${claseBase}-seccion-icono" aria-hidden="true"><i class="fas ${icono}"></i></span>
            <span>${titulo}</span>
        </span>
        <span class="${claseBase}-seccion-meta">
            <span class="${claseBase}-seccion-count">${items.length}</span>
            <i class="fas fa-chevron-down ${claseBase}-seccion-chevron" aria-hidden="true"></i>
        </span>
    `;
    toggle.onclick = () => {
        estadoStore[clave] = !(estadoStore[clave] !== false);
        sincronizar();
    };

    if (items.length === 0) {
        contenido.innerHTML = `<div class="${claseBase}-seccion-vacio">${mensajeVacio}</div>`;
    } else {
        const lista = document.createElement('div');
        lista.className = `${claseBase}-seccion-lista`;
        items.forEach(item => lista.appendChild(crearItem(item)));
        contenido.appendChild(lista);
    }

    sincronizar();
    seccion.appendChild(toggle);
    seccion.appendChild(contenido);
    return seccion;
}

function crearSeccionFavoritos(clave, titulo, icono, items, crearItem, mensajeVacio) {
    return crearSeccionPanel('favoritos', estadoSeccionesFavoritos, clave, titulo, icono, items, crearItem, mensajeVacio);
}

function crearSeccionBusqueda(clave, titulo, icono, items, crearItem, mensajeVacio) {
    return crearSeccionPanel('busqueda', estadoSeccionesBusqueda, clave, titulo, icono, items, crearItem, mensajeVacio);
}

function actualizarTabsPanelGuardados() {
    const tabFavoritos = document.getElementById('tab-guardados-favoritos');
    const tabColecciones = document.getElementById('tab-guardados-colecciones');
    const contenidoFavoritos = document.getElementById('contenido-favoritos-guardados');
    const contenidoColecciones = document.getElementById('contenido-colecciones-guardados');
    const enFavoritos = panelGuardadosTabActiva !== 'colecciones';

    if (tabFavoritos) {
        tabFavoritos.classList.toggle('activa', enFavoritos);
        tabFavoritos.setAttribute('aria-selected', enFavoritos ? 'true' : 'false');
    }

    if (tabColecciones) {
        tabColecciones.classList.toggle('activa', !enFavoritos);
        tabColecciones.setAttribute('aria-selected', !enFavoritos ? 'true' : 'false');
    }

    if (contenidoFavoritos) contenidoFavoritos.classList.toggle('hidden', !enFavoritos);
    if (contenidoColecciones) contenidoColecciones.classList.toggle('hidden', enFavoritos);
}

function renderizarPanelFavoritosGuardados() {
    const listaDiv = document.getElementById('lista-favoritos');
    if (!listaDiv) return;

    const favoritosClasificados = obtenerFavoritosClasificados();
    const totalFavoritos = favoritosClasificados.versiculos.length
        + favoritosClasificados.comentarios.length
        + favoritosClasificados.notas.length;

    listaDiv.innerHTML = "";

    if (totalFavoritos === 0) {
        listaDiv.innerHTML = '<div class="favoritos-vacio-global text-gray-400 italic text-center py-8">No tienes favoritos aún.<br>Puedes marcar versículos, comentarios y notas como favoritos.</div>';
        abrirPanelLateral('panel-favoritos');
        return;
    }

    listaDiv.appendChild(
        crearSeccionFavoritos(
            'versiculos',
            'Versículos',
            'fa-bible',
            favoritosClasificados.versiculos,
            crearBotonFavoritoVersiculo,
            'Todavía no guardaste versículos en favoritos.'
        )
    );

    listaDiv.appendChild(
        crearSeccionFavoritos(
            'comentarios',
            'Comentarios',
            'fa-comment-dots',
            favoritosClasificados.comentarios,
            crearBotonFavoritoComentario,
            'Todavía no guardaste comentarios en favoritos.'
        )
    );

    listaDiv.appendChild(
        crearSeccionFavoritos(
            'notas',
            'Notas',
            'fa-pen',
            favoritosClasificados.notas,
            crearBotonFavoritoNota,
            'Todavía no guardaste notas en favoritos.'
        )
    );
}

function obtenerVistaPreviaColeccion(coleccion, limite = 3) {
    return obtenerVersiculosColeccionOrdenados(coleccion)
        .slice(0, limite)
        .map(item => formatearReferenciaCompartida(item.libro, item.capitulo, item.versiculo));
}

function crearBotonAccionColeccion(icono, titulo, detalle, onClick, claseExtra = '') {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = `coleccion-detalle-toolbar-btn ${claseExtra}`.trim();
    boton.innerHTML = `
        <span class="coleccion-detalle-toolbar-btn-icono" aria-hidden="true">
            <i class="fas ${icono}"></i>
        </span>
        <span class="coleccion-detalle-toolbar-btn-copy">
            <span class="coleccion-detalle-toolbar-btn-titulo">${escapeHtml(titulo)}</span>
            <span class="coleccion-detalle-toolbar-btn-meta">${escapeHtml(detalle)}</span>
        </span>
    `;
    boton.addEventListener('click', onClick);
    return boton;
}

function crearTarjetaColeccion(coleccion) {
    const tarjeta = document.createElement('button');
    tarjeta.type = 'button';
    tarjeta.className = 'coleccion-card';

    const vistaPrevia = obtenerVistaPreviaColeccion(coleccion);
    tarjeta.innerHTML = `
        <div class="coleccion-card-superior">
            <div class="coleccion-card-titulo-wrap">
                <p class="coleccion-card-titulo">${escapeHtml(coleccion.nombre)}</p>
                <p class="coleccion-card-meta">Actualizada ${escapeHtml(formatearFechaColeccion(coleccion.updatedAt || coleccion.createdAt) || 'recién')}</p>
            </div>
            <span class="coleccion-card-cantidad">${coleccion.versiculos.length}</span>
        </div>
        <div class="coleccion-card-preview">
            ${vistaPrevia.length > 0
            ? vistaPrevia.map(item => `<span class="coleccion-card-chip"><i class="fas fa-book-open" aria-hidden="true"></i>${escapeHtml(item)}</span>`).join('')
            : '<span class="coleccion-card-chip"><i class="fas fa-feather-alt" aria-hidden="true"></i>Colección vacía</span>'}
        </div>
    `;

    tarjeta.addEventListener('click', () => mostrarPanelColecciones(coleccion.id));
    return tarjeta;
}

function renderizarDetalleColeccion(coleccion, contenedor) {
    const accionPdfEsCompartir = usarCompartirNativoParaPdf();
    const toolbar = document.createElement('div');
    toolbar.className = 'coleccion-detalle-toolbar';

    const botonVolver = document.createElement('button');
    botonVolver.type = 'button';
    botonVolver.className = 'coleccion-detalle-back';
    botonVolver.innerHTML = '<i class="fas fa-arrow-left" aria-hidden="true"></i><span>Colecciones</span>';
    botonVolver.addEventListener('click', () => mostrarPanelColecciones());
    toolbar.appendChild(botonVolver);
    contenedor.appendChild(toolbar);

    const hero = document.createElement('section');
    hero.className = 'coleccion-detalle-hero';
    const usaOrdenManual = coleccionUsaOrdenManual(coleccion);
    hero.innerHTML = `
        <p class="coleccion-detalle-eyebrow">Colección de versículos</p>
        <h3 class="coleccion-detalle-titulo">${escapeHtml(coleccion.nombre)}</h3>
        <p class="coleccion-detalle-meta">${coleccion.versiculos.length} versículo${coleccion.versiculos.length === 1 ? '' : 's'} guardado${coleccion.versiculos.length === 1 ? '' : 's'} · Actualizada ${escapeHtml(formatearFechaColeccion(coleccion.updatedAt || coleccion.createdAt) || 'recién')}</p>
        <div class="coleccion-detalle-orden">
            <span class="coleccion-detalle-orden-badge">${usaOrdenManual ? 'Orden manual' : 'Orden bíblico automático'}</span>
            <p class="coleccion-detalle-orden-texto">${usaOrdenManual
            ? 'Las flechas están marcando la secuencia. Si querés, podés volver al orden bíblico desde la barra superior.'
            : 'Los versículos se acomodan solos según su aparición en la Biblia. Si querés afinar el recorrido, usá las flechas.'}</p>
        </div>
    `;
    contenedor.appendChild(hero);

    const accionesPanel = document.createElement('section');
    accionesPanel.className = 'coleccion-detalle-acciones-panel';
    accionesPanel.innerHTML = `
        <p class="coleccion-detalle-acciones-eyebrow">Herramientas</p>
        <p class="coleccion-detalle-acciones-texto">Organizá, compartí o exportá esta colección desde un solo lugar.</p>
    `;

    const acciones = document.createElement('div');
    acciones.className = 'coleccion-detalle-toolbar-botones';

    acciones.appendChild(
        crearBotonAccionColeccion(
            'fa-pen',
            'Renombrar',
            'Cambiá el nombre de la colección.',
            () => renombrarColeccionDesdePanel(coleccion.id)
        )
    );

    acciones.appendChild(
        crearBotonAccionColeccion(
            'fa-share-alt',
            'Compartir texto',
            'Copiá la colección en formato simple.',
            () => compartirColeccionComoTexto(coleccion.id)
        )
    );

    acciones.appendChild(
        crearBotonAccionColeccion(
            'fa-file-pdf',
            accionPdfEsCompartir ? 'Compartir PDF' : 'Descargar PDF',
            accionPdfEsCompartir
                ? 'Compartí un PDF real de esta colección.'
                : 'Descargá un PDF real de esta colección.',
            () => exportarColeccionComoPDF(coleccion.id)
        )
    );

    if (usaOrdenManual) {
        acciones.appendChild(
            crearBotonAccionColeccion(
                'fa-list-ol',
                'Orden bíblico',
                'Volvé al orden automático de la Biblia.',
                () => {
                    const resultado = restablecerOrdenBiblicoColeccion(coleccion.id);
                    lanzarToast(resultado.mensaje);
                    refrescarPanelGuardadosSiVisible();
                }
            )
        );
    }

    const accionesPeligro = document.createElement('div');
    accionesPeligro.className = 'coleccion-detalle-toolbar-peligro';
    accionesPeligro.appendChild(
        crearBotonAccionColeccion(
            'fa-trash',
            'Eliminar colección',
            'Borrá esta colección completa del dispositivo.',
            () => eliminarColeccionDesdePanel(coleccion.id),
            'coleccion-detalle-toolbar-btn-peligro'
        )
    );

    accionesPanel.appendChild(acciones);
    accionesPanel.appendChild(accionesPeligro);
    contenedor.appendChild(accionesPanel);

    if (coleccion.versiculos.length === 0) {
        const vacio = document.createElement('div');
        vacio.className = 'coleccion-detalle-vacio py-10';
        vacio.innerHTML = 'Todavía no hay versículos en esta colección.<br>Podés sumarlos desde el botón <strong>+</strong> en la lectura.';
        contenedor.appendChild(vacio);
        return;
    }

    const lista = document.createElement('div');
    lista.className = 'coleccion-detalle-lista mt-3';

    const versiculosOrdenados = obtenerVersiculosColeccionOrdenados(coleccion);

    versiculosOrdenados.forEach((item, index) => {
        const entrada = document.createElement('article');
        entrada.className = 'coleccion-entrada';

        const botonPrincipal = document.createElement('button');
        botonPrincipal.type = 'button';
        botonPrincipal.className = 'coleccion-entrada-principal';
        botonPrincipal.innerHTML = `
            <p class="coleccion-entrada-ref">${escapeHtml(formatearReferenciaCompartida(item.libro, item.capitulo, item.versiculo))}</p>
            <p class="coleccion-entrada-texto">${escapeHtml(item.texto || '')}</p>
            <p class="coleccion-entrada-meta">${escapeHtml(formatearFechaColeccion(item.agregadoEn) || '')}</p>
        `;
        botonPrincipal.addEventListener('click', () => {
            cerrarPanel('panel-favoritos');
            irAVersiculo(item.libro, item.capitulo, item.versiculo);
        });

        const accionesEntrada = document.createElement('div');
        accionesEntrada.className = 'coleccion-entrada-acciones';

        const botonSubir = document.createElement('button');
        botonSubir.type = 'button';
        botonSubir.className = 'coleccion-entrada-mover';
        botonSubir.innerHTML = '<i class="fas fa-chevron-up" aria-hidden="true"></i>';
        botonSubir.disabled = index === 0;
        botonSubir.title = 'Mover hacia arriba';
        botonSubir.setAttribute('aria-label', `Mover ${formatearReferenciaCompartida(item.libro, item.capitulo, item.versiculo)} hacia arriba`);
        botonSubir.addEventListener('click', () => {
            const resultado = moverVersiculoEnColeccion(coleccion.id, item.libro, item.capitulo, item.versiculo, 'arriba');
            if (resultado.ok) {
                refrescarPanelGuardadosSiVisible();
            }
        });

        const botonBajar = document.createElement('button');
        botonBajar.type = 'button';
        botonBajar.className = 'coleccion-entrada-mover';
        botonBajar.innerHTML = '<i class="fas fa-chevron-down" aria-hidden="true"></i>';
        botonBajar.disabled = index === versiculosOrdenados.length - 1;
        botonBajar.title = 'Mover hacia abajo';
        botonBajar.setAttribute('aria-label', `Mover ${formatearReferenciaCompartida(item.libro, item.capitulo, item.versiculo)} hacia abajo`);
        botonBajar.addEventListener('click', () => {
            const resultado = moverVersiculoEnColeccion(coleccion.id, item.libro, item.capitulo, item.versiculo, 'abajo');
            if (resultado.ok) {
                refrescarPanelGuardadosSiVisible();
            }
        });

        const botonQuitar = document.createElement('button');
        botonQuitar.type = 'button';
        botonQuitar.className = 'coleccion-entrada-remove';
        botonQuitar.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
        botonQuitar.setAttribute('aria-label', `Quitar ${formatearReferenciaCompartida(item.libro, item.capitulo, item.versiculo)} de ${coleccion.nombre}`);
        botonQuitar.addEventListener('click', () => {
            if (quitarVersiculoDeColeccion(coleccion.id, item.libro, item.capitulo, item.versiculo)) {
                lanzarToast(`Quitado de "${coleccion.nombre}"`);
                refrescarPanelGuardadosSiVisible();
            }
        });

        entrada.appendChild(botonPrincipal);
        accionesEntrada.appendChild(botonSubir);
        accionesEntrada.appendChild(botonBajar);
        accionesEntrada.appendChild(botonQuitar);
        entrada.appendChild(accionesEntrada);
        lista.appendChild(entrada);
    });

    contenedor.appendChild(lista);
}

function renderizarPanelColeccionesGuardados() {
    const listaDiv = document.getElementById('lista-colecciones');
    if (!listaDiv) return;

    listaDiv.innerHTML = '';

    if (coleccionAbiertaPanelId) {
        const coleccion = obtenerColeccionVersiculosPorId(coleccionAbiertaPanelId);
        if (!coleccion) {
            coleccionAbiertaPanelId = null;
            renderizarPanelColeccionesGuardados();
            return;
        }

        renderizarDetalleColeccion(coleccion, listaDiv);
        return;
    }

    const hero = document.createElement('section');
    hero.className = 'panel-colecciones-hero';
    hero.innerHTML = `
        <div class="panel-colecciones-hero-copy">
            <p class="panel-colecciones-hero-eyebrow">Por tema, curso o retiro</p>
            <h3 class="panel-colecciones-hero-titulo">Armá tus colecciones</h3>
            <p class="panel-colecciones-hero-texto">Guardá versículos por tema para no mezclar Iglesia, Pascua, sacramentos o el encuentro que estés preparando.</p>
        </div>
    `;

    const botonNueva = document.createElement('button');
    botonNueva.type = 'button';
    botonNueva.className = 'panel-colecciones-cta';
    botonNueva.innerHTML = '<i class="fas fa-plus" aria-hidden="true"></i><span>Nueva</span>';
    botonNueva.addEventListener('click', abrirModalNuevaColeccion);
    hero.appendChild(botonNueva);
    listaDiv.appendChild(hero);

    const colecciones = obtenerColeccionesVersiculosOrdenadas();

    if (colecciones.length === 0) {
        const vacio = document.createElement('div');
        vacio.className = 'colecciones-vacio-global py-10';
        vacio.innerHTML = 'Todavía no creaste colecciones.<br>Usá el botón <strong>+</strong> en un versículo para empezar.';
        listaDiv.appendChild(vacio);
        return;
    }

    colecciones.forEach(coleccion => listaDiv.appendChild(crearTarjetaColeccion(coleccion)));
}

function abrirPanelGuardados() {
    if (panelGuardadosTabActiva === 'colecciones') {
        renderizarPanelColeccionesGuardados();
    } else {
        renderizarPanelFavoritosGuardados();
    }

    actualizarTabsPanelGuardados();
    abrirPanelLateral('panel-favoritos');
}

function mostrarPanelFavoritos() {
    panelGuardadosTabActiva = 'favoritos';
    actualizarTabsPanelGuardados();
    renderizarPanelFavoritosGuardados();
    abrirPanelLateral('panel-favoritos');
}

function mostrarPanelColecciones(coleccionId = null) {
    panelGuardadosTabActiva = 'colecciones';
    coleccionAbiertaPanelId = coleccionId;
    actualizarTabsPanelGuardados();
    renderizarPanelColeccionesGuardados();
    abrirPanelLateral('panel-favoritos');
}

function refrescarPanelGuardadosSiVisible() {
    const panel = document.getElementById('panel-favoritos');
    if (!panel || panel.classList.contains('translate-x-full')) return;

    if (panelGuardadosTabActiva === 'colecciones') {
        renderizarPanelColeccionesGuardados();
    } else {
        renderizarPanelFavoritosGuardados();
    }

    actualizarTabsPanelGuardados();
}

function obtenerColeccionesParaModal() {
    const colecciones = obtenerColeccionesVersiculosOrdenadas();
    if (!ultimaColeccionVersiculosId) return colecciones;

    return colecciones.sort((a, b) => {
        if (a.id === ultimaColeccionVersiculosId) return -1;
        if (b.id === ultimaColeccionVersiculosId) return 1;
        return 0;
    });
}

function renderizarModalColecciones() {
    const modal = document.getElementById('modal-colecciones');
    const etiqueta = document.getElementById('coleccion-modal-etiqueta');
    const titulo = document.getElementById('coleccion-modal-titulo');
    const subtitulo = document.getElementById('coleccion-modal-subtitulo');
    const bloqueContexto = document.getElementById('coleccion-modal-contexto');
    const referencia = document.getElementById('coleccion-modal-referencia');
    const texto = document.getElementById('coleccion-modal-texto');
    const bloqueOpciones = document.getElementById('bloque-opciones-colecciones-modal');
    const estado = document.getElementById('estado-colecciones-modal');
    const lista = document.getElementById('lista-colecciones-modal');
    const input = document.getElementById('input-nueva-coleccion');
    const botonCrear = document.getElementById('btn-crear-coleccion-modal');
    if (!modal || !titulo || !subtitulo || !bloqueContexto || !referencia || !texto || !bloqueOpciones || !estado || !lista || !input || !botonCrear) return;

    const esAgregar = contextoModalColecciones?.modo === 'agregar';

    etiqueta.textContent = esAgregar ? 'Colecciones' : 'Nueva colección';
    titulo.textContent = esAgregar ? 'Agregar a colección' : 'Crear colección';
    subtitulo.textContent = esAgregar
        ? 'Elegí una colección existente o creá una nueva para este tema.'
        : 'Creá una colección temática para agrupar versículos.';
    botonCrear.textContent = esAgregar ? 'Crear y agregar' : 'Crear colección';
    input.value = '';
    lista.innerHTML = '';
    estado.classList.add('hidden');
    estado.textContent = '';
    bloqueContexto.classList.toggle('hidden', !esAgregar);
    bloqueOpciones.classList.toggle('hidden', !esAgregar);

    if (esAgregar && contextoModalColecciones?.versiculo) {
        const item = contextoModalColecciones.versiculo;
        referencia.textContent = formatearReferenciaCompartida(item.libro, item.capitulo, item.versiculo);
        texto.textContent = item.texto || '';

        const colecciones = obtenerColeccionesParaModal();
        if (colecciones.length === 0) {
            estado.classList.remove('hidden');
            estado.textContent = 'Todavía no tenés colecciones. Creá una y la usamos enseguida.';
        } else {
            colecciones.forEach(coleccion => {
                const yaExiste = coleccionTieneVersiculo(coleccion, item.libro, item.capitulo, item.versiculo);
                const opcion = document.createElement('button');
                opcion.type = 'button';
                opcion.className = 'coleccion-modal-opcion';
                opcion.disabled = yaExiste;
                opcion.innerHTML = `
                    <span class="coleccion-modal-opcion-principal">
                        <span class="coleccion-modal-opcion-titulo">${escapeHtml(coleccion.nombre)}</span>
                        <span class="coleccion-modal-opcion-meta">${coleccion.versiculos.length} versículo${coleccion.versiculos.length === 1 ? '' : 's'}</span>
                    </span>
                    <span class="coleccion-modal-opcion-estado">${yaExiste ? 'Ya está' : (coleccion.id === ultimaColeccionVersiculosId ? 'Última' : 'Agregar')}</span>
                `;
                opcion.addEventListener('click', () => agregarVersiculoPendienteAColeccion(coleccion.id));
                lista.appendChild(opcion);
            });
        }
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('modal-colecciones-abierta');
    requestAnimationFrame(() => input.focus());
}

function abrirModalAgregarVersiculoAColeccion(libro, capitulo, versiculo, texto) {
    contextoModalColecciones = {
        modo: 'agregar',
        versiculo: {
            libro,
            capitulo,
            versiculo,
            texto: String(texto || '').trim()
        }
    };
    renderizarModalColecciones();
}

function abrirModalNuevaColeccion() {
    contextoModalColecciones = { modo: 'crear' };
    renderizarModalColecciones();
}

function cerrarModalColecciones() {
    const modal = document.getElementById('modal-colecciones');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('modal-colecciones-abierta');
    contextoModalColecciones = null;
}

function agregarVersiculoPendienteAColeccion(coleccionId) {
    if (contextoModalColecciones?.modo !== 'agregar' || !contextoModalColecciones.versiculo) return;

    const item = contextoModalColecciones.versiculo;
    const resultado = agregarVersiculoAColeccion(coleccionId, item.libro, item.capitulo, item.versiculo, item.texto);
    lanzarToast(resultado.mensaje);
    refrescarPanelGuardadosSiVisible();

    if (resultado.agregado || resultado.duplicado) {
        cerrarModalColecciones();
        if (resultado.coleccion?.id) {
            mostrarPanelColecciones(resultado.coleccion.id);
        }
    } else {
        renderizarModalColecciones();
    }
}

function crearColeccionDesdeModal() {
    const input = document.getElementById('input-nueva-coleccion');
    if (!input) return;

    const resultado = crearColeccionVersiculos(input.value);

    if (!resultado.coleccion) {
        lanzarToast(resultado.mensaje);
        input.focus();
        return;
    }

    if (contextoModalColecciones?.modo === 'agregar') {
        agregarVersiculoPendienteAColeccion(resultado.coleccion.id);
        return;
    }

    cerrarModalColecciones();
    lanzarToast(resultado.mensaje);
    mostrarPanelColecciones(resultado.coleccion.id);
}

function renombrarColeccionDesdePanel(coleccionId) {
    const coleccion = obtenerColeccionVersiculosPorId(coleccionId);
    if (!coleccion) return;

    const nuevoNombre = window.prompt('Nuevo nombre para la colección:', coleccion.nombre);
    if (nuevoNombre === null) return;

    const resultado = renombrarColeccionVersiculos(coleccionId, nuevoNombre);
    lanzarToast(resultado.mensaje);

    if (!resultado.ok) return;

    refrescarPanelGuardadosSiVisible();
    if (panelGuardadosTabActiva === 'colecciones') {
        renderizarPanelColeccionesGuardados();
    }
}

function eliminarColeccionDesdePanel(coleccionId) {
    const coleccion = obtenerColeccionVersiculosPorId(coleccionId);
    if (!coleccion) return;

    const confirmar = window.confirm(`¿Eliminar la colección "${coleccion.nombre}"?`);
    if (!confirmar) return;

    if (eliminarColeccionVersiculos(coleccionId)) {
        if (coleccionAbiertaPanelId === coleccionId) {
            coleccionAbiertaPanelId = null;
        }
        lanzarToast(`Colección "${coleccion.nombre}" eliminada`);
        refrescarPanelGuardadosSiVisible();
        if (panelGuardadosTabActiva === 'colecciones') {
            renderizarPanelColeccionesGuardados();
        }
    }
}

function esLibroEvangelio(libro) {
    return EVANGELIOS_CELEBRACION.includes(libro);
}

function obtenerLectioDivinaPorId(id) {
    return lectioDivinaRegistros.find(registro => registro.id === id) || null;
}

function obtenerLectioDivinaOrdenadas() {
    return [...lectioDivinaRegistros].sort((a, b) => {
        const fechaA = Date.parse(a.updatedAt || a.createdAt || 0) || 0;
        const fechaB = Date.parse(b.updatedAt || b.createdAt || 0) || 0;
        return fechaB - fechaA;
    });
}

function formatearReferenciaLectio(libro, capitulo, desde, hasta) {
    return Number(desde) === Number(hasta)
        ? `${libro} ${capitulo},${desde}`
        : `${libro} ${capitulo},${desde}-${hasta}`;
}

function formatearFechaLectio(fechaIso) {
    if (!fechaIso) return '';
    const fecha = new Date(fechaIso);
    if (Number.isNaN(fecha.getTime())) return '';
    return fecha.toLocaleString('es-AR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function obtenerPasajeLectio(libro, capitulo, desde, hasta) {
    const versiculos = obtenerVersiculosLeiblesCapitulo(libro, capitulo)
        .filter(versiculo => versiculo >= desde && versiculo <= hasta);

    return versiculos.map(versiculo => ({
        versiculo,
        texto: String(bibleContent[libro]?.[capitulo]?.[versiculo] || '').trim()
    })).filter(item => item.texto);
}

function obtenerTextoPlanoPasajeLectio(libro, capitulo, desde, hasta) {
    return obtenerPasajeLectio(libro, capitulo, desde, hasta)
        .map(item => item.texto)
        .join(' ');
}

function obtenerContextoInicialLectio() {
    const primerLibro = obtenerTodosLosLibros()[0]?.nombre || 'Génesis';
    const libro = libroActual || primerLibro;
    const capitulos = obtenerListaCapitulos(libro);
    const capitulo = capitulos.includes(capituloActual) ? capituloActual : capitulos[0];
    const versiculos = obtenerVersiculosLeiblesCapitulo(libro, capitulo);
    const desde = versiculos[0] || 1;
    const hasta = versiculos[Math.min(versiculos.length - 1, 4)] || desde;

    return { libro, capitulo, desde, hasta };
}

function poblarSelectorLectioLibro(libroSeleccionado) {
    const selector = document.getElementById('selector-lectio-libro');
    if (!selector) return;

    const opciones = obtenerTodosLosLibros()
        .map(libro => `<option value="${escapeHtml(libro.nombre)}">${escapeHtml(libro.nombre)}</option>`)
        .join('');
    selector.innerHTML = opciones;
    selector.value = libroSeleccionado;
}

function poblarSelectorLectioCapitulo(libro, capituloSeleccionado) {
    const selector = document.getElementById('selector-lectio-capitulo');
    if (!selector) return;

    const capitulos = obtenerListaCapitulos(libro);
    selector.innerHTML = capitulos
        .map(capitulo => `<option value="${capitulo}">${capitulo}</option>`)
        .join('');
    selector.value = String(capitulos.includes(Number(capituloSeleccionado)) ? Number(capituloSeleccionado) : capitulos[0]);
}

function poblarSelectoresLectioVersiculos(libro, capitulo, desdeSeleccionado = null, hastaSeleccionado = null) {
    const selectorDesde = document.getElementById('selector-lectio-desde');
    const selectorHasta = document.getElementById('selector-lectio-hasta');
    if (!selectorDesde || !selectorHasta) return;

    const versiculos = obtenerVersiculosLeiblesCapitulo(libro, capitulo);
    if (versiculos.length === 0) {
        selectorDesde.innerHTML = '';
        selectorHasta.innerHTML = '';
        return;
    }

    const desde = versiculos.includes(Number(desdeSeleccionado)) ? Number(desdeSeleccionado) : versiculos[0];
    selectorDesde.innerHTML = versiculos
        .map(versiculo => `<option value="${versiculo}">${versiculo}</option>`)
        .join('');
    selectorDesde.value = String(desde);

    const versiculosHasta = versiculos.filter(versiculo => versiculo >= desde);
    const indiceDefaultHasta = Math.min(versiculosHasta.length - 1, 4);
    const hasta = versiculosHasta.includes(Number(hastaSeleccionado))
        ? Number(hastaSeleccionado)
        : (versiculosHasta[indiceDefaultHasta] || desde);

    selectorHasta.innerHTML = versiculosHasta
        .map(versiculo => `<option value="${versiculo}">${versiculo}</option>`)
        .join('');
    selectorHasta.value = String(hasta);
}

function aplicarSeleccionLectio(libro, capitulo, desde, hasta) {
    const libros = obtenerTodosLosLibros().map(item => item.nombre);
    const libroValido = libros.includes(libro) ? libro : (libros[0] || 'Génesis');
    const capitulos = obtenerListaCapitulos(libroValido);
    const capituloValido = capitulos.includes(Number(capitulo)) ? Number(capitulo) : capitulos[0];

    poblarSelectorLectioLibro(libroValido);
    poblarSelectorLectioCapitulo(libroValido, capituloValido);
    poblarSelectoresLectioVersiculos(libroValido, capituloValido, desde, hasta);
    actualizarAyudaPasajeLectio();
}

function obtenerSeleccionLectioActual() {
    const libro = document.getElementById('selector-lectio-libro')?.value || '';
    const capitulo = Number(document.getElementById('selector-lectio-capitulo')?.value);
    const desde = Number(document.getElementById('selector-lectio-desde')?.value);
    const hasta = Number(document.getElementById('selector-lectio-hasta')?.value);

    return { libro, capitulo, desde, hasta };
}

function actualizarAyudaPasajeLectio() {
    const ayuda = document.getElementById('lectio-ayuda-pasaje');
    if (!ayuda) return;

    const { libro, capitulo, desde, hasta } = obtenerSeleccionLectioActual();
    if (!libro || !Number.isFinite(capitulo) || !Number.isFinite(desde) || !Number.isFinite(hasta)) {
        ayuda.textContent = 'Elegí un pasaje para comenzar tu Lectio.';
        return;
    }

    const total = Math.max(1, hasta - desde + 1);
    ayuda.textContent = esLibroEvangelio(libro)
        ? `${formatearReferenciaLectio(libro, capitulo, desde, hasta)}`
        : `${formatearReferenciaLectio(libro, capitulo, desde, hasta)} · ${total} versículo${total === 1 ? '' : 's'} para la lectura orante.`;
}

function renderizarPasajeLectioSeleccionado() {
    const tarjeta = document.getElementById('lectio-pasaje-card');
    const referencia = document.getElementById('lectio-pasaje-referencia');
    const texto = document.getElementById('lectio-pasaje-texto');
    const badge = document.getElementById('lectio-pasaje-badge');
    const botonAudio = document.getElementById('btn-escuchar-pasaje-lectio');
    if (!tarjeta || !referencia || !texto || !badge || !botonAudio) return false;

    if (btnAudioActivo === botonAudio && window.speechSynthesis.speaking) {
        detenerConRestauracion();
    }

    const { libro, capitulo, desde, hasta } = obtenerSeleccionLectioActual();
    const pasaje = obtenerPasajeLectio(libro, capitulo, desde, hasta);

    if (!libro || pasaje.length === 0) {
        delete tarjeta.dataset.libro;
        delete tarjeta.dataset.capitulo;
        delete tarjeta.dataset.desde;
        delete tarjeta.dataset.hasta;
        tarjeta.classList.add('hidden');
        badge.classList.add('hidden');
        badge.hidden = true;
        return false;
    }

    referencia.textContent = formatearReferenciaLectio(libro, capitulo, desde, hasta);
    badge.classList.remove('hidden');
    badge.hidden = false;
    badge.textContent = esLibroEvangelio(libro) ? 'Evangelio · sin comentarios' : `${pasaje.length} versículo${pasaje.length === 1 ? '' : 's'}`;
    texto.innerHTML = `
        <div class="lectio-pasaje-lista">
            ${pasaje.map(item => `<p class="lectio-pasaje-versiculo" aria-label="Versículo ${item.versiculo}">${escapeHtml(item.texto)}</p>`).join('')}
        </div>
    `;
    tarjeta.dataset.libro = libro;
    tarjeta.dataset.capitulo = String(capitulo);
    tarjeta.dataset.desde = String(desde);
    tarjeta.dataset.hasta = String(hasta);
    if (btnAudioActivo !== botonAudio) {
        actualizarContenidoBotonAudioVersiculo(botonAudio, false);
    }
    tarjeta.classList.remove('hidden');
    actualizarAyudaPasajeLectio();
    return true;
}

function obtenerResumenLectio(registro) {
    const candidatos = [registro.leer, registro.meditar, registro.orar]
        .map(valor => String(valor || '').trim())
        .filter(Boolean);

    if (candidatos.length === 0) {
        return 'Sin texto todavía.';
    }

    return 'Tocá esta Lectio para abrir tus respuestas.';
}

function actualizarUIRegistroActivoLectio() {
    const banner = document.getElementById('lectio-registro-activo');
    const botonGuardar = document.getElementById('btn-guardar-lectio');
    if (!banner || !botonGuardar) return;

    const registro = lectioRegistroActivoId ? obtenerLectioDivinaPorId(lectioRegistroActivoId) : null;
    if (!registro) {
        banner.classList.add('hidden');
        banner.textContent = '';
        botonGuardar.textContent = 'Guardar Lectio';
        return;
    }

    banner.classList.remove('hidden');
    banner.textContent = `Editando ${formatearReferenciaLectio(registro.libro, registro.capitulo, registro.desde, registro.hasta)} · ${formatearFechaLectio(registro.updatedAt || registro.createdAt)}`;
    botonGuardar.textContent = 'Actualizar Lectio';
}

function actualizarBotonPdfLectioSegunDispositivo() {
    const boton = document.getElementById('btn-compartir-lectio-pdf');
    if (!boton) return;

    const compartir = usarCompartirNativoParaPdf();
    boton.innerHTML = `<i class="fas fa-file-pdf mr-2" aria-hidden="true"></i> ${compartir ? 'Compartir PDF' : 'Descargar PDF'}`;
    boton.setAttribute('aria-label', compartir ? 'Compartir PDF de la Lectio' : 'Descargar PDF de la Lectio');
    boton.setAttribute('title', compartir ? 'Compartir PDF de la Lectio' : 'Descargar PDF de la Lectio');
}

function renderizarListaLectioGuardadas() {
    const lista = document.getElementById('lista-lectio-guardadas');
    if (!lista) return;

    lista.innerHTML = '';
    const registros = obtenerLectioDivinaOrdenadas();

    if (registros.length === 0) {
        lista.innerHTML = '<div class="lectio-empty-state">Todavía no guardaste ninguna Lectio.<br>Cuando guardes una, va a aparecer acá tu cuaderno espiritual.</div>';
        return;
    }

    registros.forEach(registro => {
        const item = document.createElement('article');
        item.className = `lectio-registro-item ${lectioRegistroActivoId === registro.id ? 'activa' : ''}`;
        item.innerHTML = `
            <button type="button" class="lectio-registro-open">
                <p class="lectio-registro-ref">${escapeHtml(formatearReferenciaLectio(registro.libro, registro.capitulo, registro.desde, registro.hasta))}</p>
                <p class="lectio-registro-fecha">${escapeHtml(formatearFechaLectio(registro.updatedAt || registro.createdAt))}</p>
                <p class="lectio-registro-resumen">${escapeHtml(obtenerResumenLectio(registro))}</p>
            </button>
            <button type="button" class="lectio-registro-delete" aria-label="Eliminar Lectio guardada">
                <i class="fas fa-trash-alt" aria-hidden="true"></i>
            </button>
        `;

        item.querySelector('.lectio-registro-open')?.addEventListener('click', () => cargarLectioGuardada(registro.id));
        item.querySelector('.lectio-registro-delete')?.addEventListener('click', () => eliminarLectioGuardada(registro.id));
        lista.appendChild(item);
    });
}

function cargarLectioGuardada(registroId) {
    const registro = obtenerLectioDivinaPorId(registroId);
    if (!registro) return;

    aplicarSeleccionLectio(registro.libro, registro.capitulo, registro.desde, registro.hasta);
    renderizarPasajeLectioSeleccionado();
    document.getElementById('lectio-leer').value = registro.leer || '';
    document.getElementById('lectio-meditar').value = registro.meditar || '';
    document.getElementById('lectio-orar').value = registro.orar || '';
    lectioRegistroActivoId = registro.id;
    actualizarUIRegistroActivoLectio();
    renderizarListaLectioGuardadas();
    mostrarVista('vista-lectio');
}

function limpiarHojaLectio(mantenerPasaje = true) {
    document.getElementById('lectio-leer').value = '';
    document.getElementById('lectio-meditar').value = '';
    document.getElementById('lectio-orar').value = '';
    lectioRegistroActivoId = null;

    if (!mantenerPasaje) {
        const contexto = obtenerContextoInicialLectio();
        aplicarSeleccionLectio(contexto.libro, contexto.capitulo, contexto.desde, contexto.hasta);
        renderizarPasajeLectioSeleccionado();
    }

    actualizarUIRegistroActivoLectio();
    renderizarListaLectioGuardadas();
}

function guardarLectioActual() {
    const { libro, capitulo, desde, hasta } = obtenerSeleccionLectioActual();
    const leer = normalizarRespuestaLectio('leer', document.getElementById('lectio-leer')?.value || '');
    const meditar = normalizarRespuestaLectio('meditar', document.getElementById('lectio-meditar')?.value || '');
    const orar = normalizarRespuestaLectio('orar', document.getElementById('lectio-orar')?.value || '');

    if (!renderizarPasajeLectioSeleccionado()) {
        lanzarToast('Elegí primero un pasaje válido');
        return;
    }

    if (!leer && !meditar && !orar) {
        lanzarToast('Escribí al menos una nota antes de guardar la Lectio');
        return;
    }

    const ahora = new Date().toISOString();
    const registroExistente = lectioRegistroActivoId ? obtenerLectioDivinaPorId(lectioRegistroActivoId) : null;

    if (registroExistente) {
        registroExistente.libro = libro;
        registroExistente.capitulo = capitulo;
        registroExistente.desde = desde;
        registroExistente.hasta = hasta;
        registroExistente.leer = leer;
        registroExistente.meditar = meditar;
        registroExistente.orar = orar;
        registroExistente.updatedAt = ahora;
    } else {
        const nuevoRegistro = {
            id: generarIdLectioDivina(),
            libro,
            capitulo,
            desde,
            hasta,
            leer,
            meditar,
            orar,
            createdAt: ahora,
            updatedAt: ahora
        };
        lectioDivinaRegistros.unshift(nuevoRegistro);
        lectioRegistroActivoId = nuevoRegistro.id;
    }

    guardarLectioDivinaRegistros();
    document.getElementById('lectio-leer').value = leer;
    document.getElementById('lectio-meditar').value = meditar;
    document.getElementById('lectio-orar').value = orar;
    actualizarUIRegistroActivoLectio();
    renderizarListaLectioGuardadas();
    lanzarToast(registroExistente ? 'Lectio actualizada' : 'Lectio guardada');
}

function eliminarLectioGuardada(registroId) {
    const registro = obtenerLectioDivinaPorId(registroId);
    if (!registro) return;

    const confirmar = window.confirm(`¿Eliminar la Lectio de ${formatearReferenciaLectio(registro.libro, registro.capitulo, registro.desde, registro.hasta)}?`);
    if (!confirmar) return;

    lectioDivinaRegistros = lectioDivinaRegistros.filter(item => item.id !== registroId);
    if (lectioRegistroActivoId === registroId) {
        lectioRegistroActivoId = null;
    }

    guardarLectioDivinaRegistros();
    actualizarUIRegistroActivoLectio();
    renderizarListaLectioGuardadas();
    lanzarToast('Lectio eliminada');
}

function usarContextoActualEnLectio() {
    if (!libroActual || !capituloActual) {
        lanzarToast('Abrí antes un libro o capítulo para usarlo como punto de partida');
        return;
    }

    const versiculos = obtenerVersiculosLeiblesCapitulo(libroActual, capituloActual);
    if (versiculos.length === 0) {
        lanzarToast('Ese capítulo no tiene un pasaje leíble para la Lectio');
        return;
    }

    const desde = versiculos[0];
    const hasta = versiculos[Math.min(versiculos.length - 1, 4)] || desde;
    aplicarSeleccionLectio(libroActual, capituloActual, desde, hasta);
    renderizarPasajeLectioSeleccionado();
    lanzarToast('Pasaje tomado de tu lectura actual');
}

function inicializarLectioDivina() {
    const contexto = obtenerContextoInicialLectio();
    aplicarSeleccionLectio(contexto.libro, contexto.capitulo, contexto.desde, contexto.hasta);
    renderizarPasajeLectioSeleccionado();
    actualizarUIRegistroActivoLectio();
    renderizarListaLectioGuardadas();
}

function abrirLectioDivina() {
    if (!datosBibliaCargados) {
        lanzarToast('Esperá un instante mientras termina de cargar la Biblia');
        return;
    }

    const vistaActiva = document.querySelector('.vista:not(.hidden)');
    if (vistaActiva && vistaActiva.id !== 'vista-lectio') {
        vistaRetornoLectio = vistaActiva.id;
    }

    if (!document.getElementById('selector-lectio-libro')?.options.length) {
        inicializarLectioDivina();
    }

    renderizarListaLectioGuardadas();
    actualizarUIRegistroActivoLectio();
    renderizarPasajeLectioSeleccionado();
    mostrarVista('vista-lectio');
    cerrarPanelLumina();
}

function volverDesdeLectio() {
    const destino = vistaRetornoLectio && vistaRetornoLectio !== 'vista-lectio' ? vistaRetornoLectio : 'vista-libros';

    if (destino === 'vista-lectura' && libroActual && capituloActual) {
        abrirLectura(capituloActual);
        return;
    }

    if (destino === 'vista-capitulos' && libroActual) {
        abrirCapitulos(libroActual, obtenerCantidadCapitulos(libroActual));
        return;
    }

    irAlInicio();
}

// --------------------------------------------------------------
// 7. BÚSQUEDA
// --------------------------------------------------------------
let indiceBusqueda = [];
let terminoBusquedaActual = '';
const FILTRO_BUSQUEDA_TODOS = '__todos__';
const FILTRO_BUSQUEDA_EVANGELIO = '__evangelio__';
let filtroLibroBusquedaActual = FILTRO_BUSQUEDA_TODOS;

function normalizarTerminoBusqueda(termino) {
    return (termino || '').trim().replace(/\s+/g, ' ');
}

function normalizarFiltroLibroBusqueda(filtro) {
    const valor = String(filtro || '').trim();

    if (!valor || valor === FILTRO_BUSQUEDA_TODOS) return FILTRO_BUSQUEDA_TODOS;
    if (valor === FILTRO_BUSQUEDA_EVANGELIO) return FILTRO_BUSQUEDA_EVANGELIO;

    return ORDEN_LIBROS_BIBLICOS.has(valor) ? valor : FILTRO_BUSQUEDA_TODOS;
}

function obtenerEtiquetaFiltroLibroBusqueda(filtro = filtroLibroBusquedaActual) {
    const valorNormalizado = normalizarFiltroLibroBusqueda(filtro);
    if (valorNormalizado === FILTRO_BUSQUEDA_TODOS) return 'Toda la Biblia';
    if (valorNormalizado === FILTRO_BUSQUEDA_EVANGELIO) return 'Evangelio';
    return valorNormalizado;
}

function poblarSelectorFiltroLibroBusqueda() {
    const selector = document.getElementById('busqueda-filtro-libro');
    if (!selector) return;

    const valorActual = normalizarFiltroLibroBusqueda(selector.value || filtroLibroBusquedaActual);
    selector.innerHTML = '';

    const atajos = document.createElement('optgroup');
    atajos.label = 'Atajos';

    const opcionTodos = document.createElement('option');
    opcionTodos.value = FILTRO_BUSQUEDA_TODOS;
    opcionTodos.textContent = 'Toda la Biblia';
    atajos.appendChild(opcionTodos);

    const opcionEvangelio = document.createElement('option');
    opcionEvangelio.value = FILTRO_BUSQUEDA_EVANGELIO;
    opcionEvangelio.textContent = 'Evangelio';
    atajos.appendChild(opcionEvangelio);

    selector.appendChild(atajos);

    Object.entries(canonBiblico).forEach(([testamento, libros]) => {
        const grupo = document.createElement('optgroup');
        grupo.label = testamento;

        libros.forEach(libro => {
            const opcion = document.createElement('option');
            opcion.value = libro.nombre;
            opcion.textContent = libro.nombre;
            grupo.appendChild(opcion);
        });

        selector.appendChild(grupo);
    });

    filtroLibroBusquedaActual = valorActual;
    selector.value = valorActual;
}

function sincronizarSelectorFiltroLibroBusqueda() {
    const selector = document.getElementById('busqueda-filtro-libro');
    if (!selector) return;
    if (selector.value !== filtroLibroBusquedaActual) {
        selector.value = filtroLibroBusquedaActual;
    }
}

function coincideLibroConFiltroBusqueda(libro, filtro = filtroLibroBusquedaActual) {
    const valorNormalizado = normalizarFiltroLibroBusqueda(filtro);
    if (valorNormalizado === FILTRO_BUSQUEDA_TODOS) return true;
    if (valorNormalizado === FILTRO_BUSQUEDA_EVANGELIO) return EVANGELIOS_CELEBRACION.includes(libro);
    return libro === valorNormalizado;
}

function aplicarFiltroLibroBusqueda(items, filtro = filtroLibroBusquedaActual) {
    const valorNormalizado = normalizarFiltroLibroBusqueda(filtro);
    if (valorNormalizado === FILTRO_BUSQUEDA_TODOS) return items;
    return items.filter(item => coincideLibroConFiltroBusqueda(item.libro, valorNormalizado));
}

function obtenerTextoContadorBusqueda(termino, total, filtro = filtroLibroBusquedaActual, opciones = {}) {
    const terminoNormalizado = normalizarTerminoBusqueda(termino);
    const valorFiltro = normalizarFiltroLibroBusqueda(filtro);
    const sufijoFiltro = valorFiltro === FILTRO_BUSQUEDA_TODOS
        ? ''
        : ` en ${obtenerEtiquetaFiltroLibroBusqueda(valorFiltro)}`;
    const modoNotasSinTermino = opciones.modoNotasSinTermino === true;

    if (!terminoNormalizado) {
        if (modoNotasSinTermino) {
            const ubicacionNotas = valorFiltro === FILTRO_BUSQUEDA_TODOS
                ? 'en toda la Biblia'
                : `en ${obtenerEtiquetaFiltroLibroBusqueda(valorFiltro)}`;
            if (total === 0) {
                return `No hay notas guardadas ${ubicacionNotas}`;
            }
            return `${total} nota${total !== 1 ? 's' : ''} guardada${total !== 1 ? 's' : ''} ${ubicacionNotas}`;
        }
        return `Buscá una palabra o frase${sufijoFiltro}`;
    }

    return `${total} resultado${total !== 1 ? 's' : ''} para "${terminoNormalizado}"${sufijoFiltro}`;
}

function obtenerInputsBusquedaDisponibles() {
    return [
        document.getElementById('busqueda-input'),
        document.getElementById('busqueda-input-movil'),
        document.getElementById('busqueda-panel-input')
    ].filter(Boolean);
}

function obtenerTerminoBusquedaActual() {
    const busquedaPanel = document.getElementById('busqueda-panel-input');
    const busquedaDesktop = document.getElementById('busqueda-input');
    const busquedaMovil = document.getElementById('busqueda-input-movil');
    const candidatos = [
        busquedaPanel?.value,
        busquedaDesktop?.value,
        busquedaMovil?.value,
        terminoBusquedaActual
    ];

    for (const candidato of candidatos) {
        const termino = normalizarTerminoBusqueda(candidato);
        if (termino) return termino;
    }

    return '';
}

function sincronizarInputsBusqueda(valor, origen = null) {
    const siguienteValor = valor ?? '';
    obtenerInputsBusquedaDisponibles().forEach(input => {
        if (!input || input === origen) return;
        if (input.value !== siguienteValor) input.value = siguienteValor;
    });
    actualizarEstadoControlesBusqueda();
}

function actualizarEstadoControlesBusqueda() {
    const buscadorMovil = document.getElementById('buscador-movil');
    const btnBuscarMovil = document.getElementById('btn-buscar-movil');
    const btnLimpiarMovil = document.getElementById('btn-limpiar-busqueda-movil');
    const btnLimpiarPanel = document.getElementById('btn-limpiar-panel-busqueda');
    const busquedaMovil = document.getElementById('busqueda-input-movil');
    const busquedaPanel = document.getElementById('busqueda-panel-input');
    const hayFiltroActivo = normalizarFiltroLibroBusqueda(document.getElementById('busqueda-filtro-libro')?.value || filtroLibroBusquedaActual) !== FILTRO_BUSQUEDA_TODOS;

    if (btnBuscarMovil && buscadorMovil) {
        const expandido = !buscadorMovil.classList.contains('hidden');
        btnBuscarMovil.setAttribute('aria-expanded', expandido ? 'true' : 'false');
        btnBuscarMovil.classList.toggle('activo', expandido);
    }

    if (btnLimpiarMovil && busquedaMovil) {
        btnLimpiarMovil.hidden = !busquedaMovil.value.trim();
    }

    if (btnLimpiarPanel && busquedaPanel) {
        btnLimpiarPanel.hidden = !busquedaPanel.value.trim() && !hayFiltroActivo;
    }
}

function mostrarBuscadorMovil(mostrar) {
    const buscadorMovil = document.getElementById('buscador-movil');
    const busquedaMovil = document.getElementById('busqueda-input-movil');
    if (!buscadorMovil) return;

    const visible = typeof mostrar === 'boolean' ? mostrar : buscadorMovil.classList.contains('hidden');
    buscadorMovil.classList.toggle('hidden', !visible);
    actualizarEstadoControlesBusqueda();

    if (visible && busquedaMovil) {
        requestAnimationFrame(() => busquedaMovil.focus());
    }
}

function obtenerBusquedasRecientesVisibles() {
    return busquedasRecientes.slice(0, 8);
}

function aplicarBusquedaRecienteGuardada(termino, filtro = FILTRO_BUSQUEDA_TODOS) {
    const terminoNormalizado = normalizarTerminoBusqueda(termino);
    if (!terminoNormalizado) return;

    filtroLibroBusquedaActual = normalizarFiltroLibroBusqueda(filtro);
    sincronizarSelectorFiltroLibroBusqueda();
    sincronizarInputsBusqueda(terminoNormalizado);
    mostrarResultadosBusqueda(terminoNormalizado);
}

function crearBotonBusquedaReciente(item) {
    const fila = document.createElement('div');
    const boton = document.createElement('button');
    const botonBorrar = document.createElement('button');
    const etiquetaFiltro = obtenerEtiquetaFiltroLibroBusqueda(item.filtro);

    fila.className = 'busqueda-reciente-item';

    boton.type = 'button';
    boton.className = 'busqueda-reciente-item-contenido';
    boton.innerHTML = `
        <span class="busqueda-reciente-item-icono" aria-hidden="true"><i class="fas fa-history"></i></span>
        <span class="busqueda-reciente-item-copy">
            <span class="busqueda-reciente-item-termino">${escapeHtml(item.termino)}</span>
            <span class="busqueda-reciente-item-meta">${escapeHtml(etiquetaFiltro)}</span>
        </span>
        <span class="busqueda-reciente-item-accion" aria-hidden="true"><i class="fas fa-arrow-right"></i></span>
    `;
    boton.addEventListener('click', () => aplicarBusquedaRecienteGuardada(item.termino, item.filtro));

    botonBorrar.type = 'button';
    botonBorrar.className = 'busqueda-reciente-item-borrar';
    botonBorrar.title = 'Eliminar esta búsqueda';
    botonBorrar.setAttribute('aria-label', `Eliminar búsqueda reciente: ${item.termino}`);
    botonBorrar.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
    botonBorrar.addEventListener('click', event => {
        event.stopPropagation();
        eliminarBusquedaReciente(item.termino, item.filtro);
    });

    fila.appendChild(boton);
    fila.appendChild(botonBorrar);
    return fila;
}

function crearBloqueBusquedasRecientes() {
    const items = obtenerBusquedasRecientesVisibles();
    if (items.length === 0) return null;

    const bloque = document.createElement('section');
    bloque.className = 'busquedas-recientes-bloque';

    const encabezado = document.createElement('div');
    encabezado.className = 'busquedas-recientes-header';
    encabezado.innerHTML = `
        <div class="busquedas-recientes-header-copy">
            <p class="busquedas-recientes-eyebrow">Guardadas en Lumina</p>
            <h3 class="busquedas-recientes-titulo">Búsquedas recientes</h3>
        </div>
    `;

    const botonLimpiar = document.createElement('button');
    botonLimpiar.type = 'button';
    botonLimpiar.className = 'busquedas-recientes-limpiar';
    botonLimpiar.textContent = 'Borrar historial';
    botonLimpiar.addEventListener('click', () => limpiarHistorialBusquedasRecientes());
    encabezado.appendChild(botonLimpiar);

    const lista = document.createElement('div');
    lista.className = 'busquedas-recientes-lista';
    items.forEach(item => lista.appendChild(crearBotonBusquedaReciente(item)));

    bloque.appendChild(encabezado);
    bloque.appendChild(lista);
    return bloque;
}

function actualizarVistaBusquedaSinResultados(termino = '', filtro = filtroLibroBusquedaActual) {
    const contenedor = document.getElementById('contenido-busqueda');
    if (!contenedor) return;

    contenedor.classList.remove('busqueda-con-resultados');
    contenedor.innerHTML = renderizarEstadoBusquedaVacio(termino, filtro);

    const bloqueBusquedasRecientes = crearBloqueBusquedasRecientes();
    if (bloqueBusquedasRecientes) {
        contenedor.appendChild(bloqueBusquedasRecientes);
    }
}

function renderizarEstadoBusquedaVacio(termino = '', filtro = filtroLibroBusquedaActual) {
    const terminoNormalizado = normalizarTerminoBusqueda(termino);
    const valorFiltro = normalizarFiltroLibroBusqueda(filtro);
    const etiquetaFiltro = obtenerEtiquetaFiltroLibroBusqueda(valorFiltro);

    if (!terminoNormalizado) {
        return `
            <div class="resultado-busqueda-empty">
                <div class="resultado-busqueda-empty-icon"><i class="fas fa-search"></i></div>
                <div class="resultado-busqueda-empty-titulo">${valorFiltro === FILTRO_BUSQUEDA_TODOS ? 'Buscá en versículos, comentarios y notas' : `Filtrando por ${escapeHtml(etiquetaFiltro)}`}</div>
                <div class="resultado-busqueda-empty-texto">${valorFiltro === FILTRO_BUSQUEDA_TODOS
                ? 'Escribí una palabra o una frase breve para encontrar pasajes, comentarios de la Tradición y tus notas personales en un mismo panel.'
                : `Escribí una palabra o una frase breve para buscar solo dentro de ${escapeHtml(etiquetaFiltro)}.`}</div>
            </div>
        `;
    }

    return `
        <div class="resultado-busqueda-empty">
            <div class="resultado-busqueda-empty-icon"><i class="fas fa-book-open"></i></div>
            <div class="resultado-busqueda-empty-titulo">Sin coincidencias para "${escapeHtml(terminoNormalizado)}"${valorFiltro === FILTRO_BUSQUEDA_TODOS ? '' : ` en ${escapeHtml(etiquetaFiltro)}`}</div>
            <div class="resultado-busqueda-empty-texto">${valorFiltro === FILTRO_BUSQUEDA_TODOS
            ? 'Probá con una sola palabra, una variante singular/plural o un término más corto para ampliar los resultados en versículos, comentarios y notas.'
            : `Probá con otra palabra o cambiá el filtro de libro para ampliar los resultados fuera de ${escapeHtml(etiquetaFiltro)}.`}</div>
        </div>
    `;
}

function crearRegexBusqueda(termino) {
    const terminoLimpio = normalizarTexto(normalizarTerminoBusqueda(termino));
    if (!terminoLimpio) return null;

    const termRegex = terminoLimpio.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${termRegex}\\b`, 'i');
}

function coincideTextoBusqueda(texto, regex) {
    if (!regex) return false;
    return regex.test(normalizarTexto(String(texto || '')));
}

function obtenerFragmentoBusqueda(texto, termino, maximo = 180) {
    const textoLimpio = String(texto || '').trim();
    if (!textoLimpio) return '';
    if (textoLimpio.length <= maximo) return textoLimpio;

    const terminoLimpio = normalizarTexto(normalizarTerminoBusqueda(termino));
    const textoNormalizado = normalizarTexto(textoLimpio);
    const indiceCoincidencia = terminoLimpio ? textoNormalizado.indexOf(terminoLimpio) : -1;

    if (indiceCoincidencia === -1) {
        return truncarTextoFavorito(textoLimpio, maximo);
    }

    const margen = Math.max(40, Math.floor((maximo - terminoLimpio.length) / 2));
    const inicio = Math.max(0, indiceCoincidencia - margen);
    const fin = Math.min(textoLimpio.length, indiceCoincidencia + terminoLimpio.length + margen);
    let fragmento = textoLimpio.slice(inicio, fin).trim();

    if (inicio > 0) fragmento = `…${fragmento}`;
    if (fin < textoLimpio.length) fragmento = `${fragmento}…`;

    return fragmento;
}

function formatearReferenciaResultadoBusqueda(item) {
    if (item.prefacio) return formatearReferenciaPrefacio(item.libro, item.capitulo);

    if (Number.isFinite(item.versiculoHasta) && item.versiculoHasta > item.versiculo) {
        return `${item.libro} ${item.capitulo},${item.versiculo}-${item.versiculoHasta}`;
    }

    return item.tipoFavorito === 'tradicion'
        ? formatearReferenciaComentarioTradicion(item.libro, item.capitulo, item.versiculo)
        : formatearReferenciaCompartida(item.libro, item.capitulo, item.versiculo);
}

function configurarTarjetaResultadoBusqueda(tarjeta, onOpen) {
    tarjeta.setAttribute('role', 'button');
    tarjeta.tabIndex = 0;
    tarjeta.addEventListener('click', onOpen);
    tarjeta.addEventListener('keydown', (event) => {
        if (event.target !== tarjeta) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onOpen();
        }
    });
}

function crearTarjetaResultadoBusquedaVersiculo(item, terminoBusqueda = '') {
    const favorito = esFavoritoVersiculo(item.libro, item.capitulo, item.versiculo);
    const accionFavorito = favorito ? 'Quitar de favoritos' : 'Agregar a favoritos';
    const identificadorFavorito = obtenerIdentificadorFavoritoVersiculo(item.libro, item.capitulo, item.versiculo);
    const referencia = formatearReferenciaCompartida(item.libro, item.capitulo, item.versiculo);
    const tarjeta = document.createElement('div');
    const texto = renderizarTextoBusquedaResaltadoHtml(item.texto, terminoBusqueda);

    tarjeta.className = 'resultado-busqueda-item';
    tarjeta.innerHTML = `
        <div class="resultado-busqueda-ref-row">
            <div class="resultado-busqueda-ref-main">
                <div class="resultado-busqueda-ref-line">
                    <i class="fas fa-bible resultado-busqueda-icono" aria-hidden="true"></i>
                    <div class="resultado-busqueda-ref">${escapeHtml(referencia)}</div>
                </div>
            </div>
            <div class="resultado-busqueda-ref-tools">
                <button
                    type="button"
                    data-favorito-versiculo="${identificadorFavorito}"
                    class="resultado-busqueda-fav estrella-fav ${favorito ? 'activa' : ''}"
                    title="${accionFavorito}"
                    aria-label="${accionFavorito} ${escapeHtml(referencia)}"
                    aria-pressed="${favorito ? 'true' : 'false'}">${favorito ? '★' : '☆'}</button>
                <span class="resultado-busqueda-numero">${item.numeroResultado}</span>
            </div>
        </div>
        <div class="resultado-busqueda-texto">${texto}</div>
    `;

    configurarTarjetaResultadoBusqueda(tarjeta, () => irAVersiculo(item.libro, item.capitulo, item.versiculo, 'busqueda', terminoBusqueda));

    const botonFavorito = tarjeta.querySelector('[data-favorito-versiculo]');
    botonFavorito?.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleFavoritoVersiculo(item.libro, item.capitulo, item.versiculo);
    });

    return tarjeta;
}

function crearTarjetaResultadoBusquedaAnotacion(item, opciones, terminoBusqueda = '') {
    const favorito = esFavoritoComentario(item.libro, item.capitulo, item.versiculo, item.tipoFavorito, item.idx);
    const accionFavorito = favorito ? 'Quitar de favoritos' : 'Agregar a favoritos';
    const identificadorFavorito = obtenerIdentificadorFavoritoComentario(item.libro, item.capitulo, item.versiculo, item.tipoFavorito, item.idx);
    const referencia = formatearReferenciaResultadoBusqueda(item);
    const etiquetaAccesible = opciones.etiquetaAccesible || 'anotación';
    const tarjeta = document.createElement('div');
    const textoResaltado = renderizarTextoBusquedaResaltadoHtml(item.fragmento || item.texto, terminoBusqueda, { preservarSaltos: true });
    const texto = opciones.citar ? `"${textoResaltado}"` : textoResaltado;

    tarjeta.className = 'resultado-busqueda-item';
    tarjeta.innerHTML = `
        <div class="resultado-busqueda-ref-row">
            <div class="resultado-busqueda-ref-main">
                <div class="resultado-busqueda-ref-line">
                    <i class="fas ${opciones.icono} resultado-busqueda-icono" aria-hidden="true"></i>
                    <div class="resultado-busqueda-ref">${escapeHtml(referencia)}</div>
                </div>
                ${opciones.meta ? `<p class="resultado-busqueda-meta">${escapeHtml(opciones.meta)}</p>` : ''}
            </div>
            <div class="resultado-busqueda-ref-tools">
                <button
                    type="button"
                    data-favorito-comentario="${identificadorFavorito}"
                    class="resultado-busqueda-fav estrella-fav-comentario ${favorito ? 'activa' : ''}"
                    title="${accionFavorito}"
                    aria-label="${accionFavorito} ${etiquetaAccesible} de ${escapeHtml(referencia)}"
                    aria-pressed="${favorito ? 'true' : 'false'}"><i class="fas fa-star"></i></button>
                <span class="resultado-busqueda-numero">${item.numeroResultado}</span>
            </div>
        </div>
        <div class="resultado-busqueda-texto">${texto}</div>
    `;

    configurarTarjetaResultadoBusqueda(
        tarjeta,
        () => abrirFavoritoAnotacion(
            item.libro,
            item.capitulo,
            item.versiculo,
            item.tipoFavorito,
            item.idx,
            {
                origen: 'busqueda',
                terminoBusqueda
            }
        )
    );

    const botonFavorito = tarjeta.querySelector('[data-favorito-comentario]');
    botonFavorito?.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleFavoritoComentario(item.libro, item.capitulo, item.versiculo, item.tipoFavorito, item.idx);
    });

    return tarjeta;
}

function crearTarjetaResultadoBusquedaComentario(item, terminoBusqueda = '') {
    return crearTarjetaResultadoBusquedaAnotacion(item, {
        icono: 'fa-comment-dots',
        etiquetaAccesible: 'comentario',
        meta: item.autor || '',
        citar: true
    }, terminoBusqueda);
}

function crearTarjetaResultadoBusquedaNota(item, terminoBusqueda = '') {
    return crearTarjetaResultadoBusquedaAnotacion(item, {
        icono: 'fa-pen',
        etiquetaAccesible: 'nota',
        meta: item.fecha || '',
        citar: false
    }, terminoBusqueda);
}
function renderizarResultadosBusqueda(contenedor, resultados, termino = '', filtro = filtroLibroBusquedaActual) {
    const terminoNormalizado = normalizarTerminoBusqueda(termino);
    const valorFiltro = normalizarFiltroLibroBusqueda(filtro);
    const etiquetaFiltro = obtenerEtiquetaFiltroLibroBusqueda(valorFiltro);
    const mensajeVersiculos = terminoNormalizado
        ? 'No hubo versículos que coincidan en esta búsqueda.'
        : 'Escribí una palabra o frase para buscar versículos.';
    const mensajeComentarios = terminoNormalizado
        ? 'No hubo comentarios que coincidan en esta búsqueda.'
        : 'Escribí una palabra o frase para buscar comentarios.';
    const mensajeNotas = terminoNormalizado
        ? 'No hubo notas que coincidan en esta búsqueda.'
        : valorFiltro === FILTRO_BUSQUEDA_TODOS
            ? 'Todavía no guardaste notas en toda la Biblia.'
            : `Todavía no guardaste notas en ${escapeHtml(etiquetaFiltro)}.`;

    estadoSeccionesBusqueda = {
        versiculos: false,
        comentarios: false,
        notas: !terminoNormalizado
    };

    contenedor.classList.add('busqueda-con-resultados');
    contenedor.innerHTML = '';
    contenedor.appendChild(
        crearSeccionBusqueda(
            'versiculos',
            'Versículos',
            'fa-bible',
            resultados.versiculos,
            item => crearTarjetaResultadoBusquedaVersiculo(item, terminoNormalizado),
            mensajeVersiculos
        )
    );
    contenedor.appendChild(
        crearSeccionBusqueda(
            'comentarios',
            'Comentarios',
            'fa-comment-dots',
            resultados.comentarios,
            item => crearTarjetaResultadoBusquedaComentario(item, terminoNormalizado),
            mensajeComentarios
        )
    );
    contenedor.appendChild(
        crearSeccionBusqueda(
            'notas',
            'Notas',
            'fa-pen',
            resultados.notas,
            item => crearTarjetaResultadoBusquedaNota(item, terminoNormalizado),
            mensajeNotas
        )
    );
}

function construirIndiceBusqueda() {
    indiceBusqueda = [];
    for (let libro in bibleContent) {
        for (let cap in bibleContent[libro]) {
            for (let ver in bibleContent[libro][cap]) {
                const versiculo = parseFloat(ver);
                if (!esVersiculoLeible(versiculo)) continue;
                indiceBusqueda.push({
                    libro,
                    capitulo: parseInt(cap, 10),
                    versiculo,
                    texto: bibleContent[libro][cap][ver]
                });
            }
        }
    }
}

function buscarVersiculos(termino) {
    const regex = crearRegexBusqueda(termino);
    if (!regex) return [];

    return indiceBusqueda
        .filter(item => coincideTextoBusqueda(item.texto, regex))
        .sort(compararFavoritosPorOrdenBiblico);
}

function buscarComentarios(termino) {
    const regex = crearRegexBusqueda(termino);
    if (!regex) return [];

    const resultados = [];

    Object.entries(comentariosDB).forEach(([clave, comentarios]) => {
        if (clave === '__ranges' || !Array.isArray(comentarios) || comentarios.length === 0) return;

        if (clave.endsWith('_prefacio')) {
            const matchPrefacio = clave.match(/^(.*?)(?:_(\d+))?_prefacio$/);
            if (!matchPrefacio) return;

            const libro = matchPrefacio[1];
            const capitulo = parseInt(matchPrefacio[2] || '0', 10);
            comentarios.forEach((comentario, idx) => {
                if (!coincideTextoBusqueda(comentario?.texto, regex)) return;
                resultados.push({
                    libro,
                    capitulo,
                    versiculo: 0,
                    idx,
                    prefacio: true,
                    tipoFavorito: 'tradicion',
                    autor: comentario.autor || 'Tradición',
                    texto: comentario.texto || '',
                    fragmento: obtenerFragmentoBusqueda(comentario.texto, termino)
                });
            });
            return;
        }

        const partes = clave.split('_');
        if (partes.length < 3) return;

        const versiculoClave = partes.pop();
        const capitulo = parseInt(partes.pop(), 10);
        const libro = partes.join('_');
        if (!libro || !Number.isFinite(capitulo)) return;

        let versiculo = parseFloat(versiculoClave);
        let versiculoHasta = null;

        if (versiculoClave.includes('-')) {
            const [desde, hasta] = versiculoClave.split('-').map(valor => parseFloat(valor));
            versiculo = desde;
            versiculoHasta = hasta;
        }

        if (!Number.isFinite(versiculo)) return;
        if (!esReferenciaBuscableEnBusqueda(capitulo, versiculo)) return;
        if (Number.isFinite(versiculoHasta) && !esVersiculoLeible(versiculoHasta)) return;

        comentarios.forEach((comentario, idx) => {
            if (!coincideTextoBusqueda(comentario?.texto, regex)) return;
            resultados.push({
                libro,
                capitulo,
                versiculo,
                versiculoHasta,
                idx,
                tipoFavorito: 'tradicion',
                autor: comentario.autor || 'Tradición',
                texto: comentario.texto || '',
                fragmento: obtenerFragmentoBusqueda(comentario.texto, termino)
            });
        });
    });

    return resultados.sort(compararFavoritosPorOrdenBiblico);
}

function buscarNotas(termino, incluirTodasSiEstaVacio = false) {
    const terminoNormalizado = normalizarTerminoBusqueda(termino);
    const regex = crearRegexBusqueda(termino);
    if (!regex && !incluirTodasSiEstaVacio) return [];

    const resultados = [];

    Object.entries(notasPersonales).forEach(([clave, notas]) => {
        if (!Array.isArray(notas) || notas.length === 0) return;

        const partes = clave.split('_');
        if (partes.length < 3) return;

        const versiculo = parseFloat(partes.pop());
        const capitulo = parseInt(partes.pop(), 10);
        const libro = partes.join('_');

        if (!libro || !Number.isFinite(capitulo) || !Number.isFinite(versiculo)) return;
        if (!esReferenciaBuscableEnBusqueda(capitulo, versiculo)) return;

        notas.forEach((nota, idx) => {
            if (regex && !coincideTextoBusqueda(nota?.texto, regex)) return;
            resultados.push({
                libro,
                capitulo,
                versiculo,
                idx,
                tipoFavorito: 'personal',
                fecha: nota.fecha || '',
                texto: nota.texto || '',
                fragmento: obtenerFragmentoBusqueda(nota.texto, terminoNormalizado)
            });
        });
    });

    return resultados.sort(compararFavoritosPorOrdenBiblico);
}

function buscarResultadosBusqueda(termino, filtro = filtroLibroBusquedaActual) {
    const terminoNormalizado = normalizarTerminoBusqueda(termino);
    const mostrarTodasLasNotas = !terminoNormalizado;
    const resultados = {
        versiculos: terminoNormalizado ? aplicarFiltroLibroBusqueda(buscarVersiculos(terminoNormalizado), filtro) : [],
        comentarios: terminoNormalizado ? aplicarFiltroLibroBusqueda(buscarComentarios(terminoNormalizado), filtro) : [],
        notas: aplicarFiltroLibroBusqueda(buscarNotas(terminoNormalizado, mostrarTodasLasNotas), filtro)
    };

    let numeroResultado = 1;
    ['versiculos', 'comentarios', 'notas'].forEach(clave => {
        resultados[clave].forEach(item => {
            item.numeroResultado = numeroResultado++;
        });
    });

    resultados.total = numeroResultado - 1;
    resultados.modoNotasSinTermino = mostrarTodasLasNotas;
    return resultados;
}

function mostrarResultadosBusqueda(termino) {
    const terminoNormalizado = normalizarTerminoBusqueda(termino);
    const contenedor = document.getElementById('contenido-busqueda');
    const contador = document.getElementById('contador-busqueda');
    filtroLibroBusquedaActual = normalizarFiltroLibroBusqueda(document.getElementById('busqueda-filtro-libro')?.value || filtroLibroBusquedaActual);
    sincronizarSelectorFiltroLibroBusqueda();
    const resultados = buscarResultadosBusqueda(terminoNormalizado, filtroLibroBusquedaActual);
    terminoBusquedaActual = terminoNormalizado;
    if (terminoNormalizado) {
        registrarBusquedaReciente(terminoNormalizado, filtroLibroBusquedaActual);
    }

    sincronizarInputsBusqueda(terminoNormalizado);
    mostrarBuscadorMovil(false);

    // Cerrar otros paneles para reemplazarlos con el panel de búsqueda
    cerrarPanel('panel-comentarios');
    cerrarPanel('panel-favoritos');
    cerrarPanel('panel-concordancia');

    if (contador) {
        contador.textContent = obtenerTextoContadorBusqueda(
            terminoNormalizado,
            resultados.total,
            filtroLibroBusquedaActual,
            { modoNotasSinTermino: resultados.modoNotasSinTermino }
        );
    }

    if (contenedor) {
        if (!terminoNormalizado || resultados.total > 0) {
            renderizarResultadosBusqueda(contenedor, resultados, terminoNormalizado, filtroLibroBusquedaActual);
        } else {
            actualizarVistaBusquedaSinResultados(terminoNormalizado, filtroLibroBusquedaActual);
        }
    }

    abrirPanelLateral('panel-busqueda');
    actualizarEstadoControlesBusqueda();
}

function limpiarBusqueda(cerrarPanelResultados = false) {
    terminoBusquedaActual = '';
    filtroLibroBusquedaActual = FILTRO_BUSQUEDA_TODOS;
    obtenerInputsBusquedaDisponibles().forEach(input => {
        input.value = '';
    });
    sincronizarSelectorFiltroLibroBusqueda();

    const contador = document.getElementById('contador-busqueda');

    if (contador) {
        contador.textContent = obtenerTextoContadorBusqueda('', 0, filtroLibroBusquedaActual);
    }

    actualizarVistaBusquedaSinResultados('', filtroLibroBusquedaActual);

    if (cerrarPanelResultados) {
        cerrarPanel('panel-busqueda');
    }

    actualizarEstadoControlesBusqueda();
}

// --------------------------------------------------------------
// 8. COMPARTIR
// --------------------------------------------------------------
let contextoModalCompartirVersiculo = null;
let accionTarjetaVersiculoEnCurso = false;

async function compartirTexto(texto, titulo) {
    if (navigator.share) {
        try {
            await navigator.share({ title: titulo, text: texto });
        } catch (err) { console.log('Error al compartir:', err); }
    } else {
        await navigator.clipboard.writeText(texto);
        alert('Texto copiado al portapapeles');
    }
}

function normalizarSlugTarjetaVersiculo(texto) {
    return String(texto || 'versiculo')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '') || 'versiculo';
}

function obtenerNombreArchivoTarjetaVersiculo(contexto = contextoModalCompartirVersiculo) {
    if (!contexto) return 'lumina_versiculo.png';

    const referencia = `${contexto.libro}_${contexto.capitulo}_${contexto.versiculo}`;
    return `lumina_${normalizarSlugTarjetaVersiculo(referencia)}.png`;
}

function trazarRectanguloRedondeado(ctx, x, y, width, height, radius) {
    const radio = Math.max(0, Math.min(radius, width / 2, height / 2));
    ctx.beginPath();
    ctx.moveTo(x + radio, y);
    ctx.lineTo(x + width - radio, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radio);
    ctx.lineTo(x + width, y + height - radio);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radio, y + height);
    ctx.lineTo(x + radio, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radio);
    ctx.lineTo(x, y + radio);
    ctx.quadraticCurveTo(x, y, x + radio, y);
    ctx.closePath();
}

function dividirPalabraTarjetaEnLineas(ctx, palabra, maxWidth) {
    const fragmentos = [];
    let fragmentoActual = '';

    for (const caracter of String(palabra || '')) {
        const candidato = `${fragmentoActual}${caracter}`;
        if (!fragmentoActual || ctx.measureText(candidato).width <= maxWidth) {
            fragmentoActual = candidato;
        } else {
            fragmentos.push(fragmentoActual);
            fragmentoActual = caracter;
        }
    }

    if (fragmentoActual) fragmentos.push(fragmentoActual);
    return fragmentos;
}

function dividirTextoTarjetaEnLineas(ctx, texto, maxWidth) {
    const palabras = String(texto || '').trim().split(/\s+/).filter(Boolean);
    if (palabras.length === 0) return [];

    const lineas = [];
    let lineaActual = '';

    palabras.forEach(palabra => {
        const fragmentos = ctx.measureText(palabra).width <= maxWidth
            ? [palabra]
            : dividirPalabraTarjetaEnLineas(ctx, palabra, maxWidth);

        fragmentos.forEach(fragmento => {
            if (!lineaActual) {
                lineaActual = fragmento;
                return;
            }

            const candidata = `${lineaActual} ${fragmento}`;
            if (ctx.measureText(candidata).width <= maxWidth) {
                lineaActual = candidata;
            } else {
                lineas.push(lineaActual);
                lineaActual = fragmento;
            }
        });
    });

    if (lineaActual) lineas.push(lineaActual);
    return lineas;
}

function obtenerMetricasTarjetaVersiculo(width, height) {
    const escala = width / 1080;
    const margen = Math.round(width * 0.06);
    const panelX = margen;
    const panelY = margen;
    const panelW = width - margen * 2;
    const panelH = height - margen * 2;
    const cajaTextoY = panelY + Math.round(272 * escala);
    const cajaTextoH = Math.max(Math.round(260 * escala), panelH - Math.round(510 * escala));
    const maxTextWidth = panelW - Math.round(180 * escala);

    return {
        escala,
        margen,
        panelX,
        panelY,
        panelW,
        panelH,
        radio: Math.round(width * 0.045),
        cajaTextoY,
        cajaTextoH,
        maxTextWidth: Math.max(Math.round(width * 0.48), maxTextWidth),
        pieY: panelY + panelH - Math.round(188 * escala)
    };
}

function calcularTipografiaTarjetaVersiculo(ctx, texto, maxWidth, fontSize) {
    const lineHeight = Math.round(fontSize * (fontSize <= 34 ? 1.28 : 1.32));
    ctx.font = `italic 600 ${fontSize}px Georgia, serif`;

    return {
        fontSize,
        lineHeight,
        lineas: dividirTextoTarjetaEnLineas(ctx, texto, maxWidth)
    };
}

function resolverTipografiaTarjetaVersiculo(ctx, texto, maxWidth, maxHeight, opciones = {}) {
    const escala = opciones.escala || 1;
    const fontMax = Math.round((opciones.fontMax || 76) * escala);
    const fontMin = Math.max(18, Math.round((opciones.fontMin || 30) * escala));
    const paso = Math.max(1, Math.round((opciones.paso || 2) * escala));

    for (let fontSize = fontMax; fontSize >= fontMin; fontSize -= paso) {
        const tipografia = calcularTipografiaTarjetaVersiculo(ctx, texto, maxWidth, fontSize);

        if ((tipografia.lineas.length * tipografia.lineHeight) <= maxHeight) {
            return { ...tipografia, cabeCompleto: true };
        }
    }

    const tipografiaMinima = calcularTipografiaTarjetaVersiculo(ctx, texto, maxWidth, fontMin);
    return { ...tipografiaMinima, cabeCompleto: (tipografiaMinima.lineas.length * tipografiaMinima.lineHeight) <= maxHeight };
}

function resolverLayoutTarjetaVersiculo(ctx, texto, width, alturaBase) {
    const escala = width / 1080;
    const altoBase = Math.round(alturaBase || width * 1.25);
    const altoMaximoComodo = Math.round(width * 2.1);
    const fontMinComodo = 34;
    const fontMinAbsoluto = 24;
    const metricasBase = obtenerMetricasTarjetaVersiculo(width, altoBase);
    const tipografiaBase = resolverTipografiaTarjetaVersiculo(ctx, texto, metricasBase.maxTextWidth, metricasBase.cajaTextoH, {
        escala,
        fontMin: fontMinComodo
    });

    if (tipografiaBase.cabeCompleto) {
        return { width, height: altoBase, metricas: metricasBase, tipografia: tipografiaBase };
    }

    const fontComodo = Math.max(18, Math.round(fontMinComodo * escala));
    const tipografiaComoda = calcularTipografiaTarjetaVersiculo(ctx, texto, metricasBase.maxTextWidth, fontComodo);
    const altoTextoComodo = tipografiaComoda.lineas.length * tipografiaComoda.lineHeight;
    const altoSinCajaTexto = altoBase - metricasBase.cajaTextoH;
    const altoComodoNecesario = Math.ceil(altoTextoComodo + altoSinCajaTexto + Math.round(12 * escala));

    if (altoComodoNecesario <= altoMaximoComodo) {
        const height = Math.max(altoBase, altoComodoNecesario);
        const metricas = obtenerMetricasTarjetaVersiculo(width, height);
        const tipografia = resolverTipografiaTarjetaVersiculo(ctx, texto, metricas.maxTextWidth, metricas.cajaTextoH, {
            escala,
            fontMin: fontMinComodo
        });

        return { width, height, metricas, tipografia };
    }

    const metricasMaximas = obtenerMetricasTarjetaVersiculo(width, altoMaximoComodo);
    let tipografia = resolverTipografiaTarjetaVersiculo(ctx, texto, metricasMaximas.maxTextWidth, metricasMaximas.cajaTextoH, {
        escala,
        fontMin: fontMinAbsoluto
    });

    if (tipografia.cabeCompleto) {
        return { width, height: altoMaximoComodo, metricas: metricasMaximas, tipografia };
    }

    const altoTextoNecesario = tipografia.lineas.length * tipografia.lineHeight;
    const altoNecesario = Math.ceil(altoTextoNecesario + altoSinCajaTexto + Math.round(16 * escala));
    const height = Math.max(altoMaximoComodo, altoNecesario);
    const metricas = obtenerMetricasTarjetaVersiculo(width, height);
    tipografia = resolverTipografiaTarjetaVersiculo(ctx, texto, metricas.maxTextWidth, metricas.cajaTextoH, {
        escala,
        fontMin: fontMinAbsoluto
    });

    return { width, height, metricas, tipografia };
}

function dibujarTarjetaVersiculoEnCanvas(canvas, contexto, opciones = {}) {
    if (!canvas || !contexto) return false;

    const width = opciones.width || 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    const layout = resolverLayoutTarjetaVersiculo(ctx, contexto.texto, width, opciones.height);
    const height = layout.height;
    const {
        escala,
        panelX,
        panelY,
        panelW,
        panelH,
        radio,
        cajaTextoY,
        cajaTextoH,
        pieY
    } = layout.metricas;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    const gradienteFondo = ctx.createLinearGradient(0, 0, width, height);
    gradienteFondo.addColorStop(0, '#fffaf0');
    gradienteFondo.addColorStop(0.45, '#f6edd7');
    gradienteFondo.addColorStop(1, '#ead7aa');
    ctx.fillStyle = gradienteFondo;
    ctx.fillRect(0, 0, width, height);

    const halo = ctx.createRadialGradient(width * 0.2, height * 0.08, 10, width * 0.2, height * 0.08, width * 0.75);
    halo.addColorStop(0, 'rgba(255,255,255,0.96)');
    halo.addColorStop(0.42, 'rgba(255,248,225,0.35)');
    halo.addColorStop(1, 'rgba(255,248,225,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.shadowColor = 'rgba(76, 52, 18, 0.16)';
    ctx.shadowBlur = Math.round(36 * escala);
    ctx.shadowOffsetY = Math.round(18 * escala);
    trazarRectanguloRedondeado(ctx, panelX, panelY, panelW, panelH, radio);
    ctx.fillStyle = 'rgba(255, 252, 245, 0.92)';
    ctx.fill();
    ctx.restore();

    const panelGradiente = ctx.createLinearGradient(panelX, panelY, panelX, panelY + panelH);
    panelGradiente.addColorStop(0, 'rgba(255,255,255,0.96)');
    panelGradiente.addColorStop(1, 'rgba(249,242,227,0.94)');
    trazarRectanguloRedondeado(ctx, panelX, panelY, panelW, panelH, radio);
    ctx.fillStyle = panelGradiente;
    ctx.fill();

    ctx.lineWidth = Math.max(2, Math.round(3 * escala));
    ctx.strokeStyle = 'rgba(184, 134, 11, 0.35)';
    const bordeInterior = Math.round(8 * escala);
    trazarRectanguloRedondeado(ctx, panelX + bordeInterior, panelY + bordeInterior, panelW - bordeInterior * 2, panelH - bordeInterior * 2, radio - bordeInterior);
    ctx.stroke();

    ctx.fillStyle = 'rgba(184, 134, 11, 0.18)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.font = `italic ${Math.round(160 * escala)}px Georgia, serif`;
    ctx.fillText('“', panelX + Math.round(58 * escala), panelY + Math.round(170 * escala));
    ctx.textAlign = 'right';
    ctx.fillText('”', panelX + panelW - Math.round(60 * escala), panelY + panelH - Math.round(54 * escala));

    const pastillaY = panelY + Math.round(58 * escala);
    ctx.textAlign = 'center';
    ctx.font = `600 ${Math.round(28 * escala)}px "Segoe UI", sans-serif`;
    const altoPastilla = Math.round(56 * escala);
    const anchoPastilla = Math.max(Math.round(192 * escala), Math.ceil(ctx.measureText('Lumina').width) + Math.round(96 * escala));
    const pastillaX = (width - anchoPastilla) / 2;
    trazarRectanguloRedondeado(ctx, pastillaX, pastillaY, anchoPastilla, altoPastilla, altoPastilla / 2);
    ctx.fillStyle = 'rgba(184, 134, 11, 0.12)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(184, 134, 11, 0.26)';
    ctx.lineWidth = Math.max(1, Math.round(2 * escala));
    ctx.stroke();
    ctx.fillStyle = '#9a6a00';
    ctx.textBaseline = 'middle';
    ctx.fillText('Lumina', width / 2, pastillaY + altoPastilla / 2 + Math.round(2 * escala));

    const referencia = contexto.referencia || formatearReferenciaCompartida(contexto.libro, contexto.capitulo, contexto.versiculo);
    ctx.font = `600 ${Math.round(34 * escala)}px "Segoe UI", sans-serif`;
    ctx.fillStyle = '#a67200';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(referencia, width / 2, panelY + Math.round(180 * escala));

    ctx.strokeStyle = 'rgba(184, 134, 11, 0.24)';
    ctx.lineWidth = Math.max(1, Math.round(2 * escala));
    ctx.beginPath();
    ctx.moveTo(panelX + Math.round(120 * escala), panelY + Math.round(218 * escala));
    ctx.lineTo(panelX + panelW - Math.round(120 * escala), panelY + Math.round(218 * escala));
    ctx.stroke();

    const tipografia = layout.tipografia;
    const altoBloque = tipografia.lineas.length * tipografia.lineHeight;
    let cursorY = cajaTextoY + Math.max(0, (cajaTextoH - altoBloque) / 2);

    ctx.font = `italic 600 ${tipografia.fontSize}px Georgia, serif`;
    ctx.fillStyle = '#2c2118';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    tipografia.lineas.forEach(linea => {
        ctx.fillText(linea, width / 2, cursorY);
        cursorY += tipografia.lineHeight;
    });

    ctx.strokeStyle = 'rgba(184, 134, 11, 0.28)';
    ctx.lineWidth = Math.max(1, Math.round(2 * escala));
    ctx.beginPath();
    ctx.moveTo(panelX + Math.round(180 * escala), pieY);
    ctx.lineTo(panelX + panelW - Math.round(180 * escala), pieY);
    ctx.stroke();

    ctx.font = `600 ${Math.round(26 * escala)}px "Segoe UI", sans-serif`;
    ctx.fillStyle = '#7b5b2a';
    ctx.textAlign = 'center';
    ctx.fillText('La Tradición Iluminando la Palabra', width / 2, pieY + Math.round(56 * escala));

    ctx.font = `500 ${Math.round(22 * escala)}px "Segoe UI", sans-serif`;
    ctx.fillStyle = 'rgba(78, 59, 29, 0.72)';

    return true;
}

function actualizarEstadoModalCompartirVersiculo() {
    const botones = [
        document.getElementById('btn-compartir-texto-versiculo'),
        document.getElementById('btn-compartir-tarjeta-versiculo'),
        document.getElementById('btn-descargar-tarjeta-versiculo')
    ].filter(Boolean);

    botones.forEach(boton => {
        boton.disabled = accionTarjetaVersiculoEnCurso;
        boton.classList.toggle('opacity-60', accionTarjetaVersiculoEnCurso);
        boton.classList.toggle('cursor-not-allowed', accionTarjetaVersiculoEnCurso);
    });
}

function renderizarModalCompartirVersiculo() {
    if (!contextoModalCompartirVersiculo) return;

    const modal = document.getElementById('modal-compartir-versiculo');
    const canvas = document.getElementById('canvas-compartir-versiculo');
    const referencia = document.getElementById('compartir-versiculo-referencia');
    const texto = document.getElementById('compartir-versiculo-texto');
    if (!modal || !canvas || !referencia || !texto) return;

    referencia.textContent = contextoModalCompartirVersiculo.referencia;
    texto.textContent = contextoModalCompartirVersiculo.texto;
    dibujarTarjetaVersiculoEnCanvas(canvas, contextoModalCompartirVersiculo, {
        width: 1080,
        height: 1350
    });

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    actualizarEstadoModalCompartirVersiculo();
}

function abrirModalCompartirVersiculo(libro, capitulo, versiculo, texto) {
    const textoLimpio = String(texto || '').trim();
    if (!textoLimpio) {
        lanzarToast('No encontramos el texto del versículo para compartir');
        return;
    }

    contextoModalCompartirVersiculo = {
        libro,
        capitulo,
        versiculo,
        texto: textoLimpio,
        referencia: formatearReferenciaCompartida(libro, capitulo, versiculo)
    };
    accionTarjetaVersiculoEnCurso = false;
    renderizarModalCompartirVersiculo();
}

function cerrarModalCompartirVersiculo() {
    const modal = document.getElementById('modal-compartir-versiculo');
    if (!modal) return;

    modal.classList.add('hidden');
    modal.classList.remove('flex');
    accionTarjetaVersiculoEnCurso = false;
    contextoModalCompartirVersiculo = null;
    actualizarEstadoModalCompartirVersiculo();
}

function compartirVersiculoComoTexto(libro, capitulo, versiculo, texto) {
    const referencia = formatearReferenciaCompartida(libro, capitulo, versiculo);
    const textoLimpio = String(texto || '').trim();
    const contenido = referencia
        ? `${textoLimpio} (${referencia})\n- Compartido desde Lumina`
        : `${textoLimpio}\n- Compartido desde Lumina`;
    compartirTexto(contenido, referencia ? `Versículo: ${referencia}` : 'Versículo compartido');
}

async function compartirVersiculoComoTextoDesdeModal() {
    if (!contextoModalCompartirVersiculo) return;

    const { libro, capitulo, versiculo, texto } = contextoModalCompartirVersiculo;
    cerrarModalCompartirVersiculo();
    await compartirVersiculoComoTexto(libro, capitulo, versiculo, texto);
}

async function obtenerBlobTarjetaVersiculoActual() {
    if (!contextoModalCompartirVersiculo) return null;

    const canvas = document.createElement('canvas');
    const ok = dibujarTarjetaVersiculoEnCanvas(canvas, contextoModalCompartirVersiculo, {
        width: 1080,
        height: 1350
    });
    if (!ok) return null;

    return new Promise(resolve => {
        canvas.toBlob(blob => resolve(blob), 'image/png');
    });
}

function descargarBlobCompartido(blob, nombreArchivo) {
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = nombreArchivo;
    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
}

async function compartirTarjetaVersiculo() {
    if (!contextoModalCompartirVersiculo || accionTarjetaVersiculoEnCurso) return;

    accionTarjetaVersiculoEnCurso = true;
    actualizarEstadoModalCompartirVersiculo();

    try {
        const blob = await obtenerBlobTarjetaVersiculoActual();
        if (!blob) {
            throw new Error('No se pudo generar el PNG');
        }

        const nombreArchivo = obtenerNombreArchivoTarjetaVersiculo();
        const archivo = typeof File !== 'undefined'
            ? new File([blob], nombreArchivo, { type: 'image/png' })
            : null;

        if (archivo && navigator.share) {
            const datosCompartir = {
                title: `Versículo: ${contextoModalCompartirVersiculo.referencia}`,
                text: `${contextoModalCompartirVersiculo.referencia}\nCompartido desde Lumina`,
                files: [archivo]
            };

            const puedeCompartirArchivo = !navigator.canShare || navigator.canShare(datosCompartir);
            if (puedeCompartirArchivo) {
                try {
                    await navigator.share(datosCompartir);
                    lanzarToast('Tarjeta lista para compartir');
                    cerrarModalCompartirVersiculo();
                    return;
                } catch (errorCompartir) {
                    if (errorCompartir && errorCompartir.name === 'AbortError') {
                        return;
                    }
                    console.warn('No se pudo compartir el archivo directamente. Probamos con descarga.', errorCompartir);
                }
            }
        }

        descargarBlobCompartido(blob, nombreArchivo);
        lanzarToast('Tu navegador descargó la tarjeta en PNG');
        cerrarModalCompartirVersiculo();
    } catch (error) {
        console.error('No se pudo compartir la tarjeta del versículo:', error);
        lanzarToast('No se pudo preparar la tarjeta para compartir');
    } finally {
        accionTarjetaVersiculoEnCurso = false;
        actualizarEstadoModalCompartirVersiculo();
    }
}

async function descargarTarjetaVersiculo() {
    if (!contextoModalCompartirVersiculo || accionTarjetaVersiculoEnCurso) return;

    accionTarjetaVersiculoEnCurso = true;
    actualizarEstadoModalCompartirVersiculo();

    try {
        const blob = await obtenerBlobTarjetaVersiculoActual();
        if (!blob) {
            throw new Error('No se pudo generar el PNG');
        }

        descargarBlobCompartido(blob, obtenerNombreArchivoTarjetaVersiculo());
        lanzarToast('Tarjeta descargada en PNG');
        cerrarModalCompartirVersiculo();
    } catch (error) {
        console.error('No se pudo descargar la tarjeta del versículo:', error);
        lanzarToast('No se pudo descargar la tarjeta');
    } finally {
        accionTarjetaVersiculoEnCurso = false;
        actualizarEstadoModalCompartirVersiculo();
    }
}

function escucharComentario(autor, texto, btn) {
    if (!navegadorSoportaLectura()) {
        alert('Tu navegador no admite lectura en voz alta.');
        return;
    }

    // Si ya está reproduciendo este comentario, detener
    if (btnAudioActivo === btn && window.speechSynthesis.speaking) {
        detenerConRestauracion();
        return;
    }

    detenerConRestauracion();

    const contenido = `Comentario de ${autor}. ${texto}`;
    const utterance = crearUtteranceLectura(contenido);

    btnAudioActivo = btn;
    if (btn) cambiarAIconoPausa(btn);

    utterance.onend = () => {
        limpiarMonitorReproduccion();
        if (btn) restaurarIconoParla(btn);
        btnAudioActivo = null;
    };

    utterance.onerror = () => {
        limpiarMonitorReproduccion();
        if (btn) restaurarIconoParla(btn);
        btnAudioActivo = null;
    };

    reproducirUtterance(utterance);
}

function escucharNota(texto, btn) {
    if (!navegadorSoportaLectura()) {
        alert('Tu navegador no admite lectura en voz alta.');
        return;
    }

    // Si ya está reproduciendo esta nota, detener
    if (btnAudioActivo === btn && window.speechSynthesis.speaking) {
        detenerConRestauracion();
        return;
    }

    detenerConRestauracion();

    const utterance = crearUtteranceLectura(texto);

    btnAudioActivo = btn;
    if (btn) cambiarAIconoPausa(btn);

    utterance.onend = () => {
        limpiarMonitorReproduccion();
        if (btn) restaurarIconoParla(btn);
        btnAudioActivo = null;
    };

    utterance.onerror = () => {
        limpiarMonitorReproduccion();
        if (btn) restaurarIconoParla(btn);
        btnAudioActivo = null;
    };

    reproducirUtterance(utterance);
}

function escucharPasajeLectio(btn) {
    if (!navegadorSoportaLectura()) {
        alert('Tu navegador no admite lectura en voz alta.');
        return;
    }

    const tarjeta = document.getElementById('lectio-pasaje-card');
    const libro = tarjeta?.dataset.libro || '';
    const capitulo = Number(tarjeta?.dataset.capitulo);
    const desde = Number(tarjeta?.dataset.desde);
    const hasta = Number(tarjeta?.dataset.hasta);
    const pasaje = obtenerPasajeLectio(libro, capitulo, desde, hasta);
    if (!libro || pasaje.length === 0) {
        lanzarToast('Elegí un pasaje para escucharlo en la Lectio.');
        return;
    }

    if (btnAudioActivo === btn && window.speechSynthesis.speaking) {
        detenerConRestauracion();
        return;
    }

    detenerConRestauracion();

    const referencia = formatearReferenciaLectio(libro, capitulo, desde, hasta);
    const contenido = `${referencia}. ${obtenerTextoPlanoPasajeLectio(libro, capitulo, desde, hasta)}`;
    const utterance = crearUtteranceLectura(contenido);

    btnAudioActivo = btn;
    if (btn) cambiarAIconoPausa(btn);

    utterance.onend = () => {
        limpiarMonitorReproduccion();
        if (btn) restaurarIconoParla(btn);
        btnAudioActivo = null;
    };

    utterance.onerror = () => {
        limpiarMonitorReproduccion();
        if (btn) restaurarIconoParla(btn);
        btnAudioActivo = null;
    };

    reproducirUtterance(utterance);
}

function compartirVersiculo(libro, capitulo, versiculo, texto) {
    abrirModalCompartirVersiculo(libro, capitulo, versiculo, texto);
}

function formatearReferenciaCompartida(libro, capitulo, versiculo) {
    const libroLimpio = String(libro || '').trim();
    const cap = Number(capitulo);
    const ver = Number(versiculo);

    if (Number.isFinite(cap) && cap > 0 && Number.isFinite(ver) && ver > 0) {
        return `${libroLimpio} ${capitulo},${versiculo}`;
    }

    if (Number.isFinite(cap) && cap > 0) {
        return `${libroLimpio} ${capitulo}`;
    }

    return libroLimpio;
}

function compartirColeccionComoTexto(coleccionId) {
    const coleccion = obtenerColeccionVersiculosPorId(coleccionId);
    if (!coleccion) {
        lanzarToast('No encontramos esa colección');
        return;
    }

    const versiculosOrdenados = obtenerVersiculosColeccionOrdenados(coleccion);

    if (versiculosOrdenados.length === 0) {
        lanzarToast('La colección está vacía');
        return;
    }

    const encabezado = `Colección: ${coleccion.nombre}`;
    const cuerpo = versiculosOrdenados
        .map(item => `${formatearReferenciaCompartida(item.libro, item.capitulo, item.versiculo)}\n${String(item.texto || '').trim()}`)
        .join('\n\n');
    const contenido = `${encabezado}\n\n${cuerpo}\n\n- Compartido desde Lumina`;
    compartirTexto(contenido, `Colección: ${coleccion.nombre}`);
}

function generarLineasRetiroParaPDF(cantidad = 12) {
    return Array.from({ length: cantidad }, (_, indice) => `
        <div class="retiro-linea" aria-hidden="true">
            <span class="retiro-linea-numero">${indice + 1}</span>
            <span class="retiro-linea-trazo"></span>
        </div>
    `).join('');
}

function obtenerBloquesLectioParaPDF(lectio = {}) {
    return [
        {
            clave: 'leer',
            eyebrow: 'Leer',
            titulo: '¿Qué dice el texto?',
            guia: 'Personajes, ambiente, mensaje central y lo que el pasaje muestra con claridad.',
            lineas: 5,
            respuesta: String(lectio.leer || '').trim()
        },
        {
            clave: 'meditar',
            eyebrow: 'Meditar',
            titulo: '¿Qué me dice Dios a mí, hoy?',
            guia: 'Cómo interpela tu vida concreta, qué ilumina, corrige, confirma o despierta.',
            lineas: 5,
            respuesta: String(lectio.meditar || '').trim()
        },
        {
            clave: 'orar',
            eyebrow: 'Orar y contemplar',
            titulo: '¿Qué le respondo al Señor?',
            guia: 'Agradecimiento, súplica, silencio, propósito o una oración nacida de la Palabra.',
            lineas: 5,
            respuesta: String(lectio.orar || '').trim()
        }
    ];
}


function obtenerDatosLectioActualParaPDF() {
    const { libro, capitulo, desde, hasta } = obtenerSeleccionLectioActual();
    if (!libro || !Number.isFinite(capitulo) || !Number.isFinite(desde) || !Number.isFinite(hasta)) {
        return null;
    }

    const pasaje = obtenerPasajeLectio(libro, capitulo, desde, hasta);
    if (pasaje.length === 0) return null;
    const leer = normalizarRespuestaLectio('leer', document.getElementById('lectio-leer')?.value || '');
    const meditar = normalizarRespuestaLectio('meditar', document.getElementById('lectio-meditar')?.value || '');
    const orar = normalizarRespuestaLectio('orar', document.getElementById('lectio-orar')?.value || '');

    return {
        libro,
        capitulo,
        desde,
        hasta,
        referencia: formatearReferenciaLectio(libro, capitulo, desde, hasta),
        pasaje,
        leer,
        meditar,
        orar
    };
}

function generarHtmlColeccionParaPDF(coleccion) {
    const fecha = new Date().toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const versiculosOrdenados = obtenerVersiculosColeccionOrdenados(coleccion);
    const lineasRetiroHtml = generarLineasRetiroParaPDF(11);
    const entradasHtml = versiculosOrdenados.map((item, index) => `
        <article class="entrada">
            <div class="entrada-numero">${index + 1}</div>
            <div class="entrada-contenido">
                <p class="entrada-ref">${escapeHtml(formatearReferenciaCompartida(item.libro, item.capitulo, item.versiculo))}</p>
                <p class="entrada-texto">${escapeHtml(item.texto || '')}</p>
            </div>
        </article>
    `).join('');

    return `
        <!DOCTYPE html>
        <html lang="es-ar">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title></title> 
            <style>
                :root {
                    color-scheme: light;
                    --oro: #b8860b;
                    --tinta: #231b13;
                    --fondo: #fcfaf7;
                    --borde: #dfd2bd;
                    --muted: #7b6a58;
                }
                * { box-sizing: border-box; }
                body {
                    margin: 0;
                    padding: 2.2rem;
                    font-family: "Georgia", serif;
                    background: var(--fondo);
                    color: var(--tinta);
                }
                .cabecera {
                    margin-bottom: 1.8rem;
                    padding-bottom: 1.2rem;
                    border-bottom: 2px solid rgba(184, 134, 11, 0.24);
                }
                .eyebrow {
                    margin: 0 0 0.45rem;
                    font: 700 0.75rem/1.4 system-ui, sans-serif;
                    letter-spacing: 0.28em;
                    text-transform: uppercase;
                    color: var(--oro);
                }
                h1 {
                    margin: 0;
                    font-size: 2rem;
                    line-height: 1.15;
                }
                .meta {
                    margin: 0.6rem 0 0;
                    color: var(--muted);
                    font: 600 0.92rem/1.5 system-ui, sans-serif;
                }
                .entrada {
                    display: flex;
                    gap: 1rem;
                    align-items: flex-start;
                    padding: 1rem 0;
                    border-bottom: 1px solid rgba(184, 134, 11, 0.14);
                    break-inside: avoid;
                }
                .entrada-numero {
                    width: 2rem;
                    height: 2rem;
                    border-radius: 999px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(184, 134, 11, 0.14);
                    color: var(--oro);
                    font: 800 0.9rem/1 system-ui, sans-serif;
                    flex-shrink: 0;
                }
                .entrada-ref {
                    margin: 0 0 0.45rem;
                    color: var(--oro);
                    font: 800 0.88rem/1.45 system-ui, sans-serif;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                }
                .entrada-texto {
                    margin: 0;
                    font-size: 1.05rem;
                    line-height: 1.75;
                }
                .pie {
                    margin-top: 1.8rem;
                    color: var(--muted);
                    font: 600 0.82rem/1.5 system-ui, sans-serif;
                    text-align: right;
                }
                .retiro {
                    margin-top: 2.4rem;
                    padding: 1.4rem 1.35rem 0;
                    border: 1px solid rgba(184, 134, 11, 0.18);
                    border-radius: 1.2rem;
                    background:
                        radial-gradient(circle at top, rgba(184, 134, 11, 0.12), transparent 52%),
                        rgba(255, 255, 255, 0.62);
                    break-before: page;
                    page-break-before: always;
                }
                .retiro-eyebrow {
                    margin: 0 0 0.45rem;
                    color: var(--oro);
                    font: 800 0.74rem/1.4 system-ui, sans-serif;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                }
                .retiro-titulo {
                    margin: 0;
                    font-size: 1.45rem;
                    line-height: 1.2;
                }
                .retiro-texto {
                    margin: 0.55rem 0 1.15rem;
                    color: var(--muted);
                    font: 600 0.92rem/1.6 system-ui, sans-serif;
                }
                .retiro-lineas {
                    display: flex;
                    flex-direction: column;
                    gap: 0.8rem;
                }
                .retiro-linea {
                    display: flex;
                    align-items: center;
                    gap: 0.7rem;
                    min-height: 1.8rem;
                }
                .retiro-linea-numero {
                    width: 1.3rem;
                    color: rgba(123, 106, 88, 0.85);
                    font: 700 0.72rem/1 system-ui, sans-serif;
                    text-align: right;
                    flex-shrink: 0;
                }
                .retiro-linea-trazo {
                    flex: 1;
                    height: 1.8rem;
                    border-bottom: 1px solid rgba(184, 134, 11, 0.32);
                }
                @page {
                    margin: 1.4cm;
                }
                @media print {
                    body {
                        padding: 0;
                    }
                }
            </style>
        </head>
        <body>
            <header class="cabecera">
                <p class="eyebrow">Colección de Lumina</p>
                <h1>${escapeHtml(coleccion.nombre)}</h1>
                <p class="meta">${coleccion.versiculos.length} versículo${coleccion.versiculos.length === 1 ? '' : 's'} · Preparado el ${escapeHtml(fecha)}</p>
            </header>
            <main>${entradasHtml}</main>
            <section class="retiro" aria-label="Espacio final para escritura">
                <p class="retiro-eyebrow">Tipo Lectio Divna</p>
                <h2 class="retiro-titulo">Eco de la Palabra</h2>
                <p class="retiro-texto">Un espacio final para anotar luces, resonancias, ideas para compartir o una oración nacida de esta colección.</p>
                <div class="retiro-lineas">${lineasRetiroHtml}</div>
            </section>
            <footer class="pie"></footer>
        </body>
        </html>
    `;
}


function generarHtmlLectioParaPDF(lectio) {
    const fecha = new Date().toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const pasajeHtml = lectio.pasaje.map((item) => `
        <article class="entrada">
            <div class="entrada-numero">${item.versiculo}</div>
            <div class="entrada-contenido">
                <p class="entrada-texto">${escapeHtml(item.texto || '')}</p>
            </div>
        </article>
    `).join('');
    const bloquesLectio = obtenerBloquesLectioParaPDF(lectio).map(bloque => `
        <section class="lectio-bloque-pdf">
            <p class="lectio-bloque-eyebrow">${escapeHtml(bloque.eyebrow)}</p>
            <h2 class="lectio-bloque-titulo">${escapeHtml(bloque.titulo)}</h2>
            <p class="lectio-bloque-guia">${escapeHtml(bloque.guia)}</p>
            ${bloque.respuesta
            ? `<div class="lectio-bloque-respuesta">${renderizarTextoPlanoHtml(bloque.respuesta, true)}</div>`
            : `<div class="retiro-lineas">${generarLineasRetiroParaPDF(bloque.lineas)}</div>`}
        </section>
    `).join('');

    return `
        <!DOCTYPE html>

        <html lang="es-ar">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title></title>
            <style>

                :root {
                    color-scheme: light;
                    --oro: #b8860b;
                    --tinta: #231b13;
                    --fondo: #fcfaf7;
                    --borde: #dfd2bd;
                    --muted: #7b6a58;
                }
                * { box-sizing: border-box; }
                body {
                    margin: 0;
                    padding: 2.2rem;
                    font-family: "Georgia", serif;
                    background: var(--fondo);
                    color: var(--tinta);
                }
                .cabecera {
                    margin-bottom: 1.8rem;
                    padding-bottom: 1.2rem;
                    border-bottom: 2px solid rgba(184, 134, 11, 0.24);
                }
                .eyebrow {
                    margin: 0 0 0.45rem;
                    font: 700 0.75rem/1.4 system-ui, sans-serif;
                    letter-spacing: 0.28em;
                    text-transform: uppercase;
                    color: var(--oro);
                }
                h1 {
                    margin: 0;
                    font-size: 2rem;
                    line-height: 1.15;
                }
                .meta {
                    margin: 0.6rem 0 0;
                    color: var(--muted);
                    font: 600 0.92rem/1.5 system-ui, sans-serif;
                }
                .entrada {
                    display: flex;
                    gap: 1rem;
                    align-items: flex-start;
                    padding: 1rem 0;
                    border-bottom: 1px solid rgba(184, 134, 11, 0.14);
                    break-inside: avoid;
                }
                .entrada-numero {
                    width: 2rem;
                    height: 2rem;
                    border-radius: 999px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(184, 134, 11, 0.14);
                    color: var(--oro);
                    font: 800 0.9rem/1 system-ui, sans-serif;
                    flex-shrink: 0;
                }
                .entrada-texto {
                    margin: 0;
                    font-size: 1.05rem;
                    line-height: 1.75;
                }
                .lectio-hoja {
                    margin-top: 2.4rem;
                    padding: 1.4rem 1.35rem 0;
                    border: 1px solid rgba(184, 134, 11, 0.18);
                    border-radius: 1.2rem;
                    background:
                        radial-gradient(circle at top, rgba(184, 134, 11, 0.12), transparent 52%),
                        rgba(255, 255, 255, 0.62);
                }
                .lectio-hoja-eyebrow {
                    margin: 0 0 0.45rem;
                    color: var(--oro);
                    font: 800 0.74rem/1.4 system-ui, sans-serif;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                }
                .lectio-hoja-titulo {
                    margin: 0;
                    font-size: 1.45rem;
                    line-height: 1.2;
                }
                .lectio-hoja-texto {
                    margin: 0.55rem 0 1.15rem;
                    color: var(--muted);
                    font: 600 0.92rem/1.6 system-ui, sans-serif;
                }
                .lectio-bloque-pdf {
                    margin-bottom: 1.45rem;
                    padding-bottom: 1.2rem;
                    border-bottom: 1px solid rgba(184, 134, 11, 0.14);
                    break-inside: avoid;
                }
                .lectio-bloque-pdf:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0.2rem;
                }
                .lectio-bloque-eyebrow {
                    margin: 0 0 0.35rem;
                    color: var(--oro);
                    font: 800 0.72rem/1.4 system-ui, sans-serif;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                }
                .lectio-bloque-titulo {
                    margin: 0;
                    font-size: 1.12rem;
                    line-height: 1.35;
                }
                .lectio-bloque-guia {
                    margin: 0.45rem 0 0.95rem;
                    color: var(--muted);
                    font: 600 0.88rem/1.55 system-ui, sans-serif;
                }
                .lectio-bloque-respuesta {
                    padding: 0.95rem 1rem;
                    border-radius: 1rem;
                    border: 1px solid rgba(184, 134, 11, 0.16);
                    background: rgba(255, 255, 255, 0.86);
                    color: var(--tinta);
                    font: 600 0.95rem/1.7 system-ui, sans-serif;
                }
                .retiro-lineas {
                    display: flex;
                    flex-direction: column;
                    gap: 0.8rem;
                }
                .retiro-linea {
                    display: flex;
                    align-items: center;
                    gap: 0.7rem;
                    min-height: 1.8rem;
                }
                .retiro-linea-numero {
                    width: 1.3rem;
                    color: rgba(123, 106, 88, 0.85);
                    font: 700 0.72rem/1 system-ui, sans-serif;
                    text-align: right;
                    flex-shrink: 0;
                }
                .retiro-linea-trazo {
                    flex: 1;
                    height: 1.8rem;
                    border-bottom: 1px solid rgba(184, 134, 11, 0.32);
                }
                .pie {
                    margin-top: 1.8rem;
                    color: var(--muted);
                    font: 600 0.82rem/1.5 system-ui, sans-serif;
                    text-align: right;
                }
                @page {
                    margin: 1.4cm;
                }
                @media print {
                    body {
                        padding: 0;
                    }
                }
            </style>
        </head>
        <body>
            <header class="cabecera">
                <p class="eyebrow">Lectio Divina de Lumina</p>
                <h1>${escapeHtml(lectio.referencia)}</h1>
                <p class="meta">${lectio.pasaje.length} versículo${lectio.pasaje.length === 1 ? '' : 's'} · Preparado el ${escapeHtml(fecha)}</p>
            </header>
            <main>
                <section aria-label="Cita bíblica elegida">
                    <p class="eyebrow">Cita bíblica elegida</p>
                    ${pasajeHtml}
                </section>
                <section class="lectio-hoja" aria-label="Preguntas y espacio para escribir la Lectio">
                    <h2 class="lectio-hoja-titulo">Hoja de Lectio para compartir</h2>
                    <p class="lectio-hoja-texto">Llevá este pasaje a un encuentro, una clase o un retiro con preguntas guía y espacio listo para escribir las tres respuestas.</p>
                    ${bloquesLectio}
                </section>
            </main>
            <footer class="pie"></footer>
        </body>
        </html>
    `;
}

function normalizarSlugArchivoCompartido(texto, fallback = 'archivo') {
    return String(texto || fallback)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '') || fallback;
}

function usarCompartirNativoParaPdf() {
    const userAgent = navigator.userAgent || '';
    const coincideUA = /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent);
    const punteroTactil = Boolean(
        navigator.maxTouchPoints > 1 ||
        window.matchMedia?.('(pointer: coarse)').matches
    );
    const pantallaCompacta = Math.min(window.innerWidth || 0, window.innerHeight || 0) <= 1024;

    return coincideUA || (punteroTactil && pantallaCompacta);
}

function obtenerNombreArchivoLectioPdf(lectio) {
    return `lumina_lectio_${normalizarSlugArchivoCompartido(lectio?.referencia || 'lectio')}.pdf`;
}

function obtenerNombreArchivoColeccionPdf(coleccion) {
    return `lumina_coleccion_${normalizarSlugArchivoCompartido(coleccion?.nombre || 'coleccion')}.pdf`;
}

function convertirTextoABytesPdf(texto) {
    const contenido = String(texto || '');
    const bytes = new Uint8Array(contenido.length);

    for (let i = 0; i < contenido.length; i++) {
        const code = contenido.charCodeAt(i);
        bytes[i] = code <= 255 ? code : 63;
    }

    return bytes;
}

function concatenarBytesPdf(bloques) {
    const total = bloques.reduce((suma, bloque) => suma + bloque.length, 0);
    const combinado = new Uint8Array(total);
    let offset = 0;

    bloques.forEach(bloque => {
        combinado.set(bloque, offset);
        offset += bloque.length;
    });

    return combinado;
}

function crearPaginaCanvasLectioPdf(ancho = 1240, alto = 1754) {
    const canvas = document.createElement('canvas');
    canvas.width = ancho;
    canvas.height = alto;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return null;

    ctx.fillStyle = '#fcfaf7';
    ctx.fillRect(0, 0, ancho, alto);

    return {
        canvas,
        ctx,
        width: ancho,
        height: alto,
        y: 88
    };
}

function convertirDataUrlAJpegBytes(dataUrl) {
    const [, base64 = ''] = String(dataUrl || '').split(',');
    const binario = atob(base64);
    const bytes = new Uint8Array(binario.length);

    for (let i = 0; i < binario.length; i++) {
        bytes[i] = binario.charCodeAt(i);
    }

    return bytes;
}

async function convertirCanvasAJpegBytes(canvas, calidad = 0.9) {
    if (!canvas) throw new Error('Canvas inválido para JPEG');

    if (typeof canvas.toBlob === 'function') {
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', calidad));
        if (blob) {
            return new Uint8Array(await blob.arrayBuffer());
        }
    }

    return convertirDataUrlAJpegBytes(canvas.toDataURL('image/jpeg', calidad));
}

function escribirBloqueTextoCanvasPdf(ctx, texto, x, y, maxWidth, opciones = {}) {
    const {
        font = '400 32px Georgia, serif',
        color = '#231b13',
        lineHeight = 44
    } = opciones;

    ctx.save();
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    const lineas = Array.isArray(texto)
        ? texto
        : dividirTextoTarjetaEnLineas(ctx, String(texto || ''), maxWidth);

    lineas.forEach((linea, index) => {
        ctx.fillText(linea, x, y + index * lineHeight);
    });

    ctx.restore();

    return {
        lineas,
        height: lineas.length * lineHeight
    };
}

function dividirTextoCanvasPdfPorSaltos(ctx, texto, maxWidth) {
    const partes = String(texto || '').split(/\r?\n/);
    const lineas = [];

    partes.forEach((parte, indice) => {
        const limpia = parte.trim();

        if (!limpia) {
            lineas.push('');
        } else {
            lineas.push(...dividirTextoTarjetaEnLineas(ctx, limpia, maxWidth));
        }

        if (indice === partes.length - 1) return;
        if (limpia && partes[indice + 1]?.trim()) {
            // La siguiente parte ya arranca en una nueva línea por sí misma.
        }
    });

    return lineas.length > 0 ? lineas : [''];
}

function renderizarPaginasLectioCanvasPdf(lectio) {
    const fecha = new Date().toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const config = {
        width: 1240,
        height: 1754,
        marginX: 92,
        marginBottom: 92
    };
    const contentWidth = config.width - (config.marginX * 2);
    const paginas = [];
    let pagina = crearPaginaCanvasLectioPdf(config.width, config.height);
    if (!pagina) {
        throw new Error('No se pudo crear el canvas para el PDF');
    }

    paginas.push(pagina);

    const agregarPagina = () => {
        const nuevaPagina = crearPaginaCanvasLectioPdf(config.width, config.height);
        if (!nuevaPagina) {
            throw new Error('No se pudo crear una página adicional del PDF');
        }
        paginas.push(nuevaPagina);
        pagina = nuevaPagina;
        return pagina;
    };

    const dibujarCabeceraPrincipal = () => {
        const { ctx } = pagina;
        let y = pagina.y;

        y += escribirBloqueTextoCanvasPdf(ctx, 'Lectio Divina de Lumina', config.marginX, y, contentWidth, {
            font: '700 24px system-ui, sans-serif',
            color: '#b8860b',
            lineHeight: 30
        }).height;
        y += 16;

        y += escribirBloqueTextoCanvasPdf(ctx, lectio.referencia, config.marginX, y, contentWidth, {
            font: '700 56px Georgia, serif',
            color: '#231b13',
            lineHeight: 64
        }).height;
        y += 16;

        y += escribirBloqueTextoCanvasPdf(
            ctx,
            `${lectio.pasaje.length} versículo${lectio.pasaje.length === 1 ? '' : 's'} · Preparado el ${fecha}`,
            config.marginX,
            y,
            contentWidth,
            {
                font: '600 26px system-ui, sans-serif',
                color: '#7b6a58',
                lineHeight: 34
            }
        ).height;
        y += 22;

        ctx.save();
        ctx.strokeStyle = 'rgba(184, 134, 11, 0.24)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(config.marginX, y);
        ctx.lineTo(config.width - config.marginX, y);
        ctx.stroke();
        ctx.restore();

        pagina.y = y + 26;
    };

    const dibujarEncabezadoPasaje = (titulo = 'Cita bíblica elegida', subtitulo = '') => {
        const { ctx } = pagina;
        let y = pagina.y;

        y += escribirBloqueTextoCanvasPdf(ctx, titulo, config.marginX, y, contentWidth, {
            font: '700 24px system-ui, sans-serif',
            color: '#b8860b',
            lineHeight: 30
        }).height;

        if (subtitulo) {
            y += 12;
            y += escribirBloqueTextoCanvasPdf(ctx, subtitulo, config.marginX, y, contentWidth, {
                font: '600 22px system-ui, sans-serif',
                color: '#7b6a58',
                lineHeight: 30
            }).height;
        }

        pagina.y = y + 18;
    };

    const dibujarEntradaVersiculo = (item) => {
        const { ctx } = pagina;
        const textoX = config.marginX + 92;
        const textoWidth = contentWidth - 92;
        ctx.font = '400 34px Georgia, serif';
        const lineas = dividirTextoTarjetaEnLineas(ctx, String(item.texto || ''), textoWidth);
        const lineHeight = 48;
        const textoHeight = Math.max(56, lineas.length * lineHeight);
        const bloqueHeight = textoHeight + 28;

        if (pagina.y + bloqueHeight > config.height - config.marginBottom) {
            agregarPagina();
            dibujarEncabezadoPasaje('Cita bíblica elegida', 'Continuación del pasaje');
        }

        const yInicial = pagina.y;

        ctx.save();
        ctx.fillStyle = 'rgba(184, 134, 11, 0.14)';
        ctx.beginPath();
        ctx.arc(config.marginX + 28, yInicial + 28, 28, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#b8860b';
        ctx.font = '800 24px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(item.versiculo), config.marginX + 28, yInicial + 28);
        ctx.restore();

        escribirBloqueTextoCanvasPdf(ctx, lineas, textoX, yInicial, textoWidth, {
            font: '400 34px Georgia, serif',
            color: '#231b13',
            lineHeight
        });

        const separadorY = yInicial + bloqueHeight - 4;
        ctx.save();
        ctx.strokeStyle = 'rgba(184, 134, 11, 0.14)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(config.marginX, separadorY);
        ctx.lineTo(config.width - config.marginX, separadorY);
        ctx.stroke();
        ctx.restore();

        pagina.y = yInicial + bloqueHeight + 10;
    };

    const estimarAlturaBloqueLectio = (bloque, anchoInterno) => {
        const { ctx } = pagina;
        ctx.font = '600 22px system-ui, sans-serif';
        const lineasGuia = dividirTextoTarjetaEnLineas(ctx, bloque.guia, anchoInterno);

        if (bloque.respuesta) {
            ctx.font = '600 24px system-ui, sans-serif';
            const lineasRespuesta = dividirTextoCanvasPdfPorSaltos(ctx, bloque.respuesta, anchoInterno - 40);
            const alturaRespuesta = Math.max(92, (lineasRespuesta.length * 34) + 36);
            return 28 + 40 + (lineasGuia.length * 32) + 24 + alturaRespuesta + 18;
        }

        return 28 + 40 + (lineasGuia.length * 32) + 26 + (bloque.lineas * 48) + 18;
    };

    const dibujarSeccionLectio = () => {
        const bloques = obtenerBloquesLectioParaPDF(lectio);
        const cardX = config.marginX;
        const cardY = pagina.y + 18;
        const cardW = contentWidth;
        const innerX = cardX + 38;
        const innerW = cardW - 76;
        const alturaBloques = bloques.reduce((total, bloque) => total + estimarAlturaBloqueLectio(bloque, innerW), 0);
        const cardH = 130 + alturaBloques + 34;

        if (cardY + cardH > config.height - config.marginBottom) {
            agregarPagina();
        }

        const yBase = pagina.y + 18;
        const alturaRecalculada = 130 + bloques.reduce((total, bloque) => total + estimarAlturaBloqueLectio(bloque, innerW), 0) + 34;
        const { ctx } = pagina;

        ctx.save();
        trazarRectanguloRedondeado(ctx, cardX, yBase, cardW, alturaRecalculada, 28);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.74)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(184, 134, 11, 0.18)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        let y = yBase + 34;

        y += escribirBloqueTextoCanvasPdf(ctx, 'Tipo retiro', innerX, y, innerW, {
            font: '800 22px system-ui, sans-serif',
            color: '#b8860b',
            lineHeight: 28
        }).height;
        y += 10;

        y += escribirBloqueTextoCanvasPdf(ctx, 'Hoja de Lectio para compartir', innerX, y, innerW, {
            font: '700 42px Georgia, serif',
            color: '#231b13',
            lineHeight: 48
        }).height;
        y += 12;

        y += escribirBloqueTextoCanvasPdf(
            ctx,
            'Llevá este pasaje a un encuentro, una clase o un retiro con preguntas guía y espacio listo para escribir las tres respuestas.',
            innerX,
            y,
            innerW,
            {
                font: '600 23px system-ui, sans-serif',
                color: '#7b6a58',
                lineHeight: 32
            }
        ).height;
        y += 18;

        bloques.forEach((bloque, indice) => {
            y += escribirBloqueTextoCanvasPdf(ctx, bloque.eyebrow, innerX, y, innerW, {
                font: '800 20px system-ui, sans-serif',
                color: '#b8860b',
                lineHeight: 26
            }).height;
            y += 6;

            y += escribirBloqueTextoCanvasPdf(ctx, bloque.titulo, innerX, y, innerW, {
                font: '700 30px Georgia, serif',
                color: '#231b13',
                lineHeight: 36
            }).height;
            y += 8;

            y += escribirBloqueTextoCanvasPdf(ctx, bloque.guia, innerX, y, innerW, {
                font: '600 22px system-ui, sans-serif',
                color: '#7b6a58',
                lineHeight: 30
            }).height;
            y += 16;

            if (bloque.respuesta) {
                ctx.font = '600 24px system-ui, sans-serif';
                const lineasRespuesta = dividirTextoCanvasPdfPorSaltos(ctx, bloque.respuesta, innerW - 40);
                const alturaRespuesta = Math.max(92, (lineasRespuesta.length * 34) + 36);

                ctx.save();
                trazarRectanguloRedondeado(ctx, innerX, y, innerW, alturaRespuesta, 20);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
                ctx.fill();
                ctx.strokeStyle = 'rgba(184, 134, 11, 0.16)';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();

                escribirBloqueTextoCanvasPdf(ctx, lineasRespuesta, innerX + 20, y + 18, innerW - 40, {
                    font: '600 24px system-ui, sans-serif',
                    color: '#231b13',
                    lineHeight: 34
                });

                y += alturaRespuesta + 12;
            } else {
                for (let linea = 0; linea < bloque.lineas; linea++) {
                    const lineaY = y + (linea * 48);
                    ctx.save();
                    ctx.fillStyle = 'rgba(123, 106, 88, 0.85)';
                    ctx.font = '700 18px system-ui, sans-serif';
                    ctx.textAlign = 'right';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(String(linea + 1), innerX + 10, lineaY + 22);

                    ctx.strokeStyle = 'rgba(184, 134, 11, 0.32)';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(innerX + 28, lineaY + 22);
                    ctx.lineTo(cardX + cardW - 34, lineaY + 22);
                    ctx.stroke();
                    ctx.restore();
                }

                y += (bloque.lineas * 48) + 12;
            }

            if (indice < bloques.length - 1) {
                ctx.save();
                ctx.strokeStyle = 'rgba(184, 134, 11, 0.14)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(innerX, y);
                ctx.lineTo(cardX + cardW - 38, y);
                ctx.stroke();
                ctx.restore();
                y += 22;
            }
        });

        pagina.y = yBase + alturaRecalculada + 20;
    };

    const dibujarPiePaginas = () => {
        paginas.forEach(item => {
            const { ctx } = item;
            ctx.save();
            ctx.font = '600 18px system-ui, sans-serif';
            ctx.fillStyle = '#7b6a58';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'bottom';
            ctx.fillText('Generado desde Lumina', config.width - config.marginX, config.height - 34);
            ctx.restore();
        });
    };

    dibujarCabeceraPrincipal();
    dibujarEncabezadoPasaje('Cita bíblica elegida');
    lectio.pasaje.forEach(item => dibujarEntradaVersiculo(item));
    dibujarSeccionLectio();
    dibujarPiePaginas();

    return paginas.map(item => item.canvas);
}

function crearBlobPdfDesdeJpegs(paginas) {
    const anchoPagina = 595.28;
    const altoPagina = 841.89;
    const objetos = new Map();
    const referenciasPaginas = [];
    let siguienteId = 3;

    paginas.forEach((pagina, indice) => {
        const idPagina = siguienteId++;
        const idContenido = siguienteId++;
        const idImagen = siguienteId++;
        const nombreImagen = `Im${indice + 1}`;
        const contenido = convertirTextoABytesPdf(
            `q\n${anchoPagina.toFixed(2)} 0 0 ${altoPagina.toFixed(2)} 0 0 cm\n/${nombreImagen} Do\nQ\n`
        );

        referenciasPaginas.push(`${idPagina} 0 R`);
        objetos.set(idContenido, {
            tipo: 'stream',
            cabecera: `<< /Length ${contenido.length} >>\nstream\n`,
            bytes: contenido
        });
        objetos.set(idImagen, {
            tipo: 'stream',
            cabecera: `<< /Type /XObject /Subtype /Image /Width ${pagina.width} /Height ${pagina.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${pagina.bytes.length} >>\nstream\n`,
            bytes: pagina.bytes
        });
        objetos.set(idPagina, {
            tipo: 'texto',
            contenido: `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${anchoPagina.toFixed(2)} ${altoPagina.toFixed(2)}] /Resources << /ProcSet [/PDF /ImageC] /XObject << /${nombreImagen} ${idImagen} 0 R >> >> /Contents ${idContenido} 0 R >>`
        });
    });

    objetos.set(1, {
        tipo: 'texto',
        contenido: '<< /Type /Catalog /Pages 2 0 R >>'
    });
    objetos.set(2, {
        tipo: 'texto',
        contenido: `<< /Type /Pages /Kids [${referenciasPaginas.join(' ')}] /Count ${paginas.length} >>`
    });

    const ids = [...objetos.keys()].sort((a, b) => a - b);
    const maxId = ids[ids.length - 1] || 0;
    const offsets = new Array(maxId + 1).fill(0);
    const bloques = [new Uint8Array([37, 80, 68, 70, 45, 49, 46, 52, 10, 37, 255, 255, 255, 255, 10])];
    let offsetActual = bloques[0].length;

    ids.forEach(id => {
        offsets[id] = offsetActual;
        const objeto = objetos.get(id);
        let bloque;

        if (objeto.tipo === 'stream') {
            bloque = concatenarBytesPdf([
                convertirTextoABytesPdf(`${id} 0 obj\n`),
                convertirTextoABytesPdf(objeto.cabecera),
                objeto.bytes,
                convertirTextoABytesPdf('\nendstream\nendobj\n')
            ]);
        } else {
            bloque = concatenarBytesPdf([
                convertirTextoABytesPdf(`${id} 0 obj\n${objeto.contenido}\nendobj\n`)
            ]);
        }

        bloques.push(bloque);
        offsetActual += bloque.length;
    });

    let xref = `xref\n0 ${maxId + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i <= maxId; i++) {
        xref += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
    }
    xref += `trailer\n<< /Size ${maxId + 1} /Root 1 0 R >>\nstartxref\n${offsetActual}\n%%EOF`;
    bloques.push(convertirTextoABytesPdf(xref));

    return new Blob(bloques, { type: 'application/pdf' });
}

async function generarBlobPdfLectioMovil(lectio) {
    const canvases = renderizarPaginasLectioCanvasPdf(lectio);
    const paginas = [];

    for (const canvas of canvases) {
        paginas.push({
            width: canvas.width,
            height: canvas.height,
            bytes: await convertirCanvasAJpegBytes(canvas, 0.9)
        });
    }

    return crearBlobPdfDesdeJpegs(paginas);
}

function renderizarPaginasColeccionCanvasPdf(coleccion) {
    const fecha = new Date().toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const versiculosOrdenados = obtenerVersiculosColeccionOrdenados(coleccion);
    const config = {
        width: 1240,
        height: 1754,
        marginX: 92,
        marginBottom: 92
    };
    const contentWidth = config.width - (config.marginX * 2);
    const paginas = [];
    let pagina = crearPaginaCanvasLectioPdf(config.width, config.height);
    if (!pagina) {
        throw new Error('No se pudo crear el canvas para el PDF de colección');
    }

    paginas.push(pagina);

    const agregarPagina = () => {
        const nuevaPagina = crearPaginaCanvasLectioPdf(config.width, config.height);
        if (!nuevaPagina) {
            throw new Error('No se pudo crear una página adicional del PDF de colección');
        }
        paginas.push(nuevaPagina);
        pagina = nuevaPagina;
        return pagina;
    };

    const dibujarCabeceraPrincipal = () => {
        const { ctx } = pagina;
        let y = pagina.y;

        y += escribirBloqueTextoCanvasPdf(ctx, 'Colección de Lumina', config.marginX, y, contentWidth, {
            font: '700 24px system-ui, sans-serif',
            color: '#b8860b',
            lineHeight: 30
        }).height;
        y += 16;

        y += escribirBloqueTextoCanvasPdf(ctx, coleccion.nombre, config.marginX, y, contentWidth, {
            font: '700 56px Georgia, serif',
            color: '#231b13',
            lineHeight: 64
        }).height;
        y += 16;

        y += escribirBloqueTextoCanvasPdf(
            ctx,
            `${versiculosOrdenados.length} versículo${versiculosOrdenados.length === 1 ? '' : 's'} · Preparado el ${fecha}`,
            config.marginX,
            y,
            contentWidth,
            {
                font: '600 26px system-ui, sans-serif',
                color: '#7b6a58',
                lineHeight: 34
            }
        ).height;
        y += 22;

        ctx.save();
        ctx.strokeStyle = 'rgba(184, 134, 11, 0.24)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(config.marginX, y);
        ctx.lineTo(config.width - config.marginX, y);
        ctx.stroke();
        ctx.restore();

        pagina.y = y + 26;
    };

    const dibujarEncabezadoListado = (titulo = 'Versículos elegidos', subtitulo = '') => {
        const { ctx } = pagina;
        let y = pagina.y;

        y += escribirBloqueTextoCanvasPdf(ctx, titulo, config.marginX, y, contentWidth, {
            font: '700 24px system-ui, sans-serif',
            color: '#b8860b',
            lineHeight: 30
        }).height;

        if (subtitulo) {
            y += 12;
            y += escribirBloqueTextoCanvasPdf(ctx, subtitulo, config.marginX, y, contentWidth, {
                font: '600 22px system-ui, sans-serif',
                color: '#7b6a58',
                lineHeight: 30
            }).height;
        }

        pagina.y = y + 18;
    };

    const dibujarEntradaColeccion = (item, index) => {
        const { ctx } = pagina;
        const referencia = formatearReferenciaCompartida(item.libro, item.capitulo, item.versiculo);
        const textoX = config.marginX + 92;
        const textoWidth = contentWidth - 92;

        ctx.font = '800 23px system-ui, sans-serif';
        const lineasReferencia = dividirTextoTarjetaEnLineas(ctx, referencia, textoWidth);
        ctx.font = '400 34px Georgia, serif';
        const lineasTexto = dividirTextoTarjetaEnLineas(ctx, String(item.texto || ''), textoWidth);

        const refHeight = Math.max(30, lineasReferencia.length * 30);
        const textoHeight = Math.max(56, lineasTexto.length * 48);
        const bloqueHeight = refHeight + textoHeight + 36;

        if (pagina.y + bloqueHeight > config.height - config.marginBottom) {
            agregarPagina();
            dibujarEncabezadoListado('Versículos elegidos', 'Continuación de la colección');
        }

        const yInicial = pagina.y;

        ctx.save();
        ctx.fillStyle = 'rgba(184, 134, 11, 0.14)';
        ctx.beginPath();
        ctx.arc(config.marginX + 28, yInicial + 28, 28, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#b8860b';
        ctx.font = '800 24px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(index + 1), config.marginX + 28, yInicial + 28);
        ctx.restore();

        escribirBloqueTextoCanvasPdf(ctx, lineasReferencia, textoX, yInicial, textoWidth, {
            font: '800 23px system-ui, sans-serif',
            color: '#b8860b',
            lineHeight: 30
        });
        escribirBloqueTextoCanvasPdf(ctx, lineasTexto, textoX, yInicial + refHeight + 6, textoWidth, {
            font: '400 34px Georgia, serif',
            color: '#231b13',
            lineHeight: 48
        });

        const separadorY = yInicial + bloqueHeight - 6;
        ctx.save();
        ctx.strokeStyle = 'rgba(184, 134, 11, 0.14)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(config.marginX, separadorY);
        ctx.lineTo(config.width - config.marginX, separadorY);
        ctx.stroke();
        ctx.restore();

        pagina.y = yInicial + bloqueHeight + 10;
    };

    const dibujarEcoDeLaPalabra = () => {
        agregarPagina();
        const { ctx } = pagina;
        const cardX = config.marginX;
        const cardY = pagina.y + 18;
        const cardW = contentWidth;
        const cardH = 1180;
        const innerX = cardX + 38;
        const innerW = cardW - 76;

        ctx.save();
        trazarRectanguloRedondeado(ctx, cardX, cardY, cardW, cardH, 28);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.74)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(184, 134, 11, 0.18)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        let y = cardY + 34;

        y += escribirBloqueTextoCanvasPdf(ctx, 'Tipo Lectio Divina', innerX, y, innerW, {
            font: '800 22px system-ui, sans-serif',
            color: '#b8860b',
            lineHeight: 28
        }).height;
        y += 10;

        y += escribirBloqueTextoCanvasPdf(ctx, 'Eco de la Palabra', innerX, y, innerW, {
            font: '700 42px Georgia, serif',
            color: '#231b13',
            lineHeight: 48
        }).height;
        y += 12;

        y += escribirBloqueTextoCanvasPdf(
            ctx,
            'Un espacio final para anotar luces, resonancias, ideas para compartir o una oración nacida de esta colección.',
            innerX,
            y,
            innerW,
            {
                font: '600 23px system-ui, sans-serif',
                color: '#7b6a58',
                lineHeight: 32
            }
        ).height;
        y += 24;

        for (let linea = 0; linea < 11; linea++) {
            const lineaY = y + (linea * 68);
            ctx.save();
            ctx.fillStyle = 'rgba(123, 106, 88, 0.85)';
            ctx.font = '700 18px system-ui, sans-serif';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(String(linea + 1), innerX + 10, lineaY + 22);

            ctx.strokeStyle = 'rgba(184, 134, 11, 0.32)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(innerX + 28, lineaY + 22);
            ctx.lineTo(cardX + cardW - 34, lineaY + 22);
            ctx.stroke();
            ctx.restore();
        }

        pagina.y = cardY + cardH + 20;
    };

    const dibujarPiePaginas = () => {
        paginas.forEach(item => {
            const { ctx } = item;
            ctx.save();
            ctx.font = '600 18px system-ui, sans-serif';
            ctx.fillStyle = '#7b6a58';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'bottom';
            ctx.fillText('Generado desde Lumina', config.width - config.marginX, config.height - 34);
            ctx.restore();
        });
    };

    dibujarCabeceraPrincipal();
    dibujarEncabezadoListado('Versículos elegidos');
    versiculosOrdenados.forEach((item, index) => dibujarEntradaColeccion(item, index));
    dibujarEcoDeLaPalabra();
    dibujarPiePaginas();

    return paginas.map(item => item.canvas);
}

async function generarBlobPdfColeccionMovil(coleccion) {
    const canvases = renderizarPaginasColeccionCanvasPdf(coleccion);
    const paginas = [];

    for (const canvas of canvases) {
        paginas.push({
            width: canvas.width,
            height: canvas.height,
            bytes: await convertirCanvasAJpegBytes(canvas, 0.9)
        });
    }

    return crearBlobPdfDesdeJpegs(paginas);
}

async function compartirColeccionComoPdfArchivo(coleccion) {
    const blob = await generarBlobPdfColeccionMovil(coleccion);
    const nombreArchivo = obtenerNombreArchivoColeccionPdf(coleccion);
    const archivo = typeof File !== 'undefined'
        ? new File([blob], nombreArchivo, { type: 'application/pdf' })
        : null;

    if (usarCompartirNativoParaPdf() && archivo && navigator.share) {
        const datosCompartir = {
            title: `Colección: ${coleccion.nombre}`,
            text: `${coleccion.nombre}\nCompartido desde Lumina`,
            files: [archivo]
        };
        const puedeCompartirArchivo = !navigator.canShare || navigator.canShare({ files: [archivo] });

        if (puedeCompartirArchivo) {
            try {
                await navigator.share(datosCompartir);
                lanzarToast('PDF listo para compartir');
                return true;
            } catch (errorCompartir) {
                if (errorCompartir && errorCompartir.name === 'AbortError') {
                    return true;
                }
                console.warn('No se pudo compartir el PDF de la colección directamente. Probamos con descarga.', errorCompartir);
            }
        }
    }

    descargarBlobCompartido(blob, nombreArchivo);
    lanzarToast('Tu navegador descargó la colección en PDF');
    return true;
}

async function compartirLectioComoPdfArchivo(lectio) {
    const blob = await generarBlobPdfLectioMovil(lectio);
    const nombreArchivo = obtenerNombreArchivoLectioPdf(lectio);
    const archivo = typeof File !== 'undefined'
        ? new File([blob], nombreArchivo, { type: 'application/pdf' })
        : null;

    if (usarCompartirNativoParaPdf() && archivo && navigator.share) {
        const datosCompartir = {
            title: `Lectio: ${lectio.referencia}`,
            text: `${lectio.referencia}\nCompartido desde Lumina`,
            files: [archivo]
        };
        const puedeCompartirArchivo = !navigator.canShare || navigator.canShare({ files: [archivo] });

        if (puedeCompartirArchivo) {
            try {
                await navigator.share(datosCompartir);
                lanzarToast('PDF listo para compartir');
                return true;
            } catch (errorCompartir) {
                if (errorCompartir && errorCompartir.name === 'AbortError') {
                    return true;
                }
                console.warn('No se pudo compartir el PDF directamente. Probamos con descarga.', errorCompartir);
            }
        }
    }

    descargarBlobCompartido(blob, nombreArchivo);
    lanzarToast('Tu navegador descargó la Lectio en PDF');
    return true;
}

function abrirImpresionColeccion(html) {
    const iframe = document.createElement('iframe');
    if (!iframe) return false;

    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    Object.assign(iframe.style, {
        position: 'fixed',
        right: '0',
        bottom: '0',
        width: '1px',
        height: '1px',
        border: '0',
        opacity: '0',
        pointerEvents: 'none'
    });

    let impresionLanzada = false;
    const limpiar = () => {
        setTimeout(() => iframe.remove(), 1200);
    };

    const lanzarImpresion = () => {
        if (impresionLanzada) return;
        impresionLanzada = true;

        const destino = iframe.contentWindow;
        if (!destino || typeof destino.print !== 'function') {
            limpiar();
            lanzarToast('No se pudo abrir el diálogo para PDF en este navegador');
            return;
        }

        try {
            destino.onafterprint = () => limpiar();
        } catch (_) {
            // Algunos navegadores móviles no permiten asignar este callback.
        }

        setTimeout(() => {
            try {
                destino.focus();
                destino.print();
                limpiar();
            } catch (error) {
                console.error('No se pudo abrir el diálogo de impresión:', error);
                limpiar();
                lanzarToast('No se pudo abrir el diálogo para PDF en este navegador');
            }
        }, 280);
    };

    iframe.onload = lanzarImpresion;
    document.body.appendChild(iframe);

    if ('srcdoc' in iframe) {
        iframe.srcdoc = html;
    } else {
        const doc = iframe.contentWindow?.document;
        if (!doc) {
            iframe.remove();
            return false;
        }
        doc.open();
        doc.write(html);
        doc.close();
        setTimeout(lanzarImpresion, 280);
    }

    return true;
}

async function exportarColeccionComoPDF(coleccionId) {
    const coleccion = obtenerColeccionVersiculosPorId(coleccionId);
    if (!coleccion) {
        lanzarToast('No encontramos esa colección');
        return;
    }

    if (coleccion.versiculos.length === 0) {
        lanzarToast('La colección está vacía');
        return;
    }

    try {
        await compartirColeccionComoPdfArchivo(coleccion);
        return;
    } catch (error) {
        console.error('No se pudo generar el PDF real de la colección:', error);
        lanzarToast('No se pudo preparar el PDF real. Abrimos la vista clásica.');
    }

    const html = generarHtmlColeccionParaPDF(coleccion);
    const inicioCorrecto = abrirImpresionColeccion(html);
    if (!inicioCorrecto) {
        lanzarToast('No se pudo preparar la exportación a PDF');
        return;
    }

    lanzarToast('Se abrió el diálogo para guardar o compartir el PDF');
}

async function exportarLectioComoPDF() {
    const lectio = obtenerDatosLectioActualParaPDF();
    if (!lectio) {
        lanzarToast('Elegí primero un pasaje válido para la Lectio');
        return;
    }

    try {
        await compartirLectioComoPdfArchivo(lectio);
        return;
    } catch (error) {
        console.error('No se pudo generar el PDF real de la Lectio:', error);
        lanzarToast('No se pudo preparar el PDF real. Abrimos la vista clásica.');
    }

    const html = generarHtmlLectioParaPDF(lectio);
    const inicioCorrecto = abrirImpresionColeccion(html);
    if (!inicioCorrecto) {
        lanzarToast('No se pudo preparar la exportación a PDF');
        return;
    }

    lanzarToast('Se abrió el diálogo para guardar o compartir el PDF');
}

function limpiarAutorComentario(autor) {
    return String(autor || "")
        .replace(/^comentario de\s+/i, "")
        .trim();
}

function compartirComentario(libro, capitulo, versiculo, autor, texto) {
    const autorLimpio = limpiarAutorComentario(autor);
    const referencia = formatearReferenciaComentarioTradicion(libro, capitulo, versiculo);
    const textoLimpio = String(texto || '').trim();
    const encabezado = referencia
        ? `Comentario de ${autorLimpio}, de ${referencia}:`
        : `Comentario de ${autorLimpio}:`;
    const contenido = `${encabezado}\n${textoLimpio}\n- Compartido desde Lumina`;
    compartirTexto(contenido, referencia ? `Comentario de ${autorLimpio} sobre ${referencia}` : `Comentario de ${autorLimpio}`);
}

function compartirNota(libro, capitulo, versiculo, texto) {
    const referencia = formatearReferenciaCompartida(libro, capitulo, versiculo);
    const textoLimpio = String(texto || '').trim();
    const encabezado = referencia
        ? `Nota propia sobre ${referencia}:`
        : 'Nota propia:';
    const contenido = `${encabezado}\n${textoLimpio}\n- Compartido desde Lumina`;
    compartirTexto(contenido, referencia ? `Nota propia sobre ${referencia}` : 'Nota propia');
}

// --------------------------------------------------------------
// 9. MODO OSCURO
// --------------------------------------------------------------
let vozActiva = null;
let btnAudioActivo = null;  // Rastrear qué botón de audio está en reproducción
let leyendoCapituloCompleto = false;

// Variables para rastrear versículo en reproducción
let versiculoActualEnLectura = null; // { libro, capitulo, versiculo }
let listaVersiculosEnCapitulo = []; // Array de versículos en orden

// Variables para mantener reproducción con pantalla apagada
let reproduccionActiva = false; // Track if actively playing
let intentosReanudacion = 0; // Counter para intentos de reanudación
const MAX_INTENTOS_REANUDACION = 3; // Máximo de intentos antes de renunciar
let tokenLecturaActiva = 0;
let timeoutLecturaActiva = null;
let speechSynthesisDesbloqueada = false;
let vozEspanolPrecargada = null;

function navegadorSoportaLectura() {
    return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

function esDispositivoMovilLectura() {
    const userAgent = navigator.userAgent || '';
    return Boolean(
        navigator.maxTouchPoints > 1 ||
        window.matchMedia?.('(pointer: coarse)').matches ||
        /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent)
    );
}

function seleccionarVozEspanol(voces) {
    // 1. Log de debug detallado: Nombre + Lang
    console.log('--- Listado detallado de voces ---');
    voces.forEach(v => console.log(`Voz: ${v.name} | Lang: ${v.lang}`));
    console.log('------------------------------------');

    // 2. Prioridad 1: Búsqueda exhaustiva por Argentina (Lang o Nombre)
    // Buscamos "es-AR" o que el nombre contenga "Argentina" o "Elena" (voz de iOS)
    let vozAR = voces.find(v =>
        (v.lang && v.lang.toLowerCase() === 'es-ar') ||
        (v.name && (v.name.toLowerCase().includes('argentina') || v.name.toLowerCase().includes('elena')))
    );

    if (vozAR) {
        console.log('? Usando voz rioplatense identificada:', vozAR.name);
        return vozAR;
    }

    // 3. Prioridad 2: Variantes preferidas (Subimos es-US y es-MX sobre es-ES)
    const variantesEspanol = ['es-MX', 'es-US', 'es-CO', 'es-VE', 'es-PE', 'es-CL', 'es', 'es-ES'];

    for (let variante of variantesEspanol) {
        let vozEncontrada = voces.find(v => v.lang && v.lang.toLowerCase().includes(variante.toLowerCase()));
        if (vozEncontrada) {
            console.log(`? Usando variante ${variante}:`, vozEncontrada.name);
            return vozEncontrada;
        }
    }

    // Fallback: la primera que aparezca si todo lo anterior falla
    console.warn('No se encontró variante preferida, usando:', voces[0].lang);
    return voces.length > 0 ? voces[0] : null;
}

function sincronizarVozEspanol() {
    if (!navegadorSoportaLectura()) return null;

    const voces = window.speechSynthesis.getVoices();
    if (voces.length === 0) {
        vozEspanolPrecargada = null;
        console.log('Sincronizando voces para Lumina... aún no hay voces disponibles.');
        return null;
    }

    vozEspanolPrecargada = seleccionarVozEspanol(voces);

    if (vozEspanolPrecargada) {
        console.log(`Sincronizando voces para Lumina... ${vozEspanolPrecargada.name} (${vozEspanolPrecargada.lang})`);
    }

    return vozEspanolPrecargada;
}

function obtenerVozEspanol() {
    if (!navegadorSoportaLectura()) return null;
    const voces = window.speechSynthesis.getVoices();

    // Si no hay voces disponibles, esperar a que se carguen (común en móvil)
    if (voces.length === 0) {
        vozEspanolPrecargada = null;
        return null;
    }

    if (vozEspanolPrecargada) {
        const vozActual = voces.find(v =>
            (v.voiceURI && vozEspanolPrecargada.voiceURI && v.voiceURI === vozEspanolPrecargada.voiceURI) ||
            (v.name === vozEspanolPrecargada.name && v.lang === vozEspanolPrecargada.lang)
        );

        if (vozActual) {
            vozEspanolPrecargada = vozActual;
            return vozActual;
        }
    }

    vozEspanolPrecargada = seleccionarVozEspanol(voces);
    return vozEspanolPrecargada;
}

function cambiarAIconoPausa(btn) {
    if (!btn) return;
    btn.classList.add('en-reproduccion');
    btn.dataset.reproduciendo = 'true';
    actualizarContenidoBotonAudioVersiculo(btn, true);
}

function restaurarIconoParla(btn) {
    if (!btn) return;
    btn.classList.remove('en-reproduccion');
    btn.dataset.reproduciendo = 'false';
    actualizarContenidoBotonAudioVersiculo(btn, false);
}

function actualizarContenidoBotonAudioVersiculo(btn, reproduciendo) {
    if (!btn) return;

    const esBotonMenu = btn.classList.contains('verse-card-menu-item');
    const esBotonVersiculo = btn.classList.contains('btn-audio-versiculo');
    const esBotonLectio = btn.classList.contains('btn-audio-lectio');
    const etiquetaBase = esBotonLectio ? 'pasaje' : (esBotonVersiculo ? 'versículo' : '');
    const titulo = reproduciendo
        ? 'Detener audio'
        : etiquetaBase ? `Escuchar ${etiquetaBase}` : 'Escuchar';
    btn.title = titulo;
    btn.setAttribute('aria-label', titulo);
    btn.setAttribute('aria-pressed', reproduciendo ? 'true' : 'false');

    if (esBotonMenu && esBotonVersiculo) {
        btn.innerHTML = reproduciendo
            ? '<i class="fas fa-stop menu-item-icono text-sm" aria-hidden="true"></i><span>Detener audio</span>'
            : '<i class="fas fa-volume-up menu-item-icono text-sm" aria-hidden="true"></i><span>Escuchar</span>';
        return;
    }

    if (esBotonLectio) {
        btn.innerHTML = reproduciendo
            ? '<i class="fas fa-stop text-sm" aria-hidden="true"></i><span>Detener audio</span>'
            : '<i class="fas fa-volume-up text-sm" aria-hidden="true"></i><span>Escuchar pasaje</span>';
        return;
    }

    if (esBotonVersiculo) {
        btn.innerHTML = reproduciendo
            ? '<span class="audio-icon" aria-hidden="true">⏹</span>'
            : '<span class="audio-icon" aria-hidden="true">🔊</span>';
        return;
    }

    btn.innerHTML = reproduciendo
        ? '<i class="fas fa-stop text-sm" aria-hidden="true"></i>'
        : '<i class="fas fa-volume-up text-sm" aria-hidden="true"></i>';
}

function detenerConRestauracion() {
    if (btnAudioActivo) {
        restaurarIconoParla(btnAudioActivo);
        btnAudioActivo = null;
    }
    detenerLectura();
}

function detenerReproduccionesLuminaActivas() {
    detenerConRestauracion();
    detenerAudiosCelebracion();
}

function limpiarEstadoLectura() {
    if (btnAudioActivo) {
        restaurarIconoParla(btnAudioActivo);
        btnAudioActivo = null;
    }

    document.querySelectorAll('.btn-audio-versiculo').forEach(btn => {
        btn.classList.remove('reproduciendo');
        actualizarContenidoBotonAudioVersiculo(btn, false);
    });
}

function detenerLectura() {
    if (!navegadorSoportaLectura()) return;

    // Limpiar monitores de reproducción
    limpiarMonitorReproduccion();
    tokenLecturaActiva += 1;
    if (timeoutLecturaActiva) {
        clearTimeout(timeoutLecturaActiva);
        timeoutLecturaActiva = null;
    }

    leyendoCapituloCompleto = false;
    leyendoLibroCompleto = false;
    libroEnReproduccion = null;
    capituloEnReproduccion = null;
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
    }
    vozActiva = null;
    limpiarEstadoLectura();
    limpiarResaltadoVersiculo();
    actualizarBotonesReproduccionListas();
}

function normalizarTextoParaLectura(texto) {
    const textoLimpio = String(texto || '').replace(/\s+/g, ' ').trim();
    if (!textoLimpio) return '';

    const acotacionPura = textoLimpio.match(/^\[([^\]]+)\]$/);
    if (acotacionPura) {
        const etiqueta = acotacionPura[1].trim();
        return etiqueta ? `${etiqueta}.` : '';
    }

    return textoLimpio;
}

function crearUtteranceLectura(texto) {
    // 1. Limpiamos espacios extra y volvemos pronunciables las acotaciones.
    const textoLimpio = normalizarTextoParaLectura(texto);
    const utterance = new SpeechSynthesisUtterance(textoLimpio);

    // 2. Obtenemos la mejor voz disponible con nuestra nueva lógica
    const voz = obtenerVozEspanol();

    if (voz) {
        utterance.voice = voz;
        utterance.lang = voz.lang;
        console.log(`Utterance configurada con voz: ${voz.name} (${voz.lang})`);
    } else {
        // Fallback: usar "es" genérico evita silenciar equipos que no tengan es-AR.
        utterance.lang = 'es';
        console.log('Utterance con idioma de respaldo: es');
    }

    // 3. Parámetros de entonación
    utterance.rate = 0.92; // Velocidad levemente pausada para mayor claridad
    utterance.pitch = 1.0; // Tono natural
    utterance.volume = 1.0; // Volumen al máximo por defecto

    return utterance;
}

function desbloquearSpeechSynthesis() {
    if (speechSynthesisDesbloqueada || !navegadorSoportaLectura()) return;

    try {
        const utteranceSilenciosa = new SpeechSynthesisUtterance(' ');
        utteranceSilenciosa.volume = 0;
        utteranceSilenciosa.rate = 1;
        utteranceSilenciosa.pitch = 1;
        utteranceSilenciosa.lang = 'es';
        window.speechSynthesis.speak(utteranceSilenciosa);
        window.speechSynthesis.cancel();
        speechSynthesisDesbloqueada = true;
    } catch (error) {
        console.warn('No se pudo desbloquear speechSynthesis:', error);
    }
}

function dividirTextoParaLectura(texto, maxChars = esDispositivoMovilLectura() ? 320 : 360) {
    const limpio = String(texto || '').replace(/\s+/g, ' ').trim();
    if (!limpio) return [];
    if (limpio.length <= maxChars) return [limpio];

    const fragmentos = [];
    const oraciones = limpio.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [limpio];
    let bloqueActual = '';

    const guardarBloque = () => {
        const bloque = bloqueActual.trim();
        if (bloque) fragmentos.push(bloque);
        bloqueActual = '';
    };

    const dividirLargo = (segmento) => {
        const partes = segmento.match(/[^,;:]+[,;:]?|[^,;:]+$/g) || [segmento];
        let acumulado = '';

        partes.forEach(parte => {
            const candidata = `${acumulado} ${parte}`.trim();
            if (candidata.length <= maxChars) {
                acumulado = candidata;
                return;
            }

            if (acumulado) {
                fragmentos.push(acumulado.trim());
                acumulado = '';
            }

            if (parte.length <= maxChars) {
                acumulado = parte.trim();
                return;
            }

            const palabras = parte.split(/\s+/);
            let trozo = '';
            palabras.forEach(palabra => {
                const siguiente = `${trozo} ${palabra}`.trim();
                if (siguiente.length <= maxChars) {
                    trozo = siguiente;
                } else {
                    if (trozo) fragmentos.push(trozo.trim());
                    trozo = palabra;
                }
            });
            if (trozo) acumulado = trozo.trim();
        });

        if (acumulado) fragmentos.push(acumulado.trim());
    };

    oraciones.forEach(oracion => {
        const candidata = `${bloqueActual} ${oracion}`.trim();
        if (candidata.length <= maxChars) {
            bloqueActual = candidata;
            return;
        }

        if (bloqueActual) guardarBloque();

        if (oracion.length <= maxChars) {
            bloqueActual = oracion.trim();
            return;
        }

        dividirLargo(oracion.trim());
    });

    guardarBloque();
    return fragmentos.filter(Boolean);
}

function reproducirUtterance(utterance) {
    if (!utterance || !navegadorSoportaLectura()) return false;

    const texto = String(utterance.text || '').trim();
    if (!texto) return false;

    const fragmentos = dividirTextoParaLectura(texto);
    const token = ++tokenLecturaActiva;
    let arranco = false;
    let indice = 0;
    const demoraEntreFragmentos = esDispositivoMovilLectura() ? 20 : 30;

    if (timeoutLecturaActiva) {
        clearTimeout(timeoutLecturaActiva);
        timeoutLecturaActiva = null;
    }

    const hablarSiguiente = () => {
        if (token !== tokenLecturaActiva) return;

        const textoFragmento = fragmentos[indice];
        if (!textoFragmento) {
            if (typeof utterance.onend === 'function') {
                utterance.onend();
            }
            return;
        }

        const fragmento = new SpeechSynthesisUtterance(textoFragmento);
        fragmento.voice = utterance.voice || null;
        fragmento.lang = utterance.lang || 'es';
        fragmento.rate = utterance.rate;
        fragmento.pitch = utterance.pitch;
        fragmento.volume = utterance.volume;

        fragmento.onstart = (event) => {
            if (token !== tokenLecturaActiva) return;
            if (!arranco) {
                arranco = true;
                if (typeof utterance.onstart === 'function') {
                    utterance.onstart(event);
                }
            }
        };

        fragmento.onerror = (event) => {
            if (token !== tokenLecturaActiva) return;
            console.error('TTS error:', event?.error || event);
            if (typeof utterance.onerror === 'function') {
                utterance.onerror(event);
            }
        };

        fragmento.onend = (event) => {
            if (token !== tokenLecturaActiva) return;
            indice += 1;
            if (indice >= fragmentos.length) {
                if (typeof utterance.onend === 'function') {
                    utterance.onend(event);
                }
                return;
            }

            timeoutLecturaActiva = setTimeout(hablarSiguiente, demoraEntreFragmentos);
        };

        try {
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            }
            window.speechSynthesis.speak(fragmento);
        } catch (error) {
            console.error('Error al iniciar la lectura en voz alta:', error);
            if (typeof utterance.onerror === 'function') {
                utterance.onerror(error);
            } else if (typeof lanzarToast === 'function') {
                lanzarToast('No se pudo iniciar la lectura en voz alta');
            }
        }
    };

    try {
        // En varios navegadores móviles, hablar justo después de un cancel() falla.
        desbloquearSpeechSynthesis();
        window.speechSynthesis.cancel();
        timeoutLecturaActiva = setTimeout(hablarSiguiente, 80);
        return true;
    } catch (error) {
        console.error('Error al iniciar la lectura en voz alta:', error);
        if (typeof lanzarToast === 'function') {
            lanzarToast('No se pudo iniciar la lectura en voz alta');
        }
        return false;
    }
}

function finalizarLecturaSecuencial(opciones = {}) {
    const { actualizarBotonCapitulo = false, actualizarBotonLibro = false } = opciones;

    limpiarMonitorReproduccion();
    leyendoCapituloCompleto = false;
    leyendoLibroCompleto = false;
    libroEnReproduccion = null;
    capituloEnReproduccion = null;
    vozActiva = null;
    limpiarEstadoLectura();
    limpiarResaltadoVersiculo();

    if (actualizarBotonCapitulo) {
        actualizarBotonLeerCapitulo(false);
        return;
    }

    if (actualizarBotonLibro) {
        actualizarBotonLeerLibro(false);
        return;
    }

    actualizarBotonesReproduccionListas();
}

function reproducirSecuenciaVersiculos(secuencia, opciones = {}) {
    if (!Array.isArray(secuencia) || secuencia.length === 0 || !navegadorSoportaLectura()) {
        return false;
    }

    const {
        pausaEntreVersiculosMs = esDispositivoMovilLectura() ? 80 : 60,
        onPrimerInicio,
        onFin,
        onError
    } = opciones;

    const token = ++tokenLecturaActiva;
    let indiceActual = 0;
    let inicioNotificado = false;

    if (timeoutLecturaActiva) {
        clearTimeout(timeoutLecturaActiva);
        timeoutLecturaActiva = null;
    }

    const reproducirSiguiente = () => {
        if (token !== tokenLecturaActiva) return;

        const item = secuencia[indiceActual];
        if (!item) {
            timeoutLecturaActiva = null;
            if (typeof onFin === 'function') {
                onFin();
            }
            return;
        }

        const texto = String(item.texto || '').trim();
        if (!texto) {
            indiceActual += 1;
            reproducirSiguiente();
            return;
        }

        const utterance = crearUtteranceLectura(texto);

        utterance.onstart = (event) => {
            if (token !== tokenLecturaActiva) return;

            if (Number.isFinite(item.capitulo) && Number.isFinite(item.versiculo) && item.libro) {
                resaltarVersiculo(item.libro, item.capitulo, item.versiculo);
            } else {
                limpiarResaltadoVersiculo();
            }

            if (!inicioNotificado) {
                inicioNotificado = true;
                if (typeof onPrimerInicio === 'function') {
                    onPrimerInicio(event);
                }
            }
        };

        utterance.onend = () => {
            if (token !== tokenLecturaActiva) return;

            indiceActual += 1;
            timeoutLecturaActiva = setTimeout(reproducirSiguiente, pausaEntreVersiculosMs);
        };

        utterance.onerror = (event) => {
            if (token !== tokenLecturaActiva) return;

            timeoutLecturaActiva = null;
            if (typeof onError === 'function') {
                onError(event);
            }
        };

        try {
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            }
            window.speechSynthesis.speak(utterance);
        } catch (error) {
            timeoutLecturaActiva = null;
            if (typeof onError === 'function') {
                onError(error);
            }
        }
    };

    try {
        desbloquearSpeechSynthesis();
        window.speechSynthesis.cancel();
        timeoutLecturaActiva = setTimeout(reproducirSiguiente, 80);
        return true;
    } catch (error) {
        timeoutLecturaActiva = null;
        if (typeof onError === 'function') {
            onError(error);
        }
        return false;
    }
}

// Función para configurar Media Session API y preparar reanudación automática
function configurarMediaSession() {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: 'Lectura de la Biblia',
            artist: 'Lumina',
            artwork: [
                { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
                { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }
            ]
        });

        // Handlers para controles de reproducción
        navigator.mediaSession.setActionHandler('pause', () => {
            window.speechSynthesis.pause();
        });

        navigator.mediaSession.setActionHandler('play', () => {
            window.speechSynthesis.resume();
        });
    }
}

// Función para intentar reanudar automáticamente si se pausa inesperadamente
function iniciarMonitorReproduccion() {
    reproduccionActiva = true;
    intentosReanudacion = 0;

    // Listener para visibilidad de página
    const handleVisibilityChange = () => {
        if (!reproduccionActiva) return;

        // Si la página se vuelve visible y está pausada, intentar reanudar
        if (!document.hidden && window.speechSynthesis.paused && !window.speechSynthesis.speaking) {
            console.log('Página visible nuevamente, intentando reanudar...');
            intentarReanudarAutomaticamente();
        }
    };

    // Listener para pausas inesperadas
    const checkPause = setInterval(() => {
        if (!reproduccionActiva || window.speechSynthesis.speaking || window.speechSynthesis.pending) {
            return; // Está reproduciendo normalmente
        }

        // Si debería estar reproduciendo pero está pausado
        if (reproduccionActiva && !window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
            console.warn('Reproducción pausada inesperadamente, intentando reanudar...');
            intentarReanudarAutomaticamente();
        }
    }, 2000); // Verificar cada 2 segundos

    // Guardar el interval ID para poder limpiarlo después
    window.checkPauseInterval = checkPause;
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

// Función para intentar reanudar
function intentarReanudarAutomaticamente() {
    if (intentosReanudacion >= MAX_INTENTOS_REANUDACION) {
        console.log('? Máximo de intentos de reanudación alcanzado');
        return;
    }

    try {
        intentosReanudacion++;
        window.speechSynthesis.resume();
        console.log(`Intento de reanudación #${intentosReanudacion}`);
    } catch (error) {
        console.error('Error al reanudar:', error);
    }
}

// Función para limpiar monitores de reproducción
function limpiarMonitorReproduccion() {
    reproduccionActiva = false;
    intentosReanudacion = 0;

    // Limpiar interval
    if (window.checkPauseInterval) {
        clearInterval(window.checkPauseInterval);
        window.checkPauseInterval = null;
    }

    // Remover listener de visibilidad
    document.removeEventListener('visibilitychange', () => { });
}

function actualizarBotonLeerCapitulo(leyendo) {
    const btnLeer = document.querySelector('.btn-leer-capitulo');
    if (!btnLeer) return;

    if (leyendo) {
        btnLeer.innerHTML = '<i class="fas fa-stop"></i> DEJAR DE ESCUCHAR';
        btnLeer.title = 'Dejar de escuchar';
        btnLeer.setAttribute('aria-label', 'Dejar de escuchar');
        btnLeer.classList.add('en-reproduccion');
    } else {
        btnLeer.innerHTML = '<i class="fas fa-volume-up"></i> ESCUCHAR CAPÍTULO';
        btnLeer.title = 'Escuchar todo el capítulo';
        btnLeer.setAttribute('aria-label', 'Escuchar todo el capítulo');
        btnLeer.classList.remove('en-reproduccion');
    }
    actualizarBotonesReproduccionListas();
}

function sincronizarBotonLeerLibroPrincipal() {
    const btnLeer = document.querySelector('.btn-leer-libro');
    if (!btnLeer) return;

    if (leyendoLibroCompleto && libroEnReproduccion) {
        btnLeer.innerHTML = '<i class="fas fa-stop"></i> DEJAR DE ESCUCHAR';
        const descripcion = libroEnReproduccion === libroActual
            ? 'Dejar de escuchar'
            : `Dejar de escuchar ${libroEnReproduccion}`;
        btnLeer.title = descripcion;
        btnLeer.setAttribute('aria-label', descripcion);
        btnLeer.classList.add('en-reproduccion');
    } else {
        btnLeer.innerHTML = '<i class="fas fa-volume-up"></i> ESCUCHAR LIBRO';
        const descripcion = libroActual
            ? `Escuchar todo el libro ${libroActual}`
            : 'Escuchar todo el libro';
        btnLeer.title = descripcion;
        btnLeer.setAttribute('aria-label', descripcion);
        btnLeer.classList.remove('en-reproduccion');
    }
}

function actualizarBotonLeerLibro(leyendo) {
    sincronizarBotonLeerLibroPrincipal();
    actualizarBotonesReproduccionListas();
}

function actualizarBotonesReproduccionListas() {
    sincronizarBotonLeerLibroPrincipal();

    document.querySelectorAll('[data-tipo-reproduccion="libro"]').forEach(btn => {
        const libro = btn.dataset.libro;
        const activo = leyendoLibroCompleto && libroEnReproduccion === libro;
        const icono = activo ? 'fa-stop' : 'fa-volume-up';
        btn.innerHTML = `<i class="fas ${icono} text-oro"></i>`;
        btn.title = activo ? 'Dejar de escuchar' : 'Escuchar todo el libro';
        btn.setAttribute('aria-label', `${activo ? 'Dejar de escuchar' : 'Escuchar todo el libro'} ${libro}`);
    });

    document.querySelectorAll('[data-tipo-reproduccion="capitulo"]').forEach(btn => {
        const libro = btn.dataset.libro;
        const capitulo = parseInt(btn.dataset.capitulo, 10);
        const activo = leyendoCapituloCompleto && libroActual === libro && capituloEnReproduccion === capitulo;
        const icono = activo ? 'fa-stop' : 'fa-volume-up';
        btn.innerHTML = `<i class="fas ${icono} text-sm"></i>`;
        btn.title = activo ? 'Dejar de escuchar' : 'Escuchar todo el cap?tulo';
        btn.setAttribute('aria-label', `${activo ? 'Dejar de escuchar' : 'Escuchar todo el cap?tulo'} ${capitulo}`);
    });

    actualizarBotonesLeidoVistaLectura();
}

function manejarBotonLeerLibroActual() {
    if (leyendoLibroCompleto && libroEnReproduccion) {
        detenerLectura();
        actualizarBotonLeerLibro(false);
        return;
    }

    leerLibroEntero(libroActual);
}

function escucharVersiculo(libro, capitulo, versiculo, texto) {
    if (!navegadorSoportaLectura()) {
        alert('Tu navegador no admite lectura en voz alta.');
        return;
    }

    const btn = document.getElementById(`audio_${libro}_${capitulo}_${versiculo}`);
    const referencia = construirTextoLecturaVersiculo(libro, capitulo, versiculo, texto);

    // Si ya está sonando este mismo botón, lo detenemos
    if (vozActiva === btn && window.speechSynthesis.speaking) {
        detenerLectura();
        return;
    }

    detenerLectura();

    // Función interna para no repetir código (DRY: Don't Repeat Yourself)
    const iniciarEjecucion = () => {
        const utterance = crearUtteranceLectura(referencia);
        vozActiva = btn;

        if (btn) {
            btn.classList.add('reproduciendo');
            actualizarContenidoBotonAudioVersiculo(btn, true);
        }

        utterance.onstart = () => {
            // Configurar Media Session para controles del dispositivo
            // configurarMediaSession();

            // Iniciar monitor de reproducción para detectar pausas inesperadas
            // iniciarMonitorReproduccion();

            // Resaltar el versículo completo
            resaltarVersiculo(libro, capitulo, versiculo);
        };

        utterance.onend = () => {
            // limpiarMonitorReproduccion();
            limpiarResaltadoVersiculo();
            if (!leyendoCapituloCompleto) {
                vozActiva = null;
                limpiarEstadoLectura();
            }
        };

        utterance.onerror = () => {
            // limpiarMonitorReproduccion();
            limpiarResaltadoVersiculo();
            vozActiva = null;
            limpiarEstadoLectura();
        };

        reproducirUtterance(utterance);
    };

    // Verificación de voces cargadas
    const voces = window.speechSynthesis.getVoices();
    if (voces.length === 0) {
        console.warn('TTS: voces aún no disponibles. Usando fallback inmediato para conservar la activación del usuario.');
    }
    iniciarEjecucion();
}
function leerCapituloEntero() {
    if (!navegadorSoportaLectura()) {
        alert('Tu navegador no admite lectura en voz alta.');
        return;
    }

    const secuencia = construirListaVersiculosCapitulo(libroActual, capituloActual);
    if (secuencia.length === 0) return;

    // Si ya está reproduciendo, detener
    if (leyendoCapituloCompleto && capituloEnReproduccion === capituloActual && !leyendoLibroCompleto) {
        detenerLectura();
        actualizarBotonLeerCapitulo(false);
        return;
    }

    detenerLectura();
    leyendoCapituloCompleto = true;
    capituloEnReproduccion = capituloActual;

    // Cambiar el texto del botón a "DETENER LECTURA"
    actualizarBotonLeerCapitulo(true);

    const voces = window.speechSynthesis.getVoices();
    if (voces.length === 0) {
        console.warn('TTS: voces aún no disponibles. Usando fallback inmediato para conservar la activación del usuario.');
    }

    const inicioCorrecto = reproducirSecuenciaVersiculos(secuencia, {
        onFin: () => finalizarLecturaSecuencial({ actualizarBotonCapitulo: true }),
        onError: () => finalizarLecturaSecuencial({ actualizarBotonCapitulo: true })
    });

    if (!inicioCorrecto) {
        finalizarLecturaSecuencial({ actualizarBotonCapitulo: true });
        lanzarToast('No se pudo iniciar la lectura en voz alta');
    }
}

// Variables globales para lectura de libros
let libroEnReproduccion = null;
let leyendoLibroCompleto = false;
let capituloEnReproduccion = null;

function leerCapituloEspecifico(capitulo) {
    if (!navegadorSoportaLectura()) {
        alert('Tu navegador no admite lectura en voz alta.');
        return;
    }

    // Si ya está reproduciendo el mismo capítulo, detener
    if (leyendoCapituloCompleto && capituloEnReproduccion === capitulo && libroActual) {
        detenerLectura();
        leyendoCapituloCompleto = false;
        capituloEnReproduccion = null;
        return;
    }

    const secuencia = construirListaVersiculosCapitulo(libroActual, capitulo);
    if (secuencia.length === 0) return;

    detenerLectura();
    leyendoCapituloCompleto = true;
    capituloEnReproduccion = capitulo;
    actualizarBotonesReproduccionListas();

    const voces = window.speechSynthesis.getVoices();
    if (voces.length === 0) {
        console.warn('TTS: voces aún no disponibles. Usando fallback inmediato para conservar la activación del usuario.');
    }

    const inicioCorrecto = reproducirSecuenciaVersiculos(secuencia, {
        onFin: () => finalizarLecturaSecuencial(),
        onError: () => finalizarLecturaSecuencial()
    });

    if (!inicioCorrecto) {
        finalizarLecturaSecuencial();
        lanzarToast('No se pudo iniciar la lectura en voz alta');
    }
}

function leerLibroEntero(libroNombre) {
    if (!navegadorSoportaLectura()) {
        alert('Tu navegador no admite lectura en voz alta.');
        return;
    }

    // Si ya está reproduciendo el mismo libro, detener
    if (leyendoLibroCompleto && libroEnReproduccion === libroNombre) {
        detenerLectura();
        leyendoLibroCompleto = false;
        libroEnReproduccion = null;
        actualizarBotonLeerLibro(false);
        return;
    }

    // Obtener todos los versículos del libro
    const libroContenido = bibleContent[libroNombre];
    if (!libroContenido) {
        alert(`No se encontró contenido para ${libroNombre}`);
        return;
    }

    const secuencia = construirSecuenciaLecturaLibro(libroNombre);
    if (secuencia.length === 0) return;

    detenerLectura();
    leyendoLibroCompleto = true;
    libroEnReproduccion = libroNombre;

    // Cambiar el texto del botón a "DEJAR DE LEER"
    actualizarBotonLeerLibro(true);

    const voces = window.speechSynthesis.getVoices();
    if (voces.length === 0) {
        console.warn('TTS: voces aún no disponibles. Usando fallback inmediato para conservar la activación del usuario.');
    }

    const inicioCorrecto = reproducirSecuenciaVersiculos(secuencia, {
        onFin: () => finalizarLecturaSecuencial({ actualizarBotonLibro: true }),
        onError: () => finalizarLecturaSecuencial({ actualizarBotonLibro: true })
    });

    if (!inicioCorrecto) {
        finalizarLecturaSecuencial({ actualizarBotonLibro: true });
        lanzarToast('No se pudo iniciar la lectura en voz alta');
    }
}

function initDarkMode() {
    const darkMode = leerPersistencia(CLAVE_DARKMODE) === 'true';
    if (darkMode) document.body.classList.add('dark');
    const toggle = document.getElementById('toggle-darkmode');
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        escribirPersistencia(CLAVE_DARKMODE, String(isDark));
        toggle.innerHTML = isDark ? '<i class="fas fa-sun text-lg"></i>' : '<i class="fas fa-moon text-lg"></i>';
    });
}

// --------------------------------------------------------------
// 10. NAVEGACIÓN Y RENDERIZADO
// --------------------------------------------------------------
let libroActual = "";
let capituloActual = 1;

function claveLeidoVersiculo(libro, capitulo, versiculo) {
    return `versiculo:${libro}_${capitulo}_${versiculo}`;
}

function esReferenciaBuscableEnBusqueda(capitulo, versiculo) {
    return (Number(capitulo) === 0 && Number(versiculo) === 0) || esVersiculoLeible(versiculo);
}

function esVersiculoLeible(versiculo) {
    return Number.isInteger(versiculo) && versiculo >= 1;
}

function libroUsaAcotacionesEspeciales(libro) {
    return libro === "Cantar de los Cantares";
}

function esVersiculoNarrable(libro, versiculo) {
    return esVersiculoLeible(versiculo)
        || (libroUsaAcotacionesEspeciales(libro) && Number.isFinite(versiculo) && versiculo > 0);
}

function obtenerVersiculosNarrablesCapitulo(libro, capitulo) {
    const versiculos = bibleContent[libro]?.[capitulo] || {};
    return Object.keys(versiculos)
        .map(Number)
        .filter(versiculo => esVersiculoNarrable(libro, versiculo))
        .sort((a, b) => a - b);
}

function construirTextoLecturaVersiculo(libro, capitulo, versiculo, texto) {
    const textoNormalizado = normalizarTextoParaLectura(texto);

    if (libroUsaAcotacionesEspeciales(libro) && !esVersiculoLeible(versiculo)) {
        return `${libro}, capítulo ${capitulo}. ${textoNormalizado}`;
    }

    return `${libro}, capítulo ${capitulo}, versículo ${versiculo}. ${texto}`;
}

function esClaveLeidoVersiculoNoLeible(clave) {
    if (typeof clave !== 'string' || !clave.startsWith('versiculo:')) return false;

    const partes = clave.slice('versiculo:'.length).split('_');
    if (partes.length < 3) return false;

    const versiculo = Number(partes[partes.length - 1]);
    return !esVersiculoLeible(versiculo);
}

function limpiarMarcasLeidoNoLeibles() {
    const leidosDepurados = new Set(
        Array.from(leidos).filter(clave => !esClaveLeidoVersiculoNoLeible(clave))
    );

    if (leidosDepurados.size === leidos.size) return;

    leidos = leidosDepurados;
    guardarLeidos();
}

function obtenerTestamentoDeLibro(nombreLibro) {
    for (const [testamento, libros] of Object.entries(canonBiblico)) {
        if (libros.some(libro => libro.nombre === nombreLibro)) return testamento;
    }
    return null;
}

function obtenerVersiculosLeiblesCapitulo(libro, capitulo) {
    const versiculos = bibleContent[libro]?.[capitulo] || {};
    return Object.keys(versiculos)
        .map(Number)
        .filter(esVersiculoLeible)
        .sort((a, b) => a - b);
}

function esVersiculoLeido(libro, capitulo, versiculo) {
    if (!esVersiculoLeible(versiculo)) return false;
    return leidos.has(claveLeidoVersiculo(libro, capitulo, versiculo));
}

function estaCapituloLeido(libro, capitulo) {
    const versiculos = obtenerVersiculosLeiblesCapitulo(libro, capitulo);
    return versiculos.length > 0 && versiculos.every(v => esVersiculoLeido(libro, capitulo, v));
}

function estaLibroLeido(libro) {
    const capitulos = obtenerListaCapitulos(libro);
    return capitulos.length > 0 && capitulos.every(capitulo => estaCapituloLeido(libro, capitulo));
}

function estaTestamentoLeido(testamento) {
    const libros = canonBiblico[testamento] || [];
    return libros.length > 0 && libros.every(libro => estaLibroLeido(libro.nombre));
}

function marcarCapituloLeido(libro, capitulo, marcado) {
    const versiculos = obtenerVersiculosLeiblesCapitulo(libro, capitulo);
    versiculos.forEach(versiculo => {
        const clave = claveLeidoVersiculo(libro, capitulo, versiculo);
        if (marcado) leidos.add(clave);
        else leidos.delete(clave);
    });
}

function marcarLibroLeido(libro, marcado) {
    obtenerListaCapitulos(libro).forEach(capitulo => marcarCapituloLeido(libro, capitulo, marcado));
}

function marcarTestamentoLeido(testamento, marcado) {
    (canonBiblico[testamento] || []).forEach(libro => marcarLibroLeido(libro.nombre, marcado));
}

function iconoLeidoHtml() {
    return `<i class="fas fa-check-circle" aria-hidden="true"></i>`;
}

function actualizarBotonLeido(id, activo, etiquetaActiva, etiquetaInactiva) {
    const boton = document.getElementById(id);
    if (!boton) return;
    boton.classList.toggle('activo', activo);
    boton.setAttribute('aria-pressed', activo ? 'true' : 'false');
    boton.title = activo ? etiquetaActiva : etiquetaInactiva;
    boton.setAttribute('aria-label', activo ? etiquetaActiva : etiquetaInactiva);
    const icono = boton.querySelector('.icono-leido');
    if (icono) {
        icono.classList.toggle('fa-check-circle', activo);
        icono.classList.toggle('fa-circle', !activo);
    }
}

function estaVistaVisible(idVista) {
    const vista = document.getElementById(idVista);
    return !!vista && !vista.classList.contains('hidden');
}

function sanearIdDom(texto) {
    return String(texto).replace(/[^a-zA-Z0-9_-]/g, '_');
}

function actualizarBotonesLeidoVistaLectura() {
    if (!libroActual || !capituloActual) return;

    actualizarBotonLeido(
        'btn-leido-capitulo-vista',
        estaCapituloLeido(libroActual, capituloActual),
        'Marcar como no leído',
        'Marcar como leído'
    );
    const etiquetaCapituloVista = document.querySelector('#btn-leido-capitulo-vista .texto-leido-capitulo');
    if (etiquetaCapituloVista) {
        etiquetaCapituloVista.textContent = estaCapituloLeido(libroActual, capituloActual)
            ? 'CAPÍTULO LEÍDO'
            : 'CAPÍTULO NO LEÍDO';
    }

    document.querySelectorAll('.btn-leido-versiculo').forEach(btn => {
        let libro = btn.dataset.libro;
        let capitulo = parseInt(btn.dataset.capitulo, 10);
        let versiculo = parseFloat(btn.dataset.versiculo);
        if (!libro || Number.isNaN(capitulo) || Number.isNaN(versiculo)) {
            const partes = btn.id.replace(/^read_/, '').split('_');
            if (partes.length >= 3) {
                versiculo = parseFloat(partes.pop());
                capitulo = parseInt(partes.pop(), 10);
                libro = partes.join('_');
            }
        }
        actualizarBotonLeido(
            btn.id,
            esVersiculoLeido(libro, capitulo, versiculo),
            'Marcar como no leído',
            'Marcar como leído'
        );
    });

    document.querySelectorAll('[data-tipo-leido="capitulo"]').forEach(btn => {
        const libro = btn.dataset.libro;
        const capitulo = parseInt(btn.dataset.capitulo, 10);
        actualizarBotonLeido(
            btn.id,
            estaCapituloLeido(libro, capitulo),
            'Marcar como no leído',
            'Marcar como leído'
        );
    });
}

function obtenerProgresoCapitulo(libro, capitulo) {
    const versiculos = obtenerVersiculosLeiblesCapitulo(libro, capitulo);
    const total = versiculos.length;
    const leidos = versiculos.filter(v => esVersiculoLeido(libro, capitulo, v)).length;
    const porcentaje = total > 0 ? Math.round((leidos / total) * 100) : 0;
    return { total, leidos, porcentaje };
}

function limitarPorcentajeBurbuja(porcentaje) {
    return Math.max(4, Math.min(96, porcentaje));
}

function limitarPorcentajePeregrino(porcentaje) {
    return Math.max(5, Math.min(95, porcentaje));
}

function claseBarraProgresoBiblioteca() {
    return 'h-full rounded-full bg-gradient-to-r from-amber-500 via-emerald-500 to-emerald-400 transition-all duration-300';
}

function actualizarProgresoCapituloVista() {
    const contenedor = document.getElementById('progreso-capitulo-vista');
    if (!contenedor || !libroActual || !capituloActual) return;

    const { total, leidos, porcentaje } = obtenerProgresoCapitulo(libroActual, capituloActual);
    const barra = contenedor.querySelector('[data-progreso-barra]');
    const texto = contenedor.querySelector('[data-progreso-texto]');
    const burbuja = contenedor.querySelector('[data-progreso-burbuja]');

    if (barra) {
        barra.style.width = `${porcentaje}%`;
    }

    if (texto) {
        texto.textContent = `${leidos}/${total}`;
    }

    if (burbuja) {
        burbuja.style.left = `${limitarPorcentajeBurbuja(porcentaje)}%`;
        burbuja.textContent = `${porcentaje}%`;
    }
}

function obtenerProgresoLibro(libro) {
    const capitulos = obtenerListaCapitulos(libro);
    const total = capitulos.length;
    const leidos = capitulos.filter(capitulo => estaCapituloLeido(libro, capitulo)).length;
    const porcentaje = total > 0 ? Math.round((leidos / total) * 100) : 0;
    return { total, leidos, porcentaje };
}

function actualizarProgresoLibroVista() {
    const contenedor = document.getElementById('progreso-libro-vista');
    if (!contenedor || !libroActual) return;

    const { total, leidos, porcentaje } = obtenerProgresoLibro(libroActual);
    const barra = contenedor.querySelector('[data-progreso-barra-libro]');
    const texto = contenedor.querySelector('[data-progreso-texto-libro]');
    const burbuja = contenedor.querySelector('[data-progreso-burbuja-libro]');
    const track = contenedor.querySelector('[data-progreso-track-libro]');

    if (barra) {
        barra.style.width = `${porcentaje}%`;
    }

    if (texto) {
        texto.textContent = `${leidos}/${total}`;
    }

    if (burbuja) {
        burbuja.style.left = `${limitarPorcentajeBurbuja(porcentaje)}%`;
        burbuja.textContent = `${porcentaje}%`;
    }

    if (track) {
        track.setAttribute('aria-valuenow', porcentaje);
    }
}

function obtenerProgresoTestamento(testamento) {
    const libros = canonBiblico[testamento] || [];
    const total = libros.length;
    const leidos = libros.filter(libro => estaLibroLeido(libro.nombre)).length;
    const porcentaje = total > 0 ? Math.round((leidos / total) * 100) : 0;
    return { total, leidos, porcentaje };
}

function obtenerProgresoBiblia() {
    const libros = obtenerTodosLosLibros();
    const total = TOTAL_BIBLIA_LUMINA;
    const leidos = libros.filter(libro => estaLibroLeido(libro.nombre)).length;
    const porcentaje = total > 0 ? Math.round((leidos / total) * 100) : 0;
    return { total, leidos, porcentaje };
}

function actualizarProgresoTestamentosVista() {
    Object.keys(canonBiblico).forEach(testamento => {
        const contenedor = document.querySelector(`[data-progreso-testamento="${sanearIdDom(testamento)}"]`);
        if (!contenedor) return;
        const { total, leidos, porcentaje } = obtenerProgresoTestamento(testamento);
        const barra = contenedor.querySelector('[data-progreso-barra-testamento]');
        const texto = contenedor.querySelector('[data-progreso-texto-testamento]');
        const burbuja = contenedor.querySelector('[data-progreso-burbuja-testamento]');
        if (barra) barra.style.width = `${porcentaje}%`;
        if (texto) texto.textContent = `${leidos}/${total}`;
        if (burbuja) {
            burbuja.style.left = `${limitarPorcentajeBurbuja(porcentaje)}%`;
            burbuja.textContent = `${porcentaje}%`;
        }
    });
}

function actualizarProgresoBibliaVista() {
    const contenedor = document.getElementById('progreso-biblia-vista');
    if (!contenedor) return;

    const { total, leidos, porcentaje } = obtenerProgresoBiblia();
    const porcentajeLimitado = limitarPorcentajeBurbuja(porcentaje);
    const porcentajePeregrino = limitarPorcentajePeregrino(porcentaje);
    const tarjetaExistente = contenedor.querySelector('.progreso-biblia-card');

    if (!tarjetaExistente) {
        contenedor.innerHTML = `
            <div class="progreso-biblia-card rounded-3xl p-5 md:p-6">
                <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div>
                        <div class="text-xs uppercase tracking-wider font-sans font-bold text-gray-500 dark:text-gray-400 mb-1">Progreso bíblico</div>
                    </div>
                    <div data-progreso-texto-biblia class="texto-progreso-biblia text-sm font-sans font-bold text-gray-700 dark:text-gray-200">${leidos}/${total}</div>
                </div>
                <div class="progreso-biblia-track-wrap relative w-full">
                    <div data-progreso-peregrino-biblia class="progreso-peregrino" style="left: ${porcentajePeregrino}%">
                        <div class="progreso-peregrino-figura" aria-hidden="true">
                            <svg viewBox="0 0 32 32" fill="none">
                                <circle cx="17" cy="6.5" r="3.5"></circle>
                                <path d="M17 10.8L15.5 16.2L12.5 19.4"></path>
                                <path d="M16.8 11L21.5 15.2L24.8 13.6"></path>
                                <path d="M15.7 16L19.2 20.2L17.6 27"></path>
                                <path d="M15.2 16.1L10.8 27"></path>
                                <path d="M23.2 11.2L23.8 27"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="w-full h-2 rounded-full overflow-hidden bg-black/10 dark:bg-white/10">
                        <div data-progreso-barra-biblia class="h-full rounded-full bg-gradient-to-r from-amber-500 via-emerald-500 to-emerald-400 transition-all duration-300" style="width: ${porcentaje}%"></div>
                    </div>
                    <div data-progreso-burbuja-biblia class="progreso-burbuja progreso-burbuja-biblia" style="left: ${porcentajeLimitado}%">${porcentaje}%</div>
                </div>
            </div>
        `;
        verificarEventoBibliaCompleta();
        return;
    }

    const texto = tarjetaExistente.querySelector('[data-progreso-texto-biblia]');
    const barra = tarjetaExistente.querySelector('[data-progreso-barra-biblia]');
    const burbuja = tarjetaExistente.querySelector('[data-progreso-burbuja-biblia]');
    const peregrino = tarjetaExistente.querySelector('[data-progreso-peregrino-biblia]');

    if (texto) {
        texto.textContent = `${leidos}/${total}`;
    }

    if (barra) {
        barra.style.width = `${porcentaje}%`;
    }

    if (burbuja) {
        burbuja.style.left = `${porcentajeLimitado}%`;
        burbuja.textContent = `${porcentaje}%`;
    }

    if (peregrino) {
        peregrino.style.left = `${porcentajePeregrino}%`;
    }

    verificarEventoBibliaCompleta();
}

function abrirCelebracionBibliaCompleta() {
    const modal = document.getElementById('modal-biblia-completa');
    if (!modal) return;
    celebracionBibliaPendiente = false;
    actualizarMensajeCelebracionBiblia();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('biblia-completa-activa');
    lanzarEfectoCelebracionBiblia();
    reproducirAudioCelebracion('audio-celebracion-biblia');
}

function cerrarCelebracionBibliaCompleta() {
    const modal = document.getElementById('modal-biblia-completa');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    detenerAudioCelebracion(document.getElementById('audio-celebracion-biblia'));
}

function abrirConfirmacionReinicioBiblia() {
    cerrarCelebracionBibliaCompleta();
    const modal = document.getElementById('modal-confirmacion-biblia');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function cerrarConfirmacionReinicioBiblia() {
    const modal = document.getElementById('modal-confirmacion-biblia');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    const progreso = obtenerProgresoBiblia();
    if (progreso.total > 0 && progreso.leidos === progreso.total && bibliaCompletaCelebrada) {
        setTimeout(() => {
            abrirCelebracionBibliaCompleta();
        }, 100);
    }
}

function obtenerMensajeCelebracionBiblia() {
    const contador = parseInt(leerPersistencia(CLAVE_CONTADOR_CELEBRACION_BIBLIA, "0") || "0", 10);
    const indice = contador % MENSAJES_CELEBRACION_BIBLIA.length;
    escribirPersistencia(CLAVE_CONTADOR_CELEBRACION_BIBLIA, String(contador + 1));
    return {
        mensaje: MENSAJES_CELEBRACION_BIBLIA[indice],
        fase: indice + 1,
        titulo: TITULOS_CELEBRACION_BIBLIA[indice]
    };
}

function actualizarMensajeCelebracionBiblia() {
    const cuerpo = document.querySelector('#modal-biblia-completa .space-y-5');
    if (!cuerpo) return;
    const modal = document.getElementById('modal-biblia-completa');
    const titulo = modal ? modal.querySelector('h3') : null;
    const botonPrincipal = modal ? modal.querySelector('.mt-8 button') : null;
    const { mensaje, fase, titulo: tituloCelebracion } = obtenerMensajeCelebracionBiblia();
    faseCelebracionBibliaActual = fase;

    if (modal) {
        modal.classList.remove('biblia-celebracion-fase-1', 'biblia-celebracion-fase-2', 'biblia-celebracion-fase-3');
        modal.classList.add(`biblia-celebracion-fase-${fase}`);
    }

    if (titulo) {
        titulo.textContent = tituloCelebracion;
    }

    if (botonPrincipal) {
        botonPrincipal.classList.remove(
            'biblia-celebracion-btn-fase-1',
            'biblia-celebracion-btn-fase-2',
            'biblia-celebracion-btn-fase-3'
        );
        botonPrincipal.classList.add(`biblia-celebracion-btn-fase-${fase}`);
    }

    cuerpo.innerHTML = '';
    const parrafo = document.createElement('p');
    parrafo.textContent = mensaje;
    cuerpo.appendChild(parrafo);
}

function lanzarEfectoCelebracionBiblia() {
    const capaBrillo = document.createElement('div');
    capaBrillo.className = 'biblia-celebracion-brillo';
    document.body.appendChild(capaBrillo);
    setTimeout(() => capaBrillo.remove(), 1700);

    const paletas = {
        1: ['confeti-oro', 'confeti-amber', 'confeti-ivory'],
        2: ['confeti-emerald', 'confeti-oro', 'confeti-ivory'],
        3: ['confeti-rouge', 'confeti-oro', 'confeti-amber']
    };
    const colores = paletas[faseCelebracionBibliaActual] || paletas[1];
    const totalConfeti = 18;

    for (let i = 0; i < totalConfeti; i++) {
        const confeti = document.createElement('div');
        confeti.className = `biblia-confeti ${colores[i % colores.length]}`;
        confeti.style.left = `${Math.random() * 100}%`;
        confeti.style.animationDelay = `${Math.random() * 0.45}s`;
        confeti.style.animationDuration = `${2.2 + Math.random() * 1.4}s`;
        confeti.style.transform = `translateY(-12vh) rotate(${Math.random() * 180}deg)`;
        confeti.style.width = `${0.35 + Math.random() * 0.45}rem`;
        confeti.style.height = `${0.8 + Math.random() * 0.7}rem`;
        document.body.appendChild(confeti);
        setTimeout(() => confeti.remove(), 3800);
    }
}

function obtenerMensajeFelicitacion(nombreLibro) {
    // 1. Buscamos el libro en nuestro diccionario
    const datosLibro = MENSAJES_LIBROS[nombreLibro];

    // 2. Si el libro existe en el diccionario, armamos el mensaje
    if (datosLibro) {
        // Usamos template literals (las comillas invertidas) para inyectar las variables
        const textoFinal = `¡Felicitaciones por completar ${nombreLibro}!\n${datosLibro.mensaje} (${datosLibro.referencia})`;
        return textoFinal;
    } else {
        // Un mensaje por defecto por si hay algún error de tipeo en el nombre del libro
        return `¡Felicitaciones por completar ${nombreLibro}! Has dado un gran paso en tu lectura.`;
    }
}

function estanCuatroEvangeliosLeidos() {
    return EVANGELIOS_CELEBRACION.every(libro => estaLibroLeido(libro));
}

function abrirCelebracionLibroCompleto(nombreLibro, opciones = {}) {
    const modal = document.getElementById('modal-libro-completo');
    const cuerpo = document.getElementById('mensaje-libro-completo');
    if (!modal || !cuerpo) return;

    detenerReproduccionesLuminaActivas();

    const titulo = modal.querySelector('h3');
    const claveMensaje = opciones.claveMensaje || nombreLibro;
    const datosLibro = MENSAJES_LIBROS[claveMensaje] || MENSAJES_LIBROS[nombreLibro];

    if (titulo) {
        titulo.textContent = opciones.titulo || '¡Libro completado!';
    }
    cuerpo.innerHTML = '';

    const intro = document.createElement('p');
    intro.innerHTML = opciones.introHtml || `Caminaste <strong>${nombreLibro}</strong>.`;
    cuerpo.appendChild(intro);

    const mensaje = document.createElement('p');
    mensaje.textContent = datosLibro
        ? datosLibro.mensaje
        : `¡Felicitaciones por completar ${nombreLibro}! Has dado un gran paso en tu lectura.`;
    cuerpo.appendChild(mensaje);

    if (datosLibro?.referencia) {
        const referencia = document.createElement('p');
        referencia.className = 'text-oro font-semibold';
        referencia.textContent = datosLibro.referencia;
        cuerpo.appendChild(referencia);
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('libro-completo-activa');
    reproducirAudioCelebracion('audio-celebracion-libro');
}

function verificarCelebracionLibroCompleto(libro, estabaCompletoAntes = false) {
    if (!libro || estabaCompletoAntes) return;

    if (EVANGELIOS_CELEBRACION.includes(libro)) {
        if (estanCuatroEvangeliosLeidos()) {
            abrirCelebracionLibroCompleto(libro, {
                claveMensaje: 'Los Cuatro Evangelios',
                titulo: '¡Evangelistas caminados!',
                introHtml: 'Caminaste el <strong>Evangelio</strong>.'
            });
        }
        return;
    }

    if (estaLibroLeido(libro)) {
        abrirCelebracionLibroCompleto(libro);
    }
}

function cerrarCelebracionLibroCompleto() {
    const modal = document.getElementById('modal-libro-completo');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('libro-completo-activa');
    detenerAudioCelebracion(document.getElementById('audio-celebracion-libro'));

    const progreso = obtenerProgresoBiblia();
    if (celebracionBibliaPendiente && progreso.total > 0 && progreso.leidos === progreso.total && bibliaCompletaCelebrada) {
        setTimeout(() => {
            abrirCelebracionBibliaCompleta();
        }, 100);
    }
}

function verificarEventoBibliaCompleta() {
    const progreso = obtenerProgresoBiblia();
    const completada = progreso.total > 0 && progreso.leidos === progreso.total;

    if (completada) {
        document.body.classList.add('biblia-completa-activa');
        if (!bibliaCompletaCelebrada && leerPersistencia(CLAVE_EVENTO_BIBLIA_COMPLETA) !== "true") {
            bibliaCompletaCelebrada = true;
            escribirPersistencia(CLAVE_EVENTO_BIBLIA_COMPLETA, "true");
            setTimeout(() => {
                const modalLibroCompleto = document.getElementById('modal-libro-completo');
                const hayCelebracionLibroVisible = modalLibroCompleto && !modalLibroCompleto.classList.contains('hidden');

                if (hayCelebracionLibroVisible) {
                    celebracionBibliaPendiente = true;
                    return;
                }

                abrirCelebracionBibliaCompleta();
            }, 250);
        }
    } else {
        bibliaCompletaCelebrada = false;
        celebracionBibliaPendiente = false;
        eliminarPersistencia(CLAVE_EVENTO_BIBLIA_COMPLETA);
        document.body.classList.remove('biblia-completa-activa');
        cerrarCelebracionBibliaCompleta();
        cerrarConfirmacionReinicioBiblia();
    }
}

function reiniciarProgresoBiblia() {
    leidos = new Set();
    guardarLeidos();
    actualizarBotonesLeidoLibros();
    eliminarPersistencia(CLAVE_EVENTO_BIBLIA_COMPLETA);
    bibliaCompletaCelebrada = false;
    celebracionBibliaPendiente = false;
    document.body.classList.remove('biblia-completa-activa');

    cerrarConfirmacionReinicioBiblia();
    cerrarCelebracionBibliaCompleta();

    if (estaVistaVisible('vista-lectura') && libroActual) {
        abrirLectura(capituloActual);
    } else if (estaVistaVisible('vista-capitulos') && libroActual) {
        abrirCapitulos(libroActual, obtenerCantidadCapitulos(libroActual));
    } else {
        inicializarIndice();
    }

    actualizarBotonesLeidoLibros();
    actualizarBotonesLeidoVistaLectura();
    actualizarProgresoCapituloVista();
    actualizarProgresoLibroVista();
    actualizarProgresoTestamentosVista();
    actualizarProgresoBibliaVista();
    lanzarToast('Progreso de lectura reiniciado');
}

function actualizarBotonesLeidoLibros() {
    document.querySelectorAll('[data-tipo-leido="libro"]').forEach(btn => {
        const libro = btn.dataset.libro;
        actualizarBotonLeido(
            btn.id,
            estaLibroLeido(libro),
            'Marcar como no leído',
            'Marcar como leído'
        );
    });

    document.querySelectorAll('[data-libro-principal]').forEach(btn => {
        const libro = btn.dataset.libroPrincipal;
        const leido = estaLibroLeido(libro);
        btn.classList.toggle('libro-leido', leido);
        btn.setAttribute('title', leido ? `${libro} (leído)` : libro);
        btn.setAttribute('aria-label', leido ? `${libro}, libro leído` : `${libro}, libro no leído`);
    });

    const btnLibroVista = document.getElementById('btn-leido-libro-vista');
    if (btnLibroVista && libroActual) {
        const leido = estaLibroLeido(libroActual);
        actualizarBotonLeido(
            btnLibroVista.id,
            leido,
            'Marcar como no leído',
            'Marcar como leído'
        );
        const etiqueta = btnLibroVista.querySelector('.texto-leido-libro');
        if (etiqueta) {
            etiqueta.textContent = leido ? 'LIBRO LEÍDO' : 'LIBRO NO LEÍDO';
        }
    }
}

function toggleLeidoVersiculo(libro, capitulo, versiculo) {
    if (!esVersiculoLeible(versiculo)) {
        lanzarToast('Esta entrada no cuenta como versículo leído');
        return;
    }

    const libroCompletoAntes = estaLibroLeido(libro);
    const clave = claveLeidoVersiculo(libro, capitulo, versiculo);
    const marcado = !leidos.has(clave);
    if (marcado) leidos.add(clave);
    else leidos.delete(clave);
    guardarLeidos();
    actualizarBotonLeido(`read_${libro}_${capitulo}_${versiculo}`, marcado, 'Marcar como no leído', 'Marcar como leído');
    lanzarToast(marcado ? 'Versículo marcado como leído' : 'Versículo marcado como no leído');
}

function toggleLeidoCapitulo(libro, capitulo) {
    const marcado = !estaCapituloLeido(libro, capitulo);
    marcarCapituloLeido(libro, capitulo, marcado);
    guardarLeidos();
    actualizarBotonesLeidoLibros();
    actualizarBotonesLeidoVistaLectura();
    actualizarProgresoLibroVista();
    actualizarProgresoTestamentosVista();
    actualizarProgresoBibliaVista();
    if (estaVistaVisible('vista-capitulos') && libroActual === libro) {
        abrirCapitulos(libro, obtenerCantidadCapitulos(libro));
    }
    lanzarToast(marcado ? 'Capítulo marcado como leído' : 'Capítulo marcado como no leído');
}

function toggleLeidoLibro(libro) {
    const marcado = !estaLibroLeido(libro);
    marcarLibroLeido(libro, marcado);
    guardarLeidos();
    actualizarBotonesLeidoLibros();
    actualizarBotonesLeidoVistaLectura();
    actualizarProgresoLibroVista();
    actualizarProgresoTestamentosVista();
    actualizarProgresoBibliaVista();
    if (estaVistaVisible('vista-capitulos') && libroActual === libro) {
        abrirCapitulos(libro, obtenerCantidadCapitulos(libro));
    } else {
        inicializarIndice();
    }
    lanzarToast(marcado ? 'Libro marcado como leído' : 'Libro marcado como no leído');

    // Mostrar celebración al completar un libro
    if (marcado) {
        abrirCelebracionLibroCompleto(libro);
    }
}

function toggleLeidoTestamento(testamento) {
    const marcado = !estaTestamentoLeido(testamento);
    marcarTestamentoLeido(testamento, marcado);
    guardarLeidos();
    inicializarIndice();
    lanzarToast(marcado ? `${testamento} marcado como leído` : `${testamento} marcado como no leído`);
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function (m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function renderizarTextoPlanoHtml(texto, preservarSaltos = false) {
    const html = escapeHtml(String(texto || ''));
    return preservarSaltos ? html.replace(/\n/g, '<br>') : html;
}

function obtenerTokensBusquedaResaltables(termino) {
    const terminoNormalizado = normalizarTexto(normalizarTerminoBusqueda(termino)).trim();
    if (!terminoNormalizado) return [];

    const palabras = extraerPalabras(terminoNormalizado);

    if (palabras.length > 1) {
        return [terminoNormalizado];
    }

    const tokens = new Set();

    palabras.forEach(palabra => {
        if (palabra) tokens.add(palabra);
    });

    if (tokens.size === 0 && terminoNormalizado) {
        tokens.add(terminoNormalizado);
    }

    return Array.from(tokens).sort((a, b) => b.length - a.length);
}

function construirTextoNormalizadoConMapa(texto) {
    const textoPlano = String(texto || '');
    let textoNormalizado = '';
    const mapaIndices = [];
    let indiceOriginal = 0;

    for (const caracter of textoPlano) {
        const caracterNormalizado = normalizarTexto(caracter);

        for (const fragmento of caracterNormalizado) {
            textoNormalizado += fragmento;
            mapaIndices.push({
                inicio: indiceOriginal,
                fin: indiceOriginal + caracter.length
            });
        }

        indiceOriginal += caracter.length;
    }

    return { textoNormalizado, mapaIndices };
}

function esCaracterDePalabraBusqueda(caracter) {
    return Boolean(caracter) && /[\p{L}\p{M}']/u.test(caracter);
}

function tieneLimitesDePalabraBusqueda(textoNormalizado, inicio, fin) {
    const caracterAnterior = inicio > 0 ? textoNormalizado[inicio - 1] : '';
    const caracterSiguiente = fin < textoNormalizado.length ? textoNormalizado[fin] : '';
    return !esCaracterDePalabraBusqueda(caracterAnterior) && !esCaracterDePalabraBusqueda(caracterSiguiente);
}

function fusionarRangosTexto(rangos) {
    if (!Array.isArray(rangos) || rangos.length === 0) return [];

    const ordenados = [...rangos].sort((a, b) => {
        if (a.inicio !== b.inicio) return a.inicio - b.inicio;
        return b.fin - a.fin;
    });

    const fusionados = [ordenados[0]];
    for (let i = 1; i < ordenados.length; i++) {
        const actual = ordenados[i];
        const ultimo = fusionados[fusionados.length - 1];
        if (actual.inicio <= ultimo.fin) {
            ultimo.fin = Math.max(ultimo.fin, actual.fin);
        } else {
            fusionados.push(actual);
        }
    }

    return fusionados;
}

function obtenerRangosResaltadoBusqueda(texto, termino) {
    const tokens = obtenerTokensBusquedaResaltables(termino);
    if (tokens.length === 0) return [];

    const { textoNormalizado, mapaIndices } = construirTextoNormalizadoConMapa(texto);
    if (!textoNormalizado || mapaIndices.length === 0) return [];

    const rangos = [];

    tokens.forEach(token => {
        let desde = 0;
        while (desde < textoNormalizado.length) {
            const indice = textoNormalizado.indexOf(token, desde);
            if (indice === -1) break;

            const fin = indice + token.length;
            if (tieneLimitesDePalabraBusqueda(textoNormalizado, indice, fin)) {
                rangos.push({
                    inicio: mapaIndices[indice].inicio,
                    fin: mapaIndices[fin - 1].fin
                });
            }

            desde = indice + Math.max(1, token.length);
        }
    });

    return fusionarRangosTexto(rangos);
}

function renderizarTextoBusquedaResaltadoHtml(texto, termino = '', opciones = {}) {
    const textoPlano = String(texto || '');
    const preservarSaltos = opciones.preservarSaltos === true;
    const rangos = obtenerRangosResaltadoBusqueda(textoPlano, termino);

    if (rangos.length === 0) {
        return renderizarTextoPlanoHtml(textoPlano, preservarSaltos);
    }

    const partes = [];
    let cursor = 0;

    rangos.forEach(rango => {
        if (rango.inicio > cursor) {
            partes.push(renderizarTextoPlanoHtml(textoPlano.slice(cursor, rango.inicio), preservarSaltos));
        }

        partes.push(`<span class="palabra-resaltada">${renderizarTextoPlanoHtml(textoPlano.slice(rango.inicio, rango.fin), preservarSaltos)}</span>`);
        cursor = rango.fin;
    });

    if (cursor < textoPlano.length) {
        partes.push(renderizarTextoPlanoHtml(textoPlano.slice(cursor), preservarSaltos));
    }

    return partes.join('');
}

function renderizarTextoComentarioHtml(texto, termino = '') {
    return renderizarTextoBusquedaResaltadoHtml(texto, termino, { preservarSaltos: true });
}

function inicializarIndice() {
    return inicializarIndiceV2();
}

function obtenerTodosLosLibros() {
    return [...canonBiblico["Antiguo Testamento"], ...canonBiblico["Nuevo Testamento"]];
}

function poblarSelectoresRapidos() {
    const todosLibros = obtenerTodosLosLibros();
    const selectorCap = document.getElementById('selector-rapido-capitulos');
    const selectorLect = document.getElementById('selector-rapido-lectura');
    const opcionesHtml = '<option value="">Cambiar libro</option>' + todosLibros.map(libro => `<option value="${libro.nombre}">${libro.nombre}</option>`).join('');
    selectorCap.innerHTML = opcionesHtml;
    selectorLect.innerHTML = opcionesHtml;
    selectorCap.addEventListener('change', (e) => {
        let libro = e.target.value;
        if (libro) {
            let encontrado = todosLibros.find(l => l.nombre === libro);
            if (encontrado) abrirCapitulos(encontrado.nombre, encontrado.caps);
            selectorCap.value = "";
        }
    });
    selectorLect.addEventListener('change', (e) => {
        let libro = e.target.value;
        if (libro) {
            let encontrado = todosLibros.find(l => l.nombre === libro);
            if (encontrado) abrirCapitulos(encontrado.nombre, encontrado.caps);
            selectorLect.value = "";
        }
    });
}

function abrirPrefacio(libro, capitulo = 0, opciones = null) {
    const capituloPrefacio = obtenerCapituloPrefacio(libro, capitulo);
    const comentarios = obtenerComentariosPrefacio(libro, capituloPrefacio);
    const referenciaPrefacio = formatearReferenciaPrefacio(libro, capituloPrefacio);
    const esPrefacioSalmo = libro === 'Salmos' && capituloPrefacio > 0;
    const terminoBusqueda = normalizarTerminoBusqueda(opciones?.terminoBusqueda || '');

    document.getElementById('titulo-panel-versiculo').innerHTML = referenciaPrefacio;
    document.getElementById('cita-panel-sticky').innerHTML = '';

    const panelHtml = `
        <div class="mb-5 p-4 bg-amber-50/40 dark:bg-gray-700 rounded-lg border-l-4 border-oro">
            <p class="text-sm font-serif italic text-gray-700 dark:text-gray-300">${esPrefacioSalmo
            ? `Antes de entrar versículo por versículo, acá queda lo que San Agustín comenta en general sobre ${libro} ${capituloPrefacio}.`
            : `Comentarios introductorios de los Padres y Doctores sobre ${libro}.`}</p>
        </div>
        <div class="text-xs font-sans text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2"><i class="fas fa-feather-alt"></i> ${esPrefacioSalmo ? 'Tradición sobre el salmo' : 'Tradición sobre el Evangelio'}</div>
    ` + (comentarios.length === 0 ? `<div class="text-gray-600 dark:text-gray-400 italic font-sans text-center py-10">Comentarios del prefacio en preparación.</div>` : comentarios.map((c, idx) => {
                const esFav = esFavoritoComentario(libro, capituloPrefacio, 0, 'tradicion', idx);
                const accionFavorito = esFav ? 'Quitar de favoritos' : 'Agregar a favoritos';
                const identificadorFavorito = obtenerIdentificadorFavoritoComentario(libro, capituloPrefacio, 0, 'tradicion', idx);
                return `
        <div class="comentario-panel-item border-l-4 border-oro/30 pl-4 py-2" data-panel-comentario-idx="${idx}">
            <div class="flex justify-between items-start">
                <h3 class="font-bold text-xs text-oro">${escapeHtml(c.autor)}</h3>
                <button id="star_com_${libro}_${capituloPrefacio}_0_tradicion_${idx}"
                        data-favorito-comentario="${identificadorFavorito}"
                        onclick="toggleFavoritoComentario('${libro}', ${capituloPrefacio}, 0, 'tradicion', ${idx})"
                        class="estrella-fav-comentario ${esFav ? 'activa' : ''} transition"
                        title="${accionFavorito}"
                        aria-label="${accionFavorito} comentario de ${escapeHtml(referenciaPrefacio)}"
                        aria-pressed="${esFav ? 'true' : 'false'}"><i class="fas fa-star"></i></button>
            </div>
            <p class="text-gray-700 dark:text-gray-300 text-sm mt-2">${renderizarTextoComentarioHtml(c.texto, terminoBusqueda)}</p>
            <button class="btn-compartir-comentario mt-2 text-xs text-oro hover:underline flex items-center gap-1"
                    data-libro="${libro.replace(/"/g, '&quot;')}"
                    data-capitulo="${capituloPrefacio}"
                    data-versiculo="0"
                    data-autor="${escapeHtml(c.autor).replace(/"/g, '&quot;')}"
                    data-texto="${escapeHtml(c.texto).replace(/"/g, '&quot;')}">
                <i class="fas fa-share-alt"></i>
            </button>
        </div>
    `}).join(''));
    document.getElementById('contenido-panel-tradicion').innerHTML = panelHtml;
    document.querySelectorAll('.btn-compartir-comentario').forEach(btn => {
        btn.onclick = function (e) {
            e.preventDefault();
            compartirComentario(
                this.dataset.libro,
                parseInt(this.dataset.capitulo),
                parseInt(this.dataset.versiculo),
                this.dataset.autor,
                this.dataset.texto
            );
        };
    });

    const tabTrad = document.getElementById('tab-tradicion');
    const tabPers = document.getElementById('tab-personales');
    const divTrad = document.getElementById('contenido-panel-tradicion');
    const divPers = document.getElementById('contenido-panel-personales');
    tabTrad.classList.add('border-b-2', 'border-oro', 'text-oro');
    tabTrad.classList.remove('text-gray-500', 'dark:text-gray-400');
    tabPers.classList.remove('border-b-2', 'border-oro', 'text-oro');
    tabPers.classList.add('text-gray-500', 'dark:text-gray-400');
    divTrad.classList.remove('hidden');
    divPers.classList.add('hidden');

    if (Number.isInteger(opciones?.idxLlegada)) {
        requestAnimationFrame(() => resaltarAnotacionPanel('tradicion', opciones.idxLlegada));
    }

    abrirPanelLateral('panel-comentarios');
}

function asegurarBotonPrefacioLectura() {
    const filaAcciones = document.getElementById('subtitulo-capitulo')?.parentElement;
    if (!filaAcciones) return null;

    let boton = document.getElementById('btn-prefacio-lectura');
    if (boton) return boton;

    boton = document.createElement('button');
    boton.type = 'button';
    boton.id = 'btn-prefacio-lectura';
    boton.className = 'btn-leer-capitulo transition-all flex items-center gap-2 text-sm font-bold px-3 py-1 rounded-full hidden';
    boton.innerHTML = '<i class="fas fa-scroll"></i> PREFACIO';
    filaAcciones.appendChild(boton);
    return boton;
}

function actualizarBotonPrefacioLectura(libro, capitulo) {
    const boton = asegurarBotonPrefacioLectura();
    if (!boton) return;

    const capituloPrefacio = obtenerCapituloPrefacio(libro, capitulo);
    const visible = tienePrefacio(libro, capituloPrefacio);
    boton.classList.toggle('hidden', !visible);

    if (!visible) {
        boton.onclick = null;
        return;
    }

    const referencia = formatearReferenciaPrefacio(libro, capituloPrefacio);
    boton.title = `Abrir ${referencia}`;
    boton.setAttribute('aria-label', `Abrir ${referencia}`);
    boton.onclick = () => abrirPrefacio(libro, capituloPrefacio);
}

function abrirCapitulos(nombreLibro, cantidadCapitulos) {
    return abrirCapitulosV2(nombreLibro, cantidadCapitulos);
}

function volverAVistaCapitulosActual() {
    if (!libroActual) {
        mostrarVista('vista-libros');
        return;
    }

    abrirCapitulos(libroActual, obtenerCantidadCapitulos(libroActual));

    requestAnimationFrame(() => {
        const botonCapituloActual = document.querySelector(
            `#contenedor-capitulos .btn-capitulo-principal[data-capitulo-principal="${capituloActual}"]`
        );

        if (botonCapituloActual) {
            botonCapituloActual.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }
    });
}

function obtenerIdMenuAccionesVersiculo(libro, capitulo, versiculo) {
    return `verse_menu_${sanearIdDom(`${libro}_${capitulo}_${versiculo}`)}`;
}

function limpiarPosicionMenuAccionesVersiculo(menu) {
    if (!menu) return;
    menu.classList.remove('verse-card-menu-upward');
    menu.style.maxHeight = '';
}

function actualizarTarjetasMenuAccionesVersiculo(menuActivoId = null) {
    document.querySelectorAll('.verse-card').forEach(tarjeta => {
        const menu = tarjeta.querySelector('.verse-card-menu');
        const activa = !!menuActivoId && menu?.id === menuActivoId;
        tarjeta.classList.toggle('verse-card-menu-open', activa);
    });
}

function posicionarMenuAccionesVersiculo(menu, boton) {
    if (!menu || menu.classList.contains('hidden')) return;

    limpiarPosicionMenuAccionesVersiculo(menu);

    const contenedorScroll = menu.closest('#scroll-versiculos');
    const limiteRect = contenedorScroll?.getBoundingClientRect?.() || { top: 0, bottom: window.innerHeight };
    const botonRect = boton?.getBoundingClientRect?.() || menu.parentElement?.getBoundingClientRect?.() || menu.getBoundingClientRect();
    const alturaMenu = menu.getBoundingClientRect().height;
    const margen = 16;
    const espacioAbajo = Math.max(0, limiteRect.bottom - botonRect.bottom - margen);
    const espacioArriba = Math.max(0, botonRect.top - limiteRect.top - margen);
    const abrirHaciaArriba = alturaMenu > espacioAbajo && espacioArriba > espacioAbajo;
    const espacioDisponible = abrirHaciaArriba ? espacioArriba : espacioAbajo;

    menu.classList.toggle('verse-card-menu-upward', abrirHaciaArriba);

    if (espacioDisponible > 0 && alturaMenu > espacioDisponible) {
        menu.style.maxHeight = `${Math.max(96, Math.floor(espacioDisponible))}px`;
    }
}

function cerrarMenusAccionesVersiculo(exceptoId = null) {
    document.querySelectorAll('.verse-card-menu').forEach(menu => {
        const mantener = !!exceptoId && menu.id === exceptoId;
        if (!mantener) {
            limpiarPosicionMenuAccionesVersiculo(menu);
        }
        menu.classList.toggle('hidden', !mantener);
    });

    document.querySelectorAll('.btn-verse-menu[aria-controls]').forEach(boton => {
        const expandido = !!exceptoId && boton.getAttribute('aria-controls') === exceptoId;
        boton.setAttribute('aria-expanded', expandido ? 'true' : 'false');
    });

    actualizarTarjetasMenuAccionesVersiculo(exceptoId);
}

function toggleMenuAccionesVersiculo(event, menuId, boton) {
    event?.stopPropagation();
    const menu = document.getElementById(menuId);
    if (!menu) return;

    const estabaOculto = menu.classList.contains('hidden');
    cerrarMenusAccionesVersiculo(estabaOculto ? menuId : null);

    if (estabaOculto) {
        requestAnimationFrame(() => posicionarMenuAccionesVersiculo(menu, boton));
    }

    if (!estabaOculto && boton) {
        boton.setAttribute('aria-expanded', 'false');
    }
}

function construirAccionesVersiculoHtml(libro, capitulo, versiculo, textoOriginal, favorito, leido, esInicio) {
    const menuId = obtenerIdMenuAccionesVersiculo(libro, capitulo, versiculo);
    const referencia = formatearReferenciaCompartida(libro, capitulo, versiculo);
    const libroLiteral = JSON.stringify(libro);
    const textoLiteral = JSON.stringify(textoOriginal || '');
    const menuLiteral = JSON.stringify(menuId);
    const accionFavorito = favorito ? 'Quitar de favoritos' : 'Agregar a favoritos';
    const accionLeido = leido ? 'Marcar como no leído' : 'Marcar como leído';
    const accionInicio = esInicio ? 'Quitar versículo de bienvenida' : 'Usar como versículo de bienvenida';

    return `
        <div class="verse-card-acciones flex gap-1 items-center flex-shrink-0">
            <button type="button"
                class="btn-versiculo-coleccion text-gray-400 hover:text-oro transition"
                onclick='event.stopPropagation(); abrirModalAgregarVersiculoAColeccion(${libroLiteral}, ${capitulo}, ${versiculo}, ${textoLiteral}); return false;'
                title="Agregar a una colección"
                aria-label="Agregar ${escapeHtml(referencia)} a una colección">
                <i class="fas fa-plus"></i>
            </button>
            <button type="button"
                id="star_${libro}_${capitulo}_${versiculo}"
                data-favorito-versiculo="${obtenerIdentificadorFavoritoVersiculo(libro, capitulo, versiculo)}"
                class="estrella-fav ${favorito ? 'activa' : ''} text-gray-400 hover:text-oro transition p-1"
                onclick='event.stopPropagation(); toggleFavoritoVersiculo(${libroLiteral}, ${capitulo}, ${versiculo}); return false;'
                title="${accionFavorito}"
                aria-label="${accionFavorito} ${escapeHtml(referencia)}"
                aria-pressed="${favorito ? 'true' : 'false'}">${favorito ? '★' : '☆'}</button>
            <div class="verse-card-menu-wrap">
                <button type="button"
                    class="btn-verse-menu text-gray-400 hover:text-oro transition"
                    onclick='toggleMenuAccionesVersiculo(event, ${menuLiteral}, this); return false;'
                    title="Más acciones"
                    aria-label="Más acciones para ${escapeHtml(referencia)}"
                    aria-haspopup="menu"
                    aria-controls="${menuId}"
                    aria-expanded="false">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
                <div id="${menuId}" class="verse-card-menu hidden" onclick="event.stopPropagation()">
                    <button type="button"
                        data-versiculo-inicio="${libro}_${capitulo}_${versiculo}"
                        data-libro-versiculo-inicio="${libro.replace(/"/g, '&quot;')}"
                        data-capitulo-versiculo-inicio="${capitulo}"
                        data-versiculo-versiculo-inicio="${versiculo}"
                        class="verse-card-menu-item ${esInicio ? 'activa' : ''}"
                        onclick='event.stopPropagation(); toggleVersiculoInicio(${libroLiteral}, ${capitulo}, ${versiculo}, ${textoLiteral}); cerrarMenusAccionesVersiculo(); return false;'
                        title="${accionInicio}"
                        aria-label="${accionInicio} ${escapeHtml(referencia)}"
                        aria-pressed="${esInicio ? 'true' : 'false'}">
                        <i class="fas fa-door-open menu-item-icono" aria-hidden="true"></i>
                        <span>${esInicio ? 'Quitar versículo de bienvenida' : 'Usar como versículo de bienvenida'}</span>
                    </button>
                    <button type="button"
                        id="audio_${libro}_${capitulo}_${versiculo}"
                        class="verse-card-menu-item btn-audio-versiculo"
                        onclick='event.stopPropagation(); cerrarMenusAccionesVersiculo(); escucharVersiculo(${libroLiteral}, ${capitulo}, ${versiculo}, ${textoLiteral}, this); return false;'
                        title="Escuchar versículo"
                        aria-label="Escuchar ${escapeHtml(referencia)}"
                        aria-pressed="false">
                        <i class="fas fa-volume-up menu-item-icono text-sm" aria-hidden="true"></i>
                        <span>Escuchar</span>
                    </button>
                    <button type="button"
                        class="verse-card-menu-item"
                        onclick='event.stopPropagation(); cerrarMenusAccionesVersiculo(); compartirVersiculo(${libroLiteral}, ${capitulo}, ${versiculo}, ${textoLiteral}); return false;'
                        title="Compartir versículo o crear tarjeta"
                        aria-label="Compartir ${escapeHtml(referencia)}">
                        <i class="fas fa-share-alt menu-item-icono" aria-hidden="true"></i>
                        <span>Compartir...</span>
                    </button>
                    <button type="button"
                        id="read_${libro}_${capitulo}_${versiculo}"
                        class="verse-card-menu-item btn-leido-versiculo ${leido ? 'activo text-emerald-600 dark:text-emerald-400' : ''}"
                        onclick='event.stopPropagation(); cerrarMenusAccionesVersiculo(); toggleLeidoVersiculo(${libroLiteral}, ${capitulo}, ${versiculo}); return false;'
                        title="${accionLeido}"
                        aria-label="${accionLeido} ${escapeHtml(referencia)}"
                        aria-pressed="${leido ? 'true' : 'false'}">
                        <i class="fas ${leido ? 'fa-check-circle' : 'fa-circle'} icono-leido menu-item-icono text-sm" aria-hidden="true"></i>
                        <span>${leido ? 'Marcar como no leído' : 'Marcar como leído'}</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function abrirLectura(capitulo) {
    capituloActual = capitulo;
    document.getElementById('titulo-lectura').innerText = libroActual;
    document.getElementById('subtitulo-capitulo').innerHTML = `Capítulo ${capitulo}`;
    actualizarBotonPrefacioLectura(libroActual, capitulo);
    const contenedor = document.getElementById('contenedor-versiculos');
    contenedor.innerHTML = '';
    cerrarMenusAccionesVersiculo();
    const lecturaActualVisible = versiculoActualEnLectura
        && versiculoActualEnLectura.libro === libroActual
        && versiculoActualEnLectura.capitulo === capitulo;

    const capituloLeido = estaCapituloLeido(libroActual, capitulo);
    const barraCapitulo = document.createElement('div');
    barraCapitulo.className = 'flex justify-center mt-6 mb-4';
    barraCapitulo.innerHTML = `
        <button type="button"
                id="btn-leido-capitulo-vista"
                class="btn-leido-capitulo-vista inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-300/60 dark:border-emerald-500/40 bg-emerald-50/80 dark:bg-emerald-900/25 text-emerald-700 dark:text-emerald-300 font-sans font-bold text-sm transition hover:scale-[1.02]"
                onclick="event.stopPropagation(); toggleLeidoCapitulo('${libroActual}', ${capitulo}); return false;"
                title="${capituloLeido ? 'Marcar como no leído' : 'Marcar como leído'}"
                aria-label="${capituloLeido ? 'Marcar como no leído' : 'Marcar como leído'}"
                aria-pressed="${capituloLeido ? 'true' : 'false'}">
            <i class="fas ${capituloLeido ? 'fa-check-circle' : 'fa-circle'} icono-leido"></i>
            <span class="texto-leido-capitulo">${capituloLeido ? 'CAPÍTULO LEÍDO' : 'CAPÍTULO NO LEÍDO'}</span>
        </button>
    `;

    const todosLibros = obtenerTodosLosLibros();
    const indiceLibroActual = todosLibros.findIndex(l => l.nombre === libroActual);
    const esGenesis1 = libroActual === 'Génesis' && capitulo === 1;

    if (!esGenesis1) {
        const botonesNavInicio = document.createElement('div');
        botonesNavInicio.className = 'lectura-nav-inicio flex justify-center gap-3 mb-6';
        botonesNavInicio.innerHTML = `
            <button onclick="irAlCapituloAnterior()" class="btn-nav-lectura px-4 py-2 bg-oro/10 hover:bg-oro/20 text-oro border border-oro/20 rounded-lg font-sans text-sm font-bold transition flex items-center gap-2">
                <i class="fas fa-chevron-left"></i> Anterior
            </button>
        `;
        contenedor.appendChild(botonesNavInicio);
    }

    const progresoCapitulo = obtenerProgresoCapitulo(libroActual, capitulo);
    const cabeceraProgreso = document.getElementById('cabecera-progreso-lectura');
    if (cabeceraProgreso) cabeceraProgreso.innerHTML = '';

    const bloqueProgreso = document.createElement('div');
    bloqueProgreso.id = 'progreso-capitulo-vista';
    bloqueProgreso.className = 'progreso-capitulo-vista mb-5 rounded-2xl p-4';
    bloqueProgreso.innerHTML = `
        <div class="flex items-center justify-between gap-3 mb-2">
            <span class="text-xs uppercase tracking-wider font-sans font-bold text-gray-500 dark:text-gray-400">Progreso de lectura</span>
            <span class="texto-progreso-capitulo text-xs font-sans font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                <span data-progreso-texto>${progresoCapitulo.leidos}/${progresoCapitulo.total}</span>
            </span>
        </div>
        <div class="relative w-full pt-6">
            <div class="w-full h-2 rounded-full overflow-hidden bg-black/10 dark:bg-white/10">
                <div data-progreso-barra class="${claseBarraProgresoBiblioteca()}" style="width: ${progresoCapitulo.porcentaje}%"></div>
            </div>
            <div data-progreso-burbuja class="progreso-burbuja" style="left: ${limitarPorcentajeBurbuja(progresoCapitulo.porcentaje)}%">${progresoCapitulo.porcentaje}%</div>
        </div>
    `;
    if (cabeceraProgreso) {
        cabeceraProgreso.appendChild(bloqueProgreso);
    } else {
        contenedor.appendChild(bloqueProgreso);
    }

    const versiculosObj = bibleContent[libroActual]?.[capitulo] || {};
    const numerosVersiculos = Object.keys(versiculosObj).map(Number).sort((a, b) => a - b);
    const usaAcotacionesEspeciales = libroUsaAcotacionesEspeciales(libroActual);
    if (numerosVersiculos.length > 0) {
        numerosVersiculos.forEach(v => {
            const textoOriginal = versiculosObj[v];
            const textoHTML = resaltarPalabras(textoOriginal);
            const favorito = esFavoritoVersiculo(libroActual, capitulo, v);
            const leido = esVersiculoLeido(libroActual, capitulo, v);
            const esInicio = esVersiculoInicio(libroActual, capitulo, v);
            const accionesVersiculo = construirAccionesVersiculoHtml(libroActual, capitulo, v, textoOriginal, favorito, leido, esInicio);
            let verseHtml = "";

            if (usaAcotacionesEspeciales && v < 1) {
                verseHtml = `
                    <div id="verse_${libroActual}_${capitulo}_${v}" class="verse-card bg-amber-50/50 dark:bg-gray-700/50 border-l-4 border-oro rounded-xl p-4 shadow-sm mb-6 cursor-pointer" onclick="abrirPanel('${libroActual}', ${capitulo}, ${v}, \`${escapeHtml(textoOriginal)}\`)">
                        <div class="flex items-start gap-3">
                            <span class="verse-card-numero font-sans font-bold text-oro bg-white dark:bg-gray-800 w-8 h-8 flex items-center justify-center rounded-full text-sm shadow-sm flex-shrink-0"><i class="fas fa-info"></i></span>
                            <p class="flex-1 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg font-serif italic" data-versiculo-texto="${v}">${textoHTML}</p>
                        </div>
                    </div>
                `;
            } else if (usaAcotacionesEspeciales && v % 1 !== 0) {
                verseHtml = `
                    <div id="verse_${libroActual}_${capitulo}_${v}" class="verse-card-aclaracion-wrap my-6 text-center" role="note" aria-label="${escapeHtml(normalizarTextoParaLectura(textoOriginal))}">
                        <span class="verse-card-aclaracion text-xs uppercase tracking-widest text-oro font-sans font-bold bg-santos/40 dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-oro/20" data-versiculo-texto="${v}">${textoHTML}</span>
                    </div>
                `;
            } else {
                verseHtml = `
                    <div id="verse_${libroActual}_${capitulo}_${v}" class="verse-card bg-white dark:bg-gray-800 border-l-4 border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-all mb-4">
                        <div class="flex items-start gap-3">
                            <span class="verse-card-numero font-sans font-bold text-oro bg-amber-50 dark:bg-gray-700 w-8 h-8 flex items-center justify-center rounded-full text-sm shadow-inner flex-shrink-0">${v}</span>
                            <div class="flex-1 cursor-pointer" onclick="abrirPanel('${libroActual}', ${capitulo}, ${v}, \`${escapeHtml(textoOriginal)}\`)">
                                <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg texto-biblico" data-versiculo-texto="${v}">${textoHTML}</p>
                            </div>
                            ${accionesVersiculo}
                        </div>
                    </div>
                `;
            }
            contenedor.innerHTML += verseHtml;
        });

        contenedor.appendChild(barraCapitulo);

        const esApocalipsis22 = libroActual === 'Apocalipsis' && capitulo === 22;
        if (!esApocalipsis22) {
            const botonesNavFinal = document.createElement('div');
            botonesNavFinal.className = 'lectura-nav-final flex justify-center gap-3 mt-6';
            botonesNavFinal.innerHTML = `
                <button onclick="irAlCapituloSiguiente()" class="btn-nav-lectura px-4 py-2 bg-oro/10 hover:bg-oro/20 text-oro border border-oro/20 rounded-lg font-sans text-sm font-bold transition flex items-center gap-2">
                    Siguiente <i class="fas fa-chevron-right"></i>
                </button>
            `;
            contenedor.appendChild(botonesNavFinal);
        }
    } else {
        contenedor.innerHTML = `<div class="text-center py-16 bg-white/60 dark:bg-gray-800/60 rounded-2xl border border-dashed border-oro/40"><i class="fas fa-scroll text-4xl text-oro/40 mb-4"></i><p class="text-gray-500 dark:text-gray-400">Todavía no hay versículos cargados para ${libroActual} ${capitulo}.</p></div>`;
        contenedor.appendChild(barraCapitulo);
    }
    mostrarVista('vista-lectura');
    if (lecturaActualVisible && versiculoActualEnLectura) {
        const { libro, capitulo: capituloEnLectura, versiculo } = versiculoActualEnLectura;
        versiculoActualEnLectura = null;
        requestAnimationFrame(() => {
            resaltarVersiculo(libro, capituloEnLectura, versiculo);
        });
    }
    actualizarBotonesReproduccionListas();
    actualizarBotonesLeidoVistaLectura();
}

function toggleLeidoVersiculo(libro, capitulo, versiculo) {
    const clave = claveLeidoVersiculo(libro, capitulo, versiculo);
    const marcado = !leidos.has(clave);
    if (marcado) leidos.add(clave);
    else leidos.delete(clave);
    guardarLeidos();
    actualizarBotonesLeidoVistaLectura();
    actualizarProgresoCapituloVista();
    actualizarProgresoLibroVista();
    actualizarProgresoTestamentosVista();
    actualizarProgresoBibliaVista();
    lanzarToast(marcado ? 'Versículo marcado como leído' : 'Versículo marcado como no leído');
}

function toggleLeidoCapitulo(libro, capitulo) {
    const marcado = !estaCapituloLeido(libro, capitulo);
    marcarCapituloLeido(libro, capitulo, marcado);
    guardarLeidos();
    actualizarBotonesLeidoVistaLectura();
    actualizarProgresoCapituloVista();
    actualizarProgresoLibroVista();
    actualizarProgresoTestamentosVista();
    actualizarProgresoBibliaVista();
    actualizarBotonesReproduccionListas();
    if (estaVistaVisible('vista-capitulos') && libroActual === libro) {
        abrirCapitulos(libro, obtenerCantidadCapitulos(libro));
    }
    lanzarToast(marcado ? 'Capítulo marcado como leído' : 'Capítulo marcado como no leído');
}

function llevarLecturaAlInicio() {
    const contenedorScroll = document.getElementById('scroll-versiculos');
    if (!contenedorScroll) return;

    requestAnimationFrame(() => {
        contenedorScroll.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
}

function irAlCapituloAnterior() {
    const todosLibros = obtenerTodosLosLibros();
    const indiceLibroActual = todosLibros.findIndex(l => l.nombre === libroActual);

    if (indiceLibroActual === -1) return;

    const cantidadCapitulos = capituloActual > 1 ? capituloActual - 1 : null;

    if (cantidadCapitulos) {
        // Ir al capítulo anterior del mismo libro
        abrirLectura(cantidadCapitulos);
        llevarLecturaAlInicio();
    } else if (indiceLibroActual > 0) {
        // Ir al último capítulo del libro anterior
        const libroAnterior = todosLibros[indiceLibroActual - 1];
        libroActual = libroAnterior.nombre;
        const ultimoCapitulo = Array.isArray(libroAnterior.caps)
            ? libroAnterior.caps[libroAnterior.caps.length - 1]
            : libroAnterior.caps;
        abrirLectura(ultimoCapitulo);
        llevarLecturaAlInicio();
    }
}

function irAlCapituloSiguiente() {
    const todosLibros = obtenerTodosLosLibros();
    const indiceLibroActual = todosLibros.findIndex(l => l.nombre === libroActual);

    if (indiceLibroActual === -1) return;

    const libroActualInfo = todosLibros[indiceLibroActual];
    const cantCapitulos = Array.isArray(libroActualInfo.caps)
        ? libroActualInfo.caps[libroActualInfo.caps.length - 1]
        : libroActualInfo.caps;

    if (capituloActual < cantCapitulos) {
        // Ir al siguiente capítulo del mismo libro
        abrirLectura(capituloActual + 1);
        llevarLecturaAlInicio();
    } else if (indiceLibroActual < todosLibros.length - 1) {
        // Ir al primer capítulo del siguiente libro
        const libroSiguiente = todosLibros[indiceLibroActual + 1];
        libroActual = libroSiguiente.nombre;
        abrirLectura(1);
        llevarLecturaAlInicio();
    }
}

function mostrarVista(idVista) {
    cerrarPanel('panel-comentarios');
    cerrarPanel('panel-favoritos');
    cerrarPanel('panel-concordancia');
    cerrarPanel('panel-busqueda');
    document.querySelectorAll('.vista').forEach(v => {
        v.classList.add('hidden');
        v.classList.remove('z-30');
    });
    document.getElementById(idVista).classList.remove('hidden');
    document.getElementById(idVista).classList.add('z-30');
}

function irAlInicio() {
    mostrarVista('vista-libros');

    const selectorCapitulos = document.getElementById('selector-rapido-capitulos');
    const selectorLectura = document.getElementById('selector-rapido-lectura');

    if (selectorCapitulos) selectorCapitulos.value = "";
    if (selectorLectura) selectorLectura.value = "";

    const inputsBusqueda = [
        document.getElementById('busqueda-input'),
        document.getElementById('busqueda-input-movil'),
        document.getElementById('busqueda-panel-input')
    ];

    inputsBusqueda.forEach(input => {
        if (input) input.value = "";
    });
    filtroLibroBusquedaActual = FILTRO_BUSQUEDA_TODOS;
    sincronizarSelectorFiltroLibroBusqueda();

    mostrarBuscadorMovil(false);
    actualizarEstadoControlesBusqueda();
}

function abrirPanel(libro, capitulo, versiculo, textoVersiculo, opciones = null) {
    const comentarios = obtenerComentarios(libro, capitulo, versiculo);
    const terminoBusqueda = obtenerTerminoBusquedaLlegada(libro, capitulo, versiculo, opciones?.terminoBusqueda || '');

    const usaAcotacionesEspeciales = libroUsaAcotacionesEspeciales(libro);
    let tituloRef = "";
    if (usaAcotacionesEspeciales && versiculo < 1) tituloRef = `${libro} ${capitulo} (Introducción)`;
    else if (usaAcotacionesEspeciales && versiculo % 1 !== 0) tituloRef = `${libro} ${capitulo} (Acotación)`;
    else tituloRef = `${libro} ${capitulo}, ${versiculo}`;

    document.getElementById('titulo-panel-versiculo').innerHTML = tituloRef;

    document.getElementById('cita-panel-sticky').innerHTML = `
        <div class="cita-versiculo-panel panel-cita-fija p-4 bg-amber-50/40 dark:bg-gray-700 rounded-lg border-l-4 border-oro">
            <p class="cita-versiculo-texto text-sm font-serif italic text-gray-700 dark:text-gray-300">"${renderizarTextoBusquedaResaltadoHtml(textoVersiculo, terminoBusqueda, { preservarSaltos: true })}"</p>
        </div>
    `;

    const capituloPrefacio = obtenerCapituloPrefacio(libro, capitulo);
    const tienePrefacioContextual = tienePrefacio(libro, capituloPrefacio);

    let tradicionHtml = `<div class="text-xs font-sans text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3"><i class="fas fa-feather-alt"></i> Tradición de los Padres y Doctores</div>`;

    if (tienePrefacioContextual) {
        const referenciaPrefacio = formatearReferenciaPrefacio(libro, capituloPrefacio);
        tradicionHtml += `
            <button type="button"
                    class="prefacio-btn w-full mb-5 py-3 rounded-xl shadow-sm transition-all font-sans font-bold text-sm flex items-center justify-center gap-2"
                    onclick="abrirPrefacio('${libro}', ${capituloPrefacio})"
                    aria-label="Abrir ${escapeHtml(referenciaPrefacio)}">
                <i class="fas fa-scroll" aria-hidden="true"></i> Ver ${escapeHtml(referenciaPrefacio)}
            </button>
        `;
    }

    if (comentarios.length === 0) {
        tradicionHtml += `<div class="text-gray-600 dark:text-gray-400 italic font-sans text-center py-10">Aún no se han cargado comentarios de la Tradición para este pasaje.<br> Recemos para que un alma caritativa me los haga llegar.</div>`;
    } else {
        tradicionHtml += comentarios.map((c, idx) => {
            const esFav = esFavoritoComentario(libro, capitulo, versiculo, 'tradicion', idx);
            const accionFavorito = esFav ? 'Quitar de favoritos' : 'Agregar a favoritos';
            const identificadorFavorito = obtenerIdentificadorFavoritoComentario(libro, capitulo, versiculo, 'tradicion', idx);
            return `
            <div class="comentario-panel-item border-l-4 border-oro/30 pl-4 py-2 rounded-lg" data-panel-comentario-idx="${idx}">
                <div class="flex justify-between items-start">
                    <h3 class="font-bold text-xs text-oro">${escapeHtml(c.autor)}</h3>
                    <div class="flex gap-2 items-center">
                        <button class="btn-audio-comentario text-gray-600 dark:text-gray-400 hover:text-oro transition p-1" 
                                data-autor="${escapeHtml(c.autor).replace(/"/g, '&quot;')}"
                                data-texto="${escapeHtml(c.texto).replace(/"/g, '&quot;')}"
                                title="Escuchar comentario">
                            <i class="fas fa-volume-up text-sm"></i>
                        </button>
                        <button id="star_com_${libro}_${capitulo}_${versiculo}_tradicion_${idx}" 
                                data-favorito-comentario="${identificadorFavorito}"
                                onclick="toggleFavoritoComentario('${libro}', ${capitulo}, ${versiculo}, 'tradicion', ${idx})" 
                                class="estrella-fav-comentario ${esFav ? 'activa' : ''} transition"
                                title="${accionFavorito}"
                                aria-label="${accionFavorito} comentario de ${escapeHtml(formatearReferenciaComentarioTradicion(libro, capitulo, versiculo))}"
                                aria-pressed="${esFav ? 'true' : 'false'}">
                            <i class="fas fa-star"></i>
                        </button>
                    </div>
                </div>
                <p class="text-gray-700 dark:text-gray-300 text-sm mt-2">${renderizarTextoComentarioHtml(c.texto, terminoBusqueda)}</p>
                <button class="btn-compartir-comentario mt-2 text-xs text-oro hover:underline flex items-center gap-1"
                        data-libro="${libro.replace(/"/g, '&quot;')}"
                        data-capitulo="${capitulo}"
                        data-versiculo="${versiculo}"
                        data-autor="${escapeHtml(c.autor).replace(/"/g, '&quot;')}"
                        data-texto="${escapeHtml(c.texto).replace(/"/g, '&quot;')}">
                    <i class="fas fa-share-alt"></i> Compartir
                </button>
            </div>
            `;
        }).join('');
    }
    document.getElementById('contenido-panel-tradicion').innerHTML = tradicionHtml;

    // Event listener para botones de audio de comentarios
    document.querySelectorAll('.btn-audio-comentario').forEach(btn => {
        btn.onclick = function (e) {
            e.preventDefault();
            const autor = this.dataset.autor;
            const texto = this.dataset.texto;
            escucharComentario(autor, texto, this);
        };
    });
    document.querySelectorAll('.btn-compartir-comentario').forEach(btn => {
        btn.onclick = function (e) {
            e.preventDefault();
            compartirComentario(
                this.dataset.libro,
                parseInt(this.dataset.capitulo),
                parseInt(this.dataset.versiculo),
                this.dataset.autor,
                this.dataset.texto
            );
        };
    });

    mostrarNotasPersonales(libro, capitulo, versiculo, terminoBusqueda);
    const guardarBtn = document.getElementById('guardar-nota');
    const textarea = document.getElementById('nota-personal');
    const nuevaNotaHandler = () => {
        const nota = textarea.value.trim();
        if (nota) {
            guardarNota(libro, capitulo, versiculo, nota);
            textarea.value = '';
        }
    };
    guardarBtn.onclick = nuevaNotaHandler;

    const tabTrad = document.getElementById('tab-tradicion');
    const tabPers = document.getElementById('tab-personales');
    const divTrad = document.getElementById('contenido-panel-tradicion');
    const divPers = document.getElementById('contenido-panel-personales');
    const activarTradicion = () => {
        tabTrad.classList.add('border-b-2', 'border-oro', 'text-oro');
        tabTrad.classList.remove('text-gray-500', 'dark:text-gray-400');
        tabPers.classList.remove('border-b-2', 'border-oro', 'text-oro');
        tabPers.classList.add('text-gray-500', 'dark:text-gray-400');
        divTrad.classList.remove('hidden');
        divPers.classList.add('hidden');
        requestAnimationFrame(() => aplicarLlegadaBusquedaPanel(libro, capitulo, versiculo, 'tradicion'));
    };
    const activarPersonales = () => {
        tabPers.classList.add('border-b-2', 'border-oro', 'text-oro');
        tabPers.classList.remove('text-gray-500', 'dark:text-gray-400');
        tabTrad.classList.remove('border-b-2', 'border-oro', 'text-oro');
        tabTrad.classList.add('text-gray-500', 'dark:text-gray-400');
        divPers.classList.remove('hidden');
        divTrad.classList.add('hidden');
        requestAnimationFrame(() => aplicarLlegadaBusquedaPanel(libro, capitulo, versiculo, 'personal'));
    };

    tabTrad.onclick = activarTradicion;
    tabPers.onclick = activarPersonales;

    activarTradicion();

    if (opciones?.tipoLlegada === 'personal') {
        activarPersonales();
        requestAnimationFrame(() => resaltarAnotacionPanel('personal', opciones.idxLlegada));
    } else if (opciones?.tipoLlegada === 'tradicion') {
        requestAnimationFrame(() => resaltarAnotacionPanel('tradicion', opciones.idxLlegada));
    }

    abrirPanelLateral('panel-comentarios');
}

function cerrarPanel(id) {
    const panel = document.getElementById(id);
    if (!panel) return;

    panel.style.transform = '';
    panel.classList.remove('panel-lateral-arrastrando');

    // El panel de búsqueda tiene un modo "asomado" donde queda un tirador visible
    if (id === 'panel-busqueda') {
        if (tieneResultadosBusquedaActivos() && panel.dataset.abiertoAlMenosUnaVez === 'true') {
            panel.classList.remove('translate-x-full');
            panel.classList.add('panel-busqueda-asomado');

            const tirador = panel.querySelector('.panel-busqueda-tirador');
            if (tirador) tirador.hidden = false;
        } else {
            ocultarPanelBusquedaCompleto();
        }
    } else {
        panel.classList.add('translate-x-full');
    }

    if (esPanelLateralDerecha(id)) {
        actualizarOverlayPanelesDerecha();
    }
}

function abrirPanelLumina() {
    const panel = document.getElementById('panel-lumina');
    const overlay = document.getElementById('overlay-panel-lumina');
    if (!panel || !overlay) return;
    cerrarPanelActivoLateral();
    mostrarBuscadorMovil(false);
    resetPanelLumina();
    overlay.classList.remove('hidden');
    panel.classList.remove('-translate-x-full');
}

function cerrarPanelLumina() {
    const panel = document.getElementById('panel-lumina');
    const overlay = document.getElementById('overlay-panel-lumina');
    if (!panel || !overlay) return;
    panel.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
}

function togglePanelLumina() {
    const panel = document.getElementById('panel-lumina');
    if (!panel) return;
    const abierto = !panel.classList.contains('-translate-x-full');
    if (abierto) cerrarPanelLumina();
    else abrirPanelLumina();
}

function mostrarSeccionPanelLumina(seccion) {
    const contenidos = document.querySelectorAll('[data-lumina-contenido]');
    const enlaces = document.querySelectorAll('[data-lumina-seccion]');
    const placeholder = document.querySelector('[data-lumina-placeholder]');

    contenidos.forEach(bloque => {
        bloque.classList.toggle('hidden', bloque.id !== `lumina-seccion-${seccion}`);
    });

    enlaces.forEach(enlace => {
        const activo = enlace.dataset.luminaSeccion === seccion;
        enlace.classList.toggle('activa', activo);
    });

    if (placeholder) {
        placeholder.classList.add('hidden');
    }
}

function resetPanelLumina() {
    const contenidos = document.querySelectorAll('[data-lumina-contenido]');
    const enlaces = document.querySelectorAll('[data-lumina-seccion]');
    const placeholder = document.querySelector('[data-lumina-placeholder]');

    contenidos.forEach(bloque => bloque.classList.add('hidden'));
    enlaces.forEach(enlace => enlace.classList.remove('activa'));
    if (placeholder) {
        placeholder.classList.remove('hidden');
    }
}

function actualizarUIBotonModoDesierto() {
    const boton = document.getElementById('btn-modo-desierto');
    const titulo = document.getElementById('modo-desierto-titulo');
    const descripcion = document.getElementById('modo-desierto-descripcion');
    const plumaFlotante = document.getElementById('btn-menu-lumina-flotante');

    if (boton) {
        boton.classList.toggle('activa', modoDesiertoActivo);
        boton.setAttribute('aria-pressed', modoDesiertoActivo ? 'true' : 'false');
        boton.setAttribute('title', modoDesiertoActivo ? 'Salir del desierto' : 'Entrar al desierto');
    }

    if (titulo) {
        titulo.textContent = modoDesiertoActivo ? 'Salir del desierto' : 'Entrar al desierto';
    }

    if (descripcion) {
        descripcion.textContent = modoDesiertoActivo
            ? 'Volvé a la versión completa de Lumina con header y footer visibles cuando desees salir del foco de lectura.'
            : 'Ocultá el header y el footer para sumergirte por completo en el texto. La pluma queda visible para volver a verlos cuando desees.';
    }

    if (plumaFlotante) {
        const etiqueta = modoDesiertoActivo
            ? 'Abrir menú Lumina y salir del modo desierto'
            : 'Abrir menú Lumina';
        plumaFlotante.setAttribute('aria-label', etiqueta);
        plumaFlotante.setAttribute('title', etiqueta);
    }
}

function sincronizarClaseTextoCorrido() {
    document.body.classList.toggle('modo-desierto-texto-corrido', modoDesiertoActivo && textoCorridoActivo);
}

function actualizarUIBotonTextoCorrido() {
    const boton = document.getElementById('btn-texto-corrido');
    const titulo = document.getElementById('texto-corrido-titulo');
    const descripcion = document.getElementById('texto-corrido-descripcion');
    const disponible = modoDesiertoActivo;

    if (boton) {
        boton.disabled = !disponible;
        boton.classList.toggle('activa', disponible && textoCorridoActivo);
        boton.setAttribute('aria-pressed', disponible && textoCorridoActivo ? 'true' : 'false');
        boton.setAttribute('aria-disabled', disponible ? 'false' : 'true');
        boton.setAttribute(
            'title',
            !disponible
                ? 'Texto corrido disponible dentro del modo desierto'
                : (textoCorridoActivo ? 'Mostrar referencias y botones' : 'Activar texto corrido')
        );
    }

    if (titulo) {
        titulo.textContent = !disponible
            ? 'Texto corrido'
            : (textoCorridoActivo ? 'Mostrar referencias y botones' : 'Activar texto corrido');
    }

    if (descripcion) {
        descripcion.textContent = !disponible
            ? 'Entrá al desierto para poder ocultar numeración y herramientas para una lectura puramente narrativa.'
            : (
                textoCorridoActivo
                    ? 'Volvé a ver numeritos, favoritos, audio, compartir y marcas de lectura en cada versículo.'
                    : 'Ocultá numeritos, acciones y bloques de apoyo dentro de la lectura para dejar la Palabra más despejada.'
            );
    }
}

function aplicarModoDesierto(activo, opciones = {}) {
    const {
        guardar = true,
        mostrarToast = false,
        cerrarMenu = false
    } = opciones;

    modoDesiertoActivo = !!activo;
    document.body.classList.toggle('modo-desierto-activo', modoDesiertoActivo);

    if (modoDesiertoActivo) {
        mostrarBuscadorMovil(false);
    }

    if (guardar) {
        escribirPersistencia(CLAVE_MODO_DESIERTO, modoDesiertoActivo ? 'true' : 'false');
    }

    sincronizarClaseTextoCorrido();
    actualizarUIBotonModoDesierto();
    actualizarUIBotonTextoCorrido();

    if (cerrarMenu) {
        cerrarPanelLumina();
    }

    if (mostrarToast) {
        lanzarToast(modoDesiertoActivo ? 'Modo desierto activado' : 'Modo desierto desactivado');
    }
}

function aplicarTextoCorrido(activo, opciones = {}) {
    const {
        guardar = true,
        mostrarToast = false,
        cerrarMenu = false
    } = opciones;

    textoCorridoActivo = !!activo;

    if (guardar) {
        escribirPersistencia(CLAVE_TEXTO_CORRIDO, textoCorridoActivo ? 'true' : 'false');
    }

    sincronizarClaseTextoCorrido();
    actualizarUIBotonTextoCorrido();

    if (cerrarMenu) {
        cerrarPanelLumina();
    }

    if (mostrarToast) {
        lanzarToast(textoCorridoActivo ? 'Texto corrido activado' : 'Referencias y botones restaurados');
    }
}

function toggleModoDesierto() {
    aplicarModoDesierto(!modoDesiertoActivo, {
        guardar: true,
        mostrarToast: true,
        cerrarMenu: !modoDesiertoActivo
    });
}

function toggleTextoCorrido() {
    if (!modoDesiertoActivo) {
        lanzarToast('Entrá al desierto para usar texto corrido');
        return;
    }

    aplicarTextoCorrido(!textoCorridoActivo, {
        guardar: true,
        mostrarToast: true,
        cerrarMenu: !textoCorridoActivo
    });
}

function abrirModalBienvenida() {
    const modal = document.getElementById('modal-bienvenida');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    escribirPersistencia(CLAVE_BIENVENIDA, 'true');
}

function cerrarModalBienvenida(mostrarPendiente = true) {
    const modal = document.getElementById('modal-bienvenida');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');

    if (mostrarPendiente && versiculoInicioPendienteTrasBienvenida) {
        requestAnimationFrame(() => abrirModalVersiculoInicio());
    }
}

function verificarBienvenida() {
    if (leerPersistencia(CLAVE_BIENVENIDA) !== 'true') {
        abrirModalBienvenida();
    }
}

function registrarFirebaseLumina(firebase = window.LuminaFirebase) {
    if (!firebase) return Promise.resolve(null);

    firebaseLumina = firebase;

    if (firebaseLuminaInicializado) {
        if (persistenciaLuminaInicializada) inicializarAuthNubeLumina(firebase);
        actualizarUINubeLumina();
        return Promise.resolve(firebase);
    }

    firebaseLuminaInicializado = true;

    return Promise.all([
        Promise.resolve(firebase.persistenceReady),
        Promise.resolve(firebase.authReady)
    ])
        .then(() => {
            const estado = typeof firebase.getEstado === 'function' ? firebase.getEstado() : {};
            const detalleOffline = estado.firestoreSdk === 'lite'
                ? 'Firestore Lite; persistencia local propia de Lumina'
                : (estado.offlinePersistence === 'enabled'
                    ? 'persistencia offline activa'
                    : 'persistencia offline no disponible');

            console.log(`Firebase conectado para Lumina (${detalleOffline}).`);
            if (persistenciaLuminaInicializada) inicializarAuthNubeLumina(firebase);
            actualizarEstadoNubeLumina(usuarioFirebaseLumina ? ESTADO_NUBE_LUMINA.sincronizado : ESTADO_NUBE_LUMINA.sinSesion);
            return firebase;
        })
        .catch(error => {
            console.warn('Firebase se cargó, pero no terminó de inicializarse correctamente:', error);
            actualizarEstadoNubeLumina(ESTADO_NUBE_LUMINA.error);
            return firebase;
        });
}

function inicializarFirebaseLumina() {
    if (!window.LuminaFirebase) {
        console.warn('Firebase todavía no está disponible. Lumina sigue funcionando con persistencia local.');
        actualizarEstadoNubeLumina(ESTADO_NUBE_LUMINA.sinFirebase);
        return Promise.resolve(null);
    }

    return registrarFirebaseLumina(window.LuminaFirebase);
}

function inicializarAuthNubeLumina(firebase) {
    if (!firebase || unsubscribeAuthLumina || typeof firebase.observeAuth !== 'function') return;

    unsubscribeAuthLumina = firebase.observeAuth(async user => {
        usuarioFirebaseLumina = user || null;
        actualizarUINubeLumina();

        if (usuarioFirebaseLumina) {
            await sincronizarLuminaConNube({ motivo: 'sesion' });
        } else {
            cambiosPendientesNubeLumina.clear();
            actualizarEstadoNubeLumina(ESTADO_NUBE_LUMINA.sinSesion);
        }
    });
}

function abrirAjustesNubeLumina() {
    abrirPanelLumina();
    mostrarSeccionPanelLumina('ajustes');
}

function obtenerNombreUsuarioNubeLumina(user = usuarioFirebaseLumina) {
    if (!user) return '';
    return user.displayName || user.email || 'Cuenta Google';
}

function actualizarEstadoNubeLumina(mensaje) {
    ultimoEstadoNubeLumina = mensaje || ultimoEstadoNubeLumina || ESTADO_NUBE_LUMINA.sinSesion;
    actualizarUINubeLumina();
}

function actualizarUINubeLumina() {
    const status = document.getElementById('lumina-cloud-status');
    const userBox = document.getElementById('lumina-cloud-user');
    const btnLogin = document.getElementById('btn-login-google-lumina');
    const btnSync = document.getElementById('btn-sync-cloud-lumina');
    const btnLogout = document.getElementById('btn-logout-google-lumina');
    const btnHeader = document.getElementById('btn-nube-lumina');
    const conectado = Boolean(usuarioFirebaseLumina);
    const iniciandoSesion = !conectado && ultimoEstadoNubeLumina === ESTADO_NUBE_LUMINA.conectando;

    if (status) status.textContent = ultimoEstadoNubeLumina || (conectado ? ESTADO_NUBE_LUMINA.sincronizado : ESTADO_NUBE_LUMINA.sinSesion);

    if (userBox) {
        userBox.classList.toggle('hidden', !conectado);
        if (conectado) {
            const nombre = obtenerNombreUsuarioNubeLumina();
            const email = usuarioFirebaseLumina.email || '';
            userBox.textContent = email && email !== nombre ? `${nombre} · ${email}` : nombre;
        } else {
            userBox.textContent = '';
        }
    }

    if (btnLogin) {
        btnLogin.classList.toggle('hidden', conectado);
        btnLogin.disabled = iniciandoSesion;
    }

    if (btnSync) {
        btnSync.classList.toggle('hidden', !conectado);
        btnSync.disabled = sincronizacionNubeLuminaEnCurso;
    }

    if (btnLogout) {
        btnLogout.classList.toggle('hidden', !conectado);
        btnLogout.disabled = false;
    }

    if (btnHeader) {
        btnHeader.classList.toggle('text-oro', conectado);
        btnHeader.setAttribute('title', conectado ? `Nube conectada: ${obtenerNombreUsuarioNubeLumina()}` : 'Cuenta y nube');
        btnHeader.setAttribute('aria-label', conectado ? 'Abrir cuenta y nube conectada' : 'Abrir cuenta y nube');
    }
}

function obtenerMensajeErrorAuthLumina(error) {
    const codigo = error?.code || 'auth/error-desconocido';
    const dominio = window.location.hostname;

    switch (codigo) {
        case 'auth/unauthorized-domain':
            return `Firebase no autorizó este dominio (${dominio}). Agregá "${dominio}" en Authentication > Settings > Authorized domains.`;
        case 'auth/operation-not-allowed':
            return 'Google todavía no está habilitado como proveedor de acceso en Firebase Authentication.';
        case 'auth/popup-blocked':
            return 'El navegador bloqueó la ventana de Google. Permití popups para Lumina o probá desde el botón otra vez.';
        case 'auth/popup-closed-by-user':
            return 'Se cerró la ventana de Google antes de completar el acceso.';
        case 'auth/cancelled-popup-request':
            return 'Se inició más de un acceso a Google a la vez. Esperá unos segundos y tocá Entrar con Google una sola vez.';
        case 'auth/missing-initial-state':
            return 'El navegador perdió el estado inicial del acceso con Google. Actualizá Lumina y volvé a intentar desde el navegador, no desde una vista interna de otra app.';
        case 'auth/web-storage-unsupported':
            return 'El navegador no permite guardar la sesión de Google. Activá almacenamiento/cookies para Lumina o probá con otro navegador.';
        case 'auth/unauthorized-continue-uri':
        case 'auth/invalid-continue-uri':
            return `Firebase rechazó la URL de retorno (${window.location.origin}). Revisá los dominios autorizados y las URIs de OAuth.`;
        case 'auth/network-request-failed':
            return 'No hubo conexión suficiente para completar el acceso con Google.';
        case 'auth/invalid-api-key':
            return 'Firebase rechazó la API key configurada.';
        default:
            return `No se pudo iniciar sesión con Google (${codigo}).`;
    }
}

function manejarErrorAuthLumina(error) {
    const mensaje = obtenerMensajeErrorAuthLumina(error);
    console.error('Error de autenticación Firebase:', error);
    actualizarEstadoNubeLumina(mensaje);
    lanzarToast(mensaje);
}

function obtenerProyectoFirebaseNubeLumina() {
    return firebaseLumina?.config?.projectId || firebaseLumina?.app?.options?.projectId || 'el proyecto Firebase configurado';
}

function obtenerRutaFirestoreNubeLumina(uid = usuarioFirebaseLumina?.uid) {
    return uid
        ? `users/${uid}/lumina_estado/{clave}`
        : RUTA_FIRESTORE_NUBE_LUMINA;
}

function obtenerDestinoFirestoreNubeLumina() {
    return `${obtenerRutaFirestoreNubeLumina()} en ${obtenerProyectoFirebaseNubeLumina()}`;
}

function obtenerMensajeErrorNubeLumina(error) {
    const codigo = error?.code || '';
    const destino = obtenerDestinoFirestoreNubeLumina();

    switch (codigo) {
        case 'lumina/sync-timeout':
            return `Cloud Firestore tardó demasiado en responder (${Math.round((error?.luminaTimeoutMs || TIMEOUT_OPERACION_NUBE_LUMINA) / 1000)}s). Revisá que Firestore esté creado, publicado y accesible para ${destino}.`;
        case 'permission-denied':
            return `Google inició sesión, pero Cloud Firestore no permitió leer o guardar datos en ${destino}. Revisá las reglas de Firestore, no las de Realtime Database.`;
        case 'failed-precondition':
            return 'Cloud Firestore rechazó la operación por configuración pendiente. Revisá que la base Firestore esté creada en modo Native y publicada.';
        case 'not-found':
            return 'No se encontró la base de Cloud Firestore del proyecto. Creala desde Firebase > Firestore Database.';
        case 'unavailable':
            return 'Google inició sesión, pero Firestore no está disponible ahora. Lumina reintentará cuando haya conexión.';
        case 'resource-exhausted':
            return 'Google inició sesión, pero Firebase rechazó la sincronización por límite de uso.';
        case 'unauthenticated':
            return 'Firebase perdió la sesión antes de sincronizar. Cerrá y volvé a entrar con Google.';
        default:
            return navigator.onLine
                ? ESTADO_NUBE_LUMINA.error
                : ESTADO_NUBE_LUMINA.pendiente;
    }
}

function esperarOperacionNubeLumina(operacion, mensaje = 'La operación de nube tardó demasiado', timeoutMs = TIMEOUT_OPERACION_NUBE_LUMINA) {
    let timeoutId = null;

    const timeout = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
            const error = new Error(mensaje);
            error.code = 'lumina/sync-timeout';
            error.luminaOperacion = mensaje;
            error.luminaTimeoutMs = timeoutMs;
            reject(error);
        }, timeoutMs);
    });

    return Promise.race([
        Promise.resolve(operacion).finally(() => clearTimeout(timeoutId)),
        timeout
    ]);
}

async function iniciarSesionGoogleLumina() {
    if (!firebaseLumina?.signInWithGoogle) {
        lanzarToast('Firebase todavía no está listo');
        return;
    }

    actualizarEstadoNubeLumina(ESTADO_NUBE_LUMINA.conectando);

    try {
        await firebaseLumina.signInWithGoogle();
    } catch (error) {
        manejarErrorAuthLumina(error);
    }
}

window.addEventListener('lumina:firebase-auth-error', event => {
    if (event.detail) {
        manejarErrorAuthLumina(event.detail);
    }
});

async function cerrarSesionGoogleLumina() {
    if (!firebaseLumina?.signOutGoogle) return;

    try {
        sincronizacionNubeLuminaEnCurso = false;
        aplicandoDatosNubeLumina = false;
        clearTimeout(temporizadorSincronizacionNubeLumina);
        actualizarUINubeLumina();
        await firebaseLumina.signOutGoogle();
        lanzarToast('Sesión de Google cerrada');
    } catch (error) {
        console.error('No se pudo cerrar sesión:', error);
        actualizarEstadoNubeLumina(ESTADO_NUBE_LUMINA.sinSesion);
        lanzarToast('No se pudo cerrar la sesión');
    }
}

function obtenerEntradasPersistenciaParaNube() {
    return [...persistenciaLuminaCache.entries()]
        .filter(([key]) => esClaveLuminaPersistible(key))
        .map(([key, value]) => ({
            key,
            value,
            deleted: false,
            updatedAtLocal: obtenerUpdatedAtPersistencia(key)
        }));
}

function normalizarEntradaNubeLumina(entrada) {
    if (!entrada || !esClaveLuminaPersistible(entrada.key)) return null;

    return {
        key: entrada.key,
        value: entrada.deleted ? null : normalizarValorPersistencia(entrada.value ?? ''),
        deleted: Boolean(entrada.deleted),
        updatedAtLocal: entrada.updatedAtLocal || '1970-01-01T00:00:00.000Z'
    };
}

function parsearJSONPersistencia(valor, fallback) {
    try {
        const parsed = JSON.parse(valor);
        return parsed ?? fallback;
    } catch (_) {
        return fallback;
    }
}

function serializarPersistenciaFusionada(valor) {
    return JSON.stringify(valor);
}

function obtenerEntradaLocalNubeLumina(clave) {
    const existe = persistenciaLuminaCache.has(clave);
    return {
        key: clave,
        value: existe ? persistenciaLuminaCache.get(clave) : null,
        deleted: !existe,
        updatedAtLocal: obtenerUpdatedAtPersistencia(clave)
    };
}

function entradasNubeEquivalentes(a, b) {
    return Boolean(a) === Boolean(b)
        && (!a || (
            a.key === b.key
            && Boolean(a.deleted) === Boolean(b.deleted)
            && String(a.value ?? '') === String(b.value ?? '')
            && String(a.updatedAtLocal || '') === String(b.updatedAtLocal || '')
        ));
}

function crearEntradaFusionada(clave, valor, updatedAtLocal = obtenerMarcaTiempoPersistencia()) {
    if (valor === null || typeof valor === 'undefined') {
        return { key: clave, value: null, deleted: true, updatedAtLocal };
    }

    return {
        key: clave,
        value: normalizarValorPersistencia(valor),
        deleted: false,
        updatedAtLocal
    };
}

function maxFechaPersistencia(...fechas) {
    return fechas.reduce((max, fecha) => (
        compararFechasPersistencia(fecha, max) > 0 ? fecha : max
    ), '1970-01-01T00:00:00.000Z');
}

function minFechaPersistencia(...fechas) {
    const validas = fechas.filter(fecha => Date.parse(fecha || ''));
    if (validas.length === 0) return obtenerMarcaTiempoPersistencia();
    return validas.reduce((min, fecha) => (
        compararFechasPersistencia(fecha, min) < 0 ? fecha : min
    ), validas[0]);
}

function fusionarArraysUnicosPersistencia(valorLocal, valorNube) {
    const local = parsearJSONPersistencia(valorLocal || '[]', []);
    const nube = parsearJSONPersistencia(valorNube || '[]', []);
    return Array.from(new Set([
        ...(Array.isArray(local) ? local : []),
        ...(Array.isArray(nube) ? nube : [])
    ].map(item => String(item || '').trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'es'));
}

function normalizarNotaFusionLumina(nota) {
    if (!nota) return null;

    if (typeof nota === 'string') {
        const texto = nota.trim();
        return texto ? { texto, fecha: '' } : null;
    }

    if (typeof nota !== 'object') return null;

    const texto = String(nota.texto || '').trim();
    if (!texto) return null;

    return {
        ...nota,
        texto,
        fecha: String(nota.fecha || '').trim()
    };
}

function fusionarNotasPersistencia(valorLocal, valorNube) {
    const local = parsearJSONPersistencia(valorLocal || '{}', {});
    const nube = parsearJSONPersistencia(valorNube || '{}', {});
    const salida = {};
    const claves = new Set([...Object.keys(local || {}), ...Object.keys(nube || {})]);

    claves.forEach(clave => {
        const notas = [
            ...(Array.isArray(local?.[clave]) ? local[clave] : []),
            ...(Array.isArray(nube?.[clave]) ? nube[clave] : [])
        ].map(normalizarNotaFusionLumina).filter(Boolean);

        const vistas = new Set();
        const fusionadas = [];

        notas.forEach(nota => {
            const id = `${nota.texto}__${nota.fecha}`;
            if (vistas.has(id)) return;
            vistas.add(id);
            fusionadas.push(nota);
        });

        if (fusionadas.length > 0) {
            salida[clave] = fusionadas;
        }
    });

    return salida;
}

function fusionarBusquedasPersistencia(valorLocal, valorNube) {
    const local = parsearJSONPersistencia(valorLocal || '[]', []);
    const nube = parsearJSONPersistencia(valorNube || '[]', []);
    const mapa = new Map();

    [...(Array.isArray(local) ? local : []), ...(Array.isArray(nube) ? nube : [])]
        .map(normalizarBusquedaReciente)
        .filter(Boolean)
        .forEach(item => {
            const clave = `${item.termino}__${normalizarFiltroLibroBusqueda(item.filtro)}`;
            const existente = mapa.get(clave);
            if (!existente || compararFechasPersistencia(item.updatedAt, existente.updatedAt) > 0) {
                mapa.set(clave, item);
            }
        });

    return ordenarBusquedasRecientes([...mapa.values()]).slice(0, LIMITE_BUSQUEDAS_RECIENTES);
}

function fusionarLectioPersistencia(valorLocal, valorNube) {
    const local = parsearJSONPersistencia(valorLocal || '[]', []);
    const nube = parsearJSONPersistencia(valorNube || '[]', []);
    const mapa = new Map();

    [...(Array.isArray(local) ? local : []), ...(Array.isArray(nube) ? nube : [])]
        .map(normalizarRegistroLectioDivina)
        .filter(Boolean)
        .forEach(registro => {
            const existente = mapa.get(registro.id);
            if (!existente || compararFechasPersistencia(registro.updatedAt, existente.updatedAt) >= 0) {
                mapa.set(registro.id, registro);
            }
        });

    return [...mapa.values()].sort((a, b) => compararFechasPersistencia(b.updatedAt, a.updatedAt));
}

function fusionarColeccionPersistenciaExistente(actual, entrante) {
    const actualizada = compararFechasPersistencia(entrante.updatedAt, actual.updatedAt) >= 0
        ? { ...actual, nombre: entrante.nombre, modoOrden: entrante.modoOrden, updatedAt: entrante.updatedAt }
        : { ...actual };
    const mapaVersiculos = new Map();

    [...actual.versiculos, ...entrante.versiculos].forEach(entrada => {
        const clave = obtenerClaveVersiculoColeccion(entrada.libro, entrada.capitulo, entrada.versiculo);
        const existente = mapaVersiculos.get(clave);
        if (!existente || compararFechasPersistencia(entrada.agregadoEn, existente.agregadoEn) < 0) {
            mapaVersiculos.set(clave, entrada);
        }
    });

    const versiculos = [...mapaVersiculos.values()];
    actualizada.versiculos = coleccionUsaOrdenManual(actualizada)
        ? versiculos
        : ordenarVersiculosColeccionSegunBiblia(versiculos);
    actualizada.createdAt = minFechaPersistencia(actual.createdAt, entrante.createdAt);
    actualizada.updatedAt = maxFechaPersistencia(actual.updatedAt, entrante.updatedAt);
    return actualizada;
}

function fusionarColeccionesPersistencia(valorLocal, valorNube) {
    const local = parsearJSONPersistencia(valorLocal || '[]', []);
    const nube = parsearJSONPersistencia(valorNube || '[]', []);
    const porId = new Map();
    const idPorNombre = new Map();

    [...(Array.isArray(local) ? local : []), ...(Array.isArray(nube) ? nube : [])]
        .map(normalizarColeccionVersiculos)
        .filter(Boolean)
        .forEach(coleccion => {
            const nombreClave = normalizarNombreColeccionVersiculos(coleccion.nombre).toLocaleLowerCase('es');
            const idExistente = porId.has(coleccion.id) ? coleccion.id : idPorNombre.get(nombreClave);

            if (idExistente && porId.has(idExistente)) {
                const fusionada = fusionarColeccionPersistenciaExistente(porId.get(idExistente), coleccion);
                porId.set(idExistente, fusionada);
                idPorNombre.set(normalizarNombreColeccionVersiculos(fusionada.nombre).toLocaleLowerCase('es'), idExistente);
            } else {
                porId.set(coleccion.id, coleccion);
                idPorNombre.set(nombreClave, coleccion.id);
            }
        });

    return [...porId.values()].sort((a, b) => compararFechasPersistencia(b.updatedAt, a.updatedAt) || a.nombre.localeCompare(b.nombre, 'es'));
}

function fusionarValorPersistenciaLumina(clave, valorLocal, valorNube) {
    switch (clave) {
        case CLAVE_LEIDOS:
        case CLAVE_FAVORITOS:
            return serializarPersistenciaFusionada(fusionarArraysUnicosPersistencia(valorLocal, valorNube));
        case CLAVE_NOTAS:
            return serializarPersistenciaFusionada(fusionarNotasPersistencia(valorLocal, valorNube));
        case CLAVE_COLECCIONES_VERSICULOS:
            return serializarPersistenciaFusionada(fusionarColeccionesPersistencia(valorLocal, valorNube));
        case CLAVE_LECTIO_DIVINA:
            return serializarPersistenciaFusionada(fusionarLectioPersistencia(valorLocal, valorNube));
        case CLAVE_BUSQUEDAS_RECIENTES:
            return serializarPersistenciaFusionada(fusionarBusquedasPersistencia(valorLocal, valorNube));
        case CLAVE_EVENTO_BIBLIA_COMPLETA:
            return String(valorLocal === 'true' || valorNube === 'true');
        case CLAVE_CONTADOR_CELEBRACION_BIBLIA:
            return String(Math.max(parseInt(valorLocal || '0', 10) || 0, parseInt(valorNube || '0', 10) || 0));
        default:
            return null;
    }
}

function clavePersistenciaUsaFusion(clave) {
    return [
        CLAVE_LEIDOS,
        CLAVE_FAVORITOS,
        CLAVE_NOTAS,
        CLAVE_COLECCIONES_VERSICULOS,
        CLAVE_LECTIO_DIVINA,
        CLAVE_BUSQUEDAS_RECIENTES,
        CLAVE_EVENTO_BIBLIA_COMPLETA,
        CLAVE_CONTADOR_CELEBRACION_BIBLIA
    ].includes(clave);
}

function fusionarEntradasPersistenciaLumina(local, nube) {
    if (!local || !nube) return local || nube || null;

    if (clavePersistenciaUsaFusion(local.key)) {
        if (local.deleted && nube.deleted) {
            return crearEntradaFusionada(local.key, null, maxFechaPersistencia(local.updatedAtLocal, nube.updatedAtLocal));
        }

        if (local.deleted) {
            return { ...nube };
        }

        if (nube.deleted) {
            return { ...local };
        }

        const valorFusionado = fusionarValorPersistenciaLumina(local.key, local.value, nube.value);
        if (valorFusionado !== null) {
            const cambio = valorFusionado !== String(local.value ?? '') || valorFusionado !== String(nube.value ?? '');
            return crearEntradaFusionada(
                local.key,
                valorFusionado,
                cambio ? obtenerMarcaTiempoPersistencia() : maxFechaPersistencia(local.updatedAtLocal, nube.updatedAtLocal)
            );
        }
    }

    return compararFechasPersistencia(nube.updatedAtLocal, local.updatedAtLocal) >= 0 ? { ...nube } : { ...local };
}

async function guardarEntradaPersistenciaDesdeNube(entrada) {
    const valorNormalizado = normalizarValorPersistencia(entrada.value);
    persistenciaLuminaCache.set(entrada.key, valorNormalizado);
    actualizarMetaPersistencia(entrada.key, entrada.updatedAtLocal);
    limpiarEntradasLocalStorageLumina([entrada.key]);

    if (persistenciaLuminaUsaFallbackLocal) {
        try {
            localStorage.setItem(entrada.key, valorNormalizado);
        } catch (error) {
            console.error(`Lumina no pudo guardar ${entrada.key} desde la nube en localStorage:`, error);
        }
        return;
    }

    await guardarEntradasPersistenciaLuminaDB([{
        key: entrada.key,
        value: valorNormalizado,
        updatedAt: entrada.updatedAtLocal
    }]);
}

async function eliminarEntradaPersistenciaDesdeNube(entrada) {
    persistenciaLuminaCache.delete(entrada.key);
    actualizarMetaPersistencia(entrada.key, entrada.updatedAtLocal);
    limpiarEntradasLocalStorageLumina([entrada.key]);

    if (persistenciaLuminaUsaFallbackLocal) {
        try {
            localStorage.removeItem(entrada.key);
        } catch (error) {
            console.error(`Lumina no pudo eliminar ${entrada.key} desde la nube en localStorage:`, error);
        }
        return;
    }

    await eliminarClavesPersistenciaLuminaDB([entrada.key]);
}

function recargarEstadoDesdePersistenciaLumina() {
    cargarFavoritos();
    cargarColeccionesVersiculos();
    cargarLectioDivinaRegistros();
    cargarBusquedasRecientes();
    cargarNotasPersonales();
    cargarLeidos();
    cargarVersiculoInicioGuardado();

    const darkMode = leerPersistencia(CLAVE_DARKMODE) === 'true';
    document.body.classList.toggle('dark', darkMode);
    const toggleDark = document.getElementById('toggle-darkmode');
    if (toggleDark) {
        toggleDark.innerHTML = darkMode ? '<i class="fas fa-sun text-lg"></i>' : '<i class="fas fa-moon text-lg"></i>';
    }

    concordanciaActiva = leerPersistencia(CLAVE_CONCORDANCIA) === 'true';
    const toggleConcordancia = document.getElementById('toggle-concordancia');
    if (toggleConcordancia) toggleConcordancia.checked = concordanciaActiva;

    aplicarModoDesierto(leerPersistencia(CLAVE_MODO_DESIERTO) === 'true', { guardar: false });
    aplicarTextoCorrido(leerPersistencia(CLAVE_TEXTO_CORRIDO) === 'true', { guardar: false });
    actualizarTabsPanelGuardados();
    inicializarIndice();
    if (libroActual && capituloActual) actualizarBotonesLeidoVistaLectura();
    actualizarProgresoLibroVista();
    actualizarProgresoTestamentosVista();
    actualizarProgresoBibliaVista();
}

function encolarCambioNubeLumina(entrada) {
    if (aplicandoDatosNubeLumina || !usuarioFirebaseLumina || !firebaseLumina?.guardarEntradasLumina) return;

    cambiosPendientesNubeLumina.set(entrada.key, {
        ...entrada,
        deviceId: dispositivoNubeLuminaId
    });
    actualizarEstadoNubeLumina(ESTADO_NUBE_LUMINA.pendiente);
    programarSubidaNubeLumina();
}

function programarSubidaNubeLumina(delay = 1200) {
    clearTimeout(temporizadorSincronizacionNubeLumina);
    temporizadorSincronizacionNubeLumina = setTimeout(() => {
        subirCambiosPendientesNubeLumina();
    }, delay);
}

async function subirCambiosPendientesNubeLumina() {
    if (!usuarioFirebaseLumina || !firebaseLumina?.guardarEntradasLumina || cambiosPendientesNubeLumina.size === 0) return;

    const uidSubida = usuarioFirebaseLumina.uid;
    const entradas = [...cambiosPendientesNubeLumina.values()];
    cambiosPendientesNubeLumina.clear();

    try {
        await esperarOperacionNubeLumina(
            firebaseLumina.guardarEntradasLumina(uidSubida, entradas),
            'La subida de cambios a la nube tardó demasiado',
            TIMEOUT_ESCRITURA_NUBE_LUMINA
        );
        if (usuarioFirebaseLumina?.uid !== uidSubida) return;
        if (!sincronizacionNubeLuminaEnCurso) {
            actualizarEstadoNubeLumina(ESTADO_NUBE_LUMINA.sincronizado);
        }
    } catch (error) {
        console.error('No se pudieron subir cambios a la nube:', error);
        entradas.forEach(entrada => cambiosPendientesNubeLumina.set(entrada.key, entrada));
        actualizarEstadoNubeLumina(obtenerMensajeErrorNubeLumina(error));
        programarSubidaNubeLumina(8000);
    }
}

async function sincronizarLuminaConNube({ manual = false } = {}) {
    if (!usuarioFirebaseLumina || !firebaseLumina?.cargarEntradasLumina || !firebaseLumina?.guardarEntradasLumina || sincronizacionNubeLuminaEnCurso) {
        return;
    }

    sincronizacionNubeLuminaEnCurso = true;
    aplicandoDatosNubeLumina = true;
    actualizarEstadoNubeLumina(ESTADO_NUBE_LUMINA.sincronizando);

    try {
        const uidSincronizacion = usuarioFirebaseLumina.uid;
        const entradasNubeRaw = await esperarOperacionNubeLumina(
            firebaseLumina.cargarEntradasLumina(uidSincronizacion),
            'La lectura de la nube tardó demasiado',
            TIMEOUT_LECTURA_NUBE_LUMINA
        );
        if (usuarioFirebaseLumina?.uid !== uidSincronizacion) return;
        const entradasNube = new Map();
        entradasNubeRaw.map(normalizarEntradaNubeLumina).filter(Boolean).forEach(entrada => {
            entradasNube.set(entrada.key, entrada);
        });

        const subidas = [];
        const clavesVisitadas = new Set();

        for (const entradaNube of entradasNube.values()) {
            const entradaLocal = obtenerEntradaLocalNubeLumina(entradaNube.key);
            const entradaFusionada = fusionarEntradasPersistenciaLumina(entradaLocal, entradaNube);
            clavesVisitadas.add(entradaNube.key);

            if (!entradasNubeEquivalentes(entradaFusionada, entradaLocal)) {
                if (entradaFusionada.deleted) {
                    await eliminarEntradaPersistenciaDesdeNube(entradaFusionada);
                } else {
                    await guardarEntradaPersistenciaDesdeNube(entradaFusionada);
                }
            }

            if (!entradasNubeEquivalentes(entradaFusionada, entradaNube)) {
                subidas.push({
                    ...entradaFusionada,
                    deviceId: dispositivoNubeLuminaId
                });
            }
        }

        obtenerEntradasPersistenciaParaNube().forEach(entradaLocal => {
            if (clavesVisitadas.has(entradaLocal.key)) return;
            subidas.push({ ...entradaLocal, deviceId: dispositivoNubeLuminaId });
        });

        if (subidas.length > 0) {
            await esperarOperacionNubeLumina(
                firebaseLumina.guardarEntradasLumina(uidSincronizacion, subidas),
                'La escritura en la nube tardó demasiado',
                TIMEOUT_ESCRITURA_NUBE_LUMINA
            );
            if (usuarioFirebaseLumina?.uid !== uidSincronizacion) return;
        }

        aplicandoDatosNubeLumina = false;
        recargarEstadoDesdePersistenciaLumina();
        await subirCambiosPendientesNubeLumina();
        actualizarEstadoNubeLumina(ESTADO_NUBE_LUMINA.sincronizado);
        if (manual) lanzarToast('Lumina sincronizada con la nube');
    } catch (error) {
        console.error('No se pudo sincronizar Lumina con la nube:', error);
        const mensaje = obtenerMensajeErrorNubeLumina(error);
        actualizarEstadoNubeLumina(mensaje);
        if (manual) lanzarToast(mensaje);
    } finally {
        aplicandoDatosNubeLumina = false;
        sincronizacionNubeLuminaEnCurso = false;
        actualizarUINubeLumina();
    }
}

function sincronizarLuminaConNubeManual() {
    return sincronizarLuminaConNube({ manual: true });
}

window.addEventListener('lumina:firebase-ready', event => {
    registrarFirebaseLumina(event.detail);
});

let registroServiceWorkerLumina = null;
let hayNuevaVersionLumina = false;
let recargaPendientePorActualizacion = false;
const RECURSOS_OFFLINE_ESENCIALES = [
    './index.html',
    './style.css',
    './script.js',
    './firebase-config.js',
    './lumina.css',
    './Biblia_Catolica_Completa.json',
    './Catena_Aurea_Completa.json',
    './agustin_salmos.json'
];

function marcarNuevaVersionLuminaDisponible(disponible) {
    hayNuevaVersionLumina = disponible;
    actualizarAvisoNuevaVersionLumina();
}

function actualizarAvisoNuevaVersionLumina(actualizando = false) {
    const aviso = document.getElementById('aviso-nueva-version-lumina');
    if (!aviso) return;

    const visible = hayNuevaVersionLumina || actualizando;
    const titulo = aviso.querySelector('[data-aviso-version-titulo]');
    const detalle = aviso.querySelector('[data-aviso-version-detalle]');

    aviso.classList.toggle('hidden', !visible);
    aviso.disabled = actualizando;
    aviso.dataset.updateState = actualizando ? 'updating' : 'ready';

    if (titulo) {
        titulo.textContent = actualizando ? 'Actualizando Lumina...' : 'Nueva versión disponible';
    }

    if (detalle) {
        detalle.textContent = actualizando
            ? 'Preparando la versión más reciente.'
            : 'Tocá para actualizar Lumina.';
    }
}

async function actualizarLuminaDesdeAviso() {
    if (!hayNuevaVersionLumina) return;

    actualizarAvisoNuevaVersionLumina(true);

    try {
        await limpiarCacheLumina();
    } finally {
        if (hayNuevaVersionLumina) {
            actualizarAvisoNuevaVersionLumina(false);
        }
    }
}

async function estaRecursoDisponibleEnCache(ruta) {
    if (!('caches' in window)) return false;

    const candidatos = [
        ruta,
        new URL(ruta, window.location.href).href
    ];

    for (const candidato of candidatos) {
        const respuesta = await caches.match(candidato, { ignoreSearch: true });
        if (respuesta) return true;
    }

    return false;
}

async function offlineEsencialDisponible() {
    if (!('caches' in window)) return false;

    for (const recurso of RECURSOS_OFFLINE_ESENCIALES) {
        if (!(await estaRecursoDisponibleEnCache(recurso))) {
            return false;
        }
    }

    return true;
}

function obtenerEstadoIndicadorConexion(listoParaOffline) {
    if (navigator.onLine) {
        if (listoParaOffline) {
            return {
                texto: "Modo sin conexión disponible (en línea)",
                tooltip: "Lumina ya guardó en este dispositivo la app y los datos esenciales para usarla sin internet.",
                toast: "En línea. El modo sin conexión ya está listo en este dispositivo.",
                estado: "online-ready"
            };
        }

        return {
            texto: "Preparando modo sin conexión...",
            tooltip: "Lumina sigue guardando los archivos esenciales para poder abrirse sin internet en este dispositivo.",
            toast: "En línea. Lumina todavía está preparando el modo sin conexión.",
            estado: "online-syncing"
        };
    }

    if (listoParaOffline) {
        return {
            texto: "Sin conexión: usando contenido cacheado",
            tooltip: "Sin conexión. Lumina está usando el contenido esencial guardado en este dispositivo.",
            toast: "Sin conexión. Estás usando la versión guardada en este dispositivo.",
            estado: "offline-ready"
        };
    }

    return {
        texto: "Sin conexión: falta contenido guardado",
        tooltip: "Sin conexión, pero este dispositivo todavía no guardó todos los archivos esenciales para abrir Lumina offline.",
        toast: "Sin conexión. A este dispositivo todavía le faltan archivos esenciales para abrir Lumina offline.",
        estado: "offline-missing"
    };
}

async function actualizarIndicadorConexion() {
    const badge = document.getElementById("estado-offline");
    if (!badge) return;

    badge.classList.remove("hidden");
    badge.classList.add("inline-flex");

    const textoEl = badge.querySelector(".header-offline-text");
    const iconoEl = badge.querySelector(".header-offline-icon i");
    if (!textoEl) return;

    const listoParaOffline = await offlineEsencialDisponible();
    const detalle = obtenerEstadoIndicadorConexion(listoParaOffline);

    textoEl.textContent = detalle.texto;
    badge.dataset.offlineState = detalle.estado;
    badge.dataset.toastMessage = detalle.toast;
    badge.setAttribute("title", detalle.tooltip);
    badge.setAttribute("aria-label", detalle.toast);

    if (iconoEl) {
        iconoEl.className = "fas fa-wifi";
    }
}

async function mostrarEstadoOfflineDisponible() {
    await actualizarIndicadorConexion();
}

async function mostrarDetalleEstadoConexion() {
    await actualizarIndicadorConexion();

    const badge = document.getElementById("estado-offline");
    if (!badge) return;

    const mensaje = badge.dataset.toastMessage || badge.getAttribute("title");
    if (mensaje) {
        lanzarToast(mensaje);
    }
}

async function registrarServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        console.warn('Service Worker no soportado en este navegador.');
        await actualizarIndicadorConexion();
        return false;
    }

    try {
        const registro = await navigator.serviceWorker.register('./sw.js');
        registroServiceWorkerLumina = registro;
        console.log('Service Worker registrado con scope:', registro.scope);
        await navigator.serviceWorker.ready;

        if (registro.waiting) {
            marcarNuevaVersionLuminaDisponible(true);
        }

        registro.addEventListener('updatefound', () => {
            const nuevoWorker = registro.installing;
            if (!nuevoWorker) return;

            nuevoWorker.addEventListener('statechange', () => {
                if (nuevoWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    marcarNuevaVersionLuminaDisponible(true);

                    if (recargaPendientePorActualizacion) {
                        nuevoWorker.postMessage({ type: 'SKIP_WAITING' });
                    }
                }
            });
        });

        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!recargaPendientePorActualizacion) return;
            recargaPendientePorActualizacion = false;
            marcarNuevaVersionLuminaDisponible(false);
            window.location.reload();
        });

        await mostrarEstadoOfflineDisponible();

        window.addEventListener('online', () => {
            console.log('Conexión restaurada.');
            actualizarIndicadorConexion();
        });

        window.addEventListener('offline', () => {
            console.log('Sin conexión. Usando cache.');
            actualizarIndicadorConexion();
        });

        await actualizarIndicadorConexion();

        return true;
    } catch (error) {
        console.error('No se pudo registrar el Service Worker:', error);
        await actualizarIndicadorConexion();
        return false;
    }
}

// --------------------------------------------------------------
// 11. INICIO
// --------------------------------------------------------------
window.onload = async () => {
    await inicializarPersistenciaLumina();
    inicializarFirebaseLumina();
    document.getElementById('aviso-nueva-version-lumina')?.addEventListener('click', () => actualizarLuminaDesdeAviso());
    actualizarAvisoNuevaVersionLumina();

    // Registramos Service Worker para modo sin conexión
    await registrarServiceWorker();

    cargarFavoritos();
    cargarColeccionesVersiculos();
    cargarLectioDivinaRegistros();
    cargarBusquedasRecientes();
    cargarNotasPersonales();
    cargarLeidos();
    cargarVersiculoInicioGuardado();
    inicializarIndice();
    poblarSelectoresRapidos();
    mostrarVista('vista-libros');
    actualizarTabsPanelGuardados();

    document.getElementById('contenedor-versiculos').innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin mr-2"></i> Cargando la Palabra y la Tradición...</div>';
    await Promise.all([
        cargarBibliaJSON(),
        cargarComentariosJSON()
    ]);
    await actualizarIndicadorConexion();

    initDarkMode();
    aplicarModoDesierto(leerPersistencia(CLAVE_MODO_DESIERTO) === 'true', { guardar: false });
    aplicarTextoCorrido(leerPersistencia(CLAVE_TEXTO_CORRIDO) === 'true', { guardar: false });
    inicializarLectioDivina();
    actualizarBotonPdfLectioSegunDispositivo();

    const toggle = document.getElementById('toggle-concordancia');
    const saved = leerPersistencia(CLAVE_CONCORDANCIA);
    if (saved === 'true') {
        toggle.checked = true;
        concordanciaActiva = true;
    }
    toggle.addEventListener('change', () => {
        concordanciaActiva = toggle.checked;
        escribirPersistencia(CLAVE_CONCORDANCIA, String(concordanciaActiva));
        refrescarConcordanciaVistaActual();
    });

    document.getElementById('btn-favoritos').addEventListener('click', () => abrirPanelGuardados());
    document.getElementById('btn-nube-lumina')?.addEventListener('click', () => abrirAjustesNubeLumina());
    document.getElementById('estado-offline')?.addEventListener('click', () => mostrarDetalleEstadoConexion());
    document.getElementById('tab-guardados-favoritos')?.addEventListener('click', () => mostrarPanelFavoritos());
    document.getElementById('tab-guardados-colecciones')?.addEventListener('click', () => mostrarPanelColecciones(coleccionAbiertaPanelId));
    document.getElementById('btn-crear-coleccion-modal')?.addEventListener('click', () => crearColeccionDesdeModal());
    document.getElementById('input-nueva-coleccion')?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            crearColeccionDesdeModal();
        }
    });
    document.getElementById('selector-lectio-libro')?.addEventListener('change', (event) => {
        const libro = event.target.value;
        const capitulo = obtenerListaCapitulos(libro)[0];
        const versiculos = obtenerVersiculosLeiblesCapitulo(libro, capitulo);
        aplicarSeleccionLectio(libro, capitulo, versiculos[0] || 1, versiculos[Math.min(versiculos.length - 1, 4)] || (versiculos[0] || 1));
    });
    document.getElementById('selector-lectio-capitulo')?.addEventListener('change', (event) => {
        const libro = document.getElementById('selector-lectio-libro')?.value || '';
        const capitulo = Number(event.target.value);
        const versiculos = obtenerVersiculosLeiblesCapitulo(libro, capitulo);
        aplicarSeleccionLectio(libro, capitulo, versiculos[0] || 1, versiculos[Math.min(versiculos.length - 1, 4)] || (versiculos[0] || 1));
    });
    document.getElementById('selector-lectio-desde')?.addEventListener('change', () => {
        const { libro, capitulo, desde, hasta } = obtenerSeleccionLectioActual();
        poblarSelectoresLectioVersiculos(libro, capitulo, desde, hasta);
        actualizarAyudaPasajeLectio();
    });
    document.getElementById('selector-lectio-hasta')?.addEventListener('change', () => actualizarAyudaPasajeLectio());
    document.getElementById('btn-abrir-pasaje-lectio')?.addEventListener('click', () => renderizarPasajeLectioSeleccionado());
    document.getElementById('btn-escuchar-pasaje-lectio')?.addEventListener('click', (event) => escucharPasajeLectio(event.currentTarget));
    document.getElementById('btn-guardar-lectio')?.addEventListener('click', () => guardarLectioActual());
    document.getElementById('btn-compartir-lectio-pdf')?.addEventListener('click', () => exportarLectioComoPDF());
    document.getElementById('btn-nueva-lectio')?.addEventListener('click', () => limpiarHojaLectio(true));
    document.getElementById('btn-lectio-usar-contexto')?.addEventListener('click', () => usarContextoActualEnLectio());
    document.addEventListener('click', () => cerrarMenusAccionesVersiculo());
    document.getElementById('scroll-versiculos')?.addEventListener('scroll', () => cerrarMenusAccionesVersiculo());
    window.addEventListener('resize', () => cerrarMenusAccionesVersiculo());

    const busquedaInput = document.getElementById('busqueda-input');
    const busquedaInputMovil = document.getElementById('busqueda-input-movil');
    const busquedaPanelInput = document.getElementById('busqueda-panel-input');
    const filtroLibroBusquedaSelect = document.getElementById('busqueda-filtro-libro');
    const btnBuscarMovil = document.getElementById('btn-buscar-movil');
    const btnEjecutarBusquedaMovil = document.getElementById('btn-ejecutar-busqueda-movil');
    const btnEjecutarBusquedaPanel = document.getElementById('btn-ejecutar-busqueda-panel');
    const btnLimpiarBusquedaMovil = document.getElementById('btn-limpiar-busqueda-movil');
    const btnLimpiarPanelBusqueda = document.getElementById('btn-limpiar-panel-busqueda');

    poblarSelectorFiltroLibroBusqueda();

    const realizarBusqueda = (terminoPreferido = '') => {
        filtroLibroBusquedaActual = normalizarFiltroLibroBusqueda(filtroLibroBusquedaSelect?.value || filtroLibroBusquedaActual);
        sincronizarSelectorFiltroLibroBusqueda();
        const termino = normalizarTerminoBusqueda(terminoPreferido || obtenerTerminoBusquedaActual());
        mostrarResultadosBusqueda(termino);
    };

    [busquedaInput, busquedaInputMovil, busquedaPanelInput].forEach(input => {
        if (!input) return;

        input.addEventListener('input', (event) => {
            sincronizarInputsBusqueda(event.target.value, event.target);
        });

        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                realizarBusqueda(event.target.value);
            }
        });
    });

    if (btnBuscarMovil) {
        btnBuscarMovil.addEventListener('click', () => mostrarBuscadorMovil());
    }

    if (btnEjecutarBusquedaMovil) {
        btnEjecutarBusquedaMovil.addEventListener('click', () => realizarBusqueda(busquedaInputMovil?.value));
    }

    if (btnEjecutarBusquedaPanel) {
        btnEjecutarBusquedaPanel.addEventListener('click', () => realizarBusqueda(busquedaPanelInput?.value));
    }

    if (filtroLibroBusquedaSelect) {
        filtroLibroBusquedaSelect.addEventListener('change', (event) => {
            filtroLibroBusquedaActual = normalizarFiltroLibroBusqueda(event.target.value);
            sincronizarSelectorFiltroLibroBusqueda();
            realizarBusqueda();
        });
    }

    if (btnLimpiarBusquedaMovil) {
        btnLimpiarBusquedaMovil.addEventListener('click', () => {
            limpiarBusqueda();
            if (busquedaInputMovil) busquedaInputMovil.focus();
        });
    }

    if (btnLimpiarPanelBusqueda) {
        btnLimpiarPanelBusqueda.addEventListener('click', () => {
            limpiarBusqueda();
            if (busquedaPanelInput) busquedaPanelInput.focus();
        });
    }

    const contenedorBusqueda = document.getElementById('contenido-busqueda');
    if (contenedorBusqueda) {
        actualizarVistaBusquedaSinResultados('', filtroLibroBusquedaActual);
    }
    const contadorBusqueda = document.getElementById('contador-busqueda');
    if (contadorBusqueda) {
        contadorBusqueda.textContent = obtenerTextoContadorBusqueda('', 0, filtroLibroBusquedaActual);
    }
    actualizarEstadoControlesBusqueda();

    const observer = setInterval(() => {
        if (datosBibliaCargados && indiceBusqueda.length === 0) {
            construirIndiceBusqueda();
            clearInterval(observer);
        }
    }, 500);

    verificarBienvenida();
    intentarMostrarVersiculoInicio();
    inicializarTiradorPanelBusqueda();
    inicializarGestosPanelesLaterales();
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            versiculoInicioPendienteTrasBienvenida = false;
            cerrarModalBienvenida(false);
            cerrarModalVersiculoInicio();
            cerrarModalColecciones();
            cerrarModalRespaldoLumina();
            cerrarModalCompartirVersiculo();
            cerrarMenusAccionesVersiculo();
            cerrarPanelLumina();
            cerrarPanelActivoLateral();
        }
    });


    // Listener para voces en m?viles (pueden cargarse de forma as?ncrona)
    if (navegadorSoportaLectura()) {
        window.speechSynthesis.getVoices();
        sincronizarVozEspanol();
        window.speechSynthesis.onvoiceschanged = () => {
            sincronizarVozEspanol();
        };
    }
};

// 1. Abre el modal y genera el QR
function abrirModalCompartir() {
    const modal = document.getElementById('modal-compartir');
    const contenedorQR = document.getElementById('contenedor-qr');

    // Mostramos el modal
    modal.classList.remove('hidden');

    // Solo generamos el QR si está vacío (para no dibujarlo 20 veces)
    if (contenedorQR.innerHTML === "") {
        new QRCode(contenedorQR, {
            text: "https://nachomartinez1996.github.io/Lumina/",
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H // Alta corrección para que se lea fácil
        });
    }
}

// 2. Cierra el modal
function cerrarModalCompartir() {
    document.getElementById('modal-compartir').classList.add('hidden');
}

// 3. Tu función original, intacta (llamada desde el botón del modal)
function compartirEnlaceLumina() {
    if (navigator.share) {
        navigator.share({
            title: 'Lumina - La Tradición Iluminando la Palabra',
            text: 'Estoy leyendo la Palabra con los comentarios de los Padres de la Iglesia. ¡Te invito a descubrir Lumina!',
            url: 'https://nachomartinez1996.github.io/Lumina/'
        })
            .then(() => console.log('Gracias por compartir la Luz'))
            .catch((error) => console.log('Error al compartir', error));
    } else {
        navigator.clipboard.writeText('https://nachomartinez1996.github.io/Lumina/');
        alert('¡Enlace copiado! Ya podés pegarlo y compartir la Luz.');
    }
}
// ========== FUNCIONES PARA RESALTAR VERSÍCULOS EN REPRODUCCIÓN ==========
function resaltarVersiculo(libro, capitulo, versiculo) {
    if (
        versiculoActualEnLectura &&
        versiculoActualEnLectura.libro === libro &&
        versiculoActualEnLectura.capitulo === capitulo &&
        versiculoActualEnLectura.versiculo === versiculo
    ) {
        return;
    }

    // Limpiar resaltado anterior
    limpiarResaltadoVersiculo();

    // Crear ID para la tarjeta del versículo
    const verseId = `verse_${libro}_${capitulo}_${versiculo}`;
    const verseCard = document.getElementById(verseId);

    if (verseCard) {
        verseCard.classList.add('verse-card-leyendo');
        versiculoActualEnLectura = { libro, capitulo, versiculo };

        asegurarVersiculoVisible(verseCard);
    } else {
        console.warn(`Tarjeta de versículo no encontrada: ${verseId}`);
    }
}

function limpiarResaltadoVersiculo() {
    if (versiculoActualEnLectura) {
        const { libro, capitulo, versiculo } = versiculoActualEnLectura;
        const verseActual = document.getElementById(`verse_${libro}_${capitulo}_${versiculo}`);
        if (verseActual) {
            verseActual.classList.remove('verse-card-leyendo');
        }
    } else {
        document.querySelectorAll('.verse-card-leyendo').forEach(card => {
            card.classList.remove('verse-card-leyendo');
        });
    }
    versiculoActualEnLectura = null;
}

function asegurarVersiculoVisible(verseCard) {
    const contenedor = document.getElementById('scroll-versiculos');
    if (!contenedor || !verseCard) return;

    const margen = 24;
    const rectVersiculo = verseCard.getBoundingClientRect();
    const rectContenedor = contenedor.getBoundingClientRect();
    const estaFueraPorArriba = rectVersiculo.top < rectContenedor.top + margen;
    const estaFueraPorAbajo = rectVersiculo.bottom > rectContenedor.bottom - margen;

    if (estaFueraPorArriba || estaFueraPorAbajo) {
        verseCard.scrollIntoView({ behavior: 'auto', block: 'nearest' });
    }
}

function construirListaVersiculosCapitulo(libro, capitulo) {
    const versiculosObj = bibleContent[libro]?.[capitulo] || {};
    const numerosVersiculos = obtenerVersiculosNarrablesCapitulo(libro, capitulo);

    listaVersiculosEnCapitulo = numerosVersiculos.map(v => ({
        libro,
        capitulo,
        versiculo: v,
        texto: versiculosObj[v]
    }));

    return listaVersiculosEnCapitulo;
}

// Función para construir lista de todos los versículos de un libro
function construirListaVersiculosLibro(libroNombre) {
    const libroContenido = bibleContent[libroNombre];
    if (!libroContenido) return [];

    const listaCompleta = [];
    const capitulosSorted = Object.keys(libroContenido).map(Number).sort((a, b) => a - b);

    capitulosSorted.forEach(capitulo => {
        const versiculosObj = libroContenido[capitulo];
        const numerosVersiculos = obtenerVersiculosNarrablesCapitulo(libroNombre, capitulo);

        numerosVersiculos.forEach(v => {
            listaCompleta.push({
                libro: libroNombre,
                capitulo,
                versiculo: v,
                texto: versiculosObj[v]
            });
        });
    });

    return listaCompleta;
}

function construirSecuenciaLecturaLibro(libroNombre) {
    const libroContenido = bibleContent[libroNombre];
    if (!libroContenido) return [];

    const secuencia = [];
    const capitulosSorted = Object.keys(libroContenido).map(Number).sort((a, b) => a - b);

    capitulosSorted.forEach(capitulo => {
        const versiculos = construirListaVersiculosCapitulo(libroNombre, capitulo);
        if (versiculos.length === 0) return;

        secuencia.push({ texto: `Capítulo ${capitulo}.` });
        versiculos.forEach(versiculo => secuencia.push(versiculo));
    });

    return secuencia;
}

function refrescarEstadoLecturaTrasCambio(libro) {
    actualizarBotonesLeidoLibros();
    actualizarBotonesLeidoVistaLectura();
    actualizarProgresoCapituloVista();
    actualizarProgresoLibroVista();
    actualizarProgresoTestamentosVista();
    actualizarProgresoBibliaVista();
    actualizarBotonesReproduccionListas();

    if (estaVistaVisible('vista-capitulos') && libroActual === libro) {
        abrirCapitulos(libro, obtenerCantidadCapitulos(libro));
    }
}

function toggleLeidoVersiculo(libro, capitulo, versiculo) {
    if (!esVersiculoLeible(versiculo)) {
        lanzarToast('Esta entrada no cuenta como versículo leído');
        return;
    }

    const libroCompletoAntes = estaLibroLeido(libro);
    const clave = claveLeidoVersiculo(libro, capitulo, versiculo);
    const marcado = !leidos.has(clave);

    if (marcado) leidos.add(clave);
    else leidos.delete(clave);

    guardarLeidos();
    refrescarEstadoLecturaTrasCambio(libro);
    actualizarBotonLeido(`read_${libro}_${capitulo}_${versiculo}`, marcado, 'Marcar como no leído', 'Marcar como leído');
    lanzarToast(marcado ? 'Versículo marcado como leído' : 'Versículo marcado como no leído');
    verificarCelebracionLibroCompleto(libro, libroCompletoAntes);
}

function toggleLeidoCapitulo(libro, capitulo) {
    const libroCompletoAntes = estaLibroLeido(libro);
    const marcado = !estaCapituloLeido(libro, capitulo);

    marcarCapituloLeido(libro, capitulo, marcado);
    guardarLeidos();
    refrescarEstadoLecturaTrasCambio(libro);
    lanzarToast(marcado ? 'Capítulo marcado como leído' : 'Capítulo marcado como no leído');
    verificarCelebracionLibroCompleto(libro, libroCompletoAntes);
}

function toggleLeidoLibro(libro) {
    const libroCompletoAntes = estaLibroLeido(libro);
    const marcado = !libroCompletoAntes;

    marcarLibroLeido(libro, marcado);
    guardarLeidos();
    refrescarEstadoLecturaTrasCambio(libro);

    if (!estaVistaVisible('vista-capitulos') || libroActual !== libro) {
        inicializarIndice();
    }

    lanzarToast(marcado ? 'Libro marcado como leído' : 'Libro marcado como no leído');
    verificarCelebracionLibroCompleto(libro, libroCompletoAntes);
}

function obtenerResumenCategoriaRespaldo(categoria, mapa, categoriasExplicitas = []) {
    const clavesPresentes = categoria.claves.filter(clave => mapa.has(clave));
    const categoriaExplicita = Array.isArray(categoriasExplicitas) && categoriasExplicitas.includes(categoria.id);

    if (clavesPresentes.length === 0) {
        return categoriaExplicita
            ? 'Esta categoría viene vacía en este respaldo.'
            : 'Sin datos guardados por ahora.';
    }

    try {
        switch (categoria.id) {
            case 'progreso': {
                const items = JSON.parse(mapa.get(CLAVE_LEIDOS) || '[]');
                return `${Array.isArray(items) ? items.length : 0} marca${Array.isArray(items) && items.length === 1 ? '' : 's'} de lectura.`;
            }
            case 'notas': {
                const notas = JSON.parse(mapa.get(CLAVE_NOTAS) || '{}');
                const total = Object.values(notas).reduce((acumulado, item) => acumulado + (Array.isArray(item) ? item.length : 0), 0);
                return `${total} nota${total === 1 ? '' : 's'} personal${total === 1 ? '' : 'es'}.`;
            }
            case 'favoritos': {
                const items = JSON.parse(mapa.get(CLAVE_FAVORITOS) || '[]');
                return `${Array.isArray(items) ? items.length : 0} favorito${Array.isArray(items) && items.length === 1 ? '' : 's'}.`;
            }
            case 'colecciones': {
                const items = JSON.parse(mapa.get(CLAVE_COLECCIONES_VERSICULOS) || '[]');
                return `${Array.isArray(items) ? items.length : 0} colección${Array.isArray(items) && items.length === 1 ? '' : 'es'} temática${Array.isArray(items) && items.length === 1 ? '' : 's'}.`;
            }
            case 'lectio': {
                const items = JSON.parse(mapa.get(CLAVE_LECTIO_DIVINA) || '[]');
                return `${Array.isArray(items) ? items.length : 0} Lectio${Array.isArray(items) && items.length === 1 ? '' : 's'} guardada${Array.isArray(items) && items.length === 1 ? '' : 's'}.`;
            }
            case 'busquedas': {
                const items = JSON.parse(mapa.get(CLAVE_BUSQUEDAS_RECIENTES) || '[]');
                return `${Array.isArray(items) ? items.length : 0} búsqueda${Array.isArray(items) && items.length === 1 ? '' : 's'} reciente${Array.isArray(items) && items.length === 1 ? '' : 's'}.`;
            }
            case 'preferencias':
                return `${clavesPresentes.length} ajuste${clavesPresentes.length === 1 ? '' : 's'} personal${clavesPresentes.length === 1 ? '' : 'es'}.`;
            default:
                return categoria.descripcion;
        }
    } catch (_) {
        return categoria.descripcion;
    }
}

function obtenerDatosBackupLumina(categoriasSeleccionadas) {
    const mapaActual = obtenerMapaPersistenciaLuminaActual();
    const clavesSeleccionadas = new Set(obtenerClavesCategoriasRespaldo(categoriasSeleccionadas));
    const data = {};

    mapaActual.forEach((valor, clave) => {
        if (clavesSeleccionadas.has(clave)) {
            data[clave] = valor;
        }
    });

    return {
        app: 'Lumina',
        format: 'lumina-backup',
        version: VERSION_RESPALDO_LUMINA,
        exportedAt: new Date().toISOString(),
        storage: persistenciaLuminaUsaFallbackLocal ? 'localStorage-fallback' : 'indexeddb',
        categories: categoriasSeleccionadas,
        data
    };
}

function extraerDatosRespaldoLumina(payload) {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
        throw new Error('Formato inválido');
    }

    const esFormatoNuevo = payload.format === 'lumina-backup' || payload.app === 'Lumina';
    const data = esFormatoNuevo ? payload.data : payload;
    const categoriasExplicitas = esFormatoNuevo && Array.isArray(payload.categories)
        ? payload.categories.filter(id => obtenerDefinicionCategoriaRespaldo(id))
        : [];

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Sin datos importables');
    }

    const mapa = new Map();
    Object.entries(data).forEach(([clave, valor]) => {
        if (!esClaveLuminaPersistible(clave) || valor === null || typeof valor === 'undefined') return;
        mapa.set(clave, normalizarValorPersistencia(valor));
    });

    const categoriasDisponibles = obtenerCategoriasRespaldoPresentesEnMapa(mapa, categoriasExplicitas);
    if (categoriasDisponibles.length === 0) {
        throw new Error('Sin categorías válidas');
    }

    return {
        mapa,
        categoriasDisponibles,
        categoriasExplicitas,
        nombreApp: esFormatoNuevo ? String(payload.app || 'Lumina') : 'Lumina'
    };
}

function descargarBackupLumina(jsonBackup, nombreArchivo = null) {
    const blob = new Blob([jsonBackup], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    const fecha = new Date().toISOString().slice(0, 10);

    enlace.href = url;
    enlace.download = nombreArchivo || `lumina_backup_${fecha}.json`;
    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function actualizarEstadoAccionModalRespaldoLumina() {
    const botonPrincipal = document.getElementById('btn-confirmar-respaldo-lumina');
    const botonTodo = document.getElementById('btn-respaldo-marcar-todo');
    const botonNada = document.getElementById('btn-respaldo-limpiar');
    const botonFusionar = document.getElementById('btn-importacion-fusionar-lumina');
    const botonReemplazar = document.getElementById('btn-importacion-reemplazar-lumina');
    if (!botonPrincipal || !contextoModalRespaldoLumina) return;

    const cantidadSeleccionadas = contextoModalRespaldoLumina.categoriasSeleccionadas.size;
    const deshabilitado = accionRespaldoLuminaEnCurso || cantidadSeleccionadas === 0;

    botonPrincipal.disabled = deshabilitado;
    botonPrincipal.classList.toggle('opacity-60', deshabilitado);
    botonPrincipal.classList.toggle('cursor-not-allowed', deshabilitado);

    [botonTodo, botonNada, botonFusionar, botonReemplazar].forEach(boton => {
        if (!boton) return;
        boton.disabled = accionRespaldoLuminaEnCurso;
        boton.classList.toggle('opacity-60', accionRespaldoLuminaEnCurso);
    });
}

function renderizarModalRespaldoLumina() {
    const modal = document.getElementById('modal-respaldo-lumina');
    const etiqueta = document.getElementById('respaldo-lumina-etiqueta');
    const titulo = document.getElementById('respaldo-lumina-titulo');
    const subtitulo = document.getElementById('respaldo-lumina-subtitulo');
    const detalle = document.getElementById('respaldo-lumina-detalle');
    const lista = document.getElementById('lista-categorias-respaldo-lumina');
    const botonPrincipal = document.getElementById('btn-confirmar-respaldo-lumina');
    const botonTodo = document.getElementById('btn-respaldo-marcar-todo');
    const botonNada = document.getElementById('btn-respaldo-limpiar');
    const bloqueModoImportacion = document.getElementById('bloque-modo-importacion-respaldo-lumina');
    const botonFusionar = document.getElementById('btn-importacion-fusionar-lumina');
    const botonReemplazar = document.getElementById('btn-importacion-reemplazar-lumina');

    if (!modal || !etiqueta || !titulo || !subtitulo || !detalle || !lista || !botonPrincipal || !contextoModalRespaldoLumina) {
        return;
    }

    const esExportacion = contextoModalRespaldoLumina.modo === 'exportar';
    const estrategiaImportacion = contextoModalRespaldoLumina.estrategiaImportacion === 'reemplazar'
        ? 'reemplazar'
        : 'fusionar';
    const categoriasRender = esExportacion
        ? CATEGORIAS_RESPALDO_LUMINA.map(categoria => categoria.id)
        : contextoModalRespaldoLumina.categoriasDisponibles;

    etiqueta.textContent = esExportacion ? 'Respaldo' : 'Restauración';
    titulo.textContent = esExportacion ? 'Elegí qué querés exportar' : 'Elegí qué querés restaurar';
    subtitulo.textContent = esExportacion
        ? 'Podés guardar solo las partes de Lumina que te importan hoy.'
        : 'Podés fusionar el archivo con este dispositivo o reemplazar las categorías marcadas.';
    detalle.textContent = esExportacion
        ? 'El respaldo nuevo se guarda como archivo JSON estructurado y sigue siendo legible por Lumina.'
        : (estrategiaImportacion === 'reemplazar'
            ? `Archivo cargado: ${contextoModalRespaldoLumina.archivoNombre || 'respaldo externo'}. Reemplazar borra en este dispositivo las categorías marcadas y carga las del archivo.`
            : `Archivo cargado: ${contextoModalRespaldoLumina.archivoNombre || 'respaldo externo'}. Fusionar suma datos compatibles y conserva tus ajustes locales cuando hay conflicto.`);
    botonPrincipal.textContent = esExportacion
        ? 'Exportar selección'
        : (estrategiaImportacion === 'reemplazar' ? 'Reemplazar selección' : 'Fusionar selección');

    if (bloqueModoImportacion) {
        bloqueModoImportacion.classList.toggle('hidden', esExportacion);
    }

    [
        [botonFusionar, 'fusionar'],
        [botonReemplazar, 'reemplazar']
    ].forEach(([boton, estrategia]) => {
        if (!boton) return;
        const activo = estrategiaImportacion === estrategia;
        boton.classList.toggle('respaldo-import-mode-option-active', activo);
        boton.setAttribute('aria-pressed', String(activo));
        boton.onclick = () => cambiarEstrategiaImportacionRespaldoLumina(estrategia);
    });

    lista.innerHTML = '';

    categoriasRender.forEach(id => {
        const categoria = obtenerDefinicionCategoriaRespaldo(id);
        if (!categoria) return;

        const disponible = esExportacion
            ? contextoModalRespaldoLumina.categoriasDisponibles.includes(id)
            : true;
        const seleccionada = contextoModalRespaldoLumina.categoriasSeleccionadas.has(id);

        const item = document.createElement('label');
        item.className = `flex items-start gap-3 rounded-2xl border px-4 py-4 transition ${disponible ? 'border-oro/20 bg-white/80 dark:bg-gray-800/60' : 'border-gray-200/70 bg-gray-100/70 dark:bg-gray-900/40 opacity-70'}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'mt-1 h-4 w-4';
        checkbox.style.accentColor = '#b8860b';
        checkbox.checked = seleccionada;
        checkbox.disabled = !disponible || accionRespaldoLuminaEnCurso;
        checkbox.addEventListener('change', () => {
            if (!contextoModalRespaldoLumina) return;
            if (checkbox.checked) {
                contextoModalRespaldoLumina.categoriasSeleccionadas.add(id);
            } else {
                contextoModalRespaldoLumina.categoriasSeleccionadas.delete(id);
            }
            actualizarEstadoAccionModalRespaldoLumina();
        });

        const copy = document.createElement('div');
        copy.className = 'min-w-0 flex-1';
        copy.innerHTML = `
            <div class="flex flex-wrap items-center gap-2">
                <strong class="text-gray-900 dark:text-gray-100">${escapeHtml(categoria.titulo)}</strong>
                ${!disponible ? '<span class="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Sin datos</span>' : ''}
            </div>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">${escapeHtml(categoria.descripcion)}</p>
            <p class="mt-2 text-xs uppercase tracking-[0.18em] text-oro">${escapeHtml(obtenerResumenCategoriaRespaldo(categoria, contextoModalRespaldoLumina.mapa, contextoModalRespaldoLumina.categoriasExplicitas))}</p>
        `;

        item.appendChild(checkbox);
        item.appendChild(copy);
        lista.appendChild(item);
    });

    botonPrincipal.onclick = () => ejecutarAccionModalRespaldoLumina();
    botonTodo.onclick = () => seleccionarCategoriasRespaldoLumina(true);
    botonNada.onclick = () => seleccionarCategoriasRespaldoLumina(false);

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    actualizarEstadoAccionModalRespaldoLumina();
}

function cerrarModalRespaldoLumina() {
    const modal = document.getElementById('modal-respaldo-lumina');
    if (!modal) return;

    modal.classList.add('hidden');
    modal.classList.remove('flex');
    contextoModalRespaldoLumina = null;
    accionRespaldoLuminaEnCurso = false;
}

function seleccionarCategoriasRespaldoLumina(marcarTodo) {
    if (!contextoModalRespaldoLumina) return;

    const disponibles = contextoModalRespaldoLumina.categoriasDisponibles;
    contextoModalRespaldoLumina.categoriasSeleccionadas = marcarTodo
        ? new Set(disponibles)
        : new Set();

    renderizarModalRespaldoLumina();
}

function cambiarEstrategiaImportacionRespaldoLumina(estrategia) {
    if (!contextoModalRespaldoLumina || contextoModalRespaldoLumina.modo !== 'importar') return;

    contextoModalRespaldoLumina.estrategiaImportacion = estrategia === 'reemplazar'
        ? 'reemplazar'
        : 'fusionar';

    renderizarModalRespaldoLumina();
}

async function ejecutarExportacionRespaldoLumina(categoriasSeleccionadas) {
    const backup = obtenerDatosBackupLumina(categoriasSeleccionadas);
    const jsonBackup = JSON.stringify(backup, null, 2);
    const fecha = new Date().toISOString().slice(0, 10);
    const nombreArchivo = `lumina_backup_${fecha}.json`;

    if (navigator.share) {
        try {
            const archivo = new File([jsonBackup], nombreArchivo, { type: 'application/json' });

            if (navigator.canShare && navigator.canShare({ files: [archivo] })) {
                await navigator.share({
                    title: 'Mi respaldo de Lumina',
                    text: 'Copia de seguridad de mis datos de Lumina.',
                    files: [archivo]
                });
                lanzarToast('Respaldo de Lumina listo para compartir');
                return true;
            }
        } catch (error) {
            if (error && error.name === 'AbortError') {
                return false;
            }
            console.log('Error al compartir respaldo:', error);
        }
    }

    descargarBackupLumina(jsonBackup, nombreArchivo);
    lanzarToast('Respaldo de Lumina descargado');
    return true;
}

async function ejecutarImportacionRespaldoLumina(categoriasSeleccionadas) {
    if (!contextoModalRespaldoLumina) return false;

    const estrategiaImportacion = contextoModalRespaldoLumina.estrategiaImportacion === 'reemplazar'
        ? 'reemplazar'
        : 'fusionar';

    if (estrategiaImportacion === 'reemplazar') {
        await reemplazarPersistenciaPorCategorias(contextoModalRespaldoLumina.mapa, categoriasSeleccionadas);
        lanzarToast('Datos reemplazados. Recargando Lumina...');
    } else {
        await fusionarPersistenciaPorCategorias(contextoModalRespaldoLumina.mapa, categoriasSeleccionadas);
        lanzarToast('Datos fusionados. Recargando Lumina...');
    }

    setTimeout(() => window.location.reload(), 350);
    return true;
}

async function ejecutarAccionModalRespaldoLumina() {
    if (!contextoModalRespaldoLumina) return;

    const categoriasSeleccionadas = Array.from(contextoModalRespaldoLumina.categoriasSeleccionadas);
    if (categoriasSeleccionadas.length === 0) {
        lanzarToast('Elegí al menos una categoría');
        return;
    }

    accionRespaldoLuminaEnCurso = true;
    actualizarEstadoAccionModalRespaldoLumina();

    try {
        const completo = contextoModalRespaldoLumina.modo === 'exportar'
            ? await ejecutarExportacionRespaldoLumina(categoriasSeleccionadas)
            : await ejecutarImportacionRespaldoLumina(categoriasSeleccionadas);

        if (completo) {
            cerrarModalRespaldoLumina();
        }
    } catch (error) {
        console.error('No se pudo completar la operación de respaldo de Lumina:', error);
        lanzarToast(contextoModalRespaldoLumina.modo === 'exportar'
            ? 'No se pudo exportar la selección'
            : 'No se pudo restaurar la selección');
    } finally {
        if (contextoModalRespaldoLumina) {
            accionRespaldoLuminaEnCurso = false;
            actualizarEstadoAccionModalRespaldoLumina();
        }
    }
}

async function exportarDatosLumina() {
    const mapaActual = obtenerMapaPersistenciaLuminaActual();
    const categoriasDisponibles = obtenerCategoriasRespaldoPresentesEnMapa(mapaActual);

    if (categoriasDisponibles.length === 0) {
        lanzarToast('No hay datos de Lumina para exportar todavía');
        return;
    }

    contextoModalRespaldoLumina = {
        modo: 'exportar',
        mapa: mapaActual,
        categoriasDisponibles,
        categoriasExplicitas: [],
        categoriasSeleccionadas: new Set(categoriasDisponibles),
        estrategiaImportacion: 'fusionar',
        archivoNombre: ''
    };

    renderizarModalRespaldoLumina();
}

function abrirSelectorImportacionLumina() {
    const input = document.getElementById('archivoBackup');
    if (!input) return;
    input.value = '';
    input.click();
}

async function limpiarCacheLumina() {
    try {
        if (!('serviceWorker' in navigator)) {
            window.location.reload();
            return;
        }

        const registro = registroServiceWorkerLumina || await navigator.serviceWorker.getRegistration('./');

        if (registro) {
            registroServiceWorkerLumina = registro;
            recargaPendientePorActualizacion = true;

            await registro.update();

            if (registro.waiting) {
                marcarNuevaVersionLuminaDisponible(true);
                registro.waiting.postMessage({ type: 'SKIP_WAITING' });
                lanzarToast('Actualizando Lumina a la versión más reciente...');
                return;
            }

            if (registro.installing) {
                lanzarToast('Buscando la versión más reciente de Lumina...');
                return;
            }
        }

        const cachesLumina = await caches.keys();
        await Promise.all(
            cachesLumina
                .filter(nombre => nombre.startsWith('lumina-'))
                .map(nombre => caches.delete(nombre))
        );

        marcarNuevaVersionLuminaDisponible(false);
        recargaPendientePorActualizacion = false;
        lanzarToast('Caché de Lumina refrescado. Recargando...');
        window.location.reload();
    } catch (error) {
        console.error('No se pudo limpiar/actualizar la caché de Lumina:', error);
        recargaPendientePorActualizacion = false;
        lanzarToast('No se pudo actualizar automáticamente. Recargando la app...');
        window.location.reload();
    }
}

async function importarProgreso(evento) {
    const archivo = evento.target.files?.[0];
    if (!archivo) return;

    try {
        const contenido = await archivo.text();
        const datosRestaurados = JSON.parse(contenido);
        const respaldo = extraerDatosRespaldoLumina(datosRestaurados);

        contextoModalRespaldoLumina = {
            modo: 'importar',
            mapa: respaldo.mapa,
            categoriasDisponibles: respaldo.categoriasDisponibles,
            categoriasExplicitas: respaldo.categoriasExplicitas,
            categoriasSeleccionadas: new Set(respaldo.categoriasDisponibles),
            estrategiaImportacion: 'fusionar',
            archivoNombre: archivo.name || 'respaldo_lumina.json'
        };

        renderizarModalRespaldoLumina();
    } catch (error) {
        console.error('No se pudo leer el respaldo seleccionado:', error);
        alert('Mmm... Parece que el archivo está corrupto o no es un backup válido.');
    } finally {
        const input = document.getElementById('archivoBackup');
        if (input) input.value = '';
    }
}

function abrirConfirmacionResetLumina() {
    const modal = document.getElementById('modal-confirmacion-reset-lumina');
    const btnConfirmar = document.getElementById('btn-confirmar-reset-lumina');
    if (!modal || !btnConfirmar) return;

    modal.classList.remove('hidden');
    btnConfirmar.classList.add('animacion-alerta');

    setTimeout(() => {
        btnConfirmar.classList.remove('animacion-alerta');
    }, 500);

    btnConfirmar.onclick = ejecutarResetLumina;
}

function cerrarModalConfirmacionResetLumina() {
    const modal = document.getElementById('modal-confirmacion-reset-lumina');
    if (!modal) return;
    modal.classList.add('hidden');
}

async function ejecutarResetLumina() {
    cerrarModalConfirmacionResetLumina();

    try {
        await vaciarPersistenciaLuminaCompleta();

        notasPersonales = {};
        favoritos = new Set();
        leidos = new Set();
        coleccionesVersiculos = [];
        ultimaColeccionVersiculosId = null;
        lectioDivinaRegistros = [];
        lectioRegistroActivoId = null;
        busquedasRecientes = [];
        concordanciaActiva = false;
        bibliaCompletaCelebrada = false;
        modoDesiertoActivo = false;
        textoCorridoActivo = false;
        versiculoInicioGuardado = null;
        marcarNuevaVersionLuminaDisponible(false);

        if ('caches' in window) {
            const cachesLumina = await caches.keys();
            await Promise.all(
                cachesLumina
                    .filter(nombre => nombre.startsWith('lumina-'))
                    .map(nombre => caches.delete(nombre))
            );
        }

        lanzarToast('Lumina fue restablecida en este dispositivo');
        setTimeout(() => {
            window.location.reload();
        }, 350);
    } catch (error) {
        console.error('No se pudo restablecer Lumina por completo:', error);
        lanzarToast('No se pudo completar el restablecimiento');
    }
}
