
(() => {
    const message = `THE MARKET IS THE BEST`;
    console.log(message);

    const savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (!savedGame || savedGame.worldTwoUnlocked !== true) {
        console.log("ACCESS DENIED - REDIRECTING");
        window.location.replace("game.html");
        return;
    }
    const cashName = `Grand Penties`;
    const cashSymbol = `GP$.MKT`;
    const basePrice = 1e5
    const music = new Audio("sounds/music.mp3");
    music.loop = true;
    music.volume = 0.2;
    music.play();

    // ---------------- STATUS ---------------------------
    let status = {
        cash: 1000000,
        food: 10000,
        wood: 1000,
        steel: 1000,
        brick: 1000,
        oil: 1000,

        customers: 100,

        foodIncome: 250,
        woodIncome: 25,
        steelIncome: 25,
        brickIncome: 25,
        oilIncome: 25,

        foodUsage: 0,
        woodUsage: 0,
        steelUsage: 0,
        brickUsage: 0,
        oilUsage: 0,

        upgradeResources(operator, amount){
            if(operator === '1'){
                status.wood **= amount;
                status.oil **= amount;
                status.steel **= amount;
                status.brick **= amount;
            }
            else{
                status.brick *= amount;
                status.oil *= amount;
                status.steel *= amount;
                status.wood *= amount;
            }
        },
        
        domainNames: {
            domain1: 'Chapelton Square',
            domain2: 'Tumortown',
            domain3: 'Hamilton Villa',
            domain4: 'Hurlington Lake',
            domain5: 'Churchill Ellyn',
            domain6: 'Pine Estates',
            domain7: 'Busch Dale',
            domain8: 'Broad Park',
            domain9: 'Sunset highlands',
            domain10: 'The Vortex',
            domain11: 'Domain Avenue',
            domain12: 'Cash Street',
            domain13: 'Market square',
            domain14: 'Lott Coventry',
            domain15: 'Malevolent Shrine',
            domain16: 'Trafalgar Cybercity',
            domain17: 'Bugattisporshe Neonspire',
            domain18: 'Quantum Metropolis',
            domain19: 'Zenith',
            domain20: 'The Skyline',
            domain21: 'The GREAT HALL of PENTY'
        },
        domainStatus: {
            domain1: true,
            domain2: true,
            domain3: true,
            domain4: true,
            domain5: true,
            domain6: true,
            domain7: true,
            domain8: true,
            domain9: true,
            domain10: true,
            domain11: true,
            domain12: true,
            domain13: true,
            domain14: true,
            domain15: true,
            domain16: true,
            domain17: true,
            domain18: true,
            domain19: true,
            domain20: true,
            domain21: true,
        },
        setSalaryCaps: {
            domain1: 1e6,
            domain2: 1e6,
            domain3: 1e6,
            domain4: 1e6,
            domain5: 1e6,
            domain6: 1e9,
            domain7: 1e9,
            domain8: 1e9,
            domain9: 1e9,
            domain10: 1e9,
            domain11: 1e12,
            domain12: 1e12,
            domain13: 1e12,
            domain14: 1e12,
            domain15: 1e12,
            domain16: 1e18,
            domain17: 1e18,
            domain18: 1e18,
            domain19: 1e18,
            domain20: 1e20,
            domain21: 1e24,
        },
        changingSalaryCaps: {
            domain1: 1e6,
            domain2: 1e6,
            domain3: 1e6,
            domain4: 1e6,
            domain5: 1e6,
            domain6: 1e9,
            domain7: 1e9,
            domain8: 1e9,
            domain9: 1e9,
            domain10: 1e9,
            domain11: 1e12,
            domain12: 1e12,
            domain13: 1e12,
            domain14: 1e12,
            domain15: 1e12,
            domain16: 1e18,
            domain17: 1e18,
            domain18: 1e18,
            domain19: 1e18,
            domain20: 1e20,
            domain21: 1e24,
        },
        domainInvestmentTotals: {
            domain1: 1e8,
            domain2: 1e8,
            domain3: 1e9,
            domain4: 1e9,
            domain5: 1e9,
            domain6: 1e11,
            domain7: 1e11,
            domain8: 1e12,
            domain9: 1e12,
            domain10: 1e12,
            domain11: 1e14,
            domain12: 1e14,
            domain13: 1e15,
            domain14: 1e15,
            domain15: 1e17,
            domain16: 1e20,
            domain17: 1e20,
            domain18: 1e21,
            domain19: 1e21,
            domain20: 1e24,
            domain21: 1e28,
        },
        upgradePart: {
            domain1: 0,
            domain2: 0,
            domain3: 0,
            domain4: 0,
            domain5: 0,
            domain6: 0,
            domain7: 0,
            domain8: 0,
            domain9: 0,
            domain10: 0,
            domain11: 0,
            domain12: 0,
            domain13: 0,
            domain14: 0,
            domain15: 0,
            domain16: 0,
            domain17: 0,
            domain18: 0,
            domain19: 0,
            domain20: 0,
            domain21: 0,
        },
        prices: {
            Sc: {
                box1: 1 * basePrice,
                box2: 2 * basePrice,
                box3: 3 * basePrice,
                box4: 5 * basePrice,
                box5: 7.5 * basePrice,
                box6: 10 * basePrice,
                box7: 15 * basePrice,
                box8: 20 * basePrice,
                box9: 30 * basePrice,
                box10: 50 * basePrice,
                box11: 75 * basePrice,
                box12: 100 * basePrice,
                box13: 150 * basePrice,
                box14: 200 * basePrice,
                box15: 300 * basePrice,
                box16: 500 * basePrice,
                box17: 750 * basePrice,
                box18: 1000 * basePrice,
                box19: 1500 * basePrice,
                box20: 2000 * basePrice,
                box21: 3000 * basePrice,
                box22: 5000 * basePrice,
                box23: 7500 * basePrice,
                box24: 10000 * basePrice,
                box25: 15000 * basePrice
            },

            Sa: {
                box1: 10000 * basePrice,
                box2: 20000 * basePrice,
                box3: 30000 * basePrice,
                box4: 50000 * basePrice,
                box5: 75000 * basePrice,
                box6: 100000 * basePrice,
                box7: 150000 * basePrice,
                box8: 200000 * basePrice,
                box9: 300000 * basePrice,
                box10: 500000 * basePrice,
                box11: 750000 * basePrice,
                box12: 1000000 * basePrice,
                box13: 1500000 * basePrice,
                box14: 2000000 * basePrice,
                box15: 3000000 * basePrice,
                box16: 5000000 * basePrice,
                box17: 7500000 * basePrice,
                box18: 10000000 * basePrice,
                box19: 15000000 * basePrice,
                box20: 20000000 * basePrice,
                box21: 30000000 * basePrice,
                box22: 50000000 * basePrice,
                box23: 75000000 * basePrice,
                box24: 100000000 * basePrice,
                box25: 150000000 * basePrice
            },

            Sr: {
                box1: 1e8 * basePrice,
                box2: 2e8 * basePrice,
                box3: 3e8 * basePrice,
                box4: 5e8 * basePrice,
                box5: 7.5e8 * basePrice,
                box6: 1e9 * basePrice,
                box7: 1.5e9 * basePrice,
                box8: 2e9 * basePrice,
                box9: 3e9 * basePrice,
                box10: 5e9 * basePrice,
                box11: 7.5e9 * basePrice,
                box12: 1e10 * basePrice,
                box13: 1.5e10 * basePrice,
                box14: 2e10 * basePrice,
                box15: 3e10 * basePrice,
                box16: 5e10 * basePrice,
                box17: 7.5e10 * basePrice,
                box18: 1e11 * basePrice,
                box19: 1.5e11 * basePrice,
                box20: 2e11 * basePrice,
                box21: 3e11 * basePrice,
                box22: 5e11 * basePrice,
                box23: 7.5e11 * basePrice,
                box24: 1e12 * basePrice,
                box25: 1.5e12 * basePrice
            },

            Sm: {
                box1: 1e14 * basePrice,
                box2: 2e14 * basePrice,
                box3: 3e14 * basePrice,
                box4: 5e14 * basePrice,
                box5: 7.5e14 * basePrice,
                box6: 1e15 * basePrice,
                box7: 1.5e15 * basePrice,
                box8: 2e15 * basePrice,
                box9: 3e15 * basePrice,
                box10: 5e15 * basePrice,
                box11: 7.5e15 * basePrice,
                box12: 1e16 * basePrice,
                box13: 1.5e16 * basePrice,
                box14: 2e16 * basePrice,
                box15: 3e16 * basePrice,
                box16: 5e16 * basePrice,
                box17: 7.5e16 * basePrice,
                box18: 1e17 * basePrice,
                box19: 1.5e17 * basePrice,
                box20: 2e17 * basePrice,
                box21: 3e17 * basePrice,
                box22: 5e17 * basePrice,
                box23: 7.5e17 * basePrice,
                box24: 1e18 * basePrice,
                box25: 1.5e18 * basePrice
            },

            Si: {
                box1: 1e20 * basePrice,
                box2: 2e20 * basePrice,
                box3: 3e20 * basePrice,
                box4: 5e20 * basePrice,
                box5: 7.5e20 * basePrice,
                box6: 1e21 * basePrice,
                box7: 1.5e21 * basePrice,
                box8: 2e21 * basePrice,
                box9: 3e21 * basePrice,
                box10: 5e21 * basePrice,
                box11: 7.5e21 * basePrice,
                box12: 1e22 * basePrice,
                box13: 1.5e22 * basePrice,
                box14: 2e22 * basePrice,
                box15: 3e22 * basePrice,
                box16: 5e22 * basePrice,
                box17: 7.5e22 * basePrice,
                box18: 1e23 * basePrice,
                box19: 1.5e23 * basePrice,
                box20: 2e23 * basePrice,
                box21: 3e23 * basePrice,
                box22: 5e23 * basePrice,
                box23: 7.5e23 * basePrice,
                box24: 1e24 * basePrice,
                box25: 1.5e24 * basePrice
            }
        }
    }

    Object.freeze(status.domainNames);
    Object.freeze(status.domainInvestmentTotals);
    function updateStatus(){
        for (let key in status.domainStatus) {
    
            const domain = document.getElementById(`${key}Status`);
    
            if (status.domainStatus[key] === true) {
                domain.textContent = "Owned";
            } else {
                domain.textContent = "Not Owned";
            }
        }
    }
    function saveGame(){
        localStorage.setItem("status", JSON.stringify(status));
    }
    function loadGame(){
        const save = localStorage.getItem("status");

        if(save){
            const savedStatus = JSON.parse(save);

            status = {
                ...status,
                ...savedStatus,

                domainNames: {
                    ...status.domainNames,
                    ...(savedStatus.domainNames || {})
                },

                domainStatus: {
                    ...status.domainStatus,
                    ...(savedStatus.domainStatus || {})
                },

                setSalaryCaps: {
                    ...status.setSalaryCaps,
                    ...(savedStatus.setSalaryCaps || {})
                },

                changingSalaryCaps: {
                    ...status.changingSalaryCaps,
                    ...(savedStatus.changingSalaryCaps || {})
                },

                domainInvestmentTotals: {
                    ...status.domainInvestmentTotals,
                    ...(savedStatus.domainInvestmentTotals || {})
                },

                upgradePart: {
                    ...status.upgradePart,
                    ...(savedStatus.upgradePart || {})
                },

                prices: status.prices
            };
        }
    }
    // -------------------- INCREMENTALS ---------------

    let domainButtons = [];
    for(let key in status.domainStatus){
        domainButtons.push(document.getElementById(`${key}`))
    }
    const leaveButtons = document.querySelectorAll('.leaveDomain');
    leaveButtons.forEach(element => {
        element.addEventListener('click', () => {
            const market = element.closest('.market');
            if (market) {
                market.remove();
            }
        });
    });
    domainButtons.forEach((element, index) => {
        element.addEventListener('click', () => {
            const domainKey = `domain${index + 1}`;
            if (status.domainStatus[domainKey]) {
                openMarket(index + 1);
            } else {
                alert('You do not own this domain.');
            }
        });
    });
    function openMarket(domNum) {
        const stageHTML = [
            `<h1 style='padding-top: 20px;'>${status.domainNames[`domain${domNum}`]}</h1>
            <button class="leaveDomain x" style="margin-right: 20px; margin-top: 20px">✘</button>
            <div id='Thegrid'>
            <div class='box' id='Sc1'><h4>Starting Point</h4><p>1.1x food</p><p>${getFormattedNumber(status.prices.Sc.box1)} ${cashSymbol}</p><p class='IDLabel'>Sc1</p></div>
            <div class='box' id='Sc2'><h4>Okay, We Begin</h4><p>1.2x food</p><p>${getFormattedNumber(status.prices.Sc.box2)} ${cashSymbol}</p><p class='IDLabel'>Sc2</p></div>
            <div class='box' id='Sc3'><h4>A Little Better</h4><p>1.25x food</p><p>${getFormattedNumber(status.prices.Sc.box3)} ${cashSymbol}</p><p class='IDLabel'>Sc3</p></div>
            <div class='box' id='Sc4'><h4>Getting Somewhere</h4><p>1.4x food</p><p>${getFormattedNumber(status.prices.Sc.box4)} ${cashSymbol}</p><p class='IDLabel'>Sc4</p></div>
            <div class='box' id='Sc5'><h4>Now We're Cooking</h4><p>1.5x food</p><p>${getFormattedNumber(status.prices.Sc.box5)} ${cashSymbol}</p><p class='IDLabel'>Sc5</p></div>
            <div class='box' id='Sc6'><h4>Hungry For More</h4><p>1.75x food</p><p>${getFormattedNumber(status.prices.Sc.box6)} ${cashSymbol}</p><p class='IDLabel'>Sc6</p></div>
            <div class='box' id='Sc7'><h4>Resourceful</h4><p>1.2x resources</p><p>${getFormattedNumber(status.prices.Sc.box7)} ${cashSymbol}</p><p class='IDLabel'>Sc7</p></div>
            <div class='box' id='Sc8'><h4>Wood Goes BRRR</h4><p>2x wood</p><p>${getFormattedNumber(status.prices.Sc.box8)} ${cashSymbol}</p><p class='IDLabel'>Sc8</p></div>
            <div class='box' id='Sc9'><h4>Rock Collector</h4><p>2x brick</p><p>${getFormattedNumber(status.prices.Sc.box9)} ${cashSymbol}</p><p class='IDLabel'>Sc9</p></div>
            <div class='box' id='Sc10'><h4>Oil Money</h4><p>2x oil</p><p>${getFormattedNumber(status.prices.Sc.box10)} ${cashSymbol}</p><p class='IDLabel'>Sc10</p></div>
            <div class='box' id='Sc11'><h4>That's Some Shiny Stuff</h4><p>2x steel</p><p>${getFormattedNumber(status.prices.Sc.box11)} ${cashSymbol}</p><p class='IDLabel'>Sc11</p></div>
            <div class='box' id='Sc12'><h4>Things Are Escalating</h4><p>1.5x resources</p><p>${getFormattedNumber(status.prices.Sc.box12)} ${cashSymbol}</p><p class='IDLabel'>Sc12</p></div>
            <div class='box' id='Sc13'><h4>Food Problem</h4><p>2.5x food</p><p>${getFormattedNumber(status.prices.Sc.box13)} ${cashSymbol}</p><p class='IDLabel'>Sc13</p></div>
            <div class='box' id='Sc14'><h4>Money Is Money</h4><p>3x food</p><p>${getFormattedNumber(status.prices.Sc.box14)} ${cashSymbol}</p><p class='IDLabel'>Sc14</p></div>
            <div class='box' id='Sc15'><h4>Everybody's Here</h4><p>2x customers</p><p>${getFormattedNumber(status.prices.Sc.box15)} ${cashSymbol}</p><p class='IDLabel'>Sc15</p></div>
            <div class='box' id='Sc16'><h4>Customer Explosion</h4><p>2.5x customers</p><p>${getFormattedNumber(status.prices.Sc.box16)} ${cashSymbol}</p><p class='IDLabel'>Sc16</p></div>
            <div class='box' id='Sc17'><h4>Money Talks</h4><p>3x customers</p><p>${getFormattedNumber(status.prices.Sc.box17)} ${cashSymbol}</p><p class='IDLabel'>Sc17</p></div>
            <div class='box' id='Sc18'><h4>Food Has Gone Weird</h4><p>Food ^1.05</p><p>${getFormattedNumber(status.prices.Sc.box18)} ${cashSymbol}</p><p class='IDLabel'>Sc18</p></div>
            <div class='box' id='Sc19'><h4>Okay That's Better</h4><p>Food ^1.1</p><p>${getFormattedNumber(status.prices.Sc.box19)} ${cashSymbol}</p><p class='IDLabel'>Sc19</p></div>
            <div class='box' id='Sc20'><h4>Resources Are Growing</h4><p>Resources ^1.05</p><p>${getFormattedNumber(status.prices.Sc.box20)} ${cashSymbol}</p><p class='IDLabel'>Sc20</p></div>
            <div class='box' id='Sc21'><h4>Customers Just Keep Coming</h4><p>Customers ^1.05</p><p>${getFormattedNumber(status.prices.Sc.box21)} ${cashSymbol}</p><p class='IDLabel'>Sc21</p></div>
            <div class='box' id='Sc22'><h4>Wait, That's A Lot</h4><p>Resources ^1.1</p><p>${getFormattedNumber(status.prices.Sc.box22)} ${cashSymbol}</p><p class='IDLabel'>Sc22</p></div>
            <div class='box' id='Sc23'><h4>Paycheck Check</h4><p>10x salary cap</p><p>${getFormattedNumber(status.prices.Sc.box23)} ${cashSymbol}</p><p class='IDLabel'>Sc23</p></div>
            <div class='box' id='Sc24'><h4>GIMME SOME LEGAL TENDER</h4><p>Customers ^1.1</p><p>${getFormattedNumber(status.prices.Sc.box24)} ${cashSymbol}</p><p class='IDLabel'>Sc24</p></div>
            <div class='box' id='Sc25'><h4>The Beginning Ends</h4><p>Salary Cap ^1.1</p><p>${getFormattedNumber(status.prices.Sc.box25)} ${cashSymbol}</p><p class='IDLabel'>Sc25</p></div>
            </div>
            <div class='salaryDisplay' id='salaryDisplay${domNum}'>SALARY: ${getFormattedNumber(status.changingSalaryCaps[`domain${domNum}`])}</div>
            `,
            `<h1 style='padding-top: 20px;'>${status.domainNames[`domain${domNum}`]}</h1>
            <button class="leaveDomain x" style="margin-right: 20px; margin-top: 20px">✘</button>
            <div id='Thegrid'>
            <div class='box' id='Sa1'><h4>Microscopic</h4><p>3x food + resources</p><p>${getFormattedNumber(status.prices.Sa.box1)} ${cashSymbol}</p><p class='IDLabel'>Sa1</p></div>
            <div class='box' id='Sa2'><h4>Tiny Problem</h4><p>3.5x food</p><p>${getFormattedNumber(status.prices.Sa.box2)} ${cashSymbol}</p><p class='IDLabel'>Sa2</p></div>
            <div class='box' id='Sa3'><h4>Not So Tiny Anymore</h4><p>4x resources</p><p>${getFormattedNumber(status.prices.Sa.box3)} ${cashSymbol}</p><p class='IDLabel'>Sa3</p></div>
            <div class='box' id='Sa4'><h4>Getting Serious</h4><p>5x food</p><p>${getFormattedNumber(status.prices.Sa.box4)} ${cashSymbol}</p><p class='IDLabel'>Sa4</p></div>
            <div class='box' id='Sa5'><h4>Big Bite</h4><p>6x food</p><p>${getFormattedNumber(status.prices.Sa.box5)} ${cashSymbol}</p><p class='IDLabel'>Sa5</p></div>
            <div class='box' id='Sa6'><h4>Why Is There So Much Food?</h4><p>7x food</p><p>${getFormattedNumber(status.prices.Sa.box6)} ${cashSymbol}</p><p class='IDLabel'>Sa6</p></div>
            <div class='box' id='Sa7'><h4>Resource Rush</h4><p>4x resources</p><p>${getFormattedNumber(status.prices.Sa.box7)} ${cashSymbol}</p><p class='IDLabel'>Sa7</p></div>
            <div class='box' id='Sa8'><h4>Wood Madness</h4><p>5x wood</p><p>${getFormattedNumber(status.prices.Sa.box8)} ${cashSymbol}</p><p class='IDLabel'>Sa8</p></div>
            <div class='box' id='Sa9'><h4>brick Everywhere</h4><p>5x brick</p><p>${getFormattedNumber(status.prices.Sa.box9)} ${cashSymbol}</p><p class='IDLabel'>Sa9</p></div>
            <div class='box' id='Sa10'><h4>Oil Is Having A Moment</h4><p>5x oil</p><p>${getFormattedNumber(status.prices.Sa.box10)} ${cashSymbol}</p><p class='IDLabel'>Sa10</p></div>
            <div class='box' id='Sa11'><h4>Steel Overload</h4><p>5x steel</p><p>${getFormattedNumber(status.prices.Sa.box11)} ${cashSymbol}</p><p class='IDLabel'>Sa11</p></div>
            <div class='box' id='Sa12'><h4>Okay, That's A LOT</h4><p>6x resources</p><p>${getFormattedNumber(status.prices.Sa.box12)} ${cashSymbol}</p><p class='IDLabel'>Sa12</p></div>
            <div class='box' id='Sa13'><h4>WHAT IS HAPPENING</h4><p>8x food</p><p>${getFormattedNumber(status.prices.Sa.box13)} ${cashSymbol}</p><p class='IDLabel'>Sa13</p></div>
            <div class='box' id='Sa14'><h4>THIS WAS A MISTAKE</h4><p>10x food</p><p>${getFormattedNumber(status.prices.Sa.box14)} ${cashSymbol}</p><p class='IDLabel'>Sa14</p></div>
            <div class='box' id='Sa15'><h4>Customer Stampede</h4><p>5x customers</p><p>${getFormattedNumber(status.prices.Sa.box15)} ${cashSymbol}</p><p class='IDLabel'>Sa15</p></div>
            <div class='box' id='Sa16'><h4>SIUU</h4><p>7x customers</p><p>${getFormattedNumber(status.prices.Sa.box16)} ${cashSymbol}</p><p class='IDLabel'>Sa16</p></div>
            <div class='box' id='Sa17'><h4>It's Getting Out Of Hand</h4><p>10x food</p><p>${getFormattedNumber(status.prices.Sa.box17)} ${cashSymbol}</p><p class='IDLabel'>Sa17</p></div>
            <div class='box' id='Sa18'><h4>Food Is Different Now</h4><p>Food ^1.1</p><p>${getFormattedNumber(status.prices.Sa.box18)} ${cashSymbol}</p><p class='IDLabel'>Sa18</p></div>
            <div class='box' id='Sa19'><h4>Small Numbers Don't Work</h4><p>Food ^1.12</p><p>${getFormattedNumber(status.prices.Sa.box19)} ${cashSymbol}</p><p class='IDLabel'>Sa19</p></div>
            <div class='box' id='Sa20'><h4>Resources Got Angry</h4><p>Resources ^1.1</p><p>${getFormattedNumber(status.prices.Sa.box20)} ${cashSymbol}</p><p class='IDLabel'>Sa20</p></div>
            <div class='box' id='Sa21'><h4>Customers Everywhere</h4><p>Customers ^1.1</p><p>${getFormattedNumber(status.prices.Sa.box21)} ${cashSymbol}</p><p class='IDLabel'>Sa21</p></div>
            <div class='box' id='Sa22'><h4>Numbers Are Getting Stupid</h4><p>Resources ^1.12</p><p>${getFormattedNumber(status.prices.Sa.box22)} ${cashSymbol}</p><p class='IDLabel'>Sa22</p></div>
            <div class='box' id='Sa23'><h4>Salary Boost</h4><p>25x salary cap</p><p>${getFormattedNumber(status.prices.Sa.box23)} ${cashSymbol}</p><p class='IDLabel'>Sa23</p></div>
            <div class='box' id='Sa24'><h4>MORE PEOPLE. MORE MONEY.</h4><p>Customers ^1.12</p><p>${getFormattedNumber(status.prices.Sa.box24)} ${cashSymbol}</p><p class='IDLabel'>Sa24</p></div>
            <div class='box' id='Sa25'><h4>We're Not Normal Anymore</h4><p>Salary Cap ^1.12</p><p>${getFormattedNumber(status.prices.Sa.box25)} ${cashSymbol}</p><p class='IDLabel'>Sa25</p></div>
            </div>
            <div class='salaryDisplay' id='salaryDisplay${domNum}'>SALARY: ${getFormattedNumber(status.changingSalaryCaps[`domain${domNum}`])}</div>
`,
            `<h1 style='padding-top: 20px;'>${status.domainNames[`domain${domNum}`]}</h1>
            <button class="leaveDomain x" style="margin-right: 20px; margin-top: 20px">✘</button>
            <div id='Thegrid'>
            <div class='box' id='Sr1'><h4>Quantum Appetite</h4><p>12x food</p><p>${getFormattedNumber(status.prices.Sr.box1)} ${cashSymbol}</p><p class='IDLabel'>Sr1</p></div>
            <div class='box' id='Sr2'><h4>Resource Reactor</h4><p>12x resources</p><p>${getFormattedNumber(status.prices.Sr.box2)} ${cashSymbol}</p><p class='IDLabel'>Sr2</p></div>
            <div class='box' id='Sr3'><h4>Food Has Escaped</h4><p>15x food</p><p>${getFormattedNumber(status.prices.Sr.box3)} ${cashSymbol}</p><p class='IDLabel'>Sr3</p></div>
            <div class='box' id='Sr4'><h4>Industrial Chaos</h4><p>15x resources</p><p>${getFormattedNumber(status.prices.Sr.box4)} ${cashSymbol}</p><p class='IDLabel'>Sr4</p></div>
            <div class='box' id='Sr5'><h4>Wood Problem</h4><p>10x wood</p><p>${getFormattedNumber(status.prices.Sr.box5)} ${cashSymbol}</p><p class='IDLabel'>Sr5</p></div>
            <div class='box' id='Sr6'><h4>brick Problem</h4><p>10x brick</p><p>${getFormattedNumber(status.prices.Sr.box6)} ${cashSymbol}</p><p class='IDLabel'>Sr6</p></div>
            <div class='box' id='Sr7'><h4>Oil Problem</h4><p>10x oil</p><p>${getFormattedNumber(status.prices.Sr.box7)} ${cashSymbol}</p><p class='IDLabel'>Sr7</p></div>
            <div class='box' id='Sr8'><h4>Steel Problem</h4><p>10x steel</p><p>${getFormattedNumber(status.prices.Sr.box8)} ${cashSymbol}</p><p class='IDLabel'>Sr8</p></div>
            <div class='box' id='Sr9'><h4>Resource Singularity</h4><p>20x resources</p><p>${getFormattedNumber(status.prices.Sr.box9)} ${cashSymbol}</p><p class='IDLabel'>Sr9</p></div>
            <div class='box' id='Sr10'><h4>Food Singularity</h4><p>20x food</p><p>${getFormattedNumber(status.prices.Sr.box10)} ${cashSymbol}</p><p class='IDLabel'>Sr10</p></div>
            <div class='box' id='Sr11'><h4>Customer Boom</h4><p>15x customers</p><p>${getFormattedNumber(status.prices.Sr.box11)} ${cashSymbol}</p><p class='IDLabel'>Sr11</p></div>
            <div class='box' id='Sr12'><h4>People Just Keep Appearing</h4><p>20x customers</p><p>${getFormattedNumber(status.prices.Sr.box12)} ${cashSymbol}</p><p class='IDLabel'>Sr12</p></div>
            <div class='box' id='Sr13'><h4>Food Ascension</h4><p>Food ^1.15</p><p>${getFormattedNumber(status.prices.Sr.box13)} ${cashSymbol}</p><p class='IDLabel'>Sr13</p></div>
            <div class='box' id='Sr14'><h4>Resource Ascension</h4><p>Resources ^1.15</p><p>${getFormattedNumber(status.prices.Sr.box14)} ${cashSymbol}</p><p class='IDLabel'>Sr14</p></div>
            <div class='box' id='Sr15'><h4>Customer Ascension</h4><p>Customers ^1.15</p><p>${getFormattedNumber(status.prices.Sr.box15)} ${cashSymbol}</p><p class='IDLabel'>Sr15</p></div>
            <div class='box' id='Sr16'><h4>Cash Is Exploding</h4><p>25x cash generation</p><p>${getFormattedNumber(status.prices.Sr.box16)} ${cashSymbol}</p><p class='IDLabel'>Sr16</p></div>
            <div class='box' id='Sr17'><h4>THIS ISN'T RIGHT</h4><p>30x cash generation</p><p>${getFormattedNumber(status.prices.Sr.box17)} ${cashSymbol}</p><p class='IDLabel'>Sr17</p></div>
            <div class='box' id='Sr18'><h4>Market Madness</h4><p>25x resources</p><p>${getFormattedNumber(status.prices.Sr.box18)} ${cashSymbol}</p><p class='IDLabel'>Sr18</p></div>
            <div class='box' id='Sr19'><h4>What Is Going On?</h4><p>35x resources</p><p>${getFormattedNumber(status.prices.Sr.box19)} ${cashSymbol}</p><p class='IDLabel'>Sr19</p></div>
            <div class='box' id='Sr20'><h4>Someone Stop This</h4><p>45x resources</p><p>${getFormattedNumber(status.prices.Sr.box20)} ${cashSymbol}</p><p class='IDLabel'>Sr20</p></div>
            <div class='box' id='Sr21'><h4>Reality Is Optional</h4><p>Food ^1.2</p><p>${getFormattedNumber(status.prices.Sr.box21)} ${cashSymbol}</p><p class='IDLabel'>Sr21</p></div>
            <div class='box' id='Sr22'><h4>Numbers Are Broken</h4><p>Resources ^1.2</p><p>${getFormattedNumber(status.prices.Sr.box22)} ${cashSymbol}</p><p class='IDLabel'>Sr22</p></div>
            <div class='box' id='Sr23'><h4>Salary Overload</h4><p>50x salary cap</p><p>${getFormattedNumber(status.prices.Sr.box23)} ${cashSymbol}</p><p class='IDLabel'>Sr23</p></div>
            <div class='box' id='Sr24'><h4>Too Successful</h4><p>Customers ^1.2</p><p>${getFormattedNumber(status.prices.Sr.box24)} ${cashSymbol}</p><p class='IDLabel'>Sr24</p></div>
            <div class='box' id='Sr25'><h4>Things Have Gone Too Far</h4><p>Salary Cap ^1.15</p><p>${getFormattedNumber(status.prices.Sr.box25)} ${cashSymbol}</p><p class='IDLabel'>Sr25</p></div>
            </div>
            <div class='salaryDisplay' id='salaryDisplay${domNum}'>SALARY: ${getFormattedNumber(status.changingSalaryCaps[`domain${domNum}`])}</div>
            `,
            `<h1 style='padding-top: 20px;'>${status.domainNames[`domain${domNum}`]}</h1>
            <button class="leaveDomain x" style="margin-right: 20px; margin-top: 20px">✘</button>
            <div id='Thegrid'>
            <div class='box' id='Sm1'><h4>Cosmic Appetite</h4><p>30x food</p><p>${getFormattedNumber(status.prices.Sm.box1)} ${cashSymbol}</p><p class='IDLabel'>Sm1</p></div>
            <div class='box' id='Sm2'><h4>Cloudy with a chance of meatballs is a reality</h4><p>35x food</p><p>${getFormattedNumber(status.prices.Sm.box2)} ${cashSymbol}</p><p class='IDLabel'>Sm2</p></div>
            <div class='box' id='Sm3'><h4>Resources Gone Wild</h4><p>40x resources</p><p>${getFormattedNumber(status.prices.Sm.box3)} ${cashSymbol}</p><p class='IDLabel'>Sm3</p></div>
            <div class='box' id='Sm4'><h4>Who Ordered All This?</h4><p>45x resources</p><p>${getFormattedNumber(status.prices.Sm.box4)} ${cashSymbol}</p><p class='IDLabel'>Sm4</p></div>
            <div class='box' id='Sm5'><h4>Where'd all the trees go?</h4><p>30x wood</p><p>${getFormattedNumber(status.prices.Sm.box5)} ${cashSymbol}</p><p class='IDLabel'>Sm5</p></div>
            <div class='box' id='Sm6'><h4>Brick, just why</h4><p>30x brick</p><p>${getFormattedNumber(status.prices.Sm.box6)} ${cashSymbol}</p><p class='IDLabel'>Sm6</p></div>
            <div class='box' id='Sm7'><h4>Uhh, is this plastific or the pacific?</h4><p>30x oil</p><p>${getFormattedNumber(status.prices.Sm.box7)} ${cashSymbol}</p><p class='IDLabel'>Sm7</p></div>
            <div class='box' id='Sm8'><h4>Steel is worth nothing...</h4><p>30x steel</p><p>${getFormattedNumber(status.prices.Sm.box8)} ${cashSymbol}</p><p class='IDLabel'>Sm8</p></div>
            <div class='box' id='Sm9'><h4>ABSOLUTE RESOURCES</h4><p>60x resources</p><p>${getFormattedNumber(status.prices.Sm.box9)} ${cashSymbol}</p><p class='IDLabel'>Sm9</p></div>
            <div class='box' id='Sm10'><h4>Big Macs for Big Backs</h4><p>60x food</p><p>${getFormattedNumber(status.prices.Sm.box10)} ${cashSymbol}</p><p class='IDLabel'>Sm10</p></div>
            <div class='box' id='Sm11'><h4>Customer Flood</h4><p>35x customers</p><p>${getFormattedNumber(status.prices.Sm.box11)} ${cashSymbol}</p><p class='IDLabel'>Sm11</p></div>
            <div class='box' id='Sm12'><h4>Customer Disaster</h4><p>45x customers</p><p>${getFormattedNumber(status.prices.Sm.box12)} ${cashSymbol}</p><p class='IDLabel'>Sm12</p></div>
            <div class='box' id='Sm13'><h4>Food Has Changed</h4><p>Food ^1.2</p><p>${getFormattedNumber(status.prices.Sm.box13)} ${cashSymbol}</p><p class='IDLabel'>Sm13</p></div>
            <div class='box' id='Sm14'><h4>Resources Have Changed</h4><p>Resources ^1.2</p><p>${getFormattedNumber(status.prices.Sm.box14)} ${cashSymbol}</p><p class='IDLabel'>Sm14</p></div>
            <div class='box' id='Sm15'><h4>Customers Have Changed</h4><p>Customers ^1.2</p><p>${getFormattedNumber(status.prices.Sm.box15)} ${cashSymbol}</p><p class='IDLabel'>Sm15</p></div>
            <div class='box' id='Sm16'><h4>Economic Madness</h4><p>50x cash generation</p><p>${getFormattedNumber(status.prices.Sm.box16)} ${cashSymbol}</p><p class='IDLabel'>Sm16</p></div>
            <div class='box' id='Sm17'><h4>Market Meltdown</h4><p>50x resources</p><p>${getFormattedNumber(status.prices.Sm.box17)} ${cashSymbol}</p><p class='IDLabel'>Sm17</p></div>
            <div class='box' id='Sm18'><h4>Reality Is Cracking</h4><p>Food ^1.22</p><p>${getFormattedNumber(status.prices.Sm.box18)} ${cashSymbol}</p><p class='IDLabel'>Sm18</p></div>
            <div class='box' id='Sm19'><h4>Everything Is Broken</h4><p>Resources ^1.22</p><p>${getFormattedNumber(status.prices.Sm.box19)} ${cashSymbol}</p><p class='IDLabel'>Sm19</p></div>
            <div class='box' id='Sm20'><h4>There Are Too Many People</h4><p>Customers ^1.22</p><p>${getFormattedNumber(status.prices.Sm.box20)} ${cashSymbol}</p><p class='IDLabel'>Sm20</p></div>
            <div class='box' id='Sm21'><h4>BEYOND REASON</h4><p>100x food</p><p>${getFormattedNumber(status.prices.Sm.box21)} ${cashSymbol}</p><p class='IDLabel'>Sm21</p></div>
            <div class='box' id='Sm22'><h4>THE NUMBERS ARE SCREAMING</h4><p>100x resources</p><p>${getFormattedNumber(status.prices.Sm.box22)} ${cashSymbol}</p><p class='IDLabel'>Sm22</p></div>
            <div class='box' id='Sm23'><h4>Salary Madness</h4><p>100x salary cap</p><p>${getFormattedNumber(status.prices.Sm.box23)} ${cashSymbol}</p><p class='IDLabel'>Sm23</p></div>
            <div class='box' id='Sm24'><h4>THIS CANNOT BE LEGAL</h4><p>Food ^1.25 + Resources ^1.25</p><p>${getFormattedNumber(status.prices.Sm.box24)} ${cashSymbol}</p><p class='IDLabel'>Sm24</p></div>
            <div class='box' id='Sm25'><h4>What Have We Done?</h4><p>Salary Cap ^1.18</p><p>${getFormattedNumber(status.prices.Sm.box25)} ${cashSymbol}</p><p class='IDLabel'>Sm25</p></div>
            </div>
            <div class='salaryDisplay' id='salaryDisplay${domNum}'>SALARY: ${getFormattedNumber(status.changingSalaryCaps[`domain${domNum}`])}</div>
            `,
            `<h1 style='padding-top: 20px;'>${status.domainNames[`domain${domNum}`]}</h1>
            <button class="leaveDomain x" style="margin-right: 20px; margin-top: 20px">✘</button>
            <div id='Thegrid'>
            <div class='box' id='Si1'><h4>INSANE</h4><p>50x food</p><p>${getFormattedNumber(status.prices.Si.box1)} ${cashSymbol}</p><p class='IDLabel'>Se1</p></div>
            <div class='box' id='Si2'><h4>What Is Going On?</h4><p>60x resources</p><p>${getFormattedNumber(status.prices.Si.box2)} ${cashSymbol}</p><p class='IDLabel'>Se2</p></div>
            <div class='box' id='Si3'><h4>This Is Getting outta hand...</h4><p>70x food</p><p>${getFormattedNumber(status.prices.Si.box3)} ${cashSymbol}</p><p class='IDLabel'>Se3</p></div>
            <div class='box' id='Si4'><h4>WHO ALLOWED THIS?</h4><p>80x resources</p><p>${getFormattedNumber(status.prices.Si.box4)} ${cashSymbol}</p><p class='IDLabel'>Se4</p></div>
            <div class='box' id='Si5'><h4>Wood Incarnate</h4><p>50x wood</p><p>${getFormattedNumber(status.prices.Si.box5)} ${cashSymbol}</p><p class='IDLabel'>Se5</p></div>
            <div class='box' id='Si6'><h4>brick miners search and find nothing</h4><p>50x brick</p><p>${getFormattedNumber(status.prices.Si.box6)} ${cashSymbol}</p><p class='IDLabel'>Se6</p></div>
            <div class='box' id='Si7'><h4>Yep, we officially care about the environment</h4><p>50x oil</p><p>${getFormattedNumber(status.prices.Si.box7)} ${cashSymbol}</p><p class='IDLabel'>Se7</p></div>
            <div class='box' id='Si8'><h4>We steal all the steel(see what i did there ahhah)</h4><p>50x steel</p><p>${getFormattedNumber(status.prices.Si.box8)} ${cashSymbol}</p><p class='IDLabel'>Se8</p></div>
            <div class='box' id='Si9'><h4>Okay, This Is Insane</h4><p>100x resources</p><p>${getFormattedNumber(status.prices.Si.box9)} ${cashSymbol}</p><p class='IDLabel'>Se9</p></div>
            <div class='box' id='Si10'><h4>Food Has No Limits</h4><p>100x food</p><p>${getFormattedNumber(status.prices.Si.box10)} ${cashSymbol}</p><p class='IDLabel'>Se10</p></div>
            <div class='box' id='Si11'><h4>Customer Flood</h4><p>60x customers</p><p>${getFormattedNumber(status.prices.Si.box11)} ${cashSymbol}</p><p class='IDLabel'>Se11</p></div>
            <div class='box' id='Si12'><h4>Customer Chaos</h4><p>75x customers</p><p>${getFormattedNumber(status.prices.Si.box12)} ${cashSymbol}</p><p class='IDLabel'>Se12</p></div>
            <div class='box' id='Si13'><h4>Food Went Nuclear</h4><p>Food ^1.23</p><p>${getFormattedNumber(status.prices.Si.box13)} ${cashSymbol}</p><p class='IDLabel'>Se13</p></div>
            <div class='box' id='Si14'><h4>Resources Went Nuclear</h4><p>Resources ^1.23</p><p>${getFormattedNumber(status.prices.Si.box14)} ${cashSymbol}</p><p class='IDLabel'>Se14</p></div>
            <div class='box' id='Si15'><h4>Customers Went Nuclear</h4><p>Customers ^1.23</p><p>${getFormattedNumber(status.prices.Si.box15)} ${cashSymbol}</p><p class='IDLabel'>Se15</p></div>
            <div class='box' id='Si16'><h4>Money Printers...</h4><p>75x cash generation</p><p>${getFormattedNumber(status.prices.Si.box16)} ${cashSymbol}</p><p class='IDLabel'>Se16</p></div>
            <div class='box' id='Si17'><h4>Economy? What Economy?</h4><p>75x resources</p><p>${getFormattedNumber(status.prices.Si.box17)} ${cashSymbol}</p><p class='IDLabel'>Se17</p></div>
            <div class='box' id='Si18'><h4>Reality.exe Has Stopped</h4><p>Food ^1.25</p><p>${getFormattedNumber(status.prices.Si.box18)} ${cashSymbol}</p><p class='IDLabel'>Se18</p></div>
            <div class='box' id='Si19'><h4>Numbers.exe Has Stopped</h4><p>Resources ^1.25</p><p>${getFormattedNumber(status.prices.Si.box19)} ${cashSymbol}</p><p class='IDLabel'>Se19</p></div>
            <div class='box' id='Si20'><h4>People.exe Has Stopped</h4><p>Customers ^1.25</p><p>${getFormattedNumber(status.prices.Si.box20)} ${cashSymbol}</p><p class='IDLabel'>Se20</p></div>
            <div class='box' id='Si21'><h4>WHY IS IT THIS BIG?</h4><p>150x food</p><p>${getFormattedNumber(status.prices.Si.box21)} ${cashSymbol}</p><p class='IDLabel'>Se21</p></div>
            <div class='box' id='Si22'><h4>Now that its gone... I miss math...</h4><p>150x resources</p><p>${getFormattedNumber(status.prices.Si.box22)} ${cashSymbol}</p><p class='IDLabel'>Se22</p></div>
            <div class='box' id='Si23'><h4>Salary?</h4><p>150x salary cap</p><p>${getFormattedNumber(status.prices.Si.box23)} ${cashSymbol}</p><p class='IDLabel'>Se23</p></div>
            <div class='box' id='Si24'><h4>This is confusing... back at 2025 food wasn't unlimited?</h4><p>Food ^1.28 + Resources ^1.28</p><p>${getFormattedNumber(status.prices.Si.box24)} ${cashSymbol}</p><p class='IDLabel'>Se24</p></div>
            <div class='box' id='Si25'><h4>The great hall of penty...</h4><p>Salary Cap ^1.2</p><p>${getFormattedNumber(status.prices.Si.box25)} ${cashSymbol}</p><p class='IDLabel'>Se25</p></div>
            </div>
            <div class='salaryDisplay' id='salaryDisplay${domNum}'>SALARY: ${getFormattedNumber(status.changingSalaryCaps[`domain${domNum}`])}</div>
            `];
        status.functions = {};

        function upgradeResources(operator, amount){
            if(operator === '1'){
                status.wood **= amount;
                status.oil **= amount;
                status.steel **= amount;
                status.brick **= amount;
            }
            else{
                status.brick *= amount;
                status.oil *= amount;
                status.steel *= amount;
                status.wood *= amount;
            }
        }

        const upgradeEffects = {
            Sc: [
                () => status.foodIncome *= 1.1,
                () => status.foodIncome *= 1.2,
                () => status.foodIncome *= 1.25,
                () => status.foodIncome *= 1.4,
                () => status.foodIncome *= 1.5,
                () => status.foodIncome *= 1.75,
                () => {
                    status.upgradeResources('0', 1.2);
                },
                () => status.woodIncome *= 2,
                () => status.brickIncome *= 2,
                () => status.oilIncome *= 2,
                () => status.steelIncome *= 2,
                () => {
                    status.upgradeResources('0', 1.5);
                },
                () => status.foodIncome *= 2.5,
                () => status.foodIncome *= 3,
                () => status.customers *= 2,
                () => status.customers *= 2.5,
                () => status.customers *= 3,
                () => status.foodIncome **= 1.05,
                () => status.foodIncome **= 1.1,
                () => {
                    status.upgradeResources('1', 1.05);
                },
                () => status.customers **= 1.05,
                () => {
                    status.upgradeResources('1', 1.1);
                },
                () => status.salaryCap *= 10,
                () => status.customers **= 1.1,
                () => status.salaryCap **= 1.1
            ],

            Sa: [
                () => {
                    status.foodIncome *= 3;
                    status.upgradeResources('0', 3);
                },
                () => status.foodIncome *= 3.5,
                () => {
                    status.upgradeResources('0', 4);
                },
                () => status.foodIncome *= 5,
                () => status.foodIncome *= 6,
                () => status.foodIncome *= 7,
                () => {
                    status.upgradeResources('0', 4);
                },
                () => status.woodIncome *= 5,
                () => status.brickIncome *= 5,
                () => status.oilIncome *= 5,
                () => status.steelIncome *= 5,
                () => {
                    status.upgradeResources('0', 6);
                },
                () => status.foodIncome *= 8,
                () => status.foodIncome *= 10,
                () => status.customers *= 5,
                () => status.customers *= 7,
                () => status.foodIncome *= 10,
                () => status.foodIncome **= 1.1,
                () => status.foodIncome **= 1.12,
                () => {
                    status.upgradeResources('1', 1.1);
                },
                () => status.customers **= 1.1,
                () => {
                    status.upgradeResources('1', 1.12);
                },
                () => status.salaryCap *= 25,
                () => status.customers **= 1.12,
                () => status.salaryCap **= 1.12
            ],

            Sr: [
                () => status.foodIncome *= 12,
                () => {
                    status.upgradeResources('0', 12);
                },
                () => status.foodIncome *= 15,
                () => {
                    status.upgradeResources('0', 15);
                },
                () => status.woodIncome *= 10,
                () => status.brickIncome *= 10,
                () => status.oilIncome *= 10,
                () => status.steelIncome *= 10,
                () => {
                    status.upgradeResources('0', 20);
                },
                () => status.foodIncome *= 20,
                () => status.customers *= 15,
                () => status.customers *= 20,
                () => status.foodIncome **= 1.15,
                () => {
                    status.upgradeResources('1', 1.15);
                },
                () => status.customers **= 1.15,
                () => status.cashGeneration *= 25,
                () => status.cashGeneration *= 30,
                () => {
                    status.upgradeResources('0', 25);
                },
                () => {
                    status.upgradeResources('0', 35);
                },
                () => {
                    status.upgradeResources('0', 45);
                },
                () => status.foodIncome **= 1.2,
                () => {
                    status.upgradeResources('1', 1.2);
                },
                () => status.salaryCap *= 50,
                () => status.customers **= 1.2,
                () => status.salaryCap **= 1.15
            ],

            Sm: [
                () => status.foodIncome *= 30,
                () => status.foodIncome *= 35,
                () => {
                    status.upgradeResources('0', 40);
                },
                () => {
                    status.upgradeResources('0', 45);
                },
                () => status.woodIncome *= 30,
                () => status.brickIncome *= 30,
                () => status.oilIncome *= 30,
                () => status.steelIncome *= 30,
                () => {
                    status.upgradeResources('0', 60);
                },
                () => status.foodIncome *= 60,
                () => status.customers *= 35,
                () => status.customers *= 45,
                () => status.foodIncome **= 1.2,
                () => {
                    status.upgradeResources('1', 1.2);
                },
                () => status.customers **= 1.2,
                () => status.cashGeneration *= 50,
                () => {
                    status.upgradeResources('0', 50);
                },
                () => status.foodIncome **= 1.22,
                () => {
                    status.upgradeResources('1', 1.22);
                },
                () => status.customers **= 1.22,
                () => status.foodIncome *= 100,
                () => {
                    status.upgradeResources('0', 100);
                },
                () => status.salaryCap *= 100,
                () => {
                    status.foodIncome **= 1.25;
                    status.upgradeResources('1', 1.25);
                },
                () => status.salaryCap **= 1.18
            ],

            Si: [
                () => status.foodIncome *= 50,
                () => {
                    status.upgradeResources('0', 60);
                },
                () => status.foodIncome *= 70,
                () => {
                    status.upgradeResources('0', 80);
                },
                () => status.woodIncome *= 50,
                () => status.brickIncome *= 50,
                () => status.oilIncome *= 50,
                () => status.steelIncome *= 50,
                () => {
                    status.upgradeResources('0', 100);
                },
                () => status.foodIncome *= 100,
                () => status.customers *= 60,
                () => status.customers *= 75,
                () => status.foodIncome **= 1.23,
                () => {
                    status.upgradeResources('1', 1.23);
                },
                () => status.customers **= 1.23,
                () => status.cashGeneration *= 75,
                () => {
                    status.upgradeResources('0', 75);
                },
                () => status.foodIncome **= 1.25,
                () => {
                    status.upgradeResources('1', 1.25);
                },
                () => status.customers **= 1.25,
                () => status.foodIncome *= 150,
                () => {
                    status.upgradeResources('0', 150);
                },
                () => status.salaryCap *= 150,
                () => {
                    status.foodIncome **= 1.28;
                    status.upgradeResources('1', 1.28);
                },
                () => status.salaryCap **= 1.2
            ]
        };

        for (const stage in upgradeEffects) {
            upgradeEffects[stage].forEach((effect, i) => {
                const box = i + 1;

                status.functions[`${stage}${box}`] = function (domainKey) {
                    const price = status.prices[stage][`box${box}`];

                    // Check the salary cap for THIS domain
                    if (status.changingSalaryCaps[domainKey] < price) {
                        const speed = 150;
                        const boxElement = document.getElementById(`${stage}${box}`);
                        boxElement.classList.add("disabled");
                        setTimeout(() => { 
                            boxElement.classList.remove("disabled"); 
                            setTimeout(() => { 
                                boxElement.classList.add("disabled"); 
                                setTimeout(() => { 
                                    boxElement.classList.remove("disabled"); 
                                }, speed); 
                            }, speed); 
                        }, speed);
                        return t;
                    }

                    // Spend this domain's salary cap
                    status.changingSalaryCaps[domainKey] -= price;

                    // Apply the upgrade
                    effect(domainKey);

                    saveGame();
                    updateUI();

                    return true;
                };
            });
        }


        
        function findStage(n){
            if(n%5 === 0){
                return Math.floor(n / 5)-1
            }
            else{
                return Math.floor(n / 5)
            }
        }
        const market = document.createElement('div');
        market.classList.add('market');
        market.innerHTML = stageHTML[findStage(domNum)];
        document.body.appendChild(market);
        const boxes = market.querySelectorAll('.box');
        const domainKey = `domain${domNum}`;
        function updateBoxes() {
            const unlocked = status.upgradePart[domainKey];
            boxes.forEach((box, i) => {
                box.style.display = i <= unlocked ? 'flex' : 'none';
                if (i < unlocked) {
                    box.classList.add('clicked');
                }
            });
        }
        boxes.forEach((box, i) => {
            box.addEventListener('click', () => {
                if (i !== status.upgradePart[domainKey]) return;

                const stage = box.id.match(/^[A-Za-z]+/)[0];
                const boxNum = i + 1;
                const functionName = `${stage}${boxNum}`;
                const salaryDisplayElement = document.getElementById(`salaryDisplay${boxNum}`);

                if(salaryDisplayElement){
                    salaryDisplayElement.textContent = `SALARY: ${getFormattedNumber(status.changingSalaryCaps[`domain${domNum}`])}`
                }

                if (!status.functions[functionName]) {
                    console.error(`Function ${functionName} does not exist.`);
                    return;
                }

                const purchased = status.functions[functionName](domainKey);

                if (!purchased) return;

                box.classList.add('clicked');
                status.upgradePart[domainKey]++;
                updateBoxes();
                saveGame();

            });
        });
        
        updateBoxes();
        const leaveButton = market.querySelector('.leaveDomain');
        leaveButton.addEventListener('click', () => {
            market.remove();
        });
    }

    // ----------------- COUNTDOWNS --------------------

    function resetSalaryCaps(){
        for(let key in status.setSalaryCaps){
            status.changingSalaryCaps[key] = status.setSalaryCaps[key];
        }
    }

    let timeleft = localStorage.getItem('time');
    const monthTime = 60000

    const upgradeCountdown = setInterval(() => {
        status.food += status.foodIncome;
        status.wood += status.woodIncome;
        status.steel += status.steelIncome;
        status.oil += status.oilIncome;
        status.brick += status.brickIncome;
        status.food -= status.foodUsage;
        status.wood -= status.woodUsage;
        status.steel -= status.steelUsage;
        status.oil -= status.oilUsage;
        status.brick -= status.brickUsage;
        updateUI();
    }, 120000 / status.customers);

    const monthCountdown = setInterval(() => {
        alert('ITS YOUR SALARY');
        let salaryLeftoverTotal = 0;
        let currentCaps = [];
        for(let key in status.changingSalaryCaps){
            currentCaps.push(status.changingSalaryCaps[key]);
        }
        currentCaps.forEach(element => {
            salaryLeftoverTotal += element;
        });
        status.cash += salaryLeftoverTotal;
        resetSalaryCaps();
    }, monthTime);

    // --------------------- UI ---------------------

    const cashDisplay = document.getElementById("cashDisplay");
    const foodDisplay = document.getElementById("foodDisplay");
    const customerDisplay = document.getElementById("customerDisplay");
    const woodDisplay = document.getElementById("woodDisplay");
    const steelDisplay = document.getElementById("steelDisplay");
    const oilDisplay = document.getElementById("oilDisplay");
    const brickDisplay = document.getElementById("brickDisplay");

    function updateUI(){
        cashDisplay.textContent = `cash: ${getFormattedNumber(status.cash)}`;
        foodDisplay.textContent = `food: ${getFormattedNumber(status.food)}`;
        customerDisplay.textContent = `customers: ${getFormattedNumber(status.customers)}`;
        woodDisplay.textContent = `wood: ${getFormattedNumber(status.wood)}`;
        steelDisplay.textContent = `steel: ${getFormattedNumber(status.steel)}`;
        oilDisplay.textContent = `oil: ${getFormattedNumber(status.oil)}`;
        brickDisplay.textContent = `brick: ${getFormattedNumber(status.brick)}`;

    }

    // ---------------- NUMBER FORMATTING ------------

    function getNthIllion(n) {
        n = Number(n);
        if (n < 1_000_000) return 0;
        return Math.floor(Math.log10(n) / 3) - 1;
    }

    function getFormattedNumber(n) {
        n = Number(n);
        function getNumberShortener(n) {
            const nthNum = getNthIllion(n);
            const ones = nthNum % 10;
            const tens = Math.floor(nthNum / 10);
            if (n >= 1000 && n < 1_000_000) {
                return `K`;
            }
            let string = ``;
            switch (ones) {
                case 1:
                    if (tens === 0) {
                        string += `M`;
                    } else {
                        string += `Un`;
                    }
                    break;                case 2:
                    if (tens === 0) {
                        string += `B`;
                    } else {
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
            switch (tens) {
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
            return string;
        }

        function getNumberShortened(n) {
            if (n < 1000) {
                return Math.round(n);
            }
            if (n < 1_000_000) {
                return (n / 1000).toFixed(2);
            }
            const nth = getNthIllion(n);
            const divisor = 10 ** ((nth + 1) * 3);
            return (n / divisor).toFixed(2);
        }

        if (!Number.isFinite(n) || n < 0) {
            return "Infinity";
        }

        return `${getNumberShortened(n)}${getNumberShortener(n)}`;
    }

    function getHyperE(n) {
        n = Number(n);
        if (n < 1e6) {
            return n;
        }
        if (!Number.isFinite(n)) {
            return ``;
        }
        const zerosAmnt = Math.floor(Math.log10(n));
        const number = n / Math.pow(10, zerosAmnt);
        const fixed = number.toFixed(2);
        if (zerosAmnt >= 303) return ``;
        return `${fixed}e${zerosAmnt}`;
    }

    // ---------------- ALERTS/CONFIRMS -------------
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
        function confirm(message){
            return new Promise(resolve => {
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
    function initiate(){
        loadGame();
        updateStatus();
    }
    window.onload = initiate;
})();
