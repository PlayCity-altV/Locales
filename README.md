# Localization for Play City Server

This repository contains localization files for the Play City server. Here you will find translation files for different languages, as well as a tool to check the correctness of the localization.

## How to Add Your Language

You can contribute to the localization by adding a `[locale_code].json` file to the `translations` folder. Here, `[locale_code]` represents the language code according to ISO 639-1 (e.g., `en` for English, `fr` for French, etc.). Create a translation file for your language and save it in the appropriate directory.

## Creating a Pull Request

After adding the translation file for your language, create a Pull Request to have your translation merged into the main repository branch. Our team will review your Pull Request and provide any necessary feedback or suggestions.

## Localization Checking

The `checker.js` script in the `scripts` folder is a Node.js script designed to check the localization. You can run it using the command `node checker.js` to see missing or incorrectly placed localization keys in the translation files.

## Acknowledgements

We appreciate your interest and contribution to the localization of the Play City server. Thank you for helping make our server accessible to people of different languages! If you have any questions or suggestions, please feel free to reach out to us.
