import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { brandOptionsMap } from "@/config";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const { title, price, salePrice, image, brand } = product || {};

  return (
    <Card className="w-full h-full">
      <div className="flex flex-col h-full">
        <div className="relative w-full h-[300px]">
          <img
            src={image || ""}
            alt={title || "Product image"}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="flex-grow">
          <h2 className="text-xl font-bold mb-2 truncate">
            {title || "Untitled Product"}
          </h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${price || "0.00"}
            </span>
            <span className="text-lg font-bold">${salePrice || "0.00"}</span>
          </div>
          <div className="text-sm text-gray-600 mt-2">
            <span className="font-semibold">Brand: </span>
            {brandOptionsMap[brand] || brand || "-"}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center mt-auto">
          <Button
            onClick={() => {
              setOpenCreateProductDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
