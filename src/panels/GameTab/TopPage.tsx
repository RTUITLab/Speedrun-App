import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {LeaderBoardsService, Leaderboard, GamesService, Category} from '../../api';
import BTable from 'react-bootstrap/Table'


import {useTable} from 'react-table'

function Table({columns, data}) {
    // Use the state and functions returned from useTable to build your UI
    const {getTableProps, headerGroups, rows, prepareRow} = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <BTable striped bordered hover size="sm" variant="dark" {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                                <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </BTable>
    )
}

const TopPage = (props) => {

    const [leadboard, setLeadboard] = useState<Leaderboard | null>(null)
    const [categories, setCategories] = useState<Array<Category> | null>(null)
    const [testA, setTestA] = useState<Array<leadbordTest>|null>([])
    useEffect(() => {

        async function fetchCategory() {
            if (categories === null) {
                const data = await GamesService.getCategories(props.id);
                setCategories(() => data);
            }
        }

        fetchCategory().then(r => {
            if (categories !== null) {

                fetchLeadboard()
            }
        })

        async function fetchLeadboard() {
            if (leadboard === null && categories !== null) {
                const data = await LeaderBoardsService.getLeaderboard(props.id, categories[0].id!);
                setLeadboard(() => data);
                testData(data);
            }
        }
    })

    const testData = (lb) => {
        const data = lb?.runs?.map(r => ({
            place: r.place+'',
            name: (r.run?.players ? r.run?.players[0].name : "") || "",
            time: (r.run?.times?.primary) || "",
            platform: leadboard?.platform+'',
            old: r
        })) as leadbordTest[];
        setTestA(data);
        console.log(data);
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Место',
                accessor: 'place'
            },
            {
                Header: 'Игрок',
                accessor: 'name'
            },
            {
                Header: 'Время',
                accessor: 'time'
            },
            {
                Header: 'Платформа',
                accessor: 'platform'
            }
        ],
        []
    )


    return (
        <div>
            <Table columns={columns} data={testA}/>
        </div>
    )
}

TopPage.prototype = {
    id: PropTypes.string.isRequired
}


export type leadbordTest = {
    place: string,
    name: string,
    time: string,
    platform: string
}

export default TopPage;