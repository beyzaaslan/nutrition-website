const db = require("../models");
const { Op } = require("sequelize");

const getProductById = async (req, res) => {
  try {
    const { product_id } = req.params;

    console.log(product_id);

    const product = await db.Product.findOne({
      where: { id: product_id },
      include: [{ model: db.Review },],
      include: [{model:db.Category}],
      include: [{model:db.PriceInfo}],
      include: [{ model: Variant }],
    });

    if (!product) {
      return res.status(404).send("Product not found");
    }

    return res.json(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getProductByName = async (req, res) => {

  try {
    const products = await db.Product.findAll({
      where: {
        name: {
          [Op.like]: `%${req.params.productName}%`, // Case-sensitive arama Todo: capitalize
        },
      },
    });

    if (products.length === 0) {
      return res.status(404).send("No products found");
    }

    return res.json(products);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
const createProduct = async (req, res) => {
  try {
   // Önce ürünü kaydedin
    const {
      name,
      short_explanation,
      slug,
      photo_src,
      comment_count,
      average_star,
      usage,
      features, 
      description,
      variants 
    } = req.body;
    
    const createProduct = await db.Product.create({
      name,
      short_explanation,
      slug,
      photo_src,
      comment_count,
      average_star,
      usage,
      features, 
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!createProduct) {
      return res.status(400).send("Product not created");
    }
     // Varyantları ürüne ekleyin
     if (variants && variants.length > 0) {
      const variantInstances = variants.map((variant) => ({
        ...variant,
        productId: createProduct.id,
      }));
      console.log("variant")
      await variants.bulkCreate(variantInstances);
    }

    return res.status(201).send("Product Created Successfully");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getAllProduct = async (req, res) => {
  try {
      const { limit = 12, offset = 0 } = req.query; // limit ve offset değerlerini istekte alıyoruz, varsayılan değerler atıyoruz
      const products = await db.Product.findAll({
          limit: parseInt(limit), // limit değeri isteğe bağlı
          offset: parseInt(offset) // offset değeri isteğe bağlı
      });
      res.json(products);
  } catch (err) {
      res.status(500).send(err.message);
  }
}

module.exports = {
 getProductByName,
  getProductById,
  createProduct,
  getAllProduct,
};
