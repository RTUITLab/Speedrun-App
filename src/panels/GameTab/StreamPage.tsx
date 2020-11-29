import { Avatar, Card, CardScroll, Cell, Group, Header } from "@vkontakte/vkui";
import { useEffect, useState } from "react";
import { Stream, StreamsService } from "../../api";

const StreamPage = ({id}) => {
    const [streamsList, setStreamsList] = useState<Array<Stream> | null>(null);
    const [currentStream, setCurrentStream] = useState<string | undefined | null>('');

    useEffect(() => {
        async function fetchGamesList() {
            if (streamsList == null) {
                const data = await StreamsService.getStreams()
                setStreamsList(() => data);
                setCurrentStream(data[0].twichUrl);
            }
        }

        fetchGamesList();
    })

    return (
        <Group style={{ paddingBottom: 8 }} header={<Header mode="secondary">Стримы</Header>}>
            <CardScroll>
                {streamsList &&
                    streamsList.map(s =>
                        <Card key={s.id} size="s" onClick={() => setCurrentStream(s?.twichUrl)}>
                            <div style={{ width: 224, height: 225 }}>
                                <img alt='previewImg' style={{ objectFit: "cover", borderRadius: 5, width: 224, height: 135 }} src={s?.previewImage || undefined } />
                                <Cell style={{ marginTop: 0, marginLeft: 3 }} before={<Avatar mode="image" src={s?.gameCoverImage || undefined} />}>
                                    <div style={{ width: "100$", textAlign: "left" }}>
                                        <div style={{ fontSize: "16px" }}>{s.nickName}</div>
                                        <div style={{ fontSize: "12px" }}>{s.streamTitle}</div>
                                        <div style={{ fontSize: "12px" }}>{s.watchingCount} watching</div>
                                        {/*<div style={{fontSize: "12px"}}>{s.flagImage?.substring(38, s.flagImage?.length-4).toUpperCase()}</div>*/}
                                    </div>
                                </Cell>
                            </div>
                        </Card>
                    )}
            </CardScroll>
            {
                (currentStream !== '') ? (
                    <>
                        <Header mode="secondary">Смотреть</Header>
                        <iframe src={"https://player.twitch.tv/?channel="+currentStream?.split('/').pop()+"&parent="+window.location.hostname} height="400"
                        width="100%"
                        frameBorder="0"
                        scrolling="no"></iframe>
                    </>
                ) : (
                    ''
                )
            }
        </Group>
    )
}

export default StreamPage;