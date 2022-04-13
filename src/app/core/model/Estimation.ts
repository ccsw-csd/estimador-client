import { User } from "src/app/core/model/User";
import { Consideration } from "./Consideration";
import { Criterion } from "./Criterion";
import { ElementWeight } from "./ElementWeight";
import { Project } from "./Project";
import { TaskArchitecture } from "./TaskArchitecture";
import { TaskDevelopment } from "./TaskDevelopment";

export class Estimation{
    id: number;
    created: Date;
    createdBy: User;
    estVersion: string;
    project: Project;
    totalCost: number;
    totalDays: number;
    lastUpdate: Date;
    status: number;
    showhours: Boolean;
    globalCriteria: Criterion[];
    elementsWeights: ElementWeight[];
    architectureTasks: TaskArchitecture[];
    developmentTasks: TaskDevelopment[];
    considerations: Consideration[];
}