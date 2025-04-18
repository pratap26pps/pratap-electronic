 
import connectDB from '@/dbconfig/dbconfig';
import Cart from '@/models/cart';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';

export async function GET(req) {
  await connectDB();
  const session = await getServerSession({ req, ...authOptions }); 
  console.log("session in /api/cart", session);

  if (!session || !session.user?.id) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  const userId = session.user.id;
  const cart = await Cart.findOne({ userId }).populate('items.productId');
  return Response.json(cart || { userId, items: [] });
}

export async function PUT(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  const userId = session.user.id;
  const body = await req.json();
  const { items } = body;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items });
  } else {
    cart.items = items;
    await cart.save();
  }

  return Response.json(cart);
}


