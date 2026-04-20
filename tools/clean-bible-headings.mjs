import fs from 'node:fs';
import path from 'node:path';

const EXCLUDED_REFS = new Set([
  'HECHOS DE LOS APOSTOLES|25|11'
]);

const BOUNDARIES = ['. ', '! ', '? ', '" ', '\u00bb ', '\u201d '];

const ARTICLE_STARTERS = new Set(['el', 'la', 'los', 'las']);

const NON_ARTICLE_STARTERS = new Set([
  'desde', 'contra', 'oraculo', 'oraculos', 'invectiva', 'lamentacion',
  'apocalipsis', 'encuentro', 'renovacion', 'ofrecimiento', 'apendice',
  'resumen', 'instrucciones', 'elogio', 'vocacion', 'muerte', 'destruccion',
  'amenazas', 'advertencia', 'advertencias', 'celebracion', 'promesas',
  'prescripciones', 'reglas', 'leyes', 'obligaciones', 'deberes',
  'indicaciones', 'perspectivas', 'preparativos', 'intervencion',
  'conclusion', 'invitacion', 'castigo', 'anuncio', 'otra', 'otro', 'otras',
  'otros', 'nuevo', 'nueva', 'nuevas', 'segundo', 'segunda', 'tercera',
  'ultimo', 'ultimas', 'colaboracion', 'recapitulacion', 'fracaso',
  'conquistas', 'reproches', 'presagio', 'derrota', 'persecucion',
  'propuesta', 'rebelion', 'tentativas', 'venganza', 'fundacion', 'samuel',
  'sanson', 'david', 'absalon', 'jonatan', 'caleb', 'abram', 'isaac', 'esau',
  'jose', 'aaron', 'josue'
]);

const ARTICLE_SECOND_WORDS = new Set([
  'muerte', 'ofrenda', 'encuentro', 'sacrificio', 'alianza', 'castigo',
  'ciudades', 'tribu', 'sacrificios', 'llegada', 'intervencion', 'invasion',
  'anuncio', 'descendientes', 'intercesion', 'fiesta', 'animales', 'hijos',
  'preparativos', 'celebracion', 'victoria', 'arca', 'derechos', 'respuesta',
  'conquista', 'derrota', 'fin', 'rescate', 'destruccion', 'primer', 'reyes',
  'segundo', 'familia', 'temor', 'huida', 'regreso', 'oracion', 'gloria',
  'construccion', 'altar', 'lepra', 'ley', 'derecho', 'bendicion', 'reparto',
  'guerra', 'asesinato', 'origen', 'sueno', 'otros', 'venganza',
  'nacimiento', 'mision', 'revelacion', 'circuncision', 'queja', 'pascua',
  'partida', 'panes', 'paso', 'mana', 'tapa', 'mesa', 'candelabro',
  'armazon', 'velo', 'cortina', 'cortinado', 'efod', 'pectoral', 'manto',
  'vestiduras', 'ofrendas', 'investidura', 'banquete', 'fuente', 'manchas',
  'dia', 'casas', 'diezmos', 'eleccion', 'censo', 'elogio', 'indignacion',
  'expiacion', 'diezmo', 'jueces', 'profetas', 'matrimonio', 'hijo', 'pacto',
  'descubrimiento', 'suplica', 'ruptura', 'desobediencia', 'pedido',
  'reinado', 'reaccion', 'sabiduria', 'reclutamiento', 'ciclo', 'juicio',
  'reforma', 'retorno', 'ciudad', 'comienzo', 'inundacion', 'salida',
  'renovacion', 'expulsion', 'pozos', 'esposas', 'viaje', 'otro',
  'enriquecimiento', 'persecucion', 'lucha', 'separacion', 'incesto',
  'emigracion', 'clanes', 'rostro', 'teofania', 'holocausto', 'impuesto',
  'incienso', 'convocatoria', 'suspension', 'ejecucion', 'ingreso',
  'realizacion', 'vara', 'uso', 'serpiente', 'lectura', 'extension',
  'humillacion', 'paz', 'parabola', 'salvacion', 'crecimiento', 'clamor',
  'marcha', 'organizacion', 'legislacion', 'gratuidad', 'fidelidad',
  'proteccion', 'prohibicion'
]);

const STARTER_DISQUALIFIERS = new Set([
  'pero', 'porque', 'por', 'pues', 'asi', 'entonces', 'luego', 'despues',
  'mientras', 'cuando', 'todos', 'todas', 'ellos', 'ellas', 'nosotros',
  'ustedes', 'tu', 'mi', 'mis', 'su', 'sus', 'se', 'lo', 'a', 'que', 'de',
  'quien', 'sean'
]);

const SENTENCE_WORDS = new Set([
  'es', 'son', 'era', 'eran', 'fue', 'fueron', 'sera', 'seran', 'habra', 'hay',
  'haya', 'esta', 'estan', 'estaba', 'estaban', 'estara', 'estaran', 'tenia',
  'tenian', 'tiene', 'tienen', 'tuvo', 'tuvieron', 'hizo', 'hicieron', 'dijo',
  'dijeron', 'respondio', 'respondieron', 'ira', 'iran', 'iba', 'iban', 'va',
  'van', 'viva', 'vivo', 'viven', 'conocias', 'conoce', 'conocen', 'conocia',
  'acompanaban', 'comprenderan', 'envio', 'siente', 'ama', 'hace', 'hara',
  'podra', 'podran', 'quiere', 'quieren', 'detestas', 'acuden', 'confias',
  'conoces', 'brotaran', 'te', 'me'
]);

function normalizeWord(token) {
  return String(token || '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/^[^\p{L}\p{N}-]+|[^\p{L}\p{N}.\-]+$/gu, '')
    .toLowerCase();
}

function isTitleLike(tail) {
  const text = String(tail || '').trim();
  if (!text || text.length > 140) return false;
  if (/[,:;()]/u.test(text)) return false;
  if (/[.]$/u.test(text)) return false;
  if (/[«»"“”]/u.test(text)) return false;
  if (/^[¿¡]/u.test(text)) return false;
  if (/^[\-–—]/u.test(text)) return false;
  if (/[\-–—]$/u.test(text)) return false;

  const words = text.split(/\s+/).filter(Boolean);
  if (words.length < 2 || words.length > 18) return false;

  const first = normalizeWord(words[0]);
  if (STARTER_DISQUALIFIERS.has(first)) return false;

  const normalizedWords = words.map(normalizeWord).filter(Boolean);
  if (normalizedWords.some((word) => SENTENCE_WORDS.has(word))) return false;

  if (ARTICLE_STARTERS.has(first)) {
    const second = normalizedWords[1];
    if (second === 'dia' && !normalizedWords.includes('de') && !normalizedWords.includes('del')) {
      return false;
    }
    return ARTICLE_SECOND_WORDS.has(second);
  }

  return NON_ARTICLE_STARTERS.has(first);
}

function extractTail(text) {
  let bestIndex = -1;
  let bestLength = 0;

  for (const marker of BOUNDARIES) {
    const index = text.lastIndexOf(marker);
    if (index > bestIndex) {
      bestIndex = index;
      bestLength = marker.length;
    }
  }

  if (bestIndex === -1) return '';
  return text.slice(bestIndex + bestLength).trim();
}

function getFirstLetter(text) {
  const cleaned = String(text || '').trim().replace(/^[«»"“”'([{¿¡\-–—\s]+/u, '');
  const match = cleaned.match(/\p{L}/u);
  return match ? match[0] : '';
}

function detectHeading(record, nextRecord) {
  const text = String(record?.Texto || '').trim();
  if (!text) return null;

  const tail = extractTail(text);
  if (!isTitleLike(tail)) return null;

  const reference = `${record.Libro}|${record.Capitulo}|${record.Versiculo}`;
  if (EXCLUDED_REFS.has(reference)) return null;

  const nextFirstLetter = getFirstLetter(nextRecord?.Texto || '');
  if (/^\p{Ll}$/u.test(nextFirstLetter)) return null;

  const newText = text.slice(0, text.length - tail.length).trimEnd();
  if (!newText || newText === text) return null;

  return {
    reference,
    tail,
    newText
  };
}

function loadBible(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function cleanBible(data) {
  const changes = [];

  for (let index = 0; index < data.length; index += 1) {
    const record = data[index];
    const detection = detectHeading(record, data[index + 1]);
    if (!detection) continue;

    changes.push({
      libro: record.Libro,
      capitulo: record.Capitulo,
      versiculo: record.Versiculo,
      removed: detection.tail,
      before: record.Texto,
      after: detection.newText
    });

    record.Texto = detection.newText;
  }

  return changes;
}

function getArgs(argv) {
  const args = {
    file: path.resolve('Biblia_Catolica_Completa.json'),
    write: false,
    limit: 200
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    if (current === '--write') {
      args.write = true;
      continue;
    }
    if (current === '--file' && argv[index + 1]) {
      args.file = path.resolve(argv[index + 1]);
      index += 1;
      continue;
    }
    if (current === '--limit' && argv[index + 1]) {
      const parsed = Number.parseInt(argv[index + 1], 10);
      if (Number.isFinite(parsed) && parsed > 0) args.limit = parsed;
      index += 1;
    }
  }

  return args;
}

function main() {
  const args = getArgs(process.argv.slice(2));
  const data = loadBible(args.file);
  const changes = cleanBible(data);

  console.log(`Archivo: ${args.file}`);
  console.log(`Titulos detectados: ${changes.length}`);

  for (const change of changes.slice(0, args.limit)) {
    console.log(
      `${change.libro} ${change.capitulo},${change.versiculo} -> ${change.removed}`
    );
  }

  if (!args.write) return;

  fs.writeFileSync(args.file, `${JSON.stringify(data, null, 4)}\n`, 'utf8');
  console.log('Archivo actualizado.');
}

main();
