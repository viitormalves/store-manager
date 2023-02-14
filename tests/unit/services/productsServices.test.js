const { expect } = require('chai');
const sinon = require('sinon');

const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { allProducts, oneProduct } = require('../mocks/products.mock');

describe('Testa o productsService', function () {
    it('Lista todos os produtos', async function () {
        sinon.stub(productsModel, 'getAllProducts').resolves(allProducts);
        const result = await productsService.getAllProducts();
        expect(result.type).to.deep.equal();
        expect(result.message).to.deep.equal(allProducts);
    });
    it('Lista um produtos pelo id fornecido', async function () {
        sinon.stub(productsModel, 'getByProductId').resolves(allProducts[1]);
        const result = await productsService.getByProductId(2)
        expect(result.message).to.deep.equal(oneProduct);
    });
    it('Devolve erro se pesquisar um id de produto inexistente', async function () {
        sinon.stub(productsModel, 'getByProductId').resolves();
        const result = await productsService.getByProductId(999);
        expect(result.type).to.deep.equal('PRODUCT_NOT_FOUND');
        expect(result.message).to.deep.equal('Product not found');
    });
    afterEach(function () {
        sinon.restore();
    });
});