const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel, salesModel } = require('../../../src/models');
const { salesServices } = require('../../../src/services');

const { insertFailProductMock, insertFailQuantityMock,
    insertSaleMock, allSalesMock, idSaleMock, deleteFailMock, newUpdateMock
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
    describe('Testa a função de listar as vendas', function () {
        it('Será validado o retorno de uma message com todas as vendas', async function () {
            sinon.stub(salesModel, 'getAllSales').resolves(allSalesMock);
            const result = await salesServices.getAllSales();
            expect(result.message).to.deep.equal(allSalesMock);
        });
        it('Será validade o retorno de uma message',async function () {
            const mockId = 2;

            sinon.stub(salesModel, 'getSaleById').resolves(idSaleMock);
            const result = await salesServices.getSaleById(mockId);
            expect(result.message).to.deep.equal(idSaleMock);
        });
        it('Será validade de um error ao inserir um id inválido',async function () {
            const mockId = 3;

            sinon.stub(salesModel, 'getSaleById').resolves([]);
            const result = await salesServices.getSaleById(mockId);
            expect(result.message).to.be.equal('Sale not found');
            expect(result.type).to.be.equal(404);
        });
    });
    describe('Testando a funcionalidade de deletar uma venda', async function () {
        it('Valida o retorno do erro 404 de uma venda não encontrada', async function () {
            sinon.stub(salesModel, 'deleteSale').resolves(deleteFailMock);
            const result = await salesServices.deleteSale(5);
            expect(result.type).to.be.equal(404);
            expect(result.message).to.be.equal('Sale not found');
        });
        it('Valida que deletou o produto retornando uma message vazia', async function () {
            sinon.stub(salesModel, 'deleteSale').resolves(newUpdateMock);
            const result = await salesServices.deleteSale(1);
            expect(result.message).to.be.equal('');
        });
    });
    afterEach(function () {
        sinon.restore();
    });
});