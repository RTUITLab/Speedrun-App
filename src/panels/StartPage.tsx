import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Footer from '@vkontakte/vkui/dist/components/Footer/Footer';
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import { Avatar, Cell, CardScroll, Search, Spinner, View } from '@vkontakte/vkui'
import { FavoriteService } from '../services/FavoritesService';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import mc from '../img/MineCraft.jpg';
import { Game, Stream, StreamsService, Run1 } from "../api";
import { Div } from '@vkontakte/vkui';
import GamePage from "./GamePage";
import { RunsService } from '../api/services/RunsService';
import { RunModel } from '../api/models/RunModel';

const StartPage = props => {
    const [streamsList, setStreamsList] = useState<Array<Stream> | null>(null);
    const [favoriteGames, setFavoriteGames] = useState<Array<Game> | null>(null);

    const [activeView, setActiveView] = useState<string>('main');
    const [changeGame, setChangeGame] = useState<{name: string | null | undefined,  id: string | null | undefined} | null>(null);
    const [latestRuns, setLatestRuns] = useState<Array<RunModel> | null>(null);

    useEffect(() => {
        async function fetchGamesList() {
            if (streamsList == null) {
                const data = await StreamsService.getStreams()
                setStreamsList(() => data);
                console.log(data);
            }
            if (favoriteGames == null) {
                const data = await FavoriteService.getFavoriteGames();

                setFavoriteGames(data);
            }
            if (latestRuns == null) {
                const data = await RunsService.getLatestRuns();
                setLatestRuns(data.slice(0, 3));
                console.log(data.slice(0, 3));
            }
        }

        fetchGamesList().then(r => console.log("Done"));
    })

    async function deleteGameFromFavourite(id: string): Promise<void> {
        const newList: Array<string> = [];
        favoriteGames!.filter(G => G.id !== id).forEach(G => {
            newList.push(G.id || '');
        });
        await FavoriteService.setFavoriteGames(newList);
        const saved = await FavoriteService.getFavoriteGameIds();

        setFavoriteGames(favoriteGames!.filter(G => G.id !== id));
    }

    const getLinkForGame = (game: any): string => {
        if (game) {
            if (game.assets) {
                if (game.assets["cover-large"]) {
                    if (game.assets["cover-large"].uri) {
                        return game.assets["cover-large"].uri;
                    }
                }
            }
        }
        return mc;
    }
    return (
        <View id={props.id} activePanel={activeView}>
            <Panel id='main'>
                <PanelHeader separator={false}>
                    Обзор спидранов
            </PanelHeader>

                <Search onClick={e => props.goTo('gameList')} />

                <Group separator="hide">
                    <CardGrid>
                        <Card size="l">
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 70px" }}>
                                <Header mode="secondary" style={{ textAlign: "center" }}>Избранные игры</Header>
                                <Header mode="secondary" style={{ textAlign: "center" }}>Any%</Header>
                            </div>

                            <div>
                                {favoriteGames && (
                                    <SwipeableList>
                                        {
                                            favoriteGames.map(g =>
                                                <SwipeableListItem
                                                    key={g.id}
                                                    swipeLeft={{
                                                        content: <Cell><Div style={{ color: '#ff5c5c' }}>Удалить из избранного</Div></Cell>,
                                                        action: () => deleteGameFromFavourite(g.id || "")
                                                    }}
                                                >
                                                    <Cell key={g.id} style={{ marginTop: 0, marginLeft: 3, width: '100%' }}
                                                        before={<Avatar mode="image" src={getLinkForGame(g)} />} onClick={() => {
                                                            setChangeGame({name: g.names?.international, id: g.id});
                                                            setActiveView('gameInfo');
                                                        }}>
                                                        <div style={{ width: "100$", textAlign: "center" }}>
                                                            <div style={{ float: "left" }}>
                                                                {g.names?.international || "no name"}
                                                            </div>
                                                            <div style={{ float: "right" }}>
                                                                <div style={{ fontSize: "16px" }}>13m 54c</div>
                                                                <div style={{ fontSize: "12px" }}>-22s</div>
                                                            </div>
                                                        </div>
                                                    </Cell>
                                                </SwipeableListItem>
                                            )
                                        }
                                    </SwipeableList>
                                    )
                                }
                                {favoriteGames?.length === 0 && <Group style={{padding: '10px'}}>
                                    Вы еще не добавили игры в избранное. Найдите то, что вам по душе и сделайте
                                    свайп вправо!
                            </Group>}
                                {!favoriteGames && <Cell style={{ textAlign: "center" }}><Spinner /></Cell>}
                            </div>
                        </Card>
                    </CardGrid>
                </Group>
                <Group style={{ paddingBottom: 8 }} header={<Header mode="secondary">Популярные стримы</Header>}>
                    <CardScroll>
                        {streamsList &&
                            streamsList.map(s =>
                                <Card key={s.id} size="s" onClick={() => props.goTo('video', s.twichUrl, 'startPage')}>
                                    <div style={{ width: 224, height: 225 }}>
                                        <img alt='previewImg' style={{ objectFit: "cover", borderRadius: 5, width: 224, height: 135 }} src={s?.previewImage || mc} />
                                        <Cell style={{ marginTop: 0, marginLeft: 3 }} before={<Avatar mode="image" src={s?.gameCoverImage || mc} />}>
                                            <div style={{ width: "100$", textAlign: "left" }}>
                                                <div style={{ fontSize: "16px" }}>{s.nickName}</div>
                                                <div style={{ fontSize: "12px" }}>{s.streamTitle}</div>
                                                <div style={{ fontSize: "12px" }}>{s.watchingCount} watching</div>
                                                {/*<div style={{fontSize: "12px"}}>{s.flagImage?.substring(38, s.flagImage?.length-4).toUpperCase()}</div>*/}
                                            </div>
                                        </Cell>
                                    </div>
                                </Card>
                            )}
                    </CardScroll>
                </Group>
                <Group separator="hide">
                    <CardGrid>
                        <Card size="l">
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 90px" }}>
                                <Header mode="secondary" style={{ textAlign: "center" }}>Последние раны</Header>
                                <Header mode="secondary" style={{ textAlign: "left" }}>Сегодня</Header>
                            </div>
                            <div style={{ height: 260 }}>
                                {!latestRuns && <Spinner />}
                                {latestRuns && latestRuns.map(r =>
                                    <Cell onClick={() => {
                                        setChangeGame({ id: r.game?.data?.id, name: r.game?.data?.names?.international });
                                        setActiveView('gameInfo');
                                    }} style={{ marginTop: 0, marginLeft: 3 }} before={<Avatar mode="image" src={getLinkForGame(r.game?.data)} />}>
                                        <div style={{ width: "100$", textAlign: "center" }}>
                                            <div style={{ float: "left" }}>
                                                <div style={{ fontSize: "16px" }}>{r.game?.data?.names?.international}</div>
                                                <div style={{ fontSize: "12px", textAlign:'left' }}>{r.players?.data ? r.players?.data[0].names?.international : ""}</div>
                                            </div>
                                            <div style={{ float: "right" }}>
                                                <div style={{ fontSize: "12px" }}>{r.times?.prettyTime}</div>
                                                {/* <div style={{ fontSize: "10px" }}>-22s</div>
                                                <div style={{ fontSize: "10px" }}>-22s</div> */}
                                            </div>
                                            {!favoriteGames && <Cell style={{ textAlign: "center" }}><Spinner /></Cell>}
                                        </div>
                                    </Cell>)}
                            </div>
                        </Card>
                    </CardGrid>
                </Group>
                <Footer>Property of RTUITLab</Footer>
            </Panel>
            <Panel id='gameInfo'>
                <GamePage id='gameInfo' goTo={(a) => setActiveView('main')} game={{ id: changeGame?.id, gameName: changeGame?.name }} />
            </Panel>
        </View>
    );
};

StartPage.propTypes = {
    id: PropTypes.string.isRequired,
    goTo: PropTypes.func.isRequired
};

export default StartPage;
