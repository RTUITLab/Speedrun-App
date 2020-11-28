import { Icon24Back } from "@vkontakte/icons";
import { Panel, PanelHeader, PanelHeaderButton } from "@vkontakte/vkui";

const PlayVideo = ({id, link, go}) => {
    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderButton onClick={() => go('tournament')}><Icon24Back/></PanelHeaderButton>}>Стрим</PanelHeader>
            <iframe src={link} width="100%" height="100%" allowFullScreen={true}></iframe>
        </Panel>
    )
}

export default PlayVideo;