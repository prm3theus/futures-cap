import React from 'react';
import './App.css';

import Feed from './Feed';

import { Container, Header, Table, Tab, Loader } from 'semantic-ui-react'
import { observer, inject } from "mobx-react";
import styled, { ThemeProvider } from 'styled-components';
import { withTheme } from 'styled-components';
import { useTheme, } from './themes/ThemeContext';
import { buttonBackgroundColor, buttonTextColor, tableTextColor, defaultTheme } from './themes/';
import { Dropdown } from 'semantic-ui-react'

// custom components
import PortalList from './components/PortalList'
import FuturesList from './components/FuturesList'
import ExitWidget from './components/ExitWidget'
import Wallet from './components/Wallet'

import { useDencrypt } from "use-dencrypt-effect";

const values = ["MissingNo.", "futures"];

const options = {
  chars: ["_"]
}

const Title = () => {
  const { result, dencrypt } = useDencrypt(options);


  React.useEffect(() => {
    let i = 0;

    const action = setInterval(() => {
      dencrypt(values[i]);

      i = i === values.length - 1 ? 0 : i + 1;
    }, 2000);

    return () => clearInterval(action);
  }, []);

  return <div styles={{fontFamily: "Roboto, monospace"}}>{result}</div>;
};



function App (props) {

  let _isDark = false;

  const renderFuturesTable = () => {
    props.store.uiStore.changePanel('futures')

    return (<FuturesList/>)
  }

  const renderThingsTable = () => {
    props.store.uiStore.changePanel('things')

    return (<ThingsList/>)
  }

  const renderPortalTable = () => {
      console.log(props.store.networkStore.isLoading)
        if ( props.store.networkStore.isLoading == true) {
            return <Loader size="huge" active />
        }
        props.store.uiStore.changePanel('portals')

        return ( <PortalList /> )
    }

  const handleClick = () => {
        props.store.changeTheme( 'dark' )
        _isDark = !_isDark

        // this.setState( {
        //     isDark: !this.state.isDark
        // } )
        // var body = document.getElementById( "body" );
        // var currentClass = body.className;
        // body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
    }

  const handleChange = ( e, value ) => {
        e.persist();
        props.store.networkStore.setFilterByCity( e.target.textContent )
    }


        console.log( 'RENDERING' );
        const isDark = _isDark ? "light-mode" : "dark-mode"
        // console.log( isDark );

        const themeToggle = useTheme();

        const Button = styled.button `
          background: ${buttonBackgroundColor};
          border: none;
          font-family: 'Consolas' !important;
          border-radius: 0.3em;
          box-shadow: none;
          color: ${buttonTextColor};
          cursor: pointer;
          font-size: 1em;
          padding: 0.5em 1em;
        `;
        return (
            <Container id="app" className={{ isDark }} styles={{height: '100%'}}>
          <br />
            <Header className={{isDark}} size="large" align="center" style={ {color: defaultTheme[props.theme.mode]}}>
              <Title />
            </Header>

              <Button onClick={() => themeToggle.toggle()}>
                { props.theme.mode === 'dark' ? "Switch to Clear Mode 🌞" : "Switch to Dark Mode 🌛" }
              </Button>
              <br />
              <br />
   
  
                <Tab
                className={props.theme.mode}
                  panes={[
                    {
                      menuItem: 'portals',
                      render: renderPortalTable
                    },                    {
                      menuItem: 'futures',
                      render: renderFuturesTable
                    }
                  ]}
                />

                {
                  ! props.store.networkStore.isLoading ? (
                  <>
                    <br/>
                    <p className="info">
                      * all data comes from p2p services
                    </p>
                    <br/>
                  </>
                ) : null
              }
              <hr/>
              <ExitWidget />
              <Wallet />
            </Container>
        )
  // }
}

export default inject( "store" )(observer(withTheme(App)));
