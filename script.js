const socket = io("http://localhost:3000");

const totalRequestsEl = document.getElementById("totalRequests");
const activeServersEl = document.getElementById("activeServers");
const requestRateEl = document.getElementById("requestRate");
const uptimeEl = document.getElementById("uptime");
const serversBody = document.getElementById("servers");
const activityLog = document.getElementById("activityLog");

const history = {
    labels: [],
    totalRequests: [],
    activeServers: []
};

let startTime = Date.now();
let previousTotal = 0;

const chartContext = document.getElementById("requestChart");
const requestChart = new Chart(chartContext, {
    type: "line",
    data: {
        labels: history.labels,
        datasets: [
            {
                label: "Total Requests",
                data: history.totalRequests,
                borderColor: "#38bdf8",
                backgroundColor: "rgba(56, 189, 248, 0.18)",
                borderWidth: 2,
                tension: 0.35,
                pointRadius: 2,
                fill: true,
            },
            {
                label: "Active Servers",
                data: history.activeServers,
                borderColor: "#22c55e",
                backgroundColor: "rgba(34, 197, 94, 0.14)",
                borderWidth: 2,
                tension: 0.35,
                pointRadius: 2,
                fill: true,
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: "#cbd5e1",
                    boxWidth: 12,
                    boxHeight: 12
                }
            },
            tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.parsed.y}`
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "#94a3b8"
                },
                grid: {
                    color: "rgba(148, 163, 184, 0.1)"
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: "#94a3b8"
                },
                grid: {
                    color: "rgba(148, 163, 184, 0.1)"
                }
            }
        }
    }
});

function formatTime(seconds) {
    const pad = (value) => String(value).padStart(2, "0");
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function addLog(message) {
    const time = new Date().toLocaleTimeString([], { hour12: false });
    const entry = document.createElement("div");
    entry.className = "log-entry";
    entry.innerHTML = `<strong>${time}</strong><br>${message}`;
    activityLog.prepend(entry);
    while (activityLog.children.length > 20) {
        activityLog.removeChild(activityLog.lastChild);
    }
}

function renderServerRow(server, maxRequests) {
    const row = document.createElement("tr");
    const percent = maxRequests > 0 ? Math.round((server.requests / maxRequests) * 100) : 0;
    row.innerHTML = `
        <td>${server.name}</td>
        <td><span class="status-badge ${server.active ? "status-online" : "status-offline"}">${server.active ? "Online" : "Offline"}</span></td>
        <td>${server.requests}</td>
        <td>${server.weight}</td>
        <td>
            <div class="progress"><div class="bar" style="width:${percent}%"></div></div>
        </td>
    `;
    return row;
}

function updateDashboard(servers) {
    serversBody.innerHTML = "";
    let total = 0;
    let active = 0;
    const maxRequests = Math.max(...servers.map((s) => s.requests), 1);
    servers.forEach((server) => {
        total += server.requests;
        if (server.active) active++;
        serversBody.appendChild(renderServerRow(server, maxRequests));
    });
    totalRequestsEl.innerText = total;
    activeServersEl.innerText = active;
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - startTime) / 1000);
    uptimeEl.innerText = formatTime(elapsedSeconds);
    const delta = total - previousTotal;
    const rate = delta >= 0 ? delta : 0;
    requestRateEl.innerText = `${rate}/s`;
    previousTotal = total;
    const label = new Date().toLocaleTimeString([], { hour12: false });
    history.labels.push(label);
    history.totalRequests.push(total);
    history.activeServers.push(active);
    if (history.labels.length > 20) {
        history.labels.shift();
        history.totalRequests.shift();
        history.activeServers.shift();
    }
    requestChart.update();
}

socket.on("connect", () => {
    addLog("Connected to Load Balancer");
});

socket.on("disconnect", () => {
    addLog("Connection lost");
});

socket.on("stats", (servers) => {
    updateDashboard(servers);
});

socket.on("request-forwarded", (server) => {
    addLog(`Request forwarded to ${server}`);
});