import { Injectable } from "@angular/core";
import { UserModel } from "./user.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operator";
import { throwError } from "rxjs";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  readonly URL = "http://localhost:55367/api";
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  registerUser(model: UserModel) {
    return this.http.post<UserModel>(this.URL + "/User/register", model);
  }
}
