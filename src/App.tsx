import React, { useState, useEffect, Dispatch, SetStateAction, useRef, createRef, RefObject } from 'react';
import bridge, { UpdateConfigData } from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, Epic, Tabbar, TabbarItem, ModalRoot, ModalPage, ModalPageHeader, PanelHeaderButton, FormLayout, Select, Checkbox, Button } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css';
import { OpenAPI } from './api';

import { Icon24Cancel, Icon28TextLiveOutline, Icon28GameOutline, Icon28Profile } from '@vkontakte/icons';
import GamesList from './panels/GamesList';
import Tournaments from './panels/Tournaments';
import StartPage from "./panels/StartPage";
import GuidesPage from "./panels/GuidesPage";

import PlayVideo from "./panels/PlayVideo";
import Persik from "./panels/Persik";

const App = () => {
	const [activeModal, setActiveModal]: [any, Dispatch<SetStateAction<any>>] = useState(null);
	const [platform, setPlatform]: [any, Dispatch<SetStateAction<any>>] = useState("");
	const [sort, setSort]: [string | null, Dispatch<SetStateAction<any>>] = useState("mostactive");
	const [unofficial, setUnofficial]: [boolean, Dispatch<SetStateAction<any>>] = useState(false);
	const [activePanel, setActivePanel] = useState('startPage');
	const [popout, setPopout] = useState<React.SetStateAction<JSX.Element> | null>(<ScreenSpinner />);
	const [tourPanel, setTourPanel] = useState('tournament');
	const [videoId, setVideoId] = useState('');

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
				'UserId': user.id + ''
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
		if (name === 'unofficial') {
			setUnofficial(!unofficial);
			console.log(unofficial);
		}
	};

	const clear = () => {
		setPlatform(null);
		setSort(null);
		setUnofficial(false);
		closeModal();
	};

	const goBack = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const goTo = (str: string) => {
		setActivePanel(str);
	};

	const goTour = (to, id) => {
		setVideoId(id);
		setTourPanel(to);
	}

	const setStore = e => {
		setActivePanel(e.currentTarget.dataset.story);
	}

	const gamesRef = createRef<any>();

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
						<option value="32X" data-id="">32X</option>
						<option value="3DO" data-id="">3DO</option>
						<option value="3DS" data-id="">3DS</option>
						<option value="3DSVC" data-id="">3DSVC</option>
						<option value="AES" data-id="">AES</option>
						<option value="Amiga" data-id="">Amiga</option>
						<option value="Android" data-id="">Android</option>
						<option value="AppleII" data-id="">AppleII</option>
						<option value="AppleIIGS" data-id="">AppleIIGS</option>
						<option value="Arcade" data-id="">Arcade</option>
						<option value="Archimedes" data-id="">Archimedes</option>
						<option value="Arduboy" data-id="">Arduboy</option>
						<option value="Atari2600" data-id="">Atari2600</option>
						<option value="Atari5200" data-id="">Atari5200</option>
						<option value="Atari7800" data-id="">Atari7800</option>
						<option value="Atari8bit" data-id="">Atari8bit</option>
						<option value="AtariFlashback" data-id="">AtariFlashback</option>
						<option value="AtariST" data-id="">AtariST</option>
						<option value="BBCMicro" data-id="">BBCMicro</option>
						<option value="C64" data-id="">C64</option>
						<option value="CD-i" data-id="">CD-i</option>
						<option value="CD32" data-id="">CD32</option>
						<option value="ColecoVision" data-id="">ColecoVision</option>
						<option value="CommodoreCDTV" data-id="">CommodoreCDTV</option>
						<option value="CPC" data-id="">CPC</option>
						<option value="D32-64" data-id="">D32-64</option>
						<option value="Dreamcast" data-id="">Dreamcast</option>
						<option value="DS" data-id="">DS</option>
						<option value="FCF" data-id="">FCF</option>
						<option value="FDS" data-id="">FDS</option>
						<option value="G&amp;W" data-id="">G&amp;W</option>
						<option value="GameCom" data-id="">GameCom</option>
						<option value="GameGear" data-id="">GameGear</option>
						<option value="GB" data-id="">GB</option>
						<option value="GBA" data-id="">GBA</option>
						<option value="GBC" data-id="">GBC</option>
						<option value="GBI" data-id="">GBI</option>
						<option value="GBP" data-id="">GBP</option>
						<option value="GCN" data-id="">GCN</option>
						<option value="Genesis" data-id="">Genesis</option>
						<option value="GraphCalc" data-id="">GraphCalc</option>
						<option value="Index" data-id="">Index</option>
						<option value="Intellivision" data-id="">Intellivision</option>
						<option value="iOS" data-id="">iOS</option>
						<option value="iQuePlayer" data-id="">iQuePlayer</option>
						<option value="Jaguar" data-id="">Jaguar</option>
						<option value="JaguarCD" data-id="">JaguarCD</option>
						<option value="Java" data-id="">Java</option>
						<option value="Linux" data-id="">Linux</option>
						<option value="Lynx" data-id="">Lynx</option>
						<option value="Mac" data-id="">Mac</option>
						<option value="MegaNet" data-id="">MegaNet</option>
						<option value="MS-DOS" data-id="">MS-DOS</option>
						<option value="MSX" data-id="">MSX</option>
						<option value="MSX2" data-id="">MSX2</option>
						<option value="N-Gage" data-id="">N-Gage</option>
						<option value="N64" data-id="">N64</option>
						<option value="NES" data-id="">NES</option>
						<option value="NESClassic" data-id="">NESClassic</option>
						<option value="New3DS" data-id="">New3DS</option>
						<option value="New3DSVC" data-id="">New3DSVC</option>
						<option value="NGCD" data-id="">NGCD</option>
						<option value="NGMini" data-id="">NGMini</option>
						<option value="NGPC" data-id="">NGPC</option>
						<option value="NGX" data-id="">NGX</option>
						<option value="Oculus" data-id="">Oculus</option>
						<option value="Oric" data-id="">Oric</option>
						<option value="Ouya" data-id="">Ouya</option>
						<option value="PalmOS" data-id="">PalmOS</option>
						<option value="PC" data-id="">PC</option>
						<option value="PC-98" data-id="">PC-98</option>
						<option value="PC88" data-id="">PC88</option>
						<option value="PCFX" data-id="">PCFX</option>
						<option value="PCW" data-id="">PCW</option>
						<option value="PKMiNi" data-id="">PKMiNi</option>
						<option value="Plug&amp;Play" data-id="">Plug&amp;Play</option>
						<option value="PS" data-id="">PS</option>
						<option value="PS2" data-id="">PS2</option>
						<option value="PS3" data-id="">PS3</option>
						<option value="PS4" data-id="">PS4</option>
						<option value="PS4Pro" data-id="">PS4Pro</option>
						<option value="PS5" data-id="">PS5</option>
						<option value="PSClassic" data-id="">PSClassic</option>
						<option value="PSN" data-id="">PSN</option>
						<option value="PSNow" data-id="">PSNow</option>
						<option value="PSP" data-id="">PSP</option>
						<option value="PSTV" data-id="">PSTV</option>
						<option value="PSVita" data-id="">PSVita</option>
						<option value="Roku" data-id="">Roku</option>
						<option value="Satellaview" data-id="">Satellaview</option>
						<option value="Saturn" data-id="">Saturn</option>
						<option value="SCV" data-id="">SCV</option>
						<option value="SegaCD" data-id="">SegaCD</option>
						<option value="SGB" data-id="">SGB</option>
						<option value="SGB2" data-id="">SGB2</option>
						<option value="SharpX1" data-id="">SharpX1</option>
						<option value="Shield" data-id="">Shield</option>
						<option value="SMS" data-id="">SMS</option>
						<option value="SNES" data-id="">SNES</option>
						<option value="SNESClassic" data-id="">SNESClassic</option>
						<option value="Stadia" data-id="">Stadia</option>
						<option value="Switch" data-id="">Switch</option>
						<option value="SwitchVC" data-id="">SwitchVC</option>
						<option value="Tabletop" data-id="">Tabletop</option>
						<option value="TG-16" data-id="">TG-16</option>
						<option value="TG16CD" data-id="">TG16CD</option>
						<option value="TI-99" data-id="">TI-99</option>
						<option value="Tiger" data-id="">Tiger</option>
						<option value="Towns" data-id="">Towns</option>
						<option value="V.Smile" data-id="">V.Smile</option>
						<option value="VIC-20" data-id="">VIC-20</option>
						<option value="VirtualBoy" data-id="">VirtualBoy</option>
						<option value="Vive" data-id="">Vive</option>
						<option value="Web" data-id="">Web</option>
						<option value="Wii" data-id="">Wii</option>
						<option value="WiiU" data-id="">WiiU</option>
						<option value="WiiUVC" data-id="">WiiUVC</option>
						<option value="WiiVC" data-id="">WiiVC</option>
						<option value="WindowsMR" data-id="">WindowsMR</option>
						<option value="WindowsPhone" data-id="">WindowsPhone</option>
						<option value="WonderSwan" data-id="">WonderSwan</option>
						<option value="WSC" data-id="">WSC</option>
						<option value="X360" data-id="">X360</option>
						<option value="X360Arcade" data-id="">X360Arcade</option>
						<option value="X68000" data-id="">X68000</option>
						<option value="Xbox" data-id="">Xbox</option>
						<option value="XboxOne" data-id="">XboxOne</option>
						<option value="XboxOneS" data-id="">XboxOneS</option>
						<option value="XboxOneX" data-id="">XboxOneX</option>
						<option value="XboxSeriesS" data-id="">XboxSeriesS</option>
						<option value="XboxSeriesX" data-id="">XboxSeriesX</option>
						<option value="Zeebo" data-id="">Zeebo</option>
						<option value="ZXSpectrum" data-id="">ZXSpectrum</option>
					</Select>
					<Select
						top="Сортировать"
						placeholder="Выбрать порядок отображения"
						value={sort}
						name="sort"
						onChange={onChange}
					>
						<option value="title">По алфвиту</option>
						<option value="oldest">Сначала новые</option>
						<option value="newest">Сначала старые</option>
						<option value="mostactive">Самые активные</option>
						<option value="leastactive">Самые пасивные</option>
						<option value="mostplayers">Больше всего игроков</option>
						<option value="fewestplayers">Меньше всего игроков</option>
						<option value="mostruns">Большее число ранов</option>
						<option value="fewestruns">Меньшее число ранов</option>
					</Select>
					<Checkbox name="unofficial" value={unofficial+''} onChange={onChange}>
						Неофициальные релизы игр
					</Checkbox>
					<Button size="xl" onClick={() => {gamesRef.current.filter(); closeModal();}}>Применить фильтры</Button>
				</FormLayout>
			</ModalPage>
		</ModalRoot>
	)

	return (
		<Epic activeStory={activePanel} tabbar={
			<Tabbar>
				<TabbarItem onClick={setStore} selected={activePanel === "tournaments"} text="Турниры" data-story="tournaments">
					<Icon28TextLiveOutline />
				</TabbarItem>
				<TabbarItem onClick={setStore} selected={activePanel === "startPage" || activePanel === "gameList"} text="Общее" data-story="startPage">
					<Icon28GameOutline />
				</TabbarItem>
				<TabbarItem onClick={setStore} selected={activePanel === "persik"} text="Профиль" data-story="persik">
					<Icon28Profile />
				</TabbarItem>
			</Tabbar>
		}>
			<View id="gameList" activePanel="gameList" popout={popout} modal={modals}>
				<GamesList
					id='gameList'
					sort={sort}
					platform={platform}
					unofficial={unofficial}
					setActiveModal={setActiveModal}
					goBack={goBack}
					ref={gamesRef}
				/>
			</View>
			<View id="tournaments" activePanel={tourPanel} popout={popout}>
				<Tournaments id='tournament' go={goTour} />
				<PlayVideo id='video' link={videoId} go={setTourPanel} />
			</View>
			<View id="startPage" activePanel="startPage" popout={popout}>
				<StartPage id='startPage' goTo={goTo}/>
			</View>
			<View id="persik" activePanel="persik" popout={popout}>
				<Persik id='persik' go={goBack}/>
			</View>
			<View id="guadePage" activePanel="guadePage" popout={popout}>
				<GuidesPage id='guadePage' goBack={goBack}/>
			</View>
		</Epic>
	);
}


export default App;
