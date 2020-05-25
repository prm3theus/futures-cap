const hypercore = require('@geut/hypercore-promise')
const ram = require('random-access-memory')
const feed = hypercore(ram, {valueEncoding: 'json'})
const replicate = require('@hyperswarm/replicator-web')

feed.on('ready', () => {
	console.log(`Using key: ${feed.key.toString('hex')}`)
	replicate(feed, { live: true, wsProxy: 'ws://localhost:4977'} )
})

feed.createReadStream({
	live: true
}).on('data', (data) => {
	console.log('data')
	console.log(data)
	// if(!IS_HOST) socket.emit('hz_message', data);
})

// listen on append events
feed.on('append', async () => {
  console.log(await feed.head(0))
})

export default feed