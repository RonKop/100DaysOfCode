window.addEventListener('DOMContentLoaded', () => {
    const socket = io()

    const refreshCSS = () => {
        const stylesheets = [...document.querySelectorAll('link[rel="stylesheet"]')]
        stylesheets.forEach(stylesheet => {
            document.head.removeChild(stylesheet)
            const href = new URL(stylesheet.href)
            const url = `${href.origin}${href.pathname}?_cache=${+Date.now()}`
            const css = document.createElement('link')
            css.rel = "stylesheet"
            css.href = url
            console.log(CSS)
            document.head.appendChild(css)
        })
    }

    socket.on('refreshCSS', refreshCSS)
    socket.on('refreshJS', () => {
        window.location.reload()
    })
    socket.on('refreshHBS', () => {
        window.location.reload()
    })

})