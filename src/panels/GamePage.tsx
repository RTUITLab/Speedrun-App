import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, PanelHeaderBack, Tabs, HorizontalScroll, TabsItem, Group} from '@vkontakte/vkui'
import type { GameCompact } from '../api/models/GameCompact';
import TopPage from './GameTab/TopPage';
import { GamesService } from '../api';
import Rules from './GameTab/Rules';

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
                'stream': <p>Stream</p>,
                'rules': <Rules game={props.game}/>
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