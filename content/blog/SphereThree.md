---
draft: false
external: false
title: Psychedelic Sphere
description: Moving particles with psychedelic effects using Three.Js
date: 2024-01-01

ogImagePath: /images/blog/Sphere/SphereVideo.mp4
        
---
{% codepen url="https://codepen.io/Jowwii/pen/YzBbzRo" title="Testing Three Js " /%}

In the fascinating realm of web development, crafting 3D interactive experiences has become increasingly accessible thanks to libraries like Three.js. In this article, we'll delve into an intriguing project utilizing Three.js to build a visually appealing component. We'll dissect each part of the code to understand how it works and the decisions behind each choice.

## Project Kickoff

```jsx
import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js';

window.addEventListener("load", init);

```
The code kicks off by importing the Three.js library and the **`OrbitControls`** class to enable user interaction with the scene. The **`load`** event ensures that the script runs after the page has fully loaded. 


## Scene Setup

```jsx
function init() {
    // ... (code omitted for brevity)
}
```
In the **`init`** function, the scene is configured, a camera is defined, a point light is added, and a renderer is created. Additionally, the **`OrbitControls`** class is initialized to control the camera through user interaction.


## Geometry Construction

```jsx
// ... (code omitted for brevity)

const geometry = new THREE.IcosahedronGeometry(1, 4);
const geometryPos = geometry.getAttribute("position").array;
const mesh = [];
const normalDirection = [];

for (let i = 0; i < geometryPos.length; i += 9) {
    // ... (code omitted for brevity)
}

```

An icosahedron geometry is used to create a mesh of spheres at specific locations. Each sphere is dynamically scaled and colored later in the code.

## Animation and Movement

```jsx
// ... (code omitted for brevity)

let loopSpeed = 0;
let rot = 0;
const clock = new THREE.Clock();

const tick = () => {
    // ... (code omitted for brevity)
};

// Inicia la animación
tick();

```

The **`tick`** function handles continuous animation. The position and scale of each sphere are dynamically updated based on time and the direction of the original geometry's normal.


## Screen Responsive

```jsx
// ... (code omitted for brevity)

window.addEventListener("resize", () => {
    // ... (code omitted for brevity)
});

```

The application responds to changes in window size, automatically adjusting the camera's aspect ratio and renderer size.

## Rendering

```jsx
// ... (code omitted for brevity)

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

```

The **`animate`** function uses the **`requestAnimationFrame`** method to maintain smooth and consistent animation, rendering the scene in each frame.


## Conclusion

This Three.js project offers a visually stunning experience, combining 3D geometry, lighting, animation, and screen adaptability. Understanding each part of the code, from initial setup to continuous animation, empowers developers to build exciting 3D interactive projects using Three.js. The blend of geometry, materials, and animation creates a captivating visual effect, with decisions behind each line of code focusing on achieving a balance between performance and aesthetics. Dive in and customize this project to create your own immersive 3D experiences on the web!