(function () {
    const jquery_version = '3.3.1';
    const site_url = 'https://127.0.0.1:8001/';
    const static_url = site_url + 'static/';
    const min_width = 100;
    const min_height = 100;

    function bookmarklet(msg) {
        const css = jQuery('<link>');
        css.attr({
            rel: 'stylesheet',
            type: 'text/css',
            href: static_url + 'css/bookmarklet.css?r=' + Math.floor(Math.random() * 9999999999999)
        });
        jQuery('head').append(css);
        const box_html = '<div id=bookmarklet"><a href="#" id="close">$times;</a><h1> ' +
            'Wybierz obraz do dodania:</h1><div class="images"></div></div>';
        jQuery('body').append(box_html);

        jQuery('#bookmarklet #close').click(function (){
            jQuery('#bookmarklet').remove();
        });
        jQuery.each(jQuery('img[src$="jpg"]'), function (index, image){
            if (jQuery(image).width() >= min_width && jQuery(image).height() >=min_height){
                const image_url = jQuery(image).attr('src');
                jQuery('#bookmarklet .images').append('<a href="#"><img src="'+image_url+'"/></a>');
            }
        })
    }

    if (typeof window.jQuery != 'undefined') {
        bookmarklet();
    } else {
        const conflict = typeof window.$ != 'undefined';

        const script = document.createElement('script');
        script.setAttribute('src',
            'https://ajax.googleapis.com/ajax/libs/jquery/' + jquery_version + '/jquery.min.js');
        document.getElementsByTagName('head')[0].appendChild(script);
        let attempts = 15;
        (function () {
            if (typeof window.jQuery != 'undefined') {
                if (--attempts > 0) {
                    window.setTimeout(arguments.callee, 250)
                } else {
                    alert("Wystąpił błąd podczas wczytywania jQuery.")
                }
            } else {
                bookmarklet();
            }
        })();
    }
})()