import { atom, useAtom } from "jotai";

export const inputState = {
	currentBet: atom(1)
}

export function useCurrentBet() {
	return useAtom(inputState.currentBet);
}