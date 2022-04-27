import { ElementWeight } from "./ElementWeight";
import { TaskDevelopmentWeights } from "./TaskDevelopmentWeights";

export class WeightCalculationRequest {
    tasks: TaskDevelopmentWeights[];
    weights: ElementWeight[];
}