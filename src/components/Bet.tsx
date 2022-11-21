import { forwardRef } from "react";
import { classNames } from "../utils/attributes";

const betCoinsColor: Array<[number, string]> = [
	[1, 'BetCoin--blue'],
	[2, 'BetCoin--yellow'],
	[5, 'BetCoin--red'],
	[25, 'BetCoin--green'],
];

export interface BetCoinProps extends React.HTMLProps<HTMLDivElement> {
}

export const BetCoin = forwardRef<HTMLDivElement, BetCoinProps>((props, ref) => {
	const betValue = Number(props.children);
	const colorClass = !isNaN(betValue) ? betCoinsColor.find(r => r[0] >= betValue) : undefined;

	return (
		<div
			ref={ref}
			data-active={true}
			{...props}
			className={classNames('BetCoin', colorClass?.[1], props.className)}
		/>
	);
});