import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Player } from "src/models/player";
import { Observable } from "rxjs";
import { ObserversModule } from "@angular/cdk/observers";
@Injectable({
  providedIn: "root",
})
export class PlayerService {
  URL = "http://192.168.0.105:8000/";
  constructor(private http: HttpClient) {}

  getTotalNumberPlayers(): Observable<number> {
    return this.http.get<number>(`${this.URL}getTotalNumberPlayers.php`);
  }

  getPlayers(page: number, playersPerPage: number): Observable<Player[]> {
    return this.http.post<Player[]>(
      `${this.URL}getPlayers.php`,
      JSON.stringify({ page, playersPerPage })
    );
  }

  selectPlayer(idPlayer: number): Observable<Player> {
    return this.http.get<Player>(
      `${this.URL}selectPLayer.php?idPlayer='${idPlayer}'`
    );
  }

  createPlayer(player: Player): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.URL}CreatePlayer.php`,
      JSON.stringify(player)
    );
  }

  removePlayer(idPlayer: number) {
    return this.http.get<Player>(
      `${this.URL}removePlayer.php?idPlayer=${idPlayer}`
    );
  }

  updatePlayer(player: Player): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.URL}updatePlayer.php`,
      JSON.stringify(player)
    );
  }

  getLastId(): Observable<number> {
    return this.http.get<number>(`${this.URL}getLastId.php`);
  }
}
