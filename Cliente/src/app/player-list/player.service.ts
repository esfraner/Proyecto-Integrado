import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Player } from "src/models/player";
@Injectable()
export class PlayerService {
  URL = "http://localhost/api/";
  constructor(private http: HttpClient) {}

  selectPlayer(idPlayer: number) {
    return this.http.get(`${this.URL}SelectPLayer.php?idPlayer=${idPlayer}`);
  }

  getPlayers(): Observable<Object> {
    return this.http.get(`${this.URL}GetPlayers.php`);
  }

  createPlayer(player: Player) {
    return this.http.post(
      `${this.URL}CreatePlayer.php`,
      JSON.stringify(player)
    );
  }

  removePlayer(idPlayer: number) {
    return this.http.get(`${this.URL}RemovePlayer.php?idPlayer=${idPlayer}`);
  }

  updateUser(player: Player) {
    return this.http.post(
      `${this.URL}UpdatePlayer.php`,
      JSON.stringify(player)
    );
  }
}
