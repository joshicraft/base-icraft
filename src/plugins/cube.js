//code from Chris Gannon
//http://gannon.tv/

//learn how this was built https://greensock.com/cube-dial-tutorial


export default {
    body: null,
    stage: null,
    stageWidth: null,
    stageHeight: null,
    stageParent: null,
    rotationStep: null,
    dynamicPerspective: null,
    fullRotation: null,
    faceZOrigin: null,
    dialWidth: null,
    dialHeight: null,
    nullObject: null,
    container: null,
    dial: null,
    isDevice: null,
    interactionUp: null,
    interactionDown: null,
    interactionOut: null,
    interactionOver: null,
    interactionMove: null,
    numFaces: null,
    faceWidth: null,
    faceHeight: null,
    faceArray: [],
    pressedElement: null,
    currentFace: null,
    myDialDraggable: null,
    initialFace: null,
    createDialGraphics() {

        let dialGraphic = document.createElement('div');
        dialGraphic.className = 'dial-graphic';

        TweenMax.set(dialGraphic, {
            position: 'absolute',
            left: '50%',
            top: '100%',
            xPercent: -50,
            width: this.dialWidth,
            height: this.dialHeight,
            overflow: 'hidden',
            backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/greenDial.png)',
            zIndex: 1999
        });


        this.body.appendChild(dialGraphic);

    },
    createDial() {

        this.dial = document.createElement('div');
        this.dial.className = 'dial';

        TweenMax.set(this.dial, {
            position: 'absolute',
            left: '50%',
            top: '100%',
            xPercent: -50,
            width: this.dialWidth,
            height: this.dialHeight,
            backgroundColor: 'rgba(0,0,0,0)',
            zIndex: 2000,
            z: -0

        });

        var dialNumContainer, dialNum;

        for (var i = 0; i < this.numFaces; i++) {

            dialNumContainer = document.createElement('div');
            dialNum = document.createElement('div');
            dialNum.className = 'dial-number';
            dialNum.innerHTML = i;
            TweenMax.set(dialNumContainer, {
                position: 'absolute',
                x: (this.dialWidth / 2) - (20 / 2),
                y: 30,

                width: 20,
                height: 20,
                rotation: this.rotationStep * i,
                textAlign: 'center',
                transformOrigin: '50% 120px'
            });

            TweenMax.set(dialNum, {
                position: 'absolute',
                width: 20,
                height: 20,
                fontSize: 20,
                textAlign: 'center',
                color: 'white',
                fontFamily: 'Arial, Helvetica, sans-serif',
            });

            dialNum.initRotation = this.rotationStep * i;
            dialNumContainer.appendChild(dialNum);
            this.dial.appendChild(dialNumContainer);

        }

        this.body.appendChild(this.dial);

        this.setNumberRotation();

    },
    createFaces() {

        var face, faceText;

        for (var i = 0; i < this.numFaces; i++) {

            face = document.createElement('div');
            faceText = document.createElement('h1');
            face.className = 'face';
            TweenMax.set(face, {
                //x:this.stageWidth/2 - (this.faceWidth/2),
                left: '50%',
                top: '40%',
                //y:50,
                xPercent: -50,
                yPercent: -0,
                position: 'absolute',
                width: this.faceWidth,
                height: this.faceHeight,
                overflow: 'hidden',
                zIndex: -i, transformPerspective: this.dynamicPerspective,
                transformOrigin: '50% 50% ' + -this.faceZOrigin + 'px',
                backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/greenBox.png)',
                rotationY: i * this.rotationStep,
                z: -0

            });

            face.initRotationX = 0;
            face.initRotationY = i * this.rotationStep;

            this.faceArray.push(face);

            face.appendChild(faceText)
            this.container.appendChild(face);
            // $(".face h1").eq(0).text("Swipe Me")
        }

    },
    setDialDraggable() {

        this.myDialDraggable = Draggable.create(this.dial, {
            type: 'rotation',
            dragResistance: 0.4,
            maxDuration: 1,
            throwResistance: 0,
            throwProps: true,
            onDrag: this.onDialDrag,
            onPress: this.setPressed,
            onThrowUpdate: this.onDialDrag,
            onThrowComplete: this.onThrowComplete,
            ease: Back.easeOut.config(0.3),
            snap: function (endValue) {

                return Math.round(endValue / this.rotationStep) * this.rotationStep;
            }
        })

    },
    setCubeDraggable(id) {

        let myCubeDraggable = null;

        myCubeDraggable = Draggable.create(this.nullObject, {
            type: 'x, y',
            lockAxis: true,
            //trigger:this.faceArray[id],
            trigger: this.container,
            dragResistance: 0.97,
            throwResistance: 1000,
            maxDuration: 1,
            throwProps: true,
            onDrag: this.onCubeDrag,
            onPress: this.setPressed,
            zIndexBoost: false,
            //onDragEnd:onCubeDragEnd,
            onThrowUpdate: this.onCubeDrag,
            onThrowComplete: this.onThrowComplete,
            ease: Back.easeOut.config(0.3),
            snap: {
                x: function (endValue) {
                    return Math.round(endValue / this.rotationStep) * this.rotationStep;
                }
            }

        })
    },
    onDialDragEnd() {


        //in order to determine which item is at the front we calculate that based on the container's current rotationY divided by the this.rotationStep
        var itemId = -Math.round(this.nullObject._gsTransform.x / this.rotationStep);

        var dir = (itemId < 0) ? -1 : 1;

        //if we've spun it in a negative rotationY (like -213) then normalise it up to a positive value
        itemId = (itemId < 0) ? (itemId % this.numFaces) + this.numFaces : itemId;
        //if we've spun it and it lands at a value like 356 the itemId would be rounded up to 6 (but the pageContainerArray only contains items from 0-5)
        //so we normalise it down
        itemId = (itemId > (this.numFaces - 1)) ? itemId % this.numFaces : itemId;


        TweenMax.to(this.nullObject, 1, {
            x: (dir == -1) ? this.fullRotation - (itemId * this.rotationStep) : (-itemId * this.rotationStep),
            onUpdate: this.onCubeDrag,
            onComplete: this.onThrowComplete
        })


    }, onDialDrag() {

        this.dial._gsTransform.rotation = this.dial._gsTransform.rotation % this.fullRotation;
        TweenMax.set(this.nullObject, {
            x: this.dial._gsTransform.rotation,
            onUpdate: this.onCubeDrag
        });

        this.setNumberRotation();


    },
    setNumberRotation() {

        var i = document.getElementsByClassName('dial-number').length, currNum;
        while (--i > -1) {

            currNum = document.getElementsByClassName('dial-number')[i];
            TweenMax.set(currNum, {
                rotation: -this.dial._gsTransform.rotation - currNum.initRotation
            })
        }


    },
    setPressed() {

        this.pressedElement = this.target;
    },
    onCubeDrag() {

        var i = -1, destX, pagePos, destAlpha, destZIndex;

        destX = this.nullObject._gsTransform.x % this.fullRotation;

        while (++i < this.numFaces) {

            pagePos = (this.faceArray[i].initRotationY + this.nullObject._gsTransform.x) / 180;
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
            destZIndex = Math.round(destAlpha * this.fullRotation);

            TweenMax.set(this.faceArray[i], {

                rotationY: this.faceArray[i].initRotationY + destX,
                ease: Power1.easeOut,
                zIndex: destZIndex,
                alpha: destAlpha,
                force3D: true,
            })
        }


        if (this.pressedElement.className !== 'dial') {

            TweenMax.set(this.dial, {
                rotation: destX,
                onUpdate: this.setNumberRotation
            })

        }

    },
    createPerspectiveSlider() {

        // var sliderHolder = document.createElement('div');
        // var sliderLabel = document.createElement('p');
        // sliderLabel.innerHTML = 'Drag to change perspective'
        //
        // TweenMax.set(sliderHolder, {
        //     position:'absolute',
        //     left:'50%',
        //     //top:'100%',
        //     y:400,
        //     xPercent:-50,
        //     yPercent:-150,
        //     //x:300,
        //     //y:760,
        //     width:400,
        //     height:60,
        //     backgroundColor:'rgba(118,146,57, 1)',
        //     borderRadius:50
        // })
        // TweenMax.set(sliderLabel, {
        //     position:'absolute',
        //     x:0,
        //     y:0,
        //     width:400,
        //     height:20,
        //     textAlign:'center',
        //     fontSize:20,
        //     fontWeight:100,
        //     color:'white',
        //     fontFamily:'Arial, Helvetica, sans-serif'
        // })
        //
        //
        // var sliderDragger = document.createElement('div');
        // TweenMax.set(sliderDragger, {
        //     position:'absolute',
        //     x:10,
        //     y:10,
        //     width:40,
        //     height:40,
        //     backgroundColor:'rgba(56,56,57, 1)',
        //     borderRadius:'50%'//,
        //     //border:'1px solid #46474A'
        // });
        //
        // sliderHolder.appendChild(sliderLabel)
        // sliderHolder.appendChild(sliderDragger)
        // this.body.appendChild(sliderHolder);
        //
        // Draggable.create(sliderDragger, {
        //     type:'x',
        //     bounds:{minX:10, maxX:(400-10) - sliderDragger.clientWidth},
        //     onDrag:function(){
        //         var dragPercent = ((this.x - 10)/(340 )) * 100;
        //
        //         TweenMax.to(this.faceArray, 1, {
        //             transformPerspective:(dragPercent !==0) ? dragPercent * this.dynamicPerspective : this.dynamicPerspective
        //         })
        //
        //
        //     }
        // })

    },
    onThrowComplete() {


        //in order to determine which item is at the front we calculate that based on the container's current rotationY divided by the this.rotationStep
        var itemId = -Math.round(this.nullObject._gsTransform.x / this.rotationStep);
        //if we've spun it in a negative rotationY (like -213) then normalise it up to a positive value
        itemId = (itemId < 0) ? (itemId % this.numFaces) + this.numFaces : itemId;
        //if we've spun it and it lands at a value like 356 the itemId would be rounded up to 6 (but the pageContainerArray only contains items from 0-5)
        //so we normalise it down
        itemId = (itemId > (this.numFaces - 1)) ? itemId % this.numFaces : itemId;

        this.currentFace = this.faceArray[itemId];


        var posX = Math.round(Math.abs(this.nullObject._gsTransform.x));

        if (posX >= this.fullRotation) {
            TweenMax.set(this.nullObject, {
                x: this.fullRotation - (itemId * this.rotationStep),
                onUpdate: onCubeDrag
            });


        }

        //setCubeDraggable(itemId);


    },
    getZOrigin() {

        this.faceZOrigin = Math.round((this.faceWidth / 2) / Math.tan(this.DegreesToRadians((this.rotationStep / 2))));
        //sideC = sideA / Math.sin(DegreesToRadians(angleA))

        return this.faceZOrigin;

    },
    RadiansToDegrees(valRad) {
        return (this.fullRotation / (2 * Math.PI) * valRad)
    },
    DegreesToRadians(valDeg) {
        return ((2 * Math.PI) / this.fullRotation * valDeg)
    },
    getPerspective() {

        //calculation for the perspective if none is supplied
        return (this.rotationStep / this.fullRotation) * 2500;
    },

    toInt(str) {

        //convery 213px to 213
        return parseInt(str, 10);
    },

    init(target) {

        //reference to the stage
        this.body = document.querySelector(target || '#cube');
        this.nullObject = document.createElement('div');
        this.nullObject.className = 'null-object';
        this.container = document.createElement('div');
        this.container.className = 'container';
        this.body.appendChild(this.container);

        TweenMax.set(this.container, {

            width: '100%',
            height: '100%'
            // z:-400,
            // zIndex:-100

        });


        this.stageWidth = 1024;
        this.stageHeight = 768;

        this.isDevice = (/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent.toLowerCase()));
        let isAndroid = (/android/i.test(navigator.userAgent.toLowerCase()));

        if (this.isDevice) {

            this.interactionUp = "touchend";
            this.interactionDown = "touchstart";
            this.interactionOut = this.interactionUp;
            this.interactionOver = this.interactionDown;
            this.interactionMove = 'touchmove';

        } else {

            this.interactionUp = "mouseup";
            this.interactionDown = "mousedown";
            this.interactionOut = "mouseout";
            this.interactionOver = "mouseover";
            this.interactionMove = 'mousemove';

        }


        this.numFaces = this.numFaces || 6;
        this.initialFace = this.initialFace || 0;
        this.fullRotation = 360;
        this.rotationStep = this.fullRotation / this.numFaces;
        this.faceWidth = 1024;
        this.faceHeight = 576;
        this.dialWidth = 300;
        this.dialHeight = 300;
        this.faceZOrigin = this.getZOrigin();
        this.dynamicPerspective = this.getPerspective();
        //console.log(this.dynamicPerspective)

        TweenMax.set(this.body, {
            width: '100%',
            // y:400,
            backgroundColor: 'black',
            overflow: 'hidden'
        });

        TweenMax.set(this.nullObject, {
            position: 'absolute',
            x: 0
        })

        this.body.appendChild(this.nullObject);
        this.createFaces();
        this.createDialGraphics();
        this.createDial();
        this.setCubeDraggable(this.initialFace);
        this.setDialDraggable();
        this.createPerspectiveSlider();
    }
}


/*This demo uses GreenSock's ThrowPropsPlugin to achieve the momentum-based spin animation.

ThrowPropsPlugin is a bonus plugin for Club GreenSock members.

You can find out more about the benefits of becoming a Club GreenSock member here: https://www.greensock.com/club
*/