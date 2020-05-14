import { Component, OnInit } from "@angular/core";
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
  totalPlayersCount: number;
  initialPage: number = 0;
  initialPlayersPerPage: number = 10;

  players: Player[];

  constructor(
    private playerService: PlayerService,
    private playerCardService: PlayerCardServiceService
  ) {}
  ngOnInit() {
    this.playerCardService.selectedPlayer$.subscribe(
      (player) => (this.selectedPlayer = player)
    );
    this.getTotalPlayersNumber();
    this.getPlayers(this.initialPage, this.initialPlayersPerPage);
  }

  public getPaginatorData(event: PageEvent) {
    this.getPlayers(event.pageIndex * event.pageSize, event.pageSize);
  }

  getPlayers(page, playersPerPage) {
    this.playerService
      .getPlayers(page, playersPerPage)
      .subscribe((result: Player[]) => console.log((this.players = result)));
  }

  getTotalPlayersNumber() {
    this.playerService
      .getTotalNumberPlayers()
      .subscribe((result: number) => (this.totalPlayersCount = result));
  }

  showInfoPlayer(player) {
    this.playerCardService.changeMessage((this.selectedPlayer = player));
  }
}
