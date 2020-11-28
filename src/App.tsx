import React, { useState, useEffect } from 'react';
import bridge, { UpdateConfigData } from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
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

	return (
		<View activePanel={activePanel} popout={popout}>
			<Persik id='persik' go={go} />
			<GamesList id='gameList' />
		</View>
	);
}


export default App;
