(() => {
    const button = document.getElementById("uselessBtn");
    const text = document.getElementById("text");
    let clicks = localStorage.getItem("clicks");
    if(clicks === null){
        clicks = 0;
    }
    text.textContent = `You have wasted ${clicks} clicks of your time`;
    if(clicks === 1){
        text.textContent = `You have wasted 1 click of your time`;
    }


    if(button){
        button.addEventListener('click', () => {
            clicks++;
            localStorage.setItem("clicks", clicks);
            if(clicks === 1){
                text.textContent = `You have wasted 1 click of your time`;
            }
            else{
                text.textContent = `You have wasted ${clicks} clicks of your time`;
            }
        })
    }
})(); 