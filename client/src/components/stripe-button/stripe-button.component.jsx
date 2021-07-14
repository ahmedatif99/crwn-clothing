import React from "react";
import StripeCheckout from "react-stripe-checkout";

import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51IN0JvIbqm8NpOQKAvv4pCPfNJpgwHsEb8rSuPkAnoZTV1bXjV5oRkRTOzhC5pvJkS5WFtkfx5LIWIeU0ciPn12000g21uuDn3";

  const onToken = (token) => {
    alert("Payment Successful");

    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((res) => {
        alert("Payment Successful");
      })
      .catch((error) => {
        console.log("Payment error: ", JSON.parse(error));
        alert(
          "There was am issue with ure payment, pleas make sure you use the provided credit card. "
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWW Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
