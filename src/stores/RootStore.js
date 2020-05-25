// import MarketStore from "./MarketStore";
// import FeedStore from "./FeedStore";
import FeedStore from "./FeedStore";
import ContractStore from "./ContractStore";
import NetworkStore from "./NetworkStore";
import UIStore from "./UIStore";
import { observable, action, configure, computed, runInAction, extendObservable, flow } from "mobx";


export default class RootStore {
    config;
    marketStore;
    networkStore;
    uiStore;
    feedStore;
    theme;

    constructor( config = {} ) {
        this.config = config;
        this.contractStore = new ContractStore( this, {
            contractAddress: "0x893917d9fc2fda976fbd9e6ac2d8a2c0afbbeeb8", 
            futureAddress: "0x9DbA2A47f96C10a27B22C76d9903a573bEd57136",
            privateKey: '', // local
            // privateKey: '' // kovan
        } );
        this.networkStore = new NetworkStore( this );
        // this.marketStore = new MarketStore( this, config);
        this.uiStore = new UIStore( this );
        this.feedStore = new FeedStore( this )
        runInAction( () => {
            // this.networkStore.read( '' )
            this.changeTheme( 'light' )
        } )
    }

    @action
    changeTheme( theme ) {
        console.log( `Changing THEME: ${theme}` );
        this.theme = theme
        this.networkStore.setFilterByTheme( theme )
    }
}