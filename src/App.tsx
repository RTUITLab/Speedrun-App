import React, { useState, useEffect } from 'react';
import bridge, { UpdateConfigData } from '@vkontakte/vk-bridge';
import {View, ScreenSpinner, Epic, Tabbar, TabbarItem} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css';
import { OpenAPI } from './api/core/OpenAPI';
import Icon24GameOutline from '@vkontakte/icons/dist/24/game_outline';
import Icon24TextLiveOutline from '@vkontakte/icons/dist/24/text_live_outline';
import GamesList from './panels/GamesList';
import Persik from './panels/Persik';
import StartPage from "./panels/StartPage";

const App = () => {
	const [activePanel, setActivePanel] = useState('startPage');
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
				<TabbarItem onClick={setStore} selected={activePanel === "startPage"} text="Лента" data-story="startPage">
				<Icon24TextLiveOutline />
				</TabbarItem>
				<TabbarItem onClick={setStore} selected={activePanel === "gameList"} text="Игры" data-story="gameList">
					<Icon24GameOutline />
				</TabbarItem>
				<TabbarItem onClick={setStore} selected={activePanel === "persik"} text="Персик" data-story="persik"/>
			</Tabbar>
		}>
		<View id="gameList" activePanel="gameList" popout={popout}>
			<GamesList id='gameList' />
		</View>
			<View id="persik" activePanel="persik" popout={popout}>
				<Persik id='persik' go={go} />
			</View>
			<View id="startPage" activePanel="startPage" popout={popout}>
				<StartPage id='startPage' go={go} />
			</View>
		</Epic>
	);
}


export default App;
