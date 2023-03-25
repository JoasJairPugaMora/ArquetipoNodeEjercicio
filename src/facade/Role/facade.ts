import { Utils } from "../../commons/utils/Utils";
import { RoleService } from "../../services";
import { RoleTo } from "../../to/RoleTo ";
import { IRoleFacade } from "./interface";


/**
 * @export
 * @implements {IRoleModelService}
 */
const RoleFacade: IRoleFacade = {
    
    /**
     * @returns {Promise < any[] >}
     * @memberof RoleFacade
     */
    async create(role: RoleTo): Promise<RoleTo> {
        Utils.required({name: role.name});
        let RoleResponse: RoleTo = await RoleService.create(role);
        return RoleResponse;
    }
}

export default RoleFacade;