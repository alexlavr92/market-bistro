$(document).ready(function () {
    var DocWidth = $(document).width()
    AOS.init({});

    /* Function Block Scroll */
    var blockScroll = function (state) {
        if (state == "open") {
            setTimeout(function () {

                if (!document.body.hasAttribute('data-body-scroll-fix')) {

                    let scrollPosition = window.pageYOffset || document.documentElement.scrollTop; // Получаем позицию прокрутки

                    document.body.setAttribute('data-body-scroll-fix', scrollPosition); // Cтавим атрибут со значением прокрутки
                    document.body.style.overflow = 'hidden';
                    document.body.style.position = 'fixed';
                    document.body.style.top = '-' + scrollPosition + 'px';
                    document.body.style.left = '0';
                    document.body.style.right = '0';
                }

            }, 10);
        }
        if (state == "close") {
            if (document.body.hasAttribute('data-body-scroll-fix')) {

                let scrollPosition = document.body.getAttribute('data-body-scroll-fix'); // Получаем позицию прокрутки из атрибута

                document.body.removeAttribute('data-body-scroll-fix'); // Удаляем атрибут
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.right = '';

                window.scroll(0, scrollPosition); // Прокручиваем на полученное из атрибута значение

            }
        }
    }
    //----------------------//

    // Init Top Slider (swiper) //
    var swiperTopSlider
    var InitTopSlider = function (TopSlider) {
        swiperTopSlider = new Swiper(TopSlider, {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 1500,
            grabCursor: true,
            setWrapperSize: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            touchReleaseOnEdges: true,
            disableOnInteraction: false,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.slider-arrow-next',
                prevEl: '.slider-arrow-prev',
                disabledClass: 'disabled'
            },
        })
    }

    if ($('.top-slider-container').length > 0) {
        InitTopSlider($('.top-slider-container'))
    }
    // ------------------------------ //

    // Function Init Slider Fraction //
    if ($('.top-slider-pagination').length > 0) {
        $('.pagination-number:not(.all)').text('0' + (swiperTopSlider.activeIndex + 1))
        if ($('.top-slider-container .top-slider-slide').length < 10) {
            $('.pagination-number.all').text('0' + ($('.top-slider-container .top-slider-slide').length))
        }
        else {
            $('.pagination-number.all').text($('.top-slider-container .top-slider-slide').length)
        }
        var PaginationBarHeight = parseInt($('.pagination-bar').innerHeight()) / $('.top-slider-container .top-slider-slide').length
        $('.pagination-bar > span').css('height', PaginationBarHeight + 'px')
    }
    // ------------------------------ //

    // Function Top-bg and Edit Fraction on transition top-slider //
    swiperTopSlider.on('transitionStart', function () {
        $('.top-bg .top-bg_item.active').removeClass('active').hide()
        $('.top-bg .top-bg_item').eq(swiperTopSlider.activeIndex).fadeIn(700).addClass('active')

        var NowPaginationBarHeight = parseFloat($('.pagination-bar > span').innerHeight())
        if (swiperTopSlider.activeIndex > swiperTopSlider.previousIndex && swiperTopSlider.activeIndex != 0) {
            $('.pagination-bar > span').css({
                'height': NowPaginationBarHeight + PaginationBarHeight + 'px'
            })
        }
        else if (swiperTopSlider.activeIndex < swiperTopSlider.previousIndex && swiperTopSlider.activeIndex != 0) {
            $('.pagination-bar > span').css({
                'height': NowPaginationBarHeight - PaginationBarHeight + 'px'
            })
        }
        else if (swiperTopSlider.activeIndex == 0) {
            $('.pagination-bar > span').css({
                'height': PaginationBarHeight
            })
        }
        if (swiperTopSlider.activeIndex < 9) {
            $('.pagination-number:not(.all)').text('0' + (swiperTopSlider.activeIndex + 1))
        }
        else {
            $('.pagination-number:not(.all)').text(swiperTopSlider.activeIndex + 1)
        }
    })
    // ------------------------------ //


    // Function Adaptive Menu //
    if (DocWidth < 1200) {
        setTimeout(function () {
            $('header').css({ 'transform': 'none' })
        }, 800)
        $('.header-menu').insertAfter($('.adaptive-menu'))

        $('body').on('click', '.adaptive-menu', function (e) {
            if (!$(this).hasClass('open')) {
                $(this).addClass('open').next().fadeIn(400).css({
                    'display': 'flex'
                })
                blockScroll('open')
            }
            else {
                $(this).removeClass('open').next().fadeOut(400)
                blockScroll('close')
            }
        })
        $('body').on('click', '.header-menu_link, .social-item', function (e) {
            if ($(this).parents('.header-adaptive-menu').find('.open').length > 0) {
                $(this).parent('.header-menu').fadeOut().prev('.open').removeClass('open')
                $(this).parents('.header-adaptive-menu').find('.header-menu').fadeOut().prev('.open').removeClass('open')
                blockScroll('close')
            }
        })
    }

    if (DocWidth < 768) {
        $('.top-socials').appendTo('.header-menu')
    }
    // ------------------------------ //

    // Handler on click Tab-Switcher //
    $('body').on('click', '.tabs-switcher:not(.active)', function (e) {
        $(this).addClass('active').siblings('.tabs-switcher.active').removeClass('active')
        var SwitcherIndex = $('.tabs-switcher.active').index()
        $(this).parents('.tabs-switchers').next('.tabs-contents').find('.tabs-content.active').addClass('slide-out').fadeOut(300)
        var $this = $(this)
        setTimeout(function () {
            $this.parents('.tabs-switchers').next('.tabs-contents').find('.tabs-content.active').removeClass('active').removeClass('slide-out')
            $this.parents('.tabs-switchers').next('.tabs-contents').find('.tabs-content:not(.active)').eq(SwitcherIndex).addClass('active').show()
        }, 290)
    })
    // ------------------------------ //

    // Add class scroll to header //
    if ($(window).scrollTop() > 0) {
        if (!$('header').hasClass('scroll'))
            $('header').addClass('scroll')
    }
    $(window).scroll(function () {
        var NowPositionScroll = $(window).scrollTop();
        if (NowPositionScroll > 0) {
            if (!$('header').hasClass('scroll'))
                $('header').addClass('scroll')
        }
        else if (NowPositionScroll == 0 && !$('body').attr('data-body-scroll-fix')) {
            $('header.scroll').removeClass('scroll').css({
                'transition': 'background-color .5s ease'
            })
        }
    })
    //----------------------//

    // Init Light Gallery //
    var $lg = $('.lightgallery')
    $lg.lightGallery({
        share: false,
        thumbnail: false,
        fullScreen: false,
        zoom: false,
        download: false,
        counter: false,
        controls: false,
        enableDrag: false,
        enableSwipe: false,
        autoplay: false,
        progressBar: false,
        autoplayControls: false
    })
    $lg.on('onBeforeOpen.lg', function (event) {
        if (DocWidth < 1200) {
            $('header').css({
                'position': 'absolute'
            })
        }
        blockScroll('open')
    });
    $lg.on('onBeforeClose.lg', function (event) {
        if (DocWidth < 1200) {
            $('header').css({
                'position': ''
            })
        }
        blockScroll('close')
    });

    $('body').on('click', '.lg-object.lg-image', function (e) {
        $lg.data('lightGallery').destroy();
    })
    //----------------------//

    // Init Modal //
    $('body').on('click', '.modal-open', function (e) {
        var ThisHash = $(this).attr('href')
        console.log(ThisHash)
        $(ThisHash).modal({
            fadeDuration: 150,
            closeClass: 'close-custom',
            closeText: '<span class="visually-hidden">Закрыть</span>'
        })
        if (DocWidth < 1200) {
            $('header').css({
                'position': 'absolute'
            })
        }
        blockScroll('open')
        e.preventDefault();
    })

    $('.modal').on('modal:close', function (event, modal) {
        if (DocWidth < 1200) {
            $('header').css({
                'position': ''
            })
        }
        blockScroll('close')
    })
    //----------------------//

    // Init Menu Slider (swiper) //
    var swiperMenuSlider
    var InitMenuSlider = function (MenuSlider) {
        swiperMenuSlider = new Swiper(MenuSlider, {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 30,
            speed: 2000,
            grabCursor: true,
            setWrapperSize: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            touchReleaseOnEdges: true,
            disableOnInteraction: false,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.menu-slider-pagination',
                type: 'fraction',
            },

            navigation: {
                nextEl: '.menu-slider-next',
                prevEl: '.menu-slider-prev',
            },
            breakpoints: {
                767: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 20,
                },
                1199: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 30,
                },
            },
        })
    }

    if ($('.menu-slider-container').length > 0) {
        InitMenuSlider($('.menu-slider-container'))
    }
    // ------------------------------ //

    // Init Mask Phone //
    function initPhoneMask() {
        if ($('.default-input.phone').length > 0) {
            $(".default-input.phone").inputmask({
                showMaskOnHover: false,
                mask: "+1 (999)-999-9999"
            });
        }
    }
    initPhoneMask()
    //----------------------//


    // Init Mask Text //
    function initPrivateTextMask() {
        if ($('html:not(.android) .default-input.text').length > 0) {
            $(".default-input.text").inputmask({
                showMaskOnHover: false,
                regex: "[a-zA-Zа-яА-Я]*",
                showMaskOnHover: false
            });
        }
    }
    initPrivateTextMask()
    //----------------------//

    // Transfer Contact Form on media < 1200px //
    if (DocWidth < 1200 || DocWidth < 768) {
        $('.contact-wrapper .contact-form').insertAfter('.contact-map')
    }
    //----------------------//

    // Animation scroll to anchor //
    $("body").on('click', "a[href^='#']:not([rel]):not(.modal-open):not(.close-modal)", function (e) {
        var HeaderHeight
        if (!$('header').hasClass('scroll')) {
            HeaderHeight = $('.header').innerHeight()
        }
        else {
            HeaderHeight = $('.header').innerHeight() + parseInt($('.header').css('padding-top'), 10)
        }
        $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - HeaderHeight }, 1000);
        e.preventDefault();
    });
    //----------------------//

    /* Submit Contact Form */
    $('body').on('submit', '.contact-form', function (e) {
        var AllInput = $(this).find('.default-input'),
            CountInvalid = 0
        AllInput.each(function (index, elem) {
            if ($(elem).val() == '' && $(elem).attr('name') != 'message') {
                $(elem).addClass('invalid')
                CountInvalid = CountInvalid + 1
            }
            if ($(elem).hasClass('phone')) {
                if (!$(elem).inputmask('isComplete') && !$(elem).hasClass('invalid')) {
                    $(elem).addClass('invalid')
                    CountInvalid = CountInvalid + 1
                }
            }

        })
        if (CountInvalid > 0) {
            var InvalidText = "<span class='invalid-text'>Fill in all the fields</span>"
            if ($(this).find('.valid-text').length > 0)
                $(this).find('.valid-text').remove()
            if ($(this).find('.invalid-text').length == 0)
                $(InvalidText).insertBefore($(this).find('.contact-form-submit'))
        }
        else {
            var ValidText = "<span class='valid-text'>Message sent</span>"
            if ($(this).find('.invalid-text').length > 0)
                $(this).find('.invalid-text').remove()
            if ($(this).find('.valid-text').length == 0)
                $(ValidText).insertBefore($(this).find('.contact-form-submit'))

            // !There add ajax form function! //
        }
        e.preventDefault()
    })
    //----------------------//

    // Remove invalid class from input //
    $('body').on('change input focus', '.default-input.invalid', function (e) {
        $(this).removeClass('invalid')
    })
    //----------------------//


    // Function Font-Size Footer around Text //
    function FooterAroundText() {
        var FooterAroundTextWidth = $('.footer-bigtext').width(),
            FontSize = 0,
            FooterAroundSpanTextWidth = ($('.footer-bigtext > span').width())
        while (FooterAroundSpanTextWidth < FooterAroundTextWidth) {
            FontSize = FontSize + 0.05
            $('.footer-bigtext > span').css({
                'font-size': FontSize + 'vw'
            })
            FooterAroundSpanTextWidth = $('.footer-bigtext > span').width()
        }
    }
    if ($('.footer-bigtext > span').length > 0 && DocWidth >= 1200) {
        FooterAroundText()
    }
    //----------------------//
})
