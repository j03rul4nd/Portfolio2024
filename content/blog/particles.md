---
draft: false
external: false
title: Creating Interactive Particle Animations in Three.js
description: Explore the fusion of Three.js and textures to craft dynamic, interactive particle animations with ease.
date: 2024-04-10

ogImagePath: /images/blog/particles/cover.gif
---

{% codepen slug="ExJEGjR" url="https://codepen.io/Jowwii/pen/ExJEGjR" title="Particles add Texture and Events in Three.js" /%}

## Creating Interactive Particle Animations in Three.js

In this tutorial, we'll explore how to generate a mesh composed of particles, which together can visualize an image. Furthermore, I'll show you how to create animations on these particles and how to interact with them to generate waves in the mesh. To achieve this, we will use GLSL (OpenGL Shading Language) for processing the particles and apply the desired image as a texture on the mesh.

[Link to CodePen](https://codepen.io/Jowwii/pen/ExJEGjR).

![Portada](/images/blog/particles/s.png)



## Tools and Technologies

We will use Three.js to create and manipulate our 3D scene. Three.js is a library that simplifies the visualization of 3D graphics on the web, allowing a more accessible approach to WebGL. We'll incorporate GLSL for detailed shader handling, which will allow us to define the appearance and behavior of the particles at the pixel and vertex level.

[Three.js documentation link](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene).

Through a graphical user interface (GUI), we will provide interactive controls to adjust various mesh settings, such as the number and size of the particles. This will allow us to observe how these changes affect performance in the browser and how we can optimize visualization and performance by manipulating these parameters.

![Portada](/images/blog/particles/gui.png)


### Three.js Integration

To start, we need to prepare our environment to display 3D elements. We will opt to use a CDN to include Three.js in our project, which facilitates other readers following the tutorial without needing to install NPM or Node.js.

### Initial HTML Setup

In your **`index.html`** file, include the following script tags to load Three.js and dat.GUI, a lightweight library for creating user interfaces:

```jsx
**index.html**
<script type="importmap">
{
  "imports": {
    "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
    "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
  }
}
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.2/dat.gui.js"></script>

<body>
  <canvas id="canvas"></canvas>
</body>

```

### Creating the Scene with Three.js

In your **`main.js`** file, we will set up the scene, camera, and renderer. Additionally, we will add orbit controls to interact with the 3D visualization:

```jsx
**// main.js**
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1.5;

const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("canvas"), preserveDrawingBuffer: true});
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
```

### Creating the Particle Mesh

To visualize an image on our particle mesh, we'll first load the image as a texture. Subsequently, we'll define the shaders in GLSL that will determine how the particles are rendered. The shaders will allow us to manipulate each particle at the vertex (vertex shader) and pixel (fragment shader) level, enabling us to create effects like waves when interacting with the mesh.

### Loading the Texture and Defining Shaders

```jsx
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('YOUR_IMAGE_URL');

const vertexShader = `...`;
const fragmentShader = `...`;

const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTexture: { value: texture },
    ...
  },
  vertexShader,
  fragmentShader,
  ...
});
```

This would look something like:

```jsx
// Load texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(`https://res.cloudinary.com/dbxohjdng/image/upload/v1712590643/scpeanuobdjpo8fovl2y.png`);

// Define shaders
const vertexShader = `
uniform float uPointSize;
uniform float uTime; // Uniform to control time
varying vec2 vUv;
uniform float uWaveSpeed;
uniform float uAmplitude;
uniform vec2 uWaveCenter; // Add the uniform for the wave center

void main() {
    vUv = uv;
    vec2 pos = position.xy - uWaveCenter; // Adjust position relative to wave center
    float distanceFromCenter = length(pos);
    float wave = sin(distanceFromCenter * 10.0 - uTime * uWaveSpeed) * uAmplitude;
    vec3 newPosition = position + vec3(0, 0, wave);
    gl_PointSize = uPointSize;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}

`;

const fragmentShader = `
    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main() { 
        vec4 texColor = texture2D(uTexture, vUv);
        vec2 coords = 2.0 * gl_PointCoord - 1.0;
        float radius = dot(coords, coords);
        if (radius > 1.0) {
            discard;
        }
        gl_FragColor = texColor;
    }
`;

const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTexture: { value: texture },
    uPointSize: { value: 1.0 }, 
    uTime: { value: 0.0 },
    uWaveSpeed: { value: 5.0 },
    uAmplitude: { value: 0.1 },
    uWaveCenter: { value: new THREE.Vector2(0, 0) }
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthTest: false,
});
```

To visualize the particles in our mesh, we'll have the following:

```jsx
let globalPointsObject = null;

function updateGeometry(numberSize) {
  const size = numberSize; // Desired size to control the number of particles
  const vertices = [];
  for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
          const x = (i / size) * 2 - 1;
          const y = (j / size) * 2 - 1;
          vertices.push(x, y, 0);
      }
  }

  const pointsGeometry = new THREE.BufferGeometry();
  pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  // Generate and apply UV coordinates
  the uvs = [];
  for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
          the u = i / (size - 1);
          the v = j / (size - 1);
          uvs.push(u, v);
      }
  }
  pointsGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

  // Check if a points object already exists in the scene
  if (scene.children.some(child => child instanceof THREE.Points)) {
      // Update the geometry of the existing points object
      const existingPoints = scene.children.find(child => child instanceof THREE.Points);
      existingPoints.geometry.dispose(); // Clean up the previous geometry to avoid memory leaks
      existingPoints.geometry = pointsGeometry;
      existingPoints.geometry.attributes.position.needsUpdate = true;
      globalPointsObject = existingPoints;
  } else {
      // Create a new points object if none exists and add it to the scene
      const points = new THREE.Points(pointsGeometry, shaderMaterial);
      scene.add(points);
      globalPointsObject = points; 
  }
}

updateGeometry(731);
```

As a result, we'll be able to see something like this, remember it may fail because there's still part of the code missing that configures some uniform variables of our shaders, like the Time uniform.

### Interaction and Animation

With the shaders already defined, we'll proceed to create the logic to animate the particles and to respond to interactions, such as clicks, to generate waves in the mesh. This is achieved by modifying the values of the 'uniforms' in the shaders in real-time.

### GUI Configuration for Interactive Control

We'll use dat.GUI to offer interactive controls that allow the user to modify parameters such as the size of the particles and the intensity of the waves. This is done by creating folders within our GUI interface and linking each control to a specific property of our shaders or mesh configuration.

![Portada](/images/blog/particles/cover_3.png)


### Implementing User Interaction

To allow users to interact with the mesh, we'll use a 'Raycaster' from Three.js, which will enable us to detect when and where the user has clicked on the mesh, and in response, modify the position of the wave center in our shaders.

```jsx
// Global variables for the Raycaster and the mouse vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

renderer.domElement.addEventListener('click', onClick, false);
//renderer.domElement.addEventListener('mousemove', onClick, false);

function onClick(event) {
    // Transform the mouse click position to normalized camera coordinates (-1 to +1 for x and y)
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    // Update the ray with the mouse position and camera
    raycaster.setFromCamera(mouse, camera);

    if (globalPointsObject) {
        const intersects = raycaster.intersectObject(globalPointsObject, true);

        if (intersects.length > 0) {
            // The points object was clicked
            // Convert the intersection position to coordinates usable for uWaveCenter
            let intersectPoint = intersects[0].point;
            let localPoint = globalPointsObject.worldToLocal(intersectPoint);

            // Update the wave position based on the intersection point
            // Here you should adjust the coordinates based on your specific system
            let shaderX = localPoint.x;
            let shaderY = localPoint.y;

            shaderMaterial.uniforms.uWaveCenter.value.x = shaderX;
            shaderMaterial.uniforms.uWaveCenter.value.y = shaderY;

            // Also update the GUI controls to reflect the change
            centerXControl.setValue(shaderX);
            centerYControl.setValue(shaderY);
        }
    }
}
```

### Conclusion and Demonstration

This tutorial has guided you through creating a dynamic visualization using particle meshes in WebGL. With the tools and techniques presented, you can now create interactive visual effects and explore how different configurations affect the performance and appearance of your project.

You can view a live demonstration and experiment with the source code at [this CodePen link](https://codepen.io/Jowwii/pen/ExJEGjR).

{% codepen slug="ExJEGjR" url="https://codepen.io/Jowwii/pen/ExJEGjR" title="Particles add Texture and Events in Three.js" /%}
