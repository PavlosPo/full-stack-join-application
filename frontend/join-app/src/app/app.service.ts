// import { Injectable, inject } from "@angular/core";
// import { User } from "./interfaces/user";
// import axios, { Method } from 'axios';

// @Injectable({
//   providedIn: 'root'
// })  
// export class AppService {

//   currentUser: User | null = null;
//   public isLoggedIn: boolean = this.hasToken();

//   constructor() {
//     axios.defaults.baseURL = 'http://localhost:8080';
//     axios.defaults.headers.post['Content-Type'] = 'application/json';
//   }

//   isLoggedInMethod(): boolean {
//     return this.isLoggedIn || localStorage.getItem('isLoggedIn') === 'true';
//   }

//   setLoggedIn(value: boolean) {
//     this.isLoggedIn = value;
//     localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
//   }

//   getAuthToken(): string | null {
//     return window.localStorage.getItem("auth_token");
//   }

//   setAuthToken(token: string | null): void {
//     // if (token !== null) {
//     //   window.localStorage.setItem("auth_token", token);
//     // } else {
//     //   window.localStorage.removeItem("auth_token");
//     // }
//     if (token !== null) {
//       window.localStorage.setItem("auth_token", token);
//       this.isLoggedIn = true;
//     } else {
//       window.localStorage.removeItem("auth_token");
//       this.isLoggedIn = false;
//     }
//   }

//   request(method: string, url: string, data: any): Promise<any> {
//     let headers: any = {};

//     if (this.getAuthToken() !== null) {
//       headers = {"Authorization": "Bearer " + this.getAuthToken()};
//     }

//     return axios({
//       method: method as Method, 
//       url: url,
//       data: data,
//       headers: headers
//     }).catch((error: any) => {
//       console.error('Axios request failed:', error);
//       throw error; // Re-throw the error to propagate it further
//     });
//   };

//   login(user: User) {
//     // this.currentUser = user;
//     // this.setAuthToken(user.token);
//     // window.localStorage.setItem("user", JSON.stringify(user));
    
//     window.localStorage.setItem("user", JSON.stringify(user));
//     this.currentUser = user;
//     this.setAuthToken(user.token);
//     this.isLoggedIn = true
//   }

//   logout() {
//     window.localStorage.removeItem("user");
//     this.setAuthToken(null);
//     this.currentUser = null;
//     this.isLoggedIn = false;
//   }

//   hasToken(): boolean {
//     return this.getAuthToken() !== null;
//   }

//   getUser(): User | null {
//     const user = window.localStorage.getItem("user");
//     this.currentUser = user ? JSON.parse(user) : null;
//     return this.currentUser;
//   }
  
// }

import { Injectable } from "@angular/core";
import { User } from "./interfaces/user";
import axios, { Method } from 'axios';

@Injectable({
  providedIn: 'root'
})  
export class AppService {

  currentUser: User | null = null;
  public isLoggedIn: boolean = this.hasToken();

  constructor() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  isLoggedInMethod(): boolean {
    return this.isLoggedIn;
  }

  setLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
  }

  getAuthToken(): string | null {
    return this.currentUser?.token || null;
  }

  

  private async loadUserFromServer() {
    console.log('I am trying to load user from server');
    try {
      const response = await this.request("GET", "/user", null);
      this.currentUser = response.data;
      this.isLoggedIn = true;
    } catch (error) {
      // If the request fails (e.g., user not authenticated), handle accordingly
      this.currentUser = null;
      this.isLoggedIn = false;
    }
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      this.isLoggedIn = true;
      if (!this.currentUser) {
        this.currentUser = { 
          username: '',
          firstname: '',
          lastname: '',
          password: '',
          email: '',
          token: token};
      } else {
        this.currentUser.token = token;
      }
    } else {
      this.isLoggedIn = false;
      if (this.currentUser) {
        this.currentUser.token = '';
      }
    }
    this.saveUserLocally(); // Save the entire user locally
  }

  request(method: string, url: string, data: any | null): Promise<any> {
    let headers: any = {};

    if (this.getAuthToken() !== null) {
      headers = {"Authorization": "Bearer " + this.getAuthToken()};
    }

    return axios({
      method: method as Method, 
      url: url,
      data: data,
      headers: headers
    }).catch((error: any) => {
      console.error('Axios request failed:', error);
      throw error;
    });
  }

  login(user: User): void {
    this.setUser(user);
    this.setAuthToken(user.token);
    this.isLoggedIn = true;
  }
  
  setUser(user: User): void {
    this.currentUser = user;
    this.saveUserLocally();
  }

  logout(): void {
    this.currentUser = null;
    this.setAuthToken(null);
    this.isLoggedIn = false;
    this.clearUserLocally(); // Clear user information from local storage
  }

  hasToken(): boolean {
    return this.getAuthToken() !== null;
  }

  getUser(): User | null {
    return this.currentUser;
  }

  async getUserAsync(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser;
    } else {
      await this.loadUserFromServer();
      return this.currentUser;
    }
  }
  

  private saveUserLocally(): void {
    console.log('I am trying to save user: ', this.currentUser);
    if (this.currentUser) {
      window.localStorage.setItem("user", JSON.stringify(this.currentUser));
    }
  }

  private clearUserLocally(): void {
    window.localStorage.removeItem("user");
  }
}
