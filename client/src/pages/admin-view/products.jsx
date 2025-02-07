import { Button } from "@/components/ui/button";
import { Fragment } from "react";

function AdminProducts() {
  return (
    <>
      <Fragment>
        <div className="mb-5 flex justify-end">
          <Button>Add new product</Button>
        </div>
      </Fragment>
    </>
  );
}

export default AdminProducts;
