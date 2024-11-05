import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ConsultaCepService } from '../service/consulta-cep.service';

@Directive({
  selector: '[validarCep]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: ValidarCepDirective,
    multi: true
  }]
})
export class ValidarCepDirective implements AsyncValidator {

  constructor(private service: ConsultaCepService) { }
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const cep = control.value;
    return this.service.consultarCep(cep).pipe(map((res: any) => res.erro ? {'validarCep': true} : null))
  }
}
