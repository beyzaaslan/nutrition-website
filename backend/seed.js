const fs = require('fs');
const path = require('path');
const db = require('./models');

async function seedDatabase() {
    try {
        await db.sequelize.sync({ force: true });

        // Kategorileri oluştur
        const categories = [
            { id: 1, name: 'PROTEİN' },
            { id: 2, name: 'SPOR GIDALARI' },
            { id: 3, name: 'KARBONHİDRATLAR' },
            { id: 4, name: 'GIDA' },
            { id: 5, name: 'SAĞLIK' },
            { id: 6, name: 'VİTAMİN' },
        ];

        for (const category of categories) {
            await db.Category.upsert(category); // Önceden var olan kategorileri güncelle
        }

        // JSON dosyasını oku
        const productData = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, 'productdata.json'), 'utf-8')
        );

        for (const product of productData) {
            try {
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

                // Kategorileri ekle
                if (product.categories && Array.isArray(product.categories)) {
                    await Promise.all(product.categories.map(async (category) => {
                        const foundCategory = await db.Category.findByPk(category.id);
                        if (foundCategory) {
                            await createdProduct.addCategory(foundCategory);
                        }
                    }));
                }

                // Variantları ekle
                if (product.variants && Array.isArray(product.variants)) {
                    await Promise.all(product.variants.map(async (variant) => {
                        const createdVariant = await db.Variant.create({
                            flavor: variant.aroma,
                            photo_src: variant.photo_src,
                            aroma_photo:variant.aroma_photo,
                            is_available: variant.is_available,
                            ProductId: product.id
                        });

                        // Variant için Size ekle
                        const createdSize = await db.Size.create({
                            gram: variant.size.gram,
                            pieces: variant.size.pieces,
                            total_services: variant.size.total_services,
                            variantId: createdVariant.id
                        });

                        // Fiyat bilgisini ekle
                        await db.PriceInfo.create({
                            profit: variant.price.profit,
                            total_price: variant.price.total_price,
                            discounted_price: variant.price.discounted_price,
                            price_per_servings: variant.price.price_per_servings,
                            discount_percentage: variant.price.discount_percentage,
                            variantId: createdVariant.id,
                            ProductId: createdProduct.id
                        });
                    }));
                }
            } catch (error) {
                console.error(`Error processing product ${product.name}:`, error);
                continue;
            }
        }

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding the database:', error);
        throw error;
    }
}

// Seed işlemini başlat
seedDatabase();