export class ClaimDto {
    id?: number;
    firstName: string;
    mobilePhone: string;
    note?: string;
    date: Date;
    claimType: string;
    company?: string;

    constructor(props: {
        id?: number;
        firstName: string;
        mobilePhone: string;
        note?: string;
        date: Date;
        claimType?: string;
        company?: string;
    }) {
        this.id = props.id ?? 0;
        this.firstName = props.firstName;
        this.mobilePhone = props.mobilePhone;
        this.note = props.note ?? '';
        this.date = props.date;
        this.claimType = props.claimType ?? 'Обсудить проект';
        this.company = props.company ?? '';
    }
}
