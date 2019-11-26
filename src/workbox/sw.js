/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.js",
    "revision": "a658278490cf4f0e58cb511bf37435b5"
  },
  {
    "url": "src/diff/diff.js",
    "revision": "7fee4b6c32aa9a0b6b523a10f7451b79"
  },
  {
    "url": "src/diff/diffMatchPatch.js",
    "revision": "6edabe9263ac3925f629f724d94d3e19"
  },
  {
    "url": "src/diff/jsonDiffPatch.js",
    "revision": "a4a9f51c925d1d4f95c25952570527bf"
  },
  {
    "url": "src/diff/pouchdb.js",
    "revision": "0bf43ca073b0c64bbabec4ac1e7438ff"
  },
  {
    "url": "src/diff/shellDiff.js",
    "revision": "0ad33e82921c06ab38f780e7703c9dfc"
  },
  {
    "url": "src/oauth/oauth.js",
    "revision": "0c9aaaecf1ff8d2f15823b992689802c"
  },
  {
    "url": "src/readFile/index.js",
    "revision": "88cda3d8b316aaab40f2f1987b7aa464"
  },
  {
    "url": "src/shellExec/index.js",
    "revision": "e698a09081664b16034f7869c11b0d18"
  },
  {
    "url": "src/workbox/index.js",
    "revision": "cc8c42017b5b848e4463b788d60a9113"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
