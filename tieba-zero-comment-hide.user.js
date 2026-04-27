// ==UserScript==
// @name         贴吧零回复屏蔽
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  屏蔽百度贴吧首页零回复广告帖子和视频帖子
// @match        https://tieba.baidu.com/
// @exclude      https://tieba.baidu.com/home
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function hideTargetPosts() {
        document.querySelectorAll('.thread-container, .virtual-list-item, [data-index]').forEach(container => {
            const actionNumber = container.querySelector('.action-number');
            if (actionNumber && actionNumber.textContent.trim() === '评论') {
                container.style.display = 'none';
                return;
            }
            if (container.querySelector('.art-video')) {
                container.style.display = 'none';
            }
        });
    }

    function init() {
        const intervals = [500, 1000, 2000, 3000, 5000, 8000];
        intervals.forEach(delay => setTimeout(hideTargetPosts, delay));

        let lastCheck = 0;
        const checkLoop = () => {
            if (Date.now() - lastCheck > 2000) {
                hideTargetPosts();
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
