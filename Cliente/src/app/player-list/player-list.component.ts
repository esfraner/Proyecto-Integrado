import { Component, OnInit } from "@angular/core";
import { PlayerService } from "./player.service";
import { Player } from "src/models/player";
import { Observable } from "rxjs";
import { PlayerCardServiceService } from "src/services/player-card-service.service";
@Component({
  selector: "app-player-list",
  templateUrl: "./player-list.component.html",
  styleUrls: ["./player-list.component.css"],
})
export class PlayerListComponent implements OnInit {
  editMessage: string;
  selectedPlayer: Player;
  players: Player[];
  constructor(
    private playerService: PlayerService,
    private playerCardService: PlayerCardServiceService
  ) {}
  ngOnInit() {
    this.playerCardService.selectedPlayer$.subscribe(
      (player) => (this.selectedPlayer = player)
    );
    this.getPlayers();
  }
  getPlayers() {
    this.playerService
      .getPlayers()
      .subscribe((result: Player[]) => console.log((this.players = result)));
  }

  showInfoPlayer(player) {
    this.playerCardService.changeMessage((this.selectedPlayer = player));
  }
}
