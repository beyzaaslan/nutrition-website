const fs = require('fs');
const path = require('path');
const db = require('./models');

async function reloadDatabase() {
  try {
    // JSON dosyasını oku
    const productData = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'productdata.json'), 'utf-8')
    );

    // Önce ilişkili verileri temizle
    await db.ProductCategory.destroy({ where: {} });
    await db.PriceInfo.destroy({ where: {} });
    await db.Product.destroy({ where: {} });
    
    console.log('Mevcut veriler temizlendi');

    // Yeni verileri ekle
    for (const product of productData) {
      try {
        // Ürünü oluştur
        const createdProduct = await db.Product.create({
          name: product.name,
          short_explanation: product.short_explanation,
          slug: product.slug,
          photo_src: product.photo_src,
          comment_count: product.comment_count,
          average_star: product.average_star,
          usage:product.usage,
          features:product.features,
          description:product.description
        });

        // Fiyat bilgisini oluştur
        await db.PriceInfo.create({
          profit: product.price_info.profit,
          total_price: product.price_info.total_price,
          discounted_price: product.price_info.discounted_price,
          price_per_servings: product.price_info.price_per_servings,
          discount_percentage: product.price_info.discount_percentage,
          ProductId: createdProduct.id
        });

        // Kategorileri ekle (eğer varsa)
        if (product.categories && Array.isArray(product.categories)) {
          for (const category of product.categories) {
           // Category tablosunda ID'ye göre kategori bul
           const categoryRecord = await db.Category.findOne({
            where: { id: category.id }
          });

          if (categoryRecord) {
            // Ürün ile kategoriyi ilişkilendir
            await createdProduct.addCategory(categoryRecord);
          } else {
            console.warn(`Kategori bulunamadı: ${category.id}`);
          }
        }
      }
        console.log(`Ürün yüklendi: ${product.name}`);
      } catch (error) {
        console.error(`Ürün yüklenirken hata: ${product.name}`, error.message);
        // Stack trace'i görmek isterseniz:
        // console.error(error);
      }
    }

    console.log('Tüm veriler başarıyla yeniden yüklendi!');
  } catch (error) {
    console.error('Veri yükleme sırasında hata:', error.message);
    throw error;
  } finally {
    await db.sequelize.close();
  }
}

// Seed işlemini başlat
reloadDatabase()
  .then(() => {
    console.log('Veri yükleme işlemi başarıyla tamamlandı');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Veri yükleme işlemi başarısız oldu:', error);
    process.exit(1);
  });