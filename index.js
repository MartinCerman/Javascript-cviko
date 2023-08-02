// Button pro vypocet ceny.
const cenaBtn = document.querySelector("#celkova-cena");

// Promenna pro celkovou cena objednavky.
let celkovaCena = 0;

// Onclick event na button pro vypocet ceny, prevent default.
cenaBtn.addEventListener("click", (e) => {
    celkovaCena = 0;

    e.preventDefault();

    // Elementy pro vyber typu a kusu, strida se checkbox a input:number.
    const vyberKola = document.querySelector("#typ-kola").elements;

    // Pokud se mezi elementy najde checked true, vynasobí se jeho value s value nasledujiciho elementu (pocet ks).
    for (let i = 0; i < vyberKola.length - 1; i++) {
        if (vyberKola[i].checked === true) {
            celkovaCena += vyberKola[i].value * vyberKola[i + 1].value
        }
    }

    // Vysledek se vynasobi poctem dnu zapujcky.
    celkovaCena *= document.querySelector("#doba").value;

    // Vyhledani zatrzeneho doplňku a vynasobeni celkove ceny.
    celkovaCena *= document.querySelector('input[name="nosic"]:checked').value;

    // Print ceny do elementu na strance.
    document.querySelector("#celkova-cena-vysledek").textContent = celkovaCena.toFixed(2);
})

// Nacteni elementu pro max utratu uzivatele.
const maxUtrataInput = document.querySelector("#max-utrata");

// Prepocitani ceny pri zmene castky max utraty.
maxUtrataInput.addEventListener("input", () => {
    // Nacteni elementu pro zpravu.
    const zprava = document.querySelector("#max-utrata-zprava");
    // Vytvoreni zpravy.
    if (celkovaCena === 0) {
        zprava.textContent = "Nejdříve musíte spočítat cenu!"
    } else if (+maxUtrataInput.value === 0) {
        zprava.textContent = "";
    } else if (celkovaCena > maxUtrataInput.value) {
        zprava.textContent = `Ještě vám chybí ${(celkovaCena - maxUtrataInput.value).toFixed(2)} Kč`;
    } else {
        zprava.textContent = "Zadaná částka k uhrazení objednávky stačí."
    }
    console.log(maxUtrataInput.value);
})

// Overeni ze uzivatel zadal objednavku, pokud je cena 0, nelze odeslat.
const submitBtn = document.querySelector("#submit");
submitBtn.addEventListener("click", (e) => {
    if (celkovaCena === 0) {
        e.preventDefault();

        //Vypis chybneho odeslani.
        const chyba = document.querySelector("#chyba");
        chyba.textContent = "Před odesláním vyplňte formulář."
    }
})