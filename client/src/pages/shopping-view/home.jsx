import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-4.png";
import bannerTwo from "../../assets/banner-5.png";
import bannerThree from "../../assets/banner-6.png";
import womenSunglasses from "../../assets/women_sunglasses.jpg";
import manSunglasses from "../../assets/man_sunglasses.jpg";
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

import raybanImg from "../../assets/rb.png";
import carreraImg from "../../assets/carrera.png";
import bossImg from "../../assets/boss.png";
import armaniImg from "../../assets/armani.png";
import pradaImg from "../../assets/prada.png";

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

  const slides = [
    {
      image: bannerOne,
      url: "/shop/listing?brand=rayban",
    },
    {
      image: bannerTwo,
      url: "/shop/listing",
    },
    {
      image: bannerThree,
      url: "/shop/listing?gender=men",
    },
  ];

  const genderImages = [
    {
      id: "men",
      label: "Men's Sunglasses",
      img: manSunglasses,
      url: "/shop/listing?gender=men",
    },
    {
      id: "women",
      label: "Women's Sunglasses",
      img: womenSunglasses,
      url: "/shop/listing?gender=women",
    },
  ];

  const brandImages = {
    rayban: raybanImg,
    carrera: carreraImg,
    boss: bossImg,
    armani: armaniImg,
    prada: pradaImg,
  };

  const brands = [
    { id: "rayban", label: "Ray-Ban" },
    { id: "carrera", label: "Carrera" },
    { id: "boss", label: "Boss" },
    { id: "armani", label: "Armani Exchange" },
    { id: "prada", label: "Prada" },
  ];

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
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden hidden sm:block">
        <div
          onClick={() => navigate(slides[currentSlide].url)}
          className="cursor-pointer absolute top-0 left-0 w-full h-full transition-opacity duration-1000 opacity-100"
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-label={`Banner ${currentSlide + 1}`}
        />
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
                  className="absolute inset-0 w-full h-full object-cover md:object-contain object-center group-hover:scale-105 transition-transform duration-500 z-0"
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

      <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Brand
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.id}
                onClick={() => navigate(`/shop/listing?brand=${brand.id}`)}
                className="cursor-pointer group bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center p-6 hover:scale-105 transform transition-transform"
              >
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src={brandImages[brand.id]}
                    alt={brand.label}
                    className="h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="text-lg font-semibold text-center text-gray-800 group-hover:text-black transition-colors">
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
