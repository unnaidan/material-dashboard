import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { theme } from './theme/muiTheme'
import Routes from './routes'

export default () => (
    <MuiThemeProvider theme={theme}>
        <Routes />
    </MuiThemeProvider>
)
