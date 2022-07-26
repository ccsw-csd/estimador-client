import { CriteriaCalculationResponse } from "./CriteriaCalculationResponse";
import { FteBlockCalculation } from "./FteBlockCalculation";

export class BlockCalculationRequest {
    hours: number;
    archytectureHours: number;
    criteriaList: CriteriaCalculationResponse[];
    fteList: FteBlockCalculation[];
}