import { Component, OnInit } from "@angular/core";
import { PlayerService } from "./player.service";
@Component({
  selector: "app-player-list",
  templateUrl: "./player-list.component.html",
  styleUrls: ["./player-list.component.css"],
})
export class PlayerListComponent implements OnInit {
  usuarios = null;
  constructor(private playerService: PlayerService) {}
  ngOnInit() {
    this.getPlayers();
  }
  getPlayers() {
    this.playerService
      .getPlayers()
      .subscribe((result) => (this.usuarios = result));
  }
}
