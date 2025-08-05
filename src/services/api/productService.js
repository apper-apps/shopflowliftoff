import productsData from "@/services/mockData/products.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAll() {
    await delay(300);
    return [...productsData];
  },

  async getById(id) {
    await delay(200);
    const product = productsData.find(p => p.Id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  },

  async getProductsByCategory(category) {
    await delay(400);
    return productsData.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  },

  async searchProducts(query) {
    await delay(350);
    const searchTerm = query.toLowerCase();
    return productsData.filter(p =>
      p.title.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  },

  async getFeaturedProducts() {
    await delay(300);
    return productsData
      .filter(p => p.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  },

  async create(product) {
    await delay(250);
    const maxId = Math.max(...productsData.map(p => p.Id), 0);
    const newProduct = {
      ...product,
      Id: maxId + 1,
      rating: 0,
      reviewCount: 0,
      inStock: true
    };
    productsData.push(newProduct);
    return { ...newProduct };
  },

  async update(id, updates) {
    await delay(200);
    const index = productsData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    productsData[index] = { ...productsData[index], ...updates };
    return { ...productsData[index] };
  },

  async delete(id) {
    await delay(200);
    const index = productsData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    const deleted = productsData.splice(index, 1)[0];
    return { ...deleted };
  }
};