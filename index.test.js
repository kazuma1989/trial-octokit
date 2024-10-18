import test from "node:test";
import { script } from "./index.js";

test("", async () => {
  script({
    github: {},
    context: {},
  });
});
