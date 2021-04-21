import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';

import {
    CartContainer,
    ShoppingIcon,
    ItemCountContainer
  } from './cart-icon.styles';

const CartIcon = ({ toggleCartHidden, itemCount }) => (

    <CartContainer onClick= {toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <ItemCountContainer>{ itemCount }</ItemCountContainer>
    </CartContainer>
);

const mapDispatchToProps = dispatch => ({ 
    toggleCartHidden: () => dispatch(toggleCartHidden())
 });

 /* To increas the cart count value */
const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
