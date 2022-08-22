import i18n from 'i18n';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

i18n.configure({
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  queryParameter: 'lang',
  directory: path.join(__dirname, './locales'),
  syncFiles: false,
  autoReload: true,
});

export default i18n;
