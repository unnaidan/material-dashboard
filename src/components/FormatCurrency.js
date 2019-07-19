import React, { Component } from 'react'

export default class FormatCurrency extends Component {
    render() {
        const { value } = this.props

        return (
            <span>
                {value && value.toLocaleString('mn-MN')}
            </span>
        )
    }
}
