// GitHub Pages serves 404.html for unknown paths; making it a copy of index.html
// lets direct links like /paketler or /rehberler/... open the right page.
import { copyFileSync } from 'node:fs';
copyFileSync('dist/index.html', 'dist/404.html');
console.log('dist/404.html created');
