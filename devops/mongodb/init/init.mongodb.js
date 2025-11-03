// Select macfood database
db = db.getSiblingDB('mcfood');

// Create an application user with readWrite permissions on mcfood database
db.createUser({
  user: "mcfood",
  pwd: "mcfood",
  roles: [{ role: "readWrite", db: "mcfood" }]
});

// Create necessary collections
db.createCollection("users");
db.createCollection("categories");
db.createCollection("products");

// Insert an initial admin user
db.users.insertOne({
  _id: ObjectId("68f3b9faff2e89c134ce5f47"),
  firstName: "admin",
  lastName: "admin",
  email: "admin@mcfood.com",
  phone: "",
  address: "",
  passwordHash: "$2a$12$to5GFs8A8Sn8MfBe/ytaUu3n22K4drVfJ82BKIkeV70mPzjcjv1EC", // hash de "Admin123"
  createdAt: new Date(),
  updatedAt: new Date()
});

// Insert initial categories
db.categories.insertMany([
  {
    _id: ObjectId("67128c43a21d9e2c57e5d101"),
    name: "burgers",
    description: "All kinds of burgers, from classic beef to vegan alternatives.",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId("67128c43a21d9e2c57e5d102"),
    name: "salads",
    description: "Fresh and healthy salads with natural ingredients.",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId("67128c43a21d9e2c57e5d103"),
    name: "wraps",
    description: "Soft tortilla wraps filled with flavorful ingredients.",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId("67128c43a21d9e2c57e5d104"),
    name: "sides",
    description: "Complementary side dishes like fries, nuggets, and onion rings.",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId("67128c43a21d9e2c57e5d105"),
    name: "drinks",
    description: "Refreshing beverages, milkshakes, and smoothies.",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Insert initial products
db.products.insertMany([
  {
    name: "cheeseburger",
    description: "Delicious beef cheeseburger with cheddar cheese, lettuce, tomato, and our signature sauce.",
    price: 8.99,
    stock: 25,
    imageUrl: "https://cdn.mcfood.com/images/products/cheeseburger.jpg",
    highlighted: true,
    category: ObjectId("67128c43a21d9e2c57e5d101"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "vegan salad bowl",
    description: "Fresh mix of lettuce, quinoa, avocado, cherry tomatoes, and lemon dressing.",
    price: 10.5,
    stock: 40,
    imageUrl: "https://cdn.mcfood.com/images/products/vegan-salad-bowl.jpg",
    highlighted: false,
    category: ObjectId("67128c43a21d9e2c57e5d102"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "chicken wrap",
    description: "Grilled chicken wrap with crispy vegetables and creamy garlic sauce.",
    price: 7.25,
    stock: 60,
    imageUrl: "https://cdn.mcfood.com/images/products/chicken-wrap.jpg",
    highlighted: true,
    category: ObjectId("67128c43a21d9e2c57e5d103"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "french fries",
    description: "Golden and crispy french fries with sea salt.",
    price: 3.5,
    stock: 120,
    imageUrl: "https://cdn.mcfood.com/images/products/french-fries.jpg",
    highlighted: false,
    category: ObjectId("67128c43a21d9e2c57e5d104"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "chocolate milkshake",
    description: "Creamy chocolate milkshake made with premium cocoa and fresh milk.",
    price: 4.75,
    stock: 35,
    imageUrl: "https://cdn.mcfood.com/images/products/chocolate-milkshake.jpg",
    highlighted: true,
    category: ObjectId("67128c43a21d9e2c57e5d105"),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
