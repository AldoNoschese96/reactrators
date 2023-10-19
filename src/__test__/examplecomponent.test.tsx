//@ts-nocheck
import * as React from 'react';
import { render, screen } from "@testing-library/react";
import enhComponent from "../enhComponent";
function Two(): any {
    return { methods: {}, props: { field: "field" } }
}
const useCounterIncrement = () => {
    const [count, setCount] = React.useState(0);
    const increment = () => setCount(count + 1);
    return { count, increment };
}

const usePrintRandomNumber = (): any => {
    const [randomNumber, setRandomNumber] = React.useState(1);
    const printRandomNumber = () => setRandomNumber(Math.random());
    return { randomNumber, printRandomNumber };
}

const Template = (props: any) => {
    return (
        <div>
            <p>{props.title}</p>
            <p>{props.count}</p>
            <p>{props.randomNumber}</p>
        </div>
    )
}

const MyComponent = enhComponent((props: any) => ({
    hooks: [[ useCounterIncrement, { title: props?.title } ], usePrintRandomNumber],
    services: [[Two, { title: props?.title }]],
}))(Template);

describe("Enh Component Function", () => {

    test("receive component props", () => {
        render(<MyComponent title={"TITLE"} />); // MyComponent({ title: "TITLE" }) ->
        expect(screen.getByText("TITLE")).toBeDefined();
    });

    test("receive injected props", () => {
        render(<MyComponent title={"TITLE"} />);
        expect(screen.getByText("0")).toBeDefined();
        expect(screen.getByText("1")).toBeDefined();
    });
});