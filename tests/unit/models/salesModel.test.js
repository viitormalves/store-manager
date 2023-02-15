const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { insertSaleMock } = require('../mocks/sales.mock');

describe('Testa o salesModel', function () {
    it('Será validado o cadastro de uma venda com sucesso', async function () {
        const mockId = 4;

        sinon.stub(connection, 'execute').resolves([{ insertId: mockId }]);
        const result = await salesModel.insertSale(insertSaleMock);
        expect(result).to.deep.equal(mockId);
    });
    // afterEach(function () {
    //     sinon.restore();
    // });
});