clamp=(x,a,b)=>Math.max(a,Math.min(x,b));

document.addEventListener("DOMContentLoaded", event=>{
    const nextButton = document.getElementById("next-button");
    var mouseData = {
        x:0,
        y:0
    }
    document.addEventListener("mousemove", event=>{
        mouseData.x = event.clientX;
        mouseData.y = event.clientY;
    });

    var cookieNumber = 0;

    setInterval(() => {
        let buttonX = +nextButton.style.left.replace('vw', '') / 100 * window.innerWidth;
        let buttonY = +nextButton.style.top .replace('vh', '') / 100 * window.innerHeight;

        let distanceX = buttonX - mouseData.x;
        let distanceY = buttonY - mouseData.y;
        let distance = Math.sqrt(Math.pow(distanceX,2)+Math.pow(distanceY,2));
        let moveMultiplier = Math.pow(7/distance, 2)*3;

        buttonX += clamp(moveMultiplier*distanceX, -3, 3);
        buttonY += clamp(moveMultiplier*distanceY, -3, 3);

        buttonY = clamp(buttonY, 20, window.innerHeight  - 20);
        buttonX = clamp(buttonX, 60, window.innerWidth   - 60);

        nextButton.style.left = buttonX/window.innerWidth * 100 + 'vw';
        nextButton.style.top  = buttonY/window.innerHeight * 100 + 'vh';


        let backgroundX = +document.documentElement.style.backgroundPositionX.replace('%', '');
        let backgroundY = +document.documentElement.style.backgroundPositionY.replace('%', '');

        backgroundX += (mouseData.x / window.innerWidth  - .5) * -2;
        backgroundY += (mouseData.y / window.innerHeight - .5) * 2;

        document.documentElement.style.backgroundPositionX = backgroundX + '%';
        document.documentElement.style.backgroundPositionY = backgroundY + '%';

        let acceptButton = document.getElementById("cookie-accept");

        window.localStorage.setItem("freshlyBakedCookie"+cookieNumber, 'its for u');
        cookieNumber ++;
    }, 1000/60);

    
    var itemNum = 0;
    clickNext = function() {
        chaosSound();
        let item = document.getElementById('next-item'+itemNum);
        item.style = "display:block;";
        setInterval(()=>{
            item.style.opacity = 1;
        }, 0);

        if (itemNum==4) {
            let audio = (new Audio("song.mp3")).play();
            audio.volume = Infinity;
            audio.play();
        }
        
        nextButton.style.left = Math.random() * 100 + 'vw';
        nextButton.style.top  = Math.random() * 100 + 'vh';

        itemNum++;
    }
});
var clickNext;
function chaosSound() {
    for (let i = 0; i < 5; i++) {
        let audio = (new Audio("pipe.mp3"));
        audio.volume = Infinity;
        audio.play();
    }
}