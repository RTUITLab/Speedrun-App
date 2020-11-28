import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import logo from '../logo.svg'
import {Panel, PanelHeader, List, Cell, Avatar, Search} from '@vkontakte/vkui';

import {GamesService} from '../api/services/GamesService';
import type { GameCompact } from '../api/models/GameCompact';

const GamesList = props => {
    const [gamesList, setGamesList] = useState<Array<GameCompact> | null>(null)
    useEffect(() => {
        async function fetchGamesList() {
            if (gamesList == null) {
                const data = await GamesService.getCompactGames();
                setGamesList(() => data);
            }
        }

        fetchGamesList().then(r => console.log("Done"));
    })

    return (
        <Panel id={props.id}>
            <PanelHeader>Игры</PanelHeader>
            <Search />
            <List>
                {gamesList !== null &&
                gamesList.map(g =>
                    <Cell key={g.id} before={<Avatar style={{objectFit: "cover"}} size={80} mode="image" src={g.image ? g.image : logo}/>} onClick={() => {
                        console.log("keke");
                    }}>
                        {g.title}
                    </Cell>
                )}
            </List>
        </Panel>
    )
};

GamesList.propTypes = {
    id: PropTypes.string.isRequired
}

export default GamesList;