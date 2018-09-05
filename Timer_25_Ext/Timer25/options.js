function load_options(){
    chrome.storage.sync.get({msgStyle: "notif", playSound: "no"}, function(items) {
        /* message style part */
        var msgstyle_input_list = document.querySelectorAll("input[name='msgstyle'")
        for(var i=0; i < msgstyle_input_list.length; i++){
            var current_ele = msgstyle_input_list[i]
            if (current_ele.value == items.msgStyle){
                current_ele.checked = true
            }
        }
        /* play sound part */
        var playsound_input = document.querySelector("input[name='playsound'")
        if(items.playSound == 'yes'){
            playsound_input.checked = true
        } else {
            playsound_input.checked = false
        }
    })
}

var stts_clr_tmr
function save_options(){
    /* message style part */
    var msgstyle_input_list = document.querySelectorAll("input[name='msgstyle'")
    var msgstyle = "notif"  // default
    for(var i=0; i < msgstyle_input_list.length; i++){
        var current_ele = msgstyle_input_list[i]
        if (current_ele.checked){
            msgstyle = current_ele.value
        }
    }
    /* play sound part */
    var playsound_input = document.querySelector("input[name='playsound'")
    var playsound_value = "no"
    if(playsound_input.checked){
        playsound_value = "yes"
    }
    /* save */
    chrome.storage.sync.set({msgStyle: msgstyle, playSound: playsound_value}, function(){
        var status = document.querySelector("#status")
        status.style.display = "inline"
        clearTimeout(stts_clr_tmr)
        stts_clr_tmr = setTimeout(function() {
            status.style.display = "none"
        }, 1000)
    })
}

function i18n(){
    document.getElementById("msgstyle__label").innerHTML = chrome.i18n.getMessage("messageBoxStyle")
    document.getElementById("extraoption__label").innerHTML = chrome.i18n.getMessage("extraOptions")
    document.querySelector("#status").textContent = chrome.i18n.getMessage("saved")
    document.querySelector("#isplaysound").textContent = chrome.i18n.getMessage("playSoundOption")
}

// document.ready events
document.addEventListener("DOMContentLoaded", load_options)
document.addEventListener("DOMContentLoaded", i18n)

// click events
document.querySelectorAll("input[name='msgstyle']").forEach(function(val, ind, arr){
    arr[ind].addEventListener("click", save_options)
})
document.querySelectorAll("input[name='playsound']").forEach(function(val, ind, arr){
    arr[ind].addEventListener("click", save_options)
})
document.querySelectorAll(".as-msgstyle-radio").forEach(function(val, ind, arr){
    arr[ind].addEventListener("click", function(){
        this.parentNode.parentNode.querySelector("input[name='msgstyle']").click()
    })
})
document.querySelectorAll(".as-playsound-checkbox").forEach(function(val, ind, arr){
    arr[ind].addEventListener("click", function(){
        this.parentNode.parentNode.querySelector("input[name='playsound']").click()
    })
})

// play option's example
document.querySelector("#playsound__btn").addEventListener("click", function(){
    var sound = new Audio("sound.mp3")
    sound.play()
})
document.querySelector("#msgstyle_notif__btn").addEventListener("click", function(){
    var text = chrome.i18n.getMessage("messageBoxHere")
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'Timer.png',
        title: text,
        message: "",
        contextMessage: (new Date()).toLocaleTimeString(),  // in gray text
        eventTime: Date.now(),  // add a event time stamp
        isClickable: true,  // show hand pointer when hover
        requireInteraction: true,  // do not close until click
    })
})
document.querySelector("#msgstyle_alert__btn").addEventListener("click", function(){
    var text = chrome.i18n.getMessage("messageBoxHere")
    chrome.extension.getBackgroundPage().alert(text + '\n\n' + (new Date()).toLocaleTimeString())
})
chrome.notifications.onClicked.addListener(function(notificationid){
    chrome.notifications.clear(notificationid)
})
