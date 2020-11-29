import bridge from '@vkontakte/vk-bridge';
import { GameCompact } from '../api/models/GameCompact';
import { GamesService } from '../api/services/GamesService';
export class FavoriteService {

    public static async setFavoriteGames(ids: Array<string>): Promise<void> {
        ids = ids.slice(0, 5);
        const json = JSON.stringify(ids);
        console.log(json);
        await bridge.send("VKWebAppStorageSet", { "key": "favorites", "value": json });
    }

    public static async getFavoriteGameIds(): Promise<Array<string>> {
        const favoritesObject  = await bridge.send("VKWebAppStorageGet", { "keys": ["favorites"] });
        const favoriteValue = favoritesObject.keys[0].value;
        if (!favoriteValue) {
            return [];
        }
        const ids = JSON.parse(favoriteValue);
        if (typeof(ids) !== "object"){
            await bridge.send("VKWebAppStorageSet", { "key": "favorites", "value": JSON.stringify([]) });
            return [];
        }
        return ids;
    }

    public static async getFavoriteGames(): Promise<Array<GameCompact>> {
        const ids = await (await this.getFavoriteGameIds());
        return await GamesService.getGamesById(ids);
    }

}