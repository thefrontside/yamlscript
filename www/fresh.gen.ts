// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[name].tsx";
import * as $1 from "./routes/_404.tsx";
import * as $2 from "./routes/_500.tsx";
import * as $3 from "./routes/_middleware.ts";
import * as $4 from "./routes/docs/[...slug].tsx";
import * as $5 from "./routes/gfm.css.ts";
import * as $6 from "./routes/index.tsx";
import * as $7 from "./routes/playground.tsx";
import * as $8 from "./routes/pls.tsx";
import * as $9 from "./routes/worker.js.ts";
import * as $$0 from "./islands/CopyArea.tsx";
import * as $$1 from "./islands/ps-playground.tsx";

const manifest = {
  routes: {
    "./routes/[name].tsx": $0,
    "./routes/_404.tsx": $1,
    "./routes/_500.tsx": $2,
    "./routes/_middleware.ts": $3,
    "./routes/docs/[...slug].tsx": $4,
    "./routes/gfm.css.ts": $5,
    "./routes/index.tsx": $6,
    "./routes/playground.tsx": $7,
    "./routes/pls.tsx": $8,
    "./routes/worker.js.ts": $9,
  },
  islands: {
    "./islands/CopyArea.tsx": $$0,
    "./islands/ps-playground.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
