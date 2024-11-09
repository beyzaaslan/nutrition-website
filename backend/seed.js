const fs = require('fs');
const path = require('path');
const db = require('./models');

async function seedCategories() {
    // Önce kategorileri oluşturalım
    const categories = [
        { id: 1, name: 'PROTEİN'},
        { id: 2, name: 'SPOR GIDALARI'},
        { id: 3, name: 'KARBONHİDRATLAR'},
        { id: 4, name: 'GIDA'},
        { id: 5, name: 'SAĞLIK'},
        { id: 6, name: 'VİTAMİN' },
    ];

    for (const category of categories) {
        await db.Category.create(category);
    }
}

async function seedDatabase() {
    try {
        // Tabloları sıfırla
        await db.sequelize.sync({ force: true });

        // Önce kategorileri oluştur
        await seedCategories();

        // JSON dosyasını oku
        const productData = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, 'productdata.json'), 'utf-8')
        );

        for (const product of productData) {
            // Ürünü oluştur
            const createdProduct = await db.Product.create({
                name: product.name,
                short_explanation: product.short_explanation,
                slug: product.slug,
                usage: product.usage,
                features: product.features,
                description: product.description,
                photo_src: product.photo_src,
                comment_count: product.comment_count,
                average_star: product.average_star
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

            // Kategori ilişkilerini kur
            if (product.categories && Array.isArray(product.categories)) {
                for (const category of product.categories) {
                    // Kategoriyi bul
                    const foundCategory = await db.Category.findByPk(category.id);
                    
                    if (foundCategory) {
                        // ProductCategory tablosuna kayıt ekle
                        await createdProduct.addCategory(foundCategory);
                    } else {
                        console.warn(`Kategori bulunamadı: ID ${category.id}`);
                    }
                }
            }
        }

        console.log('Veritabanı başarıyla dolduruldu!');
    } catch (error) {
        console.error('Veritabanı doldurma hatası:', error);
    } finally {
        await db.sequelize.close();
    }
}

// Seed işlemini başlat
seedDatabase();