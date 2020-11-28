import React, { useState, useEffect } from 'react';
import bridge, { UpdateConfigData } from '@vkontakte/vk-bridge';
import {View, ScreenSpinner, Epic, Tabbar, TabbarItem} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css';
import { OpenAPI } from './api/core/OpenAPI';

import Persik from './panels/Persik';
import GamesList from './panels/GamesList';

const App = () => {
	const [activePanel, setActivePanel] = useState('gameList');
	const [popout, setPopout] = useState<React.SetStateAction<JSX.Element> | null>(<ScreenSpinner />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data } }) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				const configData = data as UpdateConfigData;
				schemeAttribute.value = configData.scheme ? configData.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');

			OpenAPI.HEADERS = {
				'UserId': user.id+''
			};
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const setStore = e => {
		setActivePanel(e.currentTarget.dataset.story);
	}

	return (
		<Epic activeStory={activePanel} tabbar={
			<Tabbar>
				<TabbarItem onClick={setStore} selected={activePanel === "gameList"} text="Игры" data-story="gameList"/>
				<TabbarItem onClick={setStore} selected={activePanel === "persik"} text="Персик" data-story="persik"/>
			</Tabbar>
		}>
		<View id="gameList" activePanel="gameList" popout={popout}>
			<GamesList id='gameList' />
		</View>
			<View id="persik" activePanel="persik" popout={popout}>
				<Persik id='gameList' go={go} />
			</View>
		</Epic>
	);
}


export default App;
