import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Player } from "src/models/player";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class PlayerService {
  URL = "http://localhost:8000/";
  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.URL}getPlayers.php`);
  }

  selectPlayer(idPlayer: number): Observable<Player> {
    return this.http.get<Player>(
      `${this.URL}selectPLayer.php?idPlayer=${idPlayer}`
    );
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
