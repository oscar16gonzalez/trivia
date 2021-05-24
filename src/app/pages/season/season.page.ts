import { Component, OnInit } from '@angular/core';
import { TriviaService } from 'src/app/services/trivia.service';

@Component({
  selector: 'app-season',
  templateUrl: './season.page.html',
  styleUrls: ['./season.page.scss'],
})
export class SeasonPage implements OnInit {
  preguntas;
  respuestas;
  buton = "../../assets/img/boton-preguntas.svg"; 
  boton: boolean = true;
  constructor(private service: TriviaService) { }

  ngOnInit() {
    this.service.consultarPreguntas(1).then((result) => {
      this.preguntas = result['questions'];


    }).catch((err) => {
      console.log(err);

    });

    this.service.consultarRespuestas(2).then((result) => {
      console.log(result);
      this.respuestas = result['answers'];

      console.log(this.respuestas);


    }).catch((err) => {
      console.log(err);

    });
  }

  onClick(e) {
    console.log(e);

    if (e) {
      this.boton = false
      this.buton = "../../assets/img/boton-verde.svg"
    }else{
      this.buton = "../../assets/img/boton-preguntas.svg"
    }

  }
}
