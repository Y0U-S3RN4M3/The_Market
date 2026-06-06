if (window.timerRunning) {
    clearInterval(window.timerRunning);
}

let cryptoInterval;
let uiInterval;
let countdownInterval;

// ---------------- GAME STATE ----------------

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
};

let timeLeft = Number(localStorage.getItem("timerSave"));
let savedTime = Number(localStorage.getItem("timerSave"));

const config = {
    eventTime: 60,
    normalTime: 600,
};

let savedTime = Number(localStorage.getItem("timerSave"));

let timeLeft =
    Number.isFinite(savedTime) && savedTime > 0
        ? savedTime
        : config.normalTime;

let eventIsOn = localStorage.getItem("eventSave") === "true";

function callEvent() {
    eventIsOn = true;
    window.onload = () => {
        document.body.style.backgroundColor = "rgb(255, 0, 0, 0.2)";
    };
    location.reload();
    localStorage.setItem("eventSave", eventIsOn);
    timeLeft = config.eventTime;
    window.location.href = "event.html";
}

function stopEvent() {
    eventIsOn = false;
    localStorage.setItem("eventSave", eventIsOn);
    timeLeft = config.normalTime;
    window.location.href = "game.html";
}

// ---------------- TIMER ----------------

let stockReset = localStorage.getItem("stockResetDone") === "true";

function setCountDown() {
    setInterval(() => {
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
        } else if (timeLeft <= 300 && !stockReset) {
            stockReset = true;
            localStorage.setItem("stockResetDone", "true");

            for (let key in stock) {
                if (eventIsOn) {
                    stock[key] = 100;
                } else {
                    stock[key] = 10;
                }
            }

            saveGame();
        }

        localStorage.setItem("timerSave", timeLeft);

        const el = document.getElementById("countDown");
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        if (el)
            el.textContent = `You have ${String(minutes).padStart(
                2,
                "0"
            )}m and ${String(seconds).padStart(2, "0")}s left...`;
    }, 1000);
}

// ---------------- CRYPTO ----------------

function roundDownToDecimals(value, decimals) {
    const m = 10 ** decimals;
    return Math.floor((value + Number.EPSILON) * m) / m;
}

let bgup = true,
    lgup = true,
    dgup = true;

function changeTrend() {
    bgup = Math.random() < 0.9;
    lgup = Math.random() < 0.9;
    dgup = Math.random() < 0.9;

    setTimeout(changeTrend, Math.random() * 60000 + 60000);
}

changeTrend();

function updateCrypto() {
    gameState.BitcoinVal += Math.floor(Math.random() * 3000 - 1000);
    gameState.LitecoinVal += roundDownToDecimals(Math.random() * 2 - 1, 2);
    gameState.DogecoinVal += Math.floor(Math.random() * 1000000 - 500000);

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
    if (btc) btc.textContent = `1 BITCOIN: ${gameState.BitcoinVal} Penties`;

    const ltc = document.getElementById("LitecoinDisplay");
    if (ltc)
        ltc.textContent = `1 LITECOIN: ${gameState.LitecoinVal.toFixed(2)} Penties`;

    const doge = document.getElementById("DogecoinDisplay");
    if (doge)
        doge.textContent = `1 DOGECOIN: ${gameState.DogecoinVal.toFixed(
            6
        )} Penties`;

    saveGame();
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
        };
    }
}

// ---------------- SELL ----------------

const sellAllIds = {
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
};

const sellableItems = Object.keys(prices);

function getRandomSellMultiplier() {
    return 1 + Math.floor(Math.random() * 70) / 100;
}

function camelToKebab(str) {
    return str
        .replace(/Count$/, "")
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

                const gain = Math.floor(
                    prices[key] * getRandomSellMultiplier()
                );

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

                const totalGain = Math.floor(
                    prices[key] * getRandomSellMultiplier() * count
                );

                gameState[key] = 0;
                gameState.cashCount +=
                    totalGain + totalGain * gameState.multiplier;

                saveGame();
                updateUI();
            };
        }
    }
}

// ---------------- UI (FULL RESTORED) ----------------

function updateUI() {
    const cash = document.getElementById("cash");
    if (cash) {
        cash.textContent = `You have ${gameState.cashCount.toLocaleString()} Penties`;
    }

    const mult = document.getElementById("multiplier");
    if (mult)
        mult.textContent = `Multiplier: ${gameState.multiplier.toFixed(3)}`;

    const pay = document.getElementById("payPercent");
    if (pay)
        pay.textContent = `Pay Percent: ${gameState.payPercent.toFixed(1)}%`;

    for (const key in gameState) {
        if (!key.endsWith("Count")) continue;
        if (key === "cashCount") continue;

        const el = document.getElementById(
            `${key.replace(/Count$/, "")}Display`
        );

        if (el) el.textContent = `${key.replace(/Count$/, "")}: ${gameState[key]}`;
    }

    for (const key in stock) {
        const el = document.getElementById(
            `${key.replace(/Count$/, "")}Stock`
        );
        if (el) el.textContent = `Stock: ${stock[key]}`;
    }

    const btc = document.getElementById("BitcoinDisplay");
    if (btc) btc.textContent = `1 BITCOIN: ${gameState.BitcoinVal}`;

    const ltc = document.getElementById("LitecoinDisplay");
    if (ltc) ltc.textContent = `1 LITECOIN: ${gameState.LitecoinVal}`;

    const doge = document.getElementById("DogecoinDisplay");
    if (doge) doge.textContent = `1 DOGECOIN: ${gameState.DogecoinVal}`;
}

// ---------------- PERKS ----------------

function perkIncrease() {
    if (gameState.cashCount >= 100000) {
        gameState.multiplier += Math.sqrt(gameState.cashCount) / 10000;

        const multiplier = document.getElementById("multiplier");
        multiplier.textContent = `Multiplier: ${
            gameState.multiplier.toFixed(3) + 1
        }`;

        gameState.payPercent -= Math.sqrt(gameState.cashCount) / 1000;

        const payPercent = document.getElementById("payPercent");
        payPercent.textContent = `Pay Percent: ${gameState.payPercent.toFixed(
            1
        )}%`;

        gameState.cashCount = 10;

        gameState.appleCount = 0;
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

        for (key in stock) {
            stock[key] = 10;
        }

        saveGame();
    } else {
        window.alert("You do not have enough money");
    }
}

function restartGame() {
    if (!confirm("Are you sure you want to restart? This will erase all progress.")) {
        return;
    }

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

    gameState.appleCount = 0;
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

    gameState.BitcoinVal = 100000;
    gameState.LitecoinVal = 100;
    gameState.DogecoinVal = 10000000000;

    gameState.Bitcoin = 0;
    gameState.Litecoin = 0;
    gameState.Dogecoin = 0;

    for (key in stock) {
        stock[key] = 10;
    }

    timeLeft = config.normalTime;

    localStorage.clear();

    saveGame();
}

// ---------------- INIT ----------------

function initiate() {
    loadGame();
    loadStock();
    updateUI();

    setTimeout(() => {
        setupBuyButtons();
        setupSellButtons();
    }, 50);

    setCountDown();
    cryptoInterval = setInterval(updateCrypto, 1000);
    window.cashLoop = setInterval(updateUI, 500);
}

if (!window.__INIT_STARTED__) {
    window.__INIT_STARTED__ = true;
    window.onload = initiate;
}
