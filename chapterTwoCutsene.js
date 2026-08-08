const typing = new Audio('sounds/typing-noises.mp3');
typing.volume = 1;
const boom = new Audio('sounds/vine-boom.mp3');
boom.volume = 1;
const music = new Audio('sounds/music.mp3');
music.volume = 1;
music.play();

function animate() {
    return new Promise(resolve => {
        const animation = lottie.loadAnimation({
            container: document.getElementById("backgroundAnimation"),
            renderer: "svg",
            loop: false,
            autoplay: true,
            path: "images/Lock.json",
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        });

        animation.setSpeed(1.5);

        animation.addEventListener("complete", () => {
            console.log("Animation finished!");
            resolve();
        });
    });
}

function text() {
    music.pause();
    boom.play();
    return new Promise(resolve => {
        const header = document.createElement("h1");
        header.classList.add("cutseneText");
        document.body.appendChild(header);

        const message = "World Two Unlocked!";
        
        for (let i = 0; i < message.length; i++) {
            setTimeout(() => {
                header.textContent += message.charAt(i);
            }, i * 75);
        }
        typing.play();
        // Wait until the last letter has been typed
        setTimeout(() => {
            typing.pause();
            typing.currentTime = 0;
            resolve();
        }, message.length * 75 + 100);
    });
}

async function stuffToDo() {
    await animate();
    await text();
    setTimeout(() => window.location.href = "game2.html", 1000)
}

stuffToDo();