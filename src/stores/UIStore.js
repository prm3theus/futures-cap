import { observable, action, runInAction } from "mobx";

export default class UIStore {
    @observable theme = null
    @observable make = null
    @observable take = null
    @observable panel = null
    @observable approved = null

    constructor( theme ) {
        runInAction( () => {
            this.theme = theme;
            this.make = true;
            this.take = true;
            this.panel = 'portals';
        } )
    }

    @action
    makeToggle( ) {
        console.log('make')
        this.make = !this.make;
    }

    @action
    takeToggle( ) {
        this.take = !this.take;
    }

    @action
    approve( ) {
        this.approved = true;

        setTimeout(() => {
            this.approved = false;
        }, 2000)
    }

    @action
    changePanel(panel) {
        this.panel = panel;
    }

    changeTheme( theme ) {
        console.log( theme );
        this.theme = theme;
    }
}