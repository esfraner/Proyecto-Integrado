import { Component, Output } from "@angular/core";
import { PlayerService } from "src/services/player.service";
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { Player } from "src/models/player";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title: "Liga Santander";
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

  sortPlayersByProperty(property: string, isAscendent: boolean) {
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

  ascendentSorting(a: Player, b: Player, property: string): number {
    if (property === "nombreCompleto") {
      return this.normalizeStringAccent(a[property]) <
        this.normalizeStringAccent(b[property])
        ? -1
        : 1;
    } else {
      return a[property] < b[property] ? -1 : 1;
    }
  }

  descendentSorting(a: Player, b: Player, property: string): number {
    if (property === "nombreCompleto") {
      return this.normalizeStringAccent(a[property]) >
        this.normalizeStringAccent(b[property])
        ? -1
        : 1;
    } else {
      return a[property] > b[property] ? -1 : 1;
    }
  }

  normalizeStringAccent(name: string): string {
    return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
