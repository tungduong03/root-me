var render = () => {
    // Init
    var input = document.getElementById("input").value;
    const renderer = document.getElementById("renderer");

    // Generate appropriate URL
    history.replaceState(null, null, document.location.origin + "/renderer?content=" + encodeURIComponent(input));

    // Purify input
    input = DOMPurify.sanitize(input);

    // Debug mode
    var debug_script = `<script>
    if(typeof debug != 'undefined') {
        // Debug header
        document.getElementById("debug_header").innerHTML = "<h1>Debug Mode Activated</h1>"

        // Debug output
        // document.write("2")
        // Custom debug
        custom_debug = document.createElement('script');
        try {
            const path = String(debug.path).slice(8,) // Note for admin: slice used to avoid bugs, fix it as soon as possible
            const params = debug.params.textContent
            const debug_url = new URL("http://debug.secure_renderer" + path + "/debug" + params); // Make sure that right FQDN and endpoint is being used and generate URL object
            custom_debug.src = debug_url.origin + debug_url.pathname // Set final secure url as custom debug script source
        } catch {}
        document.body.appendChild(custom_debug);
    };
    </script>`;

    // html render
    var html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline';">
        <title>Renderer</title>
    </head>
    <body>
        <div id="debug_header"></div>
        ${input}
        ${debug_script}
    </body>
    </html>`;

    renderer.srcdoc = html;
};

document.body.onload = () => {
    params = new URLSearchParams(window.location.search);
    input.value = params.get("content");
    render();
};