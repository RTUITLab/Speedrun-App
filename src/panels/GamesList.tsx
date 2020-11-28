import React, { Component, Dispatch, SetStateAction, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import logo from '../logo.svg'
import { Panel, PanelHeader, List, Cell, Avatar, Search, PanelHeaderButton } from '@vkontakte/vkui';

import { GamesService } from '../api/services/GamesService';
import type { GameCompact } from '../api/models/GameCompact';
import { Icon24Filter } from '@vkontakte/icons';

type GamesListProps = {
    id: string,
    platform: string | null,
    sort: string | null,
    unofficial: boolean,
    setActiveModal: Dispatch<SetStateAction<any>>
}

type GamesListState = {
    gList: Array<GameCompact> | null
}

class GamesList extends Component<GamesListProps, GamesListState> {
    constructor(props) {
        super(props);
        this.state = { gList: null };
        console.log("HELLO WRODL");
    }

    async componentDidMount() {
        console.log("HELLO MOUNT");

        if (this.state.gList == null) {
            const data = await GamesService.getCompactGames(undefined, this.props.platform, this.props.sort, this.props.unofficial);
            this.setState({ gList: data });
        }
    }

    async componentDidUpdate(oldProps: GamesListProps) {
        if (this.state.gList == null ||
            oldProps.platform !== this.props.platform ||
            oldProps.sort !== this.props.sort ||
            oldProps.unofficial !== this.props.unofficial
        ) {
            const data = await GamesService.getCompactGames(undefined, this.props.platform, this.props.sort, this.props.unofficial);
            this.setState({ gList: data });
        }


    }

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (this.state.gList !== null) {
            const name = e.target.value.toLowerCase();
            // this.setState((old) => { gList: gamesList.filter(g => g.title ? g.title.toLowerCase().indexOf(name) > -1 : '')});
        }
    };

    render() {
        return (<Panel id={this.props.id}>
            <PanelHeader left={<PanelHeaderButton onClick={() => this.props.setActiveModal('filter')}><Icon24Filter /></PanelHeaderButton>}>Игры</PanelHeader>
            <Search onChange={this.onChange} />
            <List>
                {this.state.gList && this.state.gList.map(g => <Cell key={g.id} before={<Avatar style={{
                    objectFit: "cover"
                }} size={80} mode="image" src={g.image ? g.image : logo} />} onClick={() => {
                    console.log("keke");
                }}>
                    {g.title}
                </Cell>)}
            </List>
        </Panel>);
    }

}

export default GamesList;