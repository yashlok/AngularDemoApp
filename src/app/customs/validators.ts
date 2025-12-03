import { AbstractControl, ValidationErrors } from "@angular/forms";

export class MyValidators {

    static codeValdiator(control: AbstractControl): ValidationErrors | null
    {
        let value = control.value as string;
        if(value != '' && value.indexOf('P') !== 0){
            return { code : true }
        }

        return null;
    }
}
