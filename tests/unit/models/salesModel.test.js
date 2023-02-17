const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { insertSaleMock, allSalesMock, idSaleMock, newUpdateMock } = require('../mocks/sales.mock');

describe('Testa o salesModel', function () {
    it('Será validado o cadastro de uma venda com sucesso', async function () {
        const mockId = 4;

        sinon.stub(connection, 'execute').resolves([{ insertId: mockId }]);
        const result = await salesModel.insertSale(insertSaleMock);
        expect(result).to.deep.equal(mockId);
    });
    describe('Testa a função de listar as vendas', function () {
        it('Será validado o retorno de um array com 3 vendas', async function () {
            sinon.stub(connection, 'execute').resolves([allSalesMock]);
            const result = await salesModel.getAllSales();
            expect(result).to.deep.equal(allSalesMock);
        });
        it('Será validade o retorno de uma venda',async function () {
            const mockId = 2;

            sinon.stub(connection, 'execute').resolves([idSaleMock]);
            const result = await salesModel.getSaleById(mockId);
            expect(result).to.deep.equal(idSaleMock);
        });
    });
    describe('Testa a função de deletar uma venda', function () {
        it('Será validado o retorno de um array com 3 vendas', async function () {
            const id = 1;
            sinon.stub(connection, 'execute').resolves(newUpdateMock);
            const data = await salesModel.deleteSale(id);
            expect(data[0].affectedRows).to.be.equal(1);
        });
    });
    afterEach(function () {
        sinon.restore();
    });
});