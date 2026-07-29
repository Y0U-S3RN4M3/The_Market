(() => {
    if (window.timerRunning) {
        clearInterval(window.timerRunning);
    }

    const supabaseUrl = `https://xcqkljurfuloskpaqmip.supabase.co`;
    const supabaseKey = `sb_publishable_Po0qIlCYETGizrewPvsgsg_RPw6Rd5C`;

    const supabase = window.supabase.createClient(
        supabaseUrl,
        supabaseKey
    );

    let playerId = localStorage.getItem(`playerId`);

    if (!playerId) {
        playerId = crypto.randomUUID();
        localStorage.setItem(`playerId`, playerId);
    }

    const clicksound = new Audio(`./sounds/mouseclick.mp3`);
    const chachingsound = new Audio(`./sounds/chaching.mp3`);
    const cashName = `Penties`;
    const cashSymbol = `𝓟`;
    const cashResetValue = 10;

    const music = new Audio("sounds/music.mp3");

    music.loop = true;
    music.volume = 0.01;

    music.play();

    let cryptoInterval;
    let uiInterval;
    let countdownInterval;
    const message = `RN im in the ZONE!!! I got ${cashName}${cashSymbol}${cashSymbol}${cashSymbol} on my mind.`
    console.log(message)
    // ---------------- GAME STATE ----------------
    
    let gameState = {
        cashCount: cashResetValue,
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
        darkChocolateCount: 0,
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

        // mythological
        benCount: 0,
        greenGiantCount: 0,
        theFirstSpinjitsuMasterCount: 0,
        trueRnestCount: 0,
        transendantBenCount: 0,

        // exotic
        sushiCount: 0,
        caviarCount: 0,
        butterChickenCount: 0,
        
        prestiges: 0,

        BitcoinVal: 100000,
        LitecoinVal: 100,
        DogecoinVal: 10000000000,

        workerAmount: 0,
        workerProfit: 10e6,
    
        Bitcoin: 0,
        Litecoin: 0,
        Dogecoin: 0,

        username: `Anonymous`,

        code0redeemed: false,
        code1redeemed: false,
        code2redeemed: false,
        code3redeemed: false,
        code4redeemed: false,
        code5redeemed: false,

        musicPlaying: true,
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
                typeof defaultGameState[key] === `number` &&
                (
                    typeof gameState[key] !== `number` ||
                    isNaN(gameState[key])
                )
            ) {
                gameState[key] = defaultGameState[key];
            }
    
            // Prevent negative values
            if (
                typeof defaultGameState[key] === `number` &&
                gameState[key] < 0
            ) {
                gameState[key] = 0;
            }
            if (gameState.workerProfit <= 0) {
                gameState.workerProfit = 10e6;
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
        chocolateCount: 100*10**6,       // 100M
        darkChocolateCount: 5e10,        // 100B
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
        bluecapMushroomsCount: 10**36,     // 1UnDec
        ashenPearsCount: 10**39,           // 1DoDec
        twighlightHoneycombsCount: 10**43, // 10TDec
        petersPickledPeppersCount: 100*10**45, // 100QaDec
        twistedTurnipCount: 2*10**48,      // 2QiDec
        shadowedMelonCount: 2*10**52,      // 20SxDec
        crimsonVeinedPlumCount: 5*10**57,  // 500SpDec
        monsterCount: 10**58,              // 1OctDec
        whatCount: 1e61,                   // NoDec

        // legendary
        grannyAndGrampaPigCount: 1e59,      // 1NoDec
        weLiveWeLoveWeDieCount: 1e63,       // 1Vg
        dogeCount: 1e67,                    // 10UnVg
        rickButRolledCount: 1e71,           // 100DoVg
        pepeCount: 2e74,                    // 200TVg
        friedRnestCount: 2e78,              // 2QaVg
        appaCount: 5e81,                    // 500QiVg
        undefinedItemCount: 1e85,           // 10SpVg
        overlyDefinedItemCount: 1e90,       // 1NoVg

        // supernatural
        bettysBitterButterCount: 1e93,   // 1Trg
        cosmicCheeseCount: 1e99,         // 1DoTrg
        livingSoccerBallCount: 1e105,    // 1QaTrg
        mathCount: 1e111,                // 1SxTrg
        piCount: 1e117,                  // 1NoTrg
        meetCount: 1e123,                // 1DoQdrg

        // mythological
        benCount: 1e126,                     // 1QaQdrg
        greenGiantCount: 1e129,              // 10OctQdrg
        theFirstSpinjitsuMasterCount: 1e153, // 1Qqg
        trueRnestCount: 1e159,               // 100DoQqg
        transendantBenCount: 1e168,          // 1QiQqg

        // exotic                         
        sushiCount: 1e183,                   // 1Sxg
        caviarCount: 1e192,                  // 1TSxg
        butterChickenCount: 1e201,           // 1SxSxg
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
        darkChocolateCount: 15,
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

        // mythological
        benCount: 30,
        greenGiantCount: 30,
        theFirstSpinjitsuMasterCount: 30,
        trueRnestCount: 30,
        transendantBenCount: 30,

        // exotic
        sushiCount: 50,
        caviarCount: 50,
        butterChickenCount: 50,
    };

    function restock(){
        for(key in stock){
            if(prices[key] >= 100*10**6){
                if(prices[key] >= 10**36){
                    if(prices[key] >= 1e59 && key != `whatCount`){
                        if(prices[key] >= 1e126){
                            if(prices[key] >= 1e177){
                                stock[key] = 50
                            }
                            else{
                                stock[key] = 30;
                            }
                        }
                        else{
                            stock[key] = 25;
                        }
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
            if (typeof stock[key] !== `number` || isNaN(stock[key])) {
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
        apples: `appleCount`,
        bananas: `bananaCount`,
        oranges: `orangeCount`,
        yougurt: `yougurtCount`,
        mango: `mangoCount`,
        bread: `breadCount`,
        frozenAppleSlices: `frozenAppleSlicesCount`,
        rawBanana: `rawBananaCount`,
        frozenOrange: `frozenOrangeCount`,
        frozenYougurt: `frozenYougurtCount`,
        frozenMangoSlices: `frozenMangoSlicesCount`,
        toast: `toastCount`,
        raisinToast: `raisinToastCount`,
        raisin: `raisinCount`,
    
        chocolates: `chocolateCount`,
        darkChocolate: `darkChocolateCount`,
        pizzas: `pizzaCount`,
        cookies: `cookieCount`,
        chicken: `chickenCount`,
        pasta: `pastaCount`,
        burger: `burgerCount`,
        donuts: `donutCount`,
        pancakes: `pancakeCount`,
        iceCream: `iceCreamCount`,
        cheesecake: `cheesecakeCount`,
    
        bluecapMushrooms: `bluecapMushroomsCount`,
        ashenPears: `ashenPearsCount`,
        twighlightHoneycombs: `twighlightHoneycombsCount`,
        petersPickledPeppers: `petersPickledPeppersCount`,
        twistedTurnip: `twistedTurnipCount`,
        shadowedMelon: `shadowedMelonCount`,
        crimsonVeinedPlum: `crimsonVeinedPlumCount`,
        monster: `monsterCount`,
        what: `whatCount`,

        grannyAndGrampaPig: `grannyAndGrampaPigCount`,
        weLiveWeLoveWeDie: `weLiveWeLoveWeDieCount`,
        doge: `dogeCount`,
        rickButRolled: `rickButRolledCount`,
        pepe: `pepeCount`,
        friedRnest: `friedRnestCount`,
        appa: `appaCount`,
        undefinedItem: `undefinedItemCount`,
        overlyDefinedItem: `overlyDefinedItemCount`,

        bettysBitterButter: `bettysBitterButterCount`,
        cosmicCheese: `cosmicCheeseCount`,
        livingSoccerBall: `livingSoccerBallCount`,
        math: `mathCount`,
        pi: `piCount`,
        meet: `meetCount`,

        ben: `benCount`,
        greenGiant: `greenGiantCount`,
        theFirstSpinjitsuMaster: `theFirstSpinjitsuMasterCount`,
        trueRnest: `trueRnestCount`,
        transendantBen: `transendantBenCount`,

        sushi: `sushiCount`,
        caviar: `caviarCount`,
        butterChicken: `butterChickenCount`
    };
    
    // ---------------- SAVE / LOAD ----------------
    
    async function saveGame() {
        localStorage.setItem(`gameSave`, JSON.stringify(gameState));
        localStorage.setItem(`stock`, JSON.stringify(stock));
        await loadLeaderboard();
        await uploadScore();
    }
    
    function loadGame() {
        const saved = localStorage.getItem(`gameSave`);
        if (saved) gameState = { ...gameState, ...JSON.parse(saved) };
    }
    
    function loadStock() {
        const saved = localStorage.getItem(`stock`);
        if (saved) stock = JSON.parse(saved);
    }
    
    // ---------------- EVENT SYSTEM ----------------
    
    const config = {
        eventTime: 60,
        normalTime: 600,
    }
    
    
    let timeLeft = Number(localStorage.getItem(`timerSave`));
    if (!timeLeft || isNaN(timeLeft)) timeLeft = config.normalTime;
    
    let eventIsOn = localStorage.getItem(`eventSave`) === `true`;
    
    function callEvent(){
        eventIsOn = true;
        localStorage.setItem(`eventSave`, eventIsOn);
        timeLeft = config.eventTime;
        window.location.href = `event.html`;
        for(let key in stock){
            stock[key] = 100;
        }
    }
    
    function stopEvent(){
        eventIsOn = false;
        localStorage.setItem(`eventSave`, eventIsOn);
        timeLeft = config.normalTime;
        window.location.href = `game.html`;
        restock();
    }
    
    // ---------------- TIMER ----------------
    
    let stockReset = localStorage.getItem(`stockResetDone`) === `true`;
    
    function setCountDown() {
        countdownInterval = setInterval(() => {
            timeLeft--;
            gameState.cashCount += (gameState.workerAmount * gameState.workerProfit)/60
    
            if (timeLeft <= 0) {
                if (eventIsOn) {
                    stockReset = false;
                    stopEvent();
                    document.body.classList.remove(`event`);
                    localStorage.setItem(`stockResetDone`, `false`);
    
                } else {
                    stockReset = false;
                    callEvent();
                    document.body.classList.add(`event`);
                    localStorage.setItem(`stockResetDone`, `false`);
                }
            }
            else if(timeLeft <= 300 && !stockReset){
                stockReset = true;
                localStorage.setItem(`stockResetDone`, `true`);
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
    
            localStorage.setItem(`timerSave`, timeLeft);
    
            const el = document.getElementById(`countDown`);
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            const paddedseconds = String(seconds).padStart(2, `0`);
            if (el) el.textContent = `You have ${minutes}m and ${paddedseconds}s left...`;
        }, 1000);
    }

    // ------------------ ALERTS -------------------
    
    function alert(message){
        const alertDiv = document.getElementById(`alertDiv`);
        const alert = document.createElement(`div`);
        alert.textContent = message;
        alert.classList.add(`alert`);
        alertDiv.appendChild(alert);
        const divCount = alertDiv.children.length;
        if(divCount > 4){
            alertDiv.removeChild(alertDiv.firstElementChild)
        }
        setTimeout(() => alertDiv.removeChild(alert), 3000)
    }

    // ---------------- WORKERS ----------------

    const amountBtn = document.getElementById("workerAmount");
    const profitBtn = document.getElementById("workerProfit");
    const amountDisplay = document.getElementById("workerAmountDisplay");
    const profitDisplay = document.getElementById("workerProfitDisplay");

    function displayWorkerUI(){
        const price = 10**(gameState.workerAmount + 7);
        amountBtn.textContent = `${getFormattedNumber(price)}(${getHyperE(price)})${cashSymbol}`;
        const pricee = gameState.workerProfit*10;
        profitBtn.textContent = `${getFormattedNumber(pricee)}(${getHyperE(pricee)})${cashSymbol}`;
        amountDisplay.textContent = `Workers: ${gameState.workerAmount}`;
        const profit = (gameState.workerAmount * gameState.workerProfit);
        if(profit > 0) profitDisplay.textContent = `${getFormattedNumber(profit)}(${getHyperE(profit)})${cashSymbol}/m`
        else profitDisplay.textContent = `0${cashSymbol}/m`;
    }

    if(amountBtn){
        amountBtn.addEventListener('click', () => {
            const price = 10**(gameState.workerAmount + 7)
            if (gameState.cashCount < price) alert(`Not enough ${cashName}`);
            else{
                gameState.workerAmount++;
                gameState.cashCount -= price;
            }
            displayWorkerUI();
        })
    }

    if(profitBtn){
        profitBtn.addEventListener('click', () => {
            const price = gameState.workerProfit * 10;
            if(gameState.cashCount < price) alert(`Not enough ${cashName}`);
            else{
                gameState.workerProfit *= 1000000;
                gameState.cashCount -= price;
            }
            displayWorkerUI();
        })
    }

    // ----------------- MUSIC -----------------

    const musicBtn = document.getElementById("musicBtn");
    if(musicBtn){
        musicBtn.addEventListener('click', () => {
            const musicplaying = gameState.musicPlaying
            if(musicplaying){
                gameState.musicPlaying = false;
                music.pause();
                music.currentTime = 0;
                musicBtn.classList.add("maxBtnYes");
                musicBtn.classList.remove("maxBtnNo");
                musicBtn.textContent = 'NO'
    
            }
            else{
                gameState.musicPlaying = true;
                music.play();
                musicBtn.classList.add("maxBtnNo");
                musicBtn.classList.remove("maxBtnYes");
                musicBtn.textContent = 'YES'
            }
        });
    }

    // ---------------- CRYPTO ----------------
    
    let bgup = true, lgup = true, dgup = true;
    
    function changeTrend() {
        bgup = Math.random() < 0.9;
        lgup = Math.random() < 0.9;
        dgup = Math.random() < 0.9;
    
        setTimeout(changeTrend, Math.random() * (120000 - 60000) + 60000);    }
    changeTrend();
    
    function updateCrypto() {

        // BITCOIN CHANGE

        let bmin;
        let bmax;
        if(bgup){
            bmin = -25;
            bmax = 250;
        }
        else{
            bmin = -2500;
            bmax = -25;
        }

        const bchange = Math.floor(Math.random() * (bmax - bmin + 1)) + bmin;
        gameState.BitcoinVal += bchange;
        gameState.BitcoinVal = Math.max(gameState.BitcoinVal, 50000);

        // BITCOIN CHANGE

        let lmin;
        let lmax;
        if(lgup){
            lmin = -0.025;
            lmax = 0.25;
        }
        else{
            lmin = -2.500;
            lmax = -0.025;
        }

        let lchange = (Math.random() * (lmax - lmin + 1)) + lmin;
        lchange = Math.round(lchange * 100) / 100;
        gameState.LitecoinVal += lchange;
        gameState.LitecoinVal = Math.max(gameState.LitecoinVal, 50);

        // DOGECOIN CHANGE

        let dmin;
        let dmax;
        if(dgup){
            dmin = -25e5;
            dmax = 25e6;
        }
        else{
            dmin = -25e7;
            dmax = 25e5;
        }

        const dchange = Math.floor(Math.random() * (dmax - dmin + 1)) + dmin;
        gameState.DogecoinVal += dchange;
        gameState.DogecoinVal = Math.max(gameState.DogecoinVal, 50000);

        const btc = document.getElementById(`BitcoinDisplay`);
        if (btc) btc.textContent = `1 BITCOIN: ${getFormattedNumber(gameState.BitcoinVal)}`;
    
        const ltc = document.getElementById(`LitecoinDisplay`);
        if (ltc) ltc.textContent = `1 LITECOIN: ${gameState.LitecoinVal}`;
    
        const doge = document.getElementById(`DogecoinDisplay`);
        if (doge) doge.textContent = `1 DOGECOIN: ${getFormattedNumber(gameState.DogecoinVal)}`;
    
        saveGame();
    }
    
    function updateCryptoOwnedUI() {
        const btc = document.getElementById(`Bitcoins`);
        const ltc = document.getElementById(`Litecoins`);
        const doge = document.getElementById(`Dogecoins`);
    
        if (btc) btc.textContent = `Bitcoins: ${getFormattedNumber(gameState.Bitcoin)}`;
        if (ltc) ltc.textContent = `Litecoins: ${gameState.Litecoin}`;
        if (doge) doge.textContent = `Dogecoins: ${getFormattedNumber(gameState.Dogecoin)}`;
    }
    
    // ---------------- CRYPTO BUY / SELL FIXED ----------------
    
    // -------------------- BITCOIN -----------------------
    
    function investBitcoin() {
        const input = Number(document.getElementById(`cryptoInput`).value);
        if (!input || input <= 0) return;
    
        if (gameState.cashCount < input) return alert(`Not enough ${cashName}`);
    
        const amount = input / gameState.BitcoinVal;
        
        alert(`You gained ${amount} Bitcoin`)
        gameState.cashCount -= input;
        gameState.Bitcoin += amount;
    
        saveGame();
        updateUI();
        updateCryptoOwnedUI();
    }
    
    function sellBitcoin() {
        if (gameState.Bitcoin <= 0) return alert(`No Bitcoin`);
    
        const gain = gameState.Bitcoin * gameState.BitcoinVal;
    
        gameState.cashCount += gain;
        gameState.Bitcoin = 0;
        
        alert(`You got ${gain}${cashSymbol}`);
        saveGame();
        updateUI();
        updateCryptoOwnedUI();
    }
    
    // ---------------- LITECOIN ----------------
    
    function investLitecoin() {
        const input = Number(document.getElementById(`cryptoInput`).value);
        if (!input || input <= 0) return;
    
        if (gameState.cashCount < input) return alert(`Not enough ${cashName}`);
    
        const amount = input / gameState.LitecoinVal;
    
        gameState.cashCount -= input;
        gameState.Litecoin += amount;
        
        alert(`You gained ${amount} Litecoin`);
        saveGame();
        updateUI();
        updateCryptoOwnedUI();
    }
    
    function sellLitecoin() {
        if (gameState.Litecoin <= 0) return alert(`No Litecoin`);
    
        const gain = gameState.Litecoin * gameState.LitecoinVal;
    
        gameState.cashCount += gain;
        gameState.Litecoin = 0;

        alert(`You got ${gain}${cashSymbol}`);
        saveGame();
        updateUI();
        updateCryptoOwnedUI();
    }
    
    // ---------------- DOGECOIN ----------------
    function investDogecoin() {
        const input = Number(document.getElementById(`cryptoInput`).value);
        if (!input || input <= 0) return;
    
        if (gameState.cashCount < input) return alert(`Not enough ${cashName}`);
    
        const amount = input / gameState.DogecoinVal;
    
        gameState.cashCount -= input;
        gameState.Dogecoin += amount;
        
        alert(`You gained ${amount} Dogecoin`)
        saveGame();
        updateUI();
        updateCryptoOwnedUI();
    }
    
    function sellDogecoin() {
        if (gameState.Dogecoin <= 0) return alert(`No Dogecoin`);
    
        const gain = gameState.Dogecoin * gameState.DogecoinVal;
    
        gameState.cashCount += gain;
        gameState.Dogecoin = 0;
        
        alert(`You got ${gain}${cashSymbol}`);
        saveGame();
        updateUI();
        updateCryptoOwnedUI();
    }
    
    // ---------------- BUY ----------------
    let max = false;
    const maxBtn = document.getElementById(`maxBtn`);
    if(maxBtn){
        maxBtn.addEventListener(`click`, () => {
            if(!max){
                max = true;
                maxBtn.classList.add(`maxBtnYes`);
                maxBtn.classList.remove(`maxBtnNo`);
                maxBtn.textContent = `NO`;
            }
            else{
                max = false;
                maxBtn.classList.add(`maxBtnNo`);
                maxBtn.classList.remove(`maxBtnYes`);
                maxBtn.textContent = `YES`
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
                        amountCanBuy = eventIsOn ? amountCanBuy*2 : amountCanBuy;
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
                    alert(`Not enough ${cashName} or out of stock!`);
                }
            }
        }
    }
    
    
    // ---------------- SELL ----------------
    
    const sellAllIds = {
        // common
        appleCount: `sell-all-apples`,
        bananaCount: `sell-all-bananas`,
        orangeCount: `sell-all-oranges`,
        yougurtCount: `sell-all-yougurts`,
        mangoCount: `sell-all-mangos`,
        breadCount: `sell-all-breads`,
        frozenAppleSlicesCount: `sell-all-frozen-apple-slices`,
        rawBananaCount: `sell-all-raw-bananas`,
        frozenOrangeCount: `sell-all-frozen-oranges`,
        frozenYougurtCount: `sell-all-frozen-yougurts`,
        frozenMangoSlicesCount: `sell-all-frozen-mango-slices`,
        toastCount: `sell-all-toasts`,
        raisinToastCount: `sell-all-raisin-toasts`,
        raisinCount: `sell-all-raisins`,
    
        // rare
        chocolateCount: `sell-all-chocolates`,
        darkChocolateCount: `sell-all-dark-chocolates`,
        pizzaCount: `sell-all-pizzas`,
        cookieCount: `sell-all-cookies`,
        chickenCount: `sell-all-chickens`,
        pastaCount: `sell-all-pastas`,
        burgerCount: `sell-all-burgers`,
        donutCount: `sell-all-donuts`,
        pancakeCount: `sell-all-pancakes`,
        iceCreamCount: `sell-all-ice-creams`,
        cheesecakeCount: `sell-all-cheesecakes`,
    
        // uncanny
        bluecapMushroomsCount: `sell-all-bluecap-mushrooms`,
        ashenPearsCount: `sell-all-ashen-pears`,
        twighlightHoneycombsCount: `sell-all-twighlight-honeycombs`,
        petersPickledPeppersCount: `sell-all-peters-pickled-peppers`,
        twistedTurnipCount: `sell-all-twisted-turnip`,
        shadowedMelonCount: `sell-all-shadowed-melon`,
        crimsonVeinedPlumCount: `sell-all-crimson-veined-plum`,
        monsterCount: `sell-all-monsters`,
        whatCount: `sell-all-whats`,

        // legendary
        grannyAndGrampaPigCount: `sell-all-granny-and-grampa-pigs`,
        weLiveWeLoveWeDieCount: `sell-all-we-live-we-love-we-dies`,
        dogeCount: `sell-all-doges`,
        rickButRolledCount: `sell-all-rick-but-rolls`,
        pepeCount: `sell-all-pepes`,
        friedRnestCount: `sell-all-fried-rnests`,
        appaCount: `sell-all-appas`,
        undefinedItemCount: `sell-all-undefined-items`,
        overlyDefinedItemCount: `sell-all-overly-defined-items`,

        // supernatural
        bettysBitterButterCount: `sell-all-bettys-bitter-butters`,
        cosmicCheeseCount: `sell-all-cosmic-cheeses`,
        livingSoccerBallCount: `sell-all-living-soccer-balls`,
        mathCount: `sell-all-maths`,
        piCount: `sell-all-pis`,
        meetCount: `sell-all-meets`,

        // mythological
        benCount: `sell-all-bens`,
        greenGiantCount: `sell-all-green-giants`,
        theFirstSpinjitsuMasterCount: `sell-all-the-first-spinjitsu-masters`,
        trueRnestCount: `sell-all-true-rnests`,
        transendantBenCount: `sell-all-transendant-bens`,

        // exotic
        sushiCount: `sell-all-sushis`,
        caviarCount: `sell-all-caviars`,
        butterChickenCount: `sell-all-butter-chickens`
    };
    
    const sellableItems = Object.keys(prices);
    
    function getRandomSellMultiplier() {
        return 1 + Math.floor(Math.random() * 70) / 100;
    }
    
    function camelToKebab(str) {
        return str.replace(/Count$/, ``)
            .replace(/([a-z0-9])([A-Z])/g, `$1-$2`)
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
                    const tootal = total * ((gameState.prestiges/2) + 1);

                    gameState[key]--;
                    gameState.cashCount += tootal;
                    
                    if(tootal > 1e6){
                        alert(`You recieved ${getFormattedNumber(tootal)}(${getHyperE(tootal)})${cashSymbol}`);
                    }
                    else{
                        alert(`You recieved ${getFormattedNumber(tootal)}${cashSymbol}`);
                    }

                    chachingsound.currentTime = 0.25;
                    chachingsound.play();
    
                    saveGame();
                    updateUI();
                };
            }
    
            if (allBtn) {
                allBtn.onclick = () => {
                    const count = gameState[key];
                    if (!count){
                        alert(`You have none of that food`);
                        return;
                    }

                    chachingsound.currentTime = 0.25;
                    chachingsound.play();
    
                    const gain = Math.floor(prices[key] * getRandomSellMultiplier() * count);
                    const multiGain = gain+(gain*gameState.multiplier);
                    const prestiGain = multiGain * ((gameState.prestiges/2)+1);

                    gameState.cashCount += prestiGain;
                    gameState[key] = 0;


                    if(tootalGain > 1e6){
                        alert(`You recieved ${getFormattedNumber(prestiGain)}(${getHyperE(prestiGain)})${cashSymbol}`);
                    }
                    else{
                        alert(`You recieved ${getFormattedNumber(prestiGain)}${cashSymbol}`);
                    }
    
                    saveGame();
                    updateUI();
                }
            }
        }
    }
    
    // ---------------- UI ----------------
    
    const ui = document.querySelector(`.ui`);
    const uiBtn = document.getElementById(`uiBtn`);
    let uiFixed = true;
    if(uiBtn){
        uiBtn.addEventListener(`click`, () => {
            if(uiFixed){
                uiFixed = false;
                ui.classList.add(`ui`);
                uiBtn.textContent = `TYPE 1`;
            }
            else{
                uiFixed = true;
                ui.classList.remove(`ui`);
                uiBtn.textContent = `TYPE 2`;
            }
        })
    }
    
    function getNthIllion(n){
        if(n < 1_000_000) return 0;
    
        return Math.floor(Math.log10(n) / 3) - 1;
    }
    function getFormattedNumber(n){
        function getNumberShortener(n){
            let string = ``;
            const nthNum = getNthIllion(n);
            const ones = nthNum % 10;
            const tens = Math.floor(nthNum / 10);
            if(n >= 1000 && n < 1000000) return `K`;
            switch(ones){
                case 1:
                    if(tens === 0){
                        string += `M`
                    }
                    else{
                        string += `Un`;
                    }
                    break;
                case 2:
                    if(tens === 0){
                        string += `B`
                    }
                    else{
                        string += `Do`;
                    }
                    break;
                case 3:
                    string += `T`;
                    break;
                case 4:
                    string += `Qa`;
                    break;
                case 5:
                    string += `Qi`;
                    break;
                case 6:
                    string += `Sx`;
                    break;
                case 7:
                    string += `Sp`;
                    break;
                case 8:
                    string += `Oct`;
                    break;
                case 9:
                    string += `No`;
                    break;
            }
            switch(tens){
                case 1:
                    string += `Dec`;
                    break;
                case 2:
                    string += `Vg`;
                    break;
                case 3:
                    string += `Trg`;
                    break;
                case 4:
                    string += `Qdrg`;
                    break;
                case 5:
                    string += `Qqg`;
                    break;
                case 6:
                    string += `Sxg`;
                    break;
                case 7:
                    string += `Spg`;
                    break;
                case 8:
                    string += `Ocg`;
                    break;
                case 9:
                    string += `Nog`;
                    break;
            }
            if(tens === 10){
                
            }
            return string;
        }
        function getNumberShortened(n) {
            if (n < 1000) {
                return Math.round(n);
            }
        
            if (n < 1_000_000 && n >= 1000) {
                return (n / 1000).toFixed(2);
            }
        
            const nth = getNthIllion(n);
            const divisor = 10 ** ((nth + 1) * 3);

            return (n / divisor).toFixed(2);
        }
        if(isNaN(getNumberShortened(n))){
            return `Infinity`;
        }
        return `${getNumberShortened(n)}${getNumberShortener(n)}`;
    }
    function getHyperE(n){
        if(n < 1e6){
            return n;
        }
        const zerosAmnt = Math.floor(Math.log10(n));
        const number = n / (10**zerosAmnt);
        const fixed = number.toFixed(2);

        if(zerosAmnt >= 303) return ``;
        return `${fixed}e${zerosAmnt}`;
    }
    function updateUI() {
        // FIX FROM CONSOLE
        const defaultPrices = {
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
            chocolateCount: 100*10**6,       // 100M
            darkChocolateCount: 5e10,        // 100B
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
            bluecapMushroomsCount: 10**36,     // 1UnDec
            ashenPearsCount: 10**39,           // 1DoDec
            twighlightHoneycombsCount: 10**43, // 10TDec
            petersPickledPeppersCount: 100*10**45, // 100QaDec
            twistedTurnipCount: 2*10**48,      // 2QiDec
            shadowedMelonCount: 2*10**52,      // 20SxDec
            crimsonVeinedPlumCount: 5*10**57,  // 500SpDec
            monsterCount: 10**58,              // 1OctDec
            whatCount: 1e61,                   // NoDec

            // legendary
            grannyAndGrampaPigCount: 1e59,      // 1NoDec
            weLiveWeLoveWeDieCount: 1e63,       // 1Vg
            dogeCount: 1e67,                    // 10UnVg
            rickButRolledCount: 1e71,           // 100DoVg
            pepeCount: 2e74,                    // 200TVg
            friedRnestCount: 2e78,              // 2QaVg
            appaCount: 5e81,                    // 500QiVg
            undefinedItemCount: 1e85,           // 10SpVg
            overlyDefinedItemCount: 1e90,       // 1NoVg

            // supernatural
            bettysBitterButterCount: 1e93,   // 1Trg
            cosmicCheeseCount: 1e99,         // 1DoTrg
            livingSoccerBallCount: 1e105,    // 1QaTrg
            mathCount: 1e111,                // 1SxTrg
            piCount: 1e117,                  // 1NoTrg
            meetCount: 1e123,                // 1DoQdrg

            // mythological
            benCount: 1e126,                     // 1QaQdrg
            greenGiantCount: 1e129,              // 10OctQdrg
            theFirstSpinjitsuMasterCount: 1e153, // 1Qqg
            trueRnestCount: 1e159,               // 100DoQqg
            transendantBenCount: 1e168,          // 1QiQqg

            // exotic                         
            sushiCount: 1e183,                   // 1Sxg
            caviarCount: 1e192,                  // 1TSxg
            butterChickenCount: 1e201,           // 1SxSxg
        };
        
        Object.assign(prices, defaultPrices);
    
        repairStock();
        repairGameState();
        
        gameState.cashCount = Math.floor(gameState.cashCount);
        gameState.workerAmount = Math.round(gameState.workerAmount);

        // USERNAME

        const usernameDisplay = document.getElementById(`usernameDisplay`);
        if(usernameDisplay){
            if(gameState.username.slice(-1).toLowerCase() === `s` || gameState.username.slice(-1).toLowerCase() === `S`){
                usernameDisplay.textContent = `${gameState.username}'s Market`;
            }
            else{
                usernameDisplay.textContent = `${gameState.username}'s Market`
            }
        }

        // CASH
        const cash = document.getElementById(`cash`);
        if (cash) {
            cash.textContent = `${cashName}(${cashSymbol}): ${getFormattedNumber(gameState.cashCount)}${gameState.cashCount > 1e6 ?
                `(` + String(getHyperE(gameState.cashCount)) + `)`:``}${cashSymbol}`;
            const string = cash.textContent;
            const cstring = string.replaceAll(`()`, ``);
            cash.textContent = cstring;
        }
    
        // PRESTIGES
        const prestige = document.getElementById(`prestiges`);
        if(prestige) prestige.textContent = `Prestiges: ${gameState.prestiges}`;
    
        const cashfornext = document.getElementById(`cashLevel`);
        if(cashfornext) cashfornext.textContent = `You need ${getFormattedNumber(getCashLevel(gameState.prestiges))} for the next prestige`; 
    
        // MULTIPLIER
        const mult = document.getElementById(`multiplier`);
        const multmax = (gameState.prestiges * 4) + 10;
        if(gameState.multiplier > multmax) gameState.multiplier = multmax;
        if(gameState.multiplier < 0) gameState.multiplier = 0;
        if (mult) mult.textContent = `Multiplier: ${gameState.multiplier.toFixed(3)}`;
    
        // PAY %
        const pay = 
        document.getElementById(`payPercent`);
        if(gameState.payPercent < 30) gameState.payPercent = 30;
        if (pay) pay.textContent = `Pay Percent: ${gameState.payPercent.toFixed(1)}%`;
        
        // MULTIPLIER AND PAY PERCENT NEW AMOUNT GAIN

        const newpaypercentdisplay = document.getElementById(`newPayPercentDisplay`);
        const newmultiplierdisplay = document.getElementById(`newMultiplierDisplay`);
        const gainBase = 10 ** (2 * gameState.prestiges + 5);
        const requirement = 10** (gameState.prestiges + 5)

        if(gameState.cashCount < requirement){
            newpaypercentdisplay.textContent = `...`;
            newmultiplierdisplay.textContent = `Not Enough`;
        }
        else{
            const gainBase = 10**(2*gameState.prestiges+5);
                    const requirement = 10**(gameState.prestiges+5);
    
            let multiplierGain = Math.max(Math.log10(gameState.cashCount / gainBase) + 1, 0);
            
            if(multiplierGain < gainBase && multiplierGain > requirement){
                multiplierGain = ((gameState.cashCount-requirement)/(gainBase-requirement));
            }

            const payPercentLoss =
                Math.log10(gameState.cashCount / gainBase + 1) * 2;

            const newMultiplier =
                Math.min(gameState.multiplier + multiplierGain, multmax);

            const newPayPercent =
                Math.max(gameState.payPercent - payPercentLoss, 30);

            newmultiplierdisplay.textContent =
                `Your new multiplier will be ${Math.min(newMultiplier + 0.1, multmax)}`;

            newpaypercentdisplay.textContent =
                `Your new pay percent will be ${newPayPercent.toFixed(1)}%`;
        }

        // MULTIPLIER MAX

        document.getElementById(`multipliermaxdisplay`).textContent = `Your multiplier max is ${multmax}`;
        document.getElementById(`prestigemultdisplay`).textContent = `Your prestige multiplier is ${(gameState.prestiges/2) + 1}`;
        const perkneed = 10**(gameState.prestiges + 5);
        document.getElementById(`perkneed`).textContent = `You Need ${getFormattedNumber(perkneed)} To Add To Perks`;

        // COSTS
        const costdisplays = document.querySelectorAll(`.cost`)
        const keys = Object.keys(prices);

        keys.forEach((key, i) => {
            if (costdisplays[i]) {
                const price = prices[key] * (gameState.payPercent / 100)
                const display = getFormattedNumber(price);
                costdisplays[i].textContent =
                    `${display}${price > 1e6 ?
                         `(` + String(getHyperE(price)) + `)`:``}${cashSymbol}`;
                const string = costdisplays[i].textContent;
                const cstring = string.replaceAll(`()`, ``);
                costdisplays[i].textContent = cstring;
                
            }
        });

        // ITEMS
        for (const key in gameState) {
            if (!key.endsWith(`Count`)) continue;
            if (key === `cashCount`) continue;
    
            const el = document.getElementById(
                `${key.replace(/Count$/, ``)}Display`
            );
    
            if (el) {
                el.textContent =
                    `${key.replace(/Count$/, ``)}: ${gameState[key]}`;
            }
        }
    
        // STOCK
        for (const key in stock) {
            const el = document.getElementById(`${key.replace(/Count$/, ``)}Stock`);
            if (el) el.textContent = `Stock: ${stock[key]}`;
        }
    
        // CRYPTO UI
        const btc = document.getElementById(`BitcoinDisplay`);
        if (btc) btc.textContent = `1 BITCOIN: ${getFormattedNumber(gameState.BitcoinVal)}`;
    
        const ltc = document.getElementById(`LitecoinDisplay`);
        if (ltc) ltc.textContent = `1 LITECOIN: ${gameState.LitecoinVal}`;
    
        const doge = document.getElementById(`DogecoinDisplay`);
        if (doge) doge.textContent = `1 DOGECOIN: ${getFormattedNumber(gameState.DogecoinVal)}`;
    }
    
    // ----------------- DISPLAY RARITIES & MENU -----------------\

    function displayRaritiesAndMenuPages(){
        // MENU
        const menuBtn = document.getElementById(`menuBtn`);
        const menu = document.getElementById(`menu`);
        
        if (menuBtn) {
            menuBtn.addEventListener(`click`, () => {
                if(menu.style.display == `none`){
                    menu.style.display = `flex`;
                    menuBtn.textContent = `>`;
                }
                else{
                    menu.style.display = `none`;
                    menuBtn.textContent = `<`;
                }
            });
        }
        function makeWindow(openId, closeId, windowId){
            const openBtn = document.getElementById(openId);
            const closeBtn = document.getElementById(closeId);
            const window = document.getElementById(windowId);
            if (openBtn) {
                openBtn.addEventListener(`click`, () => {
                    if(getComputedStyle(window).display === `none`) window.style.display = `flex`;
                });
            }
            closeBtn?.addEventListener(`click`, () => {
                window.style.display = `none`;
            });
        }

        makeWindow(`perkOpen`, `removePerkScreen`, `addToPerks`);
        makeWindow(`openPrestigeScreen`, `removePrestigeScreen`, `prestigeScreen`);
        makeWindow(`openSettings`, `removeSettings`, `settings`);
        makeWindow(`openLeaderboard`, `removeLeaderboard`, `leaderboardWindow`);
        makeWindow(`restartGameBtn`, `removeRestart`, `restart`);
        makeWindow(`workerBtn`, `removeWorkers`, `workers`);
        makeWindow(`openCodes`, `removeCodes`, `codes`)


        function setUpSection(btnId, rarityId, need){
            const btn = document.getElementById(btnId);
            const fruits = document.getElementById(rarityId);

            if (btn) {
                btn.addEventListener(`click`, () => {
                    if(gameState.prestiges >= need){
                        if(fruits.style.display == `none`) fruits.style.display = `block`;
                        else fruits.style.display = `none`;
                    }
                    else{
                        alert(`You need ${need} prestiges to enter here`)
                    }
                });
            }
        }
        
        setUpSection(`commonFoodBtn`, `commonFoods`, 0);
        setUpSection(`rareFoodsBtn`, `rareFoods`, 1);
        setUpSection(`uncannyFoodsBtn`, `uncannyFoods`, 3);
        setUpSection(`legendaryFoodsBtn`, `legendaryFoods`, 5);
        setUpSection(`supernaturalFoodsBtn`, `supernaturalFoods`, 8);
        setUpSection(`mythologicalFoodsBtn`, `mythologicalFoods`, 12);
        setUpSection(`exoticFoodsBtn`, `exoticFoods`, 20);
        setUpSection(`dumbStuffBtn`, `dumbStuff`, 15);
    }

    // ------------------- DUMB STUFF -----------------------

    const prestigesTo14 = document.getElementById("prestigesTo14");
    if(prestigesTo14){
        prestigesTo14.addEventListener('click', async function(){
            const accepted = await confirm("Are you sure you want to set your prestiges to 14?");
            if(accepted){
                document.getElementById("dumbStuff").style.display = 'none';
                gameState.prestiges = 14;
            }
        });
    }

    const resetWorkerProgress = document.getElementById("resetWorkerProgress");
    if(resetWorkerProgress){
        resetWorkerProgress.addEventListener('click', async function(){
            const accepted = await confirm("Are you sure you want to reset your worker progress");
            if(accepted){
                document.getElementById("dumbStuff").style.display = 'none';
                gameState.workerProfit = 0;
                gameState.workerAmount = 0;
                updateUI();
                displayWorkerUI();
            }
        });
    }

    const resetCash = document.getElementById("resetCash");
    if(resetCash){
        resetCash.addEventListener('click', async function(){
            const accepted = await confirm("Are you sure you want to reset your cash?");
            if(accepted){
                document.getElementById("dumbStuff").style.display = 'none';
                gameState.cashCount = cashResetValue;
            }
        });
    }

    const annoyYou = document.getElementById("annoyYou");

    if(annoyYou){
        annoyYou.addEventListener('click', async function(){
            const accepted = await confirm("Are you sure you want to be annoyed irritably for a minute straight?(doesn't change values of your progress)");
            if(accepted){
                document.getElementById("dumbStuff").style.display = 'none';
                getAnnoyed(60);
            }
        })
    }

    function getAnnoyed(seconds){
        document.body.style.fontSize = '5em';
        document.body.style.filter = 'invert(100%)';
        setTimeout(() => {
            document.body.style.fontSize = '1em';
            document.body.style.filter = 'none';
        }, seconds*1000)
    }

    // ------------------ CODES -----------------------

    const redeem = document.getElementById("redeem");
    const input = document.getElementById("codeInput");
    const codes = ['Trans3ndantB3n',
                   `TruRn3st`,
                   `MonkeIsTheBest@TheMarket`,
                   `MonkeHasInfinite${cashName}`,
                   `TemedireIsCool`, 
                   `ColbeFindsHacks`,
                   `JudeIsDABest`,
                   `DylanSaysHelloHello`,
                   `LukaIsLucky`,
                   `TobyBegsMe`,
                   `DavidExists`];
    const rewards = [
        () => {
            gameState.cashCount += 1e99;
            gameState.transendantBenCount += 1;
            alert(`You gained ${getFormattedNumber(1e99)}(${getHyperE(1e99)}) and a transendant ben`);
        },
        () => {
            gameState.multiplier = Math.min(10+(gameState.prestiges*4), gameState.multiplier + 10);
            gameState.trueRnestCount += 1;
            alert(`Your multiplier is now ${gameState.multiplier} and a True Rnest`);
        },
        () => {
            gameState.greenGiantCount += 1;
            alert(`You got a green giant`);
        },
        () => {
            gameState.cosmicCheeseCount += 1;
            alert(`You got a cosmic cheese`);
        },
        () => {
            gameState.prestiges += 1;
            alert(`You got the a prestige!`);
        },
        () => {
            gameState.cashCount = 9.9999e99;
            alert(`You now have ${getFormattedNumber(9.9999e99)}(${getHyperE(9.9999e99)})`)
        },
        () => {
            gameState.cashCount += 10**(gameState.prestiges * 10 + 10);
            alert(`You gained ${getFormattedNumber(10**(gameState.prestiges * 10 + 10))}${cashSymbol}`);
        },
        () => {
            gameState.prestiges += 1;
            alert(`You got a prestige`);
        },
        () => {
            gameState.Dogecoin += 1e50;
            alert(`You got ${getFormattedNumber(1e50)} Dogecoin`);
            updateCryptoOwnedUI();
        },
        () => {
            gameState.Bitcoin += 1e75;
            alert(`You got ${getFormattedNumber(1e75)} Bitcoin`);
            updateCryptoOwnedUI();
        },
        () => {
            gameState.Litecoin += 1e125;
            alert(`You got ${getFormattedNumber(1e125)} Litecoin`)
            updateCryptoOwnedUI();
        },
    ];

    redeem.addEventListener("click", () => {
        const playerInput = input.value.trim();
    
        const index = codes.indexOf(playerInput);
    
        if (index === -1) {
            alert("Invalid Code");
            return;
        }
        else if (gameState[`code${index}redeemed`]) {
            gameState[`code${index}redeemed`] = true;
            alert("You've already redeemed this code.");
            return;
        }
        else{
            gameState[`code${index}redeemed`] = true;
        
            rewards[index]();
        
            saveGame();
        
            alert("CODE REDEEMED");
        }
    });

    // ------------------- USERNAMES AND LEADERBOARDS -------------------

    const submitBtn = document.getElementById(`submitUsernameBtn`);

    async function submitUsername() {
        const username = document.getElementById(`userInput`).value.trim();
    
        if (!username) return;
    
        gameState.username = username.replaceAll(` `, `_`);
        gameState.username = gameState.username.trim();
        gameState.username = gameState.username.slice(0, 12);
    
        saveGame();
        loadLeaderboard();
    }

    if(submitBtn) submitBtn.addEventListener(`click`, submitUsername);

    async function uploadScore() {
        const { error } = await supabase
            .from(`leaderboard`)
            .upsert(
                {
                    id: playerId,
                    username: gameState.username,
                    cash: gameState.cashCount,
                    prestiges: gameState.prestiges,
                    updated_at: new Date()
                },
                {
                    onConflict: `id`
                }
            );
    
        if (error) {
            console.error(error);
        }
    }

    async function loadLeaderboard() {

        const { data: ranked } = await supabase
            .from("leaderboard")
            .select("*")
            .order("prestiges", { ascending: false })
            .order("cash", { ascending: false });

        for (let i = 0; i < ranked.length; i++) {
            await supabase
                .from("leaderboard")
                .update({ place: i + 1 })
                .eq("id", ranked[i].id);
        }

        const { data, error } = await supabase
            .from("leaderboard")
            .select("*")
            .lte("place", 10)
            .order("place");
        
        console.log(data);
        console.log(error);

        const board = document.getElementById(`leaderboard`);
    
        board.innerHTML = ``;
    
        data.forEach(async function(player, index){ 
            
            board.innerHTML += `
                <div class='leaderboardRow' id='row${index + 1}'>
                    <div class='place'>
                        #${index + 1}
                    </div>
                </div>
            `;
            const row = document.getElementById(`row${index+1}`);
            row.innerHTML += `<div>${(player.username)}</div>`;
            row.innerHTML += `<div>${(String(player.prestiges))}</div>`
            row.innerHTML += `<div>${(String(getFormattedNumber(player.cash)))}</div>`;

            if(index === 0){
                row.style.border = `2px solid rgb(219, 164, 0)`;
            }
            else if(index === 1){
                row.style.border = `2px solid rgb(128, 128, 128)`;
            }
            else if(index === 2){
                row.style.border = `2px solid rgb(143, 52, 0)`;
            }
        });
    }

    // ----------------- PERKS/PRESTIGES -----------------
    
    function resetAllGameState() {
        gameState.cashCount = cashResetValue;
        for (const key in gameState) {
            if (
                key.endsWith(`Count`) &&
                key !== `cashCount`
            ) {
                gameState[key] = 0;
            }
        }
        gameState.Bitcoin = 0;
        gameState.Litecoin = 0;
        gameState.Dogecoin = 0;
        gameState.BitcoinVal = 100000;
        gameState.LitecoinVal = 100;
        gameState.DogecoinVal = 10000000000;
        gameState.multiplier = 0;
        gameState.payPercent = 100;
        
    }
    function resetAllItems(){
        for (const key in gameState) {
            if (
                key.endsWith(`Count`) &&
                key !== `cashCount`
            ) {
                gameState[key] = 0;
            }
        }
    }
    
    function increasePerks(){
        const gainBase = 10**(2*gameState.prestiges+5);
        const requirement = 10**(gameState.prestiges+5);

        let multiplierGain = Math.max(Math.log10(gameState.cashCount / gainBase) + 1, 0);
        
        if(multiplierGain < gainBase && multiplierGain > requirement){
            multiplierGain = ((gameState.cashCount-requirement)/(gainBase-requirement));
        }

        gameState.multiplier += Math.min(multiplierGain + 0.1, 10+(gameState.prestiges*4));
        const multiplier = document.getElementById(`multiplier`);
        multiplier.textContent = `Multiplier: ${gameState.multiplier.toFixed(3) + 1}`;

        const payPercentLoss = Math.log10(gameState.cashCount / gainBase + 1) * 2;

        gameState.payPercent -= payPercentLoss;
        const payPercent = document.getElementById(`payPercent`);
        payPercent.textContent = `Pay Percent: ${gameState.payPercent.toFixed(1)}%`;

        gameState.cashCount = cashResetValue;
        resetAllItems();
        gameState.workerProfit = 10 ** (Math.floor(Math.log10(gameState.workerProfit) / 6));
        restock();
        saveGame();
        uploadScore();
        displayWorkerUI();
    }

    async function perkIncrease() {
        const accepted = await confirm("Are you sure you want to add to perks?");
        if(accepted){
            if(gameState.cashCount >= 10**(gameState.prestiges + 5)){
                if(gameState.multiplier < 10+(gameState.prestiges*4) || gameState.payPercent > 30){
                    increasePerks();
                }
                else{
                    const acceptAgain = await confirm(`You already have max multiplier and pay percent? Are you still sure? You'll gain nothing and only lose money`);
                    if(acceptAgain){
                        increasePerks();
                    }

                }
            }
            else{
                alert(`You do not have enough ${cashName} to add to perks.`);
            }
        } 
    }
    
    function getCashLevel(prestige){
        return 10 ** (11 * prestige + 9);
    }
    async function prestige(){
        const accepted = await confirm("Are you sure you want to prestige?");
        if(accepted){
            const cashLevel = getCashLevel(gameState.prestiges);
            if(gameState.cashCount < cashLevel){
                alert(`You do not enough ${cashName} to prestige`);
                return;
            }
            gameState.prestiges += 1;
            resetAllGameState();
            gameState.workerProfit = 0;
            gameState.workerAmount = (gameState.workerAmount/10)*3;
            restock();
            timeLeft = config.normalTime;
            saveGame();
            uploadScore();
            displayWorkerUI();
        }
    }

        if(document.getElementById(`perkIncreaseBtn`)){
            document.getElementById(`perkIncreaseBtn`).addEventListener(`click`, perkIncrease);
        }
        if(document.getElementById(`prestigeBtn`)){
        document.getElementById(`prestigeBtn`).addEventListener(`click`, prestige);
        }
    // ------------ RESTART ------------

    function confirm(message){
        return new Promise(resolve => {
            clearInterval(countdownInterval);
            const overlay = document.createElement("div");
            overlay.id = "confirmOverlay";

            const confirm = document.createElement("div");
            confirm.id = 'confirm';
            confirm.classList.add("confirm");

            const text = document.createElement("div");
            text.textContent = message;

            const btnContainer = document.createElement("div");
            btnContainer.classList.add("allowanddeny")

            const allow = document.createElement("button");
            allow.classList.add("btn");
            allow.classList.add("allowBtn");
            allow.textContent = 'allow';
            allow.addEventListener('click', () => {
                confirm.remove();
                overlay.remove();
                alert("Confirmed");
                setCountDown();
                resolve(true);
            });

            const deny = document.createElement("button");
            deny.classList.add("btn");
            deny.classList.add("denyBtn");
            deny.textContent = 'deny';
            deny.addEventListener('click', () => {
                confirm.remove();
                overlay.remove();
                setCountDown();
                alert("rejected");
                resolve(false);
            });

            document.body.appendChild(overlay);
            document.body.appendChild(confirm)
            confirm.appendChild(text);
            confirm.appendChild(document.createElement("br"));
            confirm.appendChild(btnContainer);
            btnContainer.appendChild(allow);
            btnContainer.appendChild(deny);
        });
    }

    async function restartGame() {
        const accepted = await confirm(
            `Are you sure you want to restart? This will erase all progress.`
        );
        if (accepted) {
            clearInterval(cryptoInterval);
            clearInterval(uiInterval);
            clearInterval(countdownInterval);
            clearInterval(window.cashLoop);
        
            cryptoInterval = null;
            uiInterval = null;
            countdownInterval = null;
            window.cashLoop = null;        
            resetAllGameState();
            gameState.prestiges = 0;
            gameState.workerProfit = 0;
            gameState.workerAmount = 0;
            restock();
            timeLeft = config.normalTime;
            
            localStorage.clear();
        
            saveGame();
            uploadScore();
            displayWorkerUI();

            window.location.reload();
        }
    }

    // ---------------- INIT ----------------
    
    function initiate() {
        loadGame();
        loadStock();
        updateUI();
        displayRaritiesAndMenuPages();
        loadLeaderboard();
        displayWorkerUI();

        music.play();

        setTimeout(() => music.play(), 500)

        if(gameState.musicPlaying){
            music.play();
        }
        const clickables = [...document.querySelectorAll(`.item`), ...document.querySelectorAll(`.btn`), document.getElementById(`removePerkScreen`), document.getElementById(`removePrestigeScreen`), document.getElementById(`removeSettings`)];
        clickables.forEach(click => {
            click.addEventListener(`click`, () => {
                clicksound.currentTime = 0.59;
                clicksound.play();
            });
        });


        window.restartGame = restartGame;
        const restartBtn = document.getElementById(`restartGame`);

        if (restartBtn) {
            restartBtn.addEventListener(`click`, () => {
                restartGame();
            });
        }

        window.uploadScore = uploadScore;
        uploadScore();
    
        setTimeout(() => {
            setupBuyButtons();
            setupSellButtons();
        }, 50);

        setInterval(() => {
            gameState.LitecoinVal = Math.floor(gameState.LitecoinVal);
        }, 100)
    
        setCountDown();
        cryptoInterval = setInterval(updateCrypto, 250);
    
    
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
