//http module
/*
100-200 information
200-300 ok
300-400 redirect
400-500 fornt-end error
500-600 back-end / server error

*/
import http, { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import nanoid from "nanoid";

const PORT = 3000; //
let menus = [];
const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const route = req.url; // route (/)
    const method = req.method;

    //   // front-end -> [///////////////]
    //   req.on("data")/
    //   req.on("data")//
    //   req.on("data")/////
    //   req.on("end") [///////////////]

    if (route === "/") {
      const data = fs.readFileSync("index.html");
      res.writeHead(200, "ok", { "content-type": "text/html" });
      res.write(data);
      res.end();
    } else if (route === "/style.css") {
      const data = fs.readFileSync("style.css");
      res.writeHead(200, "ok", { "content-type": "text/css" });
      res.write(data);
      res.end();
    } else if (route === "/app.js") {
      const data = fs.readFileSync("app.js");
      res.writeHead(200, "ok", { "content-type": "text/javascript" });
      res.write(data);
      res.end();
    } else if (route.includes("menus")) {
      switch (method) {
        //req.body

        case "POST":
          let data = "";
          req.on("data", (chunk) => {
            data += chunk;
          });

          req.on("end", () => {
            const newMenu = JSON.parse(data);
            newMenu.id = nanoid.nanoid(5);
            menus.push(newMenu);
            res.writeHead(200, "ok", { "content-type": "application/json" });
            res.write(JSON.stringify(menus));
            res.end();
          });

          break;
        case "PUT":
          break;
        case "GET":
          console.log("get");

          res.writeHead(200, "ok", { "content-type": "application/json" });
          res.write(JSON.stringify(menus));
          res.end();
          break;
        case "DELETE":
          // /menus?id=bnmiuuu
          //split('=')== ["/menus?id","bnmiuuu"]
          const idToDelete = route.split("=")[1];
          menus = menus.filter((item) => item.id !== idToDelete);
          res.writeHead(200, "ok", { "content-type": "application/json" });
          res.write(JSON.stringify(menus));
          res.end();
          break;

        default:
          break;
      }
    }
  }
);

server.listen(PORT, () => console.log("server is running on port", PORT));
