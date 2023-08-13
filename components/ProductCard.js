/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function ProductItem(props) {
	return (
		<div className="card ">
			<Link href={`/product/${props.product.slug}`} legacyBehavior >
				<a>
					<img
						src={props.product.image}
						alt={props.product.name}
						className="rounded shadow  h-64 w-full"
					/>
				</a>
			</Link>
			<div className="flex flex-col items-center justify-center p-5 pb-0 ">
				<Link href={`/product/${props.product.slug}`} legacyBehavior >
					<a className="font-semibold mb-2 text-white">
						<h2>{props.product.name} - {props.product.brand}</h2>
					</a>
				</Link>
				<p className="mb-2 font-semibold text-brand-color">${props.product.price}</p>
				<button className="primary-button" type="button" onClick={() => props.addToCartHandler(props.product)}>
					Add to cart
				</button>
			</div>
		</div>
	);
}
