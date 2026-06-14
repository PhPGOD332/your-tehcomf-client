export interface TFormInputs {
    firstName: string;
    mobilePhone: string;
    note: string;
    date: Date;
    claimType: string;
}

export interface TLimitedFormInputs {
    firstName: string;
    mobilePhone: string;
    date: Date;
}

export enum TFormInputsNames {
    firstName = 'firstName',
    mobilePhone = 'mobilePhone',
    note = 'note',
    date = 'date',
}
