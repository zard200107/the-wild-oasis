import PropTypes from "prop-types";

import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkoutMutation, isCheckingout } = useCheckout();

  return (
    <Button
      variation="primary"
      sizes="small"
      onClick={() => checkoutMutation(bookingId)}
      disabled={isCheckingout}
    >
      Check out
    </Button>
  );
}

CheckoutButton.propTypes = {
  bookingId: PropTypes.any,
};

export default CheckoutButton;
