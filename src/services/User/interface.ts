import Users from "../../models/User.model";
import { UserTo } from "../../to/UserTo";

/**
 * @export
 * @interface IUserService
 */
export interface IUserService {

    /**
     * @returns {Promise<any[]>}
     * @memberof IUserService
     */
    findAll(): Promise<any[]>;

    /**
     * @returns {Promise<UserTo>}
     * @memberof IUserService
     */
    validateExistUser(email?: string): Promise<void>;

     /**
     * @returns {Promise<UserTo>}
     * @memberof IUserService
     */
    create(user: UserTo): Promise<Users>;

    /**
     * @returns {Promise<UserTo>}
     * @memberof IUserService
     */
    del(id: number): Promise<void>;

    /**
   * @returns {Promise<any[]>}
   * @memberof IRoleService
   */
  update_user(idToUpdate: number, userTo: UserTo): Promise<void>;
}