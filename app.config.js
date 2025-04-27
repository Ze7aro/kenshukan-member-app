module.exports = {
  expo: {
    name: "kenshukan-member-app",
    slug: "kenshukan-member-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || "tu_api_key",
      FIREBASE_AUTH_DOMAIN:
        process.env.FIREBASE_AUTH_DOMAIN || "tu_proyecto.firebaseapp.com",
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || "tu_project_id",
      FIREBASE_STORAGE_BUCKET:
        process.env.FIREBASE_STORAGE_BUCKET || "tu_proyecto.appspot.com",
      FIREBASE_MESSAGING_SENDER_ID:
        process.env.FIREBASE_MESSAGING_SENDER_ID || "tu_sender_id",
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || "tu_app_id",
    },
  },
};
