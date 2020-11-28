import { Avatar, Card, CardGrid, Cell, Div, FormLayout, List, Select, Separator, Text } from "@vkontakte/vkui";
import { useEffect, useState } from "react";
import { GamesService } from "../../api";
import { Category } from "../../api/models/Category";
import bridge from '@vkontakte/vk-bridge';

type User = {
    name: string,
    photo_200: string,
    url: string
}

const Rules = ({game}) => {
    const [data, setData] = useState<Array<Category>>([]);
    const [ruleName, setRuleName] = useState<any>();
    const [moedrators, setModerators] = useState<Array<User>>([]);

    useEffect(() => {
        async function fetchData() {
            if (!data.length) {
                let res = await GamesService.getCategories(game.id);
                setData(res);
                
                let moders = ["103690632", "302985067"]
                
                const token = await (await bridge.send("VKWebAppGetAuthToken", {"app_id": 7679570, "scope": ""})).access_token;

                const responce = (await bridge.send("VKWebAppCallAPIMethod", {"method": "users.get", "params":  {"user_ids": moders.join(','), "v":"5.126", "access_token": token, "fields": "photo_200"}})).response;
                let m: Array<User> = [];
                responce.forEach(user => {
                    m.push({name: [user.first_name, user.last_name].join(' '), photo_200: user.photo_200, url: "https://vk.com/id"+user.id });
                });
                setModerators(m);
            }
        }

        fetchData();
    });

    return (
        <Div style={{paddingTop: 0}}>
        <FormLayout>
            <Select 
				top="Категория"
                placeholder="Выбрать категорию"
                value={ruleName}
                onChange={(e) => setRuleName(e.currentTarget.value)}
            >
                {
                    data.map(c => (
                        <option value={c.id+''}>{c.name}</option>
                    ))
                }
            </Select>
        </FormLayout>

        { (ruleName) ? (
        <Div>
            <Text weight="medium" style={{color: "var(--text_secondary)", padding: '5px 0'}}>Правила категории</Text>
            <CardGrid>
                <Card size="l">
                    {
                        data.find(C => C.id = ruleName)?.rules?.split('\r').map(t => <Div style={{padding: '5px 10px'}}>{t}</Div>)
                    }    
                </Card>
            </CardGrid>
            <Separator style={{margin: '10px 0'}}></Separator>
            <Text weight="medium" style={{color: "var(--text_secondary)", padding: '0 0 10px'}}>Модераторы категории</Text>
            <List>
                {
                    moedrators.map(m => (
                        <Cell before={<Avatar src={m.photo_200}/>}>{m.name}</Cell>
                    ))
                }
            </List>
        </Div>
        )
        : <Div>
            Правила не найдены
            </Div>
        }
        </Div>


    )
}

export default Rules;