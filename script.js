// 1. CANON BÍBLICO COMPLETO (según la lista del Vaticano)
// =============================================================
const canonBiblico = {
    "Antiguo Testamento": [
        { nombre: "Génesis", caps: 50 },
        { nombre: "Éxodo", caps: 40 },
        { nombre: "Levítico", caps: 27 },
        { nombre: "Números", caps: 36 },
        { nombre: "Deuteronomio", caps: 34 },
        { nombre: "Josué", caps: 24 },
        { nombre: "Jueces", caps: 21 },
        { nombre: "Primer Libro de Samuel", caps: 31 },
        { nombre: "Segundo Libro de Samuel", caps: 24 },
        { nombre: "Primer Libro de los Reyes", caps: 22 },
        { nombre: "Segundo Libro de los Reyes", caps: 25 },
        { nombre: "Isaías", caps: 66 },
        { nombre: "Jeremías", caps: 52 },
        { nombre: "Ezequiel", caps: 48 },
        { nombre: "Oseas", caps: 14 },
        { nombre: "Joel", caps: 4 },
        { nombre: "Amás", caps: 9 },
        { nombre: "Abdías", caps: 1 },
        { nombre: "Jonás", caps: 4 },
        { nombre: "Miqueas", caps: 7 },
        { nombre: "Nahúm", caps: 3 },
        { nombre: "Habacuc", caps: 3 },
        { nombre: "Sofonías", caps: 3 },
        { nombre: "Ageo", caps: 2 },
        { nombre: "Zacarías", caps: 14 },
        { nombre: "Malaquéas", caps: 3 },
        { nombre: "Salmos", caps: 150 },
        { nombre: "Job", caps: 42 },
        { nombre: "Proverbios", caps: 31 },
        { nombre: "Rut", caps: 4 },
        { nombre: "Cantar de los Cantares", caps: 8 },
        { nombre: "Eclesiastés", caps: 12 },
        { nombre: "Lamentaciones", caps: 5 },
        { nombre: "Ester", caps: 10 },
        { nombre: "Daniel", caps: 12 },
        { nombre: "Primer Libro de las Crónicas", caps: 29 },
        { nombre: "Segundo Libro de las Crónicas", caps: 36 },
        { nombre: "Esdras", caps: 10 },
        { nombre: "Nehemías", caps: 13 },
        { nombre: "Ester (Suplementos Griegos)", caps: [1, 3, 4, 5, 8, 10] },
        { nombre: "Judit", caps: 16 },
        { nombre: "Tobías", caps: 14 },
        { nombre: "Primer Libro de los Macabeos", caps: 16 },
        { nombre: "Segundo Libro de los Macabeos", caps: 15 },
        { nombre: "Sabiduría", caps: 19 },
        { nombre: "Eclesiástico", caps: 51 },
        { nombre: "Baruc", caps: 5 },
        { nombre: "Carta de Jeremías", caps: 1 },
        { nombre: "Daniel (Suplementos Griegos)", caps: [3, 13, 14] }
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
            fila.className = 'flex items-stretch gap-2';
            fila.innerHTML = `
                <button type="button" class="btn-libro-principal flex-1 text-left py-2 px-3 rounded text-lg transition-all hover:bg-yellow-50 dark:hover:bg-gray-800 hover:text-oro hover:border-l-4 hover:border-oro bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
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
            <button type="button" class="btn-capitulo-principal flex-1 py-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-oro hover:text-oro transition-all font-sans font-bold text-base flex items-center justify-between px-3 group">
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
    "AMOS": "Amás",
    "ABDIAS": "Abdías",
    "JONAS": "Jonás",
    "MIQUEAS": "Miqueas",
    "NAHUM": "Nahúm",
    "HABACUC": "Habacuc",
    "SOFONIAS": "Sofonías",
    "AGEO": "Ageo",
    "ZACARIAS": "Zacarías",
    "MALAQUIAS": "Malaquéas",
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
    "Amás": { mensaje: "Que fluya el derecho como agua. Un grito por la justicia social y divina.", referencia: "Am 5, 24" },
    "Abdías": { mensaje: "El orgullo derribado y la realeza del Señor restaurada.", referencia: "Ab 1, 21" },
    "Jonás": { mensaje: "La inmensa misericordia de Dios, que abraza incluso a los que consideramos enemigos.", referencia: "Jon 4, 11" },
    "Miqueas": { mensaje: "Has descubierto qué exige el Señor: practicar la justicia y amar la bondad.", referencia: "Mi 6, 8" },
    "Nahúm": { mensaje: "El Señor es un refugio seguro en el día de la angustia.", referencia: "Na 1, 7" },
    "Habacuc": { mensaje: "El justo vivirá por su fidelidad. Has aprendido a esperar en medio de la prueba.", referencia: "Ha 2, 4" },
    "Sofonías": { mensaje: "El Señor se alegrará en ti con cantos de júbilo.", referencia: "So 3, 17" },
    "Ageo": { mensaje: "¡Manos a la obra! Has participado en la reconstrucción de la casa del Señor.", referencia: "Ag 2, 4" },
    "Zacarías": { mensaje: "¡Alégrate, hija de Sión! Tu rey viene a ti, humilde y montado en un asno.", referencia: "Za 9, 9" },
    "Malaquéas": { mensaje: "Brillará el sol de justicia. Has preparado el camino para el mensajero.", referencia: "Ml 3, 20" },
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

// FUNCIÓN DE NORMALIZACIÓN (elimina acentos y convierte a minúsculas)
function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
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
                let palabras = textoNormalizado.match(/\b[\p{L}\p{M}']+\b/gu) || [];
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
        indiceConcordancia[palabra].sort((a,b) => {
            if (a.libro !== b.libro) return a.libro.localeCompare(b.libro);
            if (a.capitulo !== b.capitulo) return a.capitulo - b.capitulo;
            return a.versiculo - b.versiculo;
        });
    }
}

// CORRECCIÓN: resaltar palabras usando tokenización por palabra, normalizando cada una
function resaltarPalabras(texto) {
    if (!concordanciaActiva) return escapeHtml(texto);
    // Expresión regular para capturar palabras (incluye letras con acentos, apóstrofes, etc.)
    const regexPalabras = /\b[\p{L}\p{M}']+\b/gu;
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
            <div class="p-3 bg-amber-50 dark:bg-gray-700 rounded-lg border-l-4 border-oro cursor-pointer hover:bg-amber-100 dark:hover:bg-gray-600 transition" onclick="irAVersiculo('${ref.libro}', ${ref.capitulo}, ${ref.versiculo})">
                <div class="font-bold text-oro text-sm">${ref.libro} ${ref.capitulo}, ${ref.versiculo}</div>
                <div class="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">${escapeHtml(ref.texto)}</div>
            </div>
        `).join('');
    }
    panel.classList.remove('translate-x-full');
}

function irAVersiculo(libro, capitulo, versiculo) {
    // Cerramos paneles laterales si están abiertos
    cerrarPanel('panel-concordancia');
    cerrarPanel('panel-busqueda');
    cerrarPanel('panel-favoritos');

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

async function cargarComentariosJSON() {
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
                let key = `${libro}_prefacio`;
                if (!comentariosDB[key]) comentariosDB[key] = [];
                comentariosDB[key].push({ autor: item.Autor, texto: item.Texto_Comentario });
            } else {
                let matchCapituloVersos = parte.match(/,?\s*(\d+):([\d\-]+)/);
                if (matchCapituloVersos) {
                    let capitulo = parseInt(matchCapituloVersos[1]);
                    let versosStr = matchCapituloVersos[2];
                    let rango = versosStr.split('-').map(v => parseInt(v));
                    
                    if (rango.length === 1 || rango[0] === rango[1]) {
                        let key = `${libro}_${capitulo}_${rango[0]}`;
                        if (!comentariosDB[key]) comentariosDB[key] = [];
                        comentariosDB[key].push({ autor: item.Autor, texto: item.Texto_Comentario });
                    } else {
                        let rangeKey = `${libro}_${capitulo}_${rango[0]}-${rango[1]}`;
                        if (!comentariosDB[rangeKey]) comentariosDB[rangeKey] = [];
                        comentariosDB[rangeKey].push({ autor: item.Autor, texto: item.Texto_Comentario });
                        comentariosDB.__ranges.push({
                            libro: libro,
                            capitulo: capitulo,
                            desde: rango[0],
                            hasta: rango[1],
                            key: rangeKey
                        });
                    }
                }
            }
        });
        datosComentariosCargados = true;
        console.log("Comentarios de la Catena Aurea cargados en la memoria.");
    } catch (err) {
        console.error("Aviso: Aún no hay archivo JSON de comentarios o hubo un error:", err);
    }
}

function obtenerComentarios(libro, capitulo, versiculo) {
    let key = `${libro}_${capitulo}_${versiculo}`;
    if (comentariosDB[key]) return comentariosDB[key];
    for (let r of (comentariosDB.__ranges || [])) {
        if (r.libro === libro && r.capitulo === capitulo && versiculo >= r.desde && versiculo <= r.hasta) {
            return comentariosDB[r.key];
        }
    }
    return [];
}

// --------------------------------------------------------------
// 6. NOTAS PERSONALES Y FAVORITOS
// --------------------------------------------------------------
let notasPersonales = {};
let favoritos = new Set();
let leidos = new Set();
// Lumina cuenta 76 libros en su canon interno: 73 del canon católico + 3 suplementarios.
const TOTAL_BIBLIA_LUMINA = 76;
let bibliaCompletaCelebrada = false;
const CLAVE_EVENTO_BIBLIA_COMPLETA = "lumina_biblia_completa_evento_v1";
const CLAVE_CONTADOR_CELEBRACION_BIBLIA = "lumina_biblia_completa_contador_v1";
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

function cargarNotasPersonales() {
    const stored = localStorage.getItem("lumina_notas");
    if (stored) notasPersonales = JSON.parse(stored);
}

function cargarLeidos() {
    const stored = localStorage.getItem("lumina_leidos");
    if (stored) leidos = new Set(JSON.parse(stored));
}

function guardarLeidos() {
    localStorage.setItem("lumina_leidos", JSON.stringify(Array.from(leidos)));
}
function guardarNota(libro, capitulo, versiculo, texto) {
    const key = `${libro}_${capitulo}_${versiculo}`;
    if (!notasPersonales[key]) notasPersonales[key] = [];
    
    // Lógica original
    notasPersonales[key].push({ texto, fecha: new Date().toLocaleString() });
    localStorage.setItem("lumina_notas", JSON.stringify(notasPersonales));
    
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
    
    localStorage.setItem("lumina_notas", JSON.stringify(notasPersonales));
    
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
function mostrarNotasPersonales(libro, capitulo, versiculo) {
    const container = document.getElementById('lista-notas-personales');
    const notas = obtenerNotasPersonales(libro, capitulo, versiculo);
    if (notas.length === 0) {
        container.innerHTML = '<div class="text-gray-500 dark:text-gray-400 italic text-center py-4">No hay notas personales para este versículo.</div>';
        return;
    }
    container.innerHTML = notas.map((nota, idx) => {
        const esFav = esFavoritoComentario(libro, capitulo, versiculo, 'personal', idx);
        return `
        <div class="border-l-4 border-oro/30 pl-4 py-3 bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-lg mb-3 shadow-sm">
            <p class="text-gray-800 dark:text-gray-200 text-sm mb-2 font-medium">${escapeHtml(nota.texto)}</p>
            <div class="flex justify-between items-center mt-2 border-t border-gray-200 dark:border-gray-700 pt-2">
                <span class="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-sans font-bold">${nota.fecha}</span>
                <div class="flex gap-2">
                    <button id="audio_nota_${idx}" data-texto="${escapeHtml(nota.texto).replace(/"/g, '&quot;')}" 
                            class="btn-audio-nota text-gray-500 dark:text-gray-400 hover:text-oro transition p-1" 
                            title="Escuchar nota">
                        <i class="fas fa-volume-up text-sm"></i>
                    </button>
                    <button id="star_com_${libro}_${capitulo}_${versiculo}_personal_${idx}" 
                            onclick="toggleFavoritoComentario('${libro}', ${capitulo}, ${versiculo}, 'personal', ${idx})" 
                            class="estrella-fav-comentario ${esFav ? 'activa' : ''} transition-all">
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
        btn.onclick = function(e) {
            e.preventDefault();
            escucharNota(this.dataset.texto || '', this);
        };
    });
}

function cargarFavoritos() {
    let stored = localStorage.getItem("lumina_favoritos");
    if (stored) favoritos = new Set(JSON.parse(stored));
}
function guardarFavoritos() {
    localStorage.setItem("lumina_favoritos", JSON.stringify(Array.from(favoritos)));
}
function toggleFavoritoVersiculo(libro, capitulo, versiculo) {
    const key = `versiculo:${libro}_${capitulo}_${versiculo}`;
    if (favoritos.has(key)) favoritos.delete(key);
    else favoritos.add(key);
    guardarFavoritos();
actualizarEstrella(libro, capitulo, versiculo);

// ? FEEDBACK VISUAL
const star = document.getElementById(`star_${libro}_${capitulo}_${versiculo}`);

if (star) {
    if (favoritos.has(`versiculo:${libro}_${capitulo}_${versiculo}`)) {
        star.classList.add('animacion-fav');
        lanzarToast("Versículo guardado ?");
    } else {
        lanzarToast("Versículo quitado");
    }

    setTimeout(() => {
        star.classList.remove('animacion-fav');
    }, 300);
}
    if (document.getElementById('panel-favoritos').classList.contains('translate-x-full') === false) mostrarPanelFavoritos();
}
function toggleFavoritoComentario(libro, capitulo, versiculo, tipo, idx) {
    const key = `comentario:${libro}_${capitulo}_${versiculo}_${tipo}_${idx}`;
    if (favoritos.has(key)) favoritos.delete(key);
    else favoritos.add(key);
    guardarFavoritos();
    const starId = `star_com_${libro}_${capitulo}_${versiculo}_${tipo}_${idx}`;
    const starElem = document.getElementById(starId);
if (starElem) {
    if (favoritos.has(key)) {
        starElem.classList.add('activa');

        // ? FEEDBACK VISUAL
        starElem.classList.add('animacion-fav');
        lanzarToast("Guardado en favoritos ?");

    } else {
        starElem.classList.remove('activa');

        // ? FEEDBACK VISUAL
        lanzarToast("Quitado de favoritos");
    }

    // limpiar animación
    setTimeout(() => {
        starElem.classList.remove('animacion-fav');
    }, 300);
}
    if (document.getElementById('panel-favoritos').classList.contains('translate-x-full') === false) mostrarPanelFavoritos();
}
function esFavoritoVersiculo(libro, capitulo, versiculo) {
    return favoritos.has(`versiculo:${libro}_${capitulo}_${versiculo}`);
}
function esFavoritoComentario(libro, capitulo, versiculo, tipo, idx) {
    return favoritos.has(`comentario:${libro}_${capitulo}_${versiculo}_${tipo}_${idx}`);
}
function actualizarEstrella(libro, capitulo, versiculo) {
    let starSpan = document.getElementById(`star_${libro}_${capitulo}_${versiculo}`);
    if (starSpan) {
        if (esFavoritoVersiculo(libro, capitulo, versiculo)) {
            starSpan.classList.add("activa");
            starSpan.textContent = "\u2605";
        } else {
            starSpan.classList.remove("activa");
            starSpan.textContent = "\u2606";
        }
    }
}
function mostrarPanelFavoritos() {
    let listaDiv = document.getElementById('lista-favoritos');
    listaDiv.innerHTML = "";
    let favoritosArray = Array.from(favoritos);
    if (favoritosArray.length === 0) {
        listaDiv.innerHTML = '<div class="text-gray-400 italic text-center py-8">No tienes favoritos aún.<br>Puedes marcar versículos y comentarios como favoritos.</div>';
        return;
    }
    for (let key of favoritosArray) {
        if (key.startsWith('versiculo:')) {
            let ref = key.substring(10);
            let [libro, capitulo, versiculo] = ref.split('_');
            let textoVersiculo = bibleContent[libro]?.[capitulo]?.[versiculo];
            if (!textoVersiculo) continue;
            let item = document.createElement('div');
            item.className = "favorito-item favorito-item-versiculo p-3 bg-amber-50 dark:bg-gray-700 rounded-lg border-l-4 border-oro cursor-pointer hover:bg-amber-100 dark:hover:bg-gray-600 transition mb-3";
            item.innerHTML = `
                <div class="flex items-center gap-2 mb-1">
                    <i class="fas fa-bible text-oro text-sm"></i>
                    <div class="font-bold text-oro text-sm">${libro} ${capitulo}, ${versiculo}</div>
                </div>
                <div class="favorito-texto text-gray-700 dark:text-gray-300 text-sm line-clamp-2">${escapeHtml(textoVersiculo)}</div>
            `;
            item.onclick = () => {
                cerrarPanel('panel-favoritos');
                irAVersiculo(libro, parseInt(capitulo), parseFloat(versiculo));
            };
            listaDiv.appendChild(item);
        } else if (key.startsWith('comentario:')) {
            let parts = key.substring(11).split('_');
            let libro = parts[0];
            let capitulo = parts[1];
            let versiculo = parts[2];
            let tipo = parts[3];
            let idx = parseInt(parts[4]);
            let comentarioObj = null;
            if (tipo === 'tradicion') {
                let comentarios = obtenerComentarios(libro, parseInt(capitulo), parseFloat(versiculo));
                if (comentarios[idx]) comentarioObj = comentarios[idx];
            } else if (tipo === 'personal') {
                let notas = obtenerNotasPersonales(libro, parseInt(capitulo), parseFloat(versiculo));
                if (notas[idx]) comentarioObj = { autor: "Mi nota", texto: notas[idx].texto, fecha: notas[idx].fecha };
            }
            if (!comentarioObj) continue;
            let item = document.createElement('div');
            item.className = "favorito-item p-3 bg-amber-50 dark:bg-gray-700 rounded-lg border-l-4 border-oro cursor-pointer hover:bg-amber-100 dark:hover:bg-gray-600 transition mb-3";
            item.innerHTML = `
                <div class="flex items-center gap-2 mb-1">
                    <i class="fas fa-comment text-oro text-sm"></i>
                    <div class="font-bold text-oro text-sm">${libro} ${capitulo}, ${versiculo}</div>
                    <span class="text-xs text-gray-500">${tipo === 'tradicion' ? 'Tradición' : 'Nota personal'}</span>
                </div>
                <div class="text-gray-700 dark:text-gray-300 text-sm">"${escapeHtml(comentarioObj.texto.substring(0, 100))}${comentarioObj.texto.length > 100 ? '…' : ''}"</div>
            `;
            item.onclick = () => {
                cerrarPanel('panel-favoritos');
                irAVersiculo(libro, parseInt(capitulo), parseFloat(versiculo));
                setTimeout(() => {
                    abrirPanel(libro, parseInt(capitulo), parseFloat(versiculo), bibleContent[libro]?.[capitulo]?.[versiculo] || "");
                    if (tipo === 'personal') {
                        document.getElementById('tab-personales').click();
                    } else {
                        document.getElementById('tab-tradicion').click();
                    }
                }, 200);
            };
            listaDiv.appendChild(item);
        }
    }
    document.getElementById('panel-favoritos').classList.remove('translate-x-full');
}

// --------------------------------------------------------------
// 7. BÚSQUEDA
// --------------------------------------------------------------
let indiceBusqueda = [];
function construirIndiceBusqueda() {
    indiceBusqueda = [];
    for (let libro in bibleContent) {
        for (let cap in bibleContent[libro]) {
            for (let ver in bibleContent[libro][cap]) {
                indiceBusqueda.push({
                    libro,
                    capitulo: parseInt(cap),
                    versiculo: parseFloat(ver),
                    texto: bibleContent[libro][cap][ver]
                });
            }
        }
    }
}
function buscarVersiculos(termino) {
    const terminoLimpio = normalizarTexto(termino).trim().replace(/\s+/g, ' ');
    if (!terminoLimpio) return [];

    // Evitamos la bandera `g` porque `test()` con regex global
    // avanza `lastIndex` y puede saltarse coincidencias.
    const termRegex = terminoLimpio.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${termRegex}\\b`, 'i');
    return indiceBusqueda.filter(item => {
        const textoNormalizado = normalizarTexto(item.texto);
        return regex.test(textoNormalizado);
    });
}
function mostrarResultadosBusqueda(termino) {
    const resultados = buscarVersiculos(termino);
    const panel = document.getElementById('panel-busqueda');
    const contenedor = document.getElementById('contenido-busqueda');
    const contador = document.getElementById('contador-busqueda');
    
    // Cerrar otros paneles para reemplazarlos con el panel de búsqueda
    cerrarPanel('panel-comentarios');
    cerrarPanel('panel-favoritos');
    cerrarPanel('panel-concordancia');

    if (contador) {
        contador.textContent = `${resultados.length} resultado${resultados.length !== 1 ? 's' : ''} para "${termino}"`;
    }
    
    if (resultados.length === 0) {
        contenedor.innerHTML = `<div class="text-gray-400 italic text-center py-8">No se encontraron versículos que contengan "${escapeHtml(termino)}".</div>`;
    } else {
        const esModoOscuro = document.body.classList.contains('dark');
        const estiloTarjeta = esModoOscuro
            ? ''
            : 'style="background-color: var(--lumina-paper); color: var(--lumina-ink); border: 1px solid var(--lumina-border); border-left: 4px solid var(--lumina-accent); box-shadow: var(--lumina-shadow);"';
        const estiloTitulo = esModoOscuro ? '' : 'style="color: var(--lumina-accent);"';
        const estiloTexto = esModoOscuro ? '' : 'style="color: var(--lumina-ink);"';
        let html = '';
        html += resultados.map(ref => `
            <div class="resultado-busqueda-item p-3 bg-amber-50 dark:bg-gray-700 rounded-lg border-l-4 border-oro cursor-pointer hover:bg-amber-100 dark:hover:bg-gray-600 transition mb-3" ${estiloTarjeta} onclick="irAVersiculo('${ref.libro}', ${ref.capitulo}, ${ref.versiculo})">
                <div class="font-bold text-oro text-sm" ${estiloTitulo}>${ref.libro} ${ref.capitulo}, ${ref.versiculo}</div>
                <div class="text-gray-700 dark:text-gray-300 text-sm line-clamp-2" ${estiloTexto}>${escapeHtml(ref.texto)}</div>
            </div>
        `).join('');
        contenedor.innerHTML = html;
    }
    panel.classList.remove('translate-x-full');
}

// --------------------------------------------------------------
// 8. COMPARTIR
// --------------------------------------------------------------
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
    
    // Preparar palabras para resaltado
    prepararPalabrasParaResaltado(contenido);
    
    btnAudioActivo = btn;
    if (btn) cambiarAIconoPausa(btn);
    
    utterance.onstart = () => {
        // Configurar Media Session para controles del dispositivo
        // configurarMediaSession();
        
        // Iniciar monitor de reproducción para detectar pausas inesperadas
        // iniciarMonitorReproduccion();
        
        // Estimar duración (aproximadamente 1.5 segundos por 10 palabras)
        const duracionEstimada = (palabrasResaltables.length / 10) * 1.5;
        iniciarSincronizacionResaltado(duracionEstimada, document.getElementById('contenido-panel-tradicion'));
    };
    
    utterance.onend = () => {
        limpiarMonitorReproduccion();
        if (btn) restaurarIconoParla(btn);
        btnAudioActivo = null;
        limpiarResaltadoAnterior();
    };
    
    utterance.onerror = () => {
        limpiarMonitorReproduccion();
        if (btn) restaurarIconoParla(btn);
        btnAudioActivo = null;
        limpiarResaltadoAnterior();
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
    
    // Preparar palabras para resaltado
    prepararPalabrasParaResaltado(texto);
    
    btnAudioActivo = btn;
    if (btn) cambiarAIconoPausa(btn);
    
    utterance.onstart = () => {
        // Configurar Media Session para controles del dispositivo
        // configurarMediaSession();
        
        // Iniciar monitor de reproducción para detectar pausas inesperadas
        // iniciarMonitorReproduccion();
        
        // Estimar duración
        const duracionEstimada = (palabrasResaltables.length / 10) * 1.5;
        iniciarSincronizacionResaltado(duracionEstimada, document.getElementById('contenido-panel-personales'));
    };
    
    utterance.onend = () => {
        limpiarMonitorReproduccion();
        if (btn) restaurarIconoParla(btn);
        btnAudioActivo = null;
        limpiarResaltadoAnterior();
    };
    
    utterance.onerror = () => {
        limpiarMonitorReproduccion();
        if (btn) restaurarIconoParla(btn);
        btnAudioActivo = null;
        limpiarResaltadoAnterior();
    };
    
    reproducirUtterance(utterance);
}

function compartirVersiculo(libro, capitulo, versiculo, texto) {
    const contenido = `${texto}\n\n- Compartido desde Lumina`;
    compartirTexto(contenido, `Versículo: ${libro} ${capitulo}, ${versiculo}`);
}

function limpiarAutorComentario(autor) {
    return String(autor || "")
        .replace(/^comentario de\s+/i, "")
        .trim();
}

function compartirComentario(libro, capitulo, versiculo, autor, texto) {
    const autorLimpio = limpiarAutorComentario(autor);
    const contenido = `${texto}\n\n- Compartido desde Lumina`;
    compartirTexto(contenido, `Comentario de ${autorLimpio} sobre ${libro} ${capitulo}, ${versiculo}`);
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
let tiemposAcumulativosVersiculos = []; // Array de tiempos acumulativos en ms para sincronización precisa

// Variables para mantener reproducción con pantalla apagada
let reproduccionActiva = false; // Track if actively playing
let intentosReanudacion = 0; // Counter para intentos de reanudación
const MAX_INTENTOS_REANUDACION = 3; // Máximo de intentos antes de renunciar
let tokenLecturaActiva = 0;
let timeoutLecturaActiva = null;
let speechSynthesisDesbloqueada = false;

function navegadorSoportaLectura() {
    return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

function obtenerVozEspanol() {
    if (!navegadorSoportaLectura()) return null;
    const voces = window.speechSynthesis.getVoices();
    
    // Si no hay voces disponibles, esperar a que se carguen (común en móvil)
    if (voces.length === 0) return null;
    
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

function cambiarAIconoPausa(btn) {
    if (!btn) return;
    btn.classList.add('en-reproduccion');
    btn.dataset.reproduciendo = 'true';
    btn.innerHTML = '<i class="fas fa-stop"></i>';
    btn.title = 'Dejar de escuchar';
}

function restaurarIconoParla(btn) {
    if (!btn) return;
    btn.classList.remove('en-reproduccion');
    btn.dataset.reproduciendo = 'false';
    btn.innerHTML = '<i class="fas fa-volume-up text-sm"></i>';
    btn.title = 'Escuchar';
}

function detenerConRestauracion() {
    if (btnAudioActivo) {
        restaurarIconoParla(btnAudioActivo);
        btnAudioActivo = null;
    }
    detenerLectura();
}

function limpiarEstadoLectura() {
    document.querySelectorAll('.btn-audio-versiculo').forEach(btn => {
        btn.classList.remove('reproduciendo');
        btn.setAttribute('aria-pressed', 'false');
        btn.title = 'Escuchar versículo';
        btn.innerHTML = '<span class="audio-icon" aria-hidden="true">🔊</span>';
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
    actualizarBotonesReproduccionListas();
}

function crearUtteranceLectura(texto) {
    // 1. Limpiamos espacios extra que puedan venir del HTML
    const textoLimpio = texto.trim();
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

function dividirTextoParaLectura(texto, maxChars = 220) {
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

            timeoutLecturaActiva = setTimeout(hablarSiguiente, 30);
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
    document.removeEventListener('visibilitychange', () => {});
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

function actualizarBotonLeerLibro(leyendo) {
    const btnLeer = document.querySelector('.btn-leer-libro');
    if (!btnLeer) return;

    if (leyendo) {
        btnLeer.innerHTML = '<i class="fas fa-stop"></i> DEJAR DE ESCUCHAR';
        btnLeer.title = 'Dejar de escuchar';
        btnLeer.setAttribute('aria-label', 'Dejar de escuchar');
        btnLeer.classList.add('en-reproduccion');
    } else {
        btnLeer.innerHTML = '<i class="fas fa-volume-up"></i> ESCUCHAR LIBRO';
        btnLeer.title = 'Escuchar todo el libro';
        btnLeer.setAttribute('aria-label', 'Escuchar todo el libro');
        btnLeer.classList.remove('en-reproduccion');
    }
    actualizarBotonesReproduccionListas();
}

function actualizarBotonesReproduccionListas() {
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

function escucharVersiculo(libro, capitulo, versiculo, texto) {
    if (!navegadorSoportaLectura()) {
        alert('Tu navegador no admite lectura en voz alta.');
        return;
    }

    const btn = document.getElementById(`audio_${libro}_${capitulo}_${versiculo}`);
    // Usamos comas para que la voz haga las pausas naturales de la cita bíblica
    const referencia = `${libro}, capítulo ${capitulo}, versículo ${versiculo}. ${texto}`;

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
            btn.setAttribute('aria-pressed', 'true');
            btn.title = 'Dejar de escuchar';
            // Mantenemos el ícono de stop/cuadrado
            btn.innerHTML = '<span class="audio-icon" aria-hidden="true">⏹</span>';
        }

        // Preparar resaltado de palabras
        palabrasResaltables = prepararPalabrasParaResaltado(texto);

        utterance.onstart = () => {
            // Configurar Media Session para controles del dispositivo
            // configurarMediaSession();
            
            // Iniciar monitor de reproducción para detectar pausas inesperadas
            // iniciarMonitorReproduccion();
            
            // Iniciar sincronización de resaltado de palabras
            const duracionEstimada = (palabrasResaltables.length / 10) * 1.5;
            iniciarSincronizacionResaltado(duracionEstimada, document.getElementById(`verse_${libro}_${capitulo}_${versiculo}`));
            
            // Resaltar el versículo completo
            resaltarVersiculo(libro, capitulo, versiculo);
        };

        utterance.onend = () => {
            // limpiarMonitorReproduccion();
            limpiarResaltadoAnterior();
            limpiarResaltadoVersiculo();
            if (!leyendoCapituloCompleto) {
                vozActiva = null;
                limpiarEstadoLectura();
            }
        };

        utterance.onerror = () => {
            // limpiarMonitorReproduccion();
            limpiarResaltadoAnterior();
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

    const versiculosObj = bibleContent[libroActual]?.[capituloActual] || {};
    const numerosVersiculos = Object.keys(versiculosObj).map(Number).sort((a, b) => a - b);
    // Leer solo el texto, sin decir "Versículo X"
    const textoCapitulo = numerosVersiculos
        .filter(v => v >= 1)
        .map(v => versiculosObj[v])
        .join(' ');

    if (!textoCapitulo) return;

    // Si ya está reproduciendo, detener
    if (leyendoCapituloCompleto) {
        detenerLectura();
        actualizarBotonLeerCapitulo(false);
        return;
    }

    detenerLectura();
    leyendoCapituloCompleto = true;
    capituloEnReproduccion = capituloActual;

    // Preparar palabras para resaltado y construir lista de versículos
    const textoCompleto = `${libroActual}, capítulo ${capituloActual}. ${textoCapitulo}`;
    prepararPalabrasParaResaltado(textoCompleto);
    construirListaVersiculosCapitulo(libroActual, capituloActual);

    // Cambiar el texto del botón a "DETENER LECTURA"
    actualizarBotonLeerCapitulo(true);

    const voces = window.speechSynthesis.getVoices();
    if (voces.length === 0) {
        console.warn('TTS: voces aún no disponibles. Usando fallback inmediato para conservar la activación del usuario.');
    }

    const utterance = crearUtteranceLectura(textoCompleto);
    
    let tiempoInicio = 0;
    let intervaloResalteVersiculo = null;
    
    utterance.onstart = () => {
        const duracionEstimada = (palabrasResaltables.length / 10) * 1.5;
        iniciarSincronizacionResaltado(duracionEstimada, document.getElementById('contenedor-versiculos'));
        
        // Calcular tiempos acumulativos basados en longitud de versículos
        calcularTiemposAcumulativos(duracionEstimada);
        
        tiempoInicio = Date.now();
        
        // Interval para resaltar versículos con sincronización mejorada
        intervaloResalteVersiculo = setInterval(() => {
            const tiempoTranscurrido = Date.now() - tiempoInicio;
            
            // Buscar qué versículo corresponde a este tiempo
            let indiceVersiculo = 0;
            for (let i = 0; i < tiemposAcumulativosVersiculos.length; i++) {
                if (tiempoTranscurrido < tiemposAcumulativosVersiculos[i]) {
                    indiceVersiculo = i;
                    break;
                }
            }
            
            if (indiceVersiculo < listaVersiculosEnCapitulo.length) {
                const v = listaVersiculosEnCapitulo[indiceVersiculo];
                resaltarVersiculo(v.libro, v.capitulo, v.versiculo);
            }
        }, 100);
    };
    
    utterance.onend = () => {
        leyendoCapituloCompleto = false;
        vozActiva = null;
        limpiarEstadoLectura();
        limpiarResaltadoAnterior();
        limpiarResaltadoVersiculo();
        if (intervaloResalteVersiculo) clearInterval(intervaloResalteVersiculo);
        actualizarBotonLeerCapitulo(false);
    };
    utterance.onerror = () => {
        leyendoCapituloCompleto = false;
        vozActiva = null;
        limpiarEstadoLectura();
        limpiarResaltadoAnterior();
        limpiarResaltadoVersiculo();
        if (intervaloResalteVersiculo) clearInterval(intervaloResalteVersiculo);
        actualizarBotonLeerCapitulo(false);
    };

    reproducirUtterance(utterance);
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

    const versiculosObj = bibleContent[libroActual]?.[capitulo] || {};
    const numerosVersiculos = Object.keys(versiculosObj).map(Number).sort((a, b) => a - b);
    const textoCapitulo = numerosVersiculos
        .filter(v => v >= 1)
        .map(v => versiculosObj[v])
        .join(' ');

    if (!textoCapitulo) return;

    detenerLectura();
    leyendoCapituloCompleto = true;
    capituloEnReproduccion = capitulo;
    actualizarBotonesReproduccionListas();

    // Preparar palabras para resaltado y construir lista de versículos
    const textoCompleto = `${libroActual}, capítulo ${capitulo}. ${textoCapitulo}`;
    prepararPalabrasParaResaltado(textoCompleto);
    construirListaVersiculosCapitulo(libroActual, capitulo);

    const voces = window.speechSynthesis.getVoices();
    if (voces.length === 0) {
        console.warn('TTS: voces aún no disponibles. Usando fallback inmediato para conservar la activación del usuario.');
    }

    const utterance = crearUtteranceLectura(textoCompleto);
    
    let tiempoInicio = 0;
    let intervaloResalteVersiculo = null;
    
    utterance.onstart = () => {
        const duracionEstimada = (palabrasResaltables.length / 10) * 1.5;
        iniciarSincronizacionResaltado(duracionEstimada, document.getElementById('contenedor-versiculos'));
        
        // Calcular tiempos acumulativos basados en longitud de versículos
        calcularTiemposAcumulativos(duracionEstimada);
        
        tiempoInicio = Date.now();
        
        // Interval para resaltar versículos con sincronización mejorada
        intervaloResalteVersiculo = setInterval(() => {
            const tiempoTranscurrido = Date.now() - tiempoInicio;
            
            // Buscar qué versículo corresponde a este tiempo
            let indiceVersiculo = 0;
            for (let i = 0; i < tiemposAcumulativosVersiculos.length; i++) {
                if (tiempoTranscurrido < tiemposAcumulativosVersiculos[i]) {
                    indiceVersiculo = i;
                    break;
                }
            }
            
            if (indiceVersiculo < listaVersiculosEnCapitulo.length) {
                const v = listaVersiculosEnCapitulo[indiceVersiculo];
                resaltarVersiculo(v.libro, v.capitulo, v.versiculo);
            }
        }, 100);
    };
    
    utterance.onend = () => {
        limpiarMonitorReproduccion();
        leyendoCapituloCompleto = false;
        capituloEnReproduccion = null;
        vozActiva = null;
        limpiarEstadoLectura();
        limpiarResaltadoAnterior();
        limpiarResaltadoVersiculo();
        if (intervaloResalteVersiculo) clearInterval(intervaloResalteVersiculo);
        actualizarBotonesReproduccionListas();
    };
    utterance.onerror = () => {
        limpiarMonitorReproduccion();
        leyendoCapituloCompleto = false;
        capituloEnReproduccion = null;
        vozActiva = null;
        limpiarEstadoLectura();
        limpiarResaltadoAnterior();
        limpiarResaltadoVersiculo();
        if (intervaloResalteVersiculo) clearInterval(intervaloResalteVersiculo);
        actualizarBotonesReproduccionListas();
    };

    reproducirUtterance(utterance);
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

    // Reunir todo el texto del libro por capítulos
    const capitulosSorted = Object.keys(libroContenido).map(Number).sort((a, b) => a - b);
    let textoLibroCompleto = `${libroNombre}. `;
    
    capitulosSorted.forEach(capitulo => {
        const versiculosObj = libroContenido[capitulo];
        const numerosVersiculos = Object.keys(versiculosObj).map(Number).sort((a, b) => a - b);
        const textoCapitulo = numerosVersiculos
            .filter(v => v >= 1)
            .map(v => versiculosObj[v])
            .join(' ');
        if (textoCapitulo) {
            textoLibroCompleto += `Capítulo ${capitulo}. ${textoCapitulo} `;
        }
    });

    detenerLectura();
    leyendoLibroCompleto = true;
    libroEnReproduccion = libroNombre;

    // Preparar palabras para resaltado
    palabrasResaltables = prepararPalabrasParaResaltado(textoLibroCompleto);
    
    // Construir lista de versículos del libro para resaltado
    listaVersiculosEnCapitulo = construirListaVersiculosLibro(libroNombre);

    // Cambiar el texto del botón a "DEJAR DE LEER"
    actualizarBotonLeerLibro(true);

    const voces = window.speechSynthesis.getVoices();
    if (voces.length === 0) {
        console.warn('TTS: voces aún no disponibles. Usando fallback inmediato para conservar la activación del usuario.');
    }

    const utterance = crearUtteranceLectura(textoLibroCompleto);
    let intervaloResalteVersiculo = null;
    
    utterance.onstart = () => {
        // Configurar Media Session para controles del dispositivo
                // configurarMediaSession();
                
                // Iniciar monitor de reproducción para detectar pausas inesperadas
                // iniciarMonitorReproduccion();

        const duracionEstimada = (palabrasResaltables.length / 10) * 1.5;
        
        // Iniciar sincronización de resaltado de palabras
        iniciarSincronizacionResaltado(duracionEstimada, document.getElementById('contenedor-versiculos'));
        
        // Calcular tiempos acumulativos basados en longitud de versículos
        calcularTiemposAcumulativos(duracionEstimada);
        
        // Iniciar sincronización de resaltado de versículos
        tiempoInicioDiccion = Date.now();
        intervaloResalteVersiculo = setInterval(() => {
            const tiempoTranscurrido = Date.now() - tiempoInicioDiccion;
            
            // Buscar qué versículo corresponde a este tiempo
            let indiceVersiculo = 0;
            for (let i = 0; i < tiemposAcumulativosVersiculos.length; i++) {
                if (tiempoTranscurrido < tiemposAcumulativosVersiculos[i]) {
                    indiceVersiculo = i;
                    break;
                }
            }
            
            if (indiceVersiculo < listaVersiculosEnCapitulo.length) {
                const v = listaVersiculosEnCapitulo[indiceVersiculo];
                resaltarVersiculo(v.libro, v.capitulo, v.versiculo);
            }
        }, 100);
    };
    
    utterance.onend = () => {
        limpiarMonitorReproduccion();
        leyendoLibroCompleto = false;
        libroEnReproduccion = null;
        vozActiva = null;
        limpiarEstadoLectura();
        limpiarResaltadoAnterior();
        limpiarResaltadoVersiculo();
        if (intervaloResalteVersiculo) clearInterval(intervaloResalteVersiculo);
        actualizarBotonLeerLibro(false);
    };
    utterance.onerror = () => {
        limpiarMonitorReproduccion();
        leyendoLibroCompleto = false;
        libroEnReproduccion = null;
        vozActiva = null;
        limpiarEstadoLectura();
        limpiarResaltadoAnterior();
        limpiarResaltadoVersiculo();
        if (intervaloResalteVersiculo) clearInterval(intervaloResalteVersiculo);
        actualizarBotonLeerLibro(false);
    };

    reproducirUtterance(utterance);
}

function initDarkMode() {
    const darkMode = localStorage.getItem('lumina_darkmode') === 'true';
    if (darkMode) document.body.classList.add('dark');
    const toggle = document.getElementById('toggle-darkmode');
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('lumina_darkmode', isDark);
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
        .filter(v => Number.isInteger(v) && v >= 1)
        .sort((a, b) => a - b);
}

function esVersiculoLeido(libro, capitulo, versiculo) {
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
    contenedor.innerHTML = `
        <div class="progreso-biblia-card rounded-3xl p-5 md:p-6">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div>
                    <div class="text-xs uppercase tracking-wider font-sans font-bold text-gray-500 dark:text-gray-400 mb-1">Progreso bíblico</div>
                </div>
                <div class="texto-progreso-biblia text-sm font-sans font-bold text-gray-700 dark:text-gray-200">${leidos}/${total}</div>
            </div>
            <div class="relative w-full pt-6">
                <div class="w-full h-2 rounded-full overflow-hidden bg-black/10 dark:bg-white/10">
                    <div data-progreso-barra-biblia class="h-full rounded-full bg-gradient-to-r from-amber-500 via-emerald-500 to-emerald-400 transition-all duration-300" style="width: ${porcentaje}%"></div>
                </div>
                <div data-progreso-burbuja-biblia class="progreso-burbuja" style="left: ${limitarPorcentajeBurbuja(porcentaje)}%">${porcentaje}%</div>
            </div>
        </div>
    `;
    verificarEventoBibliaCompleta();
}

function abrirCelebracionBibliaCompleta() {
    const modal = document.getElementById('modal-biblia-completa');
    if (!modal) return;
    actualizarMensajeCelebracionBiblia();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('biblia-completa-activa');
    lanzarEfectoCelebracionBiblia();
}

function cerrarCelebracionBibliaCompleta() {
    const modal = document.getElementById('modal-biblia-completa');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
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
    const contador = parseInt(localStorage.getItem(CLAVE_CONTADOR_CELEBRACION_BIBLIA) || "0", 10);
    const indice = contador % MENSAJES_CELEBRACION_BIBLIA.length;
    localStorage.setItem(CLAVE_CONTADOR_CELEBRACION_BIBLIA, String(contador + 1));
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

    const titulo = modal.querySelector('h3');
    const claveMensaje = opciones.claveMensaje || nombreLibro;
    const datosLibro = MENSAJES_LIBROS[claveMensaje] || MENSAJES_LIBROS[nombreLibro];

    if (titulo) {
        titulo.textContent = opciones.titulo || '¡Libro completado!';
    }
    cuerpo.innerHTML = '';

    const intro = document.createElement('p');
    intro.innerHTML = opciones.introHtml || `Has completado <strong>${nombreLibro}</strong>.`;
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
}

function verificarCelebracionLibroCompleto(libro, estabaCompletoAntes = false) {
    if (!libro || estabaCompletoAntes) return;

    if (EVANGELIOS_CELEBRACION.includes(libro)) {
        if (estanCuatroEvangeliosLeidos()) {
            abrirCelebracionLibroCompleto(libro, {
                claveMensaje: 'Los Cuatro Evangelios',
                titulo: '¡Evangelistas completado!',
                introHtml: 'Has completado el <strong>Evangelio</strong>.'
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
}

function verificarEventoBibliaCompleta() {
    const progreso = obtenerProgresoBiblia();
    const completada = progreso.total > 0 && progreso.leidos === progreso.total;

    if (completada) {
        document.body.classList.add('biblia-completa-activa');
        if (!bibliaCompletaCelebrada && localStorage.getItem(CLAVE_EVENTO_BIBLIA_COMPLETA) !== "true") {
            bibliaCompletaCelebrada = true;
            localStorage.setItem(CLAVE_EVENTO_BIBLIA_COMPLETA, "true");
            setTimeout(() => {
                abrirCelebracionBibliaCompleta();
            }, 250);
        }
    } else {
        bibliaCompletaCelebrada = false;
        localStorage.removeItem(CLAVE_EVENTO_BIBLIA_COMPLETA);
        document.body.classList.remove('biblia-completa-activa');
        cerrarCelebracionBibliaCompleta();
        cerrarConfirmacionReinicioBiblia();
    }
}

function reiniciarProgresoBiblia() {
    leidos = new Set();
    guardarLeidos();
    actualizarBotonesLeidoLibros();
    localStorage.removeItem(CLAVE_EVENTO_BIBLIA_COMPLETA);
    bibliaCompletaCelebrada = false;
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
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
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
    const opcionesHtml = '<option value="">-- Cambiar de libro --</option>' + todosLibros.map(libro => `<option value="${libro.nombre}">${libro.nombre}</option>`).join('');
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

function abrirPrefacio(libro) {
    const key = `${libro}_prefacio`;
    const comentarios = comentariosDB[key] || [];
    document.getElementById('titulo-panel-versiculo').innerHTML = `${libro} - Prefacio`;
    const panelHtml = `
        <div class="mb-5 p-4 bg-amber-50/40 dark:bg-gray-700 rounded-lg border-l-4 border-oro">
            <p class="text-sm font-serif italic text-gray-700 dark:text-gray-300">Comentarios introductorios de los Padres y Doctores sobre el Evangelio según San ${libro}.</p>
        </div>
        <div class="text-xs font-sans text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2"><i class="fas fa-feather-alt"></i> Tradición sobre el Evangelio</div>
    ` + (comentarios.length === 0 ? `<div class="text-gray-600 dark:text-gray-400 italic font-sans text-center py-10">Comentarios del prefacio en preparación.</div>` : comentarios.map((c, idx) => {
        const esFav = esFavoritoComentario(libro, 0, 0, 'tradicion', idx);
        return `
        <div class="border-l-4 border-oro/30 pl-4 py-2">
            <div class="flex justify-between items-start">
                <h3 class="font-bold text-xs text-oro">${escapeHtml(c.autor)}</h3>
                <button id="star_com_${libro}_0_0_tradicion_${idx}" onclick="toggleFavoritoComentario('${libro}', 0, 0, 'tradicion', ${idx})" class="estrella-fav-comentario ${esFav ? 'activa' : ''} transition"><i class="fas fa-star"></i></button>
            </div>
            <p class="text-gray-700 dark:text-gray-300 text-sm mt-2">${escapeHtml(c.texto)}</p>
            <button class="btn-compartir-comentario mt-2 text-xs text-oro hover:underline flex items-center gap-1"
                    data-libro="${libro.replace(/"/g, '&quot;')}"
                    data-capitulo="0"
                    data-versiculo="0"
                    data-autor="${escapeHtml(c.autor).replace(/"/g, '&quot;')}"
                    data-texto="${escapeHtml(c.texto).replace(/"/g, '&quot;')}">
                <i class="fas fa-share-alt"></i>
            </button>
        </div>
    `}).join(''));
    document.getElementById('contenido-panel-tradicion').innerHTML = panelHtml;
    document.querySelectorAll('.btn-compartir-comentario').forEach(btn => {
        btn.onclick = function(e) {
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
    document.getElementById('panel-comentarios').classList.remove('translate-x-full');
}

function abrirCapitulos(nombreLibro, cantidadCapitulos) {
    return abrirCapitulosV2(nombreLibro, cantidadCapitulos);
}

function abrirLectura(capitulo) {
    capituloActual = capitulo;
    document.getElementById('titulo-lectura').innerText = libroActual;
    document.getElementById('subtitulo-capitulo').innerHTML = `Capítulo ${capitulo}`;
    const contenedor = document.getElementById('contenedor-versiculos');
    contenedor.innerHTML = '';
    detenerLectura();

    const capituloLeido = estaCapituloLeido(libroActual, capitulo);
    const barraCapitulo = document.createElement('div');
    barraCapitulo.className = 'flex justify-center mb-5';
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
        botonesNavInicio.className = 'flex justify-center gap-3 mb-6';
        botonesNavInicio.innerHTML = `
            <button onclick="irAlCapituloAnterior()" class="btn-nav-lectura px-4 py-2 bg-oro/10 hover:bg-oro/20 text-oro border border-oro/20 rounded-lg font-sans text-sm font-bold transition flex items-center gap-2">
                <i class="fas fa-chevron-left"></i> Anterior
            </button>
        `;
        contenedor.appendChild(botonesNavInicio);
    }

    contenedor.appendChild(barraCapitulo);

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
    const numerosVersiculos = Object.keys(versiculosObj).map(Number).sort((a,b)=>a-b);
    if (numerosVersiculos.length > 0) {
        numerosVersiculos.forEach(v => {
            const textoOriginal = versiculosObj[v];
            const textoHTML = resaltarPalabras(textoOriginal);
            const favorito = esFavoritoVersiculo(libroActual, capitulo, v);
            const leido = esVersiculoLeido(libroActual, capitulo, v);
            let verseHtml = "";

            if (v < 1) {
                verseHtml = `
                    <div id="verse_${libroActual}_${capitulo}_${v}" class="verse-card bg-amber-50/50 dark:bg-gray-700/50 border-l-4 border-oro rounded-xl p-4 shadow-sm mb-6 cursor-pointer" onclick="abrirPanel('${libroActual}', ${capitulo}, ${v}, \`${escapeHtml(textoOriginal)}\`)">
                        <div class="flex items-start gap-3">
                            <span class="font-sans font-bold text-oro bg-white dark:bg-gray-800 w-8 h-8 flex items-center justify-center rounded-full text-sm shadow-sm flex-shrink-0"><i class="fas fa-info"></i></span>
                            <p class="flex-1 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg font-serif italic">${textoHTML}</p>
                            <button id="read_${libroActual}_${capitulo}_${v}" class="btn-leido-versiculo text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition p-1 ${leido ? 'activo text-emerald-600 dark:text-emerald-400' : ''}" onclick="event.stopPropagation(); toggleLeidoVersiculo('${libroActual}', ${capitulo}, ${v}); return false;" title="${leido ? 'Marcar como no leído' : 'Marcar como leído'}" aria-label="${leido ? 'Marcar como no leído' : 'Marcar como leído'} ${v}" aria-pressed="${leido ? 'true' : 'false'}"><i class="fas ${leido ? 'fa-check-circle' : 'fa-circle'} icono-leido text-sm"></i></button>
                        </div>
                    </div>
                `;
            } else if (v % 1 !== 0) {
                verseHtml = `
                    <div id="verse_${libroActual}_${capitulo}_${v}" class="my-6 text-center cursor-pointer" onclick="abrirPanel('${libroActual}', ${capitulo}, ${v}, \`${escapeHtml(textoOriginal)}\`)">
                        <span class="text-xs uppercase tracking-widest text-oro font-sans font-bold bg-santos/40 dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-oro/20">${textoHTML}</span>
                        <button id="read_${libroActual}_${capitulo}_${v}" class="btn-leido-versiculo ml-3 inline-flex items-center justify-center text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition p-1 ${leido ? 'activo text-emerald-600 dark:text-emerald-400' : ''}" onclick="event.stopPropagation(); toggleLeidoVersiculo('${libroActual}', ${capitulo}, ${v}); return false;" title="${leido ? 'Marcar como no leído' : 'Marcar como leído'}" aria-label="${leido ? 'Marcar como no leído' : 'Marcar como leído'} ${v}" aria-pressed="${leido ? 'true' : 'false'}"><i class="fas ${leido ? 'fa-check-circle' : 'fa-circle'} icono-leido text-sm"></i></button>
                    </div>
                `;
            } else {
                verseHtml = `
                    <div id="verse_${libroActual}_${capitulo}_${v}" class="verse-card bg-white dark:bg-gray-800 border-l-4 border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-all mb-4">
                        <div class="flex items-start gap-3">
                            <span class="font-sans font-bold text-oro bg-amber-50 dark:bg-gray-700 w-8 h-8 flex items-center justify-center rounded-full text-sm shadow-inner flex-shrink-0">${v}</span>
                            <div class="flex-1 cursor-pointer" onclick="abrirPanel('${libroActual}', ${capitulo}, ${v}, \`${escapeHtml(textoOriginal)}\`)">
                                <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg texto-biblico">${textoHTML}</p>
                            </div>
                            <div class="flex gap-2 items-center flex-shrink-0">
                                <span id="star_${libroActual}_${capitulo}_${v}" class="estrella-fav ${favorito ? 'activa' : ''} cursor-pointer text-gray-400 hover:text-oro transition" onclick="event.stopPropagation(); toggleFavoritoVersiculo('${libroActual}', ${capitulo}, ${v}); return false;" title="Agregar a favoritos">${favorito ? '★' : '☆'}</span>
                                <button id="audio_${libroActual}_${capitulo}_${v}" class="btn-audio-versiculo text-gray-400 hover:text-oro transition p-1" onclick="event.stopPropagation(); escucharVersiculo('${libroActual}', ${capitulo}, ${v}, \`${escapeHtml(textoOriginal)}\`, this)" title="Escuchar versículo" aria-label="Escuchar versículo ${v}" aria-pressed="false"><i class="fas fa-volume-up text-sm"></i></button>
                                <button onclick="event.stopPropagation(); compartirVersiculo('${libroActual}', ${capitulo}, ${v}, \`${escapeHtml(textoOriginal)}\`)" class="text-gray-400 hover:text-oro transition p-1" title="Compartir versículo"><i class="fas fa-share-alt"></i></button>
                                <button id="read_${libroActual}_${capitulo}_${v}" class="btn-leido-versiculo text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition p-1 ${leido ? 'activo text-emerald-600 dark:text-emerald-400' : ''}" onclick="event.stopPropagation(); toggleLeidoVersiculo('${libroActual}', ${capitulo}, ${v}); return false;" title="${leido ? 'Marcar como no leído' : 'Marcar como leído'}" aria-label="${leido ? 'Marcar como no leído' : 'Marcar como leído'} ${v}" aria-pressed="${leido ? 'true' : 'false'}"><i class="fas ${leido ? 'fa-check-circle' : 'fa-circle'} icono-leido text-sm"></i></button>
                            </div>
                        </div>
                    </div>
                `;
            }
            contenedor.innerHTML += verseHtml;
        });

        const esApocalipsis22 = libroActual === 'Apocalipsis' && capitulo === 22;
        if (!esApocalipsis22) {
            const botonesNavFinal = document.createElement('div');
            botonesNavFinal.className = 'flex justify-center gap-3 mt-6';
            botonesNavFinal.innerHTML = `
                <button onclick="irAlCapituloSiguiente()" class="btn-nav-lectura px-4 py-2 bg-oro/10 hover:bg-oro/20 text-oro border border-oro/20 rounded-lg font-sans text-sm font-bold transition flex items-center gap-2">
                    Siguiente <i class="fas fa-chevron-right"></i>
                </button>
            `;
            contenedor.appendChild(botonesNavFinal);
        }
    } else {
        contenedor.innerHTML = `<div class="text-center py-16 bg-white/60 dark:bg-gray-800/60 rounded-2xl border border-dashed border-oro/40"><i class="fas fa-scroll text-4xl text-oro/40 mb-4"></i><p class="text-gray-500 dark:text-gray-400">Todavía no hay versículos cargados para ${libroActual} ${capitulo}.</p></div>`;
    }
    mostrarVista('vista-lectura');
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

function irAlCapituloAnterior() {
    const todosLibros = obtenerTodosLosLibros();
    const indiceLibroActual = todosLibros.findIndex(l => l.nombre === libroActual);
    
    if (indiceLibroActual === -1) return;
    
    const cantidadCapitulos = capituloActual > 1 ? capituloActual - 1 : null;
    
    if (cantidadCapitulos) {
        // Ir al capítulo anterior del mismo libro
        abrirLectura(cantidadCapitulos);
    } else if (indiceLibroActual > 0) {
        // Ir al último capítulo del libro anterior
        const libroAnterior = todosLibros[indiceLibroActual - 1];
        libroActual = libroAnterior.nombre;
        const ultimoCapitulo = Array.isArray(libroAnterior.caps) 
            ? libroAnterior.caps[libroAnterior.caps.length - 1] 
            : libroAnterior.caps;
        abrirLectura(ultimoCapitulo);
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
    } else if (indiceLibroActual < todosLibros.length - 1) {
        // Ir al primer capítulo del siguiente libro
        const libroSiguiente = todosLibros[indiceLibroActual + 1];
        libroActual = libroSiguiente.nombre;
        abrirLectura(1);
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
        document.getElementById('busqueda-input-movil')
    ];

    inputsBusqueda.forEach(input => {
        if (input) input.value = "";
    });
}

function abrirPanel(libro, capitulo, versiculo, textoVersiculo) {
    const comentarios = obtenerComentarios(libro, capitulo, versiculo);
    
    let tituloRef = "";
    if (versiculo < 1) tituloRef = `${libro} ${capitulo} (Introducción)`;
    else if (versiculo % 1 !== 0) tituloRef = `${libro} ${capitulo} (Acotación)`;
    else tituloRef = `${libro} ${capitulo}, ${versiculo}`;
    
    document.getElementById('titulo-panel-versiculo').innerHTML = tituloRef;

    document.getElementById('cita-panel-sticky').innerHTML = `
        <div class="cita-versiculo-panel panel-cita-fija p-4 bg-amber-50/40 dark:bg-gray-700 rounded-lg border-l-4 border-oro">
            <p class="cita-versiculo-texto text-sm font-serif italic text-gray-700 dark:text-gray-300">"${escapeHtml(textoVersiculo)}"</p>
        </div>
    `;

    let tradicionHtml = `<div class="text-xs font-sans text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3"><i class="fas fa-feather-alt"></i> Tradición de los Padres y Doctores</div>`;
    
    if (comentarios.length === 0) {
        tradicionHtml += `<div class="text-gray-600 dark:text-gray-400 italic font-sans text-center py-10">? Aún no se han cargado comentarios de la Tradición para este pasaje.<br> Recemos para que un alma caratitativa me los haga llegar.</div>`;
    } else {
        tradicionHtml += comentarios.map((c, idx) => {
            const esFav = esFavoritoComentario(libro, capitulo, versiculo, 'tradicion', idx);
            return `
            <div class="border-l-4 border-oro/30 pl-4 py-2">
                <div class="flex justify-between items-start">
                    <h3 class="font-bold text-xs text-oro">${escapeHtml(c.autor)}</h3>
                    <div class="flex gap-2 items-center">
                        <button class="btn-audio-comentario text-gray-600 dark:text-gray-400 hover:text-oro transition p-1" 
                                data-autor="${c.autor.replace(/"/g, '&quot;')}"
                                data-texto="${c.texto.replace(/"/g, '&quot;')}"
                                title="Escuchar comentario">
                            <i class="fas fa-volume-up text-sm"></i>
                        </button>
                        <button id="star_com_${libro}_${capitulo}_${versiculo}_tradicion_${idx}" 
                                onclick="toggleFavoritoComentario('${libro}', ${capitulo}, ${versiculo}, 'tradicion', ${idx})" 
                                class="estrella-fav-comentario ${esFav ? 'activa' : ''} transition">
                            <i class="fas fa-star"></i>
                        </button>
                    </div>
                </div>
                <p class="text-gray-700 dark:text-gray-300 text-sm mt-2">${escapeHtml(c.texto)}</p>
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
        btn.onclick = function(e) {
            e.preventDefault();
            const autor = this.dataset.autor;
            const texto = this.dataset.texto;
            escucharComentario(autor, texto, this);
        };
    });
    document.querySelectorAll('.btn-compartir-comentario').forEach(btn => {
        btn.onclick = function(e) {
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

    mostrarNotasPersonales(libro, capitulo, versiculo);
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
    tabTrad.onclick = () => {
        tabTrad.classList.add('border-b-2', 'border-oro', 'text-oro');
        tabPers.classList.remove('border-b-2', 'border-oro', 'text-oro');
        tabPers.classList.add('text-gray-500', 'dark:text-gray-400');
        divTrad.classList.remove('hidden');
        divPers.classList.add('hidden');
    };
    tabPers.onclick = () => {
        tabPers.classList.add('border-b-2', 'border-oro', 'text-oro');
        tabTrad.classList.remove('border-b-2', 'border-oro', 'text-oro');
        tabTrad.classList.add('text-gray-500', 'dark:text-gray-400');
        divPers.classList.remove('hidden');
        divTrad.classList.add('hidden');
    };

    document.getElementById('panel-comentarios').classList.remove('translate-x-full');
}

function cerrarPanel(id) {
    document.getElementById(id).classList.add('translate-x-full');
}

function abrirPanelLumina() {
    const panel = document.getElementById('panel-lumina');
    const overlay = document.getElementById('overlay-panel-lumina');
    if (!panel || !overlay) return;
    cerrarPanel('panel-comentarios');
    cerrarPanel('panel-favoritos');
    cerrarPanel('panel-concordancia');
    cerrarPanel('panel-busqueda');
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

function abrirModalBienvenida() {
    const modal = document.getElementById('modal-bienvenida');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    localStorage.setItem('lumina_bienvenida_v1', 'true');
}

function cerrarModalBienvenida() {
    const modal = document.getElementById('modal-bienvenida');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function verificarBienvenida() {
    if (localStorage.getItem('lumina_bienvenida_v1') !== 'true') {
        abrirModalBienvenida();
    }
}

let registroServiceWorkerLumina = null;
let hayNuevaVersionLumina = false;
let recargaPendientePorActualizacion = false;

function marcarNuevaVersionLuminaDisponible(disponible) {
    hayNuevaVersionLumina = disponible;
}

function actualizarIndicadorConexion() {
    const badge = document.getElementById("estado-offline");
    if (!badge) return;
    
    badge.classList.remove("hidden");
    badge.classList.add("inline-flex");
    
    const spanEl = badge.querySelector("span");
    if (!spanEl) return;
    
    if (navigator.onLine) {
        spanEl.textContent = "Modo sin conexion disponible (en linea)";
        badge.setAttribute("title", "El Service Worker esta activo. Puedes desconectarte y seguir usando la app.");
    } else {
        spanEl.textContent = "Sin conexion: usando contenido cacheado";
        badge.setAttribute("title", "Sin conexion. La app funciona con lo cacheado.");
    }
}
async function mostrarEstadoOfflineDisponible() {
    const badge = document.getElementById('estado-offline');
    if (!badge) return;
    badge.classList.remove('hidden');
    badge.classList.add('inline-flex');
    const spanEl = badge.querySelector('span');
    if (spanEl) spanEl.setAttribute('title', 'Modo sin conexión disponible');
}

async function registrarServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        console.warn('Service Worker no soportado en este navegador.');
        actualizarIndicadorConexion();
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
                    lanzarToast('Hay una nueva versión de Lumina lista para actualizar');

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

        mostrarEstadoOfflineDisponible();

        window.addEventListener('online', () => {
            console.log('Conexión restaurada.');
            actualizarIndicadorConexion();
        });

        window.addEventListener('offline', () => {
            console.log('Sin conexión. Usando cache.');
            actualizarIndicadorConexion();
        });

        actualizarIndicadorConexion();

        return true;
    } catch (error) {
        console.error('No se pudo registrar el Service Worker:', error);
        actualizarIndicadorConexion();
        return false;
    }
}

// --------------------------------------------------------------
// 11. INICIO
// --------------------------------------------------------------
window.onload = async () => {
    // Registramos Service Worker para modo sin conexión
    await registrarServiceWorker();

    cargarFavoritos();
    cargarNotasPersonales();
    cargarLeidos();
    inicializarIndice();
    poblarSelectoresRapidos();
    mostrarVista('vista-libros');
    
    document.getElementById('contenedor-versiculos').innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin mr-2"></i> Cargando la Palabra y la Tradición...</div>';
    await Promise.all([
        cargarBibliaJSON(),
        cargarComentariosJSON()
    ]);
    
    initDarkMode();

    const toggle = document.getElementById('toggle-concordancia');
    const saved = localStorage.getItem('lumina_concordancia');
    if (saved === 'true') {
        toggle.checked = true;
        concordanciaActiva = true;
    }
    toggle.addEventListener('change', () => {
        concordanciaActiva = toggle.checked;
        localStorage.setItem('lumina_concordancia', concordanciaActiva);
        if (libroActual && capituloActual) abrirLectura(capituloActual);
        else if (libroActual) abrirCapitulos(libroActual, obtenerCantidadCapitulos(libroActual));
    });

    document.getElementById('btn-favoritos').addEventListener('click', () => mostrarPanelFavoritos());

    const busquedaInput = document.getElementById('busqueda-input');
    const busquedaInputMovil = document.getElementById('busqueda-input-movil');
    const btnBuscarMovil = document.getElementById('btn-buscar-movil');
    const buscadorMovilDiv = document.getElementById('buscador-movil');
    btnBuscarMovil.addEventListener('click', () => {
        buscadorMovilDiv.classList.toggle('hidden');
        if (!buscadorMovilDiv.classList.contains('hidden')) busquedaInputMovil.focus();
    });
    const realizarBusqueda = () => {
        const termino = busquedaInput.value.trim() || busquedaInputMovil.value.trim();
        if (termino) mostrarResultadosBusqueda(termino);
    };
    busquedaInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') realizarBusqueda(); });
    busquedaInputMovil.addEventListener('keypress', (e) => { if (e.key === 'Enter') realizarBusqueda(); });

    const observer = setInterval(() => {
        if (datosBibliaCargados && indiceBusqueda.length === 0) {
            construirIndiceBusqueda();
            clearInterval(observer);
        }
    }, 500);

    verificarBienvenida();
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cerrarModalBienvenida();
            cerrarPanelLumina();
        }
    });


    // Listener para voces en m?viles (pueden cargarse de forma as?ncrona)
    if (navegadorSoportaLectura()) {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
            // Las voces se ha cargado, comentar aqué si necesitas debugging
            console.log('TTS Voces cargadas:', window.speechSynthesis.getVoices().length);
        };
    }
};

function compartirLumina() {
  // Verificamos si el celular soporta esta función nativa
  if (navigator.share) {
    navigator.share({
      title: 'Lumina - La Tradición Iluminando la Palabra',
      text: 'Estoy leyendo el Evangelio con los comentarios de los Padres de la Iglesia. ¡Te invito a descubrir Lumina!',
      url: 'https://nachomartinez1996.github.io/Lumina/' // Reemplazá con tu enlace real
    })
    .then(() => console.log('Gracias por compartir la Luz'))
    .catch((error) => console.log('Error al compartir', error));
  } else {
    // Plan B por si están en una compu vieja: copiar al portapapeles
    navigator.clipboard.writeText('https://nachomartinez1996.github.io/Lumina/');
    alert('¡Enlace copiado! Ya podés pegarlo y compartir la Luz.');
  }
}

// ========== SISTEMA DE RESALTADO PALABRA POR PALABRA ==========
// Variables globales para seguimiento de resaltado
let palabrasResaltables = [];
let indiceActualResaltado = 0;
let intervaloResaltado = null;
let tiempoInicioDiccion = 0;

// Función para preparar texto con IDs de palabras
function prepararPalabrasParaResaltado(texto) {
    const palabras = texto.split(/\s+/).filter(p => p.length > 0);
    palabrasResaltables = palabras;
    indiceActualResaltado = 0;
    return palabras;
}

// Función para limpiar resaltado anterior
function limpiarResaltadoAnterior() {
    document.querySelectorAll('.palabra-resaltada').forEach(el => {
        el.classList.remove('palabra-resaltada');
    });
    if (intervaloResaltado) {
        clearInterval(intervaloResaltado);
        intervaloResaltado = null;
    }
}

// Función para resaltar palabra por palabra basado en tiempo
function iniciarSincronizacionResaltado(duracionEstimada, elementoContenedor) {
    limpiarResaltadoAnterior();
    
    if (palabrasResaltables.length === 0) return;
    
    tiempoInicioDiccion = Date.now();
    const tiempoPorPalabra = (duracionEstimada * 1000) / palabrasResaltables.length;
    
    intervaloResaltado = setInterval(() => {
        const tiempoTranscurrido = Date.now() - tiempoInicioDiccion;
        const indiceNuevo = Math.floor(tiempoTranscurrido / tiempoPorPalabra);
        
        if (indiceNuevo >= palabrasResaltables.length) {
            clearInterval(intervaloResaltado);
            intervaloResaltado = null;
            limpiarResaltadoAnterior();
            return;
        }
        
        // Limpiar resaltado anterior
        document.querySelectorAll('.palabra-resaltada').forEach(el => {
            el.classList.remove('palabra-resaltada');
        });
        
        // Resaltar la palabra actual
        const elementosPalabra = buscarElementosPalabra(palabrasResaltables[indiceNuevo], elementoContenedor);
        elementosPalabra.forEach(el => {
            el.classList.add('palabra-resaltada');
        });
        
        indiceActualResaltado = indiceNuevo;
    }, 50);
}

// Función auxiliar para encontrar elementos de palabras en el DOM
function buscarElementosPalabra(palabra, contenedor) {
    const elementos = [];
    if (!contenedor) return elementos;
    
    // Buscar todos los nodos de texto
    const allNodes = contenedor.querySelectorAll('p, span, div');
    
    allNodes.forEach(nodo => {
        // Buscar la palabra en el texto del nodo
        const regex = new RegExp(`\\b${palabra.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        const matches = nodo.textContent.matchAll(regex);
        
        if (Array.from(matches).length > 0) {
            // Si el nodo ya está dividido en spans, buscar en esos spans
            const spans = nodo.querySelectorAll('span.palabra-highlight');
            spans.forEach(span => {
                if (span.textContent.toLowerCase() === palabra.toLowerCase()) {
                    elementos.push(span);
                }
            });
            
            // Si no hay spans, buscar directamente en el nodo
            if (spans.length === 0 && nodo.childNodes.length <= 1) {
                // Reemplazar el text content con spans
                const textNodes = Array.from(nodo.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
                textNodes.forEach(textNode => {
                    const html = textNode.textContent.replace(regex, `<span class="palabra-highlight">$&</span>`);
                    if (html !== textNode.textContent) {
                        const div = document.createElement('div');
                        div.innerHTML = html;
                        Array.from(div.childNodes).forEach(newNode => {
                            nodo.insertBefore(newNode, textNode);
                        });
                        nodo.removeChild(textNode);
                        
                        // Agregar los nuevos spans a elementos
                        nodo.querySelectorAll('span.palabra-highlight').forEach(span => {
                            if (span.textContent.toLowerCase() === palabra.toLowerCase()) {
                                elementos.push(span);
                            }
                        });
                    }
                });
            }
        }
    });
    
    return elementos;
}

// Registrar listener en utterance para sincronizar resaltado
function agregarSincronizacionAUtterance(utterance, duracionEstimada, libro, capitulo, nombreContenedor) {
    utterance.onstart = () => {
        const contenedor = document.getElementById(nombreContenedor) || document.getElementById('contenedor-versiculos');
        iniciarSincronizacionResaltado(duracionEstimada, contenedor);
    };
    
    utterance.onend = () => {
        limpiarResaltadoAnterior();
    };
    
    utterance.onerror = () => {
        limpiarResaltadoAnterior();
    };
    
    // Listener para boundary (cambio de palabra)
    utterance.onboundary = (event) => {
        if (event.name === 'word') {
            indiceActualResaltado++;
            if (indiceActualResaltado < palabrasResaltables.length) {
                // Actualizar resaltado si existe la palabra
                const contenedor = document.getElementById(nombreContenedor) || document.getElementById('contenedor-versiculos');
                document.querySelectorAll('.palabra-resaltada').forEach(el => {
                    el.classList.remove('palabra-resaltada');
                });
            }
        }
    };
}

// ========== FUNCIONES PARA RESALTAR VERSÍCULOS EN REPRODUCCIÓN ==========
function resaltarVersiculo(libro, capitulo, versiculo) {
    // Limpiar resaltado anterior
    limpiarResaltadoVersiculo();
    
    // Crear ID para la tarjeta del versículo
    const verseId = `verse_${libro}_${capitulo}_${versiculo}`;
    const verseCard = document.getElementById(verseId);
    
    if (verseCard) {
        verseCard.classList.add('verse-card-leyendo');
        versiculoActualEnLectura = { libro, capitulo, versiculo };
        
        // Scroll suave hacia el versículo si existe
        verseCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        console.warn(`Tarjeta de versículo no encontrada: ${verseId}`);
    }
}

function limpiarResaltadoVersiculo() {
    // Remover clase de todos los versículos
    document.querySelectorAll('.verse-card-leyendo').forEach(card => {
        card.classList.remove('verse-card-leyendo');
    });
    versiculoActualEnLectura = null;
}

function construirListaVersiculosCapitulo(libro, capitulo) {
    const versiculosObj = bibleContent[libro]?.[capitulo] || {};
    const numerosVersiculos = Object.keys(versiculosObj)
        .map(Number)
        .filter(v => v >= 1)
        .sort((a, b) => a - b);
    
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
        const numerosVersiculos = Object.keys(versiculosObj)
            .map(Number)
            .filter(v => v >= 1)
            .sort((a, b) => a - b);
        
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

// Función para calcular tiempos acumulativos de versículos basados en su longitud
function calcularTiemposAcumulativos(duracionEstimada) {
    tiemposAcumulativosVersiculos = [];
    
    if (listaVersiculosEnCapitulo.length === 0) return;
    
    // Calcular total de palabras en todos los versículos
    let totalPalabras = 0;
    const palabrasPorVersiculo = listaVersiculosEnCapitulo.map(v => {
        const palabras = v.texto.trim().split(/\s+/).length;
        totalPalabras += palabras;
        return palabras;
    });
    
    // Calcular tempo: ms por palabra
    const tempoMsPorPalabra = (duracionEstimada * 1000) / totalPalabras;
    
    // Calcular tiempos acumulativos
    let tiempoAcumulado = 0;
    palabrasPorVersiculo.forEach(palabras => {
        const tiempoVersiculo = palabras * tempoMsPorPalabra;
        tiempoAcumulado += tiempoVersiculo;
        tiemposAcumulativosVersiculos.push(tiempoAcumulado);
    });
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

function obtenerDatosBackupLumina() {
    const backup = {};

    for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);
        if (clave && clave.startsWith('lumina_')) {
            const valor = localStorage.getItem(clave);
            if (valor !== null) {
                backup[clave] = valor;
            }
        }
    }

    return backup;
}

function descargarBackupLumina(jsonBackup) {
    const blob = new Blob([jsonBackup], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    const fecha = new Date().toISOString().slice(0, 10);

    enlace.href = url;
    enlace.download = `lumina_backup_${fecha}.json`;
    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function exportarDatosLumina() {
    const backup = obtenerDatosBackupLumina();
    const claves = Object.keys(backup);

    if (claves.length === 0) {
        lanzarToast('No hay datos de Lumina para exportar todavía');
        return;
    }

    const jsonBackup = JSON.stringify(backup, null, 2);
    const fecha = new Date().toISOString().slice(0, 10);

    if (navigator.share) {
        try {
            const archivo = new File([jsonBackup], `lumina_backup_${fecha}.json`, { type: 'application/json' });

            if (navigator.canShare && navigator.canShare({ files: [archivo] })) {
                await navigator.share({
                    title: 'Mi respaldo de Lumina',
                    text: 'Copia de seguridad de mis datos de Lumina.',
                    files: [archivo]
                });
                lanzarToast('Respaldo de Lumina listo para compartir');
                return;
            }

            await navigator.share({
                title: 'Mi respaldo de Lumina',
                text: jsonBackup
            });
            lanzarToast('Respaldo de Lumina listo para compartir');
            return;
        } catch (error) {
            if (error && error.name === 'AbortError') return;
            console.log('Error al compartir respaldo:', error);
        }
    }

    descargarBackupLumina(jsonBackup);
    lanzarToast('Respaldo de Lumina descargado');
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
                .filter(nombre => nombre.startsWith('lumina-cache-'))
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

function importarProgreso(evento) {
    const archivo = evento.target.files?.[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = function(e) {
        try {
            const datosRestaurados = JSON.parse(e.target.result);

            if (!datosRestaurados || typeof datosRestaurados !== 'object' || Array.isArray(datosRestaurados)) {
                throw new Error('Formato inválido');
            }

            const claves = Object.keys(datosRestaurados).filter(clave => clave.startsWith('lumina_'));
            if (claves.length === 0) {
                throw new Error('Sin claves válidas');
            }

            claves.forEach(clave => {
                localStorage.setItem(clave, datosRestaurados[clave]);
            });

            alert('¡Tu progreso de Lumina ha sido restaurado con éxito! Recargando la página...');
            window.location.reload();
        } catch (error) {
            alert('Mmm... Parece que el archivo está corrupto o no es un backup válido.');
        }
    };

    lector.readAsText(archivo);
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
        const clavesLumina = [];
        for (let i = 0; i < localStorage.length; i++) {
            const clave = localStorage.key(i);
            if (clave && clave.startsWith('lumina_')) {
                clavesLumina.push(clave);
            }
        }

        clavesLumina.forEach(clave => localStorage.removeItem(clave));

        notasPersonales = {};
        favoritos = new Set();
        leidos = new Set();
        concordanciaActiva = false;
        bibliaCompletaCelebrada = false;
        marcarNuevaVersionLuminaDisponible(false);

        if ('caches' in window) {
            const cachesLumina = await caches.keys();
            await Promise.all(
                cachesLumina
                    .filter(nombre => nombre.startsWith('lumina-cache-'))
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

