import bridge from '@vkontakte/vk-bridge';
import { GameCompact } from '../api/models/GameCompact';
import { GamesService } from '../api/services/GamesService';
export class FavoriteService {

    public static async setFavoriteGames(ids: Array<string>): Promise<void> {
        ids = ids.slice(0, 5);
        var json = JSON.stringify(ids);
        console.log(json);
        await bridge.send("VKWebAppStorageSet", { "key": "favorites", "value": json });
    }

    public static async getFavoriteGames(): Promise<Array<GameCompact>> {
        var favoritesObject  = await bridge.send("VKWebAppStorageGet", { "keys": ["favorites"] });
        var favoriteValue = favoritesObject.keys[0].value;
        if (!favoriteValue) {
            return [];
        }
        var ids = JSON.parse(favoriteValue);
        if (typeof(ids) !== "object"){
            await bridge.send("VKWebAppStorageSet", { "key": "favorites", "value": JSON.stringify([]) });
            return [];
        }
        return await GamesService.getGamesById(ids);
    }

}