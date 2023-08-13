import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import Layout from '../components/layout';
import { Store } from '../utils/store';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BsXCircleFill } from "react-icons/bs";


function CartScreen() {
	const router = useRouter();
	const { state, dispatch } = useContext(Store);
	const { cart: { cartItems } } = state;
	const removeItemHandler = (item) => {
		dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
	};
	const updateCartHandler = async (item, qty) => {
		const quantity = Number(qty);
		const { data } = await axios.get(`/api/products/${item._id}`);
		if (data.countInStock < quantity) {
			return toast.error('Sorry. Product is out of stock');
		}
		dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
		toast.success('Product updated in the cart');
	};

	return (
		<Layout title="Shopping Cart"  >
			{cartItems.length === 0 ? (
				<div className="text-white">
					Cart is empty.
					<Link href="/" legacyBehavior>
						GO shopping
					</Link>
				</div>
			) : (
				<div className="grid md:grid-cols-4 md:gap-5 text-white">
					<div className="overflow-x-auto md:col-span-3">
						<table className="min-w-full ">
							<thead className="border-b">
								<tr>
										<th className="p-5 text-left">Item</th>
										<th className="p-5 text-center">Quantity</th>
										<th className="p-5 text-center">Price</th>
									<th className="p-5">Delete</th>
								</tr>
							</thead>
							<tbody>
								{cartItems.map((item) => (
									<tr key={item.slug} className="border-b ">
										<td>
											<Link href={`/product/${item.slug}`} legacyBehavior>
												<a className="flex items-center mr-5">
													<Image
														className='mr-2'
														src={item.image}
														alt={item.name}
														width={50}
														height={50}
													></Image>
													&nbsp;
													<p className="text-lg font-bold ">{item.name}</p>
												</a>
											</Link>
										</td>
										<td className="p-5 text-center">
											<select
												className="bg-slate-400"
												value={item.quantity}
												onChange={(event) =>
													updateCartHandler(item, event.target.value)
												}
											>
												{[...Array(item.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</select>
										</td>
										<td className="p-5 text-center">${item.price}</td>
										<td className="p-5 text-center">
											<button onClick={() => removeItemHandler(item)}>
												<div className="text-2xl text-red-500"><BsXCircleFill/></div>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="card mt-5">
						<ul>
							<li>
								<div className="pb-3 text-xl">
									<p>
										Subtotal : ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
									</p>
									<p>
										Items : {cartItems.reduce((a, c) => a + c.quantity, 0)}
									</p>
								</div>
							</li>
							<li>
								<button
									onClick={() => router.push("login?redirect=/shipping")}
									className="primary-button w-full mt-5"
								>
									Check Out
								</button>
							</li>
						</ul>
					</div>
				</div>
			)}
		</Layout>
	);
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
