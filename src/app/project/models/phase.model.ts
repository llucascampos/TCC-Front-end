import { Util } from "src/app/shared/service/util";
import { PriorityLevel } from "./priority.model";
import { TaskProject } from "./task-project.model";

export class Phase {
    id!: number;
    name!: string;
    startDate = Util.convertDateForSave();
    idProject!: number;
    description!: string;
    tasks!: Array<TaskProject>;
    status = {
        id: 5,
        name: "",
    }
    priorityLevel: PriorityLevel | undefined;
}