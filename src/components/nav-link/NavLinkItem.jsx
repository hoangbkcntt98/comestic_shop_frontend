/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const NavLinkItem = (props) => {
  const dispatch = useDispatch();
  const links = useSelector((state) => state.product.links);
  const categories = useSelector((state) => state.product.categories);
  const { showDropdown, category, filterProducts } = props;
  const hasChildCategory = () => {
    return (
      categories.filter((item) => item.parent_id == category.id).length > 0
    );
  };
  return (
    <React.Fragment>
      <div class="nav-link__item">
        <div class="nav-link__item__root">
          <div class="nav-link__item__root__link">
            <i class="bx bxs-right-arrow small-icons" type="solid"></i>
            <a category={category.name}  onClick={() => filterProducts(category)}>
              <i class="fa fa-caret-right" aria-hidden="true"></i>
              {category.name}
            </a>
          </div>

          {hasChildCategory()  && (
            <div class="nav-link__item__root__dropdown__btn">
              <i
                class={
                  category.open ? "bx bx-chevron-down" : "bx bx-chevron-right"
                }
                onClick={() => showDropdown(category.id)}
              ></i>
            </div>
          )}
        </div>

        <ul
          class={
            category.open
              ? "nav-link__dropdown__show"
              : "nav-link__dropdown"
          }
        >
          {categories
            .filter((cate) => {
              return cate.parent_id == category.id;
            })
            .map((childCategory, key) => {
              return (
                <li class="nav-link__dropdown__item " key={key}>
                  <a
                    class="nav-link__dropdown__aothun"
                    onClick={() => filterProducts(childCategory)}
                    category={childCategory.name}
                  >
                    {childCategory.name}
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default NavLinkItem;
