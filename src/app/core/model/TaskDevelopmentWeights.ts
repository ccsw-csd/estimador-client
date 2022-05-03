import { ElementWeight } from "./ElementWeight";

export class TaskDevelopmentWeights {
    id:number;
    name: String;
    workElementWeight: ElementWeight;
    quantityVerySimple: number;
    quantitySimple: number;
    quantityMedium: number;
    quantityComplex: number;
    reusability: number;
    hours: number;
    comment: String;
    elementName?: String;
}