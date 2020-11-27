import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import { GamesService } from '../api/services/GamesService';
import { Game } from '../api';
const Home = ({ id, go, fetchedUser }) => {
    const [gamesData, setGamesData] = useState<Array<Game>| null>(null);
    useEffect(() => {
        async function fetchSeries() {
            if (gamesData == null) {
                const data =  await GamesService.getGamesService();
                setGamesData(() => data);
            }
        }
        fetchSeries();
    });

    return (
        <Panel id={id}>
            <PanelHeader>Example</PanelHeader>
            {fetchedUser &&
                <Group title="User Data Fetched with VK Bridge">
                    <Cell
                        before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200} /> : null}
                        description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
                    >
                        {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                    </Cell>
                </Group>}

            <Group title="Navigation Example">
                <Div>
                    <Button size="xl" onClick={go} data-to="persik">
                        Show me the Persik, please
				</Button>
                </Div>
                <Div>
                    {gamesData !== null &&
                        gamesData.map(g =>
                            <p key={g.id}>{g.names?.international}</p>
                        )
                    }
                </Div>
            </Group>
        </Panel>
    );
}

Home.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Home;
