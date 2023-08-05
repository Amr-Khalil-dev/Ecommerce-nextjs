import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import { useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Store } from "../utils/store";
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';
import DropdownLink from "./DropdownLink";
import { Menu } from "@headlessui/react";
import Cookies from "js-cookie";




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

			<div className="flex min-h-screen flex-col justify-between  ">
				<header className="bg-black-p color text-white w-full px-6 py-2">
					<div className="flex justify-between items-center mx-auto max-w-7xl ">

						<Link href="/" legacyBehavior>
							<a className="px-2 py-3 ">ROBOTO</a>
						</Link>


						{/* <div className="flex items-center relative">
							<button className="cursor-pointer absolute ">
								<i>ff</i>
							</button>
							<input className="min-w-[25rem] relative px-3 ml-12 rounded-xl h-10 border border-x-gray-50 outline-none text-black"></input>
						</div> */}

						<div className="flex ml-auto items-center">
							<Link href="/cart" legacyBehavior>
								<a className="px-2 py-3">
									<i>ll</i>
									cart
									{cartItemsCount > 0 && (
										<span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
											{cartItemsCount}
										</span>
									)}
								</a>
							</Link>

							{status === 'loading' ? (
								'Loading'
							) : session?.user ? (
								<Menu as="div" className="relative inline-block">

									<Menu.Button className="text-blue-600">
										{session.user.name}
									</Menu.Button>

									<Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">

										<Menu.Item>
											<DropdownLink className="dropdown-link text-black " href="/profile">
												Profile
											</DropdownLink>
										</Menu.Item>

										<Menu.Item>
											<DropdownLink className="dropdown-link text-black" href="/order-history">
												Order History
											</DropdownLink>
										</Menu.Item>

										<Menu.Item>
											<a
												className="dropdown-link text-black"
												href="#"
												onClick={logoutClickHandler}
											>
												Logout
											</a>
										</Menu.Item>

									</Menu.Items>
								</Menu>
							) : (
								<Link href="/login">
									<a className="p-2">Login</a>
								</Link>
							)}

						</div>
					</div>
				</header>


				<main className="container m-auto mt-4 px-4 max-w-7xl">
					{props.children}
				</main>

				<footer className="mt-4 flex h-10 items-center justify-center shadow-inner bg-gray-100">
					<p>Copyright © 2022 ROBOTO</p>
				</footer>
			</div>
		</>
	);
}
