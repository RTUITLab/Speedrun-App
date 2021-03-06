import React, { CSSProperties, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Avatar, Cell, Footer, Panel, PanelHeader, Div, HorizontalScroll, Banner, Switch, View, Spinner } from '@vkontakte/vkui'
import CardGrid from "@vkontakte/vkui/dist/components/CardGrid/CardGrid";
import Card from "@vkontakte/vkui/dist/components/Card/Card";
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import { SwipeableList, SwipeableListItem } from "@sandstreamdev/react-swipeable-list";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import { AccountService, Game, GamesService, PulseService } from "../api";
import { FavoriteService } from "../services/FavoritesService";
import mc from "../img/MineCraft.jpg";
import { Icon24User } from "@vkontakte/icons";
import GamePage from "./GamePage";
import bridge from "@vkontakte/vk-bridge";

type User = {
    name: string,
    photo_200: string,
    url: string
}

const ProfilePage = (props) => {
    const [favoriteGames, setFavoriteGames] = useState<Array<Game> | null>(null);
    const [activeView, setActiveView] = useState<string>('profile');
    const [checkBox, setCheckBox] = useState<boolean>(false);
    const [changeGame, setChangeGame] = useState<Game | null>(null);
    const [boolTrack, setBoolTrack] = useState<boolean>(false);

    const [subscriptions, setSubscriptions] = useState<Array<User>>([]);
    const [subscribers, setSubscribers] = useState<Array<User>>([]);


    const onChangeToCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {

        setRunner(!checkBox).then(() => setCheckBox(!checkBox))
    }

    const itemStyle = {
        flexShrink: 0,
        width: 80,
        height: 94,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 12
    } as CSSProperties;

    async function setRunner(isRunner) {
        await AccountService.setIsRunner(isRunner);
    }

    useEffect(() => {
        AccountService.isRunner().then((b) => {
            setCheckBox(b);
        });
        async function fetchGamesList() {


            if (favoriteGames == null) {
                const data = await FavoriteService.getFavoriteGames();

                setFavoriteGames(data);
            }
        }


        fetchGamesList().then(r => console.log("Done"));
        if (!boolTrack)
        fetchSubscriptions();
    })

    const fetchSubscriptions = async () => {
        const subscriptions = await PulseService.getMySubscriptions();
        const subscribers = await PulseService.getMySubscribers();
        const token = await (await bridge.send("VKWebAppGetAuthToken", { "app_id": 7679570, "scope": "" })).access_token;

        const responce1 = (await bridge.send("VKWebAppCallAPIMethod", {
            "method": "users.get",
            "params": { "user_ids": subscriptions.join(','), "v": "5.126", "access_token": token, "fields": "photo_200" }
        })).response;
        const responce2 = (await bridge.send("VKWebAppCallAPIMethod", {
            "method": "users.get",
            "params": { "user_ids": subscribers.join(','), "v": "5.126", "access_token": token, "fields": "photo_200" }
        })).response;
        let m1: Array<User> = [];
        let m2: Array<User> = [];
        responce1.forEach(user => {
            m1.push({
                name: [user.first_name, user.last_name].join(' '),
                photo_200: user.photo_200,
                url: "https://vk.com/id" + user.id
            });
        });
        responce2.forEach(user => {
            m2.push({
                name: [user.first_name, user.last_name].join(' '),
                photo_200: user.photo_200,
                url: "https://vk.com/id" + user.id
            });
        });
        setSubscriptions(m1);
        setSubscribers(m2);
        setBoolTrack(true);
    }

    async function deleteGameFromFavourite(id: string): Promise<void> {
        const newList: Array<string> = [];
        favoriteGames!.filter(G => G.id !== id).forEach(G => {
            newList.push(G.id || '');
        });
        await FavoriteService.setFavoriteGames(newList);

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
        <View id={props.id} activePanel={activeView}>
            <Panel id='profile'>
                <PanelHeader>Профиль</PanelHeader>
                <Group separator="hide">
                    <CardGrid>
                        <Card size="l">
                            <div>
                                <Header mode="secondary">Избранные игры</Header>
                            </div>
                            <Div>
                                {favoriteGames && favoriteGames.length == 0 && (<Group>
                                    Вы еще не добавили игры в избранное. Найдите то, что вам по душе и сделайте
                                    свайп вправо!
                                </Group>)}
                                {favoriteGames && favoriteGames.length > 0 && (
                                    <SwipeableList>
                                        {favoriteGames && favoriteGames.map(g =>
                                            <SwipeableListItem
                                                key={g.id}
                                                swipeLeft={{
                                                    content: <Cell><Div style={{ color: '#ff5c5c' }}>Удалить из
                                                        избранного</Div></Cell>,
                                                    action: () => deleteGameFromFavourite(g.id || "")
                                                }}
                                            >
                                                <Cell key={g.id} style={{ marginTop: 0, marginLeft: 3 }}
                                                    before={<Avatar mode="image" src={getLinkForGame(g)} />}
                                                    onClick={() => {
                                                        setChangeGame(g);
                                                        setActiveView('gameInfo');
                                                    }}>
                                                    <div style={{ width: "100$", textAlign: "center" }}>
                                                        <div style={{ float: "left" }}>
                                                            {g.names?.international || "no name"}
                                                        </div>
                                                    </div>
                                                </Cell>
                                            </SwipeableListItem>
                                        )}
                                    </SwipeableList>
                                ) || <Group><Spinner /></Group>}

                            </Div>
                        </Card>
                    </CardGrid>
                </Group>
                <Group header={<Header mode="secondary">{checkBox ? "Мои доны" : "Помогают"}</Header>} separator="hide">
                    <HorizontalScroll>
                        <div style={{ display: 'flex' }}>
                            {
                                subscribers.map(m => (
                                    <div style={{ ...itemStyle, paddingLeft: 4, textAlign: 'center' }}>
                                        <Avatar size={64} style={{ marginBottom: 8 }} src={m.photo_200}> </Avatar>
                                        {m.name}
                                    </div>
                                ))
                            }
                        </div>
                    </HorizontalScroll>
                </Group>
                <Group header={<Header mode="secondary">Слежу за</Header>} separator="hide">
                    <HorizontalScroll>
                        <div style={{ display: 'flex' }}>
                            {
                                subscriptions.map(m => (
                                    <div style={{ ...itemStyle, paddingLeft: 4, textAlign: 'center' }}>
                                        <Avatar size={64} style={{ marginBottom: 8 }} src={m.photo_200}> </Avatar>
                                        {m.name}
                                    </div>
                                ))
                            }
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
                                backgroundColor: '#3e96ff',
                            }}
                        />
                    }
                />

                {checkBox && (
                    <Banner
                        mode="image"
                        header="Мои гайды"
                        subheader="Здесь хранятся понравившиеся вам гайды по гличам и скипам в играх."
                        background={
                            <div
                                style={{
                                    backgroundColor: '#7c3eff',
                                    backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/WPSU_Barnstar.svg/216px-WPSU_Barnstar.svg.png)',
                                    backgroundPosition: 'right center',
                                    backgroundSize: 50,
                                    backgroundRepeat: 'no-repeat',

                                }}
                            />
                        }
                    />
                )}

                <Group>
                    <Cell asideContent={<Switch onChange={onChangeToCheckBox} checked={checkBox} />}>
                        Я раннер
                    </Cell>

                </Group>
            </Panel>
            <Panel id='gameInfo'>
                <GamePage id='gameInfo' goTo={(a) => setActiveView('profile')}
                    game={{ id: changeGame?.id, gameName: changeGame?.names?.international }} />
            </Panel>
        </View>
    )
}

ProfilePage.prototype = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired
}


export default ProfilePage;