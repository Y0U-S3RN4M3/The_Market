(() => {
    const button = document.getElementById("uselessBtn");
    const text = document.getElementById("text");
    let clicks = localStorage.getItem("clicks");
    if(clicks === null){
        clicks = 0;
    }
    text.textContent = `You have wasted ${clicks} clicks of your time`


    if(button){
        button.addEventListener('click', () => {
            clicks++;
            localStorage.setItem("clicks", clicks);
            text.textContent = `You have wasted ${clicks} clicks of your time`
        })
    }
})(); 
