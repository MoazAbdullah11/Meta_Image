// import fetch from "node-fetch";

// export async function getProxies() {
//   try {
//     const urls = [
//       "https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt",
//       "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt",
//       "https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies.txt"
//     ];

//     let allProxies = [];

//     for (const url of urls) {
//       try {
//         const res = await fetch(url, { timeout: 5000 });
//         const text = await res.text();

//         const proxies = text
//           .split("\n")
//           .map((x) => x.trim())
//           .filter((x) => x.includes(":")); // basic validation

//         allProxies.push(...proxies);
//       } catch (err) {
//         console.log("Source failed:", url);
//       }
//     }

//     const unique = [...new Set(allProxies)];
//     console.log("Loaded proxies:", unique.length);

//     return unique.map((ip) => `http://${ip}`);
//   } catch (err) {
//     console.error("Proxy fetch failed:", err.message);
//     return [];
//   }
// }
