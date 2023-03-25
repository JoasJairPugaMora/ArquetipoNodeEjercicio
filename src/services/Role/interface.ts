import { RoleTo } from "../../to/RoleTo ";

/**
 * @export
 * @interface IRoleService
 */
export interface IRoleService {

     /**
     * @returns {Promise<RoleTo>}
     * @memberof IRoleService
     */
    create(role: RoleTo): Promise<RoleTo>;
}