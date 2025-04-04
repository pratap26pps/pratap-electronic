import Link from "next/link";
import Footer from "@/components/Footer";
export default function Page({ params }) {
  const pank = params.subproduct;
  const pan = params.product;
  const products = [
    {
      id: 1,
      name: "Texas Instruments",
      sku: "035-TMDSEMU110-U",
      description: "TMDSEMU110-U - XDS110 JTAG Debug Probe",
      price: 14985.0,
      stock: 2,
      delivery: "Usually Delivered in 2-5 Days"
    },
    {
      id: 2,
      name: "Texas Instruments",
      sku: "035-TMDSEMU110-U",
      description: "TMDSEMU110-U - XDS110 JTAG Debug Probe",
      price: 14985.0,
      stock: 2,
      delivery: "Usually Delivered in 2-5 Days"
    }
    ,
    {
      id: 3,
      name: "Texas Instruments",
      sku: "035-TMDSEMU110-U",
      description: "TMDSEMU110-U - XDS110 JTAG Debug Probe",
      price: 14985.0,
      stock: 2,
      delivery: "Usually Delivered in 2-5 Days"
    }
  ];

  
return (
  <div>
    <div className="mt-40 flex gap-4">
      {/* stock status */}
      <div className="ml-10">
        <p>Refine by </p>
        <p>No filters applied</p>
        <div>
          <p>Price</p>
        </div>
        <div>
          <p>Stock Status</p>

        </div>
      </div>
      {/* main content */}
      <div>

        <div className="flex">
          <Link href="/"> <h1 className="text-orange-500 mx-2"><u>Home</u></h1></Link>
          <h1 className="mr-2">/</h1>
          <h1>{pan}/</h1>
          <h1>{pank}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-lg  ">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-500 font-semibold">Quick View</span>
              </div>
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
              <p className="text-md font-semibold mt-2">{product.description}</p>
              <p className="text-lg font-bold text-green-600 mt-2">₹{product.price.toFixed(2)} <span className="text-sm text-gray-500">ex. GST</span></p>
              <p className="text-sm text-gray-600">{product.delivery}</p>
              <p className="text-sm font-semibold text-red-600 mt-1">{product.stock} in stock</p>

              <div className="mt-4 flex items-center space-x-2">
                <input type="number" min="1" defaultValue="1" className="border p-2 w-16 rounded" />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Add to Your List</button>
              </div>
            </div>
          ))}
        </div>

      </div>
      {/* cart review */}


      <div className="fixed left-[76%] p-6 bottom-64 rounded-lg hidden sm:block">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        <div className="space-y-2">
          <p className="flex justify-between"><span>Subtotal:</span> <span>₹</span></p>
          <p className="flex justify-between"><span>Shipping:</span> <span>₹ </span></p>
          <p className="flex justify-between"><span>GST (18%):</span> <span>₹ </span></p>
          <p className="flex justify-between text-green-500"><span>Discount:</span></p>
          <p className="flex justify-between font-bold text-lg"><span>Grand Total:</span> <span>₹ </span></p>
        </div>
      </div> 

     

 


    </div>
    <div className="mt-60">
      <Footer />

    </div>

  </div>

)


  
}











