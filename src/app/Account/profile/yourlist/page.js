"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Footer from '@/components/Footer';
const YourListPage = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');

  const addNewList = () => {
    if (newListName.trim() === '') return;
    setLists([...lists, { name: newListName, items: [] }]);
    setNewListName('');
  };

  return (
    <>
     <div className=" mx-auto mt-40 flex flex-col  justify-center items-center px-4">
      
      <div className='flex w-full '>
       <Link href="/Account/profile"> <Button className="cursor-pointer">Back</Button></Link> 
      <h1 className="text-3xl font-bold mb-6 mx-auto">Your Lists</h1>
      </div>

      
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="New List Name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <Button onClick={addNewList}>New List</Button>
      </div>

      {lists.length === 0 ? (
        <p className="text-gray-500">You have no lists, add one now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-32 gap-y-5">
          {lists.map((list, index) => (
            <Card key={index} className="p-4 w-[180%]">
              <h2 className="text-xl font-semibold mb-2">{list.name}</h2>
              <p className="text-gray-500 mb-2">Items: {list.items.length}</p>
              <Button
                variant="destructive"
                onClick={() =>
                  setLists(lists.filter((_, i) => i !== index))
                }
              >
                Delete List
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
   <div className='mt-16'>
    <Footer /> 

   </div>
    </>
  
  );
};

export default YourListPage;
