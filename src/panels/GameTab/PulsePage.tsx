import React, {Component, Dispatch, SetStateAction, useEffect,Fragment, useImperativeHandle, useRef, useState} from 'react';
import {
    Panel,
    PanelHeader,
    List,
    Cell,
    Avatar,
    Search,
    PanelHeaderBack,
    View,
    Button,
    Text,
    Group, WriteBar, WriteBarIcon, FixedLayout, Separator, Tabs, TabsItem, Counter, SimpleCell, UsersStack
} from '@vkontakte/vkui';
import {
    Icon24Filter,
    Icon28CameraOutline,
    Icon28KeyboardBotsOutline, Icon28MessageOutline,
    Icon28SmileOutline,
    Icon28VoiceOutline
} from '@vkontakte/icons';
import image from '../MineCraft.jpg'
import Icon28MoreHorizontal from '@vkontakte/icons/dist/28/more_horizontal';

type GuidesPageState = {
    text1: string,
    text3: string,
    activePanel: string,
    contextOpened: false,
    mode: string,
    activeTab5: string,
}

class PulsePage extends React.Component<{}, GuidesPageState>{

    constructor (props) {
        super(props);

        this.state = {
            text1: "",
            text3: "",
            activePanel: 'panel1',
            contextOpened: false,
            mode: 'all',
            activeTab5: 'all',
        };

    this.select = this.select.bind(this);
}

select(e) {
    const mode = e.currentTarget.dataset.mode;
    this.setState({ mode, contextOpened: false });
}

    render()
    {
        return (
            <Group>
                <Group>
                    <WriteBar
                        value={this.state.text1}
                        onChange={(e) => this.setState({text1: e.target.value})}
                        before={
                            <WriteBarIcon mode="attach"/>
                        }
                        after={
                            <Fragment>
                                <WriteBarIcon>
                                    <Icon28SmileOutline/>
                                </WriteBarIcon>

                                <WriteBarIcon>
                                    <Icon28CameraOutline/>
                                </WriteBarIcon>

                                <WriteBarIcon
                                    mode="send"
                                    disabled={this.state.text3.length === 0}
                                />
                            </Fragment>
                        }
                        placeholder="Сообщение"
                    />
                </Group>

                <Group id="panel5">

                    <Tabs mode="segmented">
                        <TabsItem
                            onClick={() => this.setState({activeTab5: 'all'})}
                            selected={this.state.activeTab5 === 'all'}
                        >
                            Все записи
                        </TabsItem>
                        <TabsItem
                            onClick={() => this.setState({activeTab5: 'runners'})}
                            selected={this.state.activeTab5 === 'runners'}
                        >
                            Раннеры
                        </TabsItem>
                        <TabsItem
                            onClick={() => this.setState({activeTab5: 'viewers'})}
                            selected={this.state.activeTab5 === 'viewers'}
                        >
                            Зрители
                        </TabsItem>
                    </Tabs>
                </Group>

                <Group>
                    <SimpleCell before={<Avatar size={48} src={image} />} after={<Icon28MoreHorizontal />} description="Команда ВКонтакте">Игорь Фёдоров</SimpleCell>
                    <Text weight="regular" style={{ margin: 16 }}>Игра просто бомба! <br/><br/> Нашел новый глич, зацените какой он невероятный! Каждый день что-то новое, прошел ее уже раз 70.</Text>
                    <div style={{
                        position: "relative",
                        backgroundColor: 'gray',
                        margin: 16,
                        height: 50,
                        width: 100,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        paddingBottom: '6px',
                        borderRadius: 25
                    }}>
                        <div style={{
                            position:"absolute",
                            top:"50%",
                            left:"25%",
                            transform: "translate(-50%, -50%)"
                        }}>
                            <Icon28SmileOutline/>
                        </div>
                        <div style={{
                            position:"absolute",
                            top:"50%",
                            left:"50%",
                            transform: "translate(-50%, -50%)"
                        }}>
                            <Icon28SmileOutline/>
                        </div>
                        <div style={{
                            position:"absolute",
                            top:"50%",
                            left:"75%",
                            transform: "translate(-50%, -50%)"
                        }}>
                            <Icon28SmileOutline/>
                        </div>

                    </div>
                </Group>
            </Group>
        )
    }

};

export default PulsePage;
