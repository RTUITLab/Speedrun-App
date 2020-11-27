import React from 'react';
import PropTypes from "prop-types";
import logo from '../logo.svg'
import {Panel, PanelHeader, List, Cell, Avatar} from '@vkontakte/vkui';


const GamesList = props => {
    return (
        <Panel id={props.id}>
            <PanelHeader>Игры</PanelHeader>
            <List>
                <Cell before={ <Avatar size={80} mode="image" src={logo} /> } onClick={() => {
                    console.log("keke")
                }}>
                        Test
                </Cell>
            </List>
        </Panel>
    )
};

GamesList.propTypes = {
    id: PropTypes.string.isRequired
}

export default GamesList;