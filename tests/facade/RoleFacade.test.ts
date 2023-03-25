process.env.NODE_ENV = 'test'

import { expect } from "chai";
import { db } from '../../src/config/connection/database';
import { ParametersError } from "../../src/config/error";
import { RoleTo } from "../../src/to/RoleTo";
import RoleFacade from "../../src/facade/Role/facade";

describe('RoleFacade Test', () => {

    before('Init', async () => {
        await db.sync({ force: true });
       
    });

    describe('Create', () => {
        it('should create one user', async () => {
            let roleTo: RoleTo = {
                name: "Admin",
            }
            const user: RoleTo = await RoleFacade.create(roleTo);
            expect(user.id).to.not.be.null;
        });
    });

    describe('Create Error atributes required', () => {
        it('should retur error -> attributes required', async () => {
            let roleTo: RoleTo = {
            }
            try {
                await RoleFacade.create(roleTo);
            } catch (error: any) {
                expect(error).instanceOf(ParametersError)
                expect(error.message).equal('El atributo name es requerido')
            }
        });
    });

    describe("FindAll", () => {
        it("should return roles", async () => {
          const roles: any[] = await RoleFacade.findAll();
          expect(1).equal(roles.length);
        });
      });
    
      describe("Update", () => {
        it("should return id updated", async () => {
          let roleTo: RoleTo = {
            id: 1,
            name: "Employee",
          };
          try {
            await RoleFacade.update_role(roleTo);
            //expect(result).instanceOf(Promise<void>);
          } catch (error) {
            expect(error).equal(new ParametersError("No se pudo actualizar"));
          }
        });
      });
    
      describe("Delete error", () => {
        it("should return error -> User not exist", async () => {
          let idToDelete: number = 999;
          try {
            await RoleFacade.delete_role(idToDelete);
          } catch (error) {
            expect(error).instanceOf(ParametersError);
          }
        });
      });

});