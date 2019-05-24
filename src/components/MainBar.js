import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
    Menu as MenuIcon,
    Account
} from 'mdi-material-ui'
import {
    Hidden,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem
} from '@material-ui/core'
import { removeAuth } from './../redux/auth/actions'
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
    title: {
        flexGrow: 1,
        fontWeight: 400,
        color: '#43425d'
    },
    drawerButton: {
        marginRight: 20
    },
    menuButton: {
        color: '#43425d',
        backgroundColor: '#f5f5f5'
    },
    menuItem: {
        minWidth: 200 - theme.spacing.unit * 4
    }
})

class MainBar extends Component {
    static contextType = ThemeContext

    constructor(props) {
        super(props)

        this.state = {
            anchor: null
        }
    }

    openMenu = e => {
        this.setState({
            anchor: e.currentTarget
        })
    }

    closeMenu = () => {
        this.setState({
            anchor: null
        })
    }

    render() {
        const {
            drawer,
            toggleDrawer,
            toggleMobileDrawer
        } = this.context
        const {
            removeAuth,
            classes,
            title
        } = this.props
        const { anchor } = this.state

        return (
            <AppBar
                color="inherit"
                position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: drawer
                })}
            >
                <Toolbar className={classes.toolBar}>
                    <Hidden xsDown implementation="css">
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={toggleDrawer}
                            className={classes.drawerButton}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Hidden smUp implementation="css">
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={toggleMobileDrawer}
                            className={classes.drawerButton}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.title}
                    >
                        {title}
                    </Typography>
                    <IconButton
                        aria-owns={anchor ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                        onClick={this.openMenu}
                        className={classes.menuButton}
                    >
                        <Account />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        open={!!anchor}
                        onClose={this.closeMenu}
                        anchorEl={anchor}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem
                            className={classes.menuItem}
                            onClick={removeAuth}
                        >
                            Гарах
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapDispatchToProps = {
    removeAuth
}

const component = withStyles(styles)(MainBar)

export default connect(
    null,
    mapDispatchToProps
)(component)
