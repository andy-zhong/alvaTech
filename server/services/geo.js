/**
 * server/services/geo.js
 *
 * Converts an IP address to country + approximate city using geoip-lite.
 * The raw IP is NEVER stored — only the derived country_code and city.
 *
 * Install:  cd server && npm install geoip-lite
 *
 * If geoip-lite is not installed the function returns nulls gracefully
 * and the server still works — geo data just won't appear in analytics.
 */

let geo = null;
try {
  geo = require("geoip-lite");
} catch {
  console.warn("[geo] geoip-lite not installed — geo lookup disabled. Run: npm install geoip-lite");
}

/**
 * @param {string|undefined} rawIp — req.ip from Express
 * @returns {{ countryCode: string|null, city: string|null }}
 */
function getGeo(rawIp) {
  if (!geo || !rawIp) return { countryCode: null, city: null };

  try {
    // Strip IPv6-mapped IPv4 prefix  (::ffff:1.2.3.4 → 1.2.3.4)
    const ip = rawIp.replace(/^::ffff:/, "");

    // Skip loopback / private ranges
    if (ip === "::1" || ip.startsWith("127.") || ip.startsWith("192.168.") ||
        ip.startsWith("10.")  || ip.startsWith("172.16.")) {
      return { countryCode: null, city: null };
    }

    const result = geo.lookup(ip);
    return {
      countryCode: result?.country || null,
      city:        result?.city    || null,
    };
  } catch {
    return { countryCode: null, city: null };
  }
}

module.exports = { getGeo };