import React from "react";
import numberWithCommas from '../../../../utils/numberWithCommas'
export function SuggestionItem(props) {
  const { thumbanilSrc, name, price } = props;

  return (
    <React.Fragment>
      <div className="auto-item__container">
        <div className="auto-item__image"><img src={thumbanilSrc} /></div>
        <div className="auto-item__name">{name}</div>

        <div className="auto-item__price__container">
          <div className="auto-item__price">{numberWithCommas(price)} VND</div>
          <div className="auto-item__price__old">{numberWithCommas(price)}VND</div>
          </div>
      </div>

    </React.Fragment>

  );
}
