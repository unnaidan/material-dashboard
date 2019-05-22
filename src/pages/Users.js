import React, { Component } from 'react'
import { Dashboard } from './../layouts'

export default class Users extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Хэрэглэгч'
        }
    }
    
    render() {
        const { title } = this.state

        return (
            <Dashboard title={title}>
                <div>Users</div>
            </Dashboard>
        )
    }
}
