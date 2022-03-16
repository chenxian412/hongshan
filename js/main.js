var winW, winH, winST, isSp, isChange, spW = 768;
$(function () {
    initCommon();
    initHeader();
    initHome();
    initProduct();
    initCase();
    initFactory();
    initContact();
});

function initCommon() {
    $(window).scroll(function () { winST = $(window).scrollTop() }).trigger('scroll');
    $(window).resize(getWinSize).trigger('resize');

    function getWinSize() {
        winW = $('html').css('overflow', 'hidden').width();
        winH = $(window).height();
        isChange = isSp !== undefined && isSp != (winW < spW);
        isSp = winW < spW;
        $('html').removeAttr('style');
    }
}

function initHeader() {
    // 搜索框按钮出现搜索框
    if (!isSp) {
        $("#header .search").hover(function () {
            $('.search .search_bd').stop().fadeToggle(300);
        });
    }

    $("#header .search_bd .reset").click(function () {
        $('#header .search_bd input').val('');
    });

    // 移动端菜单按钮
    var count = 2;
    $('#btnMenu').click(function () {
        if (count % 2 == 0) {
            $(this).addClass('btnMenu_on').removeClass('btnMenu');

        } else {
            $(this).addClass('btnMenu').removeClass('btnMenu_on');
        }
        $('#header .bd .inner ul').toggleClass('openMenu');
        $('body').toggleClass('barrier');
        $('body').toggleClass('stop_scroll');
        count++;
    });

    $('.btnMenu').click(function () {
        $('body').toggleClass('openNav')
    });

    $('.backscreen, .nav, .logo, .search').click(function () {
        $('body').removeClass('openNav')
    });

    // 回到顶部
    $(window).scroll(function () {
        if (winST > winH / 2) {
            $('.goBack').addClass('show');
        } else {
            $('.goBack').removeClass('show');
        }
    });

    $(".goBack .top").click(function () {
        $('body,html').animate({ scrollTop: 0 }, 1000);
        return false;
    });
}

function initHome() {
    if (!$('body').hasClass('home')) return;

    // sec01
    var swiper = new Swiper('.sec01 .swiper-container', {
        autoplay: true,
        loop: true,
        navigation: {
            nextEl: '.sec01 .swiper-button-next',
            prevEl: '.sec01 .swiper-button-prev',
        },
        pagination: {
            el: '.sec01 .swiper-pagination',
            clickable: true,
        },
    });

    // sec02
    $('.sec02 .hd li').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        var index = $(this).index();
        $('.sec02 .bd .item').eq(index).show().siblings().hide();
    });

    // sec05
    var swiper = new Swiper('.sec05 .swiper-container', {
        loop: true,
        slidesPerView: 'auto',
        slidesPerGroup: 4,
        pagination: {
            el: '.sec05 .swiper-pagination',
            type: 'progressbar',
        },
        navigation: {
            nextEl: '.sec05 .swiper-button-next',
            prevEl: '.sec05 .swiper-button-prev',
        },
    });

    // sec07
    var swiper = new Swiper('.sec07 .swiper-container', {
        pagination: {
            el: '.sec07 .swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },
    });
}

function initProduct() {
    if (!$('body').hasClass('product_detail')) return;

    $('.smallImg').click(function () {
        $(this).addClass('current').siblings().removeClass('current');
    })

    var toggle = true;
    $(".smallImg img").click(function () {
        if (toggle) {
            $(".bigImg img").attr("src", "../img/product_detail_sec02_02.jpg")
            toggle = false;
        } else {
            $(".bigImg img").attr("src", "../img/product_detail_sec02_03.jpg")
            toggle = true;
        }
    });

    $('.sec02 .row2 .col1 .hd span').click(function () {
        $(this).addClass('current').siblings().removeClass('current');
        var index = $(this).index();
        $('.sec02 .row2 .col1 .bd .item').eq(index).show().siblings().hide();
    })


}

function initCase() {
    if (!$('body').hasClass('case_detail')) return;

    var swiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

function initFactory() {
    if (!$('body').hasClass('factory_show')) return;

    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    $('.sec02 .bd li').click(function () {
        $('.mask').addClass('show');
        $('body').addClass('openMask');
        var index = $(this).index();
        mySwiper.slideTo(index + 1, 0, false);
    });

    $('.mask').click(function () {
        $('.mask').removeClass('show');
        $('body').removeClass('openMask');
    });

    $('.mask .arrow, .mask .swiper-cntainer').click(function (e) {
        e.stopPropagation();
    });
}

function initContact() {
    if (!$('body').hasClass('contact')) return;

    //创建和初始化地图函数：
    function initMap() {
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        addMapOverlay();//向地图添加覆盖物
    }
    function createMap() {
        map = new BMap.Map("map");
        map.centerAndZoom(new BMap.Point(106.349433, 29.406965), 15);
    }
    function setMapEvent() {
        map.enableScrollWheelZoom();
        map.enableKeyboard();
        map.enableDragging();
        map.enableDoubleClickZoom()
    }
    function addClickHandler(target, window) {
        target.addEventListener("click", function () {
            target.openInfoWindow(window);
        });
    }
    function addMapOverlay() {
        var markers = [
            { content: "我的备注", title: "重庆鸿杉建材有限公司", imageOffset: { width: 0, height: -21 }, position: { lat: 29.411559, lng: 106.34929 } }
        ];
        for (var index = 0; index < markers.length; index++) {
            var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
            var marker = new BMap.Marker(point, {
                icon: new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png", new BMap.Size(20, 25), {
                    imageOffset: new BMap.Size(markers[index].imageOffset.width, markers[index].imageOffset.height)
                })
            });
            var label = new BMap.Label(markers[index].title, { offset: new BMap.Size(25, 5) });
            var opts = {
                width: 200,
                title: markers[index].title,
                enableMessage: false
            };
            var infoWindow = new BMap.InfoWindow(markers[index].content, opts);
            marker.setLabel(label);
            addClickHandler(marker, infoWindow);
            map.addOverlay(marker);
        };
    }
    //向地图添加控件
    function addMapControl() {
        var scaleControl = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
        scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
        map.addControl(scaleControl);
        var navControl = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
        map.addControl(navControl);
        var overviewControl = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: true });
        map.addControl(overviewControl);
    }
    var map;
    initMap();
}