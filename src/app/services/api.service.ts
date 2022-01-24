import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from './models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  urlProtocol = 'http'
  // urlHost = '171.22.25.154'
 urlHost = 'localhost'
  urlPort = '7777'

  url = this.urlProtocol + "://" + this.urlHost + ":" + this.urlPort


  reqsendname(name:string){
let path:string = this.url + "/hello";
let params: HttpParams = new HttpParams();
params = params.set('pname',name);
return this.http.get(path,{params:params,responseType:'text'});
  }
  signup(email: string ,pass: string ){

    let path: string = this.url + "/hello_2" + "/" + email + "/" + pass ;

   return this.http.get(path , {responseType : 'text'});
  }
  login(person: Person){
    let path: string = this.url + '/api/user/auth';
    return this.http.post<Person>(path, person);
  }
  newPerson(person: Person) {
    let path: string = this.url + '/api/user/new';
    return this.http.post<Person>(path, person);
  }
  getPeople() {
    let path: string = this.url + '/api/user/all';
    return this.http.get<Person[]>(path);
  }

  public getOnlineUsers(){
    let path:string = "http://localhost:7777/users";
  return this.http.get(path, {responseType: "json"});
  }


}
