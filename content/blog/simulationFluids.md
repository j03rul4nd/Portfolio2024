---
external: false
title: "Fluid on Screen: Transforming Pixels into Color Waves"
description: "Shaders for liquid effects with Three.js"
date: 2024-03-20
ogImagePath: /images/blog/simulationfluids/simulation_fluids.gif
---

{% codepen slug="KKYNddM" url="https://codepen.io/Jowwii/pen/KKYNddM" title="Fluid cover card" /%}

## Creating a Liquid Effect with Color Gradients in Fragment Shaders

Fragment shaders are a powerful tool in the world of computer graphics. They allow for the manipulation of individual pixels on the screen in creative and complex ways. In this article, I will explain how to achieve an attractive liquid simulation effect with color gradients using a fragment shader.

The provided code is an example of a fragment shader written in GLSL (OpenGL Shading Language), designed to be executed in the context of WebGL or similar environments. Let's examine how this shader works to create the desired effect.

![simulation fluids ](/images/blog/simulationfluids/simulation_fluids.gif)

## Understanding the Code:

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main(){
  vec2 coord = (gl_FragCoord.xy / u_resolution.xy);
  float color = 0.0;

  color += sin(coord.x * 50.0 + cos(u_time + coord.y * 10.0 + sin(coord.x * 50.0 + u_time * 2.0))) * 2.0;
  color += cos(coord.x * 20.0 + sin(u_time + coord.y * 10.0 + cos(coord.x * 50.0 + u_time * 2.0))) * 2.0;
  color += sin(coord.x * 30.0 + cos(u_time + coord.y * 10.0 + sin(coord.x * 50.0 + u_time * 2.0))) * 2.0;
  color += cos(coord.x * 10.0 + sin(u_time + coord.y * 10.0 + cos(coord.x * 50.0 + u_time * 2.0))) * 2.0;

  gl_FragColor = vec4(vec3(color + coord.y, color + coord.x, color + coord.x + coord.y), 1.0);
}

```

## Explanation of the Code:

1. **`precision mediump float;`**: This directive specifies the floating-point precision used in calculations. In this case, 'mediump' is used, which provides medium precision suitable for most cases.
2. **`uniform float u_time;`** and **`uniform vec2 u_resolution;`**: These are uniforms provided by the WebGL environment. **`u_time`** represents the time in seconds since the application started, while **`u_resolution`** is a vector indicating the resolution of the display window.
3. **`vec2 coord = (gl_FragCoord.xy / u_resolution.xy);`**: Here, the normalized coordinate of the fragment relative to the display window resolution is calculated. This converts pixel coordinates to a range from 0 to 1.
4. Next, a variable **`color`** is defined and initialized to 0.
5. The following lines modify **`color`** by adding various trigonometric functions with different frequencies and amplitudes. These values are summed to **`color`**, creating color variations based on the fragment position (**`coord.x`** and **`coord.y`**) and time (**`u_time`**).
6. Finally, **`gl_FragColor`** is set as a vec4 representing an RGBA color. The red, green, and blue components (**`vec3`**) are calculated by adding the value of **`color`** to the normalized coordinates **`coord.x`** and **`coord.y`**. The alpha value is set to 1.0, meaning the fragments are completely opaque.

## Conclusion:

The fragment shader provides a powerful way to manipulate the visual appearance of rendered objects in real-time. In this case, we have used trigonometric functions to generate dynamic color gradients, creating an attractive liquid simulation effect. This is just one example of the many creative possibilities that shaders offer in the world of computer graphics. Experimenting with different functions and parameters can lead to even more interesting and visually striking results.