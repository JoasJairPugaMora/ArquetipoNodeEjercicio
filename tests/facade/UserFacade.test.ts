process.env.NODE_ENV = 'test'

import { expect } from "chai";
import UserFacade from '../../src/facade/User/facade';
import { db } from '../../src/config/connection/database';
import User from "../../src/models/User.model";
import * as Kafka from "../../src/config/stream/kafka";
import { UserTo } from "../../src/to/UserTo";
import { ParametersError } from "../../src/config/error";

describe('UserFacade Test', () => {

    before('Init', async () => {
        await db.sync({ force: true });
        User.create({
            id: 1,
            name: 'test',
            email: 'test@axity.com',
            createdAt: '2020-01-01',
            updatedAt: '2020-01-01'
        });
    });

    describe('FindAll', () => {
        it('should return one user', async () => {
            const User: any[] = await UserFacade.findAll();
            expect(1).equal(User.length);
        });
    });

    describe('Create', () => {
        it('should create one user', async () => {
            let userTo: UserTo = {
                name: "Juan",
                email: "Juan@axity.com"
            }
            const user: UserTo = await UserFacade.create(userTo);
            expect(user.name).equal("Juan");
        });
    });

    describe('Create Error', () => {
        it('should retur error', async () => {
            let userTo: UserTo = {
                name: "Juan",
                email: "test@axity.com"
            }
            try {
                await UserFacade.create(userTo);
            } catch (error) {
                expect(error).instanceOf(ParametersError)
            }
        });
    });

    describe('Create Error atributes required', () => {
        it('should retur error -> attributes required', async () => {
            let userTo: UserTo = {
                name: "Juan"
            }
            try {
                await UserFacade.create(userTo);
            } catch (error: any) {
                expect(error).instanceOf(ParametersError)
                expect(error.message).equal('El atributo email es requerido')
            }
        });
    });

    describe("Update", () => {
        it("should return id updated", async () => {
          let userTo: UserTo = {
            id: 1,
            name: "Employee",
          };
          try {
            await UserFacade.update_user(userTo.id!,userTo);
            //expect(result).instanceOf(Promise<void>);
          } catch (error) {
            expect(error).equal(new ParametersError("No se pudo actualizar"));
          }
        });
      });

      describe("Update", () => {
        it("should return id updated", async () => {
          let userTo: UserTo = {
            id: 99,
            name: "Employee",
          };
          try {
            await UserFacade.update_user(userTo.id!,userTo);
            //expect(result).instanceOf(Promise<void>);
          } catch (error) {
            expect(error).equal(new ParametersError("No se pudo actualizar"));
          }
        });
      });


});