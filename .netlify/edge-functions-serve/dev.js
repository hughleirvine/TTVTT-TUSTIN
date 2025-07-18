import { boot } from "https://v2-14-0--edge.netlify.com/bootstrap/index-combined.ts";

const functions = {}; const metadata = { functions: {} };


      try {
        const { default: func } = await import("file:///Users/huyle/Hugh%20Documents/TTVTT/TTVTT-TUSTIN/netlify/edge-functions/rewrite.js");

        if (typeof func === "function") {
          functions["rewrite"] = func;
          metadata.functions["rewrite"] = {"url":"file:///Users/huyle/Hugh%20Documents/TTVTT/TTVTT-TUSTIN/netlify/edge-functions/rewrite.js"}
        } else {
          console.log("\u001b[91m⬥\u001b[39m \u001b[31mFailed\u001b[39m to load Edge Function \u001b[33mrewrite\u001b[39m. The file does not seem to have a function as the default export.");
        }
      } catch (error) {
        console.log("\u001b[91m⬥\u001b[39m \u001b[31mFailed\u001b[39m to run Edge Function \u001b[33mrewrite\u001b[39m:");
        console.error(error);
      }
      

boot(functions, metadata);