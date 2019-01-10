function init() {
    document.documentElement.addEventListener('mousewheel', this.scroll, false)
    document.documentElement.addEventListener('DOMMouseScroll', this.scroll, false)
}

function scroll () {
    events.forEach(event => {
        let pos = event.el.getBoundingClientRect().top
        if (pos < event.triggerPoint && !event.triggered){
            event.triggered = true
            event.timeline = event.animationIn
        } else if (pos > window.innerHeight - 2 && event.triggered) {
            event.triggered = false
            event.timeline = event.animationOut
        }
    })
}

function addScrollEvent (event) {
    events.push(event)
}


function reset () {
    document.documentElement.removeEventListener('mousewheel', scroll)
    document.documentElement.removeEventListener('DOMMouseScroll', scroll)
    this.init()
}

let events = []

export  {
    init,
    reset,
    addScrollEvent,
    events
}
