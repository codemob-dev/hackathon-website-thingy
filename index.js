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
    setInterval(() => {
        let buttonX = +nextButton.style.left.replace('vw', '') / 100 * window.innerWidth;
        let buttonY = +nextButton.style.top .replace('vh', '') / 100 * window.innerHeight;

        let distanceX = buttonX - mouseData.x;
        let distanceY = buttonY - mouseData.y;
        let distance = Math.sqrt(Math.pow(distanceX,2)+Math.pow(distanceY,2));
        let moveMultiplier = Math.pow(6/distance, 2)*10;

        buttonX += clamp(moveMultiplier*distanceX, -7.5, 7.5);
        buttonY += clamp(moveMultiplier*distanceY, -7.5, 7.5);

        buttonY = clamp(buttonY, 20, window.innerHeight  - 20);
        buttonX = clamp(buttonX, 60, window.innerWidth   - 60);

        nextButton.style.left = buttonX/window.innerWidth * 100 + 'vw';
        nextButton.style.top  = buttonY/window.innerHeight * 100 + 'vh';
    }, 1000/60);
});

function clickNext() {
    (new Audio("pipe.mp3")).play();
}
