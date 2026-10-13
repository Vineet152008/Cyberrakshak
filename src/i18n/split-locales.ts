import fs from 'fs';
import path from 'path';

const localesDir = path.resolve('src/i18n/locales');
const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf-8'));
const hi = JSON.parse(fs.readFileSync(path.join(localesDir, 'hi.json'), 'utf-8'));
const mr = JSON.parse(fs.readFileSync(path.join(localesDir, 'mr.json'), 'utf-8'));

const namespaces: Record<string, string[]> = {
  common: ['nav', 'brand', 'footer', 'resources', 'common'],
  home: ['hero', 'radar', 'atlas', 'scams', 'home'],
  emergency: ['emergency'],
  scamLab: ['scamLab', 'scamLabMeta'],
  checker: ['checker'],
  academy: ['academy'],
  toolkit: ['toolkit'],
};

for (const [ns, keys] of Object.entries(namespaces)) {
  const targetDir = path.join(localesDir, ns);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const enSlice: Record<string, unknown> = {};
  const hiSlice: Record<string, unknown> = {};
  const mrSlice: Record<string, unknown> = {};

  for (const k of keys) {
    if (en[k]) enSlice[k] = en[k];
    if (hi[k]) hiSlice[k] = hi[k];
    if (mr[k]) mrSlice[k] = mr[k];
  }

  fs.writeFileSync(path.join(targetDir, 'en.json'), JSON.stringify(enSlice, null, 2), 'utf-8');
  fs.writeFileSync(path.join(targetDir, 'hi.json'), JSON.stringify(hiSlice, null, 2), 'utf-8');
  fs.writeFileSync(path.join(targetDir, 'mr.json'), JSON.stringify(mrSlice, null, 2), 'utf-8');
}

console.log('Successfully regenerated all namespace slice files including academy and toolkit.');
