const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesServices } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { productsModel } = require('../../../src/models');

const { insertSaleMock, insertFailProductMock } = require('../mocks/sales.mock');
const { allProducts } = require('../mocks/products.mock');

describe('Testa o salesController', function () {
    it('Será validado o status de uma venda com sucesso', async function () {
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);

        sinon.stub(salesServices, 'insertSale').resolves(insertSaleMock);

        await salesController.insertSale(req, res);

        expect(res.status).to.have.been.calledWith(201);
    });
    it('Será validado o status de um erro de quantidade', async function () {
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = insertFailProductMock;

        sinon.stub(productsModel, 'getAllProducts').returns(allProducts);
        await salesController.insertSale(req, res);

        expect(res.status).to.have.been.calledWith(404);
    });
    afterEach(function () {
        sinon.restore();
    });
});