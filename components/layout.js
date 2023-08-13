import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import { useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Store } from "../utils/store";
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from "@headlessui/react";
import Cookies from "js-cookie";
import { BsCartFill, BsFillPersonFill } from "react-icons/bs";




export default function Layout(props) {
	const { status, data: session } = useSession();

	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const [cartItemsCount, setCartItemsCount] = useState(0);

	useEffect(() => {
		setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
	}, [cart.cartItems]);

	const logoutClickHandler = () => {
		Cookies.remove('cart');
		dispatch({ type: 'CART_RESET' });
		signOut({ callbackUrl: '/login' });
	};

	return (
		<>
			<Head>
				<title>{props.title ? "ROBOTO - " + props.title : "ROBOTO"}</title>
			</Head>

			<ToastContainer position="bottom-center" limit={1} />

			<div className="flex min-h-screen flex-col justify-between bg-dark-bg">
				<header className="bg-slate-900 w-full px-6 py-4">
					<div className="flex justify-between items-center mx-auto max-w-7xl ">
						<Link href="/" legacyBehavior>
							<a className="px-2 text-xl font-semibold ">ROBOTO</a>
						</Link>
						<div className="flex ml-auto items-center ">
							<Link href="/cart" legacyBehavior>
								<a className="px-2 text-lg flex items-center gap-x-1">
									<BsCartFill />
									Cart
									{cartItemsCount > 0 && (
										<span className="ml-1 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
											{cartItemsCount}
										</span>
									)}
								</a>
							</Link>

							{status === 'loading' ? (
								'Loading'
							) : session?.user ? (
								<Menu as="div" className="relative inline-block">

									<Menu.Button className="text-blue-600 px-2 text-lg flex items-center gap-x-1">
										<BsFillPersonFill />
										{session.user.name}
									</Menu.Button>

										<Menu.Items className=" absolute right-0 top-8 w-56 origin-top-right opacity-90 bg-slate-600 rounded  shadow-lg ">

										<Menu.Item>
											<Link className="dropdown-link text-white" href="/order-history">
												Order History
											</Link>
										</Menu.Item>

										<Menu.Item>
											<a
												className="dropdown-link text-white"
												href="#"
												onClick={logoutClickHandler}
											>
												Logout
											</a>
										</Menu.Item>

									</Menu.Items>
								</Menu>
							) : (
								<Link href="/login" legacyBehavior>
									<a className="p-2 text-lg">Login</a>
								</Link>
							)}
						</div>
					</div>
				</header>

				<main className="container m-auto mt-4 px-4 max-w-7xl ">
					{props.children}
				</main>

				<footer className="mt-4 flex h-10 items-center justify-center shadow-inner bg-slate-900 text-blue-600">
					<p>Copyright © 2023 ROBOTO</p>
				</footer>
			</div>
		</>
	);
}
