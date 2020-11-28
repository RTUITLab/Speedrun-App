import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import bridge, { UpdateConfigData } from '@vkontakte/vk-bridge';
import {View, ScreenSpinner, Epic, Tabbar, TabbarItem, ModalRoot, ModalPage, ModalPageHeader, PanelHeaderButton, FormLayout, Select, Checkbox, Button} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css';
import { OpenAPI } from './api/core/OpenAPI';
import Icon28GameOutline from '@vkontakte/icons/dist/28/game_outline';
import Icon28TextLiveOutline from '@vkontakte/icons/dist/28/text_live_outline';
import GamesList from './panels/GamesList';
import Persik from './panels/Persik';
import StartPage from "./panels/StartPage";
import { Icon24Cancel } from '@vkontakte/icons';

const App = () => {
	const [activeModal, setActiveModal]: [any, Dispatch<SetStateAction<any>>] = useState(null);
	const [platform, setPlatform]: [any, Dispatch<SetStateAction<any>>] = useState(null);
	const [sort, setSort]: [any, Dispatch<SetStateAction<any>>] = useState(null);
	const [unoficial, setUnoficial]: [any, Dispatch<SetStateAction<any>>] = useState(false);
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

	const closeModal = () => {
		setActiveModal(null);
	};

	const onChange = e => {
		const { name, value } = e.currentTarget;
		console.log(value);
		if (name === 'platform') {
			setPlatform(value);
		}
		if (name === 'sort') {
			setSort(value);
		}
		if (name === 'unoficial') {
			setUnoficial(!unoficial);
			console.log(unoficial);
		}
	};

	const clear = () => {
		setPlatform(null);
		setSort(null);
		setUnoficial(false);
		closeModal();
	};

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const setStore = e => {
		setActivePanel(e.currentTarget.dataset.story);
	}

	const modals = (
		<ModalRoot activeModal={activeModal} onClose={closeModal}>
            <ModalPage id="filter" onClose={closeModal} header={
                <ModalPageHeader
					left={<PanelHeaderButton onClick={clear}>Очистить</PanelHeaderButton>}
					right={<PanelHeaderButton onClick={closeModal}><Icon24Cancel /></PanelHeaderButton>}
				>Фильтры</ModalPageHeader>
            }>
				<FormLayout>
					<Select
						top="Платформа"
						placeholder="Выбрать платформу"
						value={platform}
						name="platform"
						onChange={onChange}
					>
						<option value="pc">PC</option>
						<option value="console">Console</option>
					</Select>
					<Select
						top="Сортировать по"
						placeholder="Выбрать порядок отображения"
						value={sort}
						name="sort"
						onChange={onChange}
					>
						<option value="abc_up">По алфавиту - возрастание</option>
						<option value="abc_down">По алфавиту - убывание</option>
					</Select>
					<Checkbox name="unoficial" value={unoficial} onChange={onChange}>
						Неофициальные релизы игр
					</Checkbox>
					<Button size="xl" onClick={closeModal}>Применить фильтры</Button>
				</FormLayout>
			</ModalPage>
        </ModalRoot>
	)

	return (
		<Epic activeStory={activePanel} tabbar={
			<Tabbar>
				<TabbarItem onClick={setStore} selected={activePanel === "startPage"} text="Лента" data-story="startPage">
				<Icon28TextLiveOutline />
				</TabbarItem>
				<TabbarItem onClick={setStore} selected={activePanel === "gameList"} text="Игры" data-story="gameList">
					<Icon28GameOutline />
				</TabbarItem>
				<TabbarItem onClick={setStore} selected={activePanel === "persik"} text="Персик" data-story="persik"/>
			</Tabbar>
		}>
		<View id="gameList" activePanel="gameList" popout={popout} modal={modals}>
			<GamesList
				id='gameList'
				sort={sort}
				platform={platform}
				unoficial={unoficial}
				setActiveModal={setActiveModal}
			/>
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
