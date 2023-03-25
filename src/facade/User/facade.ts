import { Utils } from "../../commons/utils/Utils";
import { UserService } from "../../services";
import { UserTo } from "../../to/UserTo";
import { IUserFacade } from "./interface";
import * as Kafka from '../../config/stream/kafka';
import { ParametersError } from "../../config/error";


/**
 * @export
 * @implements {IUserModelService}
 */
const UserFacade: IUserFacade = {
    /**
     * @returns {Promise < any[] >}
     * @memberof UserFacade
     */
    async findAll(): Promise<UserTo[]> {

        let User = await UserService.findAll();
        return User;
    },

    /**
     * @returns {Promise < any[] >}
     * @memberof UserFacade
     */
    async create(user: UserTo): Promise<UserTo> {
        Utils.required({email: user.email});
        await UserService.validateExistUser(user.email);
        let userResponse: UserTo = await UserService.create(user);
        return userResponse;
    },

    /**
     * @returns {Promise < any[] >}
     * @memberof UserFacade
     */
    async publish(id: number): Promise<void> {
        await Kafka.send('user-service-topic', `${id}`);
    },

    /**
     * @returns {Promise < any[] >}
     * @memberof UserFacade
     */
    async consumer(id: number): Promise<void> {
        await UserService.del(id);
    },

    /**
     * @returns {Promise < any[] >}
     * @memberof UserFacade
     */
    async update_user(idToUpdate: number, userTo: UserTo): Promise<void> {
        try {
          await UserService.update_user(idToUpdate, userTo);
        } catch (error) {
          throw new ParametersError("No se pudo actualizar");
        }
      },
}

export default UserFacade;