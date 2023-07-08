import fs from 'fs';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.chdir(__dirname);

const baseLocale = 'en';
const translationsDir = '../translations';
const baseLocaleFile = path.join(translationsDir, `${baseLocale}.json`);
const baseTranslations = JSON.parse(fs.readFileSync(baseLocaleFile, 'utf8'));

fs.readdirSync(translationsDir)
    .filter((file) => file !== `${baseLocale}.json`)
    .forEach((file) => {
        const locale = file.split('.')[0];
        const localeFile = path.join(translationsDir, file);
        const translations = JSON.parse(fs.readFileSync(localeFile, 'utf8'));

        const missingKeys = findMissingKeys(baseTranslations, translations, '');
        const misplacedKeys = findMisplacedKeys(baseTranslations, translations, '');

        if (missingKeys.length > 0 || misplacedKeys.length > 0) {
            console.log(`File: ${locale}.json`);
            if (missingKeys.length > 0) {
                console.log('Missing keys:');
                console.log(missingKeys);
            }

            if (misplacedKeys.length > 0) {
                console.log(`Incorrect key order:`);
                console.log(misplacedKeys);
            }
            console.log('\n---------------------\n');
        }
    });

function findMissingKeys(baseObj, compareObj, prefix) {
    let missingKeys = [];

    for (const key in baseObj) {
        const baseValue = baseObj[key];
        const compareValue = compareObj[key];

        if (compareValue === undefined) {
            const missingKey = prefix ? `${prefix}.${key}` : key;
            missingKeys.push(missingKey);
        } else if (typeof baseValue === 'object' && typeof compareValue === 'object') {
            const nestedPrefix = prefix ? `${prefix}.${key}` : key;
            const nestedMissingKeys = findMissingKeys(baseValue, compareValue, nestedPrefix);
            missingKeys = missingKeys.concat(nestedMissingKeys);
        }
    }

    return missingKeys;
}

function findMisplacedKeys(baseObj, compareObj, prefix) {
    const baseKeys = Object.keys(baseObj);
    const compareKeys = Object.keys(compareObj);

    let misplacedKeys = [];

    for (let i = 0; i < baseKeys.length; i++) {
        const baseKey = baseKeys[i];
        const compareKey = compareKeys[i];

        if (baseKey !== compareKey) {
            const misplacedKey = prefix ? `${prefix}.${baseKey}` : baseKey;
            misplacedKeys.push(misplacedKey);
        } else {
            const baseValue = baseObj[baseKey];
            const compareValue = compareObj[compareKey];

            if (typeof baseValue === 'object' && typeof compareValue === 'object') {
                const nestedPrefix = prefix ? `${prefix}.${baseKey}` : baseKey;
                const nestedMisplacedKeys = findMisplacedKeys(baseValue, compareValue, nestedPrefix);
                misplacedKeys = misplacedKeys.concat(nestedMisplacedKeys);
            }
        }
    }

    return misplacedKeys;
}
