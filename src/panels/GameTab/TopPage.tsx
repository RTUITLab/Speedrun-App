import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {LeaderBoardsService, Leaderboard, GamesService, Category} from '../../api';
import Table from 'react-bootstrap/Table'

const TopPage = (props) => {

    const [leadboard, setLeadboard] = useState<Leaderboard | null>(null)
    const [categories, setCategories] = useState<Array<Category> | null>(null)
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
            }
        }
    })


    return (
        <Table striped bordered hover size="sm" variant="dark">
            <thead>
            <tr>
                <th>Место</th>
                <th>Игрок</th>
                <th>Время</th>
                <th>Платформа</th>
            </tr>
            </thead>
            <tbody>
            {leadboard !== null && leadboard.runs && leadboard.runs.map(r => {
                <tr>
                    <td>{r.place}</td>
                    <td>{r.run && r.run.players && r.run.players[0].name}</td>
                    <td>{r.run && r.run.times && r.run.times}</td>
                    <td>{leadboard.platform}</td>
                </tr>
            })}
            </tbody>
        </Table>
    )
}

TopPage.prototype = {
    id: PropTypes.string.isRequired
}

export default TopPage;