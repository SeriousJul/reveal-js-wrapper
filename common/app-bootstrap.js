var Utils = {};

Utils.getQueryParameter = function () {
    return location.search
        .substr(1)
        .split('&')
        .map(function (value) {
            var split = value.split('=');
            return {
                key: decodeURIComponent(split[0]),
                value: decodeURIComponent(split[1])
            };
        })
        .reduce(function (prev, current) {
            if (!!prev[current.key]) {
                if (prev[current.key].prop && prev[current.key].prop.constructor === Array) {
                    prev[current.key] = [prev[current.key]];
                }
                prev[current.key].push(current.value);
            } else {
                prev[current.key] = current.value;
            }
            return prev;
        }, {});
};

var RevealBootstrapper = {};

RevealBootstrapper.config = {
    defaultTiming: 0,
    slideNumber: true,
    showNotes: true,
    dependencies: [
        //Multiplex
        {
            src: '//cdn.socket.io/socket.io-1.3.5.js',
            async: true
        },

        // Load section from file
        {
            src: '../node_modules/reveal_external/external/external.js',
            condition: function () {
                return !!document.querySelector('[data-external]');
            }
        },

        // Cross-browser shim that fully implements classList - https://github.com/eligrey/classList.js/
        {
            src: '../node_modules/reveal.js/lib/js/classList.js',
            condition: function () {
                return !document.body.classList;
            }
        },

        // Interpret Markdown in <section> elements
        {
            src: '../node_modules/reveal.js/plugin/markdown/marked.js',
            condition: function () {
                return !!document.querySelector('[data-markdown]');
            }
        },
        {
            src: '../node_modules/reveal.js/plugin/markdown/markdown.js',
            condition: function () {
                return !!document.querySelector('[data-markdown]');
            }
        },

        // Syntax highlight for <code> elements
        {
            src: '../node_modules/reveal.js/plugin/highlight/highlight.js',
            async: true,
            callback: function () {
                hljs.initHighlightingOnLoad();
            }
        },

        // Zoom in and out with Alt+click
        {
            src: '../node_modules/reveal.js/plugin/zoom-js/zoom.js',
            async: true
        },

        // Speaker notes
        {
            src: '../node_modules/reveal.js/plugin/notes/notes.js',
            async: true
        },

        // MathJax
        {
            src: '../node_modules/reveal.js/plugin/math/math.js',
            async: true
        }
    ]
};

RevealBootstrapper.getSecret = function () {
    return Utils.getQueryParameter().secret;
};

RevealBootstrapper.initialize = function (socketIoUrl, clientId, secret) {
    if (!!clientId && !!socketIoUrl) {
        //Multiplex
        if (!!secret) {
            RevealBootstrapper.config.multiplex = {
                secret: secret,
                id: clientId,
                url: socketIoUrl
            };
            RevealBootstrapper.config.dependencies.push({
                src: '../node_modules/reveal.js/plugin/multiplex/master.js',
                async: true
            });
        } else {
            RevealBootstrapper.config.multiplex = {
                id: clientId,
                url: socketIoUrl
            };
            RevealBootstrapper.config.controls = false;
            RevealBootstrapper.config.keyboard = false;
            RevealBootstrapper.config.overview = false;
            RevealBootstrapper.config.touch = false;
            RevealBootstrapper.config.help = false;
            RevealBootstrapper.config.dependencies.push({
                src: '../node_modules/reveal.js/plugin/multiplex/client.js',
                async: true
            });
        }
    }
    return RevealBootstrapper.config;
};