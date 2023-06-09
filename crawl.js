// const { JSDOM } = require('jsdom')
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch'

function normalizeURL(url) {
    if (url === '') {
        return ''
    }
    let { hostname, pathname } = new URL(url)
    let normalizedPathname = pathname.replace(/\/+$/, ''); // Remove trailing slashes
    return `${hostname}${normalizedPathname}`.toLowerCase()
}


function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const anchors = dom.window.document.querySelectorAll('a')

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

async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    // Conditional for same domain
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        // Removed console log here due to excesive logs
        return pages
    }
    const normURL = normalizeURL(currentURL)
    // Conditional for url check in pages crawled
    if (pages[normURL] > 0) {
        pages[normURL]++
        return pages
    }

    pages[normURL] = 1


    console.log(`crawling ${currentURL}`)
    let htmlBody = ""
    try {
        const response = await fetch(currentURL)
        // Conditional for unwanted status errors
        if (response.status >= 400) {
            console.error(`HTTP error: ${response.status}`)
            return pages
        }
        const contentType = response.headers.get('Content-Type')
        // Conditional for wrong content type
        if (!contentType.includes('text/html')) {
            console.error(`non-html response: ${contentType}`)
            return pages
        }
        htmlBody = await response.text()
    } catch (err) {
        console.log(`${err.message}`)
    }
    const urls = getURLsFromHTML(htmlBody, baseURL)
    for (const url of urls) {
        pages = await crawlPage(baseURL, url, pages)
    }
    return pages
}


export { crawlPage, normalizeURL, getURLsFromHTML }