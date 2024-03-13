---
external: false
title: "Web Map Creation: Procedural Erosion, Shaders, and GIS Techniques"
description: "Explore how I transform MP3 files into visual spheres that respond to frequencies, creating a unique real-time experience."
date: 2024-01-15
ogImagePath: /images/blog/terrain/terrain_mountain.gif

---
{% codepen slug="mdgrbZY" url="https://codepen.io/Jowwii/pen/mdgrbZY" title="mountain glsl threejs" /%}

## Introducción

En el mundo de la tecnología y el desarrollo web, la creación de mapas digitales ha evolucionado significativamente, permitiendo la visualización y análisis de datos geoespaciales de manera más eficiente y accesible. Uno de los avances más notables en este campo es el uso de técnicas de mapeo procedural para transformar imágenes en terrenos 3D en la web. Este artículo explorará cómo se logra este proceso, su utilidad en el sector GIS (Sistema de Información Geográfica), y cómo se aplica en el proyecto "Web Map Creation: Procedural Erosion, Shaders, and GIS Techniques".

{% codepen slug="vYMKoMW" url="https://codepen.io/Jowwii/pen/vYMKoMW" title="Web Map Creation: Procedural Erosion, Shaders, and GIS Techniques" /%}

## Pasos para Convertir una Imagen en un Terreno 3D

El proceso de convertir una imagen en un terreno 3D en la web se basa en técnicas de shaders y mapeo procedural. A continuación, se detallan los pasos clave utilizando el código proporcionado:

1. **Configuración de la Escena y la Cámara**: Se inicia creando una escena y una cámara en Three.js, una biblioteca de JavaScript para la creación de gráficos 3D en la web. La cámara se posiciona para capturar la vista deseada del terreno.

```glsl
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Crear escena y cámara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Posicionar cámara
camera.position.z = 5;

// Añadir lienzo a la escena
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    preserveDrawingBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, renderer.domElement);
```

2. **Carga de la Textura**: Se carga una textura de una imagen (en este caso, una imagen de montañas de Noruega) utilizando `THREE.TextureLoader()`. Esta textura se utilizará para definir la elevación del terreno.

```jsx
//texture
const mountain = new THREE.TextureLoader().load(
  "./norway.png"
)
```

![norway.png](/images/blog/terrain/norway.png)

3. **Creación de Shaders**: La magia ocurre al implementar shaders, fragmentos de código altamente eficientes que se ejecutan en la GPU. El vertex shader modifica la posición del modelo basándose en la información de una textura que representa el relieve del terreno. 

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

Por otro lado, el fragment shader asigna colores en función de la elevación del terreno.

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

4. **Aplicación del Shader a un Plano**: Se crea un plano y se le aplica el material shader creado anteriormente. Este plano representará el terreno 3D.

```jsx
//crear shaders
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

5. **Animación**: Se implementa una función de animación que actualiza el tiempo en el shader de fragmento, permitiendo que el terreno cambie con el tiempo.

```jsx
// Animación
function animate() {
    requestAnimationFrame(animate);

    planeMaterial.uniforms.uTime.value += 0.02;

    renderer.render(scene, camera);
}

animate();
```

## Resultado final
{% codepen slug="vYMKoMW" url="https://codepen.io/Jowwii/pen/vYMKoMW" title="Web Map Creation: Procedural Erosion, Shaders, and GIS Techniques" /%}


## Utilidad en el Sector GIS

El mapeo procedural es especialmente útil en el sector GIS por varias razones:

- **Visualización de Datos Geoespaciales**: Permite la visualización de datos geoespaciales de manera más interactiva y dinámica, facilitando la comprensión de patrones y tendencias.
- **Análisis Espacial**: Facilita el análisis espacial, permitiendo la identificación de áreas de interés y la realización de predicciones basadas en datos geoespaciales.
- **Desarrollo de Aplicaciones Web**: Facilita el desarrollo de aplicaciones web de mapeo y análisis geoespacial, aprovechando la accesibilidad y la interactividad que ofrece la web.

El mapeo procedural es una herramienta poderosa para el sector GIS. Permite la visualización de datos geoespaciales de una manera más interactiva y dinámica, lo que facilita la comprensión de patrones y tendencias. Por ejemplo, se puede utilizar para crear mapas de riesgo de inundaciones o para visualizar la evolución de la deforestación a lo largo del tiempo.

## Conclusión

El mapeo procedural, utilizando shaders y técnicas GIS, ofrece una forma poderosa y flexible de transformar imágenes en terrenos 3D en la web. Este enfoque no solo mejora la visualización de datos geoespaciales, sino que también abre nuevas posibilidades para el análisis y la visualización en el sector GIS. A medida que la tecnología avanza, es probable que veamos aún más aplicaciones innovadoras de estas técnicas, impulsando el desarrollo de soluciones geoespaciales más efectivas y accesibles.

Código completo:

```jsx
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Crear escena y cámara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Posicionar cámara
camera.position.z = 5;

// Añadir lienzo a la escena
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    preserveDrawingBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, renderer.domElement);

//texture
const mountain = new THREE.TextureLoader().load(
  "./norway.png"
)

//crear shaders
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

// Crear un plano para aplicar el shader
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

// Animación
function animate() {
    requestAnimationFrame(animate);

    //planeMaterial.uniforms.uTime.value += 0.02;

    renderer.render(scene, camera);
}

animate();
```