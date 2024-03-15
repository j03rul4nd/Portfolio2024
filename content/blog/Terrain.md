---
external: false
title: "Web Map Creation: Procedural Erosion, Shaders, and GIS Techniques"
description: "Explore the 3D digital mapping revolution with shaders and GIS techniques. Visualize geospatial data uniquely. Discover innovation today!"
date: 2024-03-14
ogImagePath: /images/blog/terrain/terrain_mountain.gif

---
{% codepen slug="mdgrbZY" url="https://codepen.io/Jowwii/pen/mdgrbZY" title="mountain glsl threejs" /%}

## Introduction

In the world of technology and web development, the creation of digital maps has evolved significantly, allowing for more efficient and accessible visualization and analysis of geospatial data. One of the most notable advances in this field is the use of procedural mapping techniques to transform 2D images into 3D terrains on the web. This article will explore how this process is achieved, its utility in the GIS (Geographic Information System) sector, and how it is applied in the project “Web Map Creation: Procedural Erosion, Shaders, and GIS Techniques”.

{% codepen slug="vYMKoMW" url="https://codepen.io/Jowwii/pen/vYMKoMW" title="Web Map Creation: Procedural Erosion, Shaders, and GIS Techniques" /%}

## Steps to Convert an Image into a 3D Terrain

The process of converting an image into a 3D terrain on the web is based on shader techniques and procedural mapping. The key steps using the provided code are detailed below:

1. **Setting up the Scene and Camera**:  It begins by creating a scene and a camera in Three.js, a JavaScript library for creating 3D graphics on the web. The camera is positioned to capture the desired view of the terrain.

```jsx
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Position camera
camera.position.z = 5;
// Add canvas to the scene
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    preserveDrawingBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
const controls = new OrbitControls(camera, renderer.domElement);
```

2. **Texture Loading**: Load a texture from an image (in this case, an image of mountains from Norway) using `THREE.TextureLoader()`. This texture will be used to define the elevation of the terrain.

```jsx
// Texture
const mountain = new THREE.TextureLoader().load(
  "./norway.png"
)
```

![norway.png](/images/blog/terrain/norway.png)

3. **Shader Creation**: The magic happens when implementing shaders, highly efficient code snippets that run on the GPU. The vertex shader modifies the position of the model based on information from a texture representing the terrain relief.

```glsl
uniform sampler2D uMountain;
varying float vElevation;

void main(){
  vec4 modelPosition = modelMatrix * vec4(position,1);

  vec4 displacement = texture2D(uMountain, uv);
  modelPosition.y += displacement.r * 1.0;

  gl_Position = projectionMatrix * 
                    viewMatrix *
                    modelPosition;
        
  vElevation = modelPosition.y;
}
```

On the other hand, the fragment shader assigns colors based on the terrain elevation.

```glsl
varying float vElevation;
uniform float uTime;

void main(){
    float colorMix = sin(vElevation * 2.0 + uTime);
    vec4 colorA = vec4(1.0, 0.0, 1.0, 1.0);
    vec4 colorB = vec4(0.0, 1.0, 1.0, 1.0);
    vec4 colorC = mix(colorA, colorB, colorMix);
    gl_FragColor = colorC;
}
```

4. **Applying Shader to a Plane**: Create a plane and apply the previously created shader material to it. This plane will represent the 3D terrain.

```jsx
// Create shaders
var vertexShader = `
uniform sampler2D uMountain;
varying float vElevation;

void main(){
  vec4 modelPosition = modelMatrix * vec4(position,1);

  vec4 displacement = texture2D(uMountain, uv);
  modelPosition.y += displacement.r * 1.0;

  gl_Position = projectionMatrix * 
                    viewMatrix *
                    modelPosition;
        
  vElevation = modelPosition.y;
}
`;
var fragmentShader = `
varying float vElevation;
uniform float uTime;

void main(){
    float colorMix = sin(vElevation * 2.0 + uTime);
    vec4 colorA = vec4(1.0, 0.0, 1.0, 1.0);
    vec4 colorB = vec4(0.0, 1.0, 1.0, 1.0);
    vec4 colorC = mix(colorA, colorB, colorMix);
    gl_FragColor = colorC;
}
`;
```

5. **Animation**: Implement an animation function that updates the time in the fragment shader, allowing the terrain to change over time.

```jsx
// Animation
function animate() {
    requestAnimationFrame(animate);
    planeMaterial.uniforms.uTime.value += 0.02;
    renderer.render(scene, camera);
}
animate();
```

## Final Result

{% codepen slug="vYMKoMW" url="https://codepen.io/Jowwii/pen/vYMKoMW" title="Web Map Creation: Procedural Erosion, Shaders, and GIS Techniques" /%}


## Utility in the GIS Sector

Procedural mapping is especially useful in the GIS sector for several reasons:

- **Visualization of Geospatial Data**: It allows for more interactive and dynamic visualization of geospatial data, facilitating the understanding of patterns and trends.
- **Spatial Analysis**: It facilitates spatial analysis, allowing for the identification of areas of interest and the making of predictions based on geospatial data.
- **Development of Web Applications**: It facilitates the development of web mapping and geospatial analysis applications, leveraging the accessibility and interactivity offered by the web.

Procedural mapping is a powerful tool for the GIS sector. It enables the visualization of geospatial data in a more interactive and dynamic way, facilitating the understanding of patterns and trends. For example, it can be used to create flood risk maps or to visualize the evolution of deforestation over time.

## Conclusion

Procedural mapping, using shaders and GIS techniques, offers a powerful and flexible way to transform images into 3D terrains on the web. This approach not only enhances the visualization of geospatial data but also opens up new possibilities for analysis and visualization in the GIS sector. As technology advances, we are likely to see even more innovative applications of these techniques, driving the development of more effective and accessible geospatial solutions.

Complete Code:

```jsx
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Position camera
camera.position.z = 5;
// Add canvas to the scene
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    preserveDrawingBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
const controls = new OrbitControls(camera, renderer.domElement);
// Texture
const mountain = new THREE.TextureLoader().load(
  "./norway.png"
)
// Create shaders
var vertexShader = `
uniform sampler2D uMountain;
varying float vElevation;
void main(){
  vec4 modelPosition = modelMatrix * vec4(position,1);
  vec4 displacement = texture2D(uMountain, uv);
  modelPosition.y += displacement.r * 1.0;
  gl_Position = projectionMatrix *
                    viewMatrix *
                    modelPosition;
  vElevation = modelPosition.y;
}
`;
var fragmentShader = `
varying float vElevation;
uniform float uTime;
void main(){
    float colorMix = sin(vElevation * 2.0 + uTime);
    vec4 colorA = vec4(1.0, 0.0, 1.0, 1.0);
    vec4 colorB = vec4(0.0, 1.0, 1.0, 1.0);
    vec4 colorC = mix(colorA, colorB, colorMix);
    gl_FragColor = colorC;
}
`;
const uniformData =  {
  uMountain: { value: mountain },
  uTime: { value: 0.0 },
};
// Create a plane to apply the shader
const planeMaterial = new THREE.ShaderMaterial({
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: uniformData,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});
const planeGeometry = new THREE.PlaneGeometry(
  5,
  5,
  250,
  250
);
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
planeMesh.rotation.x = Math.PI * -0.5
planeGeometry.computeVertexNormals();
scene.add(planeMesh);
// Animation
function animate() {
    requestAnimationFrame(animate);
    //planeMaterial.uniforms.uTime.value += 0.02;
    renderer.render(scene, camera);
}
animate();
```