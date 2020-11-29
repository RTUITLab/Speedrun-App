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
import {GamesService, PulseMessageResponse, PulseService} from "../../api";
import bridge from '@vkontakte/vk-bridge';


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
    users: Array<User>,
    popout: any
}

type User = {
    id: string,
    name: string,
    photo_200: string,
    url: string
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
            users: [],
            popout: null
        };
        this.openBase = this.openBase.bind(this);
        this.select = this.select.bind(this);
    }

    fetchUsers = async (ids: Array<string>) => {        
        const token = await (await bridge.send("VKWebAppGetAuthToken", {"app_id": 7679570, "scope": ""})).access_token;

        const responce = (await bridge.send("VKWebAppCallAPIMethod", {"method": "users.get", "params":  {"user_ids": ids.join(','), "v":"5.126", "access_token": token, "fields": "photo_200"}})).response;
        let m: Array<User> = [];
        responce.forEach(user => {
            m.push({id: user.id, name: [user.first_name, user.last_name].join(' '), photo_200: user.photo_200, url: "https://vk.com/id"+user.id });
        });
        console.log(m);
        this.setState({users: m});
    }

    async componentDidMount(){
        const response = await PulseService.getAllPulseMessages(this.props.idGame)
        this.setState({messages: response} )
        console.log(response);
        
        let ids: Array<any> = [];
        response.forEach(u => {
            if (!ids.find(U => U === u.userId)) {
                ids.push(u.userId);
            }
        });
        this.fetchUsers(ids);
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
                            <SimpleCell before={<Avatar size={48} src={this.state.users.find(U => m.userId === U.id+'')?.photo_200} />} after={<Icon28MoreHorizontal  onClick={this.openBase}/>}>{this.state.users.find(U => m.userId === U.id+'')?.name}</SimpleCell>

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

