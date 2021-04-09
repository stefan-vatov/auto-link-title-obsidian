/* eslint-disable */
const path = require('path');
const fs = require('fs');
/* eslint-enable */

const obsidianVersionFile = path.join(__dirname, '..', '.obsidian.json');
const manifestFile = path.join(__dirname, '..', 'manifest.json');
const versionsFile = path.join(__dirname, '..', 'versions.json');

const newVersion = process.argv[2];

const read = filename => fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });
const write = (filename, text) => fs.writeFileSync(filename, text, { encoding: 'utf8', flag: 'w' });

const obsidianVersion = JSON.parse(read(obsidianVersionFile)).version;
const manifest = JSON.parse(read(manifestFile));
const versions = JSON.parse(read(versionsFile));

const newManifest = { ...manifest, version: newVersion, minAppVersion: obsidianVersion };
const newVersions = { [newVersion]: obsidianVersion, ...versions };

write(manifestFile, JSON.stringify(newManifest, null, 2));
write(versionsFile, JSON.stringify(newVersions, null, 2));
