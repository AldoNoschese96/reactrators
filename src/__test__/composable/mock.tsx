import composable from "../../composable";
import * as React from "react";

const fn1 = (props: any): any => {
    return { other: "other"};
}
const fn2 = (props: any): any => {
    return { other2: "other2"};
}
const fn3 = (props: any): any => {
    return { other3: "other3" };
}
const fn4 = (props: any): any => {
    return { other4: "other4"};
}
const fn5 = (props: any): any => {
    return { other5: "other5",  ...props };
}
const fn6 = (props: any): any => {
    return { other6: "other6", ...props };
}
const fn7 = (props: any): any => {
    return { other: "other7" };
}
const Template = (props: any) => {
    return (
        <div>
            <p>{props.title}</p>
            <p>{props.other}</p>
            <p>{props.other2}</p>
            <p>{props.other3}</p>
        </div>
    )
}
const TemplateChainable = (props: any) => {
    return (
        <div>
            <p>{props.other4}</p>
            <p>{props.other5}</p>
            <p>{props.other6}</p>
        </div>
    )
}
const TemplateOverriding = (props: any) => {
    return (
        <div>
            <p>{props.other}</p>
        </div>
    )
}
const MyComponent = composable((props: any) => (
    [
        [fn1, { miaprops: "CIAO" }],
        [fn2, {other: "CIAO 2"}],
        fn3
    ]
), {
    chainable: false,
})(Template);
const MyChainableComponent = composable((props: any) => (
    [
        fn4,
        fn5,
        fn6
    ]
), {
    chainable: true,
})(TemplateChainable);
const MyComponentOverriding = composable((props: any) => (
    [
        fn7
    ]
), {
    chainable: false,
})(TemplateOverriding);


export {
    MyComponent,
    MyChainableComponent,
    MyComponentOverriding
};