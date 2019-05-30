import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from './theme/muiTheme'
import Routes from './routes'

export default () => (
    <ThemeProvider theme={theme}>
        <Routes />
    </ThemeProvider>
)
