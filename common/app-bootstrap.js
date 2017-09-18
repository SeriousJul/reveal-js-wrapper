Reveal.initialize({
    defaultTiming: 0,
    slideNumber: true,
    dependencies: [{
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
});