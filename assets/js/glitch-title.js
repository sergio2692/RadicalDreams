document.addEventListener('DOMContentLoaded', function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var LATIN = 'ABCDEFGHKLNOPRSTUVXYZ0123456789/';
    var KANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン';
    var DURATION = 1300;
    var STAGGER = 450;
    var TICK = 45;

    document.querySelectorAll('.glitch-heading').forEach(function (el, index) {
        var chars = Array.from(el.dataset.text);
        var glyphs = /[^\x00-\x7F]/.test(el.dataset.text) ? KANA : LATIN;
        var start = null;
        var lastTick = 0;

        function scramble(revealed) {
            el.dataset.scramble = chars.map(function (ch, i) {
                if (ch === ' ' || i < revealed) return ch;
                return glyphs[Math.floor(Math.random() * glyphs.length)];
            }).join('');
        }

        scramble(0);
        el.classList.add('is-decoding');

        function frame(now) {
            if (start === null) start = now + index * STAGGER;
            var progress = Math.min(1, Math.max(0, (now - start) / DURATION));

            if (progress >= 1) {
                el.classList.remove('is-decoding');
                delete el.dataset.scramble;
                return;
            }

            if (now - lastTick >= TICK) {
                lastTick = now;
                scramble(Math.floor(progress * chars.length));
            }

            requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
    });
});
