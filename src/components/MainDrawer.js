import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    Drawer,
    Hidden,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core'
import {
    Home,
    Account
} from 'mdi-material-ui'
import { ThemeContext } from './../theme/context'

const drawerWidth = 260

const styles = theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#43425d'
    },
    drawerToolbar: {
        height: 56,
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0
    },
    listItem: {
        paddingTop: 16,
        paddingBottom: 16
    },
    listItemActive: {
        position: 'relative',
        backgroundColor: theme.palette.action.selected,

        '&:before': {
            content: "''",
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: 5,
            backgroundColor: '#a3a0fb'
        },
        '& $listItemIcon': {
            color: '#a3a0fb'
        }
    },
    listItemText: {
        color: '#fff'
    },
    listItemIcon: {
        color: '#a5a4bf'
    }
})

class MainDrawer extends Component {
    static contextType = ThemeContext

    constructor(props) {
        super(props)

        this.state = {
            items: [
                {
                    to: '/',
                    label: 'Нүүр',
                    icon: <Home />
                },
                {
                    to: '/users',
                    label: 'Хэрэглэгч',
                    icon: <Account />
                }
            ]
        }
    }

    render() {
        const {
            drawer,
            mobileDrawer,
            toggleMobileDrawer
        } = this.context
        const { classes } = this.props
        const { items } = this.state

        const drawerContent = (
            <div>
                <div className={classes.drawerToolbar}>
                    <img
                        height="30"
                        className={classes.drawerImage}
                        src="/images/logo-white.png"
                        alt="Logo"
                    />
                </div>
                <List
                    className={classes.list}
                    component="nav"
                >
                    {items.map(({ to, label, icon }, index) =>
                        <ListItem
                            to={to}
                            key={index}
                            component={NavLink}
                            className={classes.listItem}
                            activeClassName={classes.listItemActive}
                            button
                            exact
                        >
                            <ListItemIcon className={classes.listItemIcon}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={label}
                                classes={{
                                    primary: classes.listItemText,
                                }}
                            />
                        </ListItem>
                    )}
                </List>
            </div>
        )

        return (
            <div>
                <Hidden xsDown implementation="css">
                    <Drawer
                        variant="persistent"
                        anchor="left"
                        className={classes.drawer}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        open={drawer}
                    >
                        {drawerContent}
                    </Drawer>
                </Hidden>
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={mobileDrawer}
                        onClose={toggleMobileDrawer}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawerContent}
                    </Drawer>
                </Hidden>
            </div>
        )
    }
}

export default withStyles(styles)(MainDrawer)
