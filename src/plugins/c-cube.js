//code from Chris Gannon
//http://gannon.tv/

//learn how this was built https://greensock.com/cube-dial-tutorial

var body, stage, stageWidth, stageHeight, stageParent, isDevice, interactionUp, interactionDown, interactionOut,
    interactionOver, interactionMove, nullObject, container, isAndroid, fullRotation, rotationStep, dialWidth,
    dialHeight, faceZOrigin, dynamicPerspective, dialGraphic, dialContainer, dial;

var numFaces, faceWidth, faceHeight, faceArray = [], thumbsArray = [], currentIndex, paginationIndex, pressedElement, currentFace,
    slider, myDialDraggable, initialFace;

export default {
    updateDimensions() {
        if (stageWidth > window.innerWidth) {
            stageWidth = window.innerWidth / 1.25
            stageHeight = window.innerHeight / 1.3
        }
    },
    init(target, content) {

        //reference to the stage
        faceArray = []
        body = document.querySelector(target);
        nullObject = document.createElement('div');
        nullObject.className = 'null-object';
        container = document.createElement('div');
        container.className = 'container';
        [...body.children].forEach((el) => el.remove())
        body.appendChild(container);

        TweenMax.set(container, {

            width: '100%',
            height: 'auto'
            // z: -400,
            // zIndex: -100

        });


        stageWidth = 1024;
        stageHeight = 768;

        isDevice = (/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent.toLowerCase()));
        isAndroid = (/android/i.test(navigator.userAgent.toLowerCase()));

        if (isDevice) {

            interactionUp = "touchend";
            interactionDown = "touchstart";
            interactionOut = interactionUp;
            interactionOver = interactionDown;
            interactionMove = 'touchmove';

        } else {

            interactionUp = "mouseup";
            interactionDown = "mousedown";
            interactionOut = "mouseout";
            interactionOver = "mouseover";
            interactionMove = 'mousemove';

        }
        this.updateDimensions()

        numFaces = content ? content.length : 6;
        initialFace = 0;
        fullRotation = 360;
        rotationStep = fullRotation / numFaces;
        faceWidth = stageWidth;
        faceHeight = stageHeight / 1.1;
        dialWidth = 300;
        dialHeight = 300;
        faceZOrigin = getZOrigin();
        dynamicPerspective = getPerspective();
        console.log(faceWidth)
        //console.log(dynamicPerspective)

        TweenMax.set(body, {
            width: '100%',
            // y: 400,
            backgroundColor: 'black',
            overflow: 'hidden'
        });

        TweenMax.set(nullObject, {
            position: 'absolute',
            x: 0
        })

        body.appendChild(nullObject);
        createFaces(content);
        // createDialGraphics();
        // createDial();
        setCubeDraggable(initialFace);
        createSlider()
        onCubeDrag()
        // setDialDraggable();
        // createPerspectiveSlider();
    }

}


//

function createFaces() {

    var face, faceText;

    for (var i = 0; i < numFaces; i++) {

        face = document.createElement('div');
        faceText = document.createElement('h1');
        face.className = 'face';
        TweenMax.set(face, {
            //x:stageWidth/2 - (faceWidth/2),
            left: '50%',
            top: '30%',
            //y:50,
            xPercent: -50,
            yPercent: -0,
            position: 'absolute',
            width: faceWidth,
            height: faceHeight,
            overflow: 'hidden',
            zIndex: -i,
            transformPerspective: dynamicPerspective,
            transformOrigin: '50% 50% ' + -faceZOrigin + 'px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            background: 'rgba(244, 244, 244, 0.9)',
            // backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/greenBox.png)',
            rotationY: i * rotationStep,
            z: -0

        });

        face.initRotationX = 0;
        face.initRotationY = i * rotationStep;
        faceText.innerHTML = i;
        faceArray.push(face);


        face.appendChild(faceText)
        container.appendChild(face);
        // $(".face h1").eq(0).text("Swipe Me")
    }

}


function setCubeDraggable(id) {

    var myCubeDraggable = null;

    myCubeDraggable = Draggable.create(nullObject, {
        type: 'x, y',
        lockAxis: true,
        //trigger:faceArray[id],
        trigger: container,
        dragResistance: 0.97,
        throwResistance: 1000,
        maxDuration: 1,
        throwProps: true,
        onDrag: onCubeDrag,
        onPress: setPressed,
        zIndexBoost: false,
        //onDragEnd:onCubeDragEnd,
        onThrowUpdate: onCubeDrag,
        onThrowComplete: onThrowComplete,
        ease: Back.easeOut.config(0.3),
        snap: {
            x: function (endValue) {
                return Math.round(endValue / rotationStep) * rotationStep;
            }
        }

    })
}


function setPressed() {

    pressedElement = this.target;
}

function onSliderDrag() {

    onCubeDrag(true)
}

function onCubeDrag(isSlider) {

    var i = -1, destX, pagePos, destAlpha, destZIndex;

    let maxPercent = 300
    let tempIndex = 0
    let ceilIndex

    destX = nullObject._gsTransform.x % fullRotation;
    tempIndex = (Math.ceil(Math.abs(destX)) / 300 * 10) / 2
    ceilIndex = Math.ceil(tempIndex)
    ceilIndex = ceilIndex <= faceArray.length - 1 ? ceilIndex : 0
    if (ceilIndex !== currentIndex) {

        currentIndex = ceilIndex
        console.log(currentIndex + ': index')
        TweenMax.set(faceArray, {className: '-=--active'})
        TweenMax.set(thumbsArray, {className: '-=--active'})
        TweenMax.set(faceArray[currentIndex], {className: '+=--active'})
        TweenMax.set(thumbsArray[currentIndex], {className: '+=--active'})

    }
    while (++i < numFaces) {

        pagePos = (faceArray[i].initRotationY + nullObject._gsTransform.x) / 180;
        if (pagePos > 1) {

            pagePos = 2 - pagePos;
        }
        //if it's  < 0 start sending the value back up again 1, 0.9, 0.8, 0.7....0, 0.1, 0.2, 0.3, 0.4
        if (pagePos < 0) {

            pagePos = -pagePos;
        }


        destAlpha = 1 - pagePos;

        if (destAlpha < 0) {
            destAlpha = -destAlpha
        }


        if (destAlpha > 1) {

            destAlpha = 2 - destAlpha;
        }

        destZIndex = Math.round(destAlpha * fullRotation);


        TweenMax.set(faceArray[i], {

            rotationY: faceArray[i].initRotationY + destX,
            ease: Power1.easeOut,
            zIndex: destZIndex,
            alpha: destAlpha,
            force3D: true,
        })
    }


    // if (pressedElement.className !== 'dial') {
    //     return
    //     TweenMax.set(dial, {
    //         rotation: destX,
    //         onUpdate: setNumberRotation
    //     })
    //
    // }

}


function createSlider() {
    slider = document.createElement('div')
    var sliderContainer = document.createElement('div')
    var thumbsContainer = document.createElement('div')
    var sliderLine = document.createElement('div')

    sliderContainer.appendChild(sliderLine)
    sliderContainer.appendChild(slider)
    sliderLine.classList.add('shadow')

    TweenMax.set(sliderLine, {
            position: 'absolute',
            width: 'calc(100% - 10px)',
            // left: '5%',
            top: 12,
            margin: '0 5px',
            height: 4,
            background: '#cacaca',
            borderRadius: 4
        }
    )
    TweenMax.set(sliderContainer, {
        position: 'relative',
        left: '0%',
        // background: 'white',
        width: '50%',
        zIndex: 1000,
        margin: '0 auto',
        height: 30,
    });
    TweenMax.set(thumbsContainer, {
        position: 'relative',
        left: '0%',
        // background: 'white',
        width: '50%',
        zIndex: '100',
        margin: '0 auto',
        height: 60
    });
    TweenMax.set(slider, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 37,
        height: '37px',
        margin: '5px',
        zIndex: 1001,
        borderRadius: 5,
        backgroundColor: 'transparent',
        backgroundSize: 'cover',
        backgroundImage: 'url(static/ui/slider-arrow-down.png)'
    });
    for (let i = 0; i < faceArray.length; i++) {
        let thumbContainer = document.createElement('div')
        let thumb = document.createElement('div')
        let thumbTitle = document.createElement('p')

        thumbsContainer.classList.add('d-flex')
        TweenMax.set(thumbContainer, {margin: '3px', background: 'white'})
        thumbTitle.innerHTML = 'slide ' + i
        thumbTitle.style.color = 'white'

        thumbContainer.addEventListener('click', clickThumb, false)

        thumb.appendChild(thumbTitle)
        thumbsContainer.appendChild(thumbContainer)
        thumbContainer.appendChild(thumb)
        thumbsArray.push(thumbContainer)
    }
    // body.appendChild(sliderContainer);
    body.appendChild(thumbsContainer);
    var sliderDraggable = Draggable.create(slider, {
        type: 'x',
        bounds: {minX: 0, maxX: sliderContainer.clientWidth},
        onDrag: function (options, opts) {
            console.log(options)
            console.log(opts)
            var dragPercent = getDragPercent(this.x)
            if (dragPercent < 1) {

            }
            // if (sliderDragPercent )
            TweenMax.set(nullObject, {
                x: -dragPercent,
                onUpdate: onSliderDrag()
            });
            // TweenMax.to(slider, {x: dragPercent, onUpdate: onCubeDrag})


        }
    })
}

function getDragPercent(x) {
    return ((x) / (320)) * 100;
}

function clickThumb(e) {
    let index = [...this.parentElement.childNodes].indexOf(this);
    console.log(index + ' thumb clicked');
    let dragPercent = parseInt(-(index * this.getBoundingClientRect().width) / 255 * 100, 10);
    // let thumbLeft = this.getBoundingClientRect().left;
    // let thumbWidth = this.getBoundingClientRect().width;
    // let thumbCont = this.parentElement.getBoundingClientRect().left;
    [...this.parentElement.childNodes].forEach((e) => e.classList.remove('--active'))
    // this.classList.add('--active')
    // console.log(thumbLeft + ': TL, ' + thumbWidth + ': TW, ' + thumbCont + ': TC')
    console.log(getClickDuration(index))
    console.log(paginationIndex + ': PI, ' + index + ': I')
    TweenMax.to(nullObject, (getClickDuration(index) || index) * 0.4, {
        x: dragPercent,
        onUpdate: onSliderDrag
    });
    paginationIndex = index
}

function getClickDuration(index){
    if (index === paginationIndex) return 0
    return index < paginationIndex ? paginationIndex - index : index - paginationIndex
}

function onThrowComplete() {


    //in order to determine which item is at the front we calculate that based on the container's current rotationY divided by the rotationStep
    var itemId = -Math.round(nullObject._gsTransform.x / rotationStep);
    //if we've spun it in a negative rotationY (like -213) then normalise it up to a positive value
    itemId = (itemId < 0) ? (itemId % numFaces) + numFaces : itemId;
    //if we've spun it and it lands at a value like 356 the itemId would be rounded up to 6 (but the pageContainerArray only contains items from 0-5)
    //so we normalise it down
    itemId = (itemId > (numFaces - 1)) ? itemId % numFaces : itemId;

    currentFace = faceArray[itemId];


    var posX = Math.round(Math.abs(nullObject._gsTransform.x));

    if (posX >= fullRotation) {
        TweenMax.set(nullObject, {
            x: fullRotation - (itemId * rotationStep),
            onUpdate: onCubeDrag
        });


    }

    //setCubeDraggable(itemId);


}


function getZOrigin() {

    var faceZOrigin = Math.round((faceWidth / 2) / Math.tan(DegreesToRadians((rotationStep / 2))));
    //sideC = sideA / Math.sin(DegreesToRadians(angleA))

    return faceZOrigin;

}

function RadiansToDegrees(valRad) {
    return (fullRotation / (2 * Math.PI) * valRad)
}

function DegreesToRadians(valDeg) {
    return ((2 * Math.PI) / fullRotation * valDeg)
}

function getPerspective() {

    //calculation for the perspective if none is supplied
    return (rotationStep / fullRotation) * 7000;
    return 1200;
}

function toInt(str) {

    //convery 213px to 213
    return parseInt(str, 10);
}

// function createDialGraphics() {
//     dialContainer = document.createElement('div');
//     dialGraphic = document.createElement('div');
//     dialGraphic.className = 'dial-graphic';
//
//     TweenMax.set(dialContainer, {
//         width: dialWidth,
//         height: dialHeight,
//         position: 'relative',
//         left: '50%'
//     })
//     TweenMax.set(dialGraphic, {
//         position: 'absolute',
//         // left: '50%',
//         // top: '100%',
//         xPercent: -50,
//         width: '100%',
//         height: '100%',
//         overflow: 'hidden',
//         backgroundPosition: 'center',
//         // backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/greenDial.png)',
//         backgroundImage: 'url(/static/ui/iris2.png)',
//         backgroundSize:'cover',
//
//         zIndex: 1999
//     });
//     dialContainer.appendChild(dialGraphic);
//
//     body.appendChild(dialContainer)
//
// }

// function createDial() {
//
//     dial = document.createElement('div');
//     dial.className = 'dial';
//
//     TweenMax.set(dial, {
//         position: 'absolute',
//         // left: '50%',
//         // top: '100%',
//         xPercent: -50,
//         width: '100%',
//         height: '100%',
//         backgroundColor: 'rgba(0,0,0,0)',
//         zIndex: 2000,
//         z: -0
//
//     });
//
//     var dialNumContainer, dialNum;
//
//     for (var i = 0; i < numFaces; i++) {
//
//         dialNumContainer = document.createElement('div');
//         dialNum = document.createElement('div');
//         dialNum.className = 'dial-number';
//         dialNum.innerHTML = i;
//         TweenMax.set(dialNumContainer, {
//             position: 'absolute',
//             x: (dialWidth / 2) - (20 / 2),
//             y: 30,
//
//             width: 20,
//             height: 20,
//             rotation: rotationStep * i,
//             textAlign: 'center',
//             transformOrigin: '50% 120px'
//         });
//
//         TweenMax.set(dialNum, {
//             position: 'absolute',
//             width: 20,
//             height: 20,
//             fontSize: 20,
//             textAlign: 'center',
//             color: 'white',
//             fontFamily: 'Arial, Helvetica, sans-serif',
//         });
//
//         dialNum.initRotation = rotationStep * i;
//         dialNumContainer.appendChild(dialNum);
//         dial.appendChild(dialNumContainer);
//
//     }
//
//     dialContainer.appendChild(dial);
//
//     setNumberRotation();
//
// }
// function setDialDraggable() {
//
//     myDialDraggable = Draggable.create(dial, {
//         type: 'rotation',
//         dragResistance: 0.4,
//         maxDuration: 1,
//         throwResistance: 0,
//         throwProps: true,
//         onDrag: onDialDrag,
//         onPress: setPressed,
//         onThrowUpdate: onDialDrag,
//         onThrowComplete: onThrowComplete,
//         ease: Back.easeOut.config(0.3),
//         snap: function (endValue) {
//
//             return Math.round(endValue / rotationStep) * rotationStep;
//         }
//     })
//
// }
// function onDialDragEnd() {
//
//
//     //in order to determine which item is at the front we calculate that based on the container's current rotationY divided by the rotationStep
//     var itemId = -Math.round(nullObject._gsTransform.x / rotationStep);
//
//     var dir = (itemId < 0) ? -1 : 1;
//
//     //if we've spun it in a negative rotationY (like -213) then normalise it up to a positive value
//     itemId = (itemId < 0) ? (itemId % numFaces) + numFaces : itemId;
//     //if we've spun it and it lands at a value like 356 the itemId would be rounded up to 6 (but the pageContainerArray only contains items from 0-5)
//     //so we normalise it down
//     itemId = (itemId > (numFaces - 1)) ? itemId % numFaces : itemId;
//
//
//     TweenMax.to(nullObject, 1, {
//         x: (dir == -1) ? fullRotation - (itemId * rotationStep) : (-itemId * rotationStep),
//         onUpdate: onCubeDrag,
//         onComplete: onThrowComplete
//     })
//
//
// }

// function onDialDrag() {
//
//     dial._gsTransform.rotation = dial._gsTransform.rotation % fullRotation;
//     TweenMax.set(nullObject, {
//         x: dial._gsTransform.rotation,
//         onUpdate: onCubeDrag
//     });
//     TweenMax.set(dialGraphic, {rotation: dial._gsTransform.rotation % fullRotation})
//
//     setNumberRotation();
//
//
// }
//
// function setNumberRotation() {
//
//     var i = document.getElementsByClassName('dial-number').length, currNum;
//     while (--i > -1) {
//
//         currNum = document.getElementsByClassName('dial-number')[i];
//         TweenMax.set(currNum, {
//             rotation: -dial._gsTransform.rotation - currNum.initRotation
//         })
//     }
//
//
// }
// function createPerspectiveSlider() {
//     return
//     var sliderHolder = document.createElement('div');
//     var sliderLabel = document.createElement('p');
//     sliderLabel.innerHTML = 'Drag to change perspective'
//
//     TweenMax.set(sliderHolder, {
//         position: 'absolute',
//         left: '50%',
//         //top:'100%',
//         y: 400,
//         xPercent: -50,
//         yPercent: -150,
//         //x:300,
//         //y:760,
//         width: 400,
//         height: 60,
//         backgroundColor: 'rgba(118,146,57, 1)',
//         borderRadius: 50
//     })
//     TweenMax.set(sliderLabel, {
//         position: 'absolute',
//         x: 0,
//         y: 0,
//         width: 400,
//         height: 20,
//         textAlign: 'center',
//         fontSize: 20,
//         fontWeight: 100,
//         color: 'white',
//         fontFamily: 'Arial, Helvetica, sans-serif'
//     })
//
//
//     var sliderDragger = document.createElement('div');
//     TweenMax.set(sliderDragger, {
//         position: 'absolute',
//         x: 10,
//         y: 10,
//         width: 40,
//         height: 40,
//         backgroundColor: 'rgba(56,56,57, 1)',
//         borderRadius: '50%'//,
//         //border:'1px solid #46474A'
//     });
//
//     sliderHolder.appendChild(sliderLabel)
//     sliderHolder.appendChild(sliderDragger)
//     body.appendChild(sliderHolder);
//
//     Draggable.create(sliderDragger, {
//         type: 'x',
//         bounds: {minX: 10, maxX: (400 - 10) - sliderDragger.clientWidth},
//         onDrag: function () {
//             var dragPercent = ((this.x - 10) / (340)) * 100;
//
//             TweenMax.to(faceArray, 1, {
//                 transformPerspective: (dragPercent !== 0) ? dragPercent * dynamicPerspective : dynamicPerspective
//             })
//
//
//         }
//     })
//
// }

/*This demo uses GreenSock's ThrowPropsPlugin to achieve the momentum-based spin animation.

ThrowPropsPlugin is a bonus plugin for Club GreenSock members.

You can find out more about the benefits of becoming a Club GreenSock member here: https://www.greensock.com/club
*/