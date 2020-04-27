import { Component, OnInit } from "@angular/core";
import { PlayerService } from "./player.service";
@Component({
  selector: "app-player-list",
  templateUrl: "./player-list.component.html",
  styleUrls: ["./player-list.component.css"],
})
export class PlayerListComponent {
  people$;
  constructor(private playerService: PlayerService) {
    this.fetchPeople();
  }
  fetchPeople() {
    this.people$ = this.playerService.fetchPlayers();
  }
}
