import { sql } from "../config/db.js";

const SAMPLE_PRODUCTS = [
  {
    name: 'Iphone 13 pro-max',
    description: 'The latest and best apple phone product',
    image:
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aXBob25lfGVufDB8fDB8fHww',
    price: 2000.0
  },
  {
    name: 'Wireless Noise-Cancelling Headphones',
    description:
      'High-quality over-ear wireless headphones with active noise cancellation, 30-hour battery life, and crystal clear sound for music and calls.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww',
    price: 129.99
  },
  {
    name: 'Smart Fitness Watch',
    description:
      'Water-resistant smart watch with heart rate tracking, step counter, sleep monitoring, and smartphone notifications.',
    image:
      'https://images.unsplash.com/photo-1731341400851-1a2e0af9842b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZpdG5lc3MlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D',
    price: 89.5
  },
  {
    name: 'Minimalist Leather Backpack',
    description:
      'Stylish and durable leather backpack suitable for work, travel, and daily use with multiple storage compartments.',
    image:
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGVhdGhlciUyMGJhY2twYWNrfGVufDB8fDB8fHww',
    price: 149.0
  },
  {
    name: 'Portable Bluetooth Speaker',
    description:
      'Compact waterproof Bluetooth speaker with deep bass, clear audio, and up to 12 hours of continuous playtime.',
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D',
    price: 45.99
  },
  {
    name: 'Samsung Galaxy S23 Ultra',
    description:
      'High-end Samsung smartphone with advanced camera and long-lasting battery.',
    image:
      'https://images.unsplash.com/photo-1709744722656-9b850470293f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2Ftc3VuZyUyMEdhbGF4eSUyMFMyMyUyMFVsdHJhfGVufDB8fDB8fHww',
    price: 1800.0
  },
  {
    name: 'MacBook Pro 16-inch',
    description:
      'Powerful Apple laptop with M1 Pro chip, perfect for developers and designers.',
    image:
      'https://images.unsplash.com/photo-1502054195739-505158fe7855?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TWFjQm9vayUyMFBybyUyMDE2LWluY2h8ZW58MHx8MHx8fDA%3D',
    price: 2500.0
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description:
      'Wireless noise-cancelling headphones with premium sound and comfort.',
    image:
      'https://images.unsplash.com/photo-1761005654126-6d512251d7a3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U29ueSUyMFdILTEwMDBYTTUlMjBIZWFkcGhvbmVzfGVufDB8fDB8fHww',
    price: 350.0
  },
  {
    name: 'Apple iPad Air',
    description: 'Lightweight and powerful tablet for work and entertainment.',
    image:
      'https://images.unsplash.com/photo-1682427286841-1f3ff788752b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXBwbGUlMjBpUGFkJTIwQWlyfGVufDB8fDB8fHww',
    price: 700.0
  },
  {
    name: 'Dell XPS 13 Laptop',
    description:
      'Compact and high-performance Windows laptop for professionals.',
    image:
      'https://images.unsplash.com/photo-1554246247-6993b606e8b9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RGVsbCUyMFhQUyUyMDEzJTIwTGFwdG9wfGVufDB8fDB8fHww',
    price: 1500.0
  },
  {
    name: 'GoPro HERO11 Black Camera',
    description:
      'Durable action camera with 5K video recording and waterproof body.',
    image:
      'https://images.unsplash.com/photo-1625420055396-d61b846ce03c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R29Qcm8lMjBIRVJPMTElMjBCbGFjayUyMGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D',
    price: 500.0
  },
  {
    name: ' Nike Air Max 90 Sneakers',
    description: 'Stylish and comfortable sneakers for daily wear and sports.',
    image:
      'https://images.unsplash.com/photo-1610664676282-55c8de64f746?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TmlrZSUyMEFpciUyME1heCUyMDI3MCUyMHNuZWFrZXJzfGVufDB8fDB8fHww',
    price: 150.0
  },
  {
    name: 'Canon EOS R6 Camera',
    description:
      'Professional mirrorless camera with exceptional autofocus and low-light performance.',
    image:
      'https://images.unsplash.com/photo-1658715493106-026578f35262?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2Fub24lMjBFT1MlMjBSNiUyMENhbWVyYXxlbnwwfHwwfHx8MA%3D%3D',
    price: 2500.0
  },
  {
    name: 'Bose Portable Smart Speaker',
    description:
      'High-quality wireless speaker with voice control and deep bass.',
    image:
      'https://images.unsplash.com/photo-1567593179124-7835e19fe1e2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Qm9zZSUyMFBvcnRhYmxlJTIwU21hcnQlMjBTcGVha2VyfGVufDB8fDB8fHww',
    price: 300.0
  },
  {
    name: 'Logitech MX Master 3 Mouse',
    description:
      'Ergonomic and precise wireless mouse for productivity and creative work.',
    image:
      'https://images.unsplash.com/photo-1722682811175-5df0b444d659?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TG9naXRlY2glMjBNWCUyME1hc3RlciUyMDMlMjBNb3VzZXxlbnwwfHwwfHx8MA%3D%3D',
    price: 100.0
  }
]


async function seedDatabase() {
    

    try {
        await sql`TRUNCATE TABLE products RESTART IDENTITY CASCADE;` 
        for (const product of SAMPLE_PRODUCTS) {
            await sql`
            INSERT INTO products (name,price,image,description) 
            VALUES (${product.name}, ${product.price}, ${product.image}, ${product.description})`
        }
        console.log("Database seeded successfully");
        process
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}
seedDatabase().then(() => {
    process.exit(0);
})