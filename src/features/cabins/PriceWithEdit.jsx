import PropTypes from "prop-types";
import styled from "styled-components";
import { useState } from "react";

import { formatCurrency } from "../../utils/helpers";

import { useUpdateCabin } from "./useUpdateCabin";

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  width: 16rem;
`;

function PriceWithEdit({ regularPrice, id, cabin }) {
  const [price, setPrice] = useState(regularPrice);
  const [isEditing, setIsEditing] = useState(false);
  const { isUpdateing, updateCabinMutation } = useUpdateCabin();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBlur = (e) => {
    setIsEditing(false);
    handleChange(e);
  };

  const handleChange = (e) => {
    if (price === regularPrice) return;

    updateCabinMutation({
      newCabinData: { ...cabin, regularPrice: price },
      id,
    });
  };

  return (
    <>
      {isEditing ? (
        <Input
          value={price}
          onBlur={handleBlur}
          onChange={(e) => setPrice(e.target.value)}
          autoFocus
        />
      ) : (
        <Price onClick={handleEdit}>{formatCurrency(price)}</Price>
      )}
    </>
  );
}

PriceWithEdit.propTypes = {
  regularPrice: PropTypes.any,
  id: PropTypes.any,
  cabin: PropTypes.any,
};

export default PriceWithEdit;
