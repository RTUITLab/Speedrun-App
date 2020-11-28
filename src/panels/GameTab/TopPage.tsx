import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {LeaderBoardsService, Leaderboard, GamesService, Category} from '../../api';
import './Table.css'

import {useTable} from 'react-table'

function Table({columns, data}) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <table {...getTableProps()} id='customers'>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
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
                setCategories(() => data.filter(d => d.type === 'per-game'));
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
            time: (r.run?.times.prettyTime) || "",
            platform: lb?.platform+'',
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