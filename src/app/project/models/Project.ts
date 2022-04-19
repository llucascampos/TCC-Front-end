import { Util } from "src/app/shared/service/util";
import { User } from "src/app/user/models/user.model";
import { Phase } from "./phase.model";

export class Project {
    id: number = 0;
    name: string;
    description: string;
    startDate: string = Util.convertDateForSave();
    members: Array<User>;
    manager: User;
    phases: Array<Phase>;
    status = {
        id: 5,
        name: ""    
    }
}