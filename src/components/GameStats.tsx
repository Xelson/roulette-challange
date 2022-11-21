import {
	useRouletteColdNumbers, 
	useRouletteHistory, 
	useRouletteHotNumbers 
} from "../state/roulette";

import { isNumberRed } from "../rules/selectors";
import { classNames } from "../utils/attributes";

import { forwardRef } from "react";

export interface BallProps extends React.HTMLProps<HTMLDivElement> {
	number: number
}

export const Ball = forwardRef<HTMLDivElement, BallProps>((allProps, ref) => {
	const {number, className, ...props} = allProps;

	return (
		<div 
			ref={ref}
			{...props}
			className={classNames('Ball', isNumberRed(number) && 'Ball--Red', className)} 
			data-number={number} 
		/>
	);
});

export interface BallWithTopProps extends BallProps {
	place: number
}

export function BallWithTop({number, place}: BallWithTopProps) {
	return (
		<div>
			<Ball className='Ball--topIndicator' data-top={place} number={number} />
		</div>
	);
}

export function GameStatsRenderer() {
	const [history] = useRouletteHistory();
	const hotNumbers = useRouletteHotNumbers();
	const coldNumbers = useRouletteColdNumbers();

	return (
		<div className="GameStats">
			<div className="GameStats__History">
				{history.map((v, index) => <Ball key={index} number={v} />)}
			</div>
			<div className="GameStats__TopNumbers">
				<div className="GameStats__HotNumbers" data-hidden={!hotNumbers.length}>
					Hot:  {hotNumbers.map((v, index) => <BallWithTop key={index} {...v} />)}
				</div>
				<div className="GameStats__ColdNumbers" data-hidden={!coldNumbers.length}>
					Cold: {coldNumbers.map((v, index) => <BallWithTop key={index} {...v} />)}
				</div>
			</div>
		</div>
	);
}