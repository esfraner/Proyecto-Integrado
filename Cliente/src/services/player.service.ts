import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Player } from "src/models/player";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class PlayerService {
  URL = "http://192.168.0.104:8000/";
  constructor(private http: HttpClient) {}

  getTotalNumberPlayers(): Observable<number> {
    return this.http.get<number>(`${this.URL}getTotalNumberPlayers.php`);
  }

  getPlayers(page: number, playersPerPage: number): Observable<Player[]> {
    return this.http.post<Player[]>(
      `${this.URL}test.php`,
      JSON.stringify({ page, playersPerPage })
    );
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
