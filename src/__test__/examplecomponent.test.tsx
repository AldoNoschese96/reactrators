
import * as React from 'react';
import { render, screen } from "@testing-library/react";
import composable from "../composable";
function Two(): any {
    return { methods: {}, props: { field: "field" } }
}
const useCounterIncrement = (props: any): any => {
    const [count, setCount] = React.useState(0);
    const increment = () => setCount(count + 1);
    return { count, increment };
}

const usePrintRandomNumber = (props: any): any => {
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

const MyComponent = composable((props: any) => ({
    injectable: [
        [ useCounterIncrement, { title: props?.title } ],
        usePrintRandomNumber,
        Two
    ]
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