import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
    Divider,
    LinearProgress,
    InputBase,
    Paper
} from '@material-ui/core'
import { Magnify } from 'mdi-material-ui'
import {
    SearchState,
    SortingState,
    SelectionState,
    PagingState,
    IntegratedSelection,
    CustomPaging,
} from '@devexpress/dx-react-grid'
import {
    Grid,
    Table,
    TableHeaderRow,
    TableSelection,
    PagingPanel
} from '@devexpress/dx-react-grid-material-ui'
import axios from './../plugins/axios'
import { setSelection } from './../redux/actions'

const styles = theme => ({
    paper: {
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
    },
    search: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: theme.spacing.unit * 8,
        color: 'rgba(0, 0, 0, 0.54)'
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

const tableMessages = {
    noData: 'Дата байхгүй'
}

class BaseTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            selection: [],
            search: '',
            fetching: false,
            sortBy: 'created',
            sortOrder: 'desc',
            page: 1,
            rowsPerPage: 30,
            total: 0
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    select = selection => {
        const { items } = this.state
        const selectedRowsData = items.filter((item, i) => selection.indexOf(i) !== -1)

        this.props.setSelection(selectedRowsData)
        this.setState({ selection })
    }

    handleSearch = e => {
        this.setState({
            search: e.target.value
        }, () => {
            this.fetchData()
        })
    }

    sort = sorting => {
        const {
            direction,
            columnName
        } = sorting.shift()

        this.setState({
            sortBy: columnName,
            sortOrder: direction
        }, () => {
            this.fetchData()
        })
    }

    paginate = page => {
        this.setState({
            page: page + 1
        }, () => {
            this.fetchData()
        })
    }

    fetchData = async () => {
        this.setState({
            fetching: true
        })

        const {
            sortBy,
            sortOrder,
            search,
            page,
            rowsPerPage
        } = this.state

        try {
            const {
                total,
                currentPage,
                data
            } = await axios.get('users', {
                params: {
                    sortBy,
                    sortOrder,
                    search,
                    page: page,
                    rowsPerPage
                }
            })

            this.setState({
                items: data,
                fetching: false,
                page: currentPage,
                total
            })
        } catch (e) {
            //
        }
    }

    render() {
        const {
            items,
            selection,
            search,
            fetching,
            sortBy,
            sortOrder,
            page,
            rowsPerPage,
            total
        } = this.state
        const { columns, classes } = this.props

        const HeaderCell = props => (
            <TableHeaderRow.Cell
                {...props}
                style={{
                    fontSize: 14
                }}
            />
        )

        const BodyCell = props => (
            <Table.Cell
                {...props}
                style={{
                    fontSize: 14,
                    fontWeight: 300
                }}
            />
        )

        const SearchBar = (
            <div style={{
                position: 'relative'
            }}>
                <div className={classes.search}>
                    <Magnify />
                </div>
                <InputBase
                    classes={{
                        root: classes.inputRoot,
                        input: classes.input
                    }}
                    value={search}
                    onChange={this.handleSearch}
                    type="search"
                    placeholder="Хайх утга оруулна уу"
                    fullWidth
                />
            </div>
        )

        return (
            <Paper
                className={classes.paper}
                square
            >
                {SearchBar}
                <Divider />
                {fetching && <LinearProgress />}
                <Grid
                    rows={items}
                    columns={columns}
                >
                    <SearchState value={search} />
                    <SortingState
                        sorting={[{ columnName: sortBy, direction: sortOrder }]}
                        onSortingChange={this.sort}
                    />
                    <PagingState
                        currentPage={page - 1}
                        onCurrentPageChange={this.paginate}
                        pageSize={rowsPerPage}
                    />
                    <CustomPaging totalCount={total} />
                    <SelectionState
                        selection={selection}
                        onSelectionChange={this.select}
                    />
                    <IntegratedSelection />
                    <PagingPanel />
                    <Table
                        messages={tableMessages}
                        cellComponent={BodyCell}
                    />
                    <TableHeaderRow
                        cellComponent={HeaderCell}
                        showSortingControls
                    />
                    <TableSelection
                        selectByRowClick
                        showSelectAll
                    />
                </Grid>
            </Paper>
        )
    }
}

const mapDispatchToProps = {
    setSelection
}

const component = withStyles(styles)(BaseTable)

export default connect(
    null,
    mapDispatchToProps
)(component)
