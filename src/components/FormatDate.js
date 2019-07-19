import React, { Component } from 'react'
import { format } from 'date-fns'

export default class FormatDate extends Component {
    render() {
        const { value } = this.props

        return (
            <span>
                {value && format(new Date(value), 'yyyy-MM-dd hh:mm:ss')}
            </span>
        )
    }
}
