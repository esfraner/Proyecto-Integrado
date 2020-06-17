import { Component, Output } from "@angular/core";
import { PlayerService } from "src/services/player.service";
import { NgxSpinnerService } from "ngx-spinner";
import { map, shareReplay } from "rxjs/operators";
import { Player } from "src/models/player";
import { Observable } from "rxjs";

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
  players$: Observable<Player[]> = this.playerService
    .getPlayers(this.team)
    .pipe(shareReplay(1));

  playersAux: Observable<Player[]> = this.players$;

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
    this.players$ = this.playerService.getPlayers(this.team);
    this.refreshPlayerAux();
    this.hideLoadSpinner();
  }

  refreshPlayerAux() {
    this.playersAux = this.players$;
  }

  refreshPlayerFromLocal() {
    this.players$ = this.playersAux;
  }

  refreshPlayersFromDatabase() {
    this.players$ = this.playerService.getPlayers(this.team);
  }

  createPlayer(createdPlayer: Player) {
    this.playerService
      .createPlayer(createdPlayer)
      .subscribe((response: boolean) => {
        if (response) {
          this.players$ = this.players$.pipe(
            map((players: Player[]) => {
              return [...players, createdPlayer];
            })
          );
        }
      });
  }

  updatePlayer(updatedPlayer: Player) {
    this.playerService.updatePlayer(updatedPlayer).subscribe(() => {
      this.players$ = this.players$.pipe(
        map((players: Player[]) => {
          return players.map((_player: Player) => {
            return _player.id === updatedPlayer.id ? updatedPlayer : _player;
          });
        })
      );
    });
  }

  removePlayer(removedPlayer: Player) {
    this.playerService
      .removePlayer(removedPlayer)
      .subscribe((response: boolean) => {
        if (response) {
          this.players$ = this.players$.pipe(
            map((players: Player[]) => {
              return players.filter((player: Player) => {
                return player.id !== removedPlayer.id;
              });
            })
          );
        }
      });
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
    if (this.isPropertyNombreCompleto(property)) {
      const firstParameter = this.normalizeStringAccent(a[property]);
      const lastParameter = this.normalizeStringAccent(b[property]);

      return this.isAscendent(firstParameter, lastParameter) ? -1 : 1;
    } else {
      return this.isAscendent(a[property], b[property]) ? -1 : 1;
    }
  }

  descendentSorting(a: Player, b: Player, property: string): number {
    if (this.isPropertyNombreCompleto(property)) {
      const firstParameter = this.normalizeStringAccent(a[property]);
      const lastParameter = this.normalizeStringAccent(b[property]);

      return this.isDescendent(firstParameter, lastParameter) ? -1 : 1;
    } else {
      return this.isDescendent(a[property], b[property]) ? -1 : 1;
    }
  }

  normalizeStringAccent(name: string): string {
    return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  searchPlayer(name: string) {
    if (this.isLongerThan2(name)) {
      this.players$ = this.players$.pipe(
        map((players: Player[]) =>
          players.filter((player: Player) =>
            player.nombreCompleto.includes(name)
          )
        ),
        shareReplay(1)
      );
    }
  }

  isPropertyNombreCompleto(property: string) {
    return property === "nombreCompleto";
  }

  isAscendent(first: string, last: string) {
    return first < last;
  }

  isDescendent(first: string, last: string) {
    return first > last;
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
