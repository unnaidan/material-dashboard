import React, { Component } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Menu as MenuIcon } from 'mdi-material-ui'
import {
    Hidden,
    Typography,
    AppBar,
    Toolbar,
    IconButton
} from '@material-ui/core'
import { ThemeContext } from './../theme/context'

const drawerWidth = 260

const styles = theme => ({
    appBar: {
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
    },
    toolBar: {
        minHeight: 56
    },
    appBarShift: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        },
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
    },
    typography: {
        flexGrow: 1,
        fontWeight: 400,
        color: '#43425d'
    },
    drawerButton: {
        marginRight: 20
    }
})

class MainBar extends Component {
    static contextType = ThemeContext

    render() {
        const {
            drawer,
            toggleDrawer,
            toggleMobileDrawer
        } = this.context
        const {
            classes,
            title
        } = this.props
        const {
            appBar,
            toolBar,
            appBarShift,
            typography,
            drawerButton
        } = classes

        return (
            <AppBar
                color="inherit"
                position="fixed"
                className={classNames(appBar, {
                    [appBarShift]: drawer
                })}
            >
                <Toolbar className={toolBar}>
                    <Hidden xsDown implementation="css">
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={toggleDrawer}
                            className={drawerButton}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Hidden smUp implementation="css">
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={toggleMobileDrawer}
                            className={drawerButton}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={typography}
                    >
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(MainBar)
