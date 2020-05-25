import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
import { withTheme } from 'styled-components';
import { Input, Button, Segment } from 'semantic-ui-react'
import { buttonBackgroundColor, buttonTextColor, tableTextColor, defaultTheme } from '../themes/';

const FutureInput = (props) => <Input onChange={(ev, data) => {
    props.store.contractStore.updateTotal(Number(data.value))
}} disabled={props.disabled} icon='ethereum' placeholder='0.0' />

const TakeInput = (props) => <Input onChange={(ev, data) => {
    // props.store.contractStore.takeTotal(Number(data.value))
}} disabled={props.disabled} icon='ethereum' placeholder='0.0' />

const ethers = require('ethers');

@withTheme
@inject( "store" )
@observer class ExitWidget extends Component {

    approve = () => {
        console.log('approve')
        this.props.store.contractStore.approve();
    }

    makeAndSign = async () => {
        console.log('MAKE')
        await this.props.store.contractStore.make();
        this.props.store.feedStore.add(this.props.store.contractStore.future);
    }

    takeAndBuild = () => {
        console.log('TAKE')
        this.props.store.contractStore.take();
    }

    render() {
        console.log();
        return (
            <>
              <Segment.Group horizontal className={this.props.theme.mode} >
                {/*Approve account for transferFrom*/}
                <Segment color='black' style={{textAlign: "left"}}><span style={{paddingRight: '20px'}}>Transfer Approval</span><Button onClick={this.approve}>Approve</Button> </Segment>
                {/*make future*/}

                {
                    this.props.store.uiStore.panel == 'portals' ? 
                    <Segment color='black' style={{textAlign: "left"}}>
                        <span style={{paddingRight: '20px', color: 'black !important'}}>$10 for <b>14D Exit</b> Contracts</span>
                        <FutureInput store={this.props.store} disabled={this.props.store.uiStore.make} />&nbsp;&nbsp;&nbsp;
                        <Button disabled={this.props.store.uiStore.make} onClick={this.makeAndSign}>Make</Button> 
                        <span styles={{display: 'flex', textAlign: "right !important"}}>
                            <span style={{marginLeft: '20px'}}><b>Total:</b> <span style={{width: '50px', margin: '20px'}}>{this.props.store.contractStore.makeTotal} {' for '} { this.props.store.contractStore.id ? this.props.store.contractStore.id : null}</span></span>
                            <span style={{display: 'inline-block', textAlign: 'right'}}>{this.props.store.uiStore.approved ? <div>✔️</div> : null }</span>
                        </span>
                    </Segment>

                    :
                    <Segment color='black' style={{textAlign: "left"}}>
                        <span style={{paddingRight: '20px', color: 'black !important'}}>Take </span>
                        {/*<TakeInput />&nbsp;&nbsp;&nbsp; */}
                        <Button disabled={this.props.store.uiStore.take} onClick={this.takeAndBuild}>Take</Button>

                        <span styles={{display: 'flex'}}>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.store.contractStore.future.thing} @ ${this.props.store.contractStore.future.value}</span>
                            {/*<span style={{marginLeft: '20px', display: 'inline-block'}}><b>Total:</b> <span style={{width: '50px', margin: '20px'}}>{this.props.store.contractStore.takeContract}</span></span>*/}
                            <span style={{display: 'inline-block', textAlign: 'right'}}>{this.props.store.uiStore.approved ? <div>✔️</div> : null }</span>
                        </span>

                        </Segment>
                }
                {/* get from list*/}
              </Segment.Group>
            </>
        )
    }
}


export default ExitWidget;
