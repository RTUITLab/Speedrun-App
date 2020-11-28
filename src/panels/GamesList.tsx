import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import logo from '../logo.svg'
import {Panel, PanelHeader, List, Cell, Avatar, Search} from '@vkontakte/vkui';

import {GamesService} from '../api/services/GamesService';
import type { GameCompact } from '../api/models/GameCompact';

const GamesList = props => {
    const [gamesList, setGamesList] = useState<Array<GameCompact> | null>(null)
    const [gList, sGList] = useState<Array<GameCompact>>([])

    useEffect(() => {
        async function fetchGamesList() {
            if (gamesList == null) {
                const data = await GamesService.getCompactGames();
                setGamesList(() => data);
                sGList(() => data);
            }
        }

        fetchGamesList().then(r => console.log("Done"));
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (gamesList !== null) {
            const name = e.target.value.toLowerCase();
            sGList(() => gamesList.filter(g => g.title ? g.title.toLowerCase().indexOf(name) > -1 : ''));
        }
    }

    return (
        <Panel id={props.id}>
            <PanelHeader>Игры</PanelHeader>
            <Search onChange={onChange}/>
            <List>
                {gList.length > 0  &&
                gList.map(g =>
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
    id: PropTypes.string.isRequired,
    setActiveModal: PropTypes.func,
    sort: PropTypes.string,
    platform: PropTypes.string,
    unoficial: PropTypes.bool
}

export default GamesList;