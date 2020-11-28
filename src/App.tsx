import React, { useState, useEffect } from 'react';
import bridge, { UpdateConfigData } from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import { OpenAPI } from './api/core/OpenAPI';

import GamesList from './panels/GamesList';
import { Button, CellButton, Checkbox, FormLayout, Input, ModalPage, ModalPageHeader, ModalRoot, Panel, PanelHeader, PanelHeaderButton, Select } from '@vkontakte/vkui';
import { Icon24Add, Icon24Cancel } from '@vkontakte/icons';

const App = () => {
	const [activePanel, setActivePanel] = useState('gameList');
	const [activeModal, setActiveModal]: [any, Dispatch<SetStateAction<any>>] = useState(null);
	const [platform, setPlatform]: [any, Dispatch<SetStateAction<any>>] = useState(null);
	const [sort, setSort]: [any, Dispatch<SetStateAction<any>>] = useState(null);
	const [unoficial, setUnoficial]: [any, Dispatch<SetStateAction<any>>] = useState(false);
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

	const closeModal = () => {
		setActiveModal(null);
	}

	const onChange = e => {
		const { name, value } = e.currentTarget;
		if (name === 'platform') {
			setPlatform(value);
		}
		if (name === 'sort') {
			setSort(value);
		}
		if (name === 'unoficial') {
			setUnoficial(value);
		}
	}

	const clear = () => {
		setPlatform(null);
		setSort(null);
		setUnoficial(false);
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
					<Checkbox name="unoficial" value={unoficial}>
						Неофициальные релизы игр
					</Checkbox>
					<Button size="xl">Применить фильтры</Button>
				</FormLayout>
			</ModalPage>
        </ModalRoot>
	)

	return (
		<View activePanel={activePanel} popout={popout} modal={modals}>
			<GamesList id='gameList' />
		</View>
	);
}


export default App;
