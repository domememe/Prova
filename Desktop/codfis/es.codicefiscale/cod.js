function genera(){
    let nome = document.getElementById("nome").value;
    let cog = document.getElementById("cognome").value; 
    let data = document.getElementById("data").value; 
    let sesso = document.getElementById("sesso").value;
    let inputfile = document.getElementById("file");
    let input = inputfile.files[0];
    if (!nome || !cog || sesso == "" || !data || !input ){
        document.getElementById("errore").innerHTML="Errore, inserisci dei valori reali";
        return;
    }
    document.getElementById("errore").innerHTML="";
    nome = nome.toUpperCase();
    cog = cog.toUpperCase();
    /* Cognome */
    let lcog = [];
    for ( let i = 0; i < cog.length; i++){
        if (!"AEIOU".includes(cog[i]))
            lcog.push(cog[i]);
    }
    for (let i = 0; lcog.length < 3 && i < cog.length; i++){
        if ("AEIOU".includes(cog[i]))
            lcog.push(cog[i]);
    }
    let pcog = lcog[0] || "X";
    let scog = lcog[1] || "X";
    let tcog = lcog[2] || "X";
    /* Nome */
    let lnom = [];
    let pnom, snom, tnom;

    for (let i = 0; i < nome.length; i++) {
        if (!"AEIOU".includes(nome[i])) {
            lnom.push(nome[i]);
        }
    }
    if (lnom.length >= 4) {
        pnom = lnom[0];
        snom = lnom[2];
        tnom = lnom[3];
    } else {
        for (let i = 0; lnom.length < 3 && i < nome.length; i++){
            if ("AEIOU".includes(nome[i]))
                lnom.push(nome[i]);
        }
        pnom = lnom[0] || "X";
        snom = lnom[1] || "X";
        tnom = lnom[2] || "X";
    }
    /* Data */
    let data2= new Date(data);
    let anno = data2.getFullYear().toString();
    let penultima = anno[2];
    let ultima = anno[3];

    let mese = data2.getMonth() + 1;
    switch (mese){
        case 1 : mese= "A"; break; 
        case 2 : mese= "B"; break;
        case 3 : mese= "C"; break; 
        case 4 : mese= "D"; break;
        case 5 : mese= "E"; break; 
        case 6 : mese= "H"; break;
        case 7 : mese= "L"; break; 
        case 8 : mese= "M"; break;
        case 9 : mese= "P"; break; 
        case 10 : mese= "R"; break;
        case 11 : mese= "S"; break; 
        case 12 : mese= "T"; break;
    }
    let giorno = data2.getDate();
    let zero = "";
    if (sesso == "f"){
        giorno += 40;
    }
    if (giorno < 10){
        zero = "0";
    }
    /* Comune */
    let comune = document.getElementById("comune").value.toUpperCase().trim();
    let lettore = new FileReader();
    lettore.onload = function () {
        let testo = lettore.result;
        let righe = testo.split(/\r?\n/);
        let codiceComune = null;
        for (let riga of righe) {
            let parti = riga.split(";");
            if (parti.length !== 2) continue;
            let nomeComune = parti[0].trim().toUpperCase();
            let codice = parti[1].trim();
            if (nomeComune === comune) {
                codiceComune = codice;
                break;
            }
        }
        if (!codiceComune) {
            document.getElementById("errore").innerHTML = "Comune non trovato nel file";
            return;
        }
        let totale =
            pcog + scog + tcog +
            pnom + snom + tnom +
            penultima + ultima +
            mese + zero + giorno +
            codiceComune;
        let controllo = ultimacifra(totale);
        totale += controllo;
        document.getElementById("risultato").innerHTML =
            "Il codice fiscale è " + totale;
    };
    lettore.readAsText(input);
}
/* Ultima cifra */
function ultimacifra(totale){
    let somma = 0;
    let cifra = 0;
    for (let i = 0; i < totale.length; i++) {
        if (i % 2 == 1) {
            if (totale[i] >= "A" && totale[i] <= "Z") {
                cifra = totale.charCodeAt(i) - 65;
            } else {
                cifra = parseInt(totale[i]);
            }
        } else{
            switch (totale[i]) {
                case "0": case "A": cifra = 1; break;
                case "1": case "B": cifra = 0; break;
                case "2": case "C": cifra = 5; break;
                case "3": case "D": cifra = 7; break;
                case "4": case "E": cifra = 9; break;
                case "5": case "F": cifra = 13; break;
                case "6": case "G": cifra = 15; break;
                case "7": case "H": cifra = 17; break;
                case "8": case "I": cifra = 19; break;
                case "9": case "J": cifra = 21; break;
                case "K": cifra = 2; break;
                case "L": cifra = 4; break;
                case "M": cifra = 18; break;
                case "N": cifra = 20; break;
                case "O": cifra = 11; break;
                case "P": cifra = 3; break;
                case "Q": cifra = 6; break;
                case "R": cifra = 8; break;
                case "S": cifra = 12; break;
                case "T": cifra = 14; break;
                case "U": cifra = 16; break;
                case "V": cifra = 10; break;
                case "W": cifra = 22; break;
                case "X": cifra = 25; break;
                case "Y": cifra = 24; break;
                case "Z": cifra = 23; break;
            }
        }
        somma += cifra;
    }
    let resto = somma % 26;
    return String.fromCharCode(resto + 65);
}
