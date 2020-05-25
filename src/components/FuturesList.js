import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
import { withTheme } from 'styled-components';
import { Container, Header, Table, Tab, Loader } from 'semantic-ui-react'
import { buttonBackgroundColor, buttonTextColor, tableTextColor, defaultTheme } from '../themes/';
import FutureView from './FutureView'

@withTheme
@inject( "store" )
@observer class FuturesList extends Component {
    render() {
        console.log();
        return (
            <Table basic="very" className={'light-table'} celled >
        <Table.Header >
          <Table.Row >
            <Table.HeaderCell style={ {color: defaultTheme[this.props.theme.mode]}}>#</Table.HeaderCell>
            <Table.HeaderCell style={ {color: defaultTheme[this.props.theme.mode]}}>Future</Table.HeaderCell>
            <Table.HeaderCell style={ {color: defaultTheme[this.props.theme.mode]}}>Taken</Table.HeaderCell>
            <Table.HeaderCell style={ {color: defaultTheme[this.props.theme.mode]}}>Value</Table.HeaderCell>
            <Table.HeaderCell style={ {color: defaultTheme[this.props.theme.mode]}}>Expiry</Table.HeaderCell>
            {/*<Table.HeaderCell style={ {color: defaultTheme[this.props.theme.mode]}}>Total Supply</Table.HeaderCell>*/}
            <Table.HeaderCell style={ {color: defaultTheme[this.props.theme.mode]}}>Index</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {this.props.store.feedStore.futures.map((future, index) => {
          return <FutureView future={future} key={index} index={index} />
        })}
        </Table.Body>
      </Table>
        )
    }
}


export default FuturesList;
