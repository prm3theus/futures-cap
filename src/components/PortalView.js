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
    data={props.data}
    gradient={['orange', '#FF0']}
    radius={10}
    strokeWidth={2}
    strokeLinecap={'round'}
    width={200} height={100}
  />;


@withTheme
@inject( 'store' )
@observer class PortalView extends Component {

    select = (id) => {
        console.log('select')
        console.log('heerre')
        this.props.store.uiStore.makeToggle()
        this.props.store.contractStore.assignThing(id)

    }

    render() {
        const { portal, index } = this.props;
        console.log(portal.status)
        const data = Object.values(portal.status).map((status) => Number(status))
        // const dat
        console.log('data')
        console.log(data)
        return (
            // return ( this.props.store.marketStore.products.map( ( product, index ) => (
            <Table.Row
                key={index}
                style={ {color: defaultTheme[this.props.theme.mode], cursor: 'pointer'}}
                onClick={() => this.select(portal.id)}
              >
                <Table.Cell>{index + 1}</Table.Cell> 

                <Table.Cell>
                  {portal.id}
                </Table.Cell>

                <Table.Cell>
                  $10
                </Table.Cell>


                {/*<Table.Cell>
                  ${Number(good.weightedPrice).toFixed(0).toLocaleString()}
                </Table.Cell>*/}

                <Table.Cell>

                  <MyTrend data={data} />

                </Table.Cell>
              </Table.Row>
        )
    }
}

export default PortalView;
