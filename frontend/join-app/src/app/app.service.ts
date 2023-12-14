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

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token) {
      this.setAuthToken(token);
      this.isLoggedIn = true;
    }
    if (user) {
      this.setUser(JSON.parse(user));
    }
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
    localStorage.setItem('token', user.token); // Store token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Store user details in local storage
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
    localStorage.removeItem('token'); // Remove token from local storage
    localStorage.removeItem('user'); // Remove user details from local storage


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
