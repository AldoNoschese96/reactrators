import * as React from  "react";
import {CElement, JSX} from "react";

const _composeFns = (toCompose) => {
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
            const [ fnArray , paramsArray ] = fn;
            fnToCall = fnArray;
            params = paramsArray;
        }

        const fnInstance = fnToCall(params);
        acc = { ...acc, ...fnInstance };
        return acc
    }, {});
}
const enhComponent = (fn) => (Component)  => {
    return (props) => {
        const { hooks, services } = fn();
        const hooksProc = _composeFns(hooks);
        const servicesProc = _composeFns(services);
        return React.createElement(Component, { ...hooksProc, ...servicesProc, ...props});
    }
}

export default enhComponent;