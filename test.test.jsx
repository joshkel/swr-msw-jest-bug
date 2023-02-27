/**@jest-environment jsdom */
import * as React from "react";
import { Hello } from "./test";
import { fireEvent, render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
    rest.get("/example", (req, res, ctx) => {
      console.log("hello");
      return res(ctx.json("hello world"));
    })
  );
server.listen();

afterAll(() => server.close());

test("hello world", async () => {
  render(<Hello />);
  const textbox = screen.getByRole("textbox");
  fireEvent.change(textbox, { target: { value: "query" } });
  fireEvent.change(textbox, { target: { value: "" } });
  fireEvent.blur(textbox);
});

