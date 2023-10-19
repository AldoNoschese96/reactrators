import {render, screen} from "@testing-library/react";
import * as React from "react";
import {MyComponent, MyChainableComponent, MyComponentOverriding} from "./mock";

describe("composable", () => {

    test("receive component props", () => {
        render(<MyComponent title={"TITLE"}/>);
        expect(screen.getByText("TITLE")).toBeDefined();
    });

    test("receive injected props", () => {
        render(<MyComponent title={"TITLE"}/>);
        expect(screen.getByText("other")).toBeDefined();
        expect(screen.getByText("other2")).toBeDefined();
        expect(screen.getByText("other3")).toBeDefined();
    });

    test("receive injected props with chainable", () => {
        render(<MyChainableComponent title={"TITLE"}/>);
        expect(screen.getByText("other4")).toBeDefined();
        expect(screen.getByText("other5")).toBeDefined();
        expect(screen.getByText("other6")).toBeDefined();
    });

    test("override injected props", () => {
        render(<MyComponentOverriding title={"TITLE"} other={"OTHER FROM COMPONENT"} />);
        expect(screen.getByText("OTHER FROM COMPONENT")).toBeDefined();
    });
});