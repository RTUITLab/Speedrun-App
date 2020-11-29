import React, {Fragment} from 'react';
import {
    Avatar,
    Text,
    Group, WriteBar, WriteBarIcon, Tabs, TabsItem, SimpleCell, ActionSheet, ActionSheetItem, View
} from '@vkontakte/vkui';
import {
    Icon28CameraOutline,
    Icon28SmileOutline,
} from '@vkontakte/icons';
import image from '../MineCraft.jpg'
import Icon28MoreHorizontal from '@vkontakte/icons/dist/28/more_horizontal';
import {PulseMessageResponse, PulseService} from "../../api";


type PulseProps = {
    idGame: string
}

type PulsePageState = {
    text1: string,
    text3: string,
    activePanel: string,
    contextOpened: false,
    mode: string,
    activeTab5: string,
    messages: Array<PulseMessageResponse>,
    popout: any
}

class PulsePage extends React.Component<PulseProps, PulsePageState>{

    constructor (props) {
        super(props);

        this.state = {
            text1: "",
            text3: "hey",
            activePanel: 'panel1',
            contextOpened: false,
            mode: 'all',
            activeTab5: 'all',
            messages: [],
            popout: null
        };
        this.openBase = this.openBase.bind(this);
        this.select = this.select.bind(this);
    }



    async componentDidMount(){
        const response = await PulseService.getAllPulseMessages(this.props.idGame)
        this.setState({messages: response} )
    }

    openBase () {
        this.setState({ popout:
                <ActionSheet onClose={() => this.setState({ popout: null })}>
                    <ActionSheetItem autoclose>
                        Отправить донат
                    </ActionSheetItem>
                    <ActionSheetItem autoclose>
                        Отслеживать
                    </ActionSheetItem>
                    <ActionSheetItem autoclose>
                        Пожаловаться
                    </ActionSheetItem>
                    {<ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
                </ActionSheet>
        });
    }

    select(e) {
        const mode = e.currentTarget.dataset.mode;
        this.setState({ mode, contextOpened: false });
    }

    async addMes(id: string) {
        const pulseMessageResponse = await PulseService.sendPulseMessage(this.props.idGame, id);
        this.setState({
            text1: "",
            messages: [pulseMessageResponse,...this.state.messages]
        })
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
                                    disabled={this.state.text1.length === 0}
                                    onClick={() => this.addMes(this.state.text1)}
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
            <View popout={this.state.popout}>
                <Group>
                    {this.state.messages.length> 0 && this.state.messages.map((m) =>
                        (<div>
                            <SimpleCell before={<Avatar size={48} src={image} />} after={<Icon28MoreHorizontal onClick={this.openBase}/>} description="Команда ВКонтакте">Игорь Фёдоров</SimpleCell>
                            <Text weight="regular" style={{ margin: 16 }}>{m.message}</Text>
                        </div>))
                    }
                </Group>
            </View>
            </Group>
        )
    }

};

 export default PulsePage

