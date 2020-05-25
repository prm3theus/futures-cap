import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from "mobx-react";

import RootStore from './stores/index'
import styled, { ThemeProvider } from 'styled-components';
// import themes from './themes/index'
import { MyThemeProvider, } from "./themes/ThemeContext";

// import theme from 'styled-theming';

const rootStore = new RootStore( )

// const boxBackgroundColor = theme( 'mode', {
//     light: '#fff',
//     dark: '#000',
// } );
// const Box = styled.div `
//   background-color: ${boxBackgroundColor};
// `;

ReactDOM.render(
    <Provider store={rootStore}> 
		<React.Fragment>
			<MyThemeProvider >
			{/*<ThemeProvider theme={{ mode: rootStore.theme }}>*/}
				{/*<Box>*/}
			 	<App />
				{/*</Box>*/}
			 {/*</ThemeProvider>*/}
			</MyThemeProvider >
		 </React.Fragment>
	 </Provider>, document.getElementById( 'root' ) )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();