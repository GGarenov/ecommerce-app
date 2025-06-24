🧾 Technical Specification Document: Refactor for Sunglasses-Focused E-commerce
🧭 Objective
Refactor the existing fashion-based category and navigation system to fit a sunglasses-only eCommerce store, with the following structure:

✅ Target Header Menu
css
Копиране
Редактиране
[Home] [Men] [Women] [Brands] [Search]
✅ Dropdowns under Men/Women:
Shape: Round, Square, Aviator, Cat Eye, Rectangle

Lens: Polarized, Gradient, UV Protection, Blue Light

Price Range

Collections: Summer 2025, Sport, Luxury, Everyday

✅ Filters:
Brand

Color

Material

🔧 Phase 1: Configuration Updates
📁 client/src/config/index.js
✅ Update: shoppingViewHeaderMenuItems
Replace the current categories (men, women, kids, accessories, footwear, products) with:

js
Копиране
Редактиране
export const shoppingViewHeaderMenuItems = [
{ id: "home", label: "Home", path: "/shop/home" },
{ id: "men", label: "Men", path: "/shop/listing?gender=men" },
{ id: "women", label: "Women", path: "/shop/listing?gender=women" },
{ id: "brands", label: "Brands", path: "/shop/brands" },
{ id: "search", label: "Search", path: "/shop/search" },
];
✅ Replace: filterOptions.category
js
Копиране
Редактиране
export const filterOptions = {
shape: [
{ id: "round", label: "Round" },
{ id: "square", label: "Square" },
{ id: "aviator", label: "Aviator" },
{ id: "cateye", label: "Cat Eye" },
{ id: "rectangle", label: "Rectangle" },
],
lens: [
{ id: "polarized", label: "Polarized" },
{ id: "gradient", label: "Gradient" },
{ id: "uv", label: "UV Protection" },
{ id: "bluelight", label: "Blue Light" },
],
gender: [
{ id: "men", label: "Men" },
{ id: "women", label: "Women" },
],
brand: [
{ id: "rayban", label: "Ray-Ban" },
{ id: "oakley", label: "Oakley" },
{ id: "gucci", label: "Gucci" },
{ id: "prada", label: "Prada" },
{ id: "polaroid", label: "Polaroid" },
],
color: [
{ id: "black", label: "Black" },
{ id: "brown", label: "Brown" },
{ id: "blue", label: "Blue" },
{ id: "silver", label: "Silver" },
],
material: [
{ id: "metal", label: "Metal" },
{ id: "plastic", label: "Plastic" },
{ id: "acetate", label: "Acetate" },
],
};
✅ Update: addProductFormElements category/brand section
js
Копиране
Редактиране
{
label: "Gender",
name: "gender",
componentType: "select",
options: [
{ id: "men", label: "Men" },
{ id: "women", label: "Women" },
],
},
{
label: "Shape",
name: "shape",
componentType: "select",
options: [
{ id: "round", label: "Round" },
{ id: "square", label: "Square" },
{ id: "aviator", label: "Aviator" },
{ id: "cateye", label: "Cat Eye" },
{ id: "rectangle", label: "Rectangle" },
],
},
{
label: "Lens Type",
name: "lens",
componentType: "select",
options: [
{ id: "polarized", label: "Polarized" },
{ id: "gradient", label: "Gradient" },
{ id: "uv", label: "UV Protection" },
{ id: "bluelight", label: "Blue Light" },
],
},
{
label: "Brand",
name: "brand",
componentType: "select",
options: [
{ id: "rayban", label: "Ray-Ban" },
{ id: "oakley", label: "Oakley" },
{ id: "gucci", label: "Gucci" },
{ id: "prada", label: "Prada" },
{ id: "polaroid", label: "Polaroid" },
],
},
{
label: "Material",
name: "material",
componentType: "select",
options: [
{ id: "metal", label: "Metal" },
{ id: "plastic", label: "Plastic" },
{ id: "acetate", label: "Acetate" },
],
},
🗂️ Phase 2: Backend Adjustments
📁 server/models/productModel.js
Update the product schema:

js
Копиране
Редактиране
gender: { type: String, enum: ["men", "women"] },
shape: { type: String },
lens: { type: String },
material: { type: String },
color: { type: String },
📁 server/controllers/productController.js
Update product creation and update logic to support new fields.

Adjust filtering logic in product listing to include gender, shape, lens, material.

🧑‍💻 Phase 3: UI Integration
📁 client/src/pages/listing.jsx
Update filters in sidebar or top bar to match new structure.

Remove any mention of footwear, kids, accessories.

📁 client/src/components/navbar.jsx
Replace nav items with: Home, Men, Women, Brands, Search.

Implement dropdown logic under “Men” and “Women” for:

Shape

Lens

Collections (optional)

📁 client/src/components/product-tile.jsx
Ensure new fields (shape, lens, brand, material) are displayed and/or available for filtering.

🧪 Phase 4: Testing
✅ Manual QA
Test creating products with new fields

Check that filters work on listing page

Verify the new navigation works correctly

Check search functionality compatibility

Review admin panel UI for form alignment

🧹 Optional Cleanup
Remove unused kids, footwear, accessories logic or entries from:

Redux slices

Seed data (if any)

Product listing logic

🧩 Optional: Collections
Collections like “Summer 2025”, “Luxury” can be added either as:

A collection field in the product model

Or as a separate tag-like mechanism with filtering

✅ Final Deliverables
Updated category model and filters

Navigation updated to Men/Women-based structure

Admin product form updated

Filter and listing logic updated

Fully working sunglasses-specific product taxonomy
