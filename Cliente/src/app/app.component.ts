import { Component, Output } from "@angular/core";
import { Observable } from "rxjs";
import { Player } from "src/models/player";
import { PlayerService } from "src/services/player.service";
import { shareReplay } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @Output()
  players$: Observable<Player[]>;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.players$ = this.playerService.getPlayers().pipe(shareReplay(1));
  }
}
