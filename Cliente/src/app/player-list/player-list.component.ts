import { Component, OnInit, Input } from "@angular/core";
import { PlayerService } from "../../services/player.service";
import { Player } from "src/models/player";
import { Observable } from "rxjs";
import { PlayerCardServiceService } from "src/services/player-card-service.service";
import { PageEvent } from "@angular/material/paginator";
@Component({
  selector: "app-player-list",
  templateUrl: "./player-list.component.html",
  styleUrls: ["./player-list.component.css"],
})
export class PlayerListComponent implements OnInit {
  editMessage: string;
  selectedPlayer: Player;

  @Input()
  players: Player[];

  constructor(private playerCardService: PlayerCardServiceService) {}
  ngOnInit() {
    this.playerCardService.selectedPlayer$.subscribe(
      (player) => (this.selectedPlayer = player)
    );
  }

  showInfoPlayer(player) {
    this.playerCardService.changeMessage((this.selectedPlayer = player));
  }
}
