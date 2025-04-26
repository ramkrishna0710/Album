# 📸 My Album

![React Native](https://img.shields.io/badge/React%20Native-0.79.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

**MyAlbum** is a modern, animated, dynamic **Gallery App** built using **React Native**.  
It allows users to view, organize, and manage their photos beautifully — powered by smooth animations and stylish designs.

---

## ✨ Features

- 📂 **Access and Manage Gallery** using `@react-native-camera-roll/camera-roll`
- 🔥 **Smooth Transitions & Animations** with `react-native-reanimated`
- 🎨 **Dynamic Circular Slider** for elegant photo interactions
- 📱 **Fully Responsive UI** with modern dark/light mode design
- 🚀 **Fast and optimized** app performance
- 🛡️ **Safe area handling** for devices with notches
- ⚙️ **Navigation** with `@react-navigation/native-stack`
- 📦 **Download, Move, Copy & Delete** photos easily

---

## 📚 Tech Stack

| Technology | Purpose |
|:---|:---|
| **React Native (0.79.1)** | Core App Development |
| **React (19.0.0)** | UI Building |
| **React Native Reanimated** | Animations (Circular slider, transitions) |
| **React Navigation** | Screen Navigation |
| **Camera Roll** | Accessing Gallery and Media |
| **Vector Icons** | Beautiful Icons |
| **React Native FS** | File System Operations |
| **Safe Area Context** | Handling Safe Areas |
| **Screens Optimization** | Native Screen Management |

---

## 📸 Dynamic Circular Slider

A beautifully animated **circular slider** built using **Reanimated 3** for selecting images or adjusting settings like brightness/zoom — with a natural, smooth feel.

> _Reanimated’s gesture-driven animations provide a lively and intuitive experience._

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/MyAlbum.git

# Navigate to project directory
cd MyAlbum

# Install dependencies
npm install

# Install iOS pods (Mac only)
cd ios && pod install && cd ..

# Start Metro
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
