"use strict";
var animations = {
    draw_SVG: function(elm, settings) {
        settings = settings || {};
        return new TimelineMax(settings.controls || {}).set(elm.querySelectorAll('path, circle, rect, line'), {
            drawSVG: '0%',
            className: '+=stroke-' + (settings.stroke || 3)
        }).set(elm, {autoAlpha: 1})[settings.to || 'staggerTo'](elm.querySelectorAll('path, circle, rect, line'), settings.stagger_dur || 0.5, {drawSVG: '100%'}, settings.stagger || 0.1).set(elm.querySelectorAll('path, circle, rect, line'), {className: '-=stroke-' + (settings.stroke || 3)});
    },
    preview_product: function(elm, settings) {
        return new TimelineMax().call(media.sound.play, ['insider_product_preview-1', undefined, function(settings) {
            return;
            settings.id != current_scroll_trigger.in.id || (current_scroll_trigger.click_index != -1 && current_scroll_trigger.click_index != settings.index);
        }, settings], this, '+=0').set(elm.querySelectorAll('path, circle'), {
            drawSVG: '0%',
            className: '+=stroke-' + (settings.stroke || 3)
        }).set(elm, {autoAlpha: 1}).to(elm.querySelectorAll('path, circle'), 0.65, {drawSVG: '100%'}).set(elm.querySelectorAll('path, circle'), {className: '-=stroke-' + (settings.stroke || 3)}).call(media.play_video, [settings.trigger_elm.querySelectorAll('video')]).set(settings.trigger_elm, {className: '+=is-loaded'}, '-=0.375').to(settings.trigger_elm.querySelectorAll('hr'), 0.4, {
            scaleX: 1,
            transformOrigin: 'top right'
        }).call(media.sound.play, ['insider_product_preview', undefined, function(settings) {
            return settings.id != current_scroll_trigger.in.id;
        }, settings], this, '-=0.45');
    },
    wobble: function(elm, settings) {
        settings = settings || {};
        var defaults = {
                delay: 0,
                repeat: -1,
                repeatDelay: 3,
                modifier: 0.08,
                count: 3,
                dur: 0.07,
                startScale: 1,
                rotation: 0,
                properties: ['scale', 'ease']
            },
            tL,
            s;
        s = {...defaults, ...settings};
        s.xOffset = s.modifier / s.count;
        s.YOffset = s.modifier / s.count;
        s.xEnd = s.startScale - s.modifier;
        s.yEnd = s.startScale - s.modifier;
        s.xStart = s.startScale + s.modifier;
        s.yStart = s.startScale + s.modifier;
        tL = new TimelineMax({
            repeat: s.repeat,
            delay: s.delay,
            repeatDelay: s.repeatDelay
        });
        for (var i = 0; i < s.count; i++) {
            var dur = s.dur + (s.dur / (s.count - i));
            tL.add(TweenMax.to(elm, dur, {
                scale: s.startScale - (s.xOffset * (s.count - i - 1)),
                ease: Back.easeOut,
                transformOrigin: 'center center'
            }));
            tL.add(TweenMax.to(elm, dur, {
                scale: s.startScale + (s.xOffset * (s.count - i - 1)),
                ease: Back.easeOut,
                transformOrigin: 'center center'
            }));
        }
        if (s.rotation) {
            tL.add(TweenMax.to(elm, tL.duration(), {rotation: s.rotation}), '-=' + tL.duration());
        }
        return tL;
    },
    shake: function(elm, duration, position) {},
    rise_fade: function(elm, duration, position) {},
    show_hide: function(elm) {
        TweenMax.to(elm, 0.3, {
            className: (elm.hasClass('show') ? '-' : '+') + '=show',
            y: elm.hasClass('show') ? 0 : -elm.height()
        });
    },
    magnet: function($elm, settings, e) {
        var $magent_space = $elm.querySelectorAll('.magnet_space:first'),
            space_cords = get_offset($magent_space),
            magnet_cords = get_offset($elm),
            t_l = new TimelineMax(),
            bounds = get_offset($magent_space),
            vars = {},
            dur = 2.5,
            zero,
            defaults = {
                move_dur: 2.5,
                zero_dur: 3,
                mod: 3,
                stagger: 0.02,
                target: 'svg'
            },
            s = $.extend({}, defaults, settings);
        if (s.force) {
            vars.x = 0;
            vars.y = 0;
            vars.ease = Back.easeOut;
            dur = s.zero_dur;
        } else {
            dur = s.move_dur;
            vars.ease = Power1.easeOut;
            vars.x = ((settings.position.pageX - magnet_cords.left) - (magnet_cords.width / 2)) / s.mod;
            vars.y = ((settings.position.pageY - magnet_cords.top) - (magnet_cords.height / 2)) / s.mod;
        }
        t_l.staggerTo($elm.querySelectorAll(s.target).children(), dur, vars, s.stagger);
    },
    magnet_build: function($elm) {
        var $space = $('<div class="magnet_space">');
        $elm.addClass('magnet').append($space);
    },
    flip: function(elm, settings, out) {
        var dur = 1,
            tL = new TimelineMax().staggerTo(elm.querySelectorAll('path circle'), dur, {rotationY: out ? 0 : 180}, 'a').to(elm, dur / 2, {z: 50}, 'a').to(elm, dur / 2, {z: 0});
        return tL;
    },
    stagger_spin: function(elm, settings, out, data) {
        var $__2 = this;
        var dur = 1,
            $path_circle = elm.querySelectorAll('path, circle'),
            tL;
        settings = settings || {};
        tL = new TimelineMax(settings).set(elm.querySelectorAll('circle, path'), {
            strokeWidth: 0.5,
            stroke: '#fff',
            fill: 'transparent'
        }).staggerFromTo($path_circle, dur, {skewY: out ? 360 : 0}, {
            onStart: function(data) {
                media.sound.play('insider_swish-3', undefined, function(data) {
                    return data.timeline.reversed() || data.id != current_scroll_trigger.id;
                }, {
                    timeline: this,
                    scroll_id: data
                });
            },
            onStartParams: [data],
            skewY: out ? 0 : 360,
            transformOrigin: "50% 50%"
        }, dur / 6, 'a').call(function() {
            media.sound.play('insider_title_2', undefined, function(timeline) {
                return timeline.transition.reversed();
            }, $__2);
        }).to(elm.querySelectorAll('#outer-circle'), dur / 3, {
            fill: '#FFFFFF',
            strokeWidth: 1,
            stroke: 'transparent'
        }, 'b').to(elm.querySelectorAll('#inner-circle'), dur / 3, {
            strokeWidth: 1,
            fill: '#000',
            stroke: 'transparent'
        }, 'b').to(elm.querySelectorAll('#center-circle'), dur / 3, {
            strokeWidth: 1,
            fill: '#000',
            stroke: 'transparent'
        }, 'b').to(elm.querySelectorAll('#arrow-cross'), dur / 3, {
            fill: '#FFFFFF',
            stroke: 'transparent',
            strokeWidth: 1
        }, 'b');
        return tL;
    },
    bounce: function(elm, settings) {
        var defaults = {
                delay: 0,
                repeat: -1,
                repeatDelay: 7,
                dur: 0.1,
                mod: 10,
                count: 3,
                sound: 'insider_bounce',
                use_first: false
            },
            tL,
            s;
        s = $.extend({}, defaults, settings);
        tL = new TimelineMax(s);
        elm = s.use_child ? elm.querySelectorAll(s.use_child) : elm;
        for (var i = s.count; i > 0; i--) {
            tL.add(TweenMax.to(elm.parent(), i === s.count && !s.use_first ? 0.7 : (i) * s.dur, {
                transformOrigin: "50% 50%",
                y: i === s.count && !s.use_first ? 0 : -(s.mod * i),
                ease: i === s.count && !s.use_first ? Power1.easeIn : Circ.easeOut
            }), '-=0.08');
            if (s.sound) {
                tL.addCallback(media.sound.play, '+=0', [s.sound, undefined, undefined, undefined, i / s.count]);
            }
            tL.add(TweenMax.to(elm.parent(), (i) * (s.dur / 2), {
                transformOrigin: "50% 50%",
                y: 0,
                ease: Circ.easeIn
            }));
            tL.add(TweenMax.to(elm, (i) * (s.dur / 2.5), {
                transformOrigin: "50% 100%",
                scaleX: 1 + (i * (s.mod * 0.01)),
                scaleY: 1 - (i * (s.mod * 0.01)),
                yoyo: true,
                repeat: 1,
                ease: Power1.easeInOut
            }), '-=' + (i === s.count && !s.use_first ? 5 : (i)) * ((s.dur / 2.5) / 2));
        }
        return tL;
    },
    particle: function($elm, settings) {
        var tL = new TimelineMax(),
            wrapper = '.particles-wrapper',
            size = {
                width: $elm.outerWidth(),
                height: $elm.outerHeight()
            },
            defaults = {
                volume: animations.util.random(20, 40),
                type: 'explosion',
                loc: 'center',
                magnitude: 1,
                dur: animations.util.random(0.5, 1.5),
                size: 3,
                color: '#fff',
                gravity: false
            },
            s = $.extend({}, defaults, settings);
        if ($elm.children(wrapper).length < 1) {
            animations.particle_build($elm);
        }
        for (var i = 0; i < s.volume; i++) {
            var $particle = $('<div class="particle">'),
                d = {
                    y_start: size.height / 2,
                    y_end: animations.util.random(-size.height * s.magnitude, size.height * s.magnitude),
                    x_start: size.width / 2,
                    x_end: animations.util.random(-size.width * s.magnitude, size.width * s.magnitude)
                },
                label = s.type === 'explosion' ? 'a' : '-=' + (s.dur / 2);
            $elm.children(wrapper + ':first').append($particle);
            tL.add(TweenMax.set($particle, {
                className: '+=p-' + s.loc,
                width: s.size,
                height: s.size,
                backgroundColor: s.color === 'random' ? animations.util.random_color() : s.color
            }), label);
            tL.add(TweenMax.to($particle, s.dur, {
                x: d.x_end,
                y: d.y_end,
                ease: s.gravity ? Quint.easeInOut : Quint.easeOut,
                autoAlpha: 0,
                onComplete: function(e) {
                    $(this.target).remove();
                }
            }), label);
        }
        return tL;
    },
    particle_build: function($elm) {
        var $space = $('<div class="particles-wrapper">');
        $elm.append($space);
    },
    break_icon: function($elm, settings) {
        var $pieces_wrapper = $elm.querySelectorAll('.icon-pieces'),
            $pieces = $pieces_wrapper.querySelectorAll('.broken-icon-piece'),
            length = $pieces.length,
            tL,
            direction,
            defaults = {
                distance_mod: {
                    max: 1,
                    min: 1
                },
                z_mod: {
                    min: 1,
                    max: 1
                },
                scale_mod: 1
            },
            s = $.extend({}, defaults, settings);
        direction = {
            x: 0,
            y: 0,
            distance: {
                max: $pieces_wrapper.outerWidth() * s.distance_mod.max,
                min: ($pieces_wrapper.outerWidth() / 4) * s.distance_mod.max
            }
        };
        tL = new TimelineMax().call(media.sound.play, ['insider_break']).set($pieces_wrapper.siblings(), {autoAlpha: 0}).set($pieces_wrapper, {autoAlpha: 1}).set($pieces, {clearProps: 'all'});
        for (var i = 0; i < length; i++) {
            if (i <= length / 4) {
                direction.x = this.util.random(direction.distance.min, -direction.distance.max);
                direction.y = this.util.random(-direction.distance.max, direction.distance.min);
            } else if (i <= length / 2 && i > length / 4) {
                direction.x = this.util.random(direction.distance.min, -direction.distance.max);
                direction.y = this.util.random(direction.distance.min, direction.distance.max);
            } else if (i > length / 2 && i <= length - (length / 4)) {
                direction.x = this.util.random(direction.distance.min, direction.distance.max);
                direction.y = this.util.random(direction.distance.min, direction.distance.max);
            } else if (i > length - (length / 4)) {
                direction.x = this.util.random(direction.distance.min, direction.distance.max);
                direction.y = this.util.random(direction.distance.min, -direction.distance.max);
            }
            tL.add(TweenMax.to($pieces.eq(i), this.util.random(1.5, 3), {
                x: direction.x,
                y: direction.y,
                rotationY: this.util.random(-120, 120),
                z: this.util.random(0 * s.z_mod.min, 200 * s.z_mod.max),
                scale: this.util.random(0, 2 * s.scale_mod),
                opacity: 0,
                ease: Quint.easeOut,
                display: 'none',
                onCompleteParams: ['{self}'],
                onComplete: function(i) {
                    TweenMax.set(this.target, {display: 'none'});
                }
            }), 'a');
        }
    },
    util: {
        random: function(min, max) {
            return Math.random() * (max - min) + min;
        },
        random_color: function() {
            return "#" + ((1 << 24) * Math.random() | 0).toString(16);
        }
    },
    get: function(anim, elm, settings) {
        return this[anim](elm, settings);
    }
};

export default animations