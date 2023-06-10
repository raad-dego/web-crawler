function reportSorter(pages) {
    const arr = Object.entries(pages)
    arr.sort((a, b) => b[1] - a[1])
    const sortedReport = Object.fromEntries(arr)
    return sortedReport
}

function printReport(pages) {
    console.log('==========')
    console.log('REPORT')
    console.log('==========')
    const sortedReport = reportSorter(pages)
    Object.keys(sortedReport).forEach(url => {
        console.log(`Found ${sortedReport[url]} internal links to ${url}`)
    })
}


export { reportSorter, printReport }