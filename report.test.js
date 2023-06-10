import { reportSorter } from './report.js'
import { test, expect } from '@jest/globals'

test('sorts pages in descending order based on values', () => {
    const pages = {
        'example.com/page1': 3,
        'example.com/page2': 5,
        'example.com/page3': 1
    }
    const sortedReport = reportSorter(pages)
    const expected = {
        'example.com/page2': 5,
        'example.com/page1': 3,
        'example.com/page3': 1
    }
    expect(sortedReport).toEqual(expected)
})

test('returns an empty object for an empty input', () => {
    const pages = {}
    const sortedReport = reportSorter(pages)
    expect(sortedReport).toEqual({})
})

test('handles equal values correctly', () => {
    const pages = {
        'example.com/page1': 3,
        'example.com/page2': 3,
        'example.com/page3': 3
    }
    const sortedReport = reportSorter(pages)
    const expected = {
        'example.com/page1': 3,
        'example.com/page2': 3,
        'example.com/page3': 3
    }
    expect(sortedReport).toEqual(expected)
})

test('handles negative values correctly', () => {
    const pages = {
        'example.com/page1': -5,
        'example.com/page2': -2,
        'example.com/page3': -10
    }
    const sortedReport = reportSorter(pages)
    const expected = {
        'example.com/page2': -2,
        'example.com/page1': -5,
        'example.com/page3': -10
    }
    expect(sortedReport).toEqual(expected)
})
