(function () {
    'use strict';

    const routeAlerts = {
        'ancient-city': '【临时施工】永宁门（南门）东侧登城口6月20日-25日封闭维修，请从西南城角或北门登城；钟楼地下通道部分扶梯检修，请走步行梯。',
        'dock': '',
        'mountain': '【节日拥堵】华山景区周末及端午假期（6月22日-24日）实行限流，需提前2天预约索道票；骊山盘山公路每日8:00-10:00上山方向车流大，建议错峰。',
        'night-market': '【节日拥堵】回民街端午假期（6月22日-24日）每日19:00-22:00人流量饱和，建议21:30后前往或改去洒金桥、大皮院等支线；永兴坊摔碗酒排队预计超40分钟。'
    };

    const routeNames = {
        'ancient-city': '古城路线',
        'dock': '码头路线',
        'mountain': '山路路线',
        'night-market': '夜市路线'
    };

    function initRouteFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const routeCards = document.querySelectorAll('.route-card');
        const alertBanner = document.getElementById('alert-banner');
        const alertText = alertBanner ? alertBanner.querySelector('.alert-text') : null;

        if (!filterBtns.length || !routeCards.length) return;

        function showAlertForRoute(route) {
            if (!alertBanner || !alertText) return;

            if (route === 'all') {
                const activeAlerts = [];
                for (const key in routeAlerts) {
                    if (routeAlerts[key]) {
                        activeAlerts.push(routeAlerts[key]);
                    }
                }
                if (activeAlerts.length > 0) {
                    alertText.textContent = activeAlerts.join(' ');
                    alertBanner.classList.remove('hidden');
                } else {
                    alertBanner.classList.add('hidden');
                }
            } else {
                const msg = routeAlerts[route];
                if (msg) {
                    alertText.textContent = msg;
                    alertBanner.classList.remove('hidden');
                } else {
                    alertBanner.classList.add('hidden');
                }
            }
        }

        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                const target = btn.getAttribute('data-route');

                routeCards.forEach(function (card) {
                    if (target === 'all' || card.getAttribute('data-route') === target) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });

                showAlertForRoute(target);
            });
        });

        showAlertForRoute('all');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRouteFilter);
    } else {
        initRouteFilter();
    }
})();
