export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        const config = {
            required: 'Required',
            invalidLogin: 'Is invalid login',
            invalidPassword: 'Invalid password.',
            minlength: `Minimum length ${validatorValue.requiredLength}`,
        };

        return config[validatorName];
    }

    static loginValidator(control) {
        const regex = new RegExp('^[a-z]+$', 'g');
        if (regex.test(control.value.toLocaleLowerCase())) { return null; }
        return { invalidLogin: true };
    }

    static pswdValidator(control) {
        const regex = new RegExp('^[a-z]+$', 'g');
        if (regex.test(control.value.toLocaleLowerCase())) { return null; }
        return { invalidPassword: true };
    }

}
