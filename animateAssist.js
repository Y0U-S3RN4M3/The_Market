runCelebration()

function runCelebration(){
    const container = document.getElementById("container");
    const marketingImg = document.getElementById("marketingImg");
    const img = document.getElementById("marketImg");

    let circle;

    // Step 1: Remove the image
    setTimeout(() => {
        if (img && marketingImg.contains(img)){
            marketingImg.removeChild(img);
        } 

        // Step 2: Create a new explosion circle element
        circle = document.createElement("div");
        circle.classList.add("circle");

        // Step 3: Add the circle to the container (NOT replacing marketingImg)
        container.appendChild(circle);
    }, 4000);

    // Step 4: Cleanup
    setTimeout(() => {
        if (marketingImg && container.contains(marketingImg)){
            container.removeChild(marketingImg);
        }
        container.removeChild(circle);
        document.body.removeChild(container);
        document.body.style.height = '98vh';
        const restartBtn = document.createElement("button");
        restartBtn.classList.add("btn");
        restartBtn.id = "restartBtn";
        restartBtn.textContent = "Restart";
        restartBtn.onclick = restartGame
        const btnCtn = document.getElementById("end-buttons");
        btnCtn.appendChild(restartBtn);

        const continueBtn = document.createElement("button");
        continueBtn.classList.add("btn");
        continueBtn.textContent = 'continue';
        continueBtn.onclick = function(){
            window.location.href = 'index.html';
        }
        btnCtn.appendChild(continueBtn);

    }, 5000);
    function restartGame() {
        if (confirm("Are you sure you want to restart the game? This will erase all progress.")) {
            localStorage.removeItem("gameSave");
            window.alert("Progress has been restarted.");
            window.location.href = "game.html";
            window.location = "index.html"; // force reload to game screen
        }
    }
}
