import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import NavLinkItem from "./NavLinkItem";
import { useSelector, useDispatch } from "react-redux";
import initIndex from "../../assets/fake-data/index";
import { filterProducts, updateLinks } from "../../redux/product/ProductSlice";
import { FILTER_BY_PRODUCT_CATEGORY } from "../../utils/constant";
import { updateProductListByCategory } from "../../utils/utils";
const FilterBar = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.categories);
  const [categoryNavLink, setCategoryNavLink] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [openedId, setOpenedId] = useState(0);
  
  useEffect(() => {
    let parentCategories = categories
      .filter((item) => item.parent_id == 0)
      .map((item, index) => {
        return {
          id: item.id,
          name: item.name,
          parent_id: item.parent_id,
          open: item.id == openedId,
        };
      });
    setCategoryNavLink(parentCategories);
  }, [categories]);
  // show child category
  const showChildCategory = (categoryId) => {
    setCategoryNavLink(
      categoryNavLink.map((item, index) => {
        let toogle = !item.open;
        return {
          id: item.id,
          name: item.name,
          parent_id: item.parent_id,
          open: item.id == categoryId ? toogle : item.open,
        };
      })
    );
    setOpenedId(categoryId);
  };

  const updateProducts = (category) => {
    updateProductListByCategory(dispatch, category);
    setSelectedId(category.id);
  }
  
  return (
    <React.Fragment>
      <div className="nav-link__category">
        {categoryNavLink.map((item, index) => {
          return (
            <NavLinkItem
              showDropdown={showChildCategory}
              category={item}
              setSelectedId={setSelectedId}
              filterProducts = {updateProducts}
            ></NavLinkItem>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default FilterBar;
