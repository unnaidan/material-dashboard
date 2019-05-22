import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    Divider,
    InputBase,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Paper,
    Checkbox
} from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'

const styles = theme => ({
    paper: {
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
    },
    search: {
        position: 'relative'
    },
    searchIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: theme.spacing.unit * 8
    },
    inputRoot: {
        padding: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 8
    },
    input: {
        height: 16,
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit
    }
})

class BaseTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            selected: [],
            page: 1,
            rowsPerPage: 25,
            fetching: false
        }
    }

    select = id => (event, checked) => {
        const { selected } = this.state
        const item = selected.find(item => item.id === id)
    }

    selectAll = (event, checked) => {
        if (checked) {
            this.setState(state => ({
                selected: state.items
            }))
        } else {
            this.setState({
                selected: []
            })
        }
    }

    selected = (id) => {
        return this.state.selected.findIndex(({ item }) => item === id) !== -1
    }

    changePage = () => {

    }

    changeRowsPerPage = () => {
        
    }

    render() {
        const {
            items,
            selected,
            page,
            rowsPerPage,
            loading
        } = this.state
        const {
            columns,
            classes
        } = this.props

        return (
            <Paper
                className={classes.paper}
                square
            >
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        classes={{
                            root: classes.inputRoot,
                            input: classes.input
                        }}
                        type="search"
                        fullWidth
                    />
                </div>
                <Divider />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={false}
                                    indeterminate={false}
                                    onChange={this.selectAll}
                                />
                            </TableCell>
                            {columns.map(
                                item => {
                                    const { name, label } = item

                                    return (
                                        <TableCell
                                            align="left"
                                            padding="default"
                                            sortDirection="asc"
                                            key={name}
                                        >
                                            <TableSortLabel
                                                active={false}
                                                direction="asc"
                                                onClick={this.select}
                                            >
                                                {label}
                                            </TableSortLabel>
                                        </TableCell>
                                    )
                                }
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(
                            (item, i) => {
                                const { id } = item
                                const selected = this.selected(id)

                                return (
                                    <TableRow
                                        onClick={this.select}
                                        selected={selected}
                                        key={i}
                                        hover
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={selected} />
                                        </TableCell>
                                        {columns.map(
                                            (column, i) => {
                                                const { name } = column

                                                return (
                                                    <TableCell
                                                        align="left"
                                                        key={i}
                                                    >
                                                        {item[name]}
                                                    </TableCell>
                                                )
                                            }
                                        )}
                                    </TableRow>
                                )
                            }
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={items.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[10, 25]}
                    onChangePage={this.changePage}
                    onChangeRowsPerPage={this.changeRowsPerPage}
                    SelectProps={{
                        variant: 'outlined'
                    }}
                />
            </Paper>
        )
    }
}

export default withStyles(styles)(BaseTable)
