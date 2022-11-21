import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";

export interface TopNumbers {
	number: number,
	place: number
}

export const rouletteHistory = atomWithReset<number[]>([])

export const rouletteOrderedNumbers = atom<Array<TopNumbers>>(get => {
	const numbers = new Map<number, number>();
	get(rouletteHistory).map(v => numbers.set(v, (numbers.get(v) ?? 0) + 1));
	return Array.from(numbers)
		.sort((a, b) => b[1] - a[1])
		.map(record => ({number: record[0], place: record[1]}));
})

export const rouletteHotNumbers = atom<Array<TopNumbers>>(get => (
	get(rouletteOrderedNumbers).slice(0, 3)
))

export const rouletteColdNumbers = atom<Array<TopNumbers>>(get => (
	get(rouletteOrderedNumbers)
		.filter(v => !get(rouletteHotNumbers).includes(v))
		.slice(-3)
		.sort((a, b) => a.place - b.place)
))

export function useRouletteHistory() {
	return useAtom(rouletteHistory);
}

export function useResetRouletteHistory() {
	return useResetAtom(rouletteHistory);
}

export function useRouletteHotNumbers() {
	return useAtomValue(rouletteHotNumbers);
}

export function useRouletteColdNumbers() {
	return useAtomValue(rouletteColdNumbers);
}