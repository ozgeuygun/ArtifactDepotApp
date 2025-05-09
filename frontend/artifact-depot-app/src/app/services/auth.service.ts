import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import{JwtHelperService} from '@auth0/angular-jwt'
import { TokenApiModel } from '../components/models/token-api.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string="https://localhost:7100/api/User/";
  private userPayload:any; 
  constructor(private http : HttpClient, private router: Router) {
  this.userPayload=this.decodedToken(); 
   }

  signUp(userRegister:any){
    return this.http.post<any>(`${this.baseUrl}register`,userRegister);
  }

  login(userLogin:any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,userLogin);
  }
  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token',tokenValue);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }
  
  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  decodedToken(){
    const jwtHelper=new JwtHelperService();
    const token=this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  } 

  getfullNameFromToken(){
    if(this.userPayload)
      return this.userPayload.name;
      }

  getRoleFromToken(){
    if(this.userPayload)
     return this.userPayload.role;
       }

  renewToken(tokenApi : TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi);
          }

}
