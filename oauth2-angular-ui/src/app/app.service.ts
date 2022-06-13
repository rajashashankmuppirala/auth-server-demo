import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";


export class Resource {
  constructor(
    public id: number,
    public name: string) { }
}

@Injectable()
export class AppService {
  public clientId = 'test-client';
  public redirectUri = 'http://127.0.0.1:4200';

  constructor(
    private _http: HttpClient){}

  retrieveToken(code: any){
    let params = new URLSearchParams();
    params.append('grant_type','authorization_code');
    params.append('client_id', this.clientId);
    params.append('client_secret', 'test-secret');
    params.append('redirect_uri', this.redirectUri);
    params.append('code',code);
    params.append('scope','openid');

    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
    this._http.post('http://localhost:9000/oauth2/token', params.toString(), { headers: headers })
      .subscribe(
        data => this.saveToken(data),
        err => alert('Invalid Credentials')
      );
  }

  saveToken(token: any){
    console.log('saving token');
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    sessionStorage.setItem("access_token", token.access_token);
    sessionStorage.setItem("id_token", token.id_token);
    console.log('Obtained Access token');
    //window.location.href = 'http://127.0.0.1:4200/success';
    window.location.href = '/';
  }

  getResource(resourceUrl: any) : Observable<any>{
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
    });
    return this._http.get(resourceUrl, { headers: headers });
  }

  checkCredentials(){
    return (sessionStorage.getItem('access_token'))? true : false;
  }

  logout() {
    let token = sessionStorage.getItem('access_token');
    let params = new URLSearchParams();
    // @ts-ignore
    params.append('token',token);
    params.append('client_id', this.clientId);
    params.append('client_secret', 'test-secret');

    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
    this._http.post('http://localhost:9000/oauth2/revoke', params.toString(), { headers: headers})
      .subscribe(
        data => {
          sessionStorage.removeItem('access_token');
          sessionStorage.removeItem('id_token');

          window.location.href = "http://localhost:9000/logout";
        },
        err => console.log('Failed revocation')
      );
  }
}
