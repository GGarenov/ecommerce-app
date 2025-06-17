import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerId");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment... Please wait</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;
