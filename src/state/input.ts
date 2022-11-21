import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithReset, useResetAtom } from 'jotai/utils'

export interface BetRecord {
	numbersSet: number | number[],
	multiplier: number,
	value: number
}

export const inputCurrentBet = atom(1);
export const inputActiveBets = atomWithReset<BetRecord[]>([])
export const inputCurrentBalance = atom(100);
export const inputCurrentBalanceWithBets = atom(get => (
	get(inputCurrentBalance) - get(inputActiveBets).reduce((sum, r) => sum + r.value, 0)
));

export function useCurrentBet() {
	return useAtom(inputCurrentBet);
}

export function useCurrentBalance() {
	return useAtom(inputCurrentBalance);
}

export function useCurrentBalanceWithBets() {
	return useAtomValue(inputCurrentBalanceWithBets);
}

export function useActiveBets() {
	return useAtom(inputActiveBets);
}

export function useResetActiveBets() {
	return useResetAtom(inputActiveBets);
}


