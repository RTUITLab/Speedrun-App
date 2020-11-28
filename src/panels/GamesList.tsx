import React, { Component, Dispatch, SetStateAction, useImperativeHandle } from 'react';
import logo from '../logo.svg'
import {Panel, PanelHeader, List, Cell, Avatar, Search, PanelHeaderBack} from '@vkontakte/vkui';

import { GamesService } from '../api/services/GamesService';
import type { GameCompact } from '../api/models/GameCompact';
import { Icon24Filter } from '@vkontakte/icons';

type GamesListProps = {
    id: string,
    platform: string | null,
    sort: string | null,
    unofficial: boolean,
    setActiveModal: Dispatch<SetStateAction<any>>,
    goBack: (e: any) => void,
    ref?
}

type GamesListState = {
    gList: Array<GameCompact> | null,
    gameTitle: string
}

class GamesList extends Component<GamesListProps, GamesListState> {
    constructor(props) {
        super(props);
        this.state = { gList: null, gameTitle: "" };
    }

    async componentDidMount() {
        if (this.state.gList == null) {
            const data = await GamesService.getCompactGames(undefined, this.props.platform, this.props.sort, this.props.unofficial);
            this.setState({ gList: data });
        }
    }

    async filter() {
        const data = await GamesService.getCompactGames(undefined, this.props.platform, this.props.sort, this.props.unofficial);
        this.setState({ gList: data });
    }

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({gameTitle: e.target.value.toLowerCase()});
    };

    render() {
    return (
        <Panel id={this.props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={this.props.goBack} data-to="startPage" />}>
                Игры
            </PanelHeader>
            <Search autoFocus onChange={(e) => this.onChange(e)} icon={<Icon24Filter/>}
                    onIconClick={() => this.props.setActiveModal('filter')}/>
            <List>
                {this.state.gList && this.state.gList
                .filter(g => g.title?.toLowerCase().indexOf(this.state.gameTitle) !== -1)
                .map(g => <Cell key={g.id} before={<Avatar style={{
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