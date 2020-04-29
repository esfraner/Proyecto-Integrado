import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Player } from "src/models/player";
@Injectable({
  providedIn: "root",
})
export class PlayerService {
  URL = "/assets/api/";
  constructor(private http: HttpClient) {}

  selectPlayer(idPlayer: number) {
    return this.http.get(`${this.URL}selectPLayer.php?idPlayer=${idPlayer}`);
  }

  getPlayers() {
    return this.http.get(`${this.URL}getPlayers.php`);
  }

  createPlayer(player: Player) {
    return this.http.post(
      `${this.URL}CreatePlayer.php`,
      JSON.stringify(player)
    );
  }

  removePlayer(idPlayer: number) {
    return this.http.get(`${this.URL}removePlayer.php?idPlayer=${idPlayer}`);
  }

  updateUser(player: Player) {
    return this.http.post(
      `${this.URL}updatePlayer.php`,
      JSON.stringify(player)
    );
  }
}
