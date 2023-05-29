#!/usr/bin/env node

const os             = require("os");
const process        = require('process');
const fs             = require('fs');
const path           = require('path');
const download       = require('download-file');
const { v4: uuidv4 } = require('uuid');
const argv           = require('minimist')(process.argv.slice(1))._;
const deepai         = require('deepai');
const readlineSync   = require('readline-sync');

const methods = {
  colorize: {
    error: "USAGE: colorize image.jpg",
    api: "colorizer",
    url: "https://deepai.org/machine-learning-model/colorizer"
  },
  superres: {
    error: "USAGE: superres image.jpg",
    api: "torch-srgan",
    url: "https://deepai.org/machine-learning-model/torch-srgan"
  },
  similarity: {
    error: "Missing Images.\n  USAGE: similarity image1.jpg image2.jpg",
    api: "image-similarity",
    url: "https://deepai.org/machine-learning-model/image-similarity"
  },
  deepdream: {
    error: "Missing Images.\n  USAGE: deepdream image1.jpg",
    api: "deepdream",
    url: "https://deepai.org/machine-learning-model/deepdream"
  },
  waifu2x: {
    error: "Missing Images.\n  USAGE: waifu2x image1.jpg",
    api: "waifu2x",
    url: "https://deepai.org/machine-learning-model/waifu2x"
  }
};

// Checks & Sets the API Key
const checkSetAPIKey = async () => {
  const rcFile = `${os.homedir()}/.deepapi.rc`;
  let APIKEY;
  try {
    APIKEY = fs.readFileSync(rcFile, { encoding: 'utf8', flag: 'r' });
  } catch (er) {
    console.log("No local API Key found, enter yours or get one from: ");
    console.log("https://deepai.org/dashboard/profile");
    APIKEY = readlineSync.question('DeepAPI Key: ');
    fs.writeFileSync(rcFile, APIKEY, {
      encoding: "utf8",
      flag: "a+",
      mode: 0o644
    });
  }
  deepai.setApiKey(APIKEY);
}

// Basic Init is Basic
const init = async () => {
  const apiKeyCheckSet = await checkSetAPIKey();
  const methodReq = argv[0].split('/').pop();
  const imgIn1 = argv[1];
  const imgIn2 = argv[2]; // optional

  // These are all going to be pretty duplicative for simplicity
  switch (methodReq) {
    case 'colorize': colorize(imgIn1); break;
    case 'superres': superres(imgIn1); break;
    case 'deepdream': deepdream(imgIn1); break;
    case 'waifu2x': waifu2x(imgIn1); break;
    case 'similarity': similarity(imgIn1, imgIn2); break;
  }
}

// similarity
const similarity = async (img1, img2) => {
  await parseImage(img1, methods.similarity.error);
  await parseImage(img2, methods.similarity.error);
  const resp = await deepai.callStandardApi(methods.similarity.api, {
    image1: fs.createReadStream(img1),
    image2: fs.createReadStream(img2),
  });
  console.log(resp.output);
}

// waifu2x
const waifu2x = async img => {
  await parseImage(img, methods.waifu2x.error);
  const outputFile = `${path.parse(img).name}.waifu2x.jpg`;
  const outputPath = path.resolve(`${path.parse(img).dir}`);
  await parseImage(img);
  const resp = await deepai.callStandardApi(methods.waifu2x.api, {
    image: fs.createReadStream(img),
  });
  download(resp.output_url, {
    directory: outputPath,
    filename:  outputFile
  }, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`File saved to: ${outputPath}/${outputFile}`);
    }
  });
}

// Deep Dream
const deepdream = async img => {
  await parseImage(img, methods.deepdream.error);
  const outputFile = `${path.parse(img).name}.deepdream.jpg`;
  const outputPath = path.resolve(`${path.parse(img).dir}`);
  const resp = await deepai.callStandardApi(methods.deepdream.api, {
    image: fs.createReadStream(img),
  });
  download(resp.output_url, {
    directory: outputPath,
    filename:  outputFile
  }, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`File saved to: ${outputPath}/${outputFile}`);
    }
  });
}

// Super Resolution
const superres = async img => {
  await parseImage(img, methods.superres.error);
  const outputFile = `${path.parse(img).name}.superres.jpg`;
  const outputPath = path.resolve(`${path.parse(img).dir}`);
  const resp = await deepai.callStandardApi(methods.superres.api, {
    image: fs.createReadStream(img),
  });
  download(resp.output_url, {
    directory: outputPath,
    filename:  outputFile
  }, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`File saved to: ${outputPath}/${outputFile}`);
    }
  });
}

// Colorize
const colorize = async img => {
  await parseImage(img, methods.colorize.error);
  const outputFile = `${path.parse(img).name}.colorize.jpg`;
  const outputPath = path.resolve(`${path.parse(img).dir}`);

  const resp = await deepai.callStandardApi(methods.colorize.api, {
    image: fs.createReadStream(img),
  });
  download(resp.output_url, {
    directory: outputPath,
    filename:  outputFile
  }, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`File saved to: ${outputPath}/${outputFile}`);
    }
  });
}

const parseImage = (img, err) => {
  return new Promise((resolve, reject) => {

    // resolve the path
    img = /\//.test(img) ? `${path.resolve(img)}` : `${path.resolve('.')}/${img}`;

    // if file does not exist
    if (!fs.existsSync(img)) {
      console.warn("Invalid Image(s)\n", img);
      console.warn(err);
      reject();
      process.exit(0);
    }

    resolve(img);
  });
}

init();
