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
import FormatCurrency from './FormatCurrency'
import FormatDate from './FormatDate'

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

const BooleanFormatter = ({ value }) => (
    <span>
        {value ? 'Тийм' : 'Үгүй'}
    </span>
)

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

const BooleanTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={BooleanFormatter}
        {...props}
    />
)

class BaseTable extends Component {
    static defaultProps = {
        dateColumns: [],
        booleanColumns: [],
        currencyColumns: []
    }

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

        this.setState({ selection })

        this.props.dispatch({
            type: 'SELECT',
            items: selectedRowsData
        })
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
        const { path } = this.props

        try {
            const {
                total,
                currentPage,
                data
            } = await axios.get(path, {
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
        const {
            columns,
            dateColumns,
            booleanColumns,
            currencyColumns,
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
                    placeholder="Хайх утга оруулна уу"
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
                        selection={selection}
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
                    <BooleanTypeProvider
                        for={booleanColumns}
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

const component = withStyles(styles)(BaseTable)

export default connect(
    null,
    null
)(component)
