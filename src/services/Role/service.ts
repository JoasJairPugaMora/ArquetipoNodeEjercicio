import { IRoleService } from "./interface";
import Role from "../../models/Role.model";
import { RoleTo } from "../../to/RoleTo ";

/**
 * @export
 * @implements {IRoleModelService}
 */
const RoleService: IRoleService = {

    /**
     * @returns {Promise < any[] >}
     * @memberof RoleFacade
     */
    async create(role: RoleTo): Promise<RoleTo> {
        let roleModel = await Role.create(role);
        return roleModel
    }
}

export default RoleService;