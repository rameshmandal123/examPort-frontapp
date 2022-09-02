import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login} from "../../assets/model/login";
import baseURL from "./helper";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient,
              ) { }

// generate user toke........
public generateToken(loginData: any){
    return this.http.post(`${baseURL}/generate-token`,loginData)
}

// User Login : set token in localStore...............
  public loginUser(token: any){
    localStorage.setItem('token',token);
    return true;
  }


// isLogin: login or not............................
  public isLoggedIn(){
    let tokenStr = localStorage.getItem("token")
    if(tokenStr === undefined || tokenStr ==='' || tokenStr === null){
      return false;
    }else {
      return true;
    }
  }

  // logOut: remove token from local Storage...
  public logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  // //set token
  // public setToken(token: any){
  //  localStorage.setItem('token',token)
  //   return true;
  // }

// get token......
  public getToken(){
    return localStorage.getItem('token');
  }

//Get Current Login user Api.......................
  public getCurrentUser(){
    return this.http.get(`${baseURL}/current-user`);

  }

  // set UserDetails...
  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user))
  }

  // get UserDetails.
  public getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else {
   this.logOut();
   return null;
    }
  }

  // get UserRole.........
  public getUserRole(){
    let userRole = this.getUser();
    return userRole.authorities[0].authority;
  }
}
