import React, { Component, Dispatch, SetStateAction, useImperativeHandle } from 'react';
import logo from '../logo.svg'
import {Panel, PanelHeader, List, Cell, Avatar, Search, PanelHeaderBack, View} from '@vkontakte/vkui';

import GamePage from './GamePage'

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
    gameTitle: string,
    activeView: string,
    setGame: GameCompact | null
}

class GamesList extends Component<GamesListProps, GamesListState> {
    constructor(props) {
        super(props);
        this.state = { gList: null, gameTitle: "", activeView: "list" , setGame: null};
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

    goBack(str: string) {
        this.setState({activeView: str});
    }

    render() {
    return (
        <View id={this.props.id} activePanel={this.state.activeView}>
        <Panel id='list'>

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
                    this.setState({setGame: g})
                    this.setState({activeView: 'test'})
                }}>
                    {g.title}
                </Cell>)}
            </List>
        </Panel>
                <Panel id='test'>
                <GamePage id='test' goTo={(a) => this.goBack(a)} game={{
                id: this.state.setGame?.id,
                gameName: this.state.setGame?.title
            }}/>
                </Panel>
        </View>);
    }

}

export default GamesList;