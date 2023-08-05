import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';


const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).send('signin required');
  }
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
};
export default handler;
