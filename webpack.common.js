const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    popup: path.resolve("src/popup/popup.tsx"),
    popup: path.resolve("src/popup/popup.tsx"),
    options: path.resolve("src/options/options.tsx"),
    background: path.resolve("src/background/background.ts"),
    contentScript: path.resolve("src/contentScript/contentScript.tsx"),
    adRemove: path.resolve("src/Twitch/TwitchContent.js"),
    removeTwitchAds: path.resolve("src/Twitch/video_ads.js"),
    contentScriptSpotify: path.resolve("src/Spotify/contentScriptSpotify.js"),
    adsSweetalertSpotify: path.resolve("src/Spotify/sweetalert.min.js"),
    adsAdsRemoveSpotify: path.resolve("src/Spotify/ads_removal.js"),
    adswsHooksSpotify: path.resolve("src/Spotify/wsHook.js"),
    Youtube: path.resolve("src/Youtube/Youtube.tsx"),
    jioCinema: path.resolve("src/jioCinema/jioCinemaAdBlocker.js"),
    peacock: path.resolve("src/peacock/peacockAdBlocker.js"),
    hbomax: path.resolve("src/Hbomax/hbomax.js"),
    crunchyroll: path.resolve("src/crunchyroll/crunchyrollAdBlocker.js"),
    hulu: path.resolve("src/hulu/hulu.js"),
    sponsered: path.resolve("src/facebook/Sponser.tsx"),
    sonyliv: path.resolve("src/sonyLiv/SonyLiv.js"),
    hotstar: path.resolve("src/hotstar/HotStar.js")

  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/static"),
          to: path.resolve("dist"),
        },
      ],
    }),
    ...getHtmlPlugins(["popup", "options"]),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve("dist"),
  },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        const excludedChunks = [
          "contentScript",
          "adRemove",
          "removeTwitchAds",
          "contentScriptSpotify",
          "adsSweetalertSpotify",
          "adsAdsRemoveSpotify",
          "adswsHooksSpotify",
          "Youtube",
          "jioCinema",
          "peacock",
          "hbomax",
          "sponsered",
          "hulu",
          "sonyliv",
          "hotstar"
        ];
        return !excludedChunks.includes(chunk.name);
      },
    },
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlPlugin({
        title: "React Extension",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}
