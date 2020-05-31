import { Component } from "@angular/core";
import { PlayerService } from "src/services/player.service";
import { Player } from "src/models/player";
import { Observable } from "rxjs/internal/Observable";
import { PageEvent } from "@angular/material/paginator";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { DateValidator } from "src/validators/validator.date";
import * as moment from "moment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(private playerService: PlayerService) {}
  currentPage: number = 0;
  currentPlayersPerPage: number = 10;
  index: number = 0;
  optionCreatePlayer: boolean = true;

  totalPlayersCount$: Observable<number>;
  players$: Observable<Player[]>;
  formPlayerInformation: FormGroup;
  selectedPlayer: Player;

  ngOnInit(): void {
    this.getTotalPlayersNumber();
    this.getPlayers(this.currentPage, this.currentPlayersPerPage);
  }

  getPlayers(page, playersPerPage) {
    this.players$ = this.playerService.getPlayers(page, playersPerPage);
  }

  getTotalPlayersNumber() {
    this.totalPlayersCount$ = this.playerService.getTotalNumberPlayers();
  }

  getPaginatorData(event: PageEvent) {
    this.currentPage = event.pageIndex * event.pageSize;
    this.currentPlayersPerPage = event.pageSize;
    this.getPlayers(event.pageIndex * event.pageSize, event.pageSize);
  }

  childEventClicked($event) {
    this.players$ = this.playerService.getPlayers(
      this.currentPage,
      this.currentPlayersPerPage
    );
    //this.getPlayers(this.currentPage, this.currentPlayersPerPage);
    this.players$.subscribe((newId: any) => {
      console.log(newId);
    });
  }

  getPlayerClicked(player: Player) {
    this.selectedPlayer = player;
  }
}
