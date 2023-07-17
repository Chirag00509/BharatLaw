import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn() {
    const userId = localStorage.getItem("token");

    if (userId) {
      return true;
    }
    return false;
  }
}
