function importFoodForEvent() {
    const savedFood = localStorage.getItem("eventFood");
    const savedGame = localStorage.getItem("gameSave");

    if (!savedFood) {
        console.log("No event food found!");
        return {};
    }

    try {
        const importedFood = JSON.parse(savedFood);

        // Convert all imported values to Decimal
        for (const [key, value] of Object.entries(importedFood)) {
            importedFood[key] = new Decimal(value);
        }

        // Get the player's REAL current cash
        if (savedGame) {
            const gameSave = JSON.parse(savedGame);

            if (gameSave.cash !== undefined) {
                importedFood.cashCount = new Decimal(gameSave.cash);
            }
        }

        console.log("Food imported:", importedFood);

        return importedFood;

    } catch (error) {
        console.error("Failed to import event food:", error);
        return {};
    }
}

let eventFood = importFoodForEvent();

// ============================================================
// CONFIRM/ALERT/INPUT/RISK SYSTEM
// ============================================================

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
    setTimeout(() => {
        if (alert.parentElement === alertDiv) {
            alertDiv.removeChild(alert);
        }
    }, 3000);
}

function confirm(message) {

    return new Promise(resolve => {

        // Safely stop the countdown if it exists
        if (typeof countdownInterval !== "undefined") {
            clearInterval(countdownInterval);
        }

        const overlay = document.createElement("div");
        overlay.id = "confirmOverlay";

        const confirmBox = document.createElement("div");
        confirmBox.id = "confirm";
        confirmBox.classList.add("confirm");
        confirmBox.style.zIndex = '9e72'

        const text = document.createElement("div");
        text.textContent = message;
        text.style.whiteSpace = "pre-line";
        text.style.maxHeight = "50vh";
        text.style.overflowY = "auto";

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("allowanddeny");

        // ====================================================
        // ALLOW
        // ====================================================

        const allow = document.createElement("button");
        allow.classList.add("btn", "allowBtn");
        allow.textContent = "allow";

        allow.addEventListener("click", () => {

            confirmBox.remove();
            overlay.remove();

            // Only restart countdown if the function exists
            if (typeof setCountDown === "function") {
                setCountDown();
            }

            resolve(true);
        });


        // ====================================================
        // DENY
        // ====================================================

        const deny = document.createElement("button");
        deny.classList.add("btn", "denyBtn");
        deny.textContent = "deny";

        deny.addEventListener("click", () => {

            confirmBox.remove();
            overlay.remove();

            // Restart countdown
            if (typeof setCountDown === "function") {
                setCountDown();
            }

            resolve(false);
        });


        // ====================================================
        // BUILD CONFIRM BOX
        // ====================================================

        document.body.appendChild(overlay);
        document.body.appendChild(confirmBox);

        confirmBox.appendChild(text);
        confirmBox.appendChild(document.createElement("br"));
        confirmBox.appendChild(btnContainer);

        btnContainer.appendChild(allow);
        btnContainer.appendChild(deny);
    });
}

function input(message, type) {

    return new Promise(resolve => {

        // Safely stop the countdown if it exists
        if (typeof countdownInterval !== "undefined") {
            clearInterval(countdownInterval);
        }

        const overlay = document.createElement("div");
        overlay.id = "confirmOverlay";

        const confirmBox = document.createElement("div");
        confirmBox.id = "confirm";
        confirmBox.classList.add("confirm");

        const text = document.createElement("div");
        text.textContent = message;
        text.style.whiteSpace = "pre-line";
        text.style.maxHeight = "50vh";
        text.style.overflowY = "auto";

        const input = document.createElement("input");
        input.style.whiteSpace = "pre-line";
        input.style.maxHeight = "50vh";
        input.style.overflowY = "auto";
        input.value = 0;
        input.type = type

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("allowanddeny");

        // ====================================================
        // ALLOW
        // ====================================================

        const allow = document.createElement("button");
        allow.classList.add("btn", "allowBtn");
        allow.textContent = "allow";

        allow.addEventListener("click", () => {

            confirmBox.remove();
            overlay.remove();

            // Only restart countdown if the function exists
            if (typeof setCountDown === "function") {
                setCountDown();
            }

            resolve(input.value);
        });


        // ====================================================
        // BUILD CONFIRM BOX
        // ====================================================

        document.body.appendChild(overlay);
        document.body.appendChild(confirmBox);

        confirmBox.appendChild(text);
        confirmBox.appendChild(input)
        confirmBox.appendChild(document.createElement("br"));
        confirmBox.appendChild(btnContainer);

        btnContainer.appendChild(allow);
    });
}

async function chooseFoodRisk() {
    return new Promise(resolve => {

        const overlay = document.createElement("div");
        overlay.id = "confirmOverlay";

        const box = document.createElement("div");
        box.classList.add("confirm");

        overlay.style.position = "fixed";
        overlay.style.inset = "0";
        overlay.style.overflowY = "auto";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "flex-start";
        overlay.style.padding = "20px";
        overlay.style.boxSizing = "border-box";

        box.style.margin = "0 auto";

        const table = document.createElement("table");

        const header = document.createElement("tr");

        header.innerHTML = `
            <th>Food</th>
            <th>Amount</th>
            <th>Risk</th>
        `;

        table.appendChild(header);

        const inputs = {};

        for (const [food, amount] of Object.entries(eventFood)) {

            if (new Decimal(amount).lte(0)) continue;

            const row = document.createElement("tr");

            const name = food
                .replace("Count", "")
                .replace(/([A-Z])/g, " $1");

            const foodName = name.charAt(0).toUpperCase() + name.slice(1);

            const riskInput = document.createElement("input");

            riskInput.type = "number";
            riskInput.min = "1";
            riskInput.max = amount;
            riskInput.value = "0";
            riskInput.classList.add("riskInput");

            row.innerHTML = `
                <td>${foodName}</td>
                <td>${amount}</td>
            `;

            const riskCell = document.createElement("td");
            riskCell.appendChild(riskInput);

            row.appendChild(riskCell);
            table.appendChild(row);

            inputs[food] = riskInput;
        }

        const submit = document.createElement("button");
        submit.textContent = "RISK";
        submit.classList.add("btn");
        submit.classList.add("submitBtn")

        submit.addEventListener("click", () => {

            const riskedFood = {};

            for (const [food, input] of Object.entries(inputs)) {

                const amount = new Decimal(input.value || 0);

                if (amount.lt(0)) {
                    alert("risk cannot be negative!");
                    return;
                }

                if (amount.gt(eventFood[food])) {
                    alert(`You don't have enough ${food}!`);
                    return;
                }

                if (amount.gt(0)) {
                    riskedFood[food] = amount;
                }
            }

            box.remove();
            overlay.remove();
            console.log(riskedFood);
            resolve(riskedFood);
        });

        box.appendChild(table);
        box.appendChild(document.createElement("br"));
        box.appendChild(submit);

        document.body.appendChild(overlay);
        document.body.appendChild(box);
    });
}
// ============================================================
// PARTICIPATION
// ============================================================

function stringifyObject(obj) {
    return Object.entries(obj)
        .filter(([key, value]) => !new Decimal(value).eq(0))
        .map(([key, value]) => {
            let name = key
                .replace("Count", "")
                .replace(/([A-Z])/g, " $1");

            name = name.charAt(0).toUpperCase() + name.slice(1);

            return `${name}: ${value}`;
        })
        .join("\n");
}

const eventFoodString = stringifyObject(eventFood);

async function askIfParticipate() {

    const accepted = await confirm(
        `Do you want to participate in minigames with ${eventFoodString}?`
    );

    if (accepted) {
        return true;
    }

    return false;
}
async function startParticipation() {
    const ask = await askIfParticipate();

    if (!ask) {
        window.location.href = "game.html";
    }
    else{
        runMinigames();
    }
}

startParticipation();

async function runMinigames(){

    let risk = await chooseFoodRisk();

    console.log("RISK:", risk);
console.log("RISK KEYS:", Object.keys(risk));

    if (!risk || Object.keys(risk).length === 0) {
        const confirmIt = await confirm('No Food is risked, If you play you will not profit');
        if(!confirmIt){
            alert("Please risk, this time I won't warn you...");
            risk = await chooseFoodRisk();
        }
    }

    // Take the risk out of eventFood
    for (const [food, amount] of Object.entries(risk)) {
        eventFood[food] = eventFood[food].sub(amount);
    }

    console.log("Food after risk:", eventFood);

    // ===============================================
    // MINDFLIP
    // ===============================================
    async function mindFlip(){
        await confirm(`MINDFLIP INSTRUCTIONS:
            IT'S A MEMORY GAME.
            JUST BE CAUTIOUS AND DON'T CLICK WITHOUT THINKING
            WHAT IS GAMLING REALLY COSTING YOU...`);
        let tryThink = await input(
            'How many tries do you think it will take to beat MindFlip?',
            'number'
        );
        tryThink = Number(tryThink);      
        return new Promise(resolve => {
            document.body.innerHTML = `
            <main>
            <div id='alertDiv'></div>
        <div class="game">
            <div class="board is-loading">
                <button id="alien" class="card">
                    <div class="content">
                        <span class="face">🙂</span>
                        <div class="prop">
                            <div class="ogre-mask">
                                <span class="mask">👹</span>
                                <span class="hand">🫰</span>
                            </div>
                        </div>
                    </div>
                </button>
                <button id="ogre" class="card">
                    <div class="content">
                        <span class="face">🙂</span>
                        <div class="prop">
                            <div class="goblin-mask">
                                <span class="hand">🫸</span>
                                <span class="mask">👺</span>
                                <span class="hand">🫷</span>
                            </div>
                        </div>
                    </div>
                </button>
                <button id="robot" class="card">
                    <div class="content">
                        <span class="face">🙂</span>
                        <div class="prop">
                            <div class="ogre-mask">
                                <span class="mask">👹</span>
                                <span class="hand">🫰</span>
                            </div>
                        </div>
                    </div>
                </button>
                <button id="clown" class="card">
                    <div class="content">
                        <span class="face">🙂</span>
                        <div class="prop">
                            <div class="goblin-mask">
                                <span class="hand">🫸</span>
                                <span class="mask">👺</span>
                                <span class="hand">🫷</span>
                            </div>
                        </div>
                    </div>
                </button>
                <button id="pumpkin" class="card">
                    <div class="content">
                        <span class="face">🙂</span>
                        <div class="prop">
                            <div class="ogre-mask">
                                <span class="mask">👹</span>
                                <span class="hand">🫰</span>
                            </div>
                        </div>
                    </div>
                </button>
                <button id="frog" class="card">
                    <div class="content">
                        <span class="face">🙂</span>
                        <div class="prop">
                            <div class="goblin-mask">
                                <span class="hand">🫸</span>
                                <span class="mask">👺</span>
                                <span class="hand">🫷</span>
                            </div>
                        </div>
                    </div>
                </button>
                <button id="skull" class="card">
                    <div class="content">
                        <span class="face">🙂</span>
                        <div class="prop">
                            <div class="skull-mask">
                                <span class="mask">💀</span>
                                <span class="hand">👌</span>
                            </div>
                        </div>
                    </div>
                </button>
                <button id="cow" class="card">
                    <div class="content">
                        <span class="face">🙂</span>
                        <div class="prop">
                            <div class="mustache-mask">
                                <span class="mask">🥴</span>
                                <span class="hand">🫳</span>
                            </div>
                        </div>
                    </div>
                </button>
                <button id="disguise" class="card">
                    <div class="content">
                        <span class="face">🙂</span>
                        <div class="prop">
                            <div class="skull-mask">
                                <span class="mask">💀</span>
                                <span class="hand">👌</span>
                            </div>
                        </div>
                    </div>
                </button>
                <button id="eye" class="card">
                    <div class="content">
                        <span class="face">🙂</span>
                        <div class="prop">
                            <div class="mustache-mask">
                                <span class="mask">🥴</span>
                                <span class="hand">🫳</span>
                            </div>
                        </div>
                    </div>
                </button>
                <button id="dragon" class="card">
                    <div class="content">
                        <span class="face">🙂</span>
                        <div class="prop">
                            <div class="skull-mask">
                                <span class="mask">💀</span>
                                <span class="hand">👌</span>
                            </div>
                        </div>
                    </div>
                </button>
                <button id="fox" class="card">
                    <div class="content">
                        <span class="face">🙂</span>
                        <div class="prop">
                            <div class="mustache-mask">
                                <span class="mask">🥴</span>
                                <span class="hand">🫳</span>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
            <div class="marquee">
                <span class="marquee-text">Unmasked!</span>
            </div>
        </div>
        <div class="interface">
            <div style='color: white;' class="interface-data interface-data-tries">Tries: <span class="tries-value">0</span></div>
        </div>
    </main>
            `
            const board = document.querySelector(".board");
            const cards = board.querySelectorAll(".card");
            const triesValue = document.querySelector(".tries-value");
            const marquee = document.querySelector(".marquee");
            const marqueeText = document.querySelector(".marquee-text");
            const faces = ["🫠", "🦬", "🧠", "🤖", "🤡", "👾"];
            const cls = {
                completed: "is-complete",
                combo: "is-combo",
                loading: "is-loading",
                matched: "is-matched",
                waiting: "is-waiting"
            };
            let selectedCard;
            let triesCount = 0;
            let matchCount = 0;
            let comboCount = 0;
            let bestCount;
            let completeCount = faces.length;

            const shuffle = (arr) => {
                for (let i = arr.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }

                return arr;
            };

            const displayMarquee = (str, isCombo) => {
                marquee.classList.toggle(cls.combo, isCombo);
                marqueeText.textContent = str;
                marquee.style.setProperty("display", "grid");
            };

            const toggleCardSelected = (card) => {
                const isPressed = card.getAttribute("aria-pressed") === "true";
                card.setAttribute("aria-pressed", isPressed ? "false" : "true");
            };

            const setMatchedProps = (el) => {
                el.setAttribute("disabled", "");
                el.classList.add(cls.matched);
            };

            const updateTries = (value) => {
                triesCount = value;
                triesValue.textContent = value;
            };

            const checkMatch = (card) => {
                const cardFace = card.getAttribute("data-face");
                const selectedCardFace = selectedCard.getAttribute("data-face");

                board.classList.add(cls.waiting);

               if (cardFace === selectedCardFace) {
                setMatchedProps(card);
                setMatchedProps(selectedCard);
                matchCount++;
                comboCount++;

                if (comboCount > 1) {
                    displayMarquee(`${comboCount}×!`, true);
                }

                setTimeout(() => {
                    card.removeAttribute("aria-pressed");
                    selectedCard.removeAttribute("aria-pressed");
                    selectedCard = null;
                    board.classList.remove(cls.waiting);

                    // CHECK FOR WIN AFTER THE PAIR HAS FINISHED
                    checkComplete();

                }, 500);
            } else {
                    comboCount = 0;

                    setTimeout(() => {
                        toggleCardSelected(card);
                        toggleCardSelected(selectedCard);
                        selectedCard = null;
                        board.classList.remove(cls.waiting);
                    }, 1000);
                }

                updateTries(triesCount + 1);
            };

            const checkComplete = () => {
                if (matchCount !== completeCount) {
                    return;
                }

                displayMarquee("Unmasked!", false);

                setTimeout(() => {
                    board.classList.add(cls.completed);
                }, 1000);

                const cashMultiplier = new Decimal(1000).div(tryThink);
                const foodMultiplier = new Decimal(35).div(tryThink);
                alert(`YOU GOT THE CODE IN ${triesCount} TRIES`);

                if (triesCount <= tryThink) {
                    alert(`YOU BEAT ${tryThink} TRIES`);

                    for (const food of Object.keys(risk)) {
                        const multiplier = food === "cash"
                            ? cashMultiplier
                            : foodMultiplier;

                        eventFood[food] = eventFood[food].add(
                            risk[food].mul(multiplier)
                        );
                    }

                    console.log("Event Food:", eventFood);
                }
                else {
                    alert(`YOU LOST TO YOURSELF!`);
                    alert(`YOU LOSE YOUR RISK!`);

                    console.log("Event Food:", eventFood);
                }
                resolve();
                return;
            };

            const setupGame = () => {
                const fragment = document.createDocumentFragment();
                const shuffledFaces = shuffle(faces.concat(faces));
                const shuffledCards = shuffle([...cards]);

                shuffledCards.forEach((card, index) => {
                    const face = shuffledFaces[index];

                    card.setAttribute("data-face", face);
                    card.style.setProperty("--i", index + 1);
                    card.querySelector(".face").innerHTML = face;
                    fragment.append(card);
                });

                board.classList.add(cls.loading);
                board.replaceChildren(fragment);
                setTimeout(() => {
                    board.classList.remove(cls.loading);
                }, 1000);
            };

            cards.forEach((card) =>
                card.addEventListener("click", () => {

                    // If this is already the selected card,
                    // don't toggle it back
                    if (card === selectedCard) {
                        return;
                    }

                    toggleCardSelected(card);

                    if (!selectedCard) {
                        selectedCard = card;
                        return;
                    }

                    checkMatch(card);
                    checkComplete();
                })
            );

            marquee.addEventListener("animationend", (e) => {
                if (e.animationName !== "marquee-reveal") {
                    return;
                }
                marquee.style.setProperty("display", "none");
            });

            setupGame();
        });
    }

    // ==============================
    // FORGOTTEN PROTOCOL
    // ==============================

    async function runForgottenProtocol(){
        const tutorial = await confirm(`FORGOTTEN PROTOCOL INSTRUCTIONS: 

EACH PART TO THE CODE(every 2 digits) HAS A NUMBER
THAT NUMBER, WHEN YOU INPUT IT, SHOWS IF THE ACTUALL PART IS HIGHER OR LOWER.
USING THAT, TRY TO FIND THE CODE UNDER THE AMOUNT OF TRIES YOU ARE ABOUT TO INPUT.
THE LESS TRIES YOU INPUT, THE BIGGER THE REWARD, BUT THE HARDER...
GOOD LUCK, AND WHAT IS GAMBLING REALLY COSTING YOU...😔😔😔`)
        const tryThink = await input('How many tries will it take to get the code?', 'number')

        return new Promise(resolve => {
        let running = true;
        const digitNum = 8;
        const code = Math.floor(Math.random() * 10 ** digitNum)
            .toString()
            .padStart(digitNum, '0');   
        let tries = 0;     
        const part1 = Number(code[0] + code[1]);
        const part2 = Number(code[2] + code[3]);
        const part3 = Number(code[4] + code[5]);
        const part4 = Number(code[6] + code[7]);

        const forgottenProtocolContainer = document.createElement('div');
        const higherArrows = document.createElement('p');
        const codeInputs = document.createElement('div');
        const input1 = document.createElement('input');
        const input2 = document.createElement('input');
        const input3 = document.createElement('input');
        const input4 = document.createElement('input');
        const input5 = document.createElement('input');
        const input6 = document.createElement('input');
        const input7 = document.createElement('input');
        const input8 = document.createElement('input');
        const lowerArrows = document.createElement('p');
        const submit = document.createElement('button');
        forgottenProtocolContainer.id = 'forgottenProtocolContainer'
        higherArrows.textContent = '';
        higherArrows.style.color = 'white';
        higherArrows.style.padding = '15px';
        lowerArrows.textContent = '';
        lowerArrows.style.padding = '15px';
        lowerArrows.style.color = 'white';

        submit.textContent = 'SUBMIT';
        submit.className = 'btn submitBtn'


        const inputs = [
            input1, input2, input3, input4,
            input5, input6, input7, input8
        ];

        const higherArrowContainers = [];
        const lowerArrowContainers = [];

        for (let i = 0; i < 4; i++) {
            const higher = document.createElement('span');
            const lower = document.createElement('span');

            higher.textContent = '';
            lower.textContent = '';

            higher.style.display = 'inline-block';
            lower.style.display = 'inline-block';

            higher.style.width = '100px';
            lower.style.width = '100px';

            higherArrowContainers.push(higher);
            lowerArrowContainers.push(lower);

            higherArrows.appendChild(higher);
            lowerArrows.appendChild(lower);
        }

        inputs.forEach((input, index) => {
            input.placeholder = '0';
            input.className = 'forgottenProtocolInput';
            input.type = 'text';
            input.inputMode = 'numeric';
            input.maxLength = 1;
            if(index === 2 || index === 3){
                input.style.backgroundColor = 'rgb(15, 15, 15)';
            }
            if(index === 6 || index === 7){
                input.style.backgroundColor = 'rgb(15, 15, 15)';
            }

            input.addEventListener('input', () => {
                input.value = input.value.replace(/[^0-9]/g, '');

                if (input.value !== '' && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
                if(index === digitNum-1){

                }
            });
            input.addEventListener('keydown', event => {

                // Green/correct input: don't allow typing
                if (input.readOnly) {
                    event.preventDefault();
                    return;
                }

                // Backspace
                if (event.key === 'Backspace') {

                    // If this input has a value, just delete it
                    if (input.value !== '') {
                        input.value = '';
                        event.preventDefault();
                        return;
                    }

                    // If empty, find the previous non-green input
                    if (index > 0) {
                        let previousIndex = index - 1;

                        while (previousIndex >= 0 && inputs[previousIndex].readOnly) {
                            previousIndex--;
                        }

                        if (previousIndex >= 0) {
                            inputs[previousIndex].value = '';
                            inputs[previousIndex].focus();
                        }
                    }

                    event.preventDefault();
                    return;
                }

                // Typing a number
                if (/^[0-9]$/.test(event.key)) {
                    event.preventDefault();

                    input.value = event.key;

                    // Find next non-green input
                    let nextIndex = index + 1;

                    while (nextIndex < inputs.length && inputs[nextIndex].readOnly) {
                        nextIndex++;
                    }

                    if (nextIndex < inputs.length) {
                        inputs[nextIndex].focus();
                    }
                }
            });
        });
        codeInputs.appendChild(input1);
        codeInputs.appendChild(input2);
        codeInputs.appendChild(input3);
        codeInputs.appendChild(input4);
        codeInputs.appendChild(input5);
        codeInputs.appendChild(input6);
        codeInputs.appendChild(input7);
        codeInputs.appendChild(input8);

        forgottenProtocolContainer.appendChild(higherArrows);
        forgottenProtocolContainer.appendChild(codeInputs);
        forgottenProtocolContainer.appendChild(lowerArrows);
        forgottenProtocolContainer.appendChild(submit);

        document.body.appendChild(forgottenProtocolContainer);

        const parts = [part1, part2, part3, part4]

        submit.addEventListener('click', () => {

            // Game already finished
            if (!running) {
                return;
            }

            tries++;

            alert("submitted");

            const attempt = input1.value + 
                            input2.value + 
                            input3.value + 
                            input4.value + 
                            input5.value + 
                            input6.value + 
                            input7.value + 
                            input8.value;

            if (attempt.length < digitNum) {
                alert('Please fill in the entire code');
                return;
            }

            // =========================
            // CORRECT CODE
            // =========================
            if (attempt === code) {
                const cashMultiplier = new Decimal(1000).div(tryThink);
                const foodMultiplier = new Decimal(25).div(tryThink);
                inputs.forEach(input => {
                    input.style.backgroundColor = 'rgb(0, 54, 0)';
                    input.readOnly = true;
                });

                higherArrowContainers.forEach(arrow => {
                    arrow.textContent = '';
                });

                lowerArrowContainers.forEach(arrow => {
                    arrow.textContent = '';
                });

                running = false;

                alert(`YOU GOT THE CODE IN ${tries} TRIES`);

                if (tries <= tryThink) {
                    alert(`YOU BEAT ${tryThink} TRIES`);

                    for (const food of Object.keys(risk)) {
                        const multiplier = food === "cash"
                            ? cashMultiplier
                            : foodMultiplier;

                        eventFood[food] = eventFood[food].add(
                            risk[food].mul(multiplier)
                        );
                    }

                    console.log("Event Food:", eventFood);
                }
                else {
                    alert(`YOU LOST TO YOURSELF!`);
                    alert(`YOU LOSE YOUR RISK!`);

                    console.log("Event Food:", eventFood);
                }
                resolve();
                return;
            }

            // =========================
            // WRONG CODE
            // =========================

            // Reset previous yellow/arrow states
            inputs.forEach((input, index) => {
                if (!input.readOnly) {
                    if (index === 2 || index === 3 || index === 6 || index === 7) {
                        input.style.backgroundColor = 'rgb(15, 15, 15)';
                    } else {
                        input.style.backgroundColor = 'black';
                    }
                }
            });

            // Reset arrows
            higherArrowContainers.forEach(arrow => {
                arrow.textContent = '';
            });

            lowerArrowContainers.forEach(arrow => {
                arrow.textContent = '';
            });

            const checkedParts = [...parts];

            // FIRST: exact matches
            parts.forEach((element, index) => {

                const attemptPart = Number(
                    attempt[index * 2] + attempt[index * 2 + 1]
                );

                if (attemptPart === element) {

                    inputs[index * 2].style.backgroundColor = 'rgb(0, 54, 0)';
                    inputs[index * 2 + 1].style.backgroundColor = 'rgb(0, 54, 0)';

                    inputs[index * 2].readOnly = true;
                    inputs[index * 2 + 1].readOnly = true;

                    checkedParts[index] = null;
                }
            });

            // SECOND: wrong-position matches + arrows
            parts.forEach((element, index) => {

                const attemptPart = Number(
                    attempt[index * 2] + attempt[index * 2 + 1]
                );

                // Don't process exact match again
                if (attemptPart === element) {
                    return;
                }

                const matchingIndex = checkedParts.indexOf(attemptPart);

                if (matchingIndex !== -1) {

                    // YELLOW
                    inputs[index * 2].style.backgroundColor = 'rgb(54, 54, 0)';
                    inputs[index * 2 + 1].style.backgroundColor = 'rgb(54, 54, 0)';

                    // Consume that occurrence
                    checkedParts[matchingIndex] = null;
                }

                // Attempt is LOWER than actual
                if (attemptPart < element) {
                    higherArrowContainers[index].textContent = '↑↑';
                }

                // Attempt is HIGHER than actual
                if (attemptPart > element) {
                    lowerArrowContainers[index].textContent = '↓↓';
                }
            });
        });
        });
    }
    const randomNum = Math.random();
    console.log(randomNum);
    if(randomNum >= 0.5){
        document.body.innerHTML = `<div id='alertDiv'></div>`;
        await mindFlip();
    } else {
        document.body.innerHTML = `<div id='alertDiv'></div>`;
        await runForgottenProtocol();
    }

    console.log("MINIGAME FINISHED");
    console.log("FINAL EVENT FOOD:", eventFood);

    const gameSave = JSON.parse(localStorage.getItem("gameSave"));

    if (!gameSave) {
        console.error("NO GAME SAVE FOUND!");
        return;
    }

    for (const [food, amount] of Object.entries(eventFood)) {
        gameSave[food] = amount.toString();
    }

    localStorage.setItem("gameSave", JSON.stringify(gameSave));

    console.log("GAME SAVE AFTER EXPORT:", JSON.parse(localStorage.getItem("gameSave")));
    setTimeout(() => {
        window.location.href = "game.html";
    }, 5000)
}