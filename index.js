if (window.timerRunning) {
    clearInterval(window.timerRunning);
}

let cryptoInterval;
let uiInterval;
let countdownInterval;
const message = "THE MARKET IS THE BEST GAME BY THE WAY"
//
console.log(message)
// ---------------- GAME STATE ----------------

let gameState = {
    cashCount: 10,
    multiplier: 0,
    multiplierMax: 10,
    payPercent: 100,

    // common
    appleCount: 0,
    bananaCount: 0,
    orangeCount: 0,
    yougurtCount: 0,
    mangoCount: 0,
    breadCount: 0,
    frozenAppleSlicesCount: 0,
    rawBananaCount: 0,
    frozenOrangeCount: 0,
    frozenYougurtCount: 0,
    frozenMangoSlicesCount: 0,
    toastCount: 0,
    raisinToastCount: 0,

    // rare
    chocolateCount: 0,
    pizzaCount: 0,
    cookieCount: 0,
    chickenCount: 0,
    pastaCount: 0,
    burgerCount: 0,
    donutCount: 0,
    pancakeCount: 0,
    iceCreamCount: 0,
    cheesecakeCount: 0,

    // uncanny
    bluecapMushroomsCount: 0,
    ashenPearsCount: 0,
    twighlightHoneycombsCount: 0,
    petersPickledPeppersCount: 0,
    twistedTurnipCount: 0,
    shadowedMelonCount: 0,
    crimsonVeinedPlumCount: 0,
    monsterCount: 0,

    prestiges: 0,

    BitcoinVal: 100000,
    LitecoinVal: 100,
    DogecoinVal: 10000000000,

    Bitcoin: 0,
    Litecoin: 0,
    Dogecoin: 0,
};

let prices = {
    // common
    appleCount: 10,
    bananaCount: 15,
    orangeCount: 20,
    yougurtCount: 100,
    mangoCount: 200,
    breadCount: 500,
    frozenAppleSlicesCount: 1000,
    rawBananaCount: 1500,
    frozenOrangeCount: 2500,
    frozenYougurtCount: 5000,
    frozenMangoSlicesCount: 10000,
    toastCount: 20000,
    raisinToastCount: 100000,

    // rare
    chocolateCount: 10**8,          // 100M
    pizzaCount: 75*10**8,              // 750M
    cookieCount: 5*10**9,            // 5B
    chickenCount: 15*10**9,          // 15B
    pastaCount: 50*10**9,            // 50B
    burgerCount: 250*10**9,          // 250B
    donutCount: 10**10,          // 1T
    pancakeCount: 10*10**10,       // 10T
    iceCreamCount: 75*10**10,      // 75T
    cheesecakeCount: 10**11,  // 1QD

    // uncanny
    bluecapMushroomsCount: 10**20,     // 100Qi
    ashenPearsCount: 10**21,           // 1Sx
    twighlightHoneycombsCount: 10**22, // 10Sx
    petersPickledPeppersCount: 10**23, // 100Sx
    twistedTurnipCount: 2*10**27,      // 2Oct
    shadowedMelonCount: 2*10**28,      // 20Oct
    crimsonVeinedPlumCount: 5*10**29,  // 500Oct
    monsterCount: 10**31,              // 10No
};

let stock = {
    // common
    appleCount: 10,
    bananaCount: 10,
    orangeCount: 10,
    yougurtCount: 10,
    mangoCount: 10,
    breadCount: 10,
    frozenAppleSlicesCount: 10,
    rawBananaCount: 10,
    frozenOrangeCount: 10,
    frozenYougurtCount: 10,
    frozenMangoSlicesCount: 10,
    toastCount: 10,
    raisinToastCount: 10,

    // rare
    chocolateCount: 10,
    pizzaCount: 10,
    cookieCount: 10,
    chickenCount: 10,
    pastaCount: 10,
    burgerCount: 10,
    donutCount: 10,
    pancakeCount: 10,
    iceCreamCount: 10,
    cheesecakeCount: 10,

    // uncanny
    bluecapMushroomsCount: 10,
    ashenPearsCount: 10,
    twighlightHoneycombsCount: 10,
    petersPickledPeppersCount: 10,
    twistedTurnipCount: 10,
    shadowedMelonCount: 10,
    crimsonVeinedPlumCount: 10,
    monsterCount: 10,
};

const buttonToKey = {
    apples: "appleCount",
    bananas: "bananaCount",
    oranges: "orangeCount",
    yougurt: "yougurtCount",
    mango: "mangoCount",
    bread: "breadCount",
    frozenAppleSlices: "frozenAppleSlicesCount",
    rawBanana: "rawBananaCount",
    frozenOrange: "frozenOrangeCount",
    frozenYougurt: "frozenYougurtCount",
    frozenMangoSlices: "frozenMangoSlicesCount",
    toast: "toastCount",
    raisinToast: "raisinToastCount",

    chocolates: "chocolateCount",
    pizzas: "pizzaCount",
    cookies: "cookieCount",
    chicken: "chickenCount",
    pasta: "pastaCount",
    burger: "burgerCount",
    donuts: "donutCount",
    pancakes: "pancakeCount",
    iceCream: "iceCreamCount",
    cheesecake: "cheesecakeCount",

    bluecapMushrooms: "bluecapMushroomsCount",
    ashenPears: "ashenPearsCount",
    twighlightHoneycombs: "twighlightHoneycombsCount",
    petersPickledPeppers: "petersPickledPeppersCount",
    twistedTurnip: "twistedTurnipCount",
    shadowedMelon: "shadowedMelonCount",
    crimsonVeinedPlum: "crimsonVeinedPlumCount",
    monster: "monsterCount",
};

// ---------------- SAVE / LOAD ----------------

function saveGame() {
    localStorage.setItem("gameSave", JSON.stringify(gameState));
    localStorage.setItem("stock", JSON.stringify(stock));
}

function loadGame() {
    const saved = localStorage.getItem("gameSave");
    if (saved) gameState = { ...gameState, ...JSON.parse(saved) };
}

function loadStock() {
    const saved = localStorage.getItem("stock");
    if (saved) stock = JSON.parse(saved);
}

// ---------------- EVENT SYSTEM ----------------

const config = {
    eventTime: 60,
    normalTime: 600,
}


let timeLeft = Number(localStorage.getItem("timerSave"));
if (!timeLeft || isNaN(timeLeft)) timeLeft = config.normalTime;

let eventIsOn = localStorage.getItem("eventSave") === "true";

function callEvent(){
    eventIsOn = true;
    localStorage.setItem("eventSave", eventIsOn);
    timeLeft = config.eventTime;
    window.location.href = "event.html";
    for(let key in stock){
        stock[key] = 100;
    }
}

function stopEvent(){
    eventIsOn = false;
    localStorage.setItem("eventSave", eventIsOn);
    timeLeft = config.normalTime;
    window.location.href = "game.html";
    for(let key in stock){
        stock[key] = 10;
    }
}

// ---------------- TIMER ----------------

let stockReset = localStorage.getItem("stockResetDone") === "true";

function setCountDown() {
    countdownInterval = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 0) {
            if (eventIsOn) {
                stockReset = false;
                stopEvent();
                document.body.classList.remove("event");
                localStorage.setItem("stockResetDone", "false");

            } else {
                stockReset = false;
                callEvent();
                document.body.classList.add("event");
                localStorage.setItem("stockResetDone", "false");
            }
        }
        else if(timeLeft <= 300 && !stockReset){
            stockReset = true;
            localStorage.setItem("stockResetDone", "true");
            for(let key in stock){
                if(eventIsOn){
                    stock[key] = 100
                }
                else{
                    stock[key] = 10
                }
            }
            saveGame()
        }

        localStorage.setItem("timerSave", timeLeft);

        const el = document.getElementById("countDown");
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        if (el) el.textContent = `You have ${String(minutes).padStart("0", 2)}m and ${String(seconds).padStart("0", 2)}s left...`;

    }, 1000);
}

// ---------------- CRYPTO ----------------

function roundDownToDecimals(value, decimals) {
    const m = 10 ** decimals;
    return Math.floor((value + Number.EPSILON) * m) / m;
}

let bgup = true, lgup = true, dgup = true;

function changeTrend() {
    bgup = Math.random() < 0.9;
    lgup = Math.random() < 0.9;
    dgup = Math.random() < 0.9;

    setTimeout(changeTrend, Math.random() * 60000 + 60000);
}
changeTrend();

function updateCrypto() {
    console.log("CRYPTO TICK");

    if(gameState.multiplier > gameState.multiplierMax) gameState.multiplier = gameState.multiplierMax;
    if(gameState.payPercent < 30) gameState.payPercent = 30;

    gameState.BitcoinVal = Math.max(
        1,
        gameState.BitcoinVal + Math.floor(Math.random() * 3000 - 1000)
    );
    
    gameState.LitecoinVal = Math.max(
        0.01,
        gameState.LitecoinVal + roundDownToDecimals(Math.random() * 2 - 1, 2)
    );
    
    gameState.DogecoinVal = Math.max(
        0.000001,
        gameState.DogecoinVal + Math.floor(Math.random() * 1000000 - 500000)
    );
    
    const btc = document.getElementById("BitcoinDisplay");
    if (btc) btc.textContent = `1 BITCOIN: ${gameState.BitcoinVal}`;

    const ltc = document.getElementById("LitecoinDisplay");
    if (ltc) ltc.textContent = `1 LITECOIN: ${gameState.LitecoinVal.toFixed(2)}`;

    const doge = document.getElementById("DogecoinDisplay");
    if (doge) doge.textContent = `1 DOGECOIN: ${gameState.DogecoinVal.toFixed(6)}`;

    saveGame();
}

function updateCryptoOwnedUI() {
    const btc = document.getElementById("Bitcoins");
    const ltc = document.getElementById("Litecoins");
    const doge = document.getElementById("Dogecoins");

    if (btc) btc.textContent = `Bitcoins: ${gameState.Bitcoin.toFixed(6)}`;
    if (ltc) ltc.textContent = `Litecoins: ${gameState.Litecoin.toFixed(6)}`;
    if (doge) doge.textContent = `Dogecoins: ${gameState.Dogecoin.toFixed(6)}`;
}

// ---------------- CRYPTO BUY / SELL FIXED ----------------

// -------------------- BITCOIN -----------------------

function investBitcoin() {
    const input = Number(document.getElementById("cryptoInput").value);
    if (!input || input <= 0) return;

    if (gameState.cashCount < input) return alert("Not enough Penties");

    const amount = input / gameState.BitcoinVal;

    gameState.cashCount -= input;
    gameState.Bitcoin += amount;

    saveGame();
    updateUI();
    updateCryptoOwnedUI();
}

function sellBitcoin() {
    if (gameState.Bitcoin <= 0) return alert("No Bitcoin");

    const gain = gameState.Bitcoin * gameState.BitcoinVal;

    gameState.cashCount += gain;
    gameState.Bitcoin = 0;

    saveGame();
    updateUI();
    updateCryptoOwnedUI();
}

// ---------------- LITECOIN ----------------

function investLitecoin() {
    const input = Number(document.getElementById("cryptoInput").value);
    if (!input || input <= 0) return;

    if (gameState.cashCount < input) return alert("Not enough Penties");

    const amount = input / gameState.LitecoinVal;

    gameState.cashCount -= input;
    gameState.Litecoin += amount;

    saveGame();
    updateUI();
    updateCryptoOwnedUI();
}

function sellLitecoin() {
    if (gameState.Litecoin <= 0) return alert("No Litecoin");

    const gain = gameState.Litecoin * gameState.LitecoinVal;

    gameState.cashCount += gain;
    gameState.Litecoin = 0;

    saveGame();
    updateUI();
    updateCryptoOwnedUI();
}

// ---------------- DOGECOIN ----------------
function investDogecoin() {
    const input = Number(document.getElementById("cryptoInput").value);
    if (!input || input <= 0) return;

    if (gameState.cashCount < input) return alert("Not enough Penties");

    const amount = input / gameState.DogecoinVal;

    gameState.cashCount -= input;
    gameState.Dogecoin += amount;

    saveGame();
    updateUI();
    updateCryptoOwnedUI();
}

function sellDogecoin() {
    if (gameState.Dogecoin <= 0) return alert("No Dogecoin");

    const gain = gameState.Dogecoin * gameState.DogecoinVal;

    gameState.cashCount += gain;
    gameState.Dogecoin = 0;

    saveGame();
    updateUI();
    updateCryptoOwnedUI();
}

// ---------------- BUY ----------------

function setupBuyButtons() {
    for (const [btnId, key] of Object.entries(buttonToKey)) {
        const btn = document.getElementById(btnId);
        if (!btn) continue;

        btn.onclick = () => {
            const price = prices[key] * (gameState.payPercent / 100);

            if (gameState.cashCount >= price && stock[key] > 0) {
                gameState.cashCount -= eventIsOn ? price / 2 : price;
                gameState[key]++;
                stock[key]--;

                saveGame();
                updateUI();
            } else {
                alert("Not enough penties or out of stock!");
            }
        }
    }
}


// ---------------- SELL ----------------

const sellAllIds = {
    // common
    appleCount: "sell-all-apples",
    bananaCount: "sell-all-bananas",
    orangeCount: "sell-all-oranges",
    yougurtCount: "sell-all-yougurts",
    mangoCount: "sell-all-mangos",
    breadCount: "sell-all-breads",
    frozenAppleSlicesCount: "sell-all-frozen-apple-slices",
    rawBananaCount: "sell-all-raw-bananas",
    frozenOrangeCount: "sell-all-frozen-oranges",
    frozenYougurtCount: "sell-all-frozen-yougurts",
    frozenMangoSlicesCount: "sell-all-frozen-mango-slices",
    toastCount: "sell-all-toasts",
    raisinToastCount: "sell-all-raisin-toasts",

    // rare
    chocolateCount: "sell-all-chocolates",
    pizzaCount: "sell-all-pizzas",
    cookieCount: "sell-all-cookies",
    chickenCount: "sell-all-chickens",
    pastaCount: "sell-all-pastas",
    burgerCount: "sell-all-burgers",
    donutCount: "sell-all-donuts",
    pancakeCount: "sell-all-pancakes",
    iceCreamCount: "sell-all-ice-creams",
    cheesecakeCount: "sell-all-cheesecakes",

    // uncanny
    bluecapMushroomsCount: "sell-all-bluecap-mushrooms",
    ashenPearsCount: "sell-all-ashen-pears",
    twighlightHoneycombsCount: "sell-all-twighlight-honeycombs",
    petersPickledPeppersCount: "sell-all-peters-pickled-peppers",
    twistedTurnipCount: "sell-all-twisted-turnip",
    shadowedMelonCount: "sell-all-shadowed-melon",
    crimsonVeinedPlumCount: "sell-all-crimson-veined-plum",
    monsterCount: "sell-all-monsters",
};

const sellableItems = Object.keys(prices);

function getRandomSellMultiplier() {
    return 1 + Math.floor(Math.random() * 70) / 100;
}

function camelToKebab(str) {
    return str.replace(/Count$/, "")
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .toLowerCase();
}

function setupSellButtons() {
    for (const key of sellableItems) {
        const itemName = camelToKebab(key);

        const singleBtn = document.getElementById(`sell-${itemName}`);
        const allBtn = document.getElementById(sellAllIds[key]);

        if (singleBtn) {
            singleBtn.onclick = () => {
                if (gameState[key] <= 0) return;

                const gain = Math.floor(prices[key] * getRandomSellMultiplier());
                const total = gain + gain * gameState.multiplier;

                gameState[key]--;
                gameState.cashCount += total;

                saveGame();
                updateUI();
            };
        }

        if (allBtn) {
            allBtn.onclick = () => {
                const count = gameState[key];
                if (!count) return;

                const totalGain =
                    Math.floor(prices[key] * getRandomSellMultiplier() * count);

                gameState[key] = 0;
                gameState.cashCount += totalGain + totalGain * gameState.multiplier;

                saveGame();
                updateUI();
            };
        }
    }
}

// ---------------- UI (FULL RESTORED) ----------------

function getNthIllion(n){
    if(n < 1_000_000) return 0;

    return Math.floor(Math.log10(n) / 3) - 1;
}
function getFormattedNumber(n){
    function getNumberShortener(n){
        let string = '';
        const nthNum = getNthIllion(n);
        const ones = nthNum % 10;
        const tens = Math.floor(nthNum / 10);
        if(n >= 1000 && n < 1000000) return 'K';
        switch(ones){
            case 1:
                if(tens === 0){
                    string += 'M'
                }
                else{
                    string += 'Un';
                }
                break;
            case 2:
                if(tens === 0){
                    string += 'B'
                }
                else{
                    string += 'Do';
                }
                break;
            case 3:
                string += 'T';
                break;
            case 4:
                string += 'Qa';
                break;
            case 5:
                string += 'Qi';
                break;
            case 6:
                string += 'Sx';
                break;
            case 7:
                string += 'Sp';
                break;
            case 8:
                string += 'Oct';
                break;
            case 9:
                string += 'No';
                break;
        }
        switch(tens){
            case 1:
                string += 'Dec';
                break;
            case 2:
                string += 'Vg';
                break;
            case 3:
                string += 'Trg';
                break;
            case 4:
                string += 'Qdrg';
                break;
            case 5:
                string += 'Qqg';
                break;
            case 6:
                string += 'Sxg';
                break;
            case 7:
                string += 'Spg';
                break;
            case 8:
                string += 'Ocg';
                break;
            case 9:
                string += 'Nog';
                break;
        }
        if(nthNum > 100){
            string = 'INFINITY';
        }
        console.log(nthNum);
        console.log(string);
        return string;
    }
    function getNumberShortened(n) {
        if (n < 1000) {
            return n.toFixed(0);
        }
    
        if (n < 1_000_000 && n >= 1000) {
            return (n / 1000).toFixed(2);
        }
    
        const nth = getNthIllion(n);
        const divisor = 10 ** ((nth + 1) * 3);
    
        return (n / divisor).toFixed(2);
    }
    return `${getNumberShortened(n)}${getNumberShortener(n)}`;
}
function updateUI() {

    // CASH
    const cash = document.getElementById("cash");
    if (cash) {
        cash.textContent = `You have ${getFormattedNumber(gameState.cashCount)} Penties`;
    }

    // PRESTIGES
    const prestige = document.getElementById("prestiges");
    if(prestige) prestige.textContent = `Prestiges: ${gameState.prestiges}`;

    const cashfornext = document.getElementById("cashLevel");
    if(cashfornext) cashfornext.textContent = `You need ${getFormattedNumber(getCashLevel(gameState.prestiges))} for the next prestige`; 

    // MULTIPLIER
    const mult = document.getElementById("multiplier");
    if(gameState.multiplier > gameState.multiplierMax) gameState.multiplier = gameState.multiplierMax;
    if (mult) mult.textContent = `Multiplier: ${gameState.multiplier.toFixed(3)}`;

    // PAY %
    const pay = 
    document.getElementById("payPercent");
    if(gameState.payPercent < 30) gameState.payPercent = 30;
    if (pay) pay.textContent = `Pay Percent: ${gameState.payPercent.toFixed(1)}%`;

    // ITEMS
    for (const key in gameState) {
        if (!key.endsWith("Count")) continue;
        if (key === "cashCount") continue;

        const el = document.getElementById(
            `${key.replace(/Count$/, "")}Display`
        );

        if (el) {
            el.textContent =
                `${key.replace(/Count$/, "")}: ${gameState[key]}`;
        }
    }

    // STOCK
    for (const key in stock) {
        const el = document.getElementById(`${key.replace(/Count$/, "")}Stock`);
        if (el) el.textContent = `Stock: ${stock[key]}`;
    }

    // CRYPTO UI
    const btc = document.getElementById("BitcoinDisplay");
    if (btc) btc.textContent = `1 BITCOIN: ${gameState.BitcoinVal}`;

    const ltc = document.getElementById("LitecoinDisplay");
    if (ltc) ltc.textContent = `1 LITECOIN: ${gameState.LitecoinVal}`;

    const doge = document.getElementById("DogecoinDisplay");
    if (doge) doge.textContent = `1 DOGECOIN: ${gameState.DogecoinVal}`;
}

// ----------------- DISPLAY RARITIES -----------------

const commonBtn = document.getElementById("commonFoodBtn");
const commonFruits = document.getElementById("commonFoods");
commonBtn.addEventListener('click', () => {
    if(commonFruits.style.display == 'none') commonFruits.style.display = 'block';
    else commonFruits.style.display = 'none';
});

const rareBtn = document.getElementById("rareFoodsBtn");
const rareFood = document.getElementById("rareFoods");
rareBtn.addEventListener('click', () => {
    if(gameState.prestiges >= 1){
        if(rareFood.style.display == 'none') rareFood.style.display = 'block';
        else rareFood.style.display = 'none';
    }
    else{
        window.alert("You need a prestige to enter here.")
    }
});

const uncannyBtn = document.getElementById("uncannyFoodsBtn");
const uncannyFood = document.getElementById("uncannyFoods");
uncannyBtn.addEventListener('click', () => {
    if(gameState.prestiges >= 3){
        if(uncannyFood.style.display == 'none') uncannyFood.style.display = 'block';
        else uncannyFood.style.display = 'none';
    }
    else{
        window.alert("You need 3 prestiges to enter here")
    }
});

// ----------------- PERKS/PRESTIGES -----------------

function resetAllItems() {
    for (const key in gameState) {
        if (
            key.endsWith("Count") &&
            key !== "cashCount"
        ) {
            gameState[key] = 0;
        }
    }
}

function perkIncrease() {
    if(gameState.cashCount >= 100000){
        gameState.multiplier += Math.sqrt(gameState.cashCount) / 50000;
        const multiplier = document.getElementById("multiplier");
        multiplier.textContent = `Multiplier: ${gameState.multiplier.toFixed(3) + 1}`;
        gameState.payPercent -= Math.sqrt(gameState.cashCount) / 5000;
        const payPercent = document.getElementById("payPercent");
        payPercent.textContent = `Pay Percent: ${gameState.payPercent.toFixed(1)}%`
        gameState.cashCount = 10;
        resetAllItems();
        gameState.Bitcoin = 0;
        gameState.Litecoin = 0;
        gameState.Dogecoin = 0;
        gameState.BitcoinVal = 100000;
        gameState.LitecoinVal = 100;
        gameState.DogecoinVal = 10000000000;
        for(let key in stock){
            stock[key] = 10;
        }
        saveGame()
    }
    else{
        window.alert("You do not have enough money");
    }
}

function getCashLevel(prestige) {
    const exponent = 8 + prestige * 6;

    // snap exponent into “big number tiers”
    const tierSnap = Math.floor(exponent / 6) * 6;

    return 1000 * (10 ** tierSnap);
}

function prestige(){
    const cashLevel = getCashLevel(gameState.prestiges);
    if(gameState.cashCount < cashLevel){
        window.alert("Not enough Penties");
        return;
    };
    gameState.prestiges += 1;
    gameState.multiplierMax += 0.5;
    gameState.cashCount = 10;
    gameState.multiplier = 0;
    gameState.payPercent = 100;
    resetAllItems();
    gameState.BitcoinVal = 100000;
    gameState.LitecoinVal = 100;
    gameState.DogecoinVal = 10000000000;
    gameState.Bitcoin = 0;
    gameState.Litecoin = 0;
    gameState.Dogecoin = 0;
    for(let key in stock){
            stock[key] = 10;
    }
    timeLeft = config.normalTime;
    saveGame();
}

// ------------ RESTART ------------
function restartGame() {
    if (!confirm("Are you sure you want to restart? This will erase all progress.")) {
        return;
    }

    // 🔥 STOP ALL RUNNING LOOPS (this is the important part)
    clearInterval(cryptoInterval);
    clearInterval(uiInterval);
    clearInterval(countdownInterval);
    clearInterval(window.cashLoop);

    cryptoInterval = null;
    uiInterval = null;
    countdownInterval = null;
    window.cashLoop = null;

    gameState.cashCount = 10;
    gameState.multiplier = 0;
    gameState.payPercent = 100;
    resetAllItems();
    gameState.BitcoinVal = 100000;
    gameState.LitecoinVal = 100;
    gameState.DogecoinVal = 10000000000;
    gameState.Bitcoin = 0;
    gameState.Litecoin = 0;
    gameState.Dogecoin = 0;
    gameState.prestiges = 0;
    for(let key in stock){
            stock[key] = 10;
    }
    timeLeft = config.normalTime;
    
    // 🧹 CLEAR STORAGE
    localStorage.clear();

    // 🔄 RESET STATE (minimal safe reset)
    saveGame()
}

// ---------------- INIT ----------------

function initiate() {
    console.log("INITIATE RUNNING");
    loadGame();
    loadStock();
    updateUI();

    setTimeout(() => {
        setupBuyButtons();
        setupSellButtons();
    }, 50);

    setCountDown();
    cryptoInterval = setInterval(updateCrypto, 250);
    console.log("CRYPTO INTERVAL STARTED");


    window.cashLoop = setInterval(updateUI, 500);
}

window.addEventListener("load", initiate);

window.investBitcoin = investBitcoin;
window.sellBitcoin = sellBitcoin;

window.investLitecoin = investLitecoin;
window.sellLitecoin = sellLitecoin;

window.investDogecoin = investDogecoin;
window.sellDogecoin = sellDogecoin;
