import {Component, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MockService} from '../services/mock.service';
import {KeyValuePipe} from '@angular/common';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL'
}

interface Address {
  city?: string
  street?: string
  building?: number
  apartment?: number
}

interface Feature {
  code: string
  label: string
  value: boolean
}

function getAddressForm(initialValue: Address = {}) {
  return new FormGroup({
    city: new FormControl<string>(initialValue.city ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    building: new FormControl<number | null>(initialValue.building ?? null),
    apartment: new FormControl<number | null>(initialValue.apartment ?? null),
  })
}

@Component({
  selector: 'app-form-experiment',
  imports: [
    ReactiveFormsModule,
    KeyValuePipe
  ],
  templateUrl: './form-experiment.html',
  styleUrl: './form-experiment.scss'
})
export class FormExperiment {
  ReceiverType = ReceiverType

  mockService = inject(MockService)
  features: Feature[] = [];

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>('', Validators.required),
    inn: new FormControl<string>(''),
    lastName: new FormControl<string>('angular2025'),
    addresses: new FormArray([getAddressForm()]),
    feature: new FormRecord({})
  })

  // Конструктор теперь знает благодаря valueChanges
  // при заполнении формы от физ лица и юр лица
  constructor() {
    this.mockService.getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe(addrs => {
        // while (this.form.controls.addresses.controls.length > 0) {
        //   this.form.controls.addresses.removeAt(0)
        // }
        this.form.controls.addresses.clear()

        for (const addr of addrs) {
          this.form.controls.addresses.push(getAddressForm(addr))
        }

        // this.form.controls.addresses.setControl(1, getAddressForm(addrs[0])) // Заменяет все пустые поля инпут первыми значениями
        // console.log(this.form.controls.addresses.at(0)) // Получаем в консоли первое значение
        // this.form.controls.addresses.disable() // блокирует все поля
      })

    this.mockService.getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe(features => {
        this.features = features

        for (const feature of features) {
          this.form.controls.feature.addControl(
            feature.code,
            new FormControl(feature.value)
          )
        }
      })

    this.form.controls.type.valueChanges // valueChanges это observable
      .pipe(takeUntilDestroyed())
      .subscribe(val => {
        // убирает все валидаторы inn через clearValidators при выборе физ лицо
        this.form.controls.inn.clearValidators()

        // Добавление валидатора для поля ИНН при выборе, юр лица
        if (val === ReceiverType.LEGAL) {
          this.form.controls.inn.setValidators(
            [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
          )
        }
      })
  }

  onSubmit(event: SubmitEvent) {
    this.form.markAsTouched()
    this.form.updateValueAndValidity()
    if (this.form.invalid) return

    console.log('this.form.value', this.form.value)
    console.log('this.form.getRawValue', this.form.getRawValue())
  }

  addAddress() {
    this.form.controls.addresses.insert(0, getAddressForm())
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, {emitEvent: false})
  }

  sort = () => 0
}
