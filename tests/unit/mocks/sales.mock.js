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

module.exports = {
    insertSaleMock,
    insertFailQuantityMock,
    insertFailProductMock,
    insertFailIdMock,
};