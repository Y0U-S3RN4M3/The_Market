const typing = new Audio('sounds/typing-noises.mp3');
typing.volume = 0.5;

const boom = new Audio('sounds/vine-boom.mp3');
boom.volume = 0.5;

function stuffToDo(callback){
    const header = document.querySelector(".eventHeader");

    const textToShow = 'The vortex has arrived, the fabric of the universe has been warped...'
    typing.play()
    boom.play()

    for(let i = 0; i < textToShow.length; i++){
        setTimeout(() => {
            header.textContent += textToShow.charAt(i);
        }, i * 75)
    }
    setTimeout(() => {
        typing.pause();
        callback()
    }, 6000);
    
}
stuffToDo(() => {
    window.location.href = 'game.html';
});