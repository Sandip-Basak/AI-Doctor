const storage = require("node-persist");
const config = require("./config");

async function init() {
  await storage.init({
    dir: "./config",
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: "utf8",
  });
}

async function getConfig() {
  return await storage.getItem("config")|| {
    symptoms: [],
    disease: '',
    other_symptoms: []
  };
}

async function updateConfig(config) {
  await storage.setItem("config", config);
} 

async function resetConfig() {
    const defaultConfig = {
      symptoms: [],
      disease: '',
      other_symptoms: []
    };
    await storage.setItem('config', defaultConfig);
  }

module.exports = {
  init,
  getConfig,
  updateConfig,
  resetConfig
};
