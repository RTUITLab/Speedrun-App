import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Avatar, Cell, Footer, Panel, PanelHeader, Div} from '@vkontakte/vkui'
import CardGrid from "@vkontakte/vkui/dist/components/CardGrid/CardGrid";
import Card from "@vkontakte/vkui/dist/components/Card/Card";
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import {SwipeableList, SwipeableListItem} from "@sandstreamdev/react-swipeable-list";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import {Game, StreamsService} from "../api";
import {FavoriteService} from "../services/FavoritesService";
import mc from "../img/MineCraft.jpg";

const ProfilePage = (props) => {
    const [favoriteGames, setFavoriteGames] = useState<Array<Game> | null>(null);


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
        </Panel>
    )
}

ProfilePage.prototype = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired
}


export default ProfilePage;