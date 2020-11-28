import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, PanelHeaderBack, Tabs, HorizontalScroll, TabsItem, Group} from '@vkontakte/vkui'

import TopPage from './GameTab/TopPage';

const GamePage = (props) => {

    const [activeTab, setActiveTab] = useState('top')

    return (
        <Panel id={props.id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => props.goTo('list')}  data-to="list" />}>
                {props.game.title}
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

                {{'top': <TopPage />,
                'stream': <p>Stream</p>
                }[activeTab]
                }

        </Panel>
    );
}

GamePage.propTypes = {
    id: PropTypes.string.isRequired,
    goTo: PropTypes.func.isRequired,
    game: PropTypes.any.isRequired
};

export default GamePage;