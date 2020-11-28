import { Icon16Play, Icon20SlidersOutline, Icon24Dropdown, Icon24Flash } from "@vkontakte/icons";
import { Avatar, Caption, Cell, Div, FixedLayout, Group, Header, Headline, HorizontalScroll, List, Panel, PanelHeader, Tabs, TabsItem, Text } from "@vkontakte/vkui";
import { useEffect, useState } from "react";

const Tournaments = ({id, go}) => {
    const [dates, setDates] = useState<Array<Date> | null>(null);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [isAny, setIsAny] = useState(true);
    const [isHundred, setIsHundred] = useState(true);
    const [isGlichless, setIsGlichless] = useState(true);
    const [Any, setAny] = useState<Array<Tournament>>([]);
    const [hundred, setHundred] = useState<Array<Tournament>>([]);
    const [glichless, setGlichless] = useState<Array<Tournament>>([]);

    useEffect(() => {
        async function genDates() {
            if (!dates) {
                let d = new Array<Date>();
                for (let i = 0; i <= 12; i++) {
                    let date = new Date();
                    date.setDate(date.getDate() + i);
                    d.push(date);
                    if (i === 0) {
                        setActiveTab(date.toISOString());
                    }
                }
                setDates(d);

                let all:Array<Tournament> = [
                    {
                        game: 'WoW',
                        user: 'MrWoWander',
                        date: 'today',
                        img: 'https://www.speedrun.com/themes/mc/cover-256.png',
                        link: 'https://vk.com/video_ext.php?oid=-167590565&id=456240165&hash=d6909563de6265cc'
                    },
                    {
                        game: 'WoW',
                        user: 'MrWoWander',
                        date: 'today',
                        img: 'https://www.speedrun.com/themes/mc/cover-256.png'
                    },
                    {
                        game: 'WoW',
                        user: 'MrWoWander',
                        date: 'today',
                        img: 'https://www.speedrun.com/themes/mc/cover-256.png'
                    },
                    {
                        game: 'WoW',
                        user: 'MrWoWander',
                        date: 'today',
                        img: 'https://www.speedrun.com/themes/mc/cover-256.png'
                    }
                ]
                setAny(all);
                setHundred(all);
                setGlichless(all);
            }
            console.log(Any)
        }

        genDates();
    });

    const convertDay = (day) => {
        let dict = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

        return dict[day];
    }

    return (
        <Panel id={id}>
            <PanelHeader>Турниры</PanelHeader>
            <Tabs>
                <HorizontalScroll>
                    {dates?.map((date) => 
                        <TabsItem
                            style={{padding: 0, minWidth: '50px'}}
                            selected={date.toISOString() === activeTab}
                            onClick={() => setActiveTab(date.toISOString())}
                    >
                        <Caption
                            level="3"
                            weight="regular"
                            style={{padding: '5px 0 0', color: 'var(--text_secondary)'}}
                        >{convertDay(date.getDay())}</Caption>
                        <Div style={{padding: '5px 0 0'}}>{date.getDate()}</Div>
                    </TabsItem>
                    )}
                 </HorizontalScroll>
            </Tabs>

            <Group>
                <Header aside={<Icon24Dropdown onClick={() =>{ setIsAny(!isAny) }} style={{transform: isAny === true ? 'rotate(180deg)' : ''}} />}>
                    Any%
                </Header>
                {
                    (isAny) ? Any.map(t => (
                        <Cell before={<Avatar size={44} mode="image" src={t.img}/>} >
                            <Div style={{display: "grid", gridTemplateColumns: '1fr 18px', padding: '5px 0'}}>
                                <Div style={{padding: 0}}>
                                    <Text weight="medium" style={{paddingTop: 0}}>{t.game} - {t.user}</Text>
                                    <Text weight="regular" style={{paddingTop: 0, color: 'var(--text_secondary)'}}>{t.date}</Text>
                                </Div>
                                {(t.link) ? <Icon16Play style={{paddingTop: 5}} onClick={() => go('video', t.link)} /> : ''}
                            </Div>
                        </Cell>
                    ))
                    : ''
                }
            </Group>

            <Group>
                <Header aside={<Icon24Dropdown onClick={() =>{ setIsHundred(!isHundred) }} style={{transform: isHundred === true ? 'rotate(180deg)' : ''}} />}>
                    100%
                </Header>
                {
                    (isHundred) ? hundred.map(t => (
                        <Cell before={<Avatar size={44} mode="image" src={t.img}/>} >
                            <Div style={{display: "grid", gridTemplateColumns: '1fr 18px', padding: '5px 0'}}>
                                <Div style={{padding: 0}}>
                                    <Text weight="medium" style={{paddingTop: 0}}>{t.game} - {t.user}</Text>
                                    <Text weight="regular" style={{paddingTop: 0, color: 'var(--text_secondary)'}}>{t.date}</Text>
                                </Div>
                                {(t.link) ? <Icon16Play style={{paddingTop: 5}} onClick={() => go('video', t.link)} /> : ''}
                            </Div>
                        </Cell>
                    ))
                    : ''
                }
            </Group>

            <Group>
                <Header aside={<Icon24Dropdown onClick={() => { setIsGlichless(!isGlichless) }} style={{transform: isGlichless === true ? 'rotate(180deg)' : ''}} />}>
                    Glichless
                </Header>
                {
                    (isGlichless) ? glichless.map(t => (
                        <Cell before={<Avatar size={44} mode="image" src={t.img}/>} >
                            <Div style={{display: "grid", gridTemplateColumns: '1fr 18px', padding: '5px 0'}}>
                                <Div style={{padding: 0}}>
                                    <Text weight="medium" style={{paddingTop: 0}}>{t.game} - {t.user}</Text>
                                    <Text weight="regular" style={{paddingTop: 0, color: 'var(--text_secondary)'}}>{t.date}</Text>
                                </Div>
                                {(t.link) ? <Icon16Play style={{paddingTop: 5}} onClick={() => go('video', t.link)} /> : ''}
                            </Div>
                        </Cell>
                    ))
                    : ''
                }
            </Group>
        </Panel>
    )
}

export default Tournaments;

class Tournament {
    user?: string;
    game?: string;
    date?: string;
    link?: string;
    img?: string;
}