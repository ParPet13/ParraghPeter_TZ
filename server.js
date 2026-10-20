import express from 'express';
import mysql2 from 'mysql2';

const app = express();
app.use(express.json());
const con = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '',
    port: process.env.port || 3307  
})

app.get('/', (req, res) => {
    res.status(200).send('Működik a szerver!')    
})
app.listen(process.env.port || 3000), () => {
    console.log('A szerver a 3000-es porton fut');
}