import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
import { withTheme } from 'styled-components';
import { Container, Header, Table, Tab, Loader } from 'semantic-ui-react'
import { buttonBackgroundColor, buttonTextColor, tableTextColor, defaultTheme } from '../themes/';
import PortalView from './PortalView'

@withTheme
@inject( "store" )
@observer class PortalList extends Component {
    render() {
        return (
            <Table basic="very" className={'light-table'} celled >
                <Table.Header >
                  <Table.Row >
                    <Table.HeaderCell style={ {color: defaultTheme[this.props.theme.mode]}}>#</Table.HeaderCell>
                    <Table.HeaderCell style={ {color: defaultTheme[this.props.theme.mode]}}>Portal Name</Table.HeaderCell>
                    <Table.HeaderCell style={ {color: defaultTheme[this.props.theme.mode]}}>Last Price</Table.HeaderCell>
                    <Table.HeaderCell style={ {color: defaultTheme[this.props.theme.mode]}}>History</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                {this.props.store.contractStore.portals.map((portal, index) => {
                  return <PortalView portal={portal} key={index} index={index} />
                })}
                </Table.Body>
            </Table>
        )
    }
}

export default PortalList;