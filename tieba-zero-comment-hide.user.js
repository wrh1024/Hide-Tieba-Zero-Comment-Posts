// ==UserScript==
// @name         贴吧零回复屏蔽
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  屏蔽百度贴吧首页评论数为零的帖子及视频帖子（多为广告）
// @match        https://tieba.baidu.com/
// @exclude      https://tieba.baidu.com/home
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function hidePosts() {
        document.querySelectorAll('.thread-container, .virtual-list-item, .thread-card, [data-index]').forEach(container => {
            // 屏蔽零回复帖子
            const actionNumber = container.querySelector('.action-number');
            if (actionNumber && actionNumber.textContent.trim() === '评论') {
                container.style.display = 'none';
                return;
            }
            // 屏蔽视频帖子
            if (container.querySelector('.video-wrapper, video, [data-art-id], .art-video-player')) {
                container.style.display = 'none';
            }
        });
    }

    function init() {
        let count = 0;
        const intervals = [500, 1000, 2000, 3000, 5000, 8000];
        intervals.forEach(delay => {
            setTimeout(hidePosts, delay);
        });

        let lastCheck = 0;
        const checkLoop = () => {
            if (Date.now() - lastCheck > 2000) {
                hidePosts();
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
