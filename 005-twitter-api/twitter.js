const twitterSDK = require('twitter')
const config = require('./config.json')
const twitterClient = new twitterSDK(config)
const fs = require('fs')

Array.prototype.cut = function (range) {
    const _temp = []
    for (let index = 1; index <= Math.floor(this.length / range); index++) {
        _temp.push([...this.slice(index * range - range, index * range)])
    }
    if (this.length % range > 0) {
        _temp.push([...this.slice(Math.floor(this.length / range) * range, (Math.floor(this.length / range) * range + this.length % range))])
    }
    return _temp
}

const _get = async (...params) => {
    try {
        return await twitterClient.get(params[0], params[1])
    }
    catch (e) {
        console.log(e)
    }
}


const _getFollowers = async (screenName) => {
    try {
        const followersIds = await _get('/followers/ids', { screen_name: screenName })
        const followersChunks = followersIds.ids.cut(100)
        const followersPromise = []
        followersChunks.forEach(list => {
            const promise = _get('/users/lookup', { user_id: list.join(',') }).then(users => users.map(user => user.screen_name))
            followersPromise.push(promise)
        })
        const followersList = await Promise.all(followersPromise)
        return await followersList.flat(1)
    }
    catch (e) {
        console.log('error')
        console.log(e)
        return
    }
}


module.exports = {
    getFollowers: _getFollowers
}