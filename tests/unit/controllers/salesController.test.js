const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesServices } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { productsModel } = require('../../../src/models');

const { insertSaleMock, insertFailProductMock, allSalesMock, idSaleMock } = require('../mocks/sales.mock');
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
    describe('Testa a função de listar as vendas', function () {
        it('Será validado o retorno do status 200 para listar todas as compras', async function () {
            const req = {};
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);
            
            sinon.stub(salesServices, 'getAllSales').resolves(allSalesMock);
            await salesController.getAllSales(req, res);
            expect(res.status).to.have.been.calledWith(200);
        });
        it('Será validado o retorno do status 200 listando uma venda pelo id', async function () {
            const req = {};
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);
            req.params = { id: 2 };
            
            sinon.stub(salesServices, 'getSaleById').resolves(idSaleMock);
            await salesController.getSaleById(req, res);
            expect(res.status).to.have.been.calledWith(200);
        });
        it('Será validado o retorno do status 404 não listando uma venda pelo id', async function () {
            const req = {};
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);
            req.params = { id: 3 };
            
            sinon.stub(salesServices, 'getSaleById').resolves({ type: 404 });
            await salesController.getSaleById(req, res);
            expect(res.status).to.have.been.calledWith(404);
        });
    });
    describe('Testando a funcionalidade de deletar produtos', async function () {
        it('Se ao deletar o produto o status retorna 204', async function () {
            const req = {};
            const res = {};
            res.status = sinon.stub().returns(res);
            res.end = sinon.stub().returns(res);
            req.params = { id: 1 };

            sinon.stub(salesServices, 'deleteSale').resolves({ message: '' });
            await salesController.deleteSale(req, res);
            expect(res.status).to.have.been.calledWith(204);
        });
        it('Se enviar um id inválido retorna o status 404', async function () {
            const req = {};
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);
            req.params = { id: 1 };

            sinon.stub(salesServices, 'deleteSale').resolves({ type: 404 });
            await salesController.deleteSale(req, res);
            expect(res.status).to.have.been.calledWith(404);
        });
    });
    afterEach(function () {
        sinon.restore();
    });
});