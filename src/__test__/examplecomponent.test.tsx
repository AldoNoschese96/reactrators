import * as React from 'react';
import {render, screen} from "@testing-library/react";
import composable from "../composable";

function Two(): any {
  return {methods: {}, props: {field: "field"}}
}

const useCounterIncrement = (props: any): any => {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(count + 1);
  return { count, increment };
}

const usePrintRandomNumber = (props: any): any => {
  const [randomNumber, setRandomNumber] = React.useState(1);
  const printRandomNumber = () => setRandomNumber(Math.random());
  return {randomNumber, printRandomNumber};
}

const fn1 = (props: any): any => {
    console.log(props, "props fn1")
  return {other: "other"};
}
const fn2 = (props: any): any => {
    console.log(props, "props fn2")
    return {other2: "other"};
}

const fn3 = (props: any): any => {
    console.log(props, "props fn3")
    return { other3: "other" };
}

const Template = (props: any) => {
  return (
    <div>
      <p>{props.title}</p>
      <p>{props.count}</p>
      <p>{props.randomNumber}</p>
      <p>{props.other}</p>
    </div>
  )
}

const MyComponent = composable((props: any) => (
    [[fn1, { miaprops: "CIAO" }], [fn2, {other: "CIAO 2"}], fn3]
), {
    chainable: true,
})(Template);

describe("Enh Component Function", () => {

  test("receive component props", () => {
    render(<MyComponent title={"TITLE"}/>); // MyComponent({ title: "TITLE" }) ->
    expect(screen.getByText("TITLE")).toBeDefined();
  });

  test("receive injected props", () => {
    render(<MyComponent title={"TITLE"}/>);
    // expect(screen.getByText("0")).toBeDefined();
    // expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("other")).toBeDefined();
  });
});