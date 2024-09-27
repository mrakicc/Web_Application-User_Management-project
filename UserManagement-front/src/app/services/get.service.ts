import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetService {

  private token: string = "";

  constructor(private httpClient : HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.httpClient.get("http://localhost:8080/api/users/all", {observe: 'response', headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        "Authorization":"Bearer " + this.getToken()
    }})
  }

  addUser(name:string, last_name:string, email:string, password:string, permissions:string[]) : Observable<any> {
    return  this.httpClient.post('http://localhost:8080/api/users',{name, last_name, email, password, permissions}, {observe:'response',headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        "Authorization":"Bearer " + this.getToken()
      }})
  }

  editUser(userId:number, name:string, last_name:string, email:string, password:string,permissions:string[]) : Observable<any> {
    return  this.httpClient.put('http://localhost:8080/api/users',{userId, name, last_name, email, password,permissions}, {observe:'response',headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        "Authorization":"Bearer " + this.getToken()
      }})
  }

  getUser(email:string) : Observable<any> {
    return  this.httpClient.get('http://localhost:8080/api/users/' + email, {observe:'response',headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        "Authorization":"Bearer " + this.getToken()
      }})
  }

  deleteUser(id:number) : Observable<any> {
    return  this.httpClient.delete('http://localhost:8080/api/users/' + id, {observe:'response',headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        "Authorization":"Bearer " + this.getToken()
      }})
  }

  getToken():string{
    if(localStorage.getItem("token") === null) {
      return "";
    }
    let value = localStorage.getItem("token");
    if(typeof value === 'string') {
      this.token = value;
    }
    return  this.token;

  }

}
