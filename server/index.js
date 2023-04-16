const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const http = require('http');
const qs = require('querystring');
const WebSocket = require('ws');
const { error } = require('console');

const app = express();

// Data comming from node mcu --
// Enable CORS
app.use(cors());

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());

// Connect to mysql 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sda-2023',
    port: 3306,
    database: 'SmartAgri'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
});

// Endpoint for handling sign-in requests
app.post('/api/signin', (req, res) => {
    const { username, password } = req.body;

    connection.query('select password from users where username=? or mail=?;', [username, username], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            var hashedPass = results[0]['password'];
            const verified = await bcrypt.compare(password, hashedPass);
            if (verified) {
                console.log("user-signined");
                res.json({
                    success: true,
                    message: 'signin-success'
                });
            } else {
                res.json({
                    success: false,
                    message: 'Invalid-username-password'
                });
            }

        }
    })
});

app.post('/api/signup', (req, res) => {
    const { Fname, Lname, mail, username, password } = req.body;

    connection.query('select mail from users where mail = ?', [mail], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            // return res.render('register', {
            //     message: "That mail is already in use!!"
            // })
            console.log("mail is already in use")
        }

        let hashedPass = await bcrypt.hash(password, 8);
        console.log(hashedPass);

        connection.query('insert into users set ?', { Fname: Fname, Lname: Lname, mail: mail, username: username, password: hashedPass }, (error, results) => {
            if (error) {
                console.log(error);
                res.status(401).json({
                    success: false,
                    message: 'Error'
                });
            } else {
                // res.render('register', {
                //     message: "user-registed"
                // })
                console.log("user-registed");
                res.json({
                    success: true,
                    token: 'signin-token',
                    message: 'user-registed'
                });
            }
        })
    })
});

app.post('/sensorApi', (req, res) => {
    // const data = req.body;
    // console.log(data);
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const postData = qs.parse(body);
            var temperature = parseFloat(postData.dhtTemp);
            var humidity = parseFloat(postData.dhtHum);
            var SoilMoisture = parseFloat(postData.SoilMoisture);
            var SoilTemp = parseFloat(postData.soilTemp)
            if(postData.isRain === "false") { var isRain = false } else { var isRain = true }
            var sensor_id = 01;
            // console.log(temperature + " " + humidity);
            const now = new Date();
            const offset = now.getTimezoneOffset() * 60 * 1000; // Convert the time zone offset to milliseconds
            const readingTime = new Date(now.getTime() - offset).toISOString().slice(0, 19).replace('T', ' ');
            connection.query('insert into SmartAgri.DHT set ?', { temperature: temperature, humidity: humidity, reading_time: readingTime }, (error, results) => {
                if (error) {
                    console.log(error);
                }
            })
            connection.query('INSERT INTO SoilMoisture set ?;', { sensor_id: sensor_id, value: SoilMoisture, reading_time: readingTime }, (error, results) => { 
                if (error) {
                    console.log(error);
                }
            })
            connection.query('INSERT INTO RainSensor set ?;', { isRain: isRain, reading_time: readingTime }, (error, results) => {
                if (error) {
                    console.log(error);
                }
            }) 
            connection.query('INSERT INTO SoilTempSensor set ?;', { temp: SoilTemp, reading_time: readingTime }, (error, results) => {
                if (error) {
                    console.log(error);
                }
            }) 
            // process the received data as needed 
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Data received successfully\n'); 
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Invalid request\n');
    }
});


app.post('/sensorApi/data', (req, res) => {
    const token = req.body.token;
    connection.query('SELECT * FROM DHT ORDER BY reading_time DESC LIMIT 1;', async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            var temperature = results[0]['temperature'];
            var humidity = results[0]['humidity'];
            var readingTime = results[0]['reading_time'];
            var lastupdate = readingTime.toISOString().slice(0, 19).replace('T', ' ');
            // console.log(lastupdate);
            res.json({
                success: true,
                temperature: temperature,
                humidity: humidity,
                lastUpdate: lastupdate
            });
        }
    });
});

app.post('/sensorApi/SoilMoisture', (req, res) => {
    let token = req.body.token;
    connection.query('SELECT value, reading_time FROM SoilMoisture ORDER BY reading_time DESC LIMIT 1', async (error, results) => {
        if (error) {
            console.log(error);
        } 
        if (results.length > 0) {
            var SoilMoistureVal = results[0]['value'];
            var readingTime = results[0]['reading_time'];
            var lastupdate = readingTime.toISOString().slice(0, 19).replace('T', ' ');
            res.json({
                success: true,
                value: SoilMoistureVal,
                lastUpdate: lastupdate
            });
        }
    });
});


app.post('/sensorApi/isRain', (req, res) => {
    let token = req.body.token;
    connection.query('SELECT isRain, reading_time FROM RainSensor ORDER BY id DESC LIMIT 1;', async (error, results) => {
        if (error) {
            console.log(error);
        } 
        if (results.length > 0) {
            var isRain = results[0]['isRain'];
            var readindTime = results[0]['reading_time'];
            var lastupdate = readindTime.toISOString().slice(0, 19).replace('T', ' ');
            // console.log(isRain);
            res.json({
                success: true,
                isRain: isRain,
                lastUpdate: lastupdate
            });
        }
    });
});

app.post('/sensorApi/send/soilTemp', (req, res) => {
    let token = req.body.token;
    connection.query('SELECT temp, reading_time FROM SoilTempSensor ORDER BY id DESC LIMIT 1;', async (error, results) => {
        if (error) {
            console.log(error);
        } 
        if (results.length > 0) {
            var Temp = results[0]['temp'];
            var readingTime = results[0]['reading_time'];
            var lastupdate = readingTime.toISOString().slice(0, 19).replace('T', ' ');
            res.json({
                success: true,
                value: Temp,
                lastUpdate: lastupdate
            });
        }
    });
});

// Start the server
app.listen(3002, () => {
    console.log('Server listening on port 3002');
});
