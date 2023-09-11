/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Grid from "../../grid/Grid";
import { useSelector, useDispatch } from "react-redux";
import {
  filterProducts,
} from "../../../redux/product/ProductSlice";
import NavLinkItem from "../../nav-link/NavLinkItem";

const CatalogDropDown = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.categories);
  const updateNavLinkItem = (type, categoryId) => {
    const filterData = {
      type: type,
      checked: true,
      filterObject: categoryId,
    };
    dispatch(filterProducts(filterData));
  };
  return (
    <div className="item-dropdown item-dropdown__catalog">
      <Grid col={4} mdCol={2} smCol={1} gap={20}>
        {categories
          .filter((category) => category.parent_id == 0)
          .map((category) => {
            
            return (
              <NavLinkItem
                showDropdown={() => {}}
                category={category}
                isTurnOffDropdown={true}
                update={updateNavLinkItem}
              ></NavLinkItem>
            );
          })}
      </Grid>
    </div>
  );
};

export default CatalogDropDown;
