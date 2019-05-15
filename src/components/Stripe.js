import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeBtn = () => {
  const publishableKey = "pk_test_dbqQ5gZXSXkgbPu9TevXjclf00KpGIfyjq";
  const onToken = token => {
    const body = {
      amount: 999,
      token: token
    };
    axios
      .post("/auth/payment", body)
      .then(response => {
        alert("Payment Success");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment failure");
      });
  };
  return (
    <StripeCheckout
      label="Purchase Print" //Component button text
      name="Expo" //Modal Header
      description=""
      panelLabel="Submit" //Submit button in modal
      token={onToken}
      stripeKey={publishableKey}
      billingAddress={false}
      amount={999}
    />
  );
};

export default StripeBtn;
