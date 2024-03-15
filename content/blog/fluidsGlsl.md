---
external: false
title: "Simulating Fluid Dynamics with GLSL"
description: "Explore the mesmerizing world of fluid dynamics simulation using GLSL shaders."
date: 2024-03-18
ogImagePath: /images/blog/fluids/liquidss.gif

---

![Simulating Fluid Dynamics](/images/blog/fluids/liquidss.gif)

## Introduction

In the world of graphics programming, shaders play a crucial role in defining how objects are represented on the screen. Among them, the fragment shader is an essential tool that operates at the pixel level, determining the final color of each fragment on the screen. This article delves into the analysis and creation of a specific fragment shader, providing a detailed understanding of its structure, logic, and generated visual effects. Through a case study, we will explore how trigonometric calculations and time can be used as variables to create dynamic and fascinating visual effects, opening up new possibilities for creativity and expression in the realm of digital art and game development.

{% codepen slug="Pogbqza" url="https://codepen.io/Jowwii/pen/Pogbqza" title="Liquids threejs glsl" /%}

## Fragment Shader

Before diving into the details, it's important to understand the basic structure of a fragment shader. This type of shader is executed for each fragment (or pixel) on the screen, and its main objective is to calculate the final color of that fragment.

## Breaking Down the Code

Now, let's focus on the specific code provided:

```glsl
const int AMOUNT = 12;

void main() {
  vec2 coord = 20.0 * (gl_FragCoord.xy - u_resolution / 2.0) / min(u_resolution.y, u_resolution.x);

  float len;

  for (int i = 0; i < AMOUNT; i++) {
    len = length(vec2(coord.x, coord.y));

    coord.x = coord.x - cos(coord.y + sin(len)) + cos(u_time / 9.0);
    coord.y = coord.y + sin(coord.x + cos(len)) + sin(u_time / 12.0);
  }

  gl_FragColor = vec4(cos(len * 2.0), cos(len * 3.0), cos(len * 1.0), 1.0);
}

```

### Understanding the Logic

First, we declare a constant **`AMOUNT`** that determines how many iterations of a loop will be performed to calculate the visual effects.

- Then, in the **`main()`** function, we initialize the **`coord`** variable, which represents the coordinates of the current screen fragment, adjusted to center on the origin.
- Next, we start a loop that runs **`AMOUNT`** times. Within the loop, we iteratively update the **`coord`** coordinates based on a series of trigonometric calculations and the current time (**`u_time`**).
- Finally, we calculate the fragment color (**`gl_FragColor`**) based on the length of **`coord`**, thus creating a dynamic visual pattern.

## The Visual Effect

The visual effect produced by this fragment shader is fascinating. The combination of trigonometric calculations, time as a variable factor, and the iterative loop results in smooth movement and continuous transformation of colors on the screen. The tones gradually change as the fragments move following a complex yet harmonious pattern.

## Conclusion

Fragment shaders are powerful tools for artists and creative developers, allowing the creation of stunning and dynamic visual effects. Through the analysis of a specific fragment shader, we have been able to understand how the power of graphic processing can be used to generate visually striking art. Experimenting with fragment shaders like this can open new frontiers of creativity and digital expression.















