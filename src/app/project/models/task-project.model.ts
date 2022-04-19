import { Util } from "src/app/shared/service/util";

export class TaskProject {
    id!: number;
    title!: string;
    description!: string;
    user!: {
        id: number;
        name: number;
    }
    createDate = Util.convertDateForSave();
    expectedEndDate!: any;
    priorityLevel!:{
        id: number;
        name: string;
    }
    status = {
        id: 5,
        name: ''
    }
    idPhase!: number;
}