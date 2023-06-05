const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('normalizeURL should convert URLs to lowercase and remove "http://" or "https://" prefixes', () => {
    const inputURL = 'https://wagslane.dev/path'
    const expectedOutput = 'wagslane.dev/path'

    const normalizedURL = normalizeURL(inputURL)

    expect(normalizedURL).toBe(expectedOutput)
})

test('normalizeURL should return an empty string if the input URL is empty', () => {
    const inputURL = ''
    const expectedOutput = ''

    const normalizedURL = normalizeURL(inputURL)

    expect(normalizedURL).toBe(expectedOutput)
})

test('normalizeURL should remove trailing slashes from the URL', () => {
    const inputURL = 'https://wagslane.dev/path/'
    const expectedOutput = 'wagslane.dev/path'

    const normalizedURL = normalizeURL(inputURL)

    expect(normalizedURL).toBe(expectedOutput)
})

test('normalizeURL should handle URLs with query parameters', () => {
    const inputURL = 'https://wagslane.dev/path?param1=value1&param2=value2'
    const expectedOutput = 'wagslane.dev/path'

    const normalizedURL = normalizeURL(inputURL)

    expect(normalizedURL).toBe(expectedOutput)
})

test('normalizeURL should handle URLs with fragments', () => {
    const inputURL = 'https://wagslane.dev/path#section1'
    const expectedOutput = 'wagslane.dev/path'

    const normalizedURL = normalizeURL(inputURL)

    expect(normalizedURL).toBe(expectedOutput)
})

test('normalizeURL should handle URLs with different top-level domains (TLDs)', () => {
    const inputURL = 'https://wagslane.co.uk/path'
    const expectedOutput = 'wagslane.co.uk/path'

    const normalizedURL = normalizeURL(inputURL)

    expect(normalizedURL).toBe(expectedOutput)
})

