import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Player } from "src/models/player";

@Injectable()
export class PlayerCardServiceService {
  private player = new BehaviorSubject<Player>(new Player());
  public selectedPlayer$: Observable<Player> = this.player.asObservable();
  constructor() {}

  public changeMessage(selectedPlayer: Player) {
    this.player.next(selectedPlayer);
  }
}
