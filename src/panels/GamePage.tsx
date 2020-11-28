import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui'
import StartPage from "./StartPage";
import {GameCompact} from "../api";

const GamePage = (props) => {

    return (
        <Panel id={props.id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => props.goTo('list')}  data-to="list" />}>
                {props.game.title}
        </PanelHeader>
        </Panel>
    );
}

GamePage.propTypes = {
    id: PropTypes.string.isRequired,
    goTo: PropTypes.func.isRequired,
    game: PropTypes.any.isRequired
};

export default GamePage;