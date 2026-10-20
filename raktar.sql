Create Database raktarok
default character set utf8
collate utf8_hungarian_Ci

CREATE TABLE kategoriak(
    id int PRIMARY KEY AUTO_INCREMENT,
    nev varchar(50) not null UNIQUE
);
CREATE TABLE termekek(
    id int PRIMARY KEY AUTO_INCREMENT,
    kategoria_id int,
    CONSTRAINT fk_kategoriaID FOREIGN KEY kategoria_id REFERENCES kategoriak(id),
    nev varchar(100) not null,
    ar int not null,
    keszlet int not null,
    elerheto boolean not null
)

Select id,nev,ar,keszlet,elerheto,kategoriak.kategoria_nev from termekek INNER join termekek on termekek.kategoria_id = kategoriak.id order by ar ASC;
Select id, kategoria_id,nev,ar,keszlet,elerheto,kategoria_nev from termekek INNER join termekek on termekek.kategoria_id = kategoriak.id where elerheto = 1 AND keszlet > 0

Select id, kategoria_nev,COUNT(keszlet) as "termekek_szama" AVG(ar) from termekek INNER join termekek on termekek.kategoria_id = kategoriak.id
Select nev, ar, keszlet from termekek where ar >= 10000 order by keszlet DESC