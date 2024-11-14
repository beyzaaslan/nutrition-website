import { Review } from './Review';
import { Category } from './Category';
import { PriceInfo } from './PriceInfo';
import { Variant } from './Variant';

export interface Product {
  id: number; // Primary key
  name: string | null; // Product name, optional
  short_explanation: string; // Short explanation, optional with default value
  slug: string; // Slug, optional with default value
  photo_src: string; // Photo source, optional with default value
  usage: string | null; // Usage instructions, optional
  features: string | null; // Product features, optional
  description: string | null; // Product description, optional
  comment_count: number; // Comment count, optional with default value of 0
  average_star: number; // Average rating, optional with default value of 0.00
  Reviews?: Review[]; // One-to-many relationship with Review
  Categories?: Category[]; // Many-to-many relationship with Category
  PriceInfo?: PriceInfo; // One-to-one relationship with PriceInfo
  Variants?: Variant[]; // One-to-many relationship with Variant
  createdAt: string; // Timestamp for creation (Sequelize managed)
  updatedAt: string; // Timestamp for updates (Sequelize managed)
}
