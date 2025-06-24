import { Link } from "react-router-dom";
import raybanImg from "../../assets/rb.png";
import carrera from "../../assets/carrera.png";
import boss from "../../assets/boss.png";
import armani from "../../assets/armani.png";
import prada from "../../assets/prada.png";
import { filterOptions } from "@/config/index";

const brandImages = {
  rayban: raybanImg,
  carrera: carrera,
  boss: boss,
  armani: armani,
  prada: prada,
};

const brands = filterOptions.brand;

const BrandPage = () => {
  return (
    <div className="min-h-[70vh] px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Shop by Brand</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {brands.map((brand) => (
          <Link
            to={`/shop/listing?brand=${brand.id}`}
            key={brand.id}
            className="group block rounded-lg shadow-lg bg-white hover:shadow-2xl transition overflow-hidden border border-gray-100"
          >
            <div className="flex flex-col items-center justify-center p-6 h-48">
              <img
                src={brandImages[brand.id]}
                alt={brand.label}
                className="h-24 object-contain mb-4 group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
              <span className="text-lg font-semibold text-gray-800 group-hover:text-primary-600">
                {brand.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandPage;
