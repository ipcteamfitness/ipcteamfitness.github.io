var isMobile = {
    Windows: function () {
        return /IEMobile/i.test(navigator.userAgent);
    },
    Android: function () {
        return /Android/i.test(navigator.userAgent);
    },
    BlackBerry: function () {
        return /BlackBerry/i.test(navigator.userAgent);
    },
    iOS: function () {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};

var locationUrl = location.pathname.substring(1);

(function (locationUrl) {
    var ctaLink = isMobile.any() ? 'tel:4076135933' : '/contact-information.html';

    $.get('/assets/mst/main-header.html', function (header) {
        $('#main-header').html(Mustache.render(header, { ctaHref: ctaLink, ctaText: 'CALL US' }));
    });
    $.get('/assets/mst/front-page-cta.html', function (cta) {
        $('#front-page-cta').html(Mustache.render(cta, { ctaHref: ctaLink, ctaText: (isMobile.any()) ? 'CALL US' : 'CONTACT US' }));
    });
    $.get('/assets/mst/promotion-cta.html', function (pcta) {
        $('#promotion-cta').html(Mustache.render(pcta, { ctaHref: ctaLink, ctaText: (isMobile.any()) ? 'CALL US' : 'CONTACT US' }));
    });
})(locationUrl);

function initMap() {
    var map;
    var createMap = function (latitude, longitude, zoom) {
        return new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: latitude,
                lng: longitude
            },
            zoom: zoom
        });
    }

    var createMarker = function (latitude, longitude, url) {
        var marker = new google.maps.Marker({
            map: map,
            position: {
                lat: latitude,
                lng: longitude
            },
        });
        if (url) {
            marker.addListener('click', function () { window.location.href = url; });
        }
        return marker;
    }

    if (locationUrl == "" || locationUrl == "index.html") {
        map = createMap(28.426311, -81.444433, 11);
        ipc = createMarker(28.426311, -81.444433);
    }
}


