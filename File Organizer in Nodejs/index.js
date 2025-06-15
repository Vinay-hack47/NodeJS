import http from "http";
import url from "url";
import {
  organizeAllFiles,
  createFile,
  readFile,
  deleteFile,
} from "./fileOperations.js";

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  res.setHeader("Content-Type", "text/plain");

  try {
    if (pathname === "/organize") {
      organizeAllFiles();
      res.end("File organization complete!");

    } else if (pathname === "/create") {
      if (!query.name) throw new Error("Missing ?name=");
      createFile(query.name);
      res.end(`Created file: ${query.name}`);

    } else if (pathname === "/read") {
      if (!query.name) throw new Error("Missing ?name=");
      const content = readFile(query.name);
      res.end(`Content of ${query.name}  ${content}`);

    } else if (pathname === "/delete") {
      if (!query.name) throw new Error("Missing ?name=");
      deleteFile(query.name);
      res.end(`Deleted file: ${query.name}`);

    } else {
      res.statusCode = 404;
      res.end("Invalid endpoint. Use /organize, /create, /read, /delete");
    }
  } catch (err) {
    res.end(`Error: ${err.message}`);
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
