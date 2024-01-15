---
external: false
title: "3D Rhythm: Visualizing Music with Three.js"
description: "Explore how I transform MP3 files into visual spheres that respond to frequencies, creating a unique real-time experience."
date: 2024-01-15
ogImagePath: /images/blog/ThreedMusic/cover.png

---

![Cover](/images/blog/ThreedMusic/cover.png)

## Introduction:

At the intersection of programming and creativity, "[Music 3D](https://codepen.io/Jowwii/pen/QWoGJvz)". emerges. This personal project as a software developer aims to elevate the auditory experience to new heights by transforming music into a vibrant three-dimensional visual display. The use of technologies such as Three.js and frequency analysis through a noise library creates a unique and captivating experience.

{% codepen slug="QWoGJvz" url="https://codepen.io/Jowwii/pen/QWoGJvz" title="Testing Three Js " /%}


## Technology Choices:

The foundation of this project lies in selecting technologies that enable the creation of immersive music visualizations. Three.js, a JavaScript library for 3D graphics, stood out as the ideal choice for rendering dynamic spheres. [The noise library](https://github.com/josephg/noisejs) provides the ability to adjust the shapes and movements of the spheres based on the music frequencies.

```jsx
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.js"></script>
<script src="https://cdn.rawgit.com/josephg/noisejs/master/perlin.js"></script>
<script src="https://82mou.github.io/threejs/js/OrbitControls.js"></script>
```

## Application Development:

The development process began with creating the basic structure of the application, establishing a visual canvas with Three.js, and configuring the camera and lights for an immersive experience. Implementation of orbit controls with the OrbitControls library allowed interactivity, while carefully chosen colors and materials contributed to the visual aesthetics.

{% codepen slug="PoLzoJv" url="https://codepen.io/Jowwii/pen/PoLzoJv" title="Three Js " /%}

## Music Synchronization:

The true magic of "Music 3D" lies in the application's ability to synchronize with loaded music. Integrating the noise library and frequency analysis allows the spheres to react in real-time to each note, creating a visual journey that reflects the complexity and emotion of the selected music.

Let's delve into the code responsible for handling audio files and performing real-time frequency analysis to deliver an immersive and dynamic visual experience.

### Loading Audio Files:

```jsx
function handleAudioFile(event) {
    // Audio context setup
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const file = event.target.files[0] || { name: "TameImpala.mp3" };

    if (file) {
        // Pause current playback if any
        if (initAudio) {
            audioSource.stop();
            initAudio = false;
        }

        // Create a new audio source
        audioSource = audioContext.createBufferSource();

        // Read the audio file and load it into the audio context
        const reader = new FileReader();
        reader.onload = function (e) {
            audioContext.decodeAudioData(e.target.result, function (buffer) {
                // Configure the audio source with the decoded buffer
                audioSource.buffer = buffer;
                audioSource.connect(audioContext.destination);

                // Create a new audio source and connect it to the context
                audioSource = audioContext.createBufferSource();
                audioSource.buffer = buffer;
                audioSource.connect(audioContext.destination);

                // Start audio playback
                audioSource.start();
                initAudio = true;

                // Configure the audio element for synchronization
                document.getElementById('audio').src = URL.createObjectURL(file);
                document.getElementById('audio').currentTime = 0;

                // Show confirmation with the file name
                let fileName = document.getElementById('audioFile').files[0].name;
                document.getElementById('confirmation').textContent = `File loaded: ${fileName}`;
                document.getElementById('confirmation').style.display = 'block';

                // Enable the file selection button again
                let btn = document.getElementById('customFileBtn');
                btn.removeAttribute('disabled');
                btn.innerHTML = "Select audio file";
            });
        };

        // Read the file as an array buffer for decoding
        reader.readAsArrayBuffer(file);
    }
}

```

### Frequency Analysis and Noise Application:

```jsx
function applyNoiseToSphereAudio() {
    var time = performance.now() * 0.001;
    let factorNoise = 0.3;

    if (initAudio && audioSource) {
        // Create the Analyzer node if not created yet
        if (!audioContext.analyser) {
            audioContext.analyser = audioContext.createAnalyser();
            audioSource.connect(audioContext.analyser);
        }

        // Get the audio frequency spectrum
        var dataArray = new Uint8Array(audioContext.analyser.frequencyBinCount);
        audioContext.analyser.getByteFrequencyData(dataArray);

        // Calculate the average amplitude
        var averageAmplitude = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;

        // Dynamic adjustment of the noise factor
        var attenuation = 0.1;
        factorNoise = factorNoise * attenuation + mapToFactorNoise(averageAmplitude) * (1 - attenuation);

        // Ensure it is in the desired range (0.3 to 2.0)
        factorNoise = Math.min(Math.max(factorNoise, 0.3), 2.0);
        factorNoise = parseFloat(factorNoise.toFixed(1));
    }

    // Apply the noise factor to the sphere
    for (var i = 0; i < sphere.geometry.vertices.length; i++) {
        var p = sphere.geometry.vertices[i];
        p.normalize().multiplyScalar(1 + factorNoise * noise.perlin3(p.x + time, p.y, p.z));
    }
    sphere.geometry.verticesNeedUpdate = true;
    sphere.geometry.computeVertexNormals();
    sphere.geometry.normalsNeedUpdate = true;
}
```

### Detailed Explanation:

- **Loading Audio Files:** The **`handleAudioFile`** unction is triggered when selecting an audio file. It sets up the audio context, creates a new source, loads the selected file, and connects it to the audio destination. It also starts playback and updates the user interface.
- **Frequency Analysis and Noise Application:** In **`applyNoiseToSphereAudio`**, a Frequency Analyzer is used to obtain real-time data. The noise factor dynamically adjusts based on the average amplitude, generating a visually responsive experience to the loaded music.

These code snippets illustrate how audio management in "Music 3D" goes beyond simple playback, incorporating frequency analysis to create an immersive and visually captivating experience.

## Optimization and Adaptability:

During development, performance optimization was prioritized to ensure a smooth experience on various platforms. The application's adaptability to mobile devices was achieved through responsive design and optimization of controls for easy navigation.

```jsx
function onCanvasResize() {
    const canvas = document.getElementById('MyCanvas');
    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.width, canvas.height);
}
```

## Conclusion:

"[Music 3D](https://codepen.io/Jowwii/pen/QWoGJvz)" represents the convergence of my passion for programming and artistic expression. The conscious choice of technologies and the focus on synchronization with music reflect a commitment to technical excellence and the creation of meaningful experiences. This project not only illustrates my skills as a software developer but also showcases my ability to merge creativity and technology in innovative projects.
