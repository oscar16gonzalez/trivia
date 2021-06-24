import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  readonly WEB_URL: string = environment.serverUrl;
  private httpOptions: any;


  constructor(private _http: HttpClient, private routes: Router) {
    try {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Accepapplication': '*',
          'Content-Type': 'application/json'

        })
      };
    } catch (Exception) { }
  }


  getUser(nickname): Promise<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) };
    return this._http.get(this.WEB_URL.concat(`/api/player/getByNickname/${nickname}`), httpOptions).toPromise();
  }


  createUsers(data) {
    return this._http.post(this.WEB_URL.concat(`/api/player/simpleStore`), data).toPromise();
  }

  consultarPreguntas(id, dificultad) {
    console.log("--------------_____________-----------");
    console.log(id);
    console.log(dificultad);
    return this._http.get(this.WEB_URL.concat(`/api/question/getByCategoryId/${id}/${dificultad}`)).toPromise();
  }

  consultarRespuestas(id) {
    return this._http.get(this.WEB_URL.concat(`/api/answer/getByQuestionId/${id}`)).toPromise();
  }

  consultarCategorias(id, usuario) {
    return this._http.get(this.WEB_URL.concat(`/api/category/getByBoardId/${id}/${usuario}`)).toPromise();
  }

  consultarCategoriaActual(usuario){
    return this._http.get(this.WEB_URL.concat(`/api/category/getByCurrentBoard/${usuario}`)).toPromise();
  }

  consultarTemporadas(id) {
    return this._http.get(this.WEB_URL.concat(`/api/board/getAll/active=${id}`)).toPromise();
  }

  consultarTutoriales() {
    return this._http.get(this.WEB_URL.concat(`/api/tutorial/getAll?active=1`)).toPromise();
  }

  consultarPublicidad() {
    return this._http.get(this.WEB_URL.concat(`/api/advertising/getAll?active=1`)).toPromise();
  }

  consultarProgreso(temporada, id) {
    return this._http.get(this.WEB_URL.concat(`/api/player/getStatistics/${temporada}/${id}`)).toPromise();
  }

  saveData(dataPartido) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    console.log("DATA PARTIDO", dataPartido);
    return this._http.post(this.WEB_URL.concat(`/api/play/store`), dataPartido, httpOptions).toPromise();
  }

  desbloquearCategoria(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    console.log("DATA DESBLOQUEARCATEGORIA", data);
    return this._http.post(this.WEB_URL.concat(`/api/category/unlockCategoryPlayer`), data, httpOptions).toPromise();
  }


}

