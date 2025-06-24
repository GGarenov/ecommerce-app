export const registerFormControls = [
  {
    name: "userName",
    label: "Username",
    placeholder: "Enter your username",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
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
    ],
  },
  {
    label: "Lens Type",
    name: "lens",
    componentType: "select",
    options: [
      { id: "polarized", label: "Polarized" },
      { id: "uv400", label: "UV400" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "rayban", label: "Ray-Ban" },
      { id: "carrera", label: "Carrera" },
      { id: "boss", label: "Boss" },
      { id: "armani", label: "Armani Exchange" },
      { id: "prada", label: "Prada" },
    ],
  },
  {
    label: "Material",
    name: "material",
    componentType: "select",
    options: [
      { id: "metal", label: "Metal" },
      { id: "plastic", label: "Plastic" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  { id: "home", label: "Home", path: "/shop/home" },
  { id: "men", label: "Men", path: "/shop/listing?gender=men" },
  { id: "women", label: "Women", path: "/shop/listing?gender=women" },
  { id: "brands", label: "Brands", path: "/shop/brands" },
  { id: "products", label: "All Products", path: "/shop/listing" },
  { id: "search", label: "Search", path: "/shop/search" },
];

export const filterOptions = {
  shape: [
    { id: "round", label: "Round" },
    { id: "square", label: "Square" },
    { id: "aviator", label: "Aviator" },
    { id: "cateye", label: "Cat Eye" },
  ],
  lens: [
    { id: "polarized", label: "Polarized" },
    { id: "uv400", label: "UV400" },
  ],
  gender: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
  ],
  brand: [
    { id: "rayban", label: "Ray-Ban" },
    { id: "carrera", label: "Carrera" },
    { id: "boss", label: "Boss" },
    { id: "armani", label: "Armani Exchange" },
    { id: "prada", label: "Prada" },
  ],
  material: [
    { id: "metal", label: "Metal" },
    { id: "plastic", label: "Plastic" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  rayban: "Ray-Ban",
  carrera: "Carrera",
  boss: "Boss",
  armani: "Armani Exchange",
  prada: "Prada",
};

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
