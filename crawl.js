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

async function crawlPage(baseURL) {
    console.log(`crawling ${baseURL}`)
    try {
        const response = await fetch(baseURL)
        if (response.status < 400 || response.status >= 500) {
            console.error(`HTTP error: ${response.status}`)
            return
        }
        const contentType = response.headers.get('Content-Type')
        console.log(contentType)
        if (contentType.inclide !== 'text/html') {
            console.error("non-html response: ${con}")
            return
        }
        console.log(response.text())
        console.log(await response.text())
        console.log(response.body)
    } catch (err) {
        console.log(err.message)
    }
}


module.exports = {
    getURLsFromHTML,
    normalizeURL,
    crawlPage
}