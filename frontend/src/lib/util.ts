export const isString = (variable: any): boolean => {
	return typeof variable == 'string' || variable instanceof String;
};
