var speedScroll = 500;  // скорость прокрутки к началу страницы
var viewTopLink = 187;  // уровень скролла, про котором появляется ссылка на начало страницы

var speedSlider = 500;  // скорость прокрутки слайдера
var sliderStart = '';
var sliderSize  = 0;

var speedPhoto  = 500;  // скорость прокрутки превью фотографий

(function($) {

    $(document).ready(function() {

        // подсказка в форме поиска
        $('.header-search-input input').each(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        $('.header-search-input input').live('focus', function() {
            $(this).parent().find('span').css({'display': 'none'});
        });

        $('.header-search-input input').live('blur', function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        // прокрутка к началу страницы
        $('.footer-back').click(function() {
            $.scrollTo(0, speedScroll);
            return false;
        });

        // слайдер
        $('.main-slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);
            sliderSize = curSlider.find('.main-slider-item').length;
            curSlider.find('.main-slider-list').width(sliderSize * curSlider.find('.main-slider-item:first').width());
            portfolioStart = curSlider.find('.main-slider-list').html();
        });

        $('.main-slider').hover(
            function() {
                $('.main-slider-prev, .main-slider-next').css({'display': 'block'});
            },

            function() {
                $('.main-slider-prev, .main-slider-next').css({'display': 'none'});
            }
        );

        $('.main-slider-next').click(function() {
            var curSlider = $('.main-slider');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex += 3;
                if (curIndex >= curSlider.find('.main-slider-item').length - 3) {
                    curSlider.find('.main-slider-list').append(portfolioStart);
                    curSlider.find('.main-slider-list').width(curSlider.find('.main-slider-item').length * curSlider.find('.main-slider-item:first').width());
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('.main-slider-list').animate({'left': -curIndex * curSlider.find('.main-slider-item:first').width()}, speedSlider, function() {
                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                });
            }

            return false;
        });

        $('.main-slider-prev').click(function() {
            var curSlider = $('.main-slider');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex -= 3;
                if (curIndex < 0) {
                    curSlider.find('.main-slider-list').prepend(portfolioStart);
                    curSlider.find('.main-slider-list').width(curSlider.find('.main-slider-item').length * curSlider.find('.main-slider-item:first').width());
                    curSlider.find('.main-slider-list').css({'left': -(sliderSize + curIndex + 3) * curSlider.find('.main-slider-item:first').width()});
                    curIndex = sliderSize + curIndex;
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('.main-slider-list').animate({'left': -curIndex * curSlider.find('.main-slider-item:first').width()}, speedSlider, function() {
                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                });
            }

            return false;
        });

        $('.main-slider-link').hover(
            function() {
                if ($(this).offset().left + 506 > $(window).width()) {
                    $(this).addClass('main-slider-right');
                }
            },

            function() {
                $(this).removeClass('main-slider-right');
            }
        );

        // фильтр
        $('.filter-item-checkbox em input:checked').parent().addClass('checked');
        $('.filter-item-checkbox em input:disabled').parent().addClass('disabled');

        $('.filter-item-checkbox em').click(function() {
            var curEm = $(this);
            if (!curEm.hasClass('disabled')) {
                curEm.toggleClass('checked');
                curEm.find('input').prop('checked', curEm.hasClass('checked')).trigger('change');
            }
        });

        $('#slider-range').slider({
            range: true,
            min: 0,
            max: 200000,
            values: [0, 200000],
            slide: function(event, ui) {
                $('#priceFrom').val(ui.values[0]);
                $('#priceTo').val(ui.values[1]);
                $('#slider-range .ui-slider-handle').eq(0).html(ui.values[0]);
                $('#slider-range .ui-slider-handle').eq(1).html(ui.values[1]);
            }
        });

        $('#priceFrom').val($('#slider-range').slider('values', 0));
        $('#priceTo').val($('#slider-range').slider('values', 1));
        $('#slider-range .ui-slider-handle').eq(0).html($('#slider-range').slider('values', 0));
        $('#slider-range .ui-slider-handle').eq(1).html($('#slider-range').slider('values', 1));

        $('#priceFrom').change(function() {
            var curVal = Number($(this).val());
            if (!(curVal >= 0 && curVal <= $('#slider-range').slider('option', 'max'))) {
                curVal = $('#slider-range').slider('option', 'min');
            }
            $(this).val(curVal);
            $('#slider-range').slider('values', 0, curVal)
            $('#slider-range .ui-slider-handle').eq(0).html(curVal);
        });

        $('#priceTo').change(function() {
            var curVal = Number($(this).val());
            if (!(curVal >= 0 && curVal <= $('#slider-range').slider('option', 'max'))) {
                curVal = $('#slider-range').slider('option', 'max');
            }
            $(this).val(curVal);
            $('#slider-range').slider('values', 1, curVal)
            $('#slider-range .ui-slider-handle').eq(1).html(curVal);
        });

        // сортировка
        $('.catalogue-sort-dir-select-value').click(function() {
            var curSelect = $(this).parent();
            if (curSelect.hasClass('catalogue-sort-dir-select-open')) {
                curSelect.removeClass('catalogue-sort-dir-select-open');
            } else {
                $('.catalogue-sort-dir-select-open').removeClass('catalogue-sort-dir-select-open');
                curSelect.addClass('catalogue-sort-dir-select-open');
            }
            return false;
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.catalogue-sort-dir-select').length == 0) {
                $('.catalogue-sort-dir-select-open').removeClass('catalogue-sort-dir-select-open');
            }
        });

        $('.catalogue-sort-dir-select-list a').click(function() {
            var curSelect = $(this).parents().filter('.catalogue-sort-dir-select');
            curSelect.find('input').val($(this).attr('rel')).trigger('change');
            curSelect.find('.catalogue-sort-dir-select-value').html($(this).html());
            curSelect.removeClass('catalogue-sort-dir-select-open');
            curSelect.find('a.active').removeClass('active');
            $(this).addClass('active');

            return false;
        });

        // фото в подробном описании
        $('.detail-photo-preview-content').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);
            curSlider.find('ul').width(curSlider.find('li').length * curSlider.find('li:first').width());
        });

        $('.detail-photo-preview-next').click(function() {
            var curSlider = $('.detail-photo-preview-content');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex += 2;
                if (curIndex >= curSlider.find('li').length - 2) {
                    curIndex = curSlider.find('li').length - 2;
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, speedPhoto, function() {
                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                });
            }

            return false;
        });

        $('.detail-photo-preview-prev').click(function() {
            var curSlider = $('.detail-photo-preview-content');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex -= 2;
                if (curIndex < 0) {
                    curIndex = 0;
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, speedPhoto, function() {
                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                });
            }

            return false;
        });

        $('.detail-photo-big a').live('click', function() {
            var curIndex = $('.detail-photo-preview li').index($('.detail-photo-preview li.active'));
            $('.detail-photo-gallery a').eq(curIndex).trigger('click');
            return false;
        });

        $('.detail-photo-gallery a').fancybox();

        $('.detail-photo-preview-content a').click(function() {
            var curLink = $(this);
            var curLi = curLink.parents().filter('li');
            if (!curLi.hasClass('active')) {
                $('.detail-photo-preview li.active').removeClass('active');
                curLi.addClass('active');
                $('.detail-photo-big img').attr('src', curLink.attr('href'));
            }

            return false;
        });

        // вкладки
        $('.catalogue-tabs ul li a').click(function() {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curIndex = $('.catalogue-tabs ul li').index(curLi);
                $('.catalogue-tabs ul li.active').removeClass('active');
                curLi.addClass('active');
                $('.catalogue-tabs-content').removeClass('active');
                $('.catalogue-tabs-content').eq(curIndex).addClass('active');
            }
            return false;
        });

        $('.catalogue-tabs-content table').each(function() {
            $(this).find('tbody tr:odd').addClass('odd');
        });

    });

    $(window).scroll(function() {
        if ($(window).scrollTop() > viewTopLink) {
            $('.footer-back').css({'display': 'block'});
        } else {
            $('.footer-back').css({'display': 'none'});
        }

        if ($('.catalogue').length > 0) {
            if ($(window).scrollTop() > ($('.wrapper').height() - $(window).height() - 100)) {
                if ($('article .catalogue-more a').length == 1) {
                    if (!$('#place-load').data('loading')) {
                        $('#place-load').data('loading', true);
                        $('#place-load').load($('article .catalogue-more a').attr('href'), function() {
                            var $newItems = $($('#place-load .catalogue').html());
                            $('article .catalogue').append($newItems);
                            if ($('#place-load .catalogue-more').length == 1) {
                                $('article .catalogue-more a').attr('href', $('#place-load .catalogue-more a').attr('href'));
                            } else {
                                $('article .catalogue-more a').remove();
                            }
                            $('#place-load').data('loading', false);
                            $('#place-load').html('');
                        });
                    }
                }
            }
        }

        if ($('.catalogue-list').length > 0) {
            if ($(window).scrollTop() > ($('.wrapper').height() - $(window).height() - 100)) {
                if ($('article .catalogue-more a').length == 1) {
                    if (!$('#place-load').data('loading')) {
                        $('#place-load').data('loading', true);
                        $('#place-load').load($('article .catalogue-more a').attr('href'), function() {
                            var $newItems = $($('#place-load .catalogue-list').html());
                            $('article .catalogue-list').append($newItems);
                            if ($('#place-load .catalogue-more').length == 1) {
                                $('article .catalogue-more a').attr('href', $('#place-load .catalogue-more a').attr('href'));
                            } else {
                                $('article .catalogue-more a').remove();
                            }
                            $('#place-load').data('loading', false);
                            $('#place-load').html('');
                        });
                    }
                }
            }
        }

        if ($('.catalogue-photo').length > 0) {
            if ($(window).scrollTop() > ($('.wrapper').height() - $(window).height() - 100)) {
                if ($('article .catalogue-more a').length == 1) {
                    if (!$('#place-load').data('loading')) {
                        $('#place-load').data('loading', true);
                        $('#place-load').load($('article .catalogue-more a').attr('href'), function() {
                            var $newItems = $($('#place-load .catalogue-photo').html());
                            $('article .catalogue-photo').append($newItems);
                            if ($('#place-load .catalogue-more').length == 1) {
                                $('article .catalogue-more a').attr('href', $('#place-load .catalogue-more a').attr('href'));
                            } else {
                                $('article .catalogue-more a').remove();
                            }
                            $('#place-load').data('loading', false);
                            $('#place-load').html('');
                        });
                    }
                }
            }
        }
    });

})(jQuery);