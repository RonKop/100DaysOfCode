const colors = require('colors')
const logSync = (data) => {
    console.log(colors.cyan.bold('SYNCHRONOUS : '), data)
}
const logAsync = (data) => {
    console.log(colors.green.bold('ASYNCHRONOUS : '), data)
}
const logInfo = (data) => {
    console.log(colors.red.bold('INFO : '), data)
}

const getCurrentTime = () => {
    const date = new Date()
    return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds().toString().padStart(2, '0')}`
}

console.log("\n")


const getPromise = (time = 1000) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Resolved.')
    }, time)
})

const synchronous = () => {
    const promises = []
    for (let i = 0; i < 1000000; i++) {
        promises.push(getPromise(i))
    }
    promises.forEach(promise => {
        promise.then(v => logSync(`${getCurrentTime()} : ${v} `))
    })
    Promise.all(promises).then(values => {
        logSync([values, getCurrentTime()])
    })
}

const asynchronous = async () => {
    const promises = []
    for (let i = 0; i < 1000000; i++) {
        promises.push(getPromise(i))
    }
    promises.forEach(async promise => {
        logAsync(await promise)
    })
    logAsync([await Promise.all(promises), getCurrentTime()])
}



logInfo(getCurrentTime())
synchronous()
asynchronous()

