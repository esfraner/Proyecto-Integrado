import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable()
export class PlayerService {
  constructor(private http: HttpClient) {}

  fetchPlayers(): Observable<Object> {
    return this.http.get("/assets/LISTA_PRODUCTOS.json");
  }
}
