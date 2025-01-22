const fs = require('fs');
const path = require('path');

// Buat folder logs jika belum ada
const logDirectory = path.join(__dirname, '../logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const { method, originalUrl, body, params, query } = req;
    
    const logData = {
        timestamp,
        method,
        endpoint: originalUrl,
        body: method !== 'GET' ? body : undefined,
        params,
        query
    };

    // Format log entry
    const logEntry = `[${timestamp}] ${method} ${originalUrl}\n` +
        `Parameters: ${JSON.stringify(params)}\n` +
        `Query: ${JSON.stringify(query)}\n` +
        `Body: ${JSON.stringify(body)}\n` +
        '-'.repeat(80) + '\n';

    // Write to daily log file
    const today = new Date().toISOString().split('T')[0];
    const logFile = path.join(logDirectory, `${today}.log`);

    fs.appendFile(logFile, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    // Capture response
    const originalSend = res.send;
    res.send = function (body) {
        const responseLogEntry = `Response [${timestamp}] ${method} ${originalUrl}\n` +
            `Status: ${res.statusCode}\n` +
            `Body: ${JSON.stringify(body)}\n` +
            '-'.repeat(80) + '\n';

        fs.appendFile(logFile, responseLogEntry, (err) => {
            if (err) {
                console.error('Error writing response to log file:', err);
            }
        });

        originalSend.apply(res, arguments);
    };

    next();
};

module.exports = requestLogger; 