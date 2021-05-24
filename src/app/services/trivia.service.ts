import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  readonly WEB_URL: string = environment.serverUrl;


  constructor(private _http: HttpClient, private routes:Router) { }


  getUser(nickname): Promise<any> {
    return this._http.get(this.WEB_URL.concat(`/api/player/getByNickname/${nickname}`)).toPromise();
  }


 createUsers(data){
    return this._http.post(this.WEB_URL.concat(`/api/player/simpleStore`), data).toPromise();
  }
  
  consultarPreguntas(id){
    return this._http.get(this.WEB_URL.concat(`/api/question/getByCategoryId/${id}`)).toPromise();
  }

  consultarRespuestas(id){
    return this._http.get(this.WEB_URL.concat(`/api/answer/getByQuestionId/${id}`)).toPromise();
  }

}

