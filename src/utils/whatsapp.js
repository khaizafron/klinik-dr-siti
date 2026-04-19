// =========================
// 📞 WHATSAPP CONFIG
// =========================
const WA_NUMBER_MAIN = "601136043101";

const WHATSAPP_NUMBERS = {
  main: WA_NUMBER_MAIN,       // default (jangan ubah)
  permai: "60167296121",      // cawangan Puchong Permai
  utama: "601136043101",      // cawangan utama (same as main)
};

// =========================
// 🔗 GENERATE WHATSAPP LINK
// =========================
export function getWaLink(message, target = "main") {
  const encoded = encodeURIComponent(message);

  // detect dev
  const isDev =
    window.location.hostname === "localhost" ||
    window.location.hostname.includes("127.0.0.1");

  // fallback target safety
  const selectedTarget = WHATSAPP_NUMBERS[target]
    ? target
    : "main";

  const number = WHATSAPP_NUMBERS[selectedTarget];

  // =========================
  // 🧪 DEV MODE (DIRECT LINK)
  // =========================
  if (isDev) {
    return `https://wa.me/${number}?text=${encoded}`;
  }

  // =========================
  // 🚀 PRODUCTION (SECURED API)
  // =========================
  return `/api/whatsapp?msg=${encoded}&to=${selectedTarget}`;
}