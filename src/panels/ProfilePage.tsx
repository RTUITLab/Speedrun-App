import React, {CSSProperties, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Avatar, Cell, Footer, Panel, PanelHeader, Div, HorizontalScroll, Banner} from '@vkontakte/vkui'
import CardGrid from "@vkontakte/vkui/dist/components/CardGrid/CardGrid";
import Card from "@vkontakte/vkui/dist/components/Card/Card";
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import {SwipeableList, SwipeableListItem} from "@sandstreamdev/react-swipeable-list";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import {Game, StreamsService} from "../api";
import {FavoriteService} from "../services/FavoritesService";
import mc from "../img/MineCraft.jpg";
import {Icon24User} from "@vkontakte/icons";

const ProfilePage = (props) => {
    const [favoriteGames, setFavoriteGames] = useState<Array<Game> | null>(null);

    const itemStyle = {
        flexShrink: 0,
        width: 80,
        height: 94,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 12
    } as CSSProperties;

    useEffect(() => {
        async function fetchGamesList() {
            if (favoriteGames == null) {
                const data = await FavoriteService.getFavoriteGames();

                setFavoriteGames(data);
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

    const getLinkForGame = (game: Game): string => {
        if (game.assets) {
            if (game.assets["cover-large"]) {
                if (game.assets["cover-large"].uri) {
                    return game.assets["cover-large"].uri;
                }
            }
        }
        return mc;
    }

    return (
        <Panel>
            <PanelHeader>Профиль</PanelHeader>
            <Group separator="hide">
                <CardGrid>
                    <Card size="l">
                        <div>
                            <Header mode="secondary">Избранные игры</Header>
                        </div>
                        <Div>
                            {favoriteGames && favoriteGames.length > 0 && (
                                <SwipeableList>
                                    {favoriteGames && favoriteGames.map(g =>
                                        <SwipeableListItem
                                            key={g.id}
                                            swipeLeft={{
                                                content: <Cell>Удалить из избранного</Cell>,
                                                action: () => deleteGameFromFavourite(g.id || "")
                                            }}
                                        >
                                            <Cell key={g.id} style={{marginTop: 0, marginLeft: 3}}
                                                  before={<Avatar mode="image" src={getLinkForGame(g)}/>}>
                                                <div style={{width: "100$", textAlign: "center"}}>
                                                    <div style={{float: "left"}}>
                                                        {g.names?.international || "no name"}
                                                    </div>
                                                </div>
                                            </Cell>
                                        </SwipeableListItem>
                                    )}
                                </SwipeableList>
                            ) || (
                                <Cell>
                                    Вы еще не добавили игры в избранное. Найдите то, что вам по душе и сделайте
                                    свайп вправо!
                                </Cell>
                            )}

                        </Div>
                    </Card>
                </CardGrid>
            </Group>
            <Group  header={<Header mode="secondary">Мои доны</Header>} separator="hide">
                <HorizontalScroll>
                    <div style={{ display: 'flex' }}>
                        <div style={{ ...itemStyle, paddingLeft: 4 }}>
                            <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                            Элджей
                        </div>
                        <div style={itemStyle}>
                            <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                            Ольга
                        </div>
                        <div style={itemStyle}>
                            <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                            Сергей
                        </div>
                        <div style={itemStyle}>
                            <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                            Илья
                        </div>
                        <div style={itemStyle}>
                            <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                            Алексей
                        </div>
                        <div style={itemStyle}>
                            <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                            Костя
                        </div>
                        <div style={itemStyle}>
                            <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                            Миша
                        </div>
                        <div style={{ ...itemStyle, paddingRight: 4 }}>
                            <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                            Вадим
                        </div>
                    </div>
                </HorizontalScroll>
            </Group>
            <Group  header={<Header mode="secondary">Слежу за</Header>} separator="hide">
                <HorizontalScroll>
                <div style={{ display: 'flex' }}>
                    <div style={{ ...itemStyle, paddingLeft: 4 }}>
                        <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                        Элджей
                    </div>
                    <div style={itemStyle}>
                        <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                        Ольга
                    </div>
                    <div style={itemStyle}>
                        <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                        Сергей
                    </div>
                    <div style={itemStyle}>
                        <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                        Илья
                    </div>
                    <div style={itemStyle}>
                        <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                        Алексей
                    </div>
                    <div style={itemStyle}>
                        <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                        Костя
                    </div>
                    <div style={itemStyle}>
                        <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                        Миша
                    </div>
                    <div style={{ ...itemStyle, paddingRight: 4 }}>
                        <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                        Вадим
                    </div>
                </div>
                </HorizontalScroll>
            </Group>

            <Banner
                mode="image"
                header="Избранные гайды"
                subheader="Здесь хранятся понравившиеся вам гайды по гличам и скипам в играх."
                background={
                    <div
                        style={{
                            backgroundColor: '#65c063',
                            backgroundImage: 'url(https://sun9-59.userapi.com/7J6qHkTa_P8VKRTO5gkh6MizcCEefz04Y0gDmA/y6dSjdtPU4U.jpg)',
                            backgroundPosition: 'right bottom',
                            backgroundSize: 320,
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                }
            />
        </Panel>
    )
}

ProfilePage.prototype = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired
}


export default ProfilePage;