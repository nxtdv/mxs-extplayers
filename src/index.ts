import * as fs from 'fs';

interface Player {
    uid: number;
    name: string;
    number: number;
}

function extractPlayers(data: string): Player[] {
    const players: Player[] = [];
    const lines = data.split('\n');
    let currentPlayer: Partial<Player> = {};

    for (const line of lines) {
        if (line.startsWith('players:')) {
            currentPlayer = {};
            continue;
        }

        if (line.startsWith('slot=')) {
            if (currentPlayer.uid && currentPlayer.name && currentPlayer.number) {
                players.push(currentPlayer as Player);
            }
            currentPlayer = {};
        }

        if (line.startsWith('uid=')) {
            currentPlayer.uid = parseInt(line.split('=')[1].trim(), 10);
        } else if (line.startsWith('name=')) {
            currentPlayer.name = line.split('=')[1].trim();
        } else if (line.startsWith('number=')) {
            currentPlayer.number = parseInt(line.split('=')[1].trim(), 10);
        }
    }

    if (currentPlayer.uid && currentPlayer.name && currentPlayer.number) {
        players.push(currentPlayer as Player);
    }

    return players;
}

function playersToCSV(players: Player[]): string {
    const headers = "uid,name,number";
    const rows = players.map(player => `${player.uid},${player.name},${player.number}`);
    return [headers, ...rows].join('\n');
}

function saveCSVToFile(filename: string, csvContent: string): void {
    fs.writeFileSync(filename, csvContent, 'utf8');
}

async function main() {
    try {
        const url = 'http://mxsim.fr/results/MXSEMFQUALSERV19812.txt';

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.text();
        const players = extractPlayers(data);
        const csvContent = playersToCSV(players);
        saveCSVToFile('players.csv', csvContent);

        console.log("CSV file 'players.csv' has been created.");
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

main();