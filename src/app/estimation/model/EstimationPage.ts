import { Pageable } from "src/app/core/model/Pageable";
import { Estimation } from "src/app/core/model/Estimation";

export class EstimationPage{
    content: Estimation[];
    pageable: Pageable;
    totalElements: number;
}