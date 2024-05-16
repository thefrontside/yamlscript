import { describe, expect, it } from "./suite.ts";

import * as ps from "../mod.ts";
import { lookup$ } from "../psmap.ts";

// https://yaml.org/type/merge.html

describe("merge keys", () => {
  it("mix in all the properties of a map", async () => {
    let interp = ps.createPlatformScript();
    let program = ps.parse(`
<<:
  one: 1
  two: 2
`);
    let map = await interp.eval(program) as ps.PSMap;
    expect(lookup$("one", map)).toEqual(ps.number(1));
    expect(lookup$("two", map)).toEqual(ps.number(2));
  });
  it("mix in all the maps in a seq", async () => {
    let interp = ps.createPlatformScript();
    let program = ps.parse(`
<<:
  -
    one: 1
    two: 2
  -
    three: 3
    four: 4
`);
    let map = await interp.eval(program) as ps.PSMap;
    expect(lookup$("one", map)).toEqual(ps.number(1));
    expect(lookup$("two", map)).toEqual(ps.number(2));
    expect(lookup$("three", map)).toEqual(ps.number(3));
    expect(lookup$("four", map)).toEqual(ps.number(4));
  });
  it("throw an error if the mapping points to a non-collection", async () => {
    // TODO: this is a type error when we implement type system.
    let program = ps.parse(`<<: not a map`);
    let interp = ps.createPlatformScript();
    try {
      await interp.eval(program);
      throw new Error(
        "expected mapping a non-collection to fail, but it did not",
      );
    } catch (error) {
      expect(error.message).toMatch(/merge key/);
    }
  });
  it("can invoke a function", async () => {
    let program = ps.parse(`
$let:
  id(x): $x
$do: {<<: { $id: { hello: world } } }
`);
    let interp = ps.createPlatformScript();
    let map = await interp.eval(program) as ps.PSMap;
    expect(lookup$("hello", map)).toEqual(ps.string("world"));
  });
});
