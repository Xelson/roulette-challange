export function classNames(...args: any[]): string {
	return args.filter(s => typeof s == 'string').join(' ');
}