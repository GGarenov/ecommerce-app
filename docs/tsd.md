Technical Specification Document: UI & Config Adjustments for Sunglasses E-commerce
Overview
This document outlines the required changes to the front-end navigation, filters, brand management, and homepage layout of the sunglasses-focused e-commerce app. The goal is to streamline user navigation, update brand information, and adjust filters for a more focused shopping experience.

1. Header Navigation Changes
   Current:
   Header menu includes: Home, Men (dropdown), Women (dropdown), Brands, Search

Men and Women have dropdown filters on hover

New Requirements:
Header menu items: Home | Men | Women | Brands | All Products | Search

Clicking Men redirects to /shop/listing?gender=men (no dropdown)

Clicking Women redirects to /shop/listing?gender=women (no dropdown)

Clicking All Products redirects to /shop/listing

Clicking Brands redirects to a new dedicated Brands page

Implementation Details:
Update client/src/components/navbar.jsx to:

Remove dropdown menus under Men and Women.

Use navigate() or <Link> with corresponding URLs.

Add All Products menu item linking to /shop/listing.

2. Brands Page
   New Page:
   Path: /shop/brands

File: client/src/pages/shopping-view/brand-page.jsx

Displays large clickable images for each brand.

Each brand image links to a filtered listing page for that brand (e.g., /shop/listing?brand=rayban).

Design Guidelines:
Grid or card layout with prominent brand logos or images.

Clean, visually appealing style consistent with the rest of the app.

Responsive design for mobile and desktop.

3. Brand Configuration Update
   File:
   client/src/config/index.js

Changes:
Replace existing brands with:

js
Копиране
Редактиране
brand: [
{ id: "rayban", label: "Ray-Ban" },
{ id: "carrera", label: "Carrera" },
{ id: "boss", label: "Boss" },
{ id: "armani", label: "Armani Exchange" },
{ id: "prada", label: "Prada" },
]
Update any related maps or constants to reflect these new brands.

4. Filter Options Update
   In client/src/config/index.js update filterOptions:
   Shape filter:

Round

Square

Aviator

Cat Eye

Lens filter:

Polarized

UV400

Remove Color filter entirely

Material filter:

Metal

Plastic

5. Homepage (client/src/shopping-view/home.jsx)
   Changes:
   Rename "Shop by Category" section to "Shop by Gender"

Show exactly two images:

One representing Men’s sunglasses

One representing Women’s sunglasses

Clicking these images redirects to /shop/listing?gender=men and /shop/listing?gender=women, respectively.

"Shop by Brand" section:

Display the five brands defined above, with clickable images or logos linking to filtered brand listing pages (/shop/listing?brand=brand-id).

Summary of URLs for Navigation
Menu Item URL
Home /shop/home
Men /shop/listing?gender=men
Women /shop/listing?gender=women
Brands /shop/brands
All Products /shop/listing
Search /shop/search
