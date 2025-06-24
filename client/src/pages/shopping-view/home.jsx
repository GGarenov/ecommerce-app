import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/product-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { brandOptionsMap, filterOptions } from "@/config/index";

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const slides = [bannerOne, bannerTwo, bannerThree];

  const genderImages = [
    {
      id: "men",
      label: "Men's Sunglasses",
      img: bannerOne,
      url: "/shop/listing?gender=men",
    },
    {
      id: "women",
      label: "Women's Sunglasses",
      img: bannerTwo,
      url: "/shop/listing?gender=women",
    },
  ];

  const brands = [
    { id: "rayban", label: "Ray-Ban" },
    { id: "carrera", label: "Carrera" },
    { id: "boss", label: "Boss" },
    { id: "armani", label: "Armani Exchange" },
    { id: "prada", label: "Prada" },
  ];

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    if (!user || !user.id) {
      toast({
        title: "Please log in to add items to your cart",
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-0 max-w-full">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Gender
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
            {genderImages.map((gender) => (
              <div
                key={gender.id}
                className="relative cursor-pointer group h-96 md:h-[500px] w-full overflow-hidden flex items-end justify-center transition-transform duration-300 hover:scale-[1.01]"
                onClick={() => navigate(gender.url)}
                style={{ minHeight: "350px" }}
              >
                <img
                  src={gender.img}
                  alt={gender.label}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 z-0"
                />
                <div className="relative z-10 w-full bg-gradient-to-t from-black/70 to-transparent p-8 flex flex-col items-center justify-end h-full">
                  <span className="text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg mb-2">
                    {gender.label}
                  </span>
                  <span className="text-white text-lg font-medium opacity-80">
                    Shop Now
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-0 max-w-full">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 w-full">
            {brands.map((brand, idx) => (
              <div
                key={brand.id}
                className={`relative cursor-pointer flex flex-col items-center justify-end h-64 md:h-80 w-full bg-white overflow-hidden group border-r border-b last:border-r-0 md:last:border-b-0 transition-transform duration-300 hover:scale-[1.01] ${
                  idx > 3 ? "hidden" : ""
                } sm:flex md:flex lg:flex`}
                onClick={() => navigate(`/shop/listing?brand=${brand.id}`)}
              >
                {/* Placeholder for brand logo/image */}
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-full mb-4 mt-8 text-3xl font-bold text-gray-700 group-hover:bg-gray-300 transition-all">
                  {brand.label[0]}
                </div>
                <span className="font-bold text-center text-lg mb-8">
                  {brand.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem?._id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
