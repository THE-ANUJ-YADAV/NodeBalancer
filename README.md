# 🚀 FlowBalancer

A custom **Node.js Load Balancer** built from scratch that intelligently distributes incoming requests across multiple backend servers while providing a **real-time monitoring dashboard** using **Socket.io**.

This project demonstrates core backend and distributed system concepts including **Weighted Round Robin**, **Least Connections**, **Failover**, **Health Checks**, **Traffic Simulation**, and **Live Analytics**.

---

# 📸 Dashboard Preview

> Add screenshots here

## Dashboard
<img width="1907" height="457" alt="image" src="https://github.com/user-attachments/assets/d22add8f-14e8-435c-a018-c7ca3b1dc292" />

<img width="1891" height="901" alt="image" src="https://github.com/user-attachments/assets/f54f16a1-2e0e-4f10-a6fe-ddcdfc54670f" />


## Traffic Analytics

<img width="1888" height="876" alt="image" src="https://github.com/user-attachments/assets/29185e8c-a684-4816-80da-1a2f47a22dc4" />


---

# ✨ Features

## ⚖️ Load Balancing

- Weighted Round Robin
- Least Connections
- Automatic Failover
- Health Check Monitoring
- Request Distribution
- Dynamic Server Pool

---

## 📊 Real-Time Dashboard

- Live Server Status
- Active Server Count
- Total Requests Counter
- Request Rate
- Uptime Monitoring
- Server Load Visualization
- Live Activity Logs
- Request Analytics Graph

---

## 🧪 Testing Utilities

- Traffic Simulator
- Concurrent Stress Testing
- Random Traffic Generation

---

# 🏗 Architecture

```
                    Client
                       │
                       ▼
             +------------------+
             |  FlowBalancer    |
             |  Load Balancer   |
             +------------------+
               │      │      │
               ▼      ▼      ▼
          +--------+ +--------+ +--------+
          |Server 1| |Server 2| |Server 3|
          +--------+ +--------+ +--------+
               ▲       ▲         ▲
               └──── Health Checks ────┘

                      │
                      ▼

            Socket.io Dashboard
```

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- Axios
- Socket.io

## Frontend

- HTML
- CSS
- JavaScript
- Chart.js

---

# 📁 Project Structure

```
FlowBalancer
│
├── dashboard.html
├── style.css
├── script.js
│
├── loadBalancer.js
├── server1.js
├── server2.js
├── server3.js
│
├── trafficSimulator.js
├── stressTest.js
│
├── package.json
├── README.md
└── screenshots
```

---

# ⚙ How It Works

1. Client sends a request.
2. FlowBalancer selects a backend server.
3. Request is forwarded.
4. Health Checks monitor server availability.
5. Failed servers are removed automatically.
6. Dashboard updates instantly using Socket.io.

---

# 🚀 Algorithms Implemented

## Weighted Round Robin

Requests are distributed according to server weights.

Example

```
Server 1 → Weight 3

Server 2 → Weight 2

Server 3 → Weight 1

Distribution

Server1
██████

Server2
████

Server3
██
```

---

## Least Connections

Routes requests to the server handling the fewest active connections.

---

## Failover

If a server becomes unavailable,

FlowBalancer automatically redirects traffic to healthy servers.

---

## Health Checks

Every few seconds the load balancer checks

- Server Availability
- Server Recovery

Offline servers are automatically removed from rotation.

---

# 📈 Dashboard Metrics

- Total Requests
- Active Servers
- Request Rate
- Uptime
- Server Status
- Request Distribution
- Live Activity Logs
- Server Load

---

# 🚦 Traffic Simulator

Generate realistic traffic.

```
node trafficSimulator.js
```

---

# 💥 Stress Test

Generate concurrent requests.

```
node stressTest.js
```

---

# ▶ Running Locally

Install dependencies

```bash
npm install
```

Start backend servers

```bash
node server1.js
```

```bash
node server2.js
```

```bash
node server3.js
```

Start Load Balancer

```bash
node loadBalancer.js
```

Run Dashboard

Open

```
dashboard.html
```

---

# 🎯 Learning Outcomes

This project helped me understand

- Load Balancing
- Reverse Proxy
- Request Routing
- Distributed Systems
- Health Checks
- Failover
- Socket.io
- Real-Time Communication
- Backend System Design
- Performance Testing

---

# 🚀 Future Improvements

- Docker Support
- NGINX Integration
- Redis Cache
- API Gateway
- Rate Limiting
- Circuit Breaker
- Authentication
- Kubernetes Deployment
- Prometheus Metrics
- Grafana Integration

---

# 📌 Why This Project?

Most tutorials explain load balancing conceptually.

FlowBalancer implements these concepts from scratch, providing a deeper understanding of how production-grade load balancers work internally.

---

# 👨‍💻 Author

**Anuj Yadav**

GitHub

https://github.com/THE-ANUJ-YADAV

---

# ⭐ If you like this project

Give this repository a ⭐ on GitHub.
