import * as React from  "react";
import {ComponentType} from "react";
import {EnhancedProps, InjectableEntry, InjectableFunction} from "./types";


const _composeFns = (toCompose: (InjectableFunction | InjectableEntry)[]): Record<string, any> => {
    return toCompose.reduce((acc, fn) => {

        if(!Array.isArray(fn) && typeof fn !== "function") {
            throw new Error("Hook must be a function or an array");
        }
        if(Array.isArray(fn) && fn.length !== 2) {
            throw new Error("Hook must be an array with 2 elements");
        }

        let fnToCall = fn;
        let params = undefined;
        if(Array.isArray(fn)) {
            if(typeof fn[0] !== "function" && typeof fn[1] !== "object") {
                throw new Error("Hook must be an array with first element as a function and second element as an object");
            }
            const [ fnArray , paramsArray ] = fn as InjectableEntry;
            fnToCall = fnArray;
            params = paramsArray;
        }

        const fnInstance = (fnToCall as InjectableFunction)(params);
        acc = { ...acc, ...fnInstance };
        return acc
    }, {});
}
const composable = (fn: (props?: Record<string, any>) => (InjectableFunction | InjectableEntry)[] ) => <P extends EnhancedProps>(
    Component: ComponentType<P>
)  => {
    return (props: P) => {
        const injectable = fn();
        const toInject = _composeFns(injectable);
        return React.createElement(Component, { ...toInject, ...props });
    }
}

export default composable;