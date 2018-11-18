import {TweenLite, TimelineMax} from 'gsap'

const SplitText = (e, delay, dur) => {
    let wordCount
    let string
    let chars = []
    let words = []
    let typeAnimation
    let tweenDel = 1
    let height = 15

    if (e.length !== undefined) {
        e = Array.from(e)
    } else {
        e = [e]
    }
    typeAnimation = new TimelineMax({
        delay: delay || tweenDel
    })
    string = e[0].innerHTML
    function split (j, i, word, wordElm) {
        let charElm = document.createElement('div')
        let char = word.substring(j, j + 1)
        if (j === word.length - 1 && i < wordCount - 1) {
            char += '&ensp;'
        }
        charElm.innerHTML = char
        TweenLite.set(charElm, {
            y: -height,
            opacity: 0,
            position: 'relative',
            className: 'split-char',
            display: char === '*' ? 'none' : 'inline-block'
        })
        chars.push(charElm)
        if (charElm.innerHTML === '*') {
            typeAnimation.add(TweenLite.to(charElm, dur || 0.05, {
                opacity: 1,
                y: 0
            }))
        } else {
            typeAnimation.add(TweenLite.to(charElm, dur || 0.05, {
                opacity: 1,
                y: 0
            }))
        }
        wordElm.appendChild(charElm)
    }
    e.forEach((elm) => {
        elm.classList.add('split-animation')
        wordCount = string.split(' ').length
        TweenLite.set(e, {text: '', opacity: 1, perspective: '400px'})
        elm.innerHTML = ''

        for (let i = 0; i < wordCount; i++) {
            let char
            let word = wordCount === i ? string : string.split(' ')[i]
            let wordElm = document.createElement('div')
            TweenLite.set(wordElm, {
                className: '+=' + word,
                opacity: 1,
                position: 'relative',
                display: word === '* ' ? 'none' : 'inline-block'
            })
            if (word && word.length > 0) {
                if (word.charAt(0) === '&') {
                    let symbolElm = document.createElement('div')
                    symbolElm.innerHTML = word + '&ensp;'
                    TweenLite.set(symbolElm, {
                        y: -symbolElm,
                        opacity: 0,
                        className: 'split-char',
                        position: 'relative',
                        display: char === '*' ? 'none' : 'inline-block'
                    })
                    typeAnimation.add(TweenLite.to(symbolElm, dur || 0.05, {
                        opacity: 1,
                        y: 0
                    }))
                    wordElm.appendChild(symbolElm)
                    elm.appendChild(wordElm)
                    words.push(wordElm)
                    continue
                }
                for (let j = 0; j < word.length; j++) {
                    split(j, i, word, wordElm)
                }
            }
            elm.appendChild(wordElm)
            words.push(wordElm)
        }
    })
}

export default SplitText
