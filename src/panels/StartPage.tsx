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
import { ANDROID, classNames, getClassName, Avatar, Cell } from '@vkontakte/vkui'

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
		<Group separator="hide" header={<Header mode="secondary">Избранные игры</Header>}>
			<CardGrid>

				<Card size="l" >
					<div style={{ height: 260}}>
						<Cell style={{marginTop: 10, marginLeft: 3}} before= {<Avatar mode="image"  src={mc}/>}><span>MineCraft</span><span style={{}}>MineCraft</span ></Cell>
						<Cell style={{marginTop: 10, marginLeft: 3}} before= {<Avatar mode="image"  src={mc}/>}>MineCraft</Cell>
						<Cell style={{marginTop: 10, marginLeft: 3}} before= {<Avatar mode="image"  src={mc}/>}>MineCraft</Cell>
						<Cell style={{marginTop: 10, marginLeft: 3}} before= {<Avatar mode="image"  src={mc}/>}>MineCraft</Cell>


					</div>
				</Card>
			</CardGrid>
		</Group>
		<Footer>3 cообщества</Footer>
	</Panel>
);

StartPage.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default StartPage;
