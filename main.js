// const { crawlPage }  = require("./crawl.js")
import { crawlPage } from "./crawl.js";


async function main() {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        console.log('Invalid number of arguments, please provide the BASE_URL')
    }
    const baseURL = args[0]
    console.log(`We are starting at ${baseURL}`)
    console.log(`crawling: ${baseURL}`)

    await crawlPage(baseURL, baseURL, new Map())
}
main().catch((error) => {
    console.error(error);
})