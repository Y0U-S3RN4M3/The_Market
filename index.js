(() => {
    if (window.timerRunning) {
        clearInterval(window.timerRunning);
    }

    console.log(Decimal);

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
    chachingsound.volume = 0.25;
    
    const cashName = `Penties`;
    const cashSymbol = `𝓟`;
    const cashResetValue = new Decimal("10");
    const music = new Audio("sounds/music.mp3");

    music.loop = true;
    music.volume = 0.1;

    music.play();

    let cryptoInterval;
    let uiInterval;
    let countdownInterval;
    const message = `RN im in the ZONE!!! I got ${cashName}${cashSymbol}${cashSymbol}${cashSymbol} on my mind.`
    console.log(message)


    // ---------------- GAME STATE ----------------
    
    let gameState = {
        cashCount: new Decimal(cashResetValue),
        multiplier: 0,
        payPercent: 100,
    
        // common
        appleCount: new Decimal(0),
        bananaCount: new Decimal(0),
        orangeCount: new Decimal(0),
        yougurtCount: new Decimal(0),
        mangoCount: new Decimal(0),
        breadCount: new Decimal(0),
        frozenAppleSlicesCount: new Decimal(0),
        rawBananaCount: new Decimal(0),
        frozenOrangeCount: new Decimal(0),
        frozenYougurtCount: new Decimal(0),
        frozenMangoSlicesCount: new Decimal(0),
        toastCount: new Decimal(0),
        raisinToastCount: new Decimal(0),
        raisinCount: new Decimal(0),
    
        // rare
        chocolateCount: new Decimal(0),
        darkChocolateCount: new Decimal(0),
        pizzaCount: new Decimal(0),
        cookieCount: new Decimal(0),
        chickenCount: new Decimal(0),
        pastaCount: new Decimal(0),
        burgerCount: new Decimal(0),
        donutCount: new Decimal(0),
        pancakeCount: new Decimal(0),
        iceCreamCount: new Decimal(0),
        cheesecakeCount: new Decimal(0),
    
        // uncanny
        bluecapMushroomsCount: new Decimal(0),
        ashenPearsCount: new Decimal(0),
        twighlightHoneycombsCount: new Decimal(0),
        petersPickledPeppersCount: new Decimal(0),
        twistedTurnipCount: new Decimal(0),
        shadowedMelonCount: new Decimal(0),
        crimsonVeinedPlumCount: new Decimal(0),
        monsterCount: new Decimal(0),
        whatCount: new Decimal(0),
    
        // legendary
        grannyAndGrampaPigCount: new Decimal(0),
        weLiveWeLoveWeDieCount: new Decimal(0),
        dogeCount: new Decimal(0),
        rickButRolledCount: new Decimal(0),
        pepeCount: new Decimal(0),
        friedRnestCount: new Decimal(0),
        appaCount: new Decimal(0),
        undefinedItemCount: new Decimal(0),
        overlyDefinedItemCount: new Decimal(0),
    
        // supernatural
        bettysBitterButterCount: new Decimal(0),
        cosmicCheeseCount: new Decimal(0),
        livingSoccerBallCount: new Decimal(0),
        mathCount: new Decimal(0),
        piCount: new Decimal(0),
        meetCount: new Decimal(0),
    
        // mythological
        benCount: new Decimal(0),
        greenGiantCount: new Decimal(0),
        theFirstSpinjitsuMasterCount: new Decimal(0),
        trueRnestCount: new Decimal(0),
        transendantBenCount: new Decimal(0),
    
        // exotic
        sushiCount: new Decimal(0),
        caviarCount: new Decimal(0),
        butterChickenCount: new Decimal(0),
    
        prestiges: new Decimal(0),
    
        BitcoinVal: new Decimal(100000),
        LitecoinVal: new Decimal(100),
        DogecoinVal: new Decimal(10000000000),
    
        workerProfit: new Decimal("1e7"),
        workerAmount: new Decimal(0),
    
        Bitcoin: new Decimal(0),
        Litecoin: new Decimal(0),
        Dogecoin: new Decimal(0),
    
        username: "Anonymous",
    
        code0redeemed: false,
        code1redeemed: false,
        code2redeemed: false,
        code3redeemed: false,
        code4redeemed: false,
        code5redeemed: false,
    
        musicPlaying: true,
    
        worldTwoUnlocked: false,
    };
    
    const defaultGameState = { ...gameState };
    

    function repairGameState() {
        for (const key in defaultGameState) {

            // Recreate deleted properties
            if (!(key in gameState)) {
                gameState[key] = defaultGameState[key];
            }

            // ---------------- DECIMAL VALUES ----------------
            if (
                gameState[key] instanceof Decimal ||
                defaultGameState[key] instanceof Decimal
            ) {
                gameState[key] = toDecimal(gameState[key]);

                // Prevent negative Decimal values
                if (gameState[key].lt(0)) {
                    gameState[key] = new Decimal(0);
                }

                continue;
            }

            // ---------------- NORMAL NUMBERS ----------------
            if (typeof defaultGameState[key] === "number") {

                // Prevent NaN and non-numbers
                if (
                    typeof gameState[key] !== "number" ||
                    isNaN(gameState[key])
                ) {
                    gameState[key] = defaultGameState[key];
                }

                // Prevent negative values
                if (gameState[key] < 0) {
                    gameState[key] = 0;
                }
            }
        }
    }


    
    let prices = {
        // common
        appleCount: new Decimal(10),
        bananaCount: new Decimal(15),
        orangeCount: new Decimal(20),
        yougurtCount: new Decimal(100),
        mangoCount: new Decimal(200),
        breadCount: new Decimal(500),
        frozenAppleSlicesCount: new Decimal(1000),
        rawBananaCount: new Decimal(1500),
        frozenOrangeCount: new Decimal(2500),
        frozenYougurtCount: new Decimal(5000),
        frozenMangoSlicesCount: new Decimal(10000),
        toastCount: new Decimal(20000),
        raisinToastCount: new Decimal(100000),
        raisinCount: new Decimal(5000000),
    
        // rare
        chocolateCount: new Decimal(100*10**6),       // 100M
        darkChocolateCount: new Decimal(5e10),        // 100B
        pizzaCount: new Decimal(750*10**9),           // 750B
        cookieCount: new Decimal(5*10**12),           // 5T
        chickenCount: new Decimal(15*10**15),         // 15Qa
        pastaCount: new Decimal(50*10**18),           // 50Qi
        burgerCount: new Decimal(250*10**21),         // 250Sx
        donutCount: new Decimal(10**24),              // 1Sp
        pancakeCount: new Decimal(10*10**27),         // 10Oc
        iceCreamCount: new Decimal(75*10**30),        // 75No
        cheesecakeCount: new Decimal(1*10**33),       // 1Dec
    
        // uncanny
        bluecapMushroomsCount: new Decimal(10**36),     // 1UnDec
        ashenPearsCount: new Decimal(10**39),           // 1DoDec
        twighlightHoneycombsCount: new Decimal(10**43), // 10TDec
        petersPickledPeppersCount: new Decimal(100*10**45), // 100QaDec
        twistedTurnipCount: new Decimal(2*10**48),      // 2QiDec
        shadowedMelonCount: new Decimal(2*10**52),      // 20SxDec
        crimsonVeinedPlumCount: new Decimal(5*10**57),  // 500SpDec
        monsterCount: new Decimal(10**58),              // 1OctDec
        whatCount: new Decimal(1e61),                   // NoDec

        // legendary
        grannyAndGrampaPigCount: new Decimal(1e59),      // 1NoDec
        weLiveWeLoveWeDieCount: new Decimal(1e63),       // 1Vg
        dogeCount: new Decimal(1e67),                    // 10UnVg
        rickButRolledCount: new Decimal(1e71),           // 100DoVg
        pepeCount: new Decimal(2e74),                    // 200TVg
        friedRnestCount: new Decimal(2e78),              // 2QaVg
        appaCount: new Decimal(5e81),                    // 500QiVg
        undefinedItemCount: new Decimal(1e85),           // 10SpVg
        overlyDefinedItemCount: new Decimal(1e90),       // 1NoVg

        // supernatural
        bettysBitterButterCount: new Decimal(1e93),   // 1Trg
        cosmicCheeseCount: new Decimal(1e99),         // 1DoTrg
        livingSoccerBallCount: new Decimal(1e105),    // 1QaTrg
        mathCount: new Decimal(1e111),                // 1SxTrg
        piCount: new Decimal(1e117),                  // 1NoTrg
        meetCount: new Decimal(1e123),                // 1DoQdrg

        // mythological
        benCount: new Decimal(1e126),                     // 1QaQdrg
        greenGiantCount: new Decimal(1e129),              // 10OctQdrg
        theFirstSpinjitsuMasterCount: new Decimal(1e153), // 1Qqg
        trueRnestCount: new Decimal(1e159),               // 100DoQqg
        transendantBenCount: new Decimal(1e168),          // 1QiQqg

        // exotic                         
        sushiCount: new Decimal(1e183),                   // 1Sxg
        caviarCount: new Decimal(1e192),                  // 1TSxg
        butterChickenCount: new Decimal(1e201),           // 1SxSxg
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
            if(prices[key].gte("1e8")){
                if(prices[key].gte("1e36")){
                    if(prices[key].gte("1e59") && key != `whatCount`){
                        if(prices[key].gte(1e126)){
                            if(prices[key].gte(1e177)){
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
        const savedGame = JSON.parse(localStorage.getItem("gameSave"));
    
        if (savedGame) {
            Object.assign(gameState, savedGame);
        }
    
        const decimalKeys = [
            "cashCount",
            "workerProfit",
            "workerAmount",

            "Bitcoin",
            "Litecoin",
            "Dogecoin",

            "BitcoinVal",
            "LitecoinVal",
            "DogecoinVal"
        ];
    
        decimalKeys.forEach(key => {
            gameState[key] = toDecimal(gameState[key]);
        });
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
        saveGame();
        window.location.href = `event.html`;
        for(let key in stock){
            stock[key] = 100;
        }
    }
    
    function stopEvent(){
        eventIsOn = false;
        localStorage.setItem(`eventSave`, eventIsOn);
        timeLeft = config.normalTime;
        saveGame();
        window.location.href = `game.html`;
        restock();
    }
    
    // ---------------- TIMER ----------------
    
    let stockReset = localStorage.getItem(`stockResetDone`) === `true`;
    
    function setCountDown() {
        countdownInterval = setInterval(() => {
            timeLeft--;
            gameState.cashCount = gameState.cashCount.plus(
                gameState.workerProfit
                    .times(gameState.workerAmount)
                    .div(60)
            );
    
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

    function displayWorkerUI() {
        const amountPrice = Decimal.pow(10, gameState.workerAmount.plus(7));
        const profitPrice = gameState.workerProfit.times(1e4);

        if (amountBtn) {
            amountBtn.textContent =
                `${getFormattedNumber(amountPrice)}(${getHyperE(amountPrice)})${cashSymbol}`;
        }

        if (profitBtn) {
            profitBtn.textContent =
                `${getFormattedNumber(profitPrice)}(${getHyperE(profitPrice)})${cashSymbol}`;
        }

        if (amountDisplay) {
            amountDisplay.textContent =
                `Workers: ${getFormattedNumber(gameState.workerAmount)}`;
        }

        const profit = gameState.workerProfit.times(gameState.workerAmount);

        if (profitDisplay) {
            if (profit.gt(0)) {
                profitDisplay.textContent =
                    `${getFormattedNumber(profit)}(${getHyperE(profit)})${cashSymbol}/m`;
            } else {
                profitDisplay.textContent = `0${cashSymbol}/m`;
            }
        }
    }

    if (amountBtn) {
        amountBtn.addEventListener("click", () => {
            const price = Decimal.pow(10, gameState.workerAmount.plus(7));

            if (gameState.cashCount.lt(price)) {
                alert(`Not enough ${cashName}`);
                return;
            }

            gameState.workerAmount =
                gameState.workerAmount.plus(1);

            gameState.cashCount =
                gameState.cashCount.minus(price);

            displayWorkerUI();
            updateUI();
            saveGame();
        });
    }

    if (profitBtn) {
        profitBtn.addEventListener("click", () => {
            console.log(gameState.workerProfit)
            // Make sure workerProfit is a Decimal
            gameState.workerProfit = new Decimal(gameState.workerProfit);

            const price = gameState.workerProfit.times(1e4);

            if (gameState.cashCount.lt(price)) {
                alert(`Not enough ${cashName}`);
                return;
            }

            // Pay for the upgrade
            gameState.cashCount = gameState.cashCount.minus(price);

            // Increase worker profit
            gameState.workerProfit =
                gameState.workerProfit.times(1e6);

            displayWorkerUI();
            updateUI();
            saveGame();
        });
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
        gameState.BitcoinVal = gameState.BitcoinVal.plus(bchange);
        if (gameState.BitcoinVal.lt(50000)) {
            gameState.BitcoinVal = new Decimal(50000);
        }
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
        gameState.LitecoinVal = gameState.LitecoinVal.plus(lchange);
        if (gameState.LitecoinVal.lt(50)) {
            gameState.LitecoinVal = new Decimal(50);
        }
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
        gameState.DogecoinVal = gameState.DogecoinVal.plus(dchange);        
        if (gameState.DogecoinVal.lt(50000)) {
            gameState.DogecoinVal = new Decimal(50000);
        }
        const btc = document.getElementById(`BitcoinDisplay`);
        if (btc) btc.textContent = `1 BITCOIN: ${getFormattedNumber(gameState.BitcoinVal)}`;
    
        const ltc = document.getElementById(`LitecoinDisplay`);
        if (ltc) ltc.textContent = `Litecoins: ${getFormattedNumber(gameState.Litecoin)}`;    
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
    
    // ---------------- CRYPTO BUY / SELL ----------------
    
    // -------------------- BITCOIN -----------------------
    
    function investBitcoin() {
        const input = Number(document.getElementById(`cryptoInput`).value);
        if (!input || input <= 0) return;
    
        if (gameState.cashCount.lt(input)) return alert(`Not enough ${cashName}`);
    
        const amount = new Decimal(input).div(gameState.BitcoinVal);        
        alert(`You gained ${amount} Bitcoin`)
        gameState.cashCount = gameState.cashCount.minus(input);
        gameState.Bitcoin = gameState.Bitcoin.plus(amount);
    
        saveGame();
        updateUI();
        updateCryptoOwnedUI();
    }
    
    function sellBitcoin() {
        if (gameState.Bitcoin.lte(0)) return alert(`No Bitcoin`);
    
        const gain = gameState.Bitcoin.times(gameState.BitcoinVal);    
        gameState.cashCount = gameState.cashCount.plus(gain);
        gameState.Bitcoin = new Decimal(0);        
        alert(`You got ${gain}${cashSymbol}`);
        saveGame();
        updateUI();
        updateCryptoOwnedUI();
    }
    
    // ---------------- LITECOIN ----------------
    
    function investLitecoin() {
        const input = Number(document.getElementById(`cryptoInput`).value);
        if (!input || input <= 0) return;
    
        if (gameState.cashCount.lt(input)) return alert(`Not enough ${cashName}`);
    
        const amount = new Decimal(input).div(gameState.LitecoinVal);    
        gameState.cashCount = gameState.cashCount.minus(input);
        gameState.Litecoin = gameState.Litecoin.plus(amount);
        
        alert(`You gained ${amount} Litecoin`);
        saveGame();
        updateUI();
        updateCryptoOwnedUI();
    }
    
    function sellLitecoin() {
        if (gameState.Litecoin.lte(0)) return alert(`No Litecoin`);
    
        const gain = gameState.Litecoin.times(gameState.LitecoinVal);    
        gameState.cashCount = gameState.cashCount.plus(gain);
        gameState.Litecoin = new Decimal(0);
        alert(`You got ${gain}${cashSymbol}`);
        saveGame();
        updateUI();
        updateCryptoOwnedUI();
    }
    
    // ---------------- DOGECOIN ----------------
    function investDogecoin() {
        const input = Number(document.getElementById(`cryptoInput`).value);
        if (!input || input <= 0) return;
    
        if (gameState.cashCount.lt(input)) return alert(`Not enough ${cashName}`);
    
        const amount = new Decimal(input).div(gameState.DogecoinVal);    
        gameState.cashCount = gameState.cashCount.minus(input);
        gameState.Dogecoin = gameState.Dogecoin.plus(amount);        
        alert(`You gained ${amount} Dogecoin`)
        saveGame();
        updateUI();
        updateCryptoOwnedUI();
    }
    
    function sellDogecoin() {
        if (gameState.Dogecoin.lte(0)) return alert(`No Dogecoin`);
    
        const gain = gameState.Dogecoin.times(gameState.DogecoinVal);    
        gameState.cashCount = gameState.cashCount.plus(gain);
        gameState.Dogecoin = new Decimal(0);        
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
                const price = toDecimal(prices[key])
                    .times(gameState.payPercent)
                    .div(100);
            
                gameState.cashCount = toDecimal(gameState.cashCount);
            
                gameState[key] = toDecimal(gameState[key]);
            
                if (gameState.cashCount.gte(price) && stock[key] > 0) {
            
                    if (max) {
            
                        let amountCanBuy = gameState.cashCount
                            .div(price)
                            .floor()
                            .toNumber();
            
                        if (eventIsOn) {
                            amountCanBuy *= 2;
                        }
            
                        if (amountCanBuy > stock[key]) {
            
                            amountCanBuy = stock[key];
            
                            const totalCost = eventIsOn
                                ? price.times(amountCanBuy).div(2)
                                : price.times(amountCanBuy);
            
                            gameState.cashCount =
                                gameState.cashCount.minus(totalCost);
            
                            gameState[key] =
                                gameState[key].plus(amountCanBuy);
            
                            stock[key] = 0;
            
                        } else {
            
                            const totalCost = eventIsOn
                                ? price.times(amountCanBuy).div(2)
                                : price.times(amountCanBuy);
            
                            gameState.cashCount =
                                gameState.cashCount.minus(totalCost);
            
                            gameState[key] =
                                gameState[key].plus(amountCanBuy);
            
                            stock[key] -= amountCanBuy;
                        }
            
                    } else {
            
                        const cost = eventIsOn
                            ? price.div(2)
                            : price;
            
                        gameState.cashCount =
                            gameState.cashCount.minus(cost);
            
                        gameState[key] =
                            gameState[key].plus(1);
            
                        stock[key]--;
                    }
            
                    saveGame();
                    updateUI();
            
                } else {
                    alert(`Not enough ${cashName} or out of stock!`);
                }
            };
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
    
                    if (gameState[key].lte(0)) return;
    
                    const gain = prices[key].times(getRandomSellMultiplier()).floor();
                    const total = gain.plus(gain.times(gameState.multiplier));
                    const tootal = total.times((gameState.prestiges / 2) + 1);
    
                    gameState[key] = gameState[key].minus(1);
                    gameState.cashCount = gameState.cashCount.plus(tootal);
    
                    if (tootal.gt(1e6)) {
                        alert(`You recieved ${getFormattedNumber(tootal)}(${getHyperE(tootal)})${cashSymbol}`);
                    } else {
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
    
                    if (count.lte(0)) {
                        alert(`You have none of that food`);
                        return;
                    }
    
                    chachingsound.currentTime = 0.25;
                    chachingsound.play();
    
                    const gain = prices[key]
                        .times(getRandomSellMultiplier())
                        .times(count)
                        .floor();
    
                    const multiGain = gain.plus(gain.times(gameState.multiplier));
                    const prestiGain = multiGain.times((gameState.prestiges / 2) + 1);
    
                    gameState.cashCount = gameState.cashCount.plus(prestiGain);
                    gameState[key] = new Decimal(0);
    
                    if (prestiGain.gt(1e6)) {
                        alert(`You recieved ${getFormattedNumber(prestiGain)}(${getHyperE(prestiGain)})${cashSymbol}`);
                    } else {
                        alert(`You recieved ${getFormattedNumber(prestiGain)}${cashSymbol}`);
                    }
    
                    saveGame();
                    updateUI();
                };
            }
        }
    }

    // ---------------- UI ----------------

    const ui = document.querySelector(`.ui`);
    const uiBtn = document.getElementById(`uiBtn`);

    let uiFixed = true;

    if(uiBtn && ui){
        uiBtn.addEventListener(`click`, () => {
            uiFixed = !uiFixed;

            if(uiFixed){
                ui.classList.add(`uiFixed`);
                uiBtn.textContent = `TYPE 2`;
            }
            else{
                ui.classList.remove(`uiFixed`);
                uiBtn.textContent = `TYPE 1`;
            }
        });
    }


    // ---------------- NUMBER FORMATTING ----------------

    function toDecimal(value){
        if(value instanceof Decimal) return value;

        if(value === undefined || value === null || isNaN(value)){
            return new Decimal(0);
        }

        return new Decimal(value);
    }


    function getNthIllion(n) {
        n = toDecimal(n);
    
        if (n.lt(1_000_000)) return 0;
    
        return Math.floor(n.exponent / 3) - 1;
    }

    function getFormattedNumber(n){
        if(!(n instanceof Decimal)){
            n = new Decimal(n)
        }


        function getNumberShortener(n){

            n = toDecimal(n);

            let string = ``;

            const nthNum = getNthIllion(n);

            const ones = nthNum % 10;
            const tens = Math.floor(nthNum / 10);
            const hundreds = Math.floor(nthNum / 100);


            if(n.gte(1000) && n.lt(1000000)){
                return `K`;
            }


            switch(ones){

                case 1:
                    if(tens === 0){
                        string += `M`;
                    }
                    else{
                        string += `Un`;
                    }
                    break;


                case 2:
                    if(tens === 0){
                        string += `B`;
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


            switch(hundreds){

                case 1:
                    string += `Cnt`;
                    break;

                case 2:
                    string += `Dcnt`;
                    break;

                case 3:
                    string += `Tcnt`;
                    break;

                case 4:
                    string += `Qdgnt`;
                    break;

                case 5:
                    string += `Qqgnt`;
                    break;

                case 6:
                    string += `Sxgnt`;
                    break;

                case 7:
                    string += `Spgnt`;
                    break;

                case 8:
                    string += `Octgnt`;
                    break;

                case 9:
                    string += `Nognt`;
                    break;
            }


            return string;
        }



        function getNumberShortened(n) {
            n = toDecimal(n);

            if (n.lt(1000)) {
                return Math.round(n.toNumber());
            }

            if (n.lt(1_000_000)) {
                return (n.toNumber() / 1000).toFixed(2);
            }

            const nth = getNthIllion(n);
            const divisor = new Decimal(10).pow((nth + 1) * 3);

            return n.div(divisor).toNumber().toFixed(2);
        }



        if (!n || !n.sign || !isFinite(n.mantissa)) {
            return "Infinity";
        }


        return `${getNumberShortened(n)}${getNumberShortener(n)}`;
    }



    function getHyperE(n) {
        n = toDecimal(n);
    
        if (n.lt(1e6)) {
            return n.toNumber();
        }
    
        const zerosAmnt = n.exponent;
        const number = n.mantissa;
        const fixed = number.toFixed(2);
    
        if (zerosAmnt >= 303) return ``;
    
        return `${fixed}e${zerosAmnt}`;
    }
    
    function updateUI(){


        // FIX FROM CONSOLE
    
        const defaultPrices = {
            // your existing defaultPrices object stays here unchanged
        };
    
    
        Object.assign(prices, defaultPrices);
    
    
        repairStock();
        repairGameState();
    
    
        // FIX DECIMALS
    
        gameState.cashCount = toDecimal(gameState.cashCount);
    
        gameState.workerAmount = toDecimal(gameState.workerAmount).floor();
        // ---------------- USERNAME ----------------

        const usernameDisplay = document.getElementById(`usernameDisplay`);
        if(usernameDisplay){
            const username = gameState.username || "Anonymous";
            if(username.slice(-1).toLowerCase() === `s`){
                usernameDisplay.textContent =
                    `${username}' Market`;
            }
            else{
                usernameDisplay.textContent =
                    `${username}'s Market`;
            }
        }



        // ---------------- CASH ----------------

        const cash = document.getElementById(`cash`);
        if(cash){
            const cashValue = toDecimal(gameState.cashCount);
            cash.textContent =
                `${cashName}(${cashSymbol}): ${
                    getFormattedNumber(cashValue)
                }${
                    cashValue.gt(1e6)
                    ?
                    `(${getHyperE(cashValue)})`
                    :
                    ``
                }${cashSymbol}`;

            cash.textContent =
                cash.textContent.replaceAll(`()`, ``);
        }



        // ---------------- PRESTIGES ----------------

        const prestige =
            document.getElementById(`prestiges`);
        if(prestige){

            prestige.textContent =
                `Prestiges: ${gameState.prestiges}`;
        }
        const cashfornext =
            document.getElementById(`cashLevel`);
        if(cashfornext){
            cashfornext.textContent =
                `You need ${
                    getFormattedNumber(
                        getCashLevel(gameState.prestiges)
                    )
                } for the next prestige`;
        }
        // ---------------- MULTIPLIER ----------------
        const mult =
            document.getElementById(`multiplier`);
        const multmax =
            (gameState.prestiges * 4) + 10;
        if(gameState.multiplier > multmax){
            gameState.multiplier = multmax;
        }
        if(gameState.multiplier < 0){
            gameState.multiplier = 0;
        }
        if(mult){
            mult.textContent =
                `Multiplier: ${
                    Number(gameState.multiplier)
                    .toFixed(3)
                }`;
        }
        // ---------------- PAY PERCENT ----------------
        const pay =
            document.getElementById(`payPercent`);
        if(gameState.payPercent < 30){

            gameState.payPercent = 30;

        }
        if(pay){
            pay.textContent =
                `Pay Percent: ${
                    Number(gameState.payPercent)
                    .toFixed(1)
                }%`;
        }

        // ---------------- NEW MULTIPLIER / PAY DISPLAY ----------------


        const newpaypercentdisplay =
            document.getElementById(`newPayPercentDisplay`);

        const newmultiplierdisplay =
            document.getElementById(`newMultiplierDisplay`);

        const gainBase =
            new Decimal(10).pow(
                2 * gameState.prestiges + 5
            );

        const requirement =
            new Decimal(10).pow(
                gameState.prestiges + 5
            );

        const cashValue =
            toDecimal(gameState.cashCount);

        if (cashValue.lt(requirement)) {

            if (newpaypercentdisplay) {
                newpaypercentdisplay.textContent = `...`;
            }

            if (newmultiplierdisplay) {
                newmultiplierdisplay.textContent = `Not Enough`;
            }

        }
        else {

            
            let multiplierGain =
                new Decimal(
                    Math.max(
                        cashValue
                            .div(gainBase)
                            .log(10) + 1,
                        0
                    )
                );

            if (
                multiplierGain.lt(gainBase) &&
                multiplierGain.gt(requirement)
            ) {

                multiplierGain =
                    cashValue
                        .minus(requirement)
                        .div(
                            gainBase
                                .minus(requirement)
                        );
            }

            
            const payPercentLoss =
                new Decimal(
                    cashValue
                        .div(gainBase)
                        .plus(1)
                        .log(10) * 2
                );

            const newMultiplier =
                Decimal.min(
                    new Decimal(gameState.multiplier)
                        .plus(multiplierGain),
                    new Decimal(multmax)
                );

            const newPayPercent =
                Decimal.max(
                    new Decimal(gameState.payPercent)
                        .minus(payPercentLoss),
                    new Decimal(30)
                );

            if (newmultiplierdisplay) {
                newmultiplierdisplay.textContent =
                    `Your new multiplier will be ${
                        Decimal.min(
                            newMultiplier.plus(0.1),
                            new Decimal(multmax)
                        ).toFixed(3)
                    }`;
            }

            if (newpaypercentdisplay) {
                newpaypercentdisplay.textContent =
                    `Your new pay percent will be ${
                        newPayPercent.toFixed(1)
                    }%`;
            }
        }
        // ---------------- MULTIPLIER MAX ----------------

        const multiplierMaxDisplay =
            document.getElementById(`multipliermaxdisplay`);
        if(multiplierMaxDisplay){

            multiplierMaxDisplay.textContent =
                `Your multiplier max is ${multmax}`;

        }
        const prestigeMultDisplay =
            document.getElementById(`prestigemultdisplay`);

        if(prestigeMultDisplay){

            prestigeMultDisplay.textContent =
                `Your prestige multiplier is ${
                    (gameState.prestiges / 2) + 1
                }`;

        }

        const perkneed =
            document.getElementById(`perkneed`);

        const perkRequirement =
            new Decimal(10)
            .pow(
                gameState.prestiges + 5
            );

        if(perkneed){
            perkneed.textContent =
                `You Need ${
                    getFormattedNumber(perkRequirement)
                } To Add To Perks`;
        }
            // ---------------- COSTS ----------------

            const costdisplays =
            document.querySelectorAll(`.cost`);
        const keys =
            Object.keys(prices);

        keys.forEach((key, i) => {
            if(costdisplays[i]){
                const price =
                    toDecimal(prices[key])
                    .times(
                        new Decimal(gameState.payPercent)
                        .div(100)
                    );
                costdisplays[i].textContent =
                    `${getFormattedNumber(price)}${
                        price.gt(1e6)
                        ?
                        `(${getHyperE(price)})`
                        :
                        ``
                    }${cashSymbol}`;
                costdisplays[i].textContent =
                    costdisplays[i]
                    .textContent
                    .replaceAll(`()`, ``);
            }
        });
        // ---------------- ITEMS ----------------
        for(const key in gameState){
            if(!key.endsWith(`Count`)) continue;
            if(key === `cashCount`) continue;
            const el =
                document.getElementById(
                    `${key.replace(/Count$/, ``)}Display`
                );
            if(el){
                el.textContent =
                    `${key.replace(/Count$/, ``)}: ${
                        gameState[key]
                    }`;
            }
        }
        // ---------------- STOCK ----------------

        for(const key in stock){
            const el =
                document.getElementById(
                    `${key.replace(/Count$/, ``)}Stock`
                );
            if(el){
                el.textContent =
                    `Stock: ${stock[key]}`;
            }
        }

        // ---------------- CRYPTO UI ----------------

        const btc =
            document.getElementById(`BitcoinDisplay`);
        if(btc){
            btc.textContent =
                `1 BITCOIN: ${
                    getFormattedNumber(
                        gameState.BitcoinVal
                    )
                }`;
        }
        const ltc =
            document.getElementById(`LitecoinDisplay`);
        if(ltc){
            ltc.textContent =
                `1 LITECOIN: ${
                    getFormattedNumber(
                        gameState.LitecoinVal
                    )
                }`;
        }
        const doge =
            document.getElementById(`DogecoinDisplay`);
        if(doge){
            doge.textContent =
                `1 DOGECOIN: ${
                    getFormattedNumber(
                        gameState.DogecoinVal
                    )
                }`;
        }

    }
    // ----------------- DISPLAY RARITIES & MENU -----------------

    function displayRaritiesAndMenuPages() {

        // MENU

        const menuBtn = document.getElementById("menuBtn");
        const menu = document.getElementById("menu");

        if (menuBtn && menu) {
            menuBtn.addEventListener("click", () => {

                if (menu.style.display === "none") {
                    menu.style.display = "flex";
                    menuBtn.textContent = ">";
                }
                else {
                    menu.style.display = "none";
                    menuBtn.textContent = "<";
                }
            });
        }

        function makeWindow(openId, closeId, windowId) {

            const openBtn = document.getElementById(openId);
            const closeBtn = document.getElementById(closeId);
            const window = document.getElementById(windowId);

            if (openBtn && window) {
                openBtn.addEventListener("click", () => {
                    if (getComputedStyle(window).display === "none") {
                        window.style.display = "flex";
                    }
                });
            }

            if (closeBtn && window) {
                closeBtn.addEventListener("click", () => {
                    window.style.display = "none";
                });
            }
        }
        makeWindow("perkOpen", "removePerkScreen", "addToPerks");
        makeWindow("openPrestigeScreen", "removePrestigeScreen", "prestigeScreen");
        makeWindow("openSettings", "removeSettings", "settings");
        makeWindow("openLeaderboard", "removeLeaderboard", "leaderboardWindow");
        makeWindow("restartGameBtn", "removeRestart", "restart");
        makeWindow("workerBtn", "removeWorkers", "workers");
        makeWindow("openCodes", "removeCodes", "codes");


        function setUpSection(btnId, rarityId, need) {
            const btn = document.getElementById(btnId);
            const fruits = document.getElementById(rarityId);
            if (btn && fruits) {
                btn.addEventListener("click", () => {
                    if (gameState.prestiges >= need) {
                        if (fruits.style.display === "none") {
                            fruits.style.display = "block";
                        }
                        else {
                            fruits.style.display = "none";
                        }
                    }
                    else {

                        alert(`You need ${need} prestiges to enter here`);

                    }
                });
            }
        }


        setUpSection("commonFoodBtn", "commonFoods", 0);
        setUpSection("rareFoodsBtn", "rareFoods", 1);
        setUpSection("uncannyFoodsBtn", "uncannyFoods", 3);
        setUpSection("legendaryFoodsBtn", "legendaryFoods", 5);
        setUpSection("supernaturalFoodsBtn", "supernaturalFoods", 8);
        setUpSection("mythologicalFoodsBtn", "mythologicalFoods", 12);
        setUpSection("exoticFoodsBtn", "exoticFoods", 20);
        setUpSection("dumbStuffBtn", "dumbStuff", 15);

    }



    // ------------------- DUMB STUFF -----------------------

    const prestigesTo14 = document.getElementById("prestigesTo14");

    if (prestigesTo14) {
        prestigesTo14.addEventListener("click", async function () {
            const accepted =
                await confirm("Are you sure you want to set your prestiges to 14?");

            if (accepted) {
                document.getElementById("dumbStuff").style.display = "none";
                gameState.prestiges = 14;
                updateUI();
            }
        });
    }
    const resetWorkerProgress =
        document.getElementById("resetWorkerProgress");
    if (resetWorkerProgress) {
        resetWorkerProgress.addEventListener("click", async function () {
            const accepted =
                await confirm("Are you sure you want to reset your worker progress?");
            if (accepted) {
                document.getElementById("dumbStuff").style.display = "none";
                gameState.workerProfit = new Decimal("1e7");
                gameState.workerAmount = new Decimal(0);
                updateUI();
                displayWorkerUI();
            }
        });

    }

    const resetCash =
        document.getElementById("resetCash");

    if (resetCash) {

        resetCash.addEventListener("click", async function () {

            const accepted =
                await confirm("Are you sure you want to reset your cash?");

            if (accepted) {

                document.getElementById("dumbStuff").style.display = "none";

                // Decimal fix
                gameState.cashCount = new Decimal(cashResetValue);

                updateUI();

            }

        });

    }

    const annoyYou =
        document.getElementById("annoyYou");

    if (annoyYou) {

        annoyYou.addEventListener("click", async function () {

            const accepted =
                await confirm("Are you sure you want to be annoyed irritably for a minute straight? (This doesn't affect your progress)");

            if (accepted) {

                document.getElementById("dumbStuff").style.display = "none";

                getAnnoyed(60);

            }

        });

    }
    function getAnnoyed(seconds) {

        document.body.style.fontSize = "5em";
        document.body.style.filter = "invert(100%)";

        setTimeout(() => {

            document.body.style.fontSize = "1em";
            document.body.style.filter = "none";

        }, seconds * 1000);

    }

    // ------------------ CODES -----------------------

    const redeem = document.getElementById("redeem");
    const input = document.getElementById("codeInput");

    const codes = [
        "Trans3ndantB3n",
        "TruRn3st",
        `MonkeIsTheBest@TheMarket`,
        `MonkeHasInfinite${cashName}`,
        "TemedireIsCool",
        "ColbeFindsHacks",
        "JudeIsDABest",
        "DylanSaysHelloHello",
        "LukaIsLucky",
        "TobyBegsMe",
        "DavidExists",
        "JackHasALife",
        "EvanAnnoysYou",
        "LewisGotASlap"
    ];

    const rewards = [

        // Trans3ndantB3n
        () => {

            const reward = new Decimal("1e99");

            gameState.cashCount =
                gameState.cashCount.plus(reward);

            gameState.transendantBenCount++;

            alert(
                `You gained ${getFormattedNumber(reward)}(${getHyperE(reward)}) and a Transendant Ben`
            );

        },

        // TruRn3st
        () => {

            gameState.multiplier = Math.max(
                gameState.multiplier + 10,
                10 + (gameState.prestiges * 4)
            );

            gameState.trueRnestCount++;

            alert(
                `Your multiplier is now ${gameState.multiplier} and a True Rnest`
            );

        },

        // Green Giant
        () => {

            gameState.greenGiantCount++;

            alert("You got a Green Giant");

        },

        // Cosmic Cheese
        () => {

            gameState.cosmicCheeseCount++;

            alert("You got a Cosmic Cheese");

        },

        // Prestige
        () => {

            gameState.prestiges++;

            alert("You got a Prestige!");

        },

        // Huge Cash
        () => {

            gameState.cashCount =
                new Decimal("9.9999e99");

            alert(
                `You now have ${getFormattedNumber(gameState.cashCount)}(${getHyperE(gameState.cashCount)})`
            );

        },

        // Prestige-scaled cash
        () => {

            const reward =
                new Decimal(10)
                    .pow(gameState.prestiges * 10 + 10);

            gameState.cashCount =
                gameState.cashCount.plus(reward);

            alert(
                `You gained ${getFormattedNumber(reward)}${cashSymbol}`
            );

        },

        // Prestige
        () => {

            gameState.prestiges++;

            alert("You got a Prestige");

        },

        // Dogecoin
        () => {

            const reward = new Decimal("1e50");

            gameState.Dogecoin =
                gameState.Dogecoin.plus(reward);

            alert(
                `You got ${getFormattedNumber(reward)} Dogecoin`
            );

            updateCryptoOwnedUI();

        },

        // Bitcoin
        () => {

            const reward = new Decimal("1e75");

            gameState.Bitcoin =
                gameState.Bitcoin.plus(reward);

            alert(
                `You got ${getFormattedNumber(reward)} Bitcoin`
            );

            updateCryptoOwnedUI();

        },

        // Litecoin
        () => {

            const reward = new Decimal("1e125");

            gameState.Litecoin =
                gameState.Litecoin.plus(reward);

            alert(
                `You got ${getFormattedNumber(reward)} Litecoin`
            );

            updateCryptoOwnedUI();

        },

        // Granny & Grampa Pig
        () => {

            gameState.grannyAndGrampaPigCount += 20;

            alert("You got 20 Granny and Grampa Pigs");

        },

        // Annoy
        () => {

            getAnnoyed(60);

            alert("GET ANNOYED!");

        },

        // Betty's Bitter Butter
        () => {

            gameState.bettysBitterButterCount += 100;

            alert("You got 100 Betty's Bitter Butter's");

        }

    ];

    if (redeem && input) {

        redeem.addEventListener("click", () => {

            const playerInput =
                input.value.trim();

            const index =
                codes.indexOf(playerInput);

            if (index === -1) {

                alert("Invalid Code");
                return;

            }

            if (gameState[`code${index}redeemed`]) {

                alert("You've already redeemed this code.");
                return;

            }

            gameState[`code${index}redeemed`] = true;

            rewards[index]();

            saveGame();

            alert("CODE REDEEMED");

            input.value = "";

        });

    }

    // ------------------- USERNAMES AND LEADERBOARDS -------------------

    const submitBtn = document.getElementById("submitUsernameBtn");

    async function submitUsername() {

        const username =
            document.getElementById("userInput")?.value.trim();

        if (!username) return;

        gameState.username = username
            .replaceAll(" ", "_")
            .trim()
            .slice(0, 12);

        saveGame();
        loadLeaderboard();

    }

    if (submitBtn) {
        submitBtn.addEventListener("click", submitUsername);
    }



    // ------------------- UPLOAD SCORE -------------------

    async function uploadScore() {
        // Don't upload if the leaderboard is disabled
        if (localStorage.getItem("leaderboardEnabled") !== "true") {
            return;
        }

        const { error } = await supabase
            .from("leaderboard")
            .upsert(
                {
                    id: playerId,
                    username: gameState.username,
                    cash: gameState.cashCount.toString(),
                    prestiges: gameState.prestiges,
                    updated_at: new Date()
                },
                {
                    onConflict: "id"
                }
            );

        if (error) {
            console.error("Failed to upload score:", error);
        }
    }

    async function deleteLeaderboardEntry() {
        const { error } = await supabase
            .from("leaderboard")
            .delete()
            .eq("id", playerId);

        if (error) {
            console.error("Failed to delete leaderboard entry:", error);
        }
    }

    // ------------------- LOAD LEADERBOARD -------------------

    async function loadLeaderboard() {

        const { data: ranked, error: rankError } =
            await supabase
                .from("leaderboard")
                .select("*")
                .order("prestiges", { ascending: false })
                .order("cash", { ascending: false });

        if (rankError) {
            console.error(rankError);
            return;
        }

        for (let i = 0; i < ranked.length; i++) {

            await supabase
                .from("leaderboard")
                .update({
                    place: i + 1
                })
                .eq("id", ranked[i].id);

        }


        const { data, error } =
            await supabase
                .from("leaderboard")
                .select("*")
                .lte("place", 10)
                .order("place");

        if (error) {
            console.error(error);
            return;
        }


        const board =
            document.getElementById("leaderboard");

        if (!board) return;

        board.innerHTML = "";


        data.forEach((player, index) => {

            board.innerHTML += `
                <div class="leaderboardRow" id="row${index + 1}">
                    <div class="place">
                        #${index + 1}
                    </div>
                </div>
            `;


            const row =
                document.getElementById(`row${index + 1}`);


            // Decimal fix
            const cash =
                new Decimal(player.cash || 0);


            row.innerHTML += `<div>${player.username}</div>`;
            row.innerHTML += `<div>${player.prestiges}</div>`;
            row.innerHTML += `<div>${getFormattedNumber(cash)}</div>`;


            if (index === 0) {

                row.style.border =
                    "2px solid rgb(219, 164, 0)";

            }
            else if (index === 1) {

                row.style.border =
                    "2px solid rgb(128, 128, 128)";

            }
            else if (index === 2) {

                row.style.border =
                    "2px solid rgb(143, 52, 0)";

            }

        });

    }

    // ----------------- PERKS/PRESTIGES -----------------

    function resetAllGameState() {
        
        gameState.cashCount = new Decimal(cashResetValue);
        
        console.log("after:", gameState.cashCount.toString());


        gameState.cashCount = new Decimal(cashResetValue);

        for (const key in gameState) {

            if (
                key.endsWith("Count") &&
                key !== "cashCount"
            ) {
                gameState[key] = 0;
            }

        }

        gameState.Bitcoin = new Decimal(0);
        gameState.Litecoin = new Decimal(0);
        gameState.Dogecoin = new Decimal(0);

        gameState.BitcoinVal = new Decimal(100000);
        gameState.LitecoinVal = new Decimal(100);
        gameState.DogecoinVal = new Decimal(10000000000);

        gameState.multiplier = 0;
        gameState.payPercent = 100;

    }



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


    function increasePerks() {


        const gainBase =
            new Decimal(10).pow(
                2 * gameState.prestiges + 5
            );

        const requirement =
            new Decimal(10).pow(
                gameState.prestiges + 5
            );


        let multiplierGain =
            Math.max(
                gameState.cashCount
                    .div(gainBase)
                    .log(10) / 10,
                0
            );


        if (
            gameState.cashCount.gt(requirement) &&
            gameState.cashCount.lt(gainBase)
        ) {


            multiplierGain =
                gameState.cashCount
                    .minus(requirement)
                    .div(
                        gainBase.minus(requirement)
                    )
                    .toNumber();

        }

        const maxMultiplier =
            new Decimal(
                10 + (gameState.prestiges * 4)
            );
        
        const totalGain = multiplierGain + 0.1;

        gameState.multiplier = toDecimal(gameState.multiplier);

        gameState.multiplier =
            Decimal.min(
                gameState.multiplier.plus(totalGain),
                maxMultiplier
            );

        const payPercentLoss =
            (
                gameState.cashCount
                    .div(gainBase)
                    .plus(1)
                    .log(10)
                || 0
            ) * 2;

      

        gameState.payPercent =
            Math.max(
                0,
                gameState.payPercent - payPercentLoss
            );
    }




    async function perkIncrease() {
        const accepted =
            await confirm(
                "Are you sure you want to add to perks?"
            );
        if (!accepted) return;
        const requirement =
            new Decimal(10).pow(
                gameState.prestiges + 5
            );
        if (gameState.cashCount.gte(requirement)) {
            if (
                gameState.multiplier < 10 + (gameState.prestiges * 4) ||
                gameState.payPercent > 30
            ) {
                increasePerks();
            }
            else {
                const acceptAgain =
                    await confirm(
                        "You already have max multiplier and pay percent. Continue anyway? You'll gain nothing and only lose money."
                    );
                if (acceptAgain) {
                    increasePerks();
                }
            }
        }
        else {
            alert(
                `You do not have enough ${cashName} to add to perks.`
            );
        }
    }

    const perkBtn = document.getElementById("buyPerkButton"); // Replace with your actual HTML button ID
    if (perkBtn) {
        perkBtn.addEventListener("click", () => {
            increasePerks(); 
            console.log(gameState)
        });
    }




    function getCashLevel(prestige) {

        return new Decimal(10).pow(
            11 * prestige + 9
        );

    }



    async function prestige() {

        const accepted =
            await confirm(
                "Are you sure you want to prestige?"
            );

        if (!accepted) return;



        const cashLevel =
            getCashLevel(gameState.prestiges);



        if (gameState.cashCount.lt(cashLevel)) {

            alert(
                `You do not have enough ${cashName} to prestige`
            );

            return;

        }



        gameState.prestiges++;



        resetAllGameState();



        gameState.workerProfit =
            new Decimal(0);

        gameState.workerAmount =
            (gameState.workerAmount / 10) * 3;



        restock();

        timeLeft = config.normalTime;



        saveGame();

        uploadScore();

        displayWorkerUI();

    }



    const perkIncreaseBtn =
        document.getElementById("perkIncreaseBtn");

    if (perkIncreaseBtn) {

        perkIncreaseBtn.addEventListener(
            "click",
            perkIncrease
        );

    }



    const prestigeBtn =
        document.getElementById("prestigeBtn");

    if (prestigeBtn) {

        prestigeBtn.addEventListener(
            "click",
            prestige
        );

    }
    // ------------ RESTART ------------

    function confirm(message) {

        return new Promise(resolve => {

            clearInterval(countdownInterval);

            const overlay = document.createElement("div");
            overlay.id = "confirmOverlay";

            const confirm = document.createElement("div");
            confirm.id = "confirm";
            confirm.classList.add("confirm");

            const text = document.createElement("div");
            text.textContent = message;

            const btnContainer = document.createElement("div");
            btnContainer.classList.add("allowanddeny");

            const allow = document.createElement("button");
            allow.classList.add("btn");
            allow.classList.add("allowBtn");
            allow.textContent = "allow";

            allow.addEventListener("click", () => {

                confirm.remove();
                overlay.remove();

                alert("Confirmed");

                setCountDown();

                resolve(true);

            });

            const deny = document.createElement("button");
            deny.classList.add("btn");
            deny.classList.add("denyBtn");
            deny.textContent = "deny";

            deny.addEventListener("click", () => {

                confirm.remove();
                overlay.remove();

                setCountDown();

                alert("Rejected");

                resolve(false);

            });

            document.body.appendChild(overlay);
            document.body.appendChild(confirm);

            confirm.appendChild(text);
            confirm.appendChild(document.createElement("br"));
            confirm.appendChild(btnContainer);

            btnContainer.appendChild(allow);
            btnContainer.appendChild(deny);

        });

    }

    async function restartGame() {
        const accepted = await confirm(
            "Are you sure you want to restart? This will erase all progress."
        );

        if (!accepted) return;

        clearInterval(cryptoInterval);
        clearInterval(uiInterval);
        clearInterval(countdownInterval);
        clearInterval(window.cashLoop);

        cryptoInterval = null;
        uiInterval = null;
        countdownInterval = null;
        window.cashLoop = null;

        // Delete the OLD leaderboard row
        await deleteLeaderboardEntry();

        // Reset game
        resetAllGameState();

        gameState.prestiges = 0;
        gameState.workerProfit = new Decimal(0);
        gameState.workerAmount = 0;
        gameState.worldTwoUnlocked = false;

        restock();

        timeLeft = config.normalTime;

        // Completely reset local save
        localStorage.clear();

        // Generate a new player ID
        playerId = crypto.randomUUID();
        localStorage.setItem("playerId", playerId);

        // Keep leaderboard disabled after restart
        localStorage.setItem("leaderboardEnabled", "false");

        // Save the new game WITHOUT uploading it
        localStorage.setItem(
            "gameSave",
            JSON.stringify(gameState)
        );

        localStorage.setItem(
            "stock",
            JSON.stringify(stock)
        );

        localStorage.setItem(
            "timerSave",
            timeLeft
        );

        localStorage.setItem(
            "eventSave",
            "false"
        );

        localStorage.setItem(
            "stockResetDone",
            "false"
        );

        window.location.reload();
    }

    // ----------- CHAPTER TWO -------------
    const world2need = 40;
    const chapterTwoBtn =
        document.getElementById("chapterTwoBtn");

    if (chapterTwoBtn) {

        chapterTwoBtn.addEventListener("click", () => {

            if (gameState.worldTwoUnlocked) {

                window.location = "game2.html";
                return;

            }

            if (gameState.prestiges >= world2need) {

                gameState.worldTwoUnlocked = true;

                saveGame();

                window.location =
                    "chapterTwoCutsene.html";

            }
            else {

                alert(
                    "You are not rich enough, you need to work harder..."
                );

            }

        });

    }

    // ---------------- INIT ----------------

    function initiate() {
        loadGame();
        loadStock();
        updateUI();
        displayRaritiesAndMenuPages();
        loadLeaderboard();
        displayWorkerUI();

        if (gameState.musicPlaying) {
            music.play().catch(() => {
                console.log("Music waiting for user interaction.");
            });
        }
        const clickables = [

            ...document.querySelectorAll(".item"),
            ...document.querySelectorAll(".btn"),

            document.getElementById("removePerkScreen"),
            document.getElementById("removePrestigeScreen"),
            document.getElementById("removeSettings")

        ].filter(Boolean);

        if (gameState.workerProfit.lte(0)) {
            gameState.workerProfit = new Decimal("1e7");
        }

        clickables.forEach(click => {

            click.addEventListener("click", () => {

                clicksound.currentTime = 0.59;
                clicksound.play();

            });

        });



        window.restartGame = restartGame;

        const restartBtn =
            document.getElementById("restartGame");

        if (restartBtn) {

            restartBtn.addEventListener(
                "click",
                restartGame
            );

        }



        window.uploadScore = uploadScore;

        uploadScore();



        setTimeout(() => {

            setupBuyButtons();
            setupSellButtons();

        }, 50);



        // Decimal-compatible Litecoin rounding
        setInterval(() => {

            gameState.LitecoinVal =
                gameState.LitecoinVal.floor();

        }, 100);



        setCountDown();

        cryptoInterval =
            setInterval(updateCrypto, 250);



        window.cashLoop =
            setInterval(updateUI, 500);

    }

    setInterval(() => console.log(gameState), 100)



    // Don't call initiate immediately
    window.onload = initiate;



    window.investBitcoin = investBitcoin;
    window.sellBitcoin = sellBitcoin;

    window.investLitecoin = investLitecoin;
    window.sellLitecoin = sellLitecoin;

    window.investDogecoin = investDogecoin;
    window.sellDogecoin = sellDogecoin;

})();
