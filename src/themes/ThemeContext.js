import React from "react";
import styled, { ThemeProvider } from 'styled-components';
import { backgroundColor, textColor } from './index';
import { observer, inject } from "mobx-react";

const ThemeToggleContext = React.createContext();

export const useTheme = () => React.useContext( ThemeToggleContext );

export const MyThemeProvider = inject( "store" )( observer( ( { children, store } ) => {

    const [ themeState, setThemeState ] = React.useState( {
        mode: 'light'
    } );

    const Wrapper = styled.div `
    background-color: ${backgroundColor};
    color: ${textColor};
  `;

    const toggle = () => {
        console.log( 'Toggle Store' );
        console.log( store );
        const mode = ( themeState.mode === 'light' ? `dark` : `light` );
        setThemeState( { mode: mode } );
        store.changeTheme( mode )
    };

    return (
        <ThemeToggleContext.Provider value={{ toggle: toggle }}>
        <ThemeProvider
          theme={{
            mode: themeState.mode
          }}
        >
        <Wrapper>
          {children}
        </Wrapper>
      </ThemeProvider>
    </ThemeToggleContext.Provider>
    );
} ) )

export default ThemeProvider;