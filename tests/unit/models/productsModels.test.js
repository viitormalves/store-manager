const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allProducts, oneProduct, newProduct, newUpdate } = require('../mocks/products.mock');

describe('Testa o productsModel', function () {
    it('Lista todos os produtos', async function () {
        sinon.stub(connection, 'execute').resolves([allProducts]);
        const result = await productsModel.getAllProducts();
        expect(result).to.deep.equal(allProducts);
    });
    it('Lista um produtos pelo id fornecido', async function () {
        sinon.stub(connection, 'execute').resolves([[allProducts[1]]]);
        const result = await productsModel.getByProductId(2);
        expect(result).to.deep.equal(oneProduct);
    });
    it('Devolve erro se pesquisar um id de produto inexistente', async function () {
        sinon.stub(connection, 'execute').resolves([[]]);
        const result = await productsModel.getByProductId(999);
        expect(result).to.deep.equal();
    });
    it('Se cria um novo produto enviando um nome possível', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 4 }])
        const result = await productsModel.createProduct(newProduct.name);
        expect(result).to.deep.equal(newProduct);
      });
    describe('Testando a funcionalidade de atualização do produto', async function () {
        it('Valida o retorno de uma linha alterada', async function () {
            const newDate = { id: 1, name: 'Martelo do Batman'};
            sinon.stub(connection, 'execute').resolves(newUpdate);
            const data = await productsModel.updateProduct(newDate);
            expect(data[0].affectedRows).to.be.equal(1);
        });
    });
    describe('Testando a funcionalidade de deletar um produto', async function () {
        it('Valida o retorno de uma linha alterada por deletar', async function () {
            const id = 1;
            sinon.stub(connection, 'execute').resolves(newUpdate);
            const data = await productsModel.deleteProduct(id);
            expect(data[0].affectedRows).to.be.equal(1);
        });
    });
    afterEach(function () {
        sinon.restore();
    });
});