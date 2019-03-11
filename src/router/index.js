/* eslint-disable no-undef */
/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

//     /** webpackPrefetch: false */


// Routes
import paths from './paths'

let routes = makeRoutes()


function route(path, parentPath) {
    let newPath = parentPath ? parentPath.path + '/' + path.path : path.path
    let dirPath = parentPath ? parentPath.name + '/' + path.name : path.name
    // console.log(newPath)
    return {
        path: newPath,
        name: path.name,
        nested: path.nestedItems,
        props: parentPath ? {nestedPath: dirPath} : {},
        component: (resovle) => import(
            /* webpackPreload: true */
            `@/views/${dirPath}.vue`
            ).then(resovle)

    }
}

function makeRoutes(){
    let routes = paths.map((path)=>{
        return route(path)
    })
    let nestedRoutes = []
    paths.forEach((path)=>{
        if(path.nestedItems){
            path.nestedItems.forEach((nestedPath)=>{
                nestedRoutes.unshift(route(nestedPath, path))
            })
        }
    })
    routes = [...routes, ...nestedRoutes].concat([
        {path: '*', redirect: '/'}
    ])
    return routes
}

Vue.use(Router)

// Create a new router
const router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        if (to.hash) {
            return {selector: to.hash}
        }
        return {x: 0, y: 0}
    }
})

router.afterEach((to, from, next) => {


})
router.beforeEach((to, from, next) => {
    if (from.name === null) {
        next()
        return
    }
    TweenMax.killAll()

    setTimeout(() => {

        let jumbo = document.querySelector('#jumbotron')
        if (!jumbo) {
            next()
            return
        }
        let gradient = jumbo.querySelector('#jumbo-gradient')
        // let text = jumbo.querySelector('h1')
        let duration = 0.6
        let newSound
        let scrollPos = window.pageYOffset ||
            document.documentElement.scrollTop
        TweenMax.killAll()

            newSound = {
                data: new Audio('/static/sound/light_woosh.mp3')
            };
            newSound.data.volume = 1;


        newSound.data.play()
        let tL = new TimelineMax()
        console.log(to)
        let title = document.querySelector('#jumbotron .title')
        let text = title.querySelectorAll('#jumbotron .title .-text-anim')
        let button = title.querySelectorAll('#jumbotron .title button')
        let subText = title.querySelectorAll('#jumbotron .title p')
        var tl = new TimelineLite({delay: 0}),
            mySplitText = new SplitText(text, {type: "words,chars"}),
            chars = mySplitText.chars; //an array of all the divs that wrap each character
        TweenLite.set(text, {perspective: 400});

        tL
            .to(window, scrollPos === 0 ? 0 : 0.35, {scrollTo: {y: 0}}, 'a')
        .set(text, {opacity: 1}, 'a')

        .staggerTo(chars, 0.6, {
            opacity: 0,
            scale: 0,
            y: -60,
            rotationX: 180,
            transformOrigin: "0% 50% 50",
            ease: Back.easeIn
        }, 0.01, "+=0")
            .to([button], 0.5, {opacity: 0,
                scale: 0,
                y: -30,
                rotationX: 0,
                transformOrigin: "0% 50% 50",
                ease: Back.easeIn}, 'a')
            .call(next, [], this, '-=0.2')
            .to(gradient, duration, {autoAlpha: 0.82})
            .to(gradient, duration, {autoAlpha: 1})

    }, 1)
})

Vue.use(Meta)

export default router
