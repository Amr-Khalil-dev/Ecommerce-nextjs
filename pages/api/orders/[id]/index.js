// /api/orders/:id

import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);


  if (!session) {
    return res.status(401).send('signin required');
  }

  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();

  res.send(order);
};
export default handler;
