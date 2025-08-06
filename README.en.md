# p5-opencv-realtime-tracking

[中文](./README.md) | [English](README.en.md)

> A browser-based real-time visual tracking experiment built with **p5.js**, **OpenCV.js**, and **Tweakpane**.

This project is based on [kylemcdonald/cv-examples](https://github.com/kylemcdonald/cv-examples), a collection of computer vision examples developed for p5.js, covering topics from thresholding, contour detection to optical flow and face tracking.

My work extends the OpenCV detection data visually and introduces parameter controls to enhance real-time interactivity, making it more experimental and extensible.

---

## ✨ Features

- **Real-time webcam video capture and display**  
- **Tweakpane panel** for flexible parameter adjustment (blur radius, threshold, etc.)  
- Quick visual debugging in the browser without a server  
- Emphasis on real-time interaction and visual feedback, suitable for prototyping, teaching demos, or creative experiments  

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hendasheng/p5-opencv-realtime-tracking.git
cd realtime-tracking-p5-opencv
```

### 2. Launch the page

This project requires webcam access. Modern browsers restrict webcam and microphone permissions to HTTPS or `localhost` (127.0.0.1) contexts for privacy and security reasons.

**It is recommended to use VS Code’s Live Server extension or similar local servers (like `live-server`) to serve the project in a secure context.**

- After installing the VS Code Live Server extension, click “Go Live” in the bottom-right corner of the editor to start the project.  
- Google Chrome is the recommended browser.  

---

## 🛠️ Tech Stack

- **p5.js**: for canvas rendering, video capture, and animation control  
- **OpenCV.js**: for real-time computer vision processing based on OpenCV  
- **Tweakpane**: a lightweight pane for dynamic parameter adjustments  

---

## 🙏 Acknowledgements & Sources

This project is built upon [kylemcdonald/cv-examples](https://github.com/kylemcdonald/cv-examples), which provides extensive p5 + OpenCV.js examples including thresholding, contour detection, optical flow, face tracking, and more ([github.com](https://github.com/kylemcdonald/cv-examples?utm_source=chatgpt.com), [kylemcdonald.github.io](https://kylemcdonald.github.io/cv-examples/?utm_source=chatgpt.com)). My work mainly extends the functionality and improves the UI based on that foundation.
