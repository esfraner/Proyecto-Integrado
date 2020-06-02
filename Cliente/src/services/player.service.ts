import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Player } from "src/models/player";
import { Observable, Subject, merge } from "rxjs";
import { shareReplay, map, combineLatest, filter } from "rxjs/operators";
import { newArray } from "@angular/compiler/src/util";
@Injectable({
  providedIn: "root",
})
export class PlayerService {
  URL = "http://192.168.0.105:8000/";
  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.URL}getAllPlayers.php`);
  }

  updatePlayer(player: Player): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.URL}updatePlayer.php`,
      JSON.stringify(player)
    );
  }

  createPlayer(player: Player): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.URL}createPlayer.php`,
      JSON.stringify(player)
    );
  }

  removePlayer(player: Player): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.URL}removePlayer.php?idPlayer=${player.id}`
    );
  }

  getLastId(): Observable<number> {
    return this.http.get<number>(`${this.URL}getLastId.php`);
  }
}
