import { addressFormControls } from "@/config";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address() {
  const [formData, setFormData] = useState(initialAddressFormData);

  function handleManageAddress(event) {
    event.preventDefault();
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  return (
    <Card>
      <div>Address List</div>
      <CardHeader>
        <CardTitle>Add new address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Add"}
          onSubmit={handleManageAddress}
          isButtonDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
