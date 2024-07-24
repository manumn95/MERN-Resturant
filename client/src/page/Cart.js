import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/CartProduct";
import emptyCart from '../assest/empty.gif'

const Cart = () => {
  const productData = useSelector((state) => state.product.cartItem);
  const totalPrice = productData.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  const totalQty = productData.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );
  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>
        {productData[0] ?<div>
          {/* Display cart items */}
          <div className="my-4 flex gap-3">
            <div className="w-full max-w-3xl ">
              {productData.map((el, index) => {
                return (
                  <CartProduct
                    key={index}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                    id={el._id}
                    price={el.price}
                  ></CartProduct>
                );
              })}
            </div>
          </div>

          {/* Total cart items */}
          <div className="w-full max-w-md  ml-auto">
            <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Qty:</p>
              <p className="ml-auto w-32 font-bold ">{totalQty}</p>
            </div>

            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Price:</p>
              <p className="ml-auto w-32 font-bold ">
                {" "}
                <span className="text-red-500">₹</span>
                {totalPrice}
              </p>
            </div>
            <button className="bg-red-500 w-full text-lg font-bold py-2 text-white">
              Payment
            </button>
          </div>
        </div>:<>
        <div className="flex flex-col w-full justify-center items-center">
          <img className="w-full max-w-sm" src={emptyCart} alt='emptyCart' />
          <p className="text-slate-500 text-3xl font-bold">Your Cart Is Empty</p>
        </div>
        </>}
       
      </div>
    </>
  );
};

export default Cart;
