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

});