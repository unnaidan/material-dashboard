import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import { Button} from '@material-ui/core'
import { Plus } from 'mdi-material-ui'

const styles = theme => ({
    icon: {
        marginRight: theme.spacing(1)
    }
})

class ActionNewButton extends Component {
    render() {
        const { path } = this.props
        const { icon } = this.props.classes

        return (
            <Button
                to={path}
                component={Link}
                variant="contained"
                color="primary"
            >
                <Plus className={icon} />
                Шинэ
            </Button>
        )
    }
}

export default withStyles(styles)(ActionNewButton)
