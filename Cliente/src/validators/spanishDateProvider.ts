import { NativeDateAdapter } from "@angular/material/core";

export class SpanishDateProvider extends NativeDateAdapter {
  parse(date: string) {
    let splittedDate = date.split("/");
    if (splittedDate.length == 3) {
      return new Date(
        +splittedDate[2],
        +splittedDate[1] - 1,
        +splittedDate[0],
        12
      );
    }
  }

  format(date: Date) {
    return (
      ("0" + date.getDate()).slice(-2) +
      "/" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      this.correctYear(date.getFullYear())
    );
  }

  correctYear(year: number): number {
    return year > new Date().getFullYear() ? new Date().getFullYear() : year;
  }
}
