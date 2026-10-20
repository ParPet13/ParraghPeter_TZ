import express, { json } from 'express';
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

app.get('/termekek', (req, res) => {
    con.query('Select id,nev,ar,keszlet,elerheto,kategoriak.kategoria_nev from termekek,kategoriak INNER join termekek on termekek.kategoria_id = kategoriak.id order by ar ASC')
    res.status(200).send(res.json)    
})
app.get('/termekek/elerheto', (req, res) => {
    con.query('Select id, kategoria_id,nev,ar,keszlet,elerheto,kategoria_nev from termekek,kategoriak INNER join termekek on termekek.kategoria_id = kategoriak.id where elerheto = 1 AND keszlet > 0 ')
    res.status(200).send(res.json) 
})
app.get('/termekek/kereses/:szoveg', (req, res) => {
    con.query('Select id, kategoria_nev,COUNT(keszlet) as "termekek_szama" AVG(ar) from termekek,kategoriak INNER join termekek on termekek.kategoria_id = kategoriak.id ')
    res.status(200).send(res.json)     
})
app.get('/kategoriak/statisztika', (req, res) => {
    con.query("Select id, kategoria_nev,COUNT(keszlet) as termekek_szama AVG(ar) from termekek,kategoriak INNER join termekek on termekek.kategoria_id = kategoriak.id" )
    res.status(200).send(res.json)   
})
app.get('/termekek/dragak', (req, res) => {
    con.query("Select nev, ar, keszlet from termekek where ar >= 10000 order by keszlet DESC")
    res.status(200).send(res.json)   
})
app.listen(process.env.port || 3000), () => {
    console.log('A szerver a 3000-es porton fut');
}