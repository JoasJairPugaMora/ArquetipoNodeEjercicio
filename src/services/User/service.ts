import { IUserService } from "./interface";
import User from "../../models/User.model";
import * as Kafka from "../../config/stream/kafka"
import Users from "../../models/User.model";
import { UserTo } from "../../to/UserTo";
import { ParametersError } from "../../config/error";

/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
    /**
     * @returns {Promise < any[] >}
     * @memberof UserFacade
     */
    async findAll(): Promise<any[]> {
        // Para enviar un mensaje a kafka
        // await Kafka.send("test", 'Hello');
        return User.findAll();
    },

    /**
     * @returns {Promise < any[] >}
     * @memberof UserFacade
     */
    async validateExistUser(email?: string): Promise<void> {

        let user = await User.findAll({
            where: {
                email: email
            }
        })

        if (user.length > 0) {
            throw new ParametersError("El usuario ya existe");
        }
    },

    /**
     * @returns {Promise < any[] >}
     * @memberof UserFacade
     */
    async create(user: UserTo): Promise<Users> {
        let userModel = await User.create(user);
        return userModel
    },

    /**
     * @returns {Promise < any[] >}
     * @memberof UserFacade
     */
    async del(id: number): Promise<void> {
        User.destroy({
            where: {
                id:id
            }
        });
    },

    /**
     * @returns {Promise < any[] >}
     * @memberof UserFacade
     */
    async update_user(idToUpdate: number, userTo: UserTo): Promise<void> {
        try {
          let result = await Users.update(userTo, { where: { id: idToUpdate } });
          console.log("Result on service update: ", result);
        } catch (error) {
          console.log("Error on service update ", error);
          throw new ParametersError("No se pudo actualizar");
        }
      },
}

export default UserService;