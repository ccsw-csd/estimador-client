import { User } from "./User";
import { Customer } from "./Customer";

export class Project{
    id: number;
    name: string;
    created: Date;
    createdBy: User;
    customer: Customer;
}