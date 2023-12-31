import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/layout';
import ProductItem from '../components/ProductCard';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/store';

export default function HomePage({products}) {
	const { state, dispatch } = useContext(Store);
	const { cart } = state;

	const addToCartHandler = async (product) => {
		const existItem = cart.cartItems.find((x) => x.slug === product.slug);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		const { data } = await axios.get(`/api/products/${product._id}`);

		if (data.countInStock < quantity) {
			return toast.error('Sorry. Product is out of stock');
		}
		dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

		toast.success('Product added to the cart');
	};


	return (
		<Layout>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
				{products.map((productitem) => (
					<ProductItem
						product={productitem}
						key={productitem.slug}
						addToCartHandler={addToCartHandler}
					></ProductItem>
				))}
			</div>
		</Layout>
	);
}

export async function getServerSideProps() {
	await db.connect();
	const products = await Product.find().lean();
	return {
		props: {
			products: products.map(db.convertDocToObj),
		},
	};
}
