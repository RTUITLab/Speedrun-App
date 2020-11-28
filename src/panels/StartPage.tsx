import React, { FunctionComponent, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Footer from '@vkontakte/vkui/dist/components/Footer/Footer';
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import usePlatform from '@vkontakte/vkui/dist/hooks/usePlatform';
import { ANDROID, classNames, getClassName, Avatar, Cell, HorizontalScroll,CardScroll } from '@vkontakte/vkui'

import './Persik.css';
import mc from '../img/MineCraft.jpg';

export interface TextProps extends HTMLAttributes<HTMLElement> {
	weight: 'regular' | 'medium' | 'semibold';
}


const Text: FunctionComponent<TextProps> = ({
	children,
	className,
	weight,
	...restProps
}) => {
	const platform = usePlatform();

	let textWeight: TextProps['weight'] = weight;

	if (platform === ANDROID) {
		if (weight === 'semibold') {
			textWeight = 'medium';
		}
	}
	return (
		<div
			{...restProps}
			className={classNames(getClassName('Text', platform), `Text--w-${textWeight}`, className)}
		>
			{children}
		</div>
	);
}

const StartPage = props => (
	<Panel id={props.id}>
		<PanelHeader>
			Обзор спидранов
		</PanelHeader>



		<Group separator="hide">
			<CardGrid>
				<Card size="l" >
					<div style={{display: "grid", gridTemplateColumns: "85% 15%"}}>
						<Header mode="secondary" style={{float:"left"}}>Избранные игры</Header>
						<Header mode="secondary" style={{float:"right"}}>Any%</Header>
					</div>

					<div style={{ height: 300}}>
						<Cell style={{marginTop: 0, marginLeft: 3}}  before= {<Avatar mode="image"  src={mc}/>}>
							<div style={{width:"100$", textAlign:"center"}}>
								<div style={{float:"left"}}>
									MineCraft
								</div>
								<div style={{float:"right"}}>
									<div style={{fontSize:"16px"}}>13m 54c</div>
									<div style={{fontSize:"12px"}}>-22s</div>
								</div>
							</div>
						</Cell>
						<Cell style={{marginTop: 10, marginLeft: 3}}  before= {<Avatar mode="image"  src={mc}/>}>
							<div style={{width:"100$", textAlign:"center"}}>
								<div style={{float:"left", verticalAlign: "middle"}}>
									MineCraft
								</div>
								<div style={{float:"right", verticalAlign: "middle"}}>
									<div style={{fontSize:"16px"}}>13m 54c</div>
									<div style={{fontSize:"12px"}}>-22s</div>
								</div>
							</div>
						</Cell>
						<Cell style={{marginTop: 10, marginLeft: 3}}  before= {<Avatar mode="image"  src={mc}/>}>
							<div style={{width:"100$", textAlign:"center"}}>
								<div style={{float:"left", verticalAlign: "middle"}}>
									MineCraft
								</div>
								<div style={{float:"right", verticalAlign: "middle"}}>
									<div style={{fontSize:"16px"}}>13m 54c</div>
									<div style={{fontSize:"12px"}}>-22s</div>
								</div>
							</div>
						</Cell>
						<Cell style={{marginTop: 10, marginLeft: 3}}  before= {<Avatar mode="image"  src={mc}/>}>
							<div style={{width:"100$", textAlign:"center"}}>
								<div style={{float:"left", verticalAlign: "middle"}}>
									MineCraft
								</div>
								<div style={{float:"right", verticalAlign: "middle"}}>
									<div style={{fontSize:"16px"}}>13m 54c</div>
									<div style={{fontSize:"12px"}}>-22s</div>
								</div>
							</div>
						</Cell>


					</div>
				</Card>
			</CardGrid>
		</Group>
		<Group style={{ paddingBottom: 8 }} header={<Header mode="secondary">Популярные стримы</Header>}>
			<CardScroll>
				<Card size="s">
					<div style={{ width:  224, height: 225 }} >
						<img style={{objectFit: "cover", borderRadius: 5, width: 224, height: 135}} src={mc}/>
						<Cell style={{marginTop: 0, marginLeft: 3}}  before= {<Avatar mode="image"  src={mc}/>}>
							<div style={{width:"100$", textAlign:"left"}}>
								<div style={{fontSize:"16px"}}>GENSYXA</div>
								<div style={{fontSize:"12px"}}>Глич «распрыжка»</div>
								<div style={{fontSize:"12px"}}>Русский</div>
							</div>
						</Cell>
					</div>
				</Card>
				<Card size="s">
					<div style={{ width:  224, height: 225 }} >
						<img style={{objectFit: "cover", borderRadius: 5, width: 224, height: 135}} src={mc}/>
						<Cell style={{marginTop: 0, marginLeft: 3}}  before= {<Avatar mode="image"  src={mc}/>}>
							<div style={{width:"100$", textAlign:"left"}}>
								<div style={{fontSize:"16px"}}>GENSYXA</div>
								<div style={{fontSize:"12px"}}>Глич «распрыжка»</div>
								<div style={{fontSize:"12px"}}>Русский</div>
							</div>
						</Cell>
					</div>
				</Card>
				<Card size="s">
					<div style={{ width:  224, height: 225 }} >
						<img style={{objectFit: "cover", borderRadius: 5, width: 224, height: 135}} src={mc}/>
						<Cell style={{marginTop: 0, marginLeft: 3}}  before= {<Avatar mode="image"  src={mc}/>}>
							<div style={{width:"100$", textAlign:"left"}}>
								<div style={{fontSize:"16px"}}>GENSYXA</div>
								<div style={{fontSize:"12px"}}>Глич «распрыжка»</div>
								<div style={{fontSize:"12px"}}>Русский</div>
							</div>
						</Cell>
					</div>
				</Card>
				<Card size="s">
					<div style={{ width:  224, height: 225 }} >
						<img style={{objectFit: "cover", borderRadius: 5, width: 224, height: 135}} src={mc}/>
						<Cell style={{marginTop: 0, marginLeft: 3}}  before= {<Avatar mode="image"  src={mc}/>}>
							<div style={{width:"100$", textAlign:"left"}}>
								<div style={{fontSize:"16px"}}>GENSYXA</div>
								<div style={{fontSize:"12px"}}>Глич «распрыжка»</div>
								<div style={{fontSize:"12px"}}>Русский</div>
							</div>
						</Cell>
					</div>
				</Card>

			</CardScroll>
		</Group>
		<Group separator="hide">
			<CardGrid>
				<Card size="l" >
					<div style={{display: "grid", gridTemplateColumns: "80% 20%"}}>
						<Header mode="secondary" style={{float:"left"}}>Последние раны</Header>
						<Header mode="secondary" style={{float:"right"}}>Сегодня</Header>
					</div>
					<div style={{ height: 260}}>
						<Cell style={{marginTop: 0, marginLeft: 3}}  before= {<Avatar mode="image"  src={mc}/>}>
							<div style={{width:"100$", textAlign:"center"}}>
								<div style={{float:"left"}}>
									<div style={{fontSize:"16px"}}>Ashes of Outland</div>
									<div style={{fontSize:"12px"}}>srd_27</div>
								</div>
								<div style={{float:"right"}}>
									<div style={{fontSize:"16px"}}>13m 54c</div>
									<div style={{fontSize:"12px"}}>-22s</div>
								</div>
							</div>
						</Cell>


					</div>
				</Card>
			</CardGrid>
		</Group>
		<Footer>Property of RTUITLab</Footer>
	</Panel>
);

StartPage.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default StartPage;
