const fs = require('fs');
const path = require('path');

function extractLogs(logFile, date) {
    const outputDir = "../output";
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    const outputFile = path.join(outputDir, `output_${date}.txt`);
    const readStream = fs.createReadStream(logFile, { encoding: 'utf-8' });
    const writeStream = fs.createWriteStream(outputFile, { encoding: 'utf-8' });

    readStream.on('data', chunk => {
        const lines = chunk.split('\n');
        lines.forEach(line => {
            if (line.startsWith(date)) {
                writeStream.write(line + '\n');
            }
        });
    });

    readStream.on('end', () => {
        console.log(`Logs for ${date} saved in ${outputFile}`);
    });

    readStream.on('error', err => {
        console.error(`Error reading file: ${err.message}`);
    });
}

if (process.argv.length !== 4) {
    console.log("Usage: node extract_logs.js <log_file_path> <YYYY-MM-DD>");
    process.exit(1);
}

const logFilePath = process.argv[2];
const searchDate = process.argv[3];
extractLogs(logFilePath, searchDate);
