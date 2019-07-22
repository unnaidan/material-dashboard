import React, { Component } from 'react'
import {
    Box,
    Grid
} from '@material-ui/core'


export default class BaseTableActions extends Component {
    render() {
        const { children } = this.props

        return (
            <div>
                <Box mb={3}>
                    <Grid
                        justify="flex-end"
                        spacing={2}
                        container
                    >
                        {children}
                    </Grid>
                </Box>
            </div>
        )
    }
}
