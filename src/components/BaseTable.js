import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import {
    Divider,
    LinearProgress,
    InputBase,
    TableSortLabel,
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
    DataTypeProvider
} from '@devexpress/dx-react-grid'
import {
    Grid,
    Table,
    TableHeaderRow,
    TableSelection,
    PagingPanel
} from '@devexpress/dx-react-grid-material-ui'
import axios from './../plugins/axios'
import {
    FormatCurrency,
    FormatDate
} from './../components'
import { debounced } from './../utils/helpers'

const styles = theme => ({
    paper: {
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
    },
    searchIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: theme.spacing(8),
        color: 'rgba(0, 0, 0, 0.54)'
    },
    inputRoot: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(8)
    },
    input: {
        height: 16,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    }
})

const tableMessages = {
    noData: 'Дата байхгүй'
}

const DateTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={FormatDate}
        {...props}
    />
)

const CurrencyTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={FormatCurrency}
        {...props}
    />
)

class BaseTable extends Component {
    static defaultProps = {
        dateColumns: [],
        currencyColumns: []
    }

    constructor(props) {
        super(props)

        this.state = {
            search: '',
            sortBy: 'created',
            sortOrder: 'desc',
            page: 1,
            rowsPerPage: 30,
            total: 0,
            fetching: false
        }
    }

    componentDidMount() {
        this.fetchData()
        this.select()
    }

    componentWillUnmount() {
        this.select()
        this.props.dispatch({
            type: 'SET_ITEMS',
            items: []
        })
    }

    select = (selects = []) => {
        this.props.dispatch({
            type: 'SELECT',
            selects
        })
    }

    handleSearch = e => {
        this.setState({
            search: e.target.value
        }, () => {
            debounced(this.fetchData)
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
            search,
            sortBy,
            sortOrder,
            page,
            rowsPerPage
        } = this.state
        const {
            path,
            customParams = {}
        } = this.props

        let params = {
            sortBy,
            sortOrder,
            search,
            page: page,
            rowsPerPage
        }

        params = {
            ...params, ...customParams
        }

        try {
            const {
                total,
                currentPage,
                data
            } = await axios.get(path, { params })

            this.props.dispatch({
                type: 'SET_ITEMS',
                items: data
            })

            this.setState({
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
            search,
            fetching,
            sortBy,
            sortOrder,
            page,
            rowsPerPage,
            total
        } = this.state
        const {
            columns,
            dateColumns,
            currencyColumns,
            items,
            selects,
            classes
        } = this.props
        const {
            paper,
            searchIcon,
            inputRoot,
            input
        } = classes

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

        const SortLabel = ({ onSort, children, direction }) => (
            <TableSortLabel
                onClick={onSort}
                children={children}
                active={!!direction}
                direction={direction || 'asc'}
            />
        )

        const SearchBar = (
            <div style={{
                position: 'relative'
            }}>
                <div className={searchIcon}>
                    <Magnify />
                </div>
                <InputBase
                    classes={{
                        root: inputRoot,
                        input: input
                    }}
                    value={search}
                    onChange={this.handleSearch}
                    type="search"
                    placeholder="Хайх"
                    fullWidth
                />
            </div>
        )

        return (
            <Paper
                className={paper}
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
                        selection={selects}
                        onSelectionChange={this.select}
                    />
                    <IntegratedSelection />
                    <PagingPanel />
                    <DateTypeProvider
                        for={dateColumns}
                    />
                    <CurrencyTypeProvider
                        for={currencyColumns}
                    />
                    <Table
                        messages={tableMessages}
                        cellComponent={BodyCell}
                    />
                    <TableHeaderRow
                        cellComponent={HeaderCell}
                        sortLabelComponent={SortLabel}
                        showSortingControls
                    />
                    <TableSelection showSelectAll />
                </Grid>
            </Paper>
        )
    }
}

const mapStateToProps = state => {
    const {
        items,
        selects
    } = state.theme

    return {
        items,
        selects
    }
}

export default connect(mapStateToProps)(withStyles(styles)(BaseTable))
