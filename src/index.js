"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("node:fs");
// Fonction pour extraire les joueurs d'une chaîne donnée
function extractPlayers(data) {
    var players = [];
    var lines = data.split('\n');
    var isPlayerSection = false;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        if (line.startsWith('players:')) {
            isPlayerSection = true;
            continue;
        }
        if (isPlayerSection) {
            if (line.trim() === '') {
                // Fin de la section des joueurs
                break;
            }
            var player = {};
            if (line.startsWith('uid=')) {
                player.uid = parseInt(line.split('=')[1].trim(), 10);
            }
            else if (line.startsWith('name=')) {
                player.name = line.split('=')[1].trim();
            }
            else if (line.startsWith('number=')) {
                player.number = parseInt(line.split('=')[1].trim(), 10);
            }
            if (player.uid !== undefined && player.name !== undefined && player.number !== undefined) {
                players.push(player);
            }
        }
    }
    return players;
}
// Fonction pour convertir un tableau de joueurs en format CSV
function playersToCSV(players) {
    var headers = "uid,name,number";
    var rows = players.map(function (player) { return "".concat(player.uid, ",").concat(player.name, ",").concat(player.number); });
    return __spreadArray([headers], rows, true).join('\n');
}
// Fonction pour écrire le CSV dans un fichier
function saveCSVToFile(filename, csvContent) {
    fs.writeFileSync(filename, csvContent, 'utf8');
}
// Exemple de chaîne de données
var data = "\ndir=sx2024MXSEMFrd17\nlongname=2024 MXSEMF Supercross - rd17 Salt lake City\nfirstlap=24\nnormallap=34\nhash=faee5e2b5f1eda80b80ed89d7359fb55e6ea4a0f\nholeshotindex=3\ntime=76800\nlaps=1\nstarttime=1819\ndate=1716317445\nplayers:\nslot=0\nuid=50553\nnumber=489\nbike=250sxf(2018)\nname=Dex vd Broek | MTMD\nslot=1\nuid=10163\nnumber=615\nbike=crf450(2018)\nname=Brady White | ENK Racing\nslot=4\nuid=49122\nnumber=51\nbike=250sxf(2018)\nname=Axel Halle | BScrew\ntimes:\n1 0 1931\n1 1 2612\n1 2 2901\n0 0 2953\n1 3 3224\n1 4 3449\n0 1 3740\n1 5 3789\n0 2 4037\n1 6 4073\n0 3 4306\n1 7 4350\n1 8 4561\n0 4 4600\n1 9 4728\n0 5 5127\n1 10 5134\n1 11 5301\n0 6 5417\n1 12 5517\n0 7 5597\n1 13 5610\n1 14 5790\n0 8 5862\n1 15 5963\n0 9 6041\n1 16 6146\n1 17 6316\n0 10 6465\n1 18 6466\n0 11 6650\n1 19 6658\n0 12 6817\n0 13 6921\n1 20 6928\n0 14 7116\n1 21 7239\n0 15 7291\n0 16 7484\n0 17 7662\n0 18 7798\n0 19 7998\n0 20 8280\n0 21 8597\n";
// Exécution de l'extraction et sauvegarde en CSV
var players = extractPlayers(data);
var csvContent = playersToCSV(players);
saveCSVToFile('players.csv', csvContent);
console.log("CSV file 'players.csv' has been created.");
