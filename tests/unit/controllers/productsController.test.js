const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { allProducts, oneProduct, newProduct } = require('../mocks/products.mock');

describe('Testa o productsController', function () {
    it('Lista todos os produtos', async function () {
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);

        sinon.stub(productsService, 'getAllProducts').resolves({ message: allProducts });

        await productsController.getAllProducts(req, res);

        expect(res.status).to.have.been.calledWith(200);
    });
    it('Lista um produtos pelo id fornecido', async function () {
        const req = { params: { id: 2 }};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);

        sinon.stub(productsService, 'getByProductId').resolves({ message: oneProduct });

        await productsController.getByProductId(req, res);

        expect(res.status).to.have.been.calledWith(200);
    });
    it('Devolve erro se pesquisar um id de produto inexistente', async function () {
        const req = { params: { id: 99 }};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);

        sinon.stub(productsService, 'getByProductId').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

        await productsController.getByProductId(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
    describe('Testando a funcionalidade de adicionar novos produtos', async function () {
        it('Se cria um novo produto enviando um nome possível', async function () {
            const req = {};
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);
            req.body = { name: 'Skateboard' };
        
            sinon.stub(productsService, 'createProduct').resolves(newProduct)
            await productsController.createProduct(req, res);
            expect(res.status).to.have.been.calledWith(201);
            expect(res.json).to.have.been.calledWithExactly(newProduct[0]);
          });
    });
    describe('Testando a funcionalidade de atualizar produtos', async function () {
        it('Se retorna status 200 após atualizar o nome de um produto', async function () {
            const req = {};
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);
            req.params = { id: 1 };
            req.body = { name: 'Martelo do Batman' };

            const message = { id: 4, name: 'Martelo do Batman'};

            sinon.stub(productsService, 'updateProduct').resolves(message);
            await productsController.updateProduct(req, res);
            expect(res.status).to.have.been.calledWith(200);
        });
        it('Se retorna status 404 após enviar um id inválido', async function () {
            const req = {};
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);
            req.params = { id: 1 };
            req.body = { name: 'Martelo do Batman' };

            const data = { type: 404, message: 'Product not found'};

            sinon.stub(productsService, 'updateProduct').resolves(data);
            await productsController.updateProduct(req, res);
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

            sinon.stub(productsService, 'deleteProduct').resolves({ message: '' });
            await productsController.deleteProduct(req, res);
            expect(res.status).to.have.been.calledWith(204);
        });
        it('Se enviar um id inválido retorna o status 404', async function () {
            const req = {};
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);
            req.params = { id: 1 };

            sinon.stub(productsService, 'deleteProduct').resolves({ type: 404 });
            await productsController.deleteProduct(req, res);
            expect(res.status).to.have.been.calledWith(404);
        });
    });
    afterEach(function () {
        sinon.restore();
    });
});