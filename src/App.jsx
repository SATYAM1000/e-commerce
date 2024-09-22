import Card from "./components/card/Card";
import { useAppContext } from "./context/Context";
import ClipLoader from "react-spinners/ClipLoader";
import Cart from "./components/cart/Cart";

export default function App() {
  const { loading, allProducts } = useAppContext();
  console.log("allProducts", allProducts);

  return (
    <div className="w-full min-h-screen bg-[#fcf8f5] p-20">
      <div className="w-full max-w-screen-xl mx-auto flex gap-8">
        <div className="w-2/3 ">
          <h2 className="text-3xl font-bold mb-2.5">Desserts</h2>
          {/* ----- products container------ */}

          {loading ? (
            <div className="w-full mt-16 flex items-center justify-center ">
              <ClipLoader
                color="#FFD700"
                loading={loading}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProducts.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* --------- cart container-------- */}
        <Cart />
      </div>
    </div>
  );
}
