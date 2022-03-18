import React from "react";
import express from "express";
import { renderToPipeableStream } from "react-dom/server";

const PORT = 3000;

const app = express();

const Component = () => <div>React18</div>;

app.get("*", (req, res) => {
  const { pipe, abort } = renderToPipeableStream(<Component />, {
    // bootstrapScripts: [assets["main.js"]],
    onShellReady() {
      res.statusCode = 200;
      res.setHeader("Content-type", "text/html");
      pipe(res);
    },
    onError(x) {
      console.error(x);
    },
  });
  return;
});

app.listen(PORT, () => {
  console.log("express app running: http://localhost:3000");
});
