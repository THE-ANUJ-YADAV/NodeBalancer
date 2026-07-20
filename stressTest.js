const axios = require("axios");

const URL = "http://localhost:3000";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startTraffic(totalRequests = 100) {

    console.log("🚀 Starting Traffic...\n");

    for (let i = 1; i <= totalRequests; i++) {

        try {

            const response = await axios.get(URL);

            console.log(`✅ Request ${i} -> ${response.data}`);

        } catch (err) {

            console.log(`❌ Request ${i} Failed`);

        }

        // Random delay between 100ms and 900ms
        const randomDelay = Math.floor(Math.random() * 200) + 100;

        await sleep(randomDelay);
    }

    console.log("\n🎉 Traffic Completed");
}

startTraffic();