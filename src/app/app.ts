import {Component,} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {NoReactValidator} from './no-react.validator';
import {FormExperiment} from './form-experiment/form-experiment';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    JsonPipe,
    NoReactValidator,
    FormExperiment
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  person = {
    name: '',
    lastName: '',
    address: {
      street: '',
      building: 0
    }
  }

  // Метод вызывается при изменении значения (например, в input)
  onChange(value: string) {
    console.log(value);
    this.person.name = value;
  }

  // Метод вызывается при отправке формы
  onSubmit(form: NgForm) {
    console.log(form);
  }
}
