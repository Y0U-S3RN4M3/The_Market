let gameState = {
    cashCount: 10,
    multiplier: 0,
    payPercent: 100,
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
    BitcoinVal: 100000,
    LitecoinVal: 100,
    DogecoinVal: 10000000000,
    Bitcoin: 0,
    Litecoin: 0,
    Dogecoin: 0,
};

let prices = {
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
};

let stock = {
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
};

// ---------------- SAVE / LOAD ----------------

function saveGame() {
    localStorage.setItem("gameSave", JSON.stringify(gameState));
    localStorage.setItem("stock", JSON.stringify(stock));
}

function loadGame() {
    const saved = localStorage.getItem("gameSave");
    if (saved) {
        gameState = { ...gameState, ...JSON.parse(saved) };
    }
}

function loadStock() {
    const saved = localStorage.getItem("stock");
    if (saved) stock = JSON.parse(saved);
}

// ---------------- EVENT SYSTEM ----------------


const eventTime = 60;
const normalTime = 600;
let timeLeft = parseInt(localStorage.getItem("timerSave")) || normalTime;
let eventIsOn = localStorage.getItem("eventSave") === "true";

function callEvent() {
    eventIsOn = true;
    localStorage.setItem("eventSave", "true");

    timeLeft = eventTime;
    localStorage.setItem("timerSave", timeLeft);

    for (let key in stock) stock[key] = 100;

    saveGame();
    window.location.href = "event.html";
}

function stopEvent() {
    eventIsOn = false;
    localStorage.setItem("eventSave", "false");

    for (let key in stock) stock[key] = 10;

    saveGame();
}

// ---------------- TIMER ----------------

function setCountDown() {
    setInterval(() => {
        timeLeft--;
        localStorage.setItem("timerSave", timeLeft);

        if (timeLeft <= 0) {
            if (eventIsOn) {
                stopEvent();
                timeLeft = normalTime;
                localStorage.setItem("timerSave", timeLeft);
                window.location.href = "game.html";
            } else {
                callEvent();
            }
            return;
        }

        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;

        const el = document.getElementById("countDown");
        if (el) {
            el.textContent = `You have ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s left...`;
        }
    }, 1000);
}

// ---------------- CRYPTO SYSTEM ------------

function roundDownToDecimals(value, decimals) {
    const multiplier = 10 ** decimals;
    return Math.floor((value + Number.EPSILON) * multiplier) / multiplier;
}

// gup for GOING UP

let bgup = true;
let lgup = true;
let dgup = true;
let randomTime = 0;

function changeTrend() {
    bgup = Math.random() < 0.9;
    lgup = Math.random() < 0.9;
    dgup = Math.random() < 0.9;
    if(!bgup || !lgup || !dgup){
        setTimeout(() => {
            window.alert("CRYPTO IS PLUMMETING!!!")
        }, 5000)
    }
    console.log("Trend changed!");

    const delay = Math.floor(Math.random() * 60001) + 60000;
    setTimeout(changeTrend, delay);
}

changeTrend();

function updateCrypto() {

    let bitcoinMin = -10000;
    let bitcoinMax = 2500;
    if(bgup){
        bitcoinMin = 0;
    }
    else{
        bitcoinMax = 0;
    }
    let bitcoinChange = Math.floor(Math.random() * (bitcoinMax - bitcoinMin + 1)) + bitcoinMin;
    gameState.BitcoinVal += bitcoinChange;
    console.log("Bitcoin:", gameState.BitcoinVal, "Change:", bitcoinChange);
    document.getElementById("BitcoinDisplay").textContent = `1 BITCOIN: ${gameState.BitcoinVal} Penties`;

    let litecoinMin = -10;
    let litecoinMax = 2.5;
    if(lgup){
        litecoinMin = 0;
    }
    else{
        litecoinMax = 0;
    }
    let litecoinChange = roundDownToDecimals((Math.random() * (litecoinMax - litecoinMin)) + litecoinMin, 2);
    gameState.LitecoinVal += litecoinChange;
    console.log("Litecoin:", gameState.LitecoinVal, "Change:", litecoinChange);
    document.getElementById("LitecoinDisplay").textContent = `1 LITECOIN: ${gameState.LitecoinVal.toFixed(2)} Penties`;

    let dogeMin = -1000000000;
    let dogeMax = 250000000;
    if(dgup){
        dogeMin = 0;
    }
    else{
        dogeMax = 0;
    }
    let dogeChange = Math.floor(Math.random() * (dogeMax - dogeMin)) + dogeMin;
    gameState.DogecoinVal += dogeChange;
    console.log("Dogecoin:", gameState.DogecoinVal, "Change:", dogeChange);
    document.getElementById("DogecoinDisplay").textContent = `1 DOGECOIN: ${gameState.DogecoinVal.toFixed(6)} Penties`;

    saveGame()
}

setInterval(updateCrypto, 1000);

// BITCOIN FUNCTIONS

function investBitcoin(){
    const amount = Number(document.getElementById("cryptoInput").value);

    if (amount <= 0) return;

    if (gameState.cashCount < amount) {
        alert("Not enough penties!");
        return;
    }

    gameState.cashCount -= amount;
    gameState.Bitcoin += amount / gameState.BitcoinVal;

    updateUI();
    saveGame();
}

function sellBitcoin(){
    if (gameState.Bitcoin <= 0) {
        alert("You have no Bitcoin");
        return;
    }

    gameState.cashCount += gameState.Bitcoin * gameState.BitcoinVal;
    gameState.Bitcoin = 0;

    updateUI();
    saveGame();
}

// LITECOIN FUNCTIONS

function investLitecoin(){
    const amount = Number(document.getElementById("cryptoInput").value);

    if (amount <= 0) return;

    if (gameState.cashCount < amount) {
        alert("Not enough penties!");
        return;
    }

    gameState.cashCount -= amount;
    gameState.Litecoin += amount / gameState.LitecoinVal;

    updateUI();
    saveGame();
}

function sellLitecoin(){
    if (gameState.Litecoin <= 0) {
        alert("You have no Litecoin");
        return;
    }

    gameState.cashCount += gameState.Litecoin * gameState.LitecoinVal;
    gameState.Litecoin = 0;

    updateUI();
    saveGame();
}

// DOGECOIN FUNCTIONS 

function investDogecoin(){
    const amount = Number(document.getElementById("cryptoInput").value);

    if (amount <= 0) return;

    if (gameState.cashCount < amount) {
        alert("Not enough penties!");
        return;
    }

    gameState.cashCount -= amount;
    gameState.Dogecoin += amount / gameState.DogecoinVal;

    updateUI();
    saveGame();
}

function sellDogecoin(){
    if (gameState.Dogecoin <= 0) {
        alert("You have no Dogecoin");
        return;
    }

    gameState.cashCount += gameState.Dogecoin * gameState.DogecoinVal;
    gameState.Dogecoin = 0;

    updateUI();
    saveGame();
}

// ---------------- UI ----------------

function capitalize(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function updateUI() {

    const btcEl = document.getElementById("Bitcoins");
    if (btcEl) {
        btcEl.textContent = `Bitcoins: ${gameState.Bitcoin.toFixed(6)}`;
    }

    const ltcEl = document.getElementById("Litecoins");
    if (ltcEl) {
        ltcEl.textContent = `Litecoins: ${gameState.Litecoin.toFixed(6)}`;
    }

    const dogeEl = document.getElementById("Dogecoins");
    if (dogeEl) {
        dogeEl.textContent = `Dogecoins: ${gameState.Dogecoin.toFixed(6)}`;
    }

    document.getElementById("BitcoinDisplay").textContent =
        `1 BITCOIN: ${gameState.BitcoinVal} Penties`;

    document.getElementById("LitecoinDisplay").textContent =
        `1 LITECOIN: ${gameState.LitecoinVal} Penties`;

    document.getElementById("DogecoinDisplay").textContent =
        `1 DOGECOIN: ${gameState.DogecoinVal} Penties`;

    for (const key in gameState) {
        if (key === "cashCount") continue;

        const el = document.getElementById(`${key.replace(/Count$/, "")}Display`);
        if (el) {
            el.textContent =
                `${capitalize(key.replace(/Count$/, ""))}: ${gameState[key]}`;
        }
    }

    const cash = document.getElementById("cash");
    if (cash) {
        cash.textContent = `You have ${gameState.cashCount.toLocaleString()} Penties`;
    }

    const multiplierEl = document.getElementById("multiplier");

    if (multiplierEl) {
        multiplierEl.textContent = `Multiplier: ${gameState.multiplier.toFixed(3)}`;
    }

    const payPercentEl = document.getElementById("payPercent");

    if (payPercentEl) {
        payPercentEl.textContent = `Pay Percent: ${gameState.payPercent.toFixed(1)}%`;
    }
    // STOCK DISPLAY
    for (const key in stock) {
        const base = key.replace(/Count$/, "");
        const el = document.getElementById(`${base}Stock`);

        if (el) {
            el.textContent = `Stock: ${stock[key]}`;
        }
    }

    if(eventIsOn){
        document.body.classList.add("event");
        document.body.style.margin = '0px';
    }
}
// ---------------- BUY ----------------

function setupBuyButtons() {
    for (const [btnId, key] of Object.entries(buttonToKey)) {
        const btn = document.getElementById(btnId);
        if (!btn) continue;

        btn.addEventListener("click", () => {
            let price = 0;
            if(gameState.payPercent >= 0){
                price = prices[key] * (gameState.payPercent / 100);
            }
            else{
                price = 0;
            }

            if (gameState.cashCount >= price && stock[key] > 0) {
                gameState.cashCount -= eventIsOn ? price / 2 : price;
                gameState[key]++;
                stock[key]--;

                saveGame();
                updateUI();
            } else {
                alert("Not enough penties or out of stock!");
            }
        });
    }
}

// ---------------- SELL ----------------

function getRandomSellMultiplier() {
    let percent = gameState.cashCount >= 100000
        ? Math.floor(Math.random() * 70 - 20)
        : Math.floor(Math.random() * 70);
    console.log(percent);
    return 1 + percent / 100;
}

function camelToKebab(str) {
    return str.replace(/Count$/, "")
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .toLowerCase();
}

function setupSellButtons() {
    for (const key in gameState) {
        if (key === "cashCount") continue;

        const itemName = camelToKebab(key);

        const singleBtn = document.getElementById(`sell-${itemName}`);
        const allBtn = document.getElementById(`sell-all-${itemName}s`);

        // ---------------- SELL ONE ----------------
        if (singleBtn) {
            singleBtn.addEventListener("click", () => {
                if (gameState[key] <= 0) return;

                const price = prices[key];
                const gain = Math.floor(price * getRandomSellMultiplier());
                const multigain = gain + (gain * gameState.multiplier);

                gameState[key] -= 1;
                gameState.cashCount += multigain;

                saveGame();
                updateUI();
            });
        }

        // ---------------- SELL ALL ----------------
        if (allBtn) {
            allBtn.addEventListener("click", () => {
                const count = gameState[key];
                if (count <= 0) return;

                const price = prices[key];
                const percent = getRandomSellMultiplier();

                const totalGain = Math.floor(price * percent * count);
                const multigain = totalGain + (totalGain * gameState.multiplier);
                console.log(multigain)

                gameState[key] = 0;
                gameState.cashCount += multigain;

                saveGame();
                updateUI();
            });
        }
    }
}

// ---------------- MULTIPLIER ---------------------

function perkIncrease() {
    if(gameState.cashCount >= 100000){
        gameState.multiplier += Math.sqrt(gameState.cashCount) / 10000;
        const multiplier = document.getElementById("multiplier");
        multiplier.textContent = `Multiplier: ${gameState.multiplier.toFixed(3)}`;
        gameState.payPercent -= Math.sqrt(gameState.cashCount) / 1000
        const payPercent = document.getElementById("payPercent");
        payPercent.textContent = `Pay Percent: ${gameState.payPercent.toFixed(1)}%`
        gameState.cashCount = 10;
        gameState.appleCount =  0;
        gameState.bananaCount = 0;
        gameState.orangeCount = 0;
        gameState.yougurtCount = 0;
        gameState.mangoCount = 0;
        gameState.breadCount = 0;
        gameState.frozenAppleSlicesCount = 0;
        gameState.rawBananaCount = 0;
        gameState.frozenOrangeCount = 0;
        gameState.frozenYougurtCount = 0;
        gameState.frozenMangoSlicesCount = 0;
        gameState.toastCount = 0;
        gameState.raisinToastCount = 0;
        gameState.Bitcoin = 0;
        gameState.Litecoin = 0;
        gameState.Dogecoin = 0;
        gameState.BitcoinVal = 100000;
        gameState.LitecoinVal = 100;
        gameState.DogecoinVal = 0.0001;
        saveGame()
    }
    else{
        window.alert("You do not have enough money");
    }
}

// ---------------- WIN SYSTEM (REPLACEMENT) ----------------

const WIN_AMOUNT = 1000000000;
const WIN_KEY = "gameBeaten";

let winState = {
    triggered: false,
    intervalId: null
};

function hasWonAlready() {
    return localStorage.getItem(WIN_KEY) === "true";
}

function setWon() {
    localStorage.setItem(WIN_KEY, "true");
}

function triggerWin() {
    if (winState.triggered) return;

    winState.triggered = true;

    setWon();

    // stop cash loop safely
    if (window.cashLoop) {
        clearInterval(window.cashLoop);
        window.cashLoop = null;
    }

    // optional small delay avoids UI flicker issues
    setTimeout(() => {
        window.location.href = "youHaveWon.html";
    }, 150);
}

function checkWin() {
    if (winState.triggered) return;

    // prevent re-trigger if already beaten in storage
    if (hasWonAlready()) {
        winState.triggered = true;
        return;
    }

    if (gameState.cashCount >= WIN_AMOUNT) {
        triggerWin();
    }
}

function initWinSystem() {
    // if already won before page load
    if (hasWonAlready()) {
        winState.triggered = true;
    }

    // run a lightweight safety check loop
    winState.intervalId = setInterval(checkWin, 500);
}

// --------------- RESTART --------------

function restartGame() {
    if (!confirm("Are you sure you want to restart the game? This will erase all progress.")) {
        return;
    }

    localStorage.removeItem("gameSave");
    localStorage.removeItem("stock");
    localStorage.removeItem("timerSave");
    localStorage.removeItem("eventSave");
    localStorage.removeItem("gameBeaten");

    gameState.cashCount = 10;
    gameState.appleCount =  0;
    gameState.bananaCount = 0;
    gameState.orangeCount = 0;
    gameState.yougurtCount = 0;
    gameState.mangoCount = 0;
    gameState.breadCount = 0;
    gameState.frozenAppleSlicesCount = 0;
    gameState.rawBananaCount = 0;
    gameState.frozenOrangeCount = 0;
    gameState.frozenYougurtCount = 0;
    gameState.frozenMangoSlicesCount = 0;
    gameState.toastCount = 0;
    gameState.raisinToastCount = 0;
    gameState.multiplier = 0;
    gameState.Bitcoin = 0;
    gameState.Litecoin = 0;
    gameState.Dogecoin = 0;
    gameState.BitcoinVal = 100000;
    gameState.LitecoinVal = 100;
    gameState.DogecoinVal = 0.0001;

    timeLeft = 1;

    alert("Game has been reset.");

    window.location.href = "index.html";
}
// ---------------- INIT ----------------

function initiate() {
    loadGame();
    loadStock();
    updateUI();
    setupBuyButtons();
    setupSellButtons();
    setCountDown();

    const cash = document.getElementById("cash");

    if (cash) {
        window.cashLoop = setInterval(() => {
            cash.textContent = `You have ${gameState.cashCount.toLocaleString()} Penties`;
            checkWin();
        }, 500);
    }

    initWinSystem();
}

window.onload = initiate;