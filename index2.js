

(() => {

    const savedGame = JSON.parse(localStorage.getItem("gameSave"));

    if (!savedGame || savedGame.worldTwoUnlocked !== true) {
        window.location.replace("game.html");
        return;
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

})();
