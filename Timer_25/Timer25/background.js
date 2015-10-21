// @author Kyan
var current = 25;
var running = false;

function resetCurrent(){
    current = 25;
}

function backToInit(){
    resetCurrent();
    clearTimeout(counter);
    chrome.browserAction.setBadgeText({text: ""});
    running = false;
}

function updateTimerIcon(){
    if (current == 0) {
        backToInit();
        alert("Time Up");
    }
    if( running == true ){
        counter = setTimeout("updateTimerIcon()",60000);
        chrome.browserAction.setBadgeText({text: current.toString()+"m"});
        current--;
    } else {
        backToInit();
    }
}

function clickToggle() {
    running = !running;
    resetCurrent();
    updateTimerIcon();
}

chrome.browserAction.onClicked.addListener(clickToggle);
chrome.browserAction.setIcon({path:"Timer.png"});
chrome.browserAction.setBadgeText({text: ""});
