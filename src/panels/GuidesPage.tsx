import React, { Component, Dispatch, SetStateAction, useImperativeHandle } from 'react';
import logo from '../logo.svg'
import image from './MineCraft.jpg'
import {Panel, PanelHeader, List, Cell, Avatar, Search, PanelHeaderBack, View, Button, Text} from '@vkontakte/vkui';
import Icon20FavoriteOutline from '@vkontakte/icons/dist/20/favorite_outline';
import Icon12OnlineVkmobile from '@vkontakte/icons/dist/12/online_vkmobile';
import Icon20FavoriteCircleFillYellow from '@vkontakte/icons/dist/20/favorite_circle_fill_yellow';

import GamePage from './GamePage'

import { GamesService } from '../api/services/GamesService';
import type { GameCompact } from '../api/models/GameCompact';
import { Icon24Filter } from '@vkontakte/icons';

type GuidesPageProps = {
    id: string,
    goBack: (e: any) => void,
}

type GuidesPageState = {
    gList: Array<GameCompact> | null,
    gameTitle: string,
    activeView: string,
    setGame: GameCompact | null,
    startClicked: Boolean,
    guides: Array<Boolean>
}

class GuidesPage extends Component<GuidesPageProps, GuidesPageState> {

    constructor(props) {
        super(props);
        this.state = { gList: null, gameTitle: "", activeView: "list" , setGame: null, startClicked: false,
            guides: [false,false,false,false,false]};
    }

    async componentDidMount() {
        if (this.state.gList == null) {
            const data = null;
            this.setState({ gList: data });
        }
    }

    async filter() {
        const data = null;
        this.setState({ gList: data });
    }

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({gameTitle: e.target.value.toLowerCase()});
    };

    goBack(str: string) {
        this.setState({activeView: str});
    }

    changeStar(el: number){
        var tmp = [...this.state.guides];
        tmp[el] = !tmp[el];
        this.setState({guides: tmp});
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
                    onIconClick={() => {}}/>

            {[...Array(this.state.guides.length)].map((el, index) =>
                (<div style={{position: "relative", padding: "12px"}}>
                <img src={image} style={{height: 170, width:"100%", borderRadius:6, objectFit:"cover", opacity: "0.5"}}/>
                {(this.state.guides[index])?(
                <div style={{position: "absolute", right:"20px", top:"20px"}}>
                    <Icon20FavoriteCircleFillYellow onClick={() => this.changeStar(index)}/>
                </div>) :
                (<div style={{position: "absolute", right:"20px", top:"20px"}}>
                    <Icon20FavoriteOutline onClick={() => this.changeStar(index)}/>
                </div>)
                }
                <div style={{position: "absolute", fontSize: 20, width: "80%", left:"50%", top:"30%", transform: "translate(-50%, -50%)", textAlign:"center"}}>Как начать путь в контакте?</div>
                <div style={{position: "absolute", fontSize: 14, width: "80%", left:"50%", top:"48%", transform: "translate(-50%, -50%)", textAlign:"center"}}>RTU IT Lab</div>
                <div style={{ background: '#232323', position: "absolute", fontSize: 28, left:"50%", top:"70%", transform: "translate(-50%, -50%)" }}>
                    <Button before={<Icon12OnlineVkmobile/>} mode="overlay_primary">
                        <div style={{marginLeft:"5px"}}>Читать</div>
                    </Button>
                </div>
            </div>))}

            {/*getting data*/}
            <List>
                {this.state.gList && this.state.gList
                .filter(g => g.title?.toLowerCase().indexOf(this.state.gameTitle) !== -1)
                .map(g => <Cell key={g.id} before={<Avatar style={{
                    objectFit: "cover"
                }} size={80} mode="image" src={g.image ? g.image : logo} />} onClick={() => {
                    this.setState({activeView: 'test', setGame: g})
                }}>
                    {g.title}
                </Cell>)}
            </List>
        </Panel>
            <Panel id='test'>
                <GamePage id='test' goTo={(a) => this.goBack(a)} game={this.state.setGame}/>
            </Panel>
        </View>);
    }

}

export default GuidesPage;