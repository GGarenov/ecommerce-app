import { Card, CardContent } from "@/components/ui/card";

function AdminProductTile({ product }) {
  return (
    <Card className="w=full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-primary">
              ${product?.price}
            </span>
            <span>${product?.salePrice}</span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default AdminProductTile;
