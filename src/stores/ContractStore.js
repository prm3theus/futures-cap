// import { observable, action, runInAction } from "mobx";
import { observable, action, computed, runInAction, flow, autorun } from "mobx";

// abis
import abi from '../contracts/abi.js';
import futuresAbi from '../contracts/futuresAbi.js';
import erc20Abi from '../contracts/erc20.js';

const hasher = require('ethereumjs-abi');

// ethereum connections
const ethers = require('ethers');
let provider = ethers.getDefaultProvider('kovan');
// let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);

export default class ContractStore {
    @observable rootStore;
    @observable theme = null
    @observable expiry = null
    @observable balance = null
    @observable contractAddress = null
    @observable tokenContract = null
    @observable futuresFactory = null
    @observable futureFactoryAddress = null
    @observable futuresFactoryWithAccount = null
    @observable contract = null
    @observable account = null
    @observable total = null
    @observable makeTotal = null
    @observable future = null
    @observable id = null
    @observable taken = null
    @observable clock = null
    @observable portals = []


    constructor(rootStore, config ) {
        this.rootStore = rootStore;
        this.contractAddress = config.contractAddress;
        this.futureFactoryAddress = config.futureAddress;

        // test chainlink client
        this.contract = new ethers.Contract(this.contractAddress, abi, provider);

        // futures contract
        this.futuresFactory = new ethers.Contract(config.futureAddress, futuresAbi, provider);

        this.decryptedWallet = new ethers.Wallet(config.privateKey, provider)
        this.account = this.decryptedWallet.address

        runInAction(() => {
            this.makeTotal = '$0';
            this.taken = false;
            setInterval(() => {
                this.clock = Number(((Date.now())/1000).toFixed(0))
                // console.log(this.clock)
            }, 1000)
        })



        this.futuresFactory.token().then(async (tokenAddress) => {
            console.log('tokenAddress')
            console.log(tokenAddress)

            // derive token contract
            this.tokenContract = new ethers.Contract(tokenAddress, erc20Abi, provider);

            // connect local wallet to contracts
            this.futuresFactoryWithAccount = this.futuresFactory.connect(this.decryptedWallet);
            this.tokenContractWithAccount = this.tokenContract.connect(this.decryptedWallet);

            try {
                this.balance = await this.tokenContract.balanceOf(this.account)
            }catch(e){
                console.log(e)
            }
        })

        // if (typeof web3 !== 'undefined') {
          // var web3Provider = new ethers.providers.Web3Provider(web3.currentProvider, ethers.providers.networks.ropsten);
          // provider.getBalance("0xfE9e7073ACb6a3505746D112DBDd9f4920D27aa9").then(function(balance) {
          //   var etherString = ethers.utils.formatEther(balance);
          //   console.log("Balance: " + etherString);
          // });
        // }


        // const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
        // const provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io')




        this.fetchPortals();
        this.token = config.tokenAddress
    }

    @action
    updateTotal(amount) {
        this.total = 10 * amount
        this.makeTotal = "$"+10 * amount
    }

    @action
    assignThing = (id) => {
        console.log(`assigning thing: ${id}`)
        this.id = id
    }

    @action
    approve = flow( function*() {
        console.log('calling from the store')
        // walletProvider = new ethers.providers.Web3Provider(web3.currentProvider)
        // const walletSigner = provider.getSigner()
        // console.log(walletSigner)

        // walletSigner.getAddress().then(address => {
        //     console.log('address')
        //     console.log(address)
        // })

        // approveAmmount
        const approveAmount = 100
        let res = yield this.tokenContractWithAccount.approve(this.futureFactoryAddress, approveAmount)
        console.log(res)
        let val = yield this.tokenContractWithAccount.allowance(this.account, this.futureFactoryAddress, )
        console.log(val.toString())
        console.log(this.account)
    })   

    @action
    make = flow( function*() {
        // let val = yield this.token.approve()
        const maker = this.account
        const value = this.total
        const thing = `${this.id}:14D`
        // ms -> seconds -> hours -> days;
        // const expiry = Date.now() + 1 * 1000 * 60 * 5
        const expiry = Number(((Date.now() + 1)/1000).toFixed(0)) + 5

        // const expiry = Date.now() + 1 * 1000 * 60 * 24 * 14
        this.expiry = expiry

        // Create Hashed Message
        const hash = "0x" + hasher.soliditySHA3([
            'address', 'uint256', 'string', 'uint256'
          ], [maker, value, thing, expiry]).toString('Hex');
        
        console.log('HASH')
        // console.log(hash)

        // Sign Transaction
        // const sig = await web3.eth.sign(hash, maker);
        const signedMessage = yield this.decryptedWallet.signMessage(hash)

        console.log(signedMessage)
        // function build(address _sellerAddr, uint256 _value, uint256 _expiry, bytes32 _thing, bytes32 _sig) payable external returns(bool done) {
        const future = {
          maker: maker,
          taker: "0x0000000000000000000000000000000000000000",
          value: value,
          thing: thing,
          expiry: expiry,
          terminated: false,
          sig: signedMessage
        }

        console.log(future)

        this.future = future
        this.rootStore.uiStore.approve()
        // post to swarm
        
    })

    @action
    selectFuture = flow( function*(future) {
        this.future = future
    })

    @action
    take = flow( function*() {

        // let val = yield this.token.approve()
        const maker = this.future.maker
        const value = this.future.value
        const thing = this.future.thing

        // ms -> seconds -> hours -> days;
        const expiry = this.future.expiry

        // get signature from swarm
        const sig = this.future.sig

        // build future object
        const futureObj = {
          maker: maker,
          taker: this.account,
          value: value,
          thing: thing,
          expiry: expiry,
          terminated: false
        }


        console.log(futureObj, sig)
        console.log('ready to pass to contract')
        this.rootStore.uiStore.approve()

        // pass to contract
        let tx;
        try{
            tx = yield this.futuresFactoryWithAccount.build(future, sig)

        console.log(tx)
        }catch(e){
        console.log(tx)

        }
        this.taken = true;
    })


        @action
    strike = flow( function*(id) {
        console.log('Strike from the store')
        let tx
        try{
            tx = yield this.futuresFactoryWithAccount.strike(id)
        }catch(e){
            console.log()
            console.log(e)
        }

    })



    @action
    fetchPortals = flow( function*() {
        let i = 0;
        let portals = []
        while(true){
            try {

                let val = yield this.contract.endpoints(i)
                console.log('val')
                console.log(val)
                portals.push(val)

                i++
            } catch ( e ) {
                console.log(e)
                break;
            }
        }

        for(var portal of portals){
            const status = yield this.contract.getStatus(portal)
            console.log(portal)
            console.log(status)
            this.portals.push({
                id: portal,
                status: status
            })
        }

        console.log(this.portals)

        this.rootStore.networkStore.setLoading( false )
    } )

}