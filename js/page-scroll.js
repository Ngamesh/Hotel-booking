(function () {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    window.addEventListener('beforeunload', function () {
        window.scrollTo(0, 0);
    });

    window.addEventListener('pageshow', function (event) {
        var navigationEntry = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
        var isReload = navigationEntry
            ? navigationEntry.type === 'reload'
            : performance.navigation && performance.navigation.type === 1;

        if (isReload || event.persisted) {
            window.scrollTo(0, 0);
        }
    });
}());
