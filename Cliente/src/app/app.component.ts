import { Component, Output } from "@angular/core";
import { PlayerService } from "src/services/player.service";
import { NgxSpinnerService } from "ngx-spinner";
import { mergeMap, map } from "rxjs/operators";
import { Player } from "src/models/player";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @Output()
  team = "Betis";
  @Output()
  players$ = this.playerService.getPlayers(this.team);

  isAscendingId: boolean = false;
  isAscendingName: boolean = false;
  isAscendingAge: boolean = false;

  constructor(
    private playerService: PlayerService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.showLoadSpinner();
  }

  ngAfterViewInit(): void {
    this.hideLoadSpinner();
  }

  selectTeam(team: string) {
    this.showLoadSpinner();
    this.players$ = this.playerService.getPlayers(team);
    this.hideLoadSpinner();
  }

  showLoadSpinner() {
    this.spinner.show();
  }

  hideLoadSpinner() {
    setTimeout(() => {
      this.spinner.hide();
    }, 950);
  }

  sortPlayersByProperty(property, isAscendent) {
    this.players$ = this.players$.pipe(
      map((players: Player[]) => {
        return players.sort((a, b) =>
          isAscendent
            ? this.ascendentSorting(a, b, property)
            : this.descendentSorting(a, b, property)
        );
      })
    );
  }

  ascendentSorting(a, b, property) {
    return a[property] < b[property] ? -1 : 1;
  }

  descendentSorting(a, b, property) {
    return a[property] > b[property] ? -1 : 1;
  }
}
