export class ClaimDto {
    id?: number;
    firstName: string;
    mobilePhone: string;
    note?: string;
    date: Date;
    callDesign?: boolean;
    discussProject?: boolean;

    constructor(props: {
        id?: number;
        firstName: string;
        mobilePhone: string;
        note?: string;
        date: Date;
        callDesign?: boolean;
        discussProject?: boolean;
    }) {
        this.id = props.id ?? 0;
        this.firstName = props.firstName;
        this.mobilePhone = props.mobilePhone;
        this.note = props.note ?? '';
        this.date = props.date;
        this.callDesign = props.callDesign ?? false;
        this.discussProject = props.discussProject ?? false;
    }
}