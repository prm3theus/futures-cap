import { observable, action, computed, runInAction, flow, autorun } from "mobx";

let counter = 0;

export default class NetworkStore {
    client;
    @observable rootStore;
    @observable isLoading = false;
    @observable goods = [];
    @observable filteredGoods = [];
    @observable filteredMerchants = [];
    @observable theme = null;
    @observable city = 'All';
    @observable feedConnected = false;

    constructor( rootStore, url ) {

        runInAction( () => {
            this.rootStore = rootStore;
            this.theme = rootStore.theme;
            // Load Default goods
        })
    }

    @action
    setLoading( isLoading ) {
        this.isLoading = isLoading;
    }

    @action
    setFilterByCity( city ) {
        console.log( `setting city: ${city}` );
        this.city = city;
        this.updateFilter();
    }

    @action
    updateFilter() {
        const self = this;
        console.log( 'updating filters' );
        this.filteredGoods = this.goods.filter( good => {
            // console.log(good.location.slice().find( l => self.city ))

            // if city is all, filter on category
            if(self.city == 'All'){
                console.log()
                return good.category == self.rootStore.theme
            }
            // else, concat filter criteria
            else {
                return good.category == self.rootStore.theme && good.location.slice().includes(self.city)
            }
            // if ( good.category == self.rootStore.theme ) {
            // } else if ( !good.hasOwnProperty( 'category' ) ) {
            //     return good
            // }
        } )
    }

    @action
    setFilterByTheme( theme ) {
        console.log( 'changing theme' );
        this.theme = theme
        this.updateFilter();
    }

    @computed
    get merchantList() {
        return this.filteredMerchants;
    }

    @computed
    get goodsList() {

        return this.filteredGoods;
    }

    // // @action
    read = flow( function*( query ) {

    } )

}