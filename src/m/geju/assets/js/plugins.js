// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () {
    };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
/**
 * 移动端rem单位适配
 * @param width 屏幕宽度
 * @param size  字体大小
 * @param max   最大比率
 */
function flexible(width, size, max) {
    //var docBody = document.body || document.documentElement;
    this.setSize = function () {
        var ratio = size / width;
        var w = window.innerWidth;
        var newRatio = w * ratio;
        if (max && newRatio > max) {
            newRatio = max;
        }
        document.documentElement.style.fontSize = newRatio + 'px';
    };
    this.setSize();
}

function ImgBroke(options) {
    var conId = options.conId,
        urls = options.urls,
        loop = options.loop || false,
        onShatterEnd = options.onShatterEnd,
        imageWidth = options.imageWidth,
        imageHeight = options.imageHeight;

    const TWO_PI = Math.PI * 2;
    var images = document.querySelectorAll('#' + conId + ' > img'), imageIndex = 0;
    var image = images[0];
    var vertices = [], indices = [], fragments = [];
    var container = document.getElementById(conId);
    var clickPosition = [
        imageWidth * 0.5,
        imageHeight * 0.5
    ];


    function init() {
        TweenMax.set(container, {perspective: 500});
        var image, loaded = 0;
        image = images[0];
        image.onload = function () {
            if (++loaded === 1) {
                imagesLoaded();
                for (var i = 1; i < images.length; i++) {
                    if (window.CP.shouldStopExecution(1)) {
                        break;
                    }
                    image = images[i];
                    // image.src = urls[i];
                }
                imageIndex = images.length - 1;
                window.CP.exitedLoop(1);
            }
        };
    };
    function imagesLoaded() {
        if (placeImage(false)) triangulate();
    }

    function placeImage(transitionIn) {
        image = images[imageIndex];
        if (++imageIndex === images.length && loop)
            imageIndex = 0;
        image.addEventListener('click', imageClickHandler);
        container.appendChild(image);
        if (transitionIn !== false) {
            TweenMax.fromTo(image, 0.75, {y: -1000}, {
                y: 0,
                ease: Elastic.easeOut
            });
        }
        return true;
    }

    function imageClickHandler(event) {
        var box = image.getBoundingClientRect(), top = box.top, left = box.left;
        clickPosition[0] = event.clientX - left;
        clickPosition[1] = event.clientY - top;
        triangulate();
        shatter();
    }

    function triangulate() {
        var rings = [
            {
                r: 50,
                c: 12
            },
            {
                r: 150,
                c: 12
            },
            {
                r: 300,
                c: 12
            },
            {
                r: 1200,
                c: 12
            }
        ], x, y, centerX = clickPosition[0], centerY = clickPosition[1];
        vertices.push([
            centerX,
            centerY
        ]);
        rings.forEach(function (ring) {
            var radius = ring.r, count = ring.c, variance = radius * 0.25;
            for (var i = 0; i < count; i++) {
                if (window.CP.shouldStopExecution(2)) {
                    break;
                }
                x = Math.cos(i / count * TWO_PI) * radius + centerX + randomRange(-variance, variance);
                y = Math.sin(i / count * TWO_PI) * radius + centerY + randomRange(-variance, variance);
                vertices.push([
                    x,
                    y
                ]);
            }
            window.CP.exitedLoop(2);
        });
        vertices.forEach(function (v) {
            v[0] = clamp(v[0], 0, imageWidth);
            v[1] = clamp(v[1], 0, imageHeight);
        });
        indices = Delaunay.triangulate(vertices);
    }

    function shatter() {
        var p0, p1, p2, fragment;
        var tl0 = new TimelineMax({onComplete: shatterCompleteHandler});
        for (var i = 0; i < indices.length; i += 3) {
            if (window.CP.shouldStopExecution(3)) {
                break;
            }
            p0 = vertices[indices[i + 0]];
            p1 = vertices[indices[i + 1]];
            p2 = vertices[indices[i + 2]];
            fragment = new Fragment(p0, p1, p2);
            var dx = fragment.centroid[0] - clickPosition[0], dy = fragment.centroid[1] - clickPosition[1], d = Math.sqrt(dx * dx + dy * dy), rx = 300 * sign(dy), ry = 900 * -sign(dx), delay = d * 0.003 * randomRange(0.1, 0.25);
            fragment.canvas.style.zIndex = Math.floor(d).toString();
            var tl1 = new TimelineMax();
            tl1.to(fragment.canvas, randomRange(0.25, 1), {
                z: randomRange(-1500, 1500),
                rotationX: rx,
                rotationY: ry,
                x: randomRange(-2000, 2000),
                y: randomRange(-2000, 2000),
                ease: Expo.easeIn
            });
            tl1.to(fragment.canvas, 0.4, {alpha: 0}, 0.6);
            tl0.insert(tl1, delay);
            fragments.push(fragment);
            container.appendChild(fragment.canvas);
        }
        window.CP.exitedLoop(3);
        container.removeChild(image);
        image.removeEventListener('click', imageClickHandler);
    }

    function shatterCompleteHandler() {
        fragments.forEach(function (f) {
            container.removeChild(f.canvas);
        });
        fragments.length = 0;
        vertices.length = 0;
        indices.length = 0;
        if (loop || imageIndex < images.length - 1) {
            placeImage();
        }
        onShatterEnd();
    }

    function randomRange(min, max) {
        return min + (max - min) * Math.random();
    }

    function clamp(x, min, max) {
        return x < min ? min : x > max ? max : x;
    }

    function sign(x) {
        return x < 0 ? -1 : 1;
    }

    Fragment = function (v0, v1, v2) {
        this.v0 = v0;
        this.v1 = v1;
        this.v2 = v2;
        this.computeBoundingBox();
        this.computeCentroid();
        this.createCanvas();
        this.clip();
    };
    Fragment.prototype = {
        computeBoundingBox: function () {
            var xMin = Math.min(this.v0[0], this.v1[0], this.v2[0]), xMax = Math.max(this.v0[0], this.v1[0], this.v2[0]), yMin = Math.min(this.v0[1], this.v1[1], this.v2[1]), yMax = Math.max(this.v0[1], this.v1[1], this.v2[1]);
            this.box = {
                x: xMin,
                y: yMin,
                w: xMax - xMin,
                h: yMax - yMin
            };
        },
        computeCentroid: function () {
            var x = (this.v0[0] + this.v1[0] + this.v2[0]) / 3, y = (this.v0[1] + this.v1[1] + this.v2[1]) / 3;
            this.centroid = [
                x,
                y
            ];
        },
        createCanvas: function () {
            this.canvas = document.createElement('canvas');
            this.canvas.width = this.box.w;
            this.canvas.height = this.box.h;
            this.canvas.style.width = this.box.w + 'px';
            this.canvas.style.height = this.box.h + 'px';
            this.canvas.style.left = this.box.x + 'px';
            this.canvas.style.top = this.box.y + 'px';
            this.ctx = this.canvas.getContext('2d');
        },
        clip: function () {
            this.ctx.translate(-this.box.x, -this.box.y);
            this.ctx.beginPath();
            this.ctx.moveTo(this.v0[0], this.v0[1]);
            this.ctx.lineTo(this.v1[0], this.v1[1]);
            this.ctx.lineTo(this.v2[0], this.v2[1]);
            this.ctx.closePath();
            this.ctx.clip();
            this.ctx.drawImage(image, 0, 0);
        }
    };

    return {
        init: init,
        shatter: function () {
            image.click();
        }
    }
}
