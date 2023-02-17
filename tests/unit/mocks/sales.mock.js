const insertSaleMock = [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
];

const insertFailQuantityMock = [
    {
      productId: 1,
      quantity: 0,
    },
    {
      productId: 2,
      quantity: 5,
    },
];

const insertFailProductMock = [
  {
    productId: 5,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const insertFailIdMock = [
  {
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const allSalesMock = [
  {
    saleId: 1,
    date: "2023-02-16T13:39:20.000Z",
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: "2023-02-16T13:39:20.000Z",
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: "2023-02-16T13:39:20.000Z",
    productId: 3,
    quantity: 15
  }
];

const idSaleMock = [
  {
    date: "2023-02-16T13:39:20.000Z",
    productId: 3,
    quantity: 15
  }
];

const newUpdateMock = [
  {
    affectedRows: 1,
  },
  undefined,
];

const deleteFailMock = [
  {
    affectedRows: 0,
  },
  undefined,
];

module.exports = {
    insertSaleMock,
    insertFailQuantityMock,
    insertFailProductMock,
    insertFailIdMock,
    allSalesMock,
    idSaleMock,
    newUpdateMock,
    deleteFailMock,
};