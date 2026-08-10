

(() => {
    const message = `THE MARKET IS THE BEST`
    console.log(message);
    const savedGame = JSON.parse(localStorage.getItem("gameSave"));

    if (!savedGame || savedGame.worldTwoUnlocked !== true) {
        console.log("ACCESS DENIED - REDIRECTING");
        window.location.replace("game.html");
        return;
    }


    // ---------------- STATUS ---------------------------
    let status = {
        cash: 1000000,
        domainStatus: {
            domain1: true,
            domain2: false,
            domain3: false,
            domain4: false,
            domain5: false,
            domain6: false,
            domain7: false,
            domain8: false,
            domain9: false,
            domain10: false,
            domain11: false,
            domain12: false,
            domain13: false,
            domain14: false,
            domain15: false,
            domain16: false,
            domain17: false,
            domain18: false,
            domain19: false,
            domain20: false,
        },
        domainSalaryCaps: {
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
            domain20: 1e18,
        }
    }

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

    // -------------------- INCREMENTALS ---------------

    let domainButtons = [];
    for(let key in status.domainStatus){
        domainButtons.push(document.getElementById(`${key}`))
    }
    
    domainButtons.forEach((element, index) => {
        element.addEventListener('click', () => {
            const domainKey = `domain${index + 1}`;
    
            if (status.domainStatus[domainKey]) {
                openMarket();
            } else {
                alert('You do not own this domain.');
            }
        });
    });

    function openMarket(domNum){
        const market = document.createElement('div');
        market.classList.add('market');
        document.body.appendChild(market);
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
                    break;

                case 2:
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
        updateStatus();
    }

    window.onload = initiate;

})();
