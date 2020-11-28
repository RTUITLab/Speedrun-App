import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Footer from '@vkontakte/vkui/dist/components/Footer/Footer';
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import {Avatar, Cell, CardScroll, Search} from '@vkontakte/vkui'

import './Persik.css';
import mc from '../img/MineCraft.jpg';
import {Stream, StreamsService} from "../api";

const StartPage = props => {
    const [streamsList, setStreamsList] = useState<Array<Stream> | null>(null)

    useEffect(() => {
        async function fetchGamesList() {
            if (streamsList == null) {
                const data = await StreamsService.getStreams()
                setStreamsList(() => data);
            }
        }

        fetchGamesList().then(r => console.log("Done"));
    })

    return (
        <Panel id={props.id}>
            <PanelHeader>
                Обзор спидранов
            </PanelHeader>

            <Search onClick={e => props.goTo('gameList')} />

            <Group separator="hide">
                <CardGrid>
                    <Card size="l">
                        <div style={{display: "grid", gridTemplateColumns: "85% 15%"}}>
                            <Header mode="secondary" style={{float: "left"}}>Избранные игры</Header>
                            <Header mode="secondary" style={{float: "right"}}>Any%</Header>
                        </div>

                        <div style={{height: 300}}>
                            <Cell style={{marginTop: 0, marginLeft: 3}} before={<Avatar mode="image" src={mc}/>}>
                                <div style={{width: "100$", textAlign: "center"}}>
                                    <div style={{float: "left"}}>
                                        MineCraft
                                    </div>
                                    <div style={{float: "right"}}>
                                        <div style={{fontSize: "16px"}}>13m 54c</div>
                                        <div style={{fontSize: "12px"}}>-22s</div>
                                    </div>
                                </div>
                            </Cell>
                            <Cell style={{marginTop: 10, marginLeft: 3}} before={<Avatar mode="image" src={mc}/>}>
                                <div style={{width: "100$", textAlign: "center"}}>
                                    <div style={{float: "left", verticalAlign: "middle"}}>
                                        MineCraft
                                    </div>
                                    <div style={{float: "right", verticalAlign: "middle"}}>
                                        <div style={{fontSize: "16px"}}>13m 54c</div>
                                        <div style={{fontSize: "12px"}}>-22s</div>
                                    </div>
                                </div>
                            </Cell>
                            <Cell style={{marginTop: 10, marginLeft: 3}} before={<Avatar mode="image" src={mc}/>}>
                                <div style={{width: "100$", textAlign: "center"}}>
                                    <div style={{float: "left", verticalAlign: "middle"}}>
                                        MineCraft
                                    </div>
                                    <div style={{float: "right", verticalAlign: "middle"}}>
                                        <div style={{fontSize: "16px"}}>13m 54c</div>
                                        <div style={{fontSize: "12px"}}>-22s</div>
                                    </div>
                                </div>
                            </Cell>
                            <Cell style={{marginTop: 10, marginLeft: 3}} before={<Avatar mode="image" src={mc}/>}>
                                <div style={{width: "100$", textAlign: "center"}}>
                                    <div style={{float: "left", verticalAlign: "middle"}}>
                                        MineCraft
                                    </div>
                                    <div style={{float: "right", verticalAlign: "middle"}}>
                                        <div style={{fontSize: "16px"}}>13m 54c</div>
                                        <div style={{fontSize: "12px"}}>-22s</div>
                                    </div>
                                </div>
                            </Cell>


                        </div>
                    </Card>
                </CardGrid>
            </Group>
            <Group style={{paddingBottom: 8}} header={<Header mode="secondary">Популярные стримы</Header>}>
                <CardScroll>
                    {streamsList &&
                    streamsList.map(s =>
                        <Card key={s.id} size="s">
                            <div style={{width: 224, height: 225}}>
                                <img alt='previewImg' style={{objectFit: "cover", borderRadius: 5, width: 224, height: 135}} src={s?.previewImage || mc}/>
                                <Cell style={{marginTop: 0, marginLeft: 3}} before={<Avatar mode="image" src={s?.gameCoverImage || mc}/>}>
                                    <div style={{width: "100$", textAlign: "left"}}>
                                        <div style={{fontSize: "16px"}}>{s.nickName}</div>
                                        <div style={{fontSize: "12px"}}>{s.streamTitle}</div>
                                        <div style={{fontSize: "12px"}}>{s.watchingCount} watching</div>
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
                        <div style={{display: "grid", gridTemplateColumns: "80% 20%"}}>
                            <Header mode="secondary" style={{float: "left"}}>Последние раны</Header>
                            <Header mode="secondary" style={{float: "right"}}>Сегодня</Header>
                        </div>
                        <div style={{height: 260}}>
                            <Cell style={{marginTop: 0, marginLeft: 3}} before={<Avatar mode="image" src={mc}/>}>
                                <div style={{width: "100$", textAlign: "center"}}>
                                    <div style={{float: "left"}}>
                                        <div style={{fontSize: "16px"}}>Ashes of Outland</div>
                                        <div style={{fontSize: "12px"}}>srd_27</div>
                                    </div>
                                    <div style={{float: "right"}}>
                                        <div style={{fontSize: "12px"}}>13m 54c</div>
                                        <div style={{fontSize: "10px"}}>-22s</div>
                                        <div style={{fontSize: "10px"}}>-22s</div>
                                    </div>
                                </div>
                            </Cell>


                        </div>
                    </Card>
                </CardGrid>
            </Group>
            <Footer>Property of RTUITLab</Footer>
        </Panel>
    );
};

StartPage.propTypes = {
    id: PropTypes.string.isRequired,
    goTo: PropTypes.func.isRequired
};

export default StartPage;
