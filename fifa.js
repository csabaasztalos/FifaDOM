//1. érték: Csapat neve (nev)
//2. érték: Csapat helyezése (helyezes)
//3. érték: Csapat helyének változása (valtozas)
//4. érték: Csapat Pontszama (pont)

const csapatAdat = [
    "Anglia;4;0;1662",
    "Argentína;10;0;1614",
    "Belgium;1;0;1752",
    "Brazília;3;-1;1719",
    "Chile;17;-3;1576",
    "Dánia;14;-1;1584",
    "Franciaország;2;1;1725",
    "Hollandia;13;3;1586",
    "Horvátország;8;-1;1625",
    "Kolumbia;9;-1;1622",
    "Mexikó;12;0;1603",
    "Németország;16;-1;1580",
    "Olaszország;15;1;1583",
    "Peru;19;0;1551",
    "Portugália;5;1;1643",
    "Spanyolország;7;2;1631",
    "Svájc;11;0;1604",
    "Svédország;18;0;1560",
    "Szenegál;20;0;1546",
    "Uruguay;6;-1;1639"
];

function objektumGeneralo(tomb) {
    let adatok = [];
    for (let i = 0; i < tomb.length; i++) {
        let objektum = {};
        let daraboltElemek = tomb[i].split(";");
        objektum.nev = daraboltElemek[0];
        objektum.helyezes = Number(daraboltElemek[1]);
        objektum.valtozas = Number(daraboltElemek[2]);
        objektum.pont = Number(daraboltElemek[3]);
        adatok.push(objektum);
    }
    return adatok;
}

const fifaAdatok = objektumGeneralo(csapatAdat);

function csapatszam(tomb) {
    return tomb.length;
}

function csapatszamKiiratas(tagokSzama) {
    document.querySelector("#F1").innerHTML = "Az akutális csapatok száma: " + tagokSzama;
}

csapatszamKiiratas(csapatszam(fifaAdatok));

function atlagPontszam(tomb) {
    let osszesPont = 0;
    let atlagosPontszam = 0;
    for (let i = 0; i < tomb.length; i++) {
        osszesPont += tomb[i].pont;
        atlagosPontszam = Math.round(osszesPont / i);
    }
    return atlagosPontszam;
}

function atlagPontszamKiirato() {
    document.querySelector("#F2").innerHTML = `A csapatok atlagos pontszama: ${atlagPontszam(fifaAdatok)}`;
}
document.querySelector("#atlag").addEventListener("click", atlagPontszamKiirato);

function atlagnalJobb(tomb) {
    let atlag = atlagPontszam(fifaAdatok);
    let csapatok = [];
    for (let i = 0; i < tomb.length; i++) {
        if (tomb[i].pont > atlag) {
            csapatok.push(tomb[i].nev);
        }
    }
    return csapatok;
}

function atlagnalJobbStatisztika() {
    let joCsapatok = atlagnalJobb(fifaAdatok);
    let table = document.querySelector("#F3");
    for (let i = 0; i < joCsapatok.length; i++) {
        let sor = table.insertRow(1);
        let cella = sor.insertCell(0);
        cella.innerHTML = joCsapatok[i];
    }
}
document.querySelector("#csapatmegjelenito").addEventListener("click", atlagnalJobbStatisztika);

function legtobbettJavitoCsapatIndexe(tomb) {
    let csapatIndex = 0;
    for (let i = 0; i < tomb.length; i++) {
        if (tomb[i].valtozas > tomb[csapatIndex].valtozas) {
            csapatIndex = i;
        }
    }
    return csapatIndex;

}

function legtobbettJavitottAdatai() {
    let csapatIndexe = legtobbettJavitoCsapatIndexe(fifaAdatok);
    document.querySelector("#F4").innerHTML = `A legtöbbett javított csapat: ${fifaAdatok[csapatIndexe].nev} pontszama: ${fifaAdatok[csapatIndexe].pont} es helyezese: ${fifaAdatok[csapatIndexe].helyezes}`;
}

legtobbettJavitottAdatai();

function orszagNeve() {
    let nev = document.querySelector("#neves").value;
    return nev;
}

function adottCsapatAListan(tomb, csapatnev) {
    let szerepelE = false;
    for (let i = 0; i < tomb.length; i++) {
        if (tomb[i].nev == csapatnev) {
            szerepelE = true;
        }
    }
    return szerepelE;
}

function adottCsapatAListanKiirato() {
    let rajtaVanE = adottCsapatAListan(fifaAdatok, orszagNeve());
    if (rajtaVanE == true) {
        document.querySelector("#F5").innerHTML = `Ez a csapat rajta VAN a listan!`
    }
    else {
        document.querySelector("#F5").innerHTML = `Ez a csapat NINCS rajta a listan!`
    }
}

document.querySelector("#gomb").addEventListener("click", adottCsapatAListanKiirato);

function helyezesekValtozasa(tomb) {
    let valtozasok = [];
    for (let i = 0; i < tomb.length; i++) {
        let szerepelE = false;
        for (let j = 0; j < valtozasok.length; j++) {
            if (tomb[i].valtozas == valtozasok[j]) {
                szerepelE = true;
            }
        }
        if (szerepelE == false) {
            valtozasok.push(tomb[i].valtozas);
        }
    }
    return valtozasok;
}

function valtozasSzamlalo(tomb, valtozasokSzama) {
    let szamlalo = [];
    for (let i = 0; i < valtozasokSzama.length; i++) {
        szamlalo.push(0);
    }

    for (let i = 0; i < tomb.length; i++) {
        for (let j = 0; j < valtozasokSzama.length; j++) {
            if (valtozasokSzama[j] == tomb[i].valtozas) {
                szamlalo[j]++;
            }
        }
    }
    return szamlalo;
}
console.log(valtozasSzamlalo(fifaAdatok,helyezesekValtozasa(fifaAdatok)));

function valtozasStatisztika() {
    let valtozasOk = helyezesekValtozasa(fifaAdatok);
    let valtozasokSzamA = valtozasSzamlalo(fifaAdatok, helyezesekValtozasa(fifaAdatok));
    let table = document.querySelector("#F6");
    for (let i = 0; i < valtozasOk.length; i++) {
        if (valtozasokSzamA[i]>1) {
            let sor = table.insertRow(1);
            let cella1 = sor.insertCell(0);
            let cella2 = sor.insertCell(1);
            cella1.innerHTML = valtozasOk[i];
            cella2.innerHTML = valtozasokSzamA[i];
        }
    }
}

document.querySelector("#valtozasmegjelenito").addEventListener("click", valtozasStatisztika);