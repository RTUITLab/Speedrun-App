import React, { useState, useEffect } from 'react';
import bridge, { UpdateConfigData, UserInfo } from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import { OpenAPI } from './api/core/OpenAPI';

import Home from './panels/Home';
import Persik from './panels/Persik';
import StartPage from './panels/StartPage';

const App = () => {
	const [activePanel, setActivePanel] = useState('startPage');
	const [fetchedUser, setUser] = useState<UserInfo | null>(null);
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
			setUser((s) => user);
			console.log(user);
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
			<Home id='home' fetchedUser={fetchedUser} go={go} />
			<Persik id='persik' go={go} />
			<StartPage id='startPage' go={go}/>
		</View>
	);
}


export default App;
