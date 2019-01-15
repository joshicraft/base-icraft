//code from Chris Gannon
//http://gannon.tv/

//learn how this was built https://greensock.com/cube-dial-tutorial

var body, stageWidth, stageHeight, isDevice, interactionUp, interactionDown, interactionOut,
    interactionOver, interactionMove, nullObject, container, isAndroid, fullRotation, rotationStep, dialWidth,
    dialHeight, faceZOrigin, dynamicPerspective;

var numFaces, faceWidth, faceHeight, faceArray = [], thumbsArray = [], currentIndex, paginationIndex, pressedElement,
    currentFace, initialFace, myCubeDraggable;

const ASPECT_WIDTH = 1280, ASPECT_HEIGHT = 768;

export default {
    resizeDelay(){
      updateDimensions()
    },
    resize() {
        if (this.resizeDelay) clearTimeout(this.resizeDelay);
        this.resizeDelay = setTimeout(updateDimensions, 200)
    },
    click(i) {
        if (i === 'next') i = currentIndex === faceArray.length - 1 ? 0 : currentIndex + 1;
        if (i === 'prev') i = currentIndex === 0 ? faceArray.length - 1 : currentIndex - 1;
        clickThumb(i)
    },
    getCurrentIndex() {
        console.log('CT: ' + currentIndex);
        return currentIndex
    },
    init(target, content) {

        //reference to the stage
        faceArray = [];
        thumbsArray = [];
        body = document.querySelector(target);
        nullObject = body.querySelector('.null-object');
        container = body.querySelector('.boxes');

        setStageWidth();
        // stageHeight = 700;

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

        numFaces = content ? content.length : 6;
        initialFace = 0;
        fullRotation = 360;

        dialWidth = 300;
        dialHeight = 300;
        updateDimensions();
        faceZOrigin = getZOrigin();
        dynamicPerspective = getPerspective();
        createFaces();
        setCubeDraggable(initialFace);
        onCubeDrag()
    }
}

function createFaces() {
    let face;
    for (var i = 0; i < numFaces; i++) {
        face = container.childNodes[i];
        face.initRotationX = 0;
        face.initRotationY = i * rotationStep;
        faceArray.push(face);
        thumbsArray.push(body.querySelector('.thumbs').childNodes[i])
    }
    updateFaces()
}

function updateFaces(){
    faceArray.forEach((face, i)=>{
        TweenMax.set(face, {
            width: faceWidth,
            height: faceHeight,
            xPercent: -50,
            yPercent: -0,
            zIndex: -i,
            transformPerspective: dynamicPerspective,
            transformOrigin: '50% 50% ' + -faceZOrigin + 'px',
            rotationY: i * rotationStep,
            z: -0
        });
    })
}
function updateDimensions() {

    if (stageWidth > window.innerWidth) {
        stageWidth = window.innerWidth / 1.25;
    }

    updateAspectRation();
    rotationStep = fullRotation / numFaces;
    faceWidth = stageWidth;
    faceHeight = stageHeight / 1.1;
}

function setStageWidth(){
    stageWidth = window.innerWidth < 1440 ? window.innerWidth * 0.8 : 1280;
}

function updateAspectRation() {
    stageHeight = (ASPECT_HEIGHT / ASPECT_WIDTH) * stageWidth
}

function setCubeDraggable(id) {


    myCubeDraggable = Draggable.create(nullObject, {
        type: 'x',
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
        onDragEnd: function () {
            myCubeDraggable[0].enable();
        },
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

function onCubeDrag() {

    var i = -1, destX, pagePos, destAlpha, destZIndex;

    let maxPercent = 300;
    let tempIndex = 0;
    let ceilIndex;

    destX = nullObject._gsTransform.x % fullRotation;
    console.log(destX);
    tempIndex = (Math.ceil(Math.abs(destX)) / 300 * 10) / 2;
    ceilIndex = Math.ceil(tempIndex);
    ceilIndex = ceilIndex <= faceArray.length - 1 ? ceilIndex : 0;
    if (ceilIndex !== currentIndex) {

        currentIndex = ceilIndex;
        console.log(currentIndex + ': index');
        TweenMax.set(faceArray, {className: '-=--active'});
        TweenMax.set(thumbsArray, {className: '-=--active'});
        TweenMax.set(faceArray[currentIndex], {className: '+=--active'});
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
}


function clickThumb(index) {
    let dragPercent = parseInt(-(index / faceArray.length) * 360, 10);
    console.log(index + ' thumb clicked, ' + dragPercent + ': distance');
    TweenMax.to(nullObject, (getClickDuration(index) || index) * 0.4, {
        x: dragPercent,
        onUpdate: onCubeDrag
    });
    paginationIndex = index
}

function getClickDuration(index) {
    if (index === paginationIndex) return 0;
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
    return (rotationStep / fullRotation) * 9000;
    // return 1200;
}

function toInt(str) {

    //convery 213px to 213
    return parseInt(str, 10);
}


/*This demo uses GreenSock's ThrowPropsPlugin to achieve the momentum-based spin animation.

ThrowPropsPlugin is a bonus plugin for Club GreenSock members.

You can find out more about the benefits of becoming a Club GreenSock member here: https://www.greensock.com/club
*/