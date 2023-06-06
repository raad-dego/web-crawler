const { JSDOM } = require('jsdom')

function normalizeURL(url) {
    if (url === '') {
        return ''
    }
    let { hostname, pathname } = new URL(url)
    let normalizedPathname = pathname.replace(/\/+$/, ''); // Remove trailing slashes
    return `${hostname}${normalizedPathname}`.toLowerCase()
}


function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    const anchors = dom.window.document.querySelectorAll('a')
    const urls = []

    anchors.forEach((anchor) => {
        let url = anchor.href

        if (url.startsWith('//')) {
            url = 'https:' + url
        } else if (!url.startsWith('http')) {
            url = new URL(url, baseURL).href
        }

        urls.push(url)
    })

    return urls
}

module.exports = {
    getURLsFromHTML,
    normalizeURL
};
