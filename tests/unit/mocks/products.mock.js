const allProducts = [
    {
      id: 1,
      name: 'Martelo de Thor'
    },
    {
      id: 2,
      name: 'Traje de encolhimento'
    },
    {
      id: 3,
      name: 'Escudo do Capitão América'
    }
  ];

  const oneProduct = {
    id: 2,
    name: 'Traje de encolhimento'
  };

  const newProduct = {
    id: 4,
    name: 'Skateboard',
  };

  const newUpdate = [
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
    allProducts,
    oneProduct,
    newProduct,
    newUpdate,
    deleteFailMock,
  }