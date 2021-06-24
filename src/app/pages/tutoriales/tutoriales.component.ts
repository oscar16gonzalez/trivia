import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tutoriales',
  templateUrl: './tutoriales.component.html',
  styleUrls: ['./tutoriales.component.scss'],
})
export class TutorialesComponent implements OnInit {
  actual = 1;
  tutorial = [];
  tutorialActual = 1;
  tut;
  @Input() text;

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {

    console.log("props-- viene", this.text);
    console.log("viene tut", this.tut);
    
    console.log(this.text);

    this.tutorial = this.text

  }

  entendido() {
    this.tutorialActual++;

    console.log("continua", this.tutorial[this.tutorialActual - 1]);

    if (this.tutorial[this.tutorialActual - 1] === undefined) {
      this.popoverController.dismiss();
      localStorage.setItem('tutorial-mapamundi', this.tut);
    }

  }

}
