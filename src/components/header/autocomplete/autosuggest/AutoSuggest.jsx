import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import SearchIcon from "@mui/icons-material/Search";
import productData from "../../../../assets/fake-data/products";
import category from "../../../../assets/fake-data/category";
import { SuggestionItem } from "./SuggestionItem";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router";
const AutoSuggest = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestion] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState([]);
  const productCategories = useSelector((state) => state.product.categories);
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    console.log(products, productCategories);
    let data = productCategories.map((category) => {
      let productsByCategory = products
        .filter((product) => {
          let hasCategory = product.categories.find(
            (cate) => cate.id == category.id
          );
          return hasCategory !== undefined;
        })
        .map((item) => {
          return {
            name: item.name,
            price: item.price,
            img: item.images[0],
          };
        });
      return {
        title: category.name,
        products: productsByCategory,
      };
    });
    setData(data);
  }, [products, productCategories]);


  const handleSubmit = () => {
    
    history.push("/catalog");
  };

  function getSuggestions(value) {
    let rs = data.map((item) => {
      let products = item.products.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      if (products.length > 0)
        return {
          title: item.title,
          products: products,
        };
    });
    rs = rs.filter((item) => item != undefined && item.products != undefined);
    return rs;
  }

  function getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  function renderSuggestion(suggestion) {
    return (
      <div className="react-autosuggest__result">
        <SuggestionItem
          thumbanilSrc={suggestion.img}
          name={suggestion.name}
          price={suggestion.price}
        ></SuggestionItem>
      </div>
    
    );
  }

  function renderSectionTitle(section) {
    return <h3>{section.title.toUpperCase()}</h3>;
  }

  function getSectionSuggestions(section) {
    return section.products;
  }

  const onChange = (event, { newValue, method }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestion(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestion([]);
  };
  const inputProps = {
    placeholder: "Tim kiem san pham",
    value,
    onChange: onChange,
  };
  return (
    <React.Fragment>
      <Autosuggest
        id="find_product"
        multiSection={true}
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        inputProps={inputProps}
      />
      <button className="react-autosuggest__button" onClick={handleSubmit}>
        <SearchIcon></SearchIcon>
      </button>
    </React.Fragment>
  );
  // }
};
export default AutoSuggest;
