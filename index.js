(() => {
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
        raisinCount: 0,
    
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
        whatCount: 0,
    
        // legendary
        grannyAndGrampaPigCount: 0,
        weLiveWeLoveWeDieCount: 0,
        dogeCount: 0,
        rickButRolledCount: 0,
        pepeCount: 0,
        friedRnestCount: 0,
        appaCount: 0,
        undefinedItemCount: 0,
        overlyDefinedItemCount: 0,

        // supernatural
        bettysBitterButterCount: 0,
        cosmicCheeseCount: 0,
        livingSoccerBallCount: 0,
        mathCount: 0,
        piCount: 0,
        meetCount: 0,
        
        prestiges: 0,

        BitcoinVal: 100000,
        LitecoinVal: 100,
        DogecoinVal: 10000000000,
    
        Bitcoin: 0,
        Litecoin: 0,
        Dogecoin: 0,
    };
    
    const defaultGameState = { ...gameState };
    
    function repairGameState() {
        for (const key in defaultGameState) {
    
            // Recreate deleted properties
            if (!(key in gameState)) {
                gameState[key] = defaultGameState[key];
            }
    
            // Prevent NaN and non-numbers
            if (
                typeof defaultGameState[key] === "number" &&
                (
                    typeof gameState[key] !== "number" ||
                    isNaN(gameState[key])
                )
            ) {
                gameState[key] = defaultGameState[key];
            }
    
            // Prevent negative values
            if (
                typeof defaultGameState[key] === "number" &&
                gameState[key] < 0
            ) {
                gameState[key] = 0;
            }
        }
    }
    
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
        raisinCount: 5000000,
    
        // rare
        chocolateCount: 100*10**6,       // 500M
        pizzaCount: 750*10**9,           // 750B
        cookieCount: 5*10**12,           // 5T
        chickenCount: 15*10**15,         // 15Qa
        pastaCount: 50*10**18,           // 50Qi
        burgerCount: 250*10**21,         // 250Sx
        donutCount: 10**24,              // 1Sp
        pancakeCount: 10*10**27,         // 10Oc
        iceCreamCount: 75*10**30,        // 75No
        cheesecakeCount: 1*10**33,       // 1Dec
    
        // uncanny
        bluecapMushroomsCount: 10**36,     // 100UnDec
        ashenPearsCount: 10**39,           // 1DoDec
        twighlightHoneycombsCount: 10**42, // 10TDec
        petersPickledPeppersCount: 100*10**45, // 100QaDec
        twistedTurnipCount: 2*10**48,      // 2QiDec
        shadowedMelonCount: 2*10**52,      // 20SxDec
        crimsonVeinedPlumCount: 5*10**55,  // SpDec
        monsterCount: 10**58,              // OctDec
        whatCount: 1e59,                   // NoDec

        // legendary
        grannyAndGrampaPigCount: 1e59,      // 1NoDec
        weLiveWeLoveWeDieCount: 1e63,       // 1Vg
        dogeCount: 1e67,                    // 10UnVg
        rickButRolledCount: 1e71,           // 100DoVg
        pepeCount: 2e74,                    // 200TVg
        friedRnestCount: 2e78,              // 2QaVg
        appaCount: 5e81,                    // 500QiVg
        undefinedItemCount: 1e85,           // 10SpVg
        overlyDefinedItemCount: 1e87,       // 1NoVg

        // supernatural
        bettysBitterButterCount: 1e93,   // 1Trg
        cosmicCheeseCount: 1e97,         // 10UnTrg
        livingSoccerBallCount: 1e101,    // 100DoTrg
        mathCount: 1e105,                // 1QaTrg
        piCount: 2e109,                  // 20QiTrg
        meetCount: 1e111,                // 1SxTrg
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
        raisinCount: 10,
    
        // rare
        chocolateCount: 15,
        pizzaCount: 15,
        cookieCount: 15,
        chickenCount: 15,
        pastaCount: 15,
        burgerCount: 15,
        donutCount: 15,
        pancakeCount: 15,
        iceCreamCount: 15,
        cheesecakeCount: 15,
    
        // uncanny
        bluecapMushroomsCount: 15,
        ashenPearsCount: 15,
        twighlightHoneycombsCount: 15,
        petersPickledPeppersCount: 15,
        twistedTurnipCount: 15,
        shadowedMelonCount: 15,
        crimsonVeinedPlumCount: 15,
        monsterCount: 15,
        whatCount: 20,

        // legendary
        grannyAndGrampaPigCount: 20,
        weLiveWeLoveWeDieCount: 20,
        dogeCount: 20,
        rickButRolledCount: 20,
        pepeCount: 20,
        friedRnestCount: 20,
        appaCount: 20,
        undefinedItemCount: 20,
        overlyDefinedItemCount: 20,


        // supernatural
        bettysBitterButterCount: 25,
        cosmicCheeseCount: 25,
        livingSoccerBallCount: 25,
        mathCount: 25,
        piCount: 25,
        meetCount: 25,
    };

    function restock(){
        for(key in stock){
            if(prices[key] >= 100*10**6){
                if(prices[key] >= 10**36){
                    if(prices[key] >= 1e59 && stock[key] != 'whatCount'){
                        stock[key] = 25;
                    }
                    else{
                        stock[key] = 20;
                    }
                }
                else{
                    stock[key] = 15;
                }
            }
            else{
                stock[key] = 10;
            }
        }
    }
    
    const defaultStock = { ...stock };
    
    function repairStock() {
        let maxStock = eventIsOn ? 100 : 10;
    
        for (const key in defaultStock) {
            maxStock = eventIsOn ? 100 : defaultStock[key];
            // Recreate deleted stock
            if (!(key in stock)) {
                stock[key] = maxStock;
            }
    
            // Prevent non-numbers
            if (typeof stock[key] !== "number" || isNaN(stock[key])) {
                stock[key] = maxStock;
            }
    
            // Prevent negative stock
            if (stock[key] < 0) {
                stock[key] = 0;
            }
    
            // Prevent too much stock
            if (stock[key] > maxStock) {
                stock[key] = maxStock;
            }
        }
    }
    
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
        raisin: "raisinCount",
    
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
        what: "whatCount",

        grannyAndGrampaPig: "grannyAndGrampaPigCount",
        weLiveWeLoveWeDie: "weLiveWeLoveWeDieCount",
        doge: "dogeCount",
        rickButRolled: "rickButRolledCount",
        pepe: "pepeCount",
        friedRnest: "friedRnestCount",
        appa: "appaCount",
        undefinedItem: "undefinedItemCount",
        overlyDefinedItem: "overlyDefinedItemCount",

        bettysBitterButter: "bettysBitterButterCount",
        cosmicCheese: "cosmicCheeseCount",
        livingSoccerBall: "livingSoccerBallCount",
        math: "mathCount",
        pi: "piCount",
        meet: "meetCount",
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
        restock();
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
                if(eventIsOn){
                    for(let key in stock){
                        stock[key] = 100;
                    }
                }
                else{
                    restock();
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
        if (ltc) ltc.textContent = `1 LITECOIN: ${gameState.LitecoinVal}`;
    
        const doge = document.getElementById("DogecoinDisplay");
        if (doge) doge.textContent = `1 DOGECOIN: ${gameState.DogecoinVal}`;
    
        saveGame();
    }
    
    function updateCryptoOwnedUI() {
        const btc = document.getElementById("Bitcoins");
        const ltc = document.getElementById("Litecoins");
        const doge = document.getElementById("Dogecoins");
    
        if (btc) btc.textContent = `Bitcoins: ${gameState.Bitcoin}`;
        if (ltc) ltc.textContent = `Litecoins: ${gameState.Litecoin}`;
        if (doge) doge.textContent = `Dogecoins: ${gameState.Dogecoin}`;
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
    let max = false;
    const maxBtn = document.getElementById("maxBtn");
    if(maxBtn){
        maxBtn.addEventListener('click', () => {
            if(!max){
                max = true;
                maxBtn.classList.add("maxBtnYes");
                maxBtn.classList.remove("maxBtnNo");
                maxBtn.textContent = 'NO';
            }
            else{
                max = false;
                maxBtn.classList.add('maxBtnNo');
                maxBtn.classList.remove("maxBtnYes");
                maxBtn.textContent = 'YES'
            }
        });
    }
    function setupBuyButtons() {
        for (const [btnId, key] of Object.entries(buttonToKey)) {
            const btn = document.getElementById(btnId);
            if (!btn) continue;
    
            btn.onclick = () => {
                const price = prices[key] * (gameState.payPercent / 100);
                if (gameState.cashCount >= price && stock[key] > 0) {
                    if(max){
                        let amountCanBuy = Math.floor(gameState.cashCount / price);
                        if(amountCanBuy > stock[key]){
                            amountCanBuy = stock[key];
                            gameState.cashCount -= eventIsOn ? (amountCanBuy*price) / 2 : (amountCanBuy*price);
                            gameState[key] += amountCanBuy;
                            stock[key] = 0;
                        }
                        else{
                            gameState.cashCount -=  eventIsOn ? (amountCanBuy*price) / 2 : (amountCanBuy*price);
                            gameState[key] += amountCanBuy;
                            stock[key] -= amountCanBuy;
                        }
                    }
                    else{
                        gameState.cashCount -= eventIsOn ? price / 2 : price;
                        gameState[key]++;
                        stock[key]--;
                    }
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
        raisinCount: "sell-all-raisins",
    
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
        whatCount: "sell-all-whats",

        // legendary
        grannyAndGrampaPigCount: "sell-all-granny-and-grampa-pigs",
        weLiveWeLoveWeDieCount: "sell-all-we-live-we-love-we-dies",
        dogeCount: "sell-all-doges",
        rickButRolledCount: "sell-all-rick-but-rolls",
        pepeCount: "sell-all-pepes",
        friedRnestCount: "sell-all-fried-rnests",
        appaCount: "sell-all-appas",
        undefinedItemCount: "sell-all-undefined-items",
        overlyDefinedItemCount: "sell-all-overly-defined-items",

        // supernatural
        bettysBitterButterCount: "sell-all-bettys-bitter-butters",
        cosmicCheeseCount: "sell-all-cosmic-cheeses",
        livingSoccerBallCount: "sell-all-living-soccer-balls",
        mathCount: "sell-all-maths",
        piCount: "sell-all-pis",
        meetCount: "sell-all-meets",
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
    
    const ui = document.querySelector(".ui");
    const uiBtn = document.getElementById("uiBtn");
    let uiFixed = true;
    if(uiBtn){
        uiBtn.addEventListener('click', () => {
            if(uiFixed){
                uiFixed = false;
                ui.classList.add("ui");
                uiBtn.textContent = 'TYPE 1';
            }
            else{
                uiFixed = true;
                ui.classList.remove("ui");
                uiBtn.textContent = 'TYPE 2';
            }
        })
    }
    
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
            
            if(isNaN((n / divisor))){

            }

            return (n / divisor).toFixed(2);
        }
        if(isNaN(getNumberShortened(n))){
            return 'Infinity';
        }
        return `${getNumberShortened(n)}${getNumberShortener(n)}`;
    }
    function updateUI() {
        // FIX FROM CONSOLE
        const defaultPrices = {
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
            raisinCount: 5000000,
        
            // rare
            chocolateCount: 100 * 10**6,      // 100M
            pizzaCount: 750 * 10**9,          // 750B
            cookieCount: 5 * 10**12,          // 5T
            chickenCount: 15 * 10**15,        // 15Qa
            pastaCount: 50 * 10**18,          // 50Qi
            burgerCount: 250 * 10**21,        // 250Sx
            donutCount: 10**24,               // 1Sp
            pancakeCount: 10 * 10**27,        // 10Oc
            iceCreamCount: 75 * 10**30,       // 75No
            cheesecakeCount: 1 * 10**33,      // 1Dec
        
            // uncanny
            bluecapMushroomsCount: 10**36,      // 1UnDec
            ashenPearsCount: 10**39,            // 1DoDec
            twighlightHoneycombsCount: 10**42,  // 1TDec
            petersPickledPeppersCount: 10**45,  // 1QaDec
            twistedTurnipCount: 2 * 10**48,     // 2QiDec
            shadowedMelonCount: 2 * 10**52,     // 20SxDec
            crimsonVeinedPlumCount: 5 * 10**55, // 5SpDec
            monsterCount: 10**58,               // 1OctDec
            whatCount: 1e59,                    // 1NoDec

            // legendary
            grannyAndGrampaPigCount: 1e59,
            weLiveWeLoveWeDieCount: 1e63,
            dogeCount: 1e67,
            rickButRolledCount: 1e71,
            pepeCount: 2e74,
            friedRnestCount: 2e78,
            appaCount: 5e81,
            undefinedItemCount: 1e85,           // 10SpVg
            overlyDefinedItemCount: 1e87,       // 1NoVg

            // supernatural
            bettysBitterButterCount: 1e84,
            cosmicCheeseCount: 1e85,
            livingSoccerBallCount: 1e87,
            mathCount: 1e92,
            piCount: 2e95,
            meetCount: 1e99,
        };
        
        Object.assign(prices, defaultPrices);
    
        repairStock();
        repairGameState();
        
        // CASH
        const cash = document.getElementById("cash");
        if (cash) {
            cash.textContent = `Penties(℗): ${getFormattedNumber(gameState.cashCount)}℗`;
        }
    
        // PRESTIGES
        const prestige = document.getElementById("prestiges");
        if(prestige) prestige.textContent = `Prestiges: ${gameState.prestiges}`;
    
        const cashfornext = document.getElementById("cashLevel");
        if(cashfornext) cashfornext.textContent = `You need ${getFormattedNumber(getCashLevel(gameState.prestiges))} for the next prestige`; 
    
        // MULTIPLIER
        const mult = document.getElementById("multiplier");
        const multmax = (gameState.prestiges * 4) + 10;
        if(gameState.multiplier > multmax) gameState.multiplier = multmax;
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
    
    // ----------------- DISPLAY RARITIES & MENU -----------------
    function displayRaritiesAndMenuPages(){
        console.log("display rarities and menu pages is runnign")
        // MENU
        const menuBtn = document.getElementById("menuBtn");
        const menu = document.getElementById("menu");
        
        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                if(menu.style.display == 'none'){
                    menu.style.display = 'flex';
                    menuBtn.textContent = '>';
                }
                else{
                    menu.style.display = 'none';
                    menuBtn.textContent = '<';
                }
            });
        }
        // PERKS
        const perkBtn = document.getElementById("perkOpen");
        const perkDiv = document.getElementById("addToPerks");
        const removePerk = document.getElementById("removePerkScreen");
        if (perkBtn) {
            perkBtn.addEventListener('click', () => {
                if(getComputedStyle(perkDiv).display === 'none') perkDiv.style.display = 'flex';
            });
        }
        removePerk?.addEventListener("click", () => {
            console.log("CROSS CLICKED");
            perkDiv.style.display = "none";
        });
        // PRESTIGES
        const prestigeBtn = document.getElementById("openPrestigeScreen");
        const prestigeScreen = document.getElementById("prestigeScreen");
        const removeScreen = document.getElementById("removePrestigeScreen");
        if (prestigeBtn) {
            prestigeBtn.addEventListener('click', () => {
                if(getComputedStyle(prestigeScreen).display === 'none') prestigeScreen.style.display = 'flex';
            });
        }
        removeScreen?.addEventListener("click", () => {
            console.log("CROSS CLICKED");
            prestigeScreen.style.display = "none";
        });
        
        // SETTINGS

        const settingsBtn = document.getElementById('openSettings');
        const removeSettings = document.getElementById('removeSettings');
        const settings = document.getElementById('settings');

        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                if(getComputedStyle(settings).display === 'none') settings.style.display = 'flex';
            });
        }
        removeSettings?.addEventListener("click", () => {
            console.log("CROSS CLICKED");
            settings.style.display = "none";
        });

        const commonBtn = document.getElementById("commonFoodBtn");
        const commonFruits = document.getElementById("commonFoods");

        if (commonBtn) {
            commonBtn.addEventListener('click', () => {
                if(commonFruits.style.display == 'none')
                    commonFruits.style.display = 'block';
                else
                    commonFruits.style.display = 'none';
            });
        }
        
        const rareBtn = document.getElementById("rareFoodsBtn");
        const rareFood = document.getElementById("rareFoods");
        if(rareBtn){
            rareBtn.addEventListener('click', () => {
                if(gameState.prestiges >= 1){
                    if(rareFood.style.display == 'none') rareFood.style.display = 'block';
                    else rareFood.style.display = 'none';
                }
                else{
                    window.alert("You need a prestige to enter here.")
                }
            });
        }
        
        const uncannyBtn = document.getElementById("uncannyFoodsBtn");
        const uncannyFood = document.getElementById("uncannyFoods");
        if(uncannyBtn){
            uncannyBtn.addEventListener('click', () => {
                if(gameState.prestiges >= 3){
                    if(uncannyFood.style.display == 'none') uncannyFood.style.display = 'block';
                    else uncannyFood.style.display = 'none';
                }
                else{
                    window.alert("You need 3 prestiges to enter here")
                }
            });
        }
        
        const legendaryBtn = document.getElementById("legendaryFoodsBtn");
        const legendaryFood = document.getElementById("legendaryFoods");
        if(legendaryBtn){
            legendaryBtn.addEventListener('click', () => {
                if(gameState.prestiges >= 5){
                    if(legendaryFood.style.display == 'none') legendaryFood.style.display = 'block';
                    else legendaryFood.style.display = 'none';
                }
                else{
                    window.alert("You need 5 prestiges to enter here")
                }
            });
        }

        const supernaturalBtn = document.getElementById("supernaturalFoodsBtn");
        const supernaturalFood = document.getElementById("supernaturalFoods");
        if(supernaturalBtn){
            supernaturalBtn.addEventListener('click', () => {
                if(gameState.prestiges >= 8){
                    if(supernaturalFood.style.display == 'none') supernaturalFood.style.display = 'block';
                    else supernaturalFood.style.display = 'none';
                }
                else{
                    window.alert("You need 8 prestiges to enter here")
                }
            });
        }
    }

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
            restock();
            saveGame()
        }
        else{
            window.alert("You do not have enough money");
        }
    }
    
    function getCashLevel(prestige) {
        return 10 ** (11 * prestige + 9);
    }
    
    function prestige(){
        const cashLevel = getCashLevel(gameState.prestiges);
        if(gameState.cashCount < cashLevel){
            window.alert("Not enough Penties");
            return;
        };
        gameState.prestiges += 1;
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
        restock();
        timeLeft = config.normalTime;
        saveGame();
    }
    if(document.getElementById("perkIncreaseBtn")){
        document.getElementById("perkIncreaseBtn").addEventListener('click', perkIncrease);
    }
    if(document.getElementById("prestigeBtn")){
    document.getElementById("prestigeBtn").addEventListener('click', prestige);
    }
    // ------------ RESTART ------------
    function restartGame() {
        if (!confirm("Are you sure you want to restart? This will erase all progress.")) {
            return;
        }
    
        // 🔥 STOP ALL RUNNING LOOPS (this i.s the important part)
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
        for(let key in prices){
            if(prices[key] > 100*10**6){
                if(prices[key] > 10**36){
                    stock[key] = 20;
                }
                else{
                    stock[key] = 15;
                }
            }
            else{
                stock[key] = 10;
            }
        }
        timeLeft = config.normalTime;
        
        // 🧹 CLEAR STORAGE
        localStorage.clear();
    
        // 🔄 RESET STATE (minimal safe reset)
        saveGame()
    }

    window.restartGame = restartGame;

    const restartBtn = document.getElementById("restartGame");

    if (restartBtn) {
        restartBtn.addEventListener("click", restartGame);
    }
    // ---------------- INIT ----------------
    
    function initiate() {
        console.log("INITIATE RUNNING");
        loadGame();
        loadStock();
        updateUI();
        displayRaritiesAndMenuPages();
    
        setTimeout(() => {
            setupBuyButtons();
            setupSellButtons();
        }, 50);

        setInterval(() => {
            gameState.LitecoinVal = Math.floor(gameState.LitecoinVal);
        }, 100)
    
        setCountDown();
        cryptoInterval = setInterval(updateCrypto, 250);
        console.log("CRYPTO INTERVAL STARTED");
    
    
        window.cashLoop = setInterval(updateUI, 500);
    }
    
    window.onload = initiate();    
    window.investBitcoin = investBitcoin;
    window.sellBitcoin = sellBitcoin;
    
    window.investLitecoin = investLitecoin;
    window.sellLitecoin = sellLitecoin;
    
    window.investDogecoin = investDogecoin;
    window.sellDogecoin = sellDogecoin;
    
    })();
