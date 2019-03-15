const { getFollowers } = require('./twitter');
console.log(Date.now());
(async () => {
    const followers = await getFollowers()
    console.log(followers.sort())
})()