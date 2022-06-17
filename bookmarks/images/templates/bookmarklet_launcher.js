(function () {
    if (window.myBookmarklet !== undefined) {
        myBookmarklet();
    } else {
        let element = document.createElement('script');
        element.src = 'https://127.0.0.1:8001/static/js/bookmarklet.js?r=' + Math.floor(Math.random() * 99999999999999999999);
        document.body.appendChild(element);
    }
})();