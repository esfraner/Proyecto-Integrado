import { Component, Output, EventEmitter } from "@angular/core";
import { PlayerService } from "src/services/player.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Player } from "src/models/player";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title: "Liga Santander";
  @Output() team = "Betis";
  @Output() players$: Observable<Player[]> = this.playerService.getPlayers(
    this.team
  );
  @Output() onKeyUp = new EventEmitter<string>();
  @Output() sort: { property: string; isAscendent: boolean };
  @Output() searchName: string;

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
    this.team = team;
    this.showLoadSpinner();
    this.refreshPlayers();
    this.hideLoadSpinner();
  }

  refreshPlayers() {
    this.players$ = this.playerService.getPlayers(this.team);
    this.sortPlayersByProperty("id", true);
  }

  sortPlayersByProperty(property: string, isAscendent: boolean) {
    this.sort = { property, isAscendent };
  }

  searchPlayer(name: string) {
    if (this.isLongerThan2(name)) {
      this.searchName = name;
    }
    if (!name) {
      this.searchName = "";
    }
  }

  isLongerThan2(name: string): boolean {
    return name.length > 2;
  }

  showLoadSpinner() {
    this.spinner.show();
  }

  hideLoadSpinner() {
    setTimeout(() => {
      this.spinner.hide();
    }, 950);
  }
}
