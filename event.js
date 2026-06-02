const header = document.querySelector(".eventHeader");

const textToShow = 'The vortex has arrived, the fabric of the universe has been warped...'

for(let i = 0; i < textToShow.length; i++){
    setTimeout(() => {
        header.textContent += textToShow.charAt(i);
    }, i * 75)
}

setTimeout(() => {
    window.location.href = 'game.html';
}, 6000)