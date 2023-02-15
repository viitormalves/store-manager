const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel, salesModel } = require('../../../src/models');
const { salesServices } = require('../../../src/services');

const { insertFailProductMock, insertFailQuantityMock, insertSaleMock,
} = require('../mocks/sales.mock');
const { allProducts } = require('../mocks/products.mock');

describe('Testa o salesServices', function () {
    it('Será validado o erro de quantidade inválida', async function () {
        const typeMock = 422;
        const messageMock = '"quantity" must be greater than or equal to 1';

        const result = await salesServices.insertSale(insertFailQuantityMock);
        expect(result.type).to.deep.equal(typeMock);
        expect(result.message).to.deep.equal(messageMock);
    });
    it('Será validado o erro de um produto inexistente', async function () {
        const typeMock = 404;
        const messageMock = 'Product not found';

        sinon.stub(productsModel, 'getAllProducts').resolves(allProducts)
        const result = await salesServices.insertSale(insertFailProductMock);
        expect(result.type).to.deep.equal(typeMock);
        expect(result.message).to.deep.equal(messageMock);
    });
    it('Será validado o cadastro de uma venda com sucesso', async function () {
        const insertId = 4;
        const messageMock = { id: insertId, itemsSold: insertSaleMock };

        sinon.stub(productsModel, 'getAllProducts').resolves(allProducts)
        sinon.stub(salesModel, 'insertSale').resolves(insertId);

        const result = await salesServices.insertSale(insertSaleMock);

        expect(result.message).to.deep.equal(messageMock);
    });

    afterEach(function () {
        sinon.restore();
    });
});