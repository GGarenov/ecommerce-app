import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/product-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMessage, setReviewMessage] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    if (!user || !user.id) {
      toast({
        title: "Please log in to add items to your cart",
        variant: "destructive",
      });
      return;
    }

    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item `,
            variant: "destructive",
          });

          return;
        }
      }
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

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMessage("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMessage,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload && data.payload.success) {
        setRating(0);
        setReviewMessage("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      } else {
        const errorMsg = data?.payload?.message || data?.error?.message || "";
        if (
          errorMsg.includes("403") ||
          errorMsg.includes("kupish") ||
          errorMsg.includes("Purvo trqbva da si kupish")
        ) {
          toast({
            title: "You need to purchase in order to give review.",
            variant: "destructive",
          });
        } else if (errorMsg) {
          toast({
            title: errorMsg,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Failed to add review.",
            variant: "destructive",
          });
        }
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-4 sm:p-6 md:p-12 max-w-full w-full sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] overflow-y-auto"
        style={{ maxHeight: "90vh" }}
      >
        <div className="relative overflow-hidden rounded-lg flex justify-center items-center mb-4 md:mb-0">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full max-w-xs sm:max-w-sm md:max-w-md object-cover"
            style={{ maxHeight: "60vw", minHeight: "200px" }}
          />
        </div>
        <div className="flex flex-col h-full">
          <div>
            <DialogTitle asChild>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold break-words">
                {productDetails?.title}
              </h1>
            </DialogTitle>
            <p className="text-muted-foreground text-base sm:text-lg md:text-2xl mb-3 md:mb-5 mt-2 md:mt-4 break-words">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <p
              className={`text-xl sm:text-2xl md:text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2 mb-2 flex-wrap">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground text-sm sm:text-base">
              ({averageReview.toFixed(2)})
            </span>
          </div>
          <div className="mt-3 mb-4">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full text-lg sm:text-xl opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full text-lg sm:text-xl"
                onClick={() => handleAddToCart(productDetails?._id)}
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator className="my-2" />
          <div className="flex-1 min-h-0 max-h-[40vh] md:max-h-[300px] overflow-auto pr-1">
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
              Reviews
            </h2>
            <div className="grid gap-4 sm:gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem, index) => (
                  <div key={index} className="flex gap-3 sm:gap-4 items-start">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm sm:text-base">
                          {reviewItem?.userName}
                        </h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground text-xs sm:text-sm break-words">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-base">No Reviews</h1>
              )}
            </div>
            <div className="mt-6 sm:mt-10 flex-col flex gap-2">
              <Label className="text-sm sm:text-base">Write a review</Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMessage"
                value={reviewMessage}
                onChange={(event) => setReviewMessage(event.target.value)}
                placeholder="Write a review..."
                className="text-sm sm:text-base"
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMessage.trim() === ""}
                className="text-sm sm:text-base"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
