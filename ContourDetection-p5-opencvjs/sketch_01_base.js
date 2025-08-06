let capture;
let w, h; // 实际视频尺寸
let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

let params = {
  blurRadius: 0.5,
  threshold: 0.5,
  showThresholded: false,
  paneVisible: true,
};

let captureMat, gray, blurred, thresholded;
let contours, hierarchy;

let ready = false;
let captureReady = false;

function initTweakpane() {
  let pane = new Tweakpane.Pane();
  const menu = pane.addFolder({ title: "Menu" });
  menu.addInput(params, "blurRadius", { min: 0, max: 1, step: 0.1 });
  menu.addInput(params, "threshold", { min: 0, max: 1, step: 0.1 });
  menu.addInput(params, "showThresholded");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  capture = createCapture({
  audio: false,
  video: {
    facingMode: "user",
  }
});
capture.elt.setAttribute("playsinline", "");
capture.hide();

// 等待视频 metadata 加载完成
capture.elt.onloadedmetadata = () => {
  w = capture.elt.videoWidth;
  h = capture.elt.videoHeight;
  captureReady = true;
  console.log("摄像头实际分辨率:", w, h);

  if (ready && captureReady) {
    initializeMats();
  }
};

  capture.elt.setAttribute("playsinline", "");
  capture.hide();

  let checkCvInterval = setInterval(() => {
    if (window.Module && window.Module.loaded) {
      ready = true;
      clearInterval(checkCvInterval);
      console.log("OpenCV loaded");

      if (captureReady) {
        initializeMats();
        capture.hide();
      }
    }
  }, 100);

  initTweakpane();
}

function initializeMats() {
  if (captureMat) captureMat.delete();
  if (gray) gray.delete();
  if (blurred) blurred.delete();
  if (thresholded) thresholded.delete();

  captureMat = new cv.Mat(h, w, cv.CV_8UC4);
  gray = new cv.Mat(h, w, cv.CV_8UC1);
  blurred = new cv.Mat(h, w, cv.CV_8UC1);
  thresholded = new cv.Mat(h, w, cv.CV_8UC1);
}

function draw() {
  background(0);

  if (!ready || !captureReady) {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("等待摄像头和OpenCV初始化...", width / 2, height / 2);
    return;
  }

  // 计算视频缩放和偏移
  let videoAspect = w / h;
  let canvasAspect = width / height;

  if (videoAspect > canvasAspect) {
    drawHeight = height;
    drawWidth = videoAspect * drawHeight;
    offsetX = -(drawWidth - width) / 2;
    offsetY = 0;
  } else {
    drawWidth = width;
    drawHeight = drawWidth / videoAspect;
    offsetX = 0;
    offsetY = -(drawHeight - height) / 2;
  }

  capture.loadPixels();
  if (capture.pixels.length > 0) {
    captureMat.data().set(capture.pixels);

    let blurRadius = map(params.blurRadius, 0, 1, 1, 10);
    let threshold = map(params.threshold, 0, 1, 0, 255);

    cv.cvtColor(captureMat, gray, cv.ColorConversionCodes.COLOR_RGBA2GRAY.value, 0);
    cv.blur(gray, blurred, [blurRadius, blurRadius], [-1, -1], cv.BORDER_DEFAULT);
    cv.threshold(blurred, thresholded, threshold, 255, cv.ThresholdTypes.THRESH_BINARY.value);

    contours = new cv.MatVector();
    hierarchy = new cv.Mat();
    cv.findContours(thresholded, contours, hierarchy, 3, 2, [0, 0]);
  }

  // 显示视频（保持比例）
  image(capture, offsetX, offsetY, drawWidth, drawHeight);

  // 显示轮廓和 bounding box
  if (contours && !params.showThresholded) {
    noFill();
    stroke(255);
    strokeWeight(1);
    for (let i = 0; i < contours.size(); i++) {
      let contour = contours.get(i);

      beginShape();
      let k = 0;
      for (let j = 0; j < contour.total(); j++) {
        let x = contour.get_int_at(k++);
        let y = contour.get_int_at(k++);
        let px = x * (drawWidth / w) + offsetX;
        let py = y * (drawHeight / h) + offsetY;
        vertex(px, py);
      }
      endShape(CLOSE);

      let box = cv.boundingRect(contour);
      let x1 = box.x * (drawWidth / w) + offsetX;
      let y1 = box.y * (drawHeight / h) + offsetY;
      let bw = box.width * (drawWidth / w);
      let bh = box.height * (drawHeight / h);
      rect(x1, y1, bw, bh);
    }
  }

  // 显示阈值图像（覆盖在原图上）
  if (params.showThresholded) {
    let src = thresholded.data();
    let dst = capture.pixels;
    let n = src.length;
    let j = 0;
    for (let i = 0; i < n; i++) {
      dst[j++] = src[i];
      dst[j++] = src[i];
      dst[j++] = src[i];
      dst[j++] = 255;
    }
    capture.updatePixels();
    image(capture, offsetX, offsetY, drawWidth, drawHeight);
  }
}

function keyPressed() {
  if (key === "m" || key === "M") {
    const paneElem = document.querySelector(".tp-dfwv");
    if (paneElem) {
      params.paneVisible = !params.paneVisible;
      paneElem.style.display = params.paneVisible ? "block" : "none";
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
