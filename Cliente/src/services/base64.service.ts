import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Base64Service {
  readBase64(file): Promise<any> {
    var reader = new FileReader();
    var future = new Promise((resolve, reject) => {
      reader.addEventListener(
        "load",
        function () {
          resolve(reader.result);
        },
        false
      );

      reader.addEventListener(
        "error",
        function (event) {
          reject(event);
        },
        false
      );
      reader.readAsDataURL(file);
    });
    return future;
  }
}
