// ==UserScript==
// @name         贴吧零回复屏蔽
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  屏蔽百度贴吧首页评论数为零的帖子。近期百度以普通帖子的形式出现大量广告，其基本没有评论，所以采用这种方式屏蔽。
// @match        https://tieba.baidu.com/
// @exclude      https://tieba.baidu.com/home
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function hideZeroCommentPosts() {
        document.querySelectorAll('.action-number').forEach(el => {
            if (el.textContent.trim() === '评论') {
                const container = el.closest('.thread-container, .virtual-list-item, .thread-card, [data-index]');
                if (container) {
                    container.style.display = 'none';
                }
            }
        });
    }

    function init() {
        let count = 0;
        const intervals = [500, 1000, 2000, 3000, 5000, 8000];
        intervals.forEach(delay => {
            setTimeout(hideZeroCommentPosts, delay);
        });

        let lastCheck = 0;
        const checkLoop = () => {
            if (Date.now() - lastCheck > 2000) {
                hideZeroCommentPosts();
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
