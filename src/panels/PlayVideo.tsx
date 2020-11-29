import { Icon24Back } from "@vkontakte/icons";
import { Panel, PanelHeader, PanelHeaderButton } from "@vkontakte/vkui";

const PlayVideo = ({id, link, back, go}) => {
    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderButton onClick={() => go(back, '', 'startPage')}><Icon24Back/></PanelHeaderButton>}>Стрим</PanelHeader>
            <iframe src={"https://player.twitch.tv/?channel="+link.split('/').pop()+"&parent="+window.location.hostname} height="400"
   width="100%"
   frameBorder="0"
   scrolling="no"></iframe>
        </Panel>
    )
}

export default PlayVideo;