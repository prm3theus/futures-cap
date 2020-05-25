import theme from 'styled-theming';

export const backgroundColor = theme( 'mode', {
    light: '#fafafa',
    grey: '#fafafa',
    dark: '#222'
} );

export const textColor = theme( 'mode', {
    light: '#000',
    grey: '#fafafa',
    dark: '#fff'
} );

export const buttonBackgroundColor = theme( 'mode', {
    light: '#222',
    grey: '#fafafa',
    dark: '#eee'
} );

export const buttonTextColor = theme( 'mode', {
    light: '#eee',
    grey: '#fafafa',
    dark: '#222'
} );

export const tableTextColor = theme( 'mode', {
    light: '#000',
    dark: '#fff'
} );

export const tableFontStyle = theme( 'mode', {
    light: 'Roboto',
    grey: '#fafafa',
    dark: 'Consolas'
} );

export const defaultTheme = {
    light: '#222',
    grey: '#fafafa',
    dark: '#fafafa'
}