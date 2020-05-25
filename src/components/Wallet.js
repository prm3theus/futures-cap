import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
import { withTheme } from 'styled-components';
import { Input, Button, Segment } from 'semantic-ui-react'
import { buttonBackgroundColor, buttonTextColor, tableTextColor, defaultTheme } from '../themes/';

@withTheme
@inject( "store" )
@observer class Wallet extends Component {

    render() {
        console.log();
        return (
            <>
                {`Account: ${this.props.store.contractStore.account}, Balance: ${this.props.store.contractStore.balance}`}                
                
            </>
        )
    }
}


export default Wallet;
