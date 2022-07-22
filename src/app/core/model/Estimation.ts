import { User } from "src/app/core/model/User";
import { Consideration } from "./Consideration";
import { Criterion } from "./Criterion";
import { ElementWeight } from "./ElementWeight";
import { Fte } from "./Fte";
import { ProfileParticipation } from "./ProfileParticipation";
import { Project } from "./Project";
import { TaskArchitecture } from "./TaskArchitecture";
import { TaskDevelopmentHours } from "./TaskDevelopmentHours";
import { TaskDevelopmentWeights } from "./TaskDevelopmentWeights";
import { CostPerGrade } from "./CostPerGrade";

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
    parameters: Criterion[];
    elementWeight: ElementWeight[];
    architectureTasks: TaskArchitecture[];
    developmentTasksHours: TaskDevelopmentHours[];
    developmentTasksWeights: TaskDevelopmentWeights[];
    considerations: Consideration[];
    distribution: ProfileParticipation[]; 
    teamPyramid: Fte[];
    costs: CostPerGrade[];
    collaborators: User[];
}