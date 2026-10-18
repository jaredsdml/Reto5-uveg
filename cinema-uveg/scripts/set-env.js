// Genera src/environments/environment.ts con el token de TMDB.
// El token se toma de la variable de entorno TMDB_TOKEN (Vercel) o del archivo .env (local).
const fs = require('fs');

let token = process.env.TMDB_TOKEN || '';

if (!token && fs.existsSync('.env')) {
  const linea = fs.readFileSync('.env', 'utf8').split(/\r?\n/).find((l) => l.startsWith('TMDB_TOKEN='));
  if (linea) token = linea.slice('TMDB_TOKEN='.length).trim();
}

if (!token) {
  console.warn('Aviso: no se encontró TMDB_TOKEN, las peticiones al API fallarán.');
}

fs.mkdirSync('src/environments', { recursive: true });
fs.writeFileSync('src/environments/environment.ts', `export const environment = {\n  tmdbToken: '${token}',\n};\n`);