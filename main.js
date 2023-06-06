function main() {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        console.log('Invalid number of arguments, please provide the BASE_URL')
    }
    const baseURL = args[0]
    console.log(`We are starting at ${baseURL}`)
}

main()