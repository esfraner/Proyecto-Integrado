import { Component, OnInit } from "@angular/core";
import { PlayerService } from "./player.service";
import { Player } from "src/models/player";
import { Observable } from "rxjs";
@Component({
  selector: "app-player-list",
  templateUrl: "./player-list.component.html",
  styleUrls: ["./player-list.component.css"],
})
export class PlayerListComponent implements OnInit {
  players: Player[];
  constructor(private playerService: PlayerService) {}
  ngOnInit() {
    this.getPlayers();
  }
  getPlayers() {
    this.playerService
      .getPlayers()
      .subscribe((result: Player[]) => console.log((this.players = result)));
  }
}
