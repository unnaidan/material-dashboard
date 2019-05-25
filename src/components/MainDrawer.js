import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    Avatar,
    Button,
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
import { removeAuth } from './../redux/auth/actions'
import { ThemeContext } from './../theme/context'

const drawerWidth = 260

const styles = theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    avatar: {
        width: 70,
        height: 70,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    button: {
        marginTop: 16,
        marginBottom: 8,
        borderColor: 'rgba(255, 255, 255, 0.23)',
        color: '#fff'
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#43425d'
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
        const {
            classes,
            removeAuth
        } = this.props
        const { items } = this.state
        const {
            root,
            avatar,
            button,
            drawerPaper,
            list,
            listItem,
            listItemActive,
            listItemText,
            listItemIcon
        } = classes

        const userArea = (
            <div style={{
                padding: 16
            }}>
                <Avatar
                    alt="Avatar"
                    src="/static/images/user.png"
                    className={avatar}
                />
                <Button
                    onClick={removeAuth}
                    className={button}
                    variant="outlined"
                    fullWidth
                >
                    Гарах
                </Button>
            </div>
        )

        const drawerContent = (
            <div>
                <List
                    className={list}
                    component="nav"
                >
                    {items.map(({ to, label, icon }, index) =>
                        <ListItem
                            to={to}
                            key={index}
                            component={NavLink}
                            className={listItem}
                            activeClassName={listItemActive}
                            button
                            exact
                        >
                            <ListItemIcon className={listItemIcon}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={label}
                                classes={{
                                    primary: listItemText,
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
                        className={root}
                        classes={{
                            paper: drawerPaper
                        }}
                        open={drawer}
                    >
                        {userArea}
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
                            paper: drawerPaper,
                        }}
                    >
                        {userArea}
                        {drawerContent}
                    </Drawer>
                </Hidden>
            </div>
        )
    }
}

const mapDispatchToProps = {
    removeAuth
}

const component = withStyles(styles)(MainDrawer)

export default connect(
    null,
    mapDispatchToProps
)(component)
