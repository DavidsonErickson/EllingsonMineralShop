const db = require('../models');
const Users = db.users;

const CartItems = db.cart_items;

const Carts = db.carts;

const Categories = db.categories;

const OrderItems = db.order_items;

const Orders = db.orders;

const Products = db.products;

const CartItemsData = [
  {
    // type code here for "relation_one" field

    quantity: 1,
  },

  {
    // type code here for "relation_one" field

    quantity: 1,
  },

  {
    // type code here for "relation_one" field

    quantity: 1,
  },

  {
    // type code here for "relation_one" field

    quantity: 1,
  },
];

const CartsData = [
  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
  },
];

const CategoriesData = [
  {
    name: 'Reflector Telescopes',

    description: 'Telescopes that use mirrors to gather light.',
  },

  {
    name: 'Refractor Telescopes',

    description: 'Telescopes that use lenses to gather light.',
  },

  {
    name: 'Catadioptric Telescopes',

    description: 'Telescopes that use a combination of mirrors and lenses.',
  },

  {
    name: 'Astrophotography Equipment',

    description:
      'Equipment designed for capturing images of celestial objects.',
  },
];

const OrderItemsData = [
  {
    // type code here for "relation_one" field

    quantity: 1,

    price: 399.99,
  },

  {
    // type code here for "relation_one" field

    quantity: 1,

    price: 199.99,
  },

  {
    // type code here for "relation_one" field

    quantity: 1,

    price: 1199.99,
  },

  {
    // type code here for "relation_one" field

    quantity: 1,

    price: 649.99,
  },
];

const OrdersData = [
  {
    // type code here for "relation_one" field

    order_date: new Date('2023-10-01T10:00:00Z'),

    total_amount: 599.99,

    // type code here for "relation_many" field
  },

  {
    // type code here for "relation_one" field

    order_date: new Date('2023-10-02T15:30:00Z'),

    total_amount: 1199.99,

    // type code here for "relation_many" field
  },

  {
    // type code here for "relation_one" field

    order_date: new Date('2023-10-03T12:45:00Z'),

    total_amount: 649.99,

    // type code here for "relation_many" field
  },

  {
    // type code here for "relation_one" field

    order_date: new Date('2023-10-04T09:20:00Z'),

    total_amount: 2499.99,

    // type code here for "relation_many" field
  },
];

const ProductsData = [
  {
    name: 'Orion SkyQuest XT8',

    description: 'A powerful telescope for deep sky observation.',

    price: 399.99,

    stock: 15,

    // type code here for "images" field

    // type code here for "relation_many" field
  },

  {
    name: 'Celestron NexStar 8SE',

    description: 'A versatile telescope with computerized mount.',

    price: 1199.99,

    stock: 10,

    // type code here for "images" field

    // type code here for "relation_many" field
  },

  {
    name: 'Sky-Watcher ProED 80mm',

    description: 'A compact refractor telescope for astrophotography.',

    price: 649.99,

    stock: 8,

    // type code here for "images" field

    // type code here for "relation_many" field
  },

  {
    name: 'Meade LX90 ACF',

    description: 'Advanced telescope with GPS and AutoStar II.',

    price: 2499.99,

    stock: 5,

    // type code here for "images" field

    // type code here for "relation_many" field
  },
];

// Similar logic for "relation_many"

async function associateCartItemWithProduct() {
  const relatedProduct0 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const CartItem0 = await CartItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (CartItem0?.setProduct) {
    await CartItem0.setProduct(relatedProduct0);
  }

  const relatedProduct1 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const CartItem1 = await CartItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (CartItem1?.setProduct) {
    await CartItem1.setProduct(relatedProduct1);
  }

  const relatedProduct2 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const CartItem2 = await CartItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (CartItem2?.setProduct) {
    await CartItem2.setProduct(relatedProduct2);
  }

  const relatedProduct3 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const CartItem3 = await CartItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (CartItem3?.setProduct) {
    await CartItem3.setProduct(relatedProduct3);
  }
}

async function associateCartWithCustomer() {
  const relatedCustomer0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Cart0 = await Carts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Cart0?.setCustomer) {
    await Cart0.setCustomer(relatedCustomer0);
  }

  const relatedCustomer1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Cart1 = await Carts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Cart1?.setCustomer) {
    await Cart1.setCustomer(relatedCustomer1);
  }

  const relatedCustomer2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Cart2 = await Carts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Cart2?.setCustomer) {
    await Cart2.setCustomer(relatedCustomer2);
  }

  const relatedCustomer3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Cart3 = await Carts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Cart3?.setCustomer) {
    await Cart3.setCustomer(relatedCustomer3);
  }
}

// Similar logic for "relation_many"

async function associateOrderItemWithProduct() {
  const relatedProduct0 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const OrderItem0 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (OrderItem0?.setProduct) {
    await OrderItem0.setProduct(relatedProduct0);
  }

  const relatedProduct1 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const OrderItem1 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (OrderItem1?.setProduct) {
    await OrderItem1.setProduct(relatedProduct1);
  }

  const relatedProduct2 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const OrderItem2 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (OrderItem2?.setProduct) {
    await OrderItem2.setProduct(relatedProduct2);
  }

  const relatedProduct3 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const OrderItem3 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (OrderItem3?.setProduct) {
    await OrderItem3.setProduct(relatedProduct3);
  }
}

async function associateOrderWithCustomer() {
  const relatedCustomer0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setCustomer) {
    await Order0.setCustomer(relatedCustomer0);
  }

  const relatedCustomer1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setCustomer) {
    await Order1.setCustomer(relatedCustomer1);
  }

  const relatedCustomer2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setCustomer) {
    await Order2.setCustomer(relatedCustomer2);
  }

  const relatedCustomer3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setCustomer) {
    await Order3.setCustomer(relatedCustomer3);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await CartItems.bulkCreate(CartItemsData);

    await Carts.bulkCreate(CartsData);

    await Categories.bulkCreate(CategoriesData);

    await OrderItems.bulkCreate(OrderItemsData);

    await Orders.bulkCreate(OrdersData);

    await Products.bulkCreate(ProductsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateCartItemWithProduct(),

      await associateCartWithCustomer(),

      // Similar logic for "relation_many"

      await associateOrderItemWithProduct(),

      await associateOrderWithCustomer(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cart_items', null, {});

    await queryInterface.bulkDelete('carts', null, {});

    await queryInterface.bulkDelete('categories', null, {});

    await queryInterface.bulkDelete('order_items', null, {});

    await queryInterface.bulkDelete('orders', null, {});

    await queryInterface.bulkDelete('products', null, {});
  },
};
