export interface TFormInputs {
    firstName: string;
    mobilePhone: string;
    note: string;
    date: Date;
    callDesign: boolean;
    discussProject: boolean;
}

export interface TLimitedFormInputs {
    firstName: string;
    mobilePhone: string;
}

export enum TFormInputsNames {
    firstName = 'firstName',
    mobilePhone = 'mobilePhone',
    note = 'note',
    date = 'date',
}