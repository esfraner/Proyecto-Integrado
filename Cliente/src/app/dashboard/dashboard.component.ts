import { Component, Output, Input } from "@angular/core";
import { PlayerService } from "src/services/player.service";
import { Player } from "src/models/player";
import { Observable } from "rxjs/internal/Observable";
import { PageEvent } from "@angular/material/paginator";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  constructor(private playerService: PlayerService) {}
  currentPage: number = 0;
  pageSize: number = 10;
  index: number = 0;
  minIndex: number = 0;
  maxIndex: number = 10;
  optionCreatePlayer: boolean = true;

  totalPlayersCount$: Observable<number>;
  players$: Observable<Player[]>;
  showedPlayers: Player[];

  formPlayerInformation: FormGroup;
  selectedPlayer: Player;

  @Input()
  arrPlayers$: Player[];

  ngOnInit(): void {}

  eventPage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.minIndex = event.pageIndex * this.pageSize;
    this.maxIndex = event.pageIndex * this.pageSize + this.pageSize;
  }

  getPlayerClicked(player: Player) {
    this.selectedPlayer = player;
  }

  eventUpdatePlayer(updatedPlayer: Player) {
    this.playerService.updatePlayer(updatedPlayer).subscribe((_player) => {
      this.arrPlayers$ = this.arrPlayers$.map((player: Player) => {
        let resPlayer = player.id === updatedPlayer.id ? updatedPlayer : player;
        return resPlayer;
      });
    });
  }

  eventCreatePlayer(createdPlayer: Player) {
    this.playerService
      .createPlayer(createdPlayer)
      .subscribe((response: boolean) => {
        if (response) {
          this.arrPlayers$ = [...this.arrPlayers$, createdPlayer];
        }
      });
  }

  eventRemovePlayer(player: Player) {
    this.playerService.removePlayer(player).subscribe((response: boolean) => {
      if (response) {
        this.arrPlayers$ = this.arrPlayers$.filter(
          (_player) => _player.id !== player.id
        );
      }
    });
  }
}
