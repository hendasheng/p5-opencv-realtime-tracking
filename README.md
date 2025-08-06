# p5 × OpenCV 实时追踪
[中文](./README.md) | [English](./README.en.md)

基于 **p5.js** + **OpenCV.js** 的浏览器端实时视觉追踪实验。

---

## 项目特性

- **实时摄像头视频捕捉与显示**;
- **Tweakpane 面板**自由调节参数（Blur 半径、Threshold 阈值等）;
- 可在浏览器中快速调试视觉效果，无需服务器;
- 强调实时交互与视觉反馈，适合作为原型、教学演示或创意实践;

---

## 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/hendasheng/p5-opencv-realtime-tracking.git
cd realtime-tracking-p5-opencv
```

### 2. 启动页面

本项目需要访问摄像头，现代浏览器出于隐私和安全考虑，仅允许在 HTTPS 或 `localhost`（127.0.0.1）环境下访问摄像头和麦克风。

**建议通过 VS Code 的 Live Server 插件启动项目，或者使用类似的本地服务器（如 `live-server`）以确保项目在安全上下文中运行。**

- 安装 VS Code Live Server 插件后，点击编辑器右下角 “Go Live” 启动项目；
- 推荐使用 Chrome 浏览器；

---

## 技术栈说明

- **p5.js**：用于 Canvas 渲染、视频捕获与动画控制
- **OpenCV.js**：基于 OpenCV 提供实时计算机视觉处理功能
- **Tweakpane**：轻量级参数控制面板，用于动态调节视觉参数

---

## 致谢与来源说明

本项目计算机视觉部分源于 [kylemcdonald/cv-examples](https://github.com/kylemcdonald/cv-examples)，这是一个专为 p5.js 和 JavaScript 开发的计算机视觉示例合集，涵盖从阈值处理、轮廓检测到光流、人脸跟踪等内容。

我的工作是通过 OpenCV 检测数据后，在视觉层面进行拓展，并引入参数控制增加实时交互性，使其更具实验性和可扩展性。

