self.addEventListener('install', (event) => {
    event.waitUntil(async function () {
        const cache = await caches.open('piodide');
        await cache.addAll([
            'https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js',
            'https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide_py.tar',
            'https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.asm.js',
            'https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.asm.data',
            'https://cdn.jsdelivr.net/pyodide/v0.21.2/full/repodata.json',
            'https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.asm.wasm',
            'https://cdn.jsdelivr.net/pyodide/v0.21.2/full/packaging-21.3-py3-none-any.whl',
            'https://cdn.jsdelivr.net/pyodide/v0.21.2/full/distutils.tar',
            'https://cdn.jsdelivr.net/pyodide/v0.21.2/full/micropip-0.1-py3-none-any.whl',
            ''
        ]);
    }());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(async function () {
        const cache = await caches.open('piodide');
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) return cachedResponse;
        const networkResponse = await fetch(event.request);
        return networkResponse;
    }());
});