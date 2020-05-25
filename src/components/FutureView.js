import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
import { withTheme } from 'styled-components';
import { Container, Header, Table, Tab, Loader } from 'semantic-ui-react'
import { buttonBackgroundColor, buttonTextColor, tableTextColor, defaultTheme } from '../themes/';

import Trend from 'react-trend';

const MyTrend = (props) => <Trend
    smooth
    autoDraw
    autoDrawDuration={3000}
    autoDrawEasing="ease-out"
    data={[0,2,5,9,5,10,3,5,0,0,1,8,2,9,0]}
    gradient={['orange', '#FF0']}
    radius={10}
    strokeWidth={2}
    strokeLinecap={'round'}
    width={200} height={100}
  />;


@withTheme
@inject( 'store' )
@observer class FutureView extends Component {

    componentDidMount = () => {

    }

    select = (future) => {
        console.log('selecting sig / future')
        // console.log(sig)
        this.props.store.contractStore.selectFuture(future)
        this.props.store.uiStore.takeToggle()

    }

    strike = (future) => {
        this.props.store.contractStore.strike(future)
        // console.log(future)
    }

    render() {
        const { future, index } = this.props;
        // console.log(future)
        // console.log(this.props.store.contractStore.future.clock < this.props.store.contractStore.future.expiry)
        // console.log(this.props.store.contractStore.future.expiry)
        // console.log(this.props.store.contractStore.clock)
        return (
            // return ( this.props.store.marketStore.products.map( ( product, index ) => (
            <Table.Row
                key={index}
                style={ {color: defaultTheme[this.props.theme.mode]}}
                onClick={() => this.select(future)}
              >
                <Table.Cell>{index + 1}</Table.Cell> 

                <Table.Cell>
                  {future.thing + "ay"}
                </Table.Cell>

                <Table.Cell>
                  {this.props.store.contractStore.taken}
                </Table.Cell>

                <Table.Cell>
                  {"$"+Number(future.value).toFixed(0).toLocaleString()}
                </Table.Cell>

                {/*<Table.Cell>
                  ${Number(good.weightedPrice).toFixed(0).toLocaleString()}
                </Table.Cell>*/}

                <Table.Cell>
                  
                  <div onClick={this.strike(future)}>{this.props.store.contractStore.clock < future.expiry ? `⏲️` : `Ready to Strike 🎯`} </div>
                </Table.Cell>

                <Table.Cell>
                	<MyTrend />
                </Table.Cell>
              </Table.Row>
        )
    }
}

export default FutureView;
