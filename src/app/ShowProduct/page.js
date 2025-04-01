"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios'; 
import { Pencil, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProductTable = () => {
  const router = useRouter();
  const [products,setProducts]=useState([]);

   const getproductdetails=async()=>{
     const result = await axios('/api/product',{method:"GET"});
     console.log("result",result.data)
     if(result){
        setProducts(result.data.products)
     }   }
   useEffect(() => {
    getproductdetails();
   }, [])
   

  const handleEdit = (id) => {
    router.push(`upload/${id}` );
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
     try {
        await axios.delete('/api/product', {data: { id } });
        router.refresh();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="p-6 mt-36 w-full overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Product List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id} className="text-center">
                <td className=" px-4 py-2">
                  <img src={product.ProductImage} alt={product.ProductTitle} className="w-16 h-16 object-cover mx-auto" />
                </td>
                <td className=" px-4 py-2">{product.ProductTitle}</td>
                <td className=" px-4 py-2">${product.ProductPrice}</td>
                <td className="mt-3 px-4 py-2  flex justify-center gap-2">
                  <Button onClick={() => handleEdit(product._id)} variant="outline" className="mr-2 cursor-pointer">
                    <Pencil size={16} />
                  </Button>
                  <Button onClick={() => handleDelete(product._id)} variant="destructive" className="cursor-pointer">
                    <Trash size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
