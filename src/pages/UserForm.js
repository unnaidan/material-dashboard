import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import {
    Grid,
    TextField
} from '@material-ui/core'
import { Dashboard } from './../layouts'
import axios from './../plugins/axios'

const styles = theme => ({
    //
})

class UserForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Хэрэглэгч',
            fetching: false,
            name: '',
            email: ''
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    handleChange = name => e => {
        this.setState({
            [name]: e.target.value
        })
    }

    fetchData = async () => {
        this.setState({
            fetching: true
        })

        const { match } = this.props
        const { id } = match.params

        try {
            const { data } = await axios.get(`/users/${id}`)

            this.setState({
                name: data.name,
                email: data.email
            })

            this.setState({
                fetching: false
            })
        } catch (e) {
            //
        }
    }

    render() {
        const {
            title,
            name,
            email
        } = this.state

        return (
            <Dashboard title={title}>
                <TextField
                    label="Нэр"
                    value={name}
                    onChange={this.handleChange('name')}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="И-мэйл хаяг"
                    value={email}
                    onChange={this.handleChange('email')}
                    type="email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(UserForm)
