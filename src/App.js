import React from 'react'
import {
    Route,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom'
import {
    ForgotPassword,
    Home,
    Login,
    NotFound,
    PasswordReset,
    Register,
    Users
} from './pages'

export default () => {
    return (
        <Router>
            <Switch>
                <Route
                    path="/signin"
                    component={Login}
                />
                <Route
                    path="/signup"
                    component={Register}
                />
                <Route
                    path="/forgot/password"
                    component={ForgotPassword}
                />
                <Route
                    path="/password/reset/:token"
                    component={PasswordReset}
                />
                <Route
                    path="/"
                    component={Home}
                    exact
                />
                <Route
                    path="/users"
                    component={Users}
                />
                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}
