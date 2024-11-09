const db = require("../models");



// Tüm kategorileri getir (ürünlerle birlikte)
const getAllCategories = async (req, res) => {
  try {
    const categories = await db.Category.findAll({
      include: [{ model: db.Product }], // Her kategoriye bağlı ürünleri de getir
    });

    res.json(categories);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ID'ye göre bir kategori getir (ürünlerle birlikte)
const getCategoryById = async (req, res) => {
  try {
    const { category_id } = req.params;

    const category = await db.Category.findOne({
      where: { id: category_id },
      include: [{ model: db.Product }], // Kategoriye bağlı ürünleri de getir
    });

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.json(category);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Yeni bir kategori oluştur
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = await db.Category.create({
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      message: "Category Created Successfully",
      category: newCategory,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Belirli bir kategorinin tüm ürünlerini getir
const getProductsByCategory = async (req, res) => {
  console.log("beyza");
  try {
    const { category_id } = req.params;
    console.log(req.params);
    console.log(category_id);
    console.log("beyza1");
    const category = await db.Category.findOne({
      where: { id: category_id },
      include: [
        {
          model: db.Product,
        },
      ],
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category.Products); // Sadece ürünleri döndür
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  getProductsByCategory, // Yeni eklenen fonksiyon
};
