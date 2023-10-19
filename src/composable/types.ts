
export type InjectableParams = Record<string, any>;
export type InjectableFunction = (params?: InjectableParams) => InjectableParams;
export type InjectableEntry = [InjectableFunction, InjectableParams];
export type EnhancedProps = { [key: string]: any; };