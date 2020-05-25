 // const ram = require('random-access-memory')
// const replicate = require('@hyperswarm/replicator')
// const hypercore = require('hypercore')
import { observable, action, computed, runInAction, flow, autorun } from "mobx";

const hypercore = require('@geut/hypercore-promise')
const ram = require('random-access-memory')

const feed = hypercore(ram, {valueEncoding: 'json'})

// listen on append events
feed.on('append', async () => {
  console.log(await feed.head(0))
})

export default class FeedStore {

    @observable futures = []

    constructor(rootStore, config ) {
    	self = this
    	runInAction(() => {
            feed.createReadStream( { live: true } ).on('data', (data) => {
            	self.futures.push(data)
            })
    	})
	}

	async add(future) {
		console.log(future)
		await feed.append(future)
	}

}