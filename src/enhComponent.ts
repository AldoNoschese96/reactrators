import * as React from  "react";
import {ComponentType} from "react";

type HookParams = Record<string, any>;
type ServiceParams = Record<string, any>;

type HookFunction = (params?: HookParams) => HookParams;
type HookEntry = [HookFunction, HookParams];

type ServiceFunction = (params?: ServiceParams) => ServiceParams;
type ServiceEntry = [ServiceFunction, ServiceParams];

type EnhancedProps = { [key: string]: any; };

const _composeFns = (toCompose: (HookFunction | HookEntry)[]): Record<string, any> => {
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
            const [ fnArray , paramsArray ] = fn as HookEntry;
            fnToCall = fnArray;
            params = paramsArray;
        }

        const fnInstance = (fnToCall as HookFunction)(params);
        acc = { ...acc, ...fnInstance };
        return acc
    }, {});
}
const enhComponent = (fn: (props?: Record<string, any>) => { hooks: (HookFunction | HookEntry)[], services: (ServiceFunction | ServiceEntry)[] }) => <P extends EnhancedProps>(
    Component: ComponentType<P>
)  => {
    return (props: P) => {
        const { hooks, services } = fn();
        const hooksProc = _composeFns(hooks);
        const servicesProc = _composeFns(services);
        return React.createElement(Component, { ...hooksProc, ...servicesProc, ...props });
    }
}

export default enhComponent;