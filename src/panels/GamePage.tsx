import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, PanelHeaderBack, Tabs, HorizontalScroll, TabsItem} from '@vkontakte/vkui'
import TopPage from './GameTab/TopPage';
import { GamesService } from '../api';
import Rules from './GameTab/Rules';
import PulsePage from "./GameTab/PulsePage";
import GidePage from './GameTab/GuidesPage';
import StreamPage from './GameTab/StreamPage';

const GamePage = (props) => {

    const [activeTab, setActiveTab] = useState('top');
    const [rules, setRules] = useState('');

    useEffect(() => {
        
        async function fetchData() {
            if (rules === '') {
                let data = await GamesService.getCategories(props.game.id);
                setRules(data[0].rules+'');
            }
        }

        fetchData();
    });

    return (
        <Panel id={props.id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => props.goTo('list')}  data-to="list" />}>
                {props.game.gameName}
        </PanelHeader>
            <Tabs id ={props.id}>
                <HorizontalScroll>
                    <TabsItem selected={activeTab === 'top'} onClick={() => setActiveTab(() => 'top')}>
                        Топы
                    </TabsItem>
                    <TabsItem selected={activeTab === 'stream'} onClick={() => setActiveTab(() => 'stream')}>
                        Стримы
                    </TabsItem>
                    <TabsItem selected={activeTab === 'guid'} onClick={() => setActiveTab(() => 'guid')}>
                        Гайды
                    </TabsItem>
                    <TabsItem selected={activeTab === 'rules'} onClick={() => setActiveTab(() => 'rules')}>
                        Правила
                    </TabsItem>
                    <TabsItem selected={activeTab === 'pulse'} onClick={() => setActiveTab(() => 'pulse')}>
                        Пульс
                    </TabsItem>
                </HorizontalScroll>
            </Tabs>

                {{'top': <TopPage id={props.game.id} />,
                'stream': <StreamPage id={props.game} />,
                'rules': <Rules game={props.game}/>,
                'guid': <GidePage id={props.game.id}/>,
                    'pulse': <PulsePage idGame={props.game.id}/>
                }[activeTab]
                }

        </Panel>
    );
}

GamePage.propTypes = {
    id: PropTypes.string.isRequired,
    goTo: PropTypes.func.isRequired,
    game: PropTypes.shape({
        id: PropTypes.string,
        gameName: PropTypes.string
    })
};

export default GamePage;