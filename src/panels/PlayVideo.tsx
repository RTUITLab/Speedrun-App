import { Icon24Back } from "@vkontakte/icons";
import { Panel, PanelHeader, PanelHeaderButton } from "@vkontakte/vkui";

const PlayVideo = ({id, link, go}) => {
    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderButton onClick={() => go('tournament')}><Icon24Back/></PanelHeaderButton>}>Стрим</PanelHeader>
            <iframe src={"https://player.twitch.tv/?channel="+link.split('/').pop()+"&parent="+window.location.hostname} height="360"
   width="640"
   frameBorder="0"
   scrolling="no"></iframe>
        </Panel>
    )
}

export default PlayVideo;