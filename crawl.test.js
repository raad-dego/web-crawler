const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML, crawlPage } = require('./crawl.js')
const fetch = require('node-fetch');


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

test('getURLsFromHTML should convert relative URLs to absolute URLs', () => {
    const htmlBody = `
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    `
    const baseURL = 'https://example.com'

    const result = getURLsFromHTML(htmlBody, baseURL)

    expect(result).toEqual([
      'https://example.com/about',
      'https://example.com/contact'
    ])
  })

  test('getURLsFromHTML should find all <a> tags in the HTML body', () => {
    const htmlBody = `
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <a href="/blog">Blog</a>
    `
    const baseURL = 'https://example.com'

    const result = getURLsFromHTML(htmlBody, baseURL)

    expect(result).toEqual([
      'https://example.com/about',
      'https://example.com/contact',
      'https://example.com/blog'
    ])
  })
