const express = require("express");
const axios = require("axios");
const http = require("http")
const { Server } = require("socket.io")

const app = express();

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log("Client Connected ✅");

    socket.emit("stats",servers);



    socket.on("disconnect", () => {
        console.log("Client Disconnected ❌");
    });
});

const servers = [
  {
    name: "Server 1",
    url: "http://localhost:3001",
    weight: 3,
    active: true,
    requests: 0,
  },
  {
    name: "Server 2",
    url: "http://localhost:3002",
    weight: 2,
    active: true,
    requests: 0,
  },
  {
    name: "Server 3",
    url: "http://localhost:3003",
    weight: 1,
    active: true,
    requests: 0,
  },
];

// ================= Weighted List =================

let weightedServers = [];

function buildWeightedList() {
  weightedServers = [];

  servers.forEach((server) => {
    if (server.active) {
      for (let i = 0; i < server.weight; i++) {
        weightedServers.push(server);
      }
    }
  });

  console.log("\nWeighted List Updated");

  weightedServers.forEach((server) => {
    console.log(server.name);
  });
}

buildWeightedList();

let current = 0;

// ================= Health Check =================

setInterval(async () => {
  let changed = false;

  console.log("\nChecking Servers...");

  for (const server of servers) {
    try {
      await axios.get(server.url);

      if (!server.active) {
        console.log(`${server.name} is BACK ONLINE ✅`);
        changed = true;
      }

      server.active = true;
    } catch (err) {
      if (server.active) {
        console.log(`${server.name} is OFFLINE ❌`);
        changed = true;
      }

      server.active = false;
    }
  }

  if (changed) {
    buildWeightedList();
    io.emit("stats",servers)
  }
}, 10000);

// ================= Load Balancer =================

app.get("/", async (req, res) => {
  if (weightedServers.length === 0) {
    return res.status(500).send("All Servers Are Down 💀");
  }

  const server = weightedServers[current];

  current = (current + 1) % weightedServers.length;

  try {
    server.requests++;

    io.emit("stats", servers);   

    console.log(
    `Forwarding Request -> ${server.name} | Total Requests: ${server.requests}`
    );


    const response = await axios.get(server.url);

    io.emit("request-forwarded", server.name);

    res.send(response.data);
  } catch (err) {
    console.log(`${server.name} Failed ❌`);

    server.active = false;

    buildWeightedList();

    io.emit("stats",servers)

    res.status(500).send("Server Failed");
  }
});

// ================= Stats =================

app.get("/stats", (req, res) => {
  res.json(
    servers.map((server) => ({
      Name: server.name,
      Weight: server.weight,
      Active: server.active,
      Requests: server.requests,
    }))
  );
});

server.listen(3000, () => {
  console.log("Load Balancer Running 🚀");
});