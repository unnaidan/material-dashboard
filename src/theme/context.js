import React from 'react'

export const ThemeContext = React.createContext({
    drawer: true,
    mobileDrawer: false,
    toggleDrawer: () => { },
    toggleMobileDrawer: () => { }
})
