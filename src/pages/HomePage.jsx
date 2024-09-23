import ClipLoader from "react-spinners/ClipLoader";
import { ShoppingCart } from "lucide-react";
import Cart from "../components/cart/Cart";
import { useAppContext } from "../context/Context";
import Card from "../components/card/Card";
import { Link } from "react-router-dom";
export default function Home() {
  const { loading, allProducts, state } = useAppContext();
  const totalQtyInCart = state.cart.reduce((acc, curr) => acc + curr.qty, 0);
  return (
    <div className="w-full min-h-screen bg-[#fcf8f5] p-5 lg:p-20">
      <div className="flex flex-col w-full max-w-screen-xl gap-8 mx-auto lg:flex-row">
        <div className="w-full h-auto lg:overflow-y-auto lg:max-h-screen lg:w-2/3 no-scrollbar">
          <div className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-5 py-3 bg-white border-b lg:py-0 lg:px-0 lg:border-none border-black/20 lg:static lg:bg-transparent">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2.5">
              Flavour Finder
            </h2>
            <div className="flex items-center gap-4">
              <Link to="/" className="font-medium lg:hidden">
                Shop
              </Link>

              <Link to="/cart">
                <div className="relative p-1 border rounded-md lg:hidden border-black/40">
                  <ShoppingCart size={24} />
                  <span className="absolute flex items-center justify-center w-5 h-5 p-1 text-xs font-medium text-white bg-red-500 rounded-full -top-2 -right-2">
                    {totalQtyInCart}
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* ----- products container ------ */}
          {loading ? (
            <div className="flex items-center justify-center w-full mt-16">
              <ClipLoader
                color="#FFD700"
                loading={loading}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <div className="grid w-full max-w-screen-xl grid-cols-1 gap-8 mx-auto mt-20 lg:mt-0 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {allProducts.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* --------- cart container -------- */}
        <div className="hidden w-full lg:block lg:w-1/3">
          <div className="sticky top-0">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
}
