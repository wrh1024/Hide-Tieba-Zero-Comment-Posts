// ==UserScript==
// @name         贴吧视频帖子屏蔽
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  屏蔽百度贴吧首页中的视频帖子
// @match        https://tieba.baidu.com/
// @exclude      https://tieba.baidu.com/home
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function hideVideoPosts() {
        document.querySelectorAll('.art-video').forEach(el => {
            const container = el.closest('.thread-container, .virtual-list-item, [data-index]');
            if (container) {
                container.style.display = 'none';
            }
        });
    }

    function init() {
        const intervals = [500, 1000, 2000, 3000, 5000, 8000];
        intervals.forEach(delay => {
            setTimeout(hideVideoPosts, delay);
        });

        let lastCheck = 0;
        const checkLoop = () => {
            if (Date.now() - lastCheck > 2000) {
                hideVideoPosts();
                lastCheck = Date.now();
            }
            requestAnimationFrame(checkLoop);
        };
        requestAnimationFrame(checkLoop);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
