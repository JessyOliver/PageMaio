import { AbstractControl } from "@angular/forms";

export function minusculoValidator(control: AbstractControl) {

    const username = control.value as string;
    if(username !== username?.toLowerCase()) {
        return { minusculo: true };
    } else
    return null;
    
}
