import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui'
const GamePage = (props) => {

    return (
        <Panel id='gamePanel'>
            <PanelHeader left={<PanelHeaderBack onClick={(e) => {}}  data-to="gamesList" />}>
                Название игры
        </PanelHeader>
        </Panel>
    );
}