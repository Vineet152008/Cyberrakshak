import fs from 'fs';
import path from 'path';

const localesDir = path.resolve('src/i18n/locales');

const homeAdditions = {
  en: {
    atlasTriggersTitle: "Common Deceptive Triggers",
    atlasProtocolTitle: "Immediate Safety Protocol",
    closeModal: "Close",
  },
  hi: {
    atlasTriggersTitle: "सामान्य धोखेबाज़ी के संकेत",
    atlasProtocolTitle: "तत्काल आवश्यक सुरक्षा कदम",
    closeModal: "बंद करें",
  },
  mr: {
    atlasTriggersTitle: "फसवणुकीचे सामान्य संकेत",
    atlasProtocolTitle: "तातडीने आवश्यक सुरक्षा उपाय",
    closeModal: "बंद करा",
  },
};

for (const lang of ['en', 'hi', 'mr'] as const) {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  data.home = { ...data.home, ...homeAdditions[lang] };
  data.common = { ...data.common, closeModal: homeAdditions[lang].closeModal };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

console.log('Successfully updated home and common keys across all main locale files.');
