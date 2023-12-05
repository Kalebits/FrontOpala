
import { AbstractControl } from '../../node_modules/@angular/forms';


export class Validacoes {

  static isEmail(controle: AbstractControl) {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
      const value = controle.value;
      if(!regex.test(value)) 
        return true
      else return true;
  }
  
}
