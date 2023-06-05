function normalizeURL(url) {
    if (url === '') {
        return ''
    }
    let { hostname, pathname } = new URL(url)
    let normalizedPathname = pathname.replace(/\/+$/, ''); // Remove trailing slashes
    return `${hostname}${normalizedPathname}`.toLowerCase()
}

module.exports = {
    normalizeURL
};
