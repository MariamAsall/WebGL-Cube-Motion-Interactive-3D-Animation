# WebGL Cube Motion: Interactive 3D Animation

This project is a demonstration of core WebGL concepts used to create and animate an interactive 3D cube. The application renders a cube that rotates continuously while allowing users to manipulate its position and scale in real-time using keyboard controls.

This project is built from scratch using HTML, JavaScript, and WebGL, without relying on higher-level libraries like Three.js, to provide a clear look at the fundamental principles of 3D graphics on the web.

## Features

-   **Continuous 3D Rotation:** The cube animates with a smooth, continuous rotation on its own.
-   **Interactive Translation:** Users can move the cube left and right along the X-axis.
-   **Interactive Scaling:** Users can scale the cube up (zoom in) or down (zoom out).
-   **Real-Time Rendering:** All transformations are rendered instantly in the browser using the power of the GPU.
-   **Direct WebGL Implementation:** Showcases the use of the WebGL API, shaders, and buffers for rendering 3D graphics.

## How to Run

No server or complex setup is required. You can run this project directly in your browser.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MariamAsall/WebGL-Cube-Motion-Interactive-3D-Animation.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd WebGL-Cube-Motion-Interactive-3D-Animation
    ```

3.  **Open the `index.html` file** in any modern web browser that supports WebGL (e.g., Chrome, Firefox, Edge).

## Controls

-   **Move Left:** `Left Arrow` key
-   **Move Right:** `Right Arrow` key
-   **Zoom In (Scale Up):** `Up Arrow` key
-   **Zoom Out (Scale Down):** `Down Arrow` key

## Implementation Details

The project's logic is built on the core components of the WebGL rendering pipeline.

#### **1. WebGL Shaders (GLSL)**

Two GLSL shaders are used to process the cube's geometry and appearance:

-   **Vertex Shader:** This shader is responsible for calculating the final position of each vertex of the cube. It takes the original vertex positions and applies transformation matrices (translation, rotation, scaling) that are passed in from the JavaScript code.
-   **Fragment Shader:** This shader determines the color of each pixel on the cube's surface, giving it a solid, multi-colored appearance.

#### **2. JavaScript for Logic and Control**

JavaScript orchestrates the entire application:

-   **WebGL Context Setup:** Initializes the WebGL rendering context on the HTML5 `` element.
-   **Buffer Management:** Creates buffers to store the cube's vertex data (positions and colors) and sends this data to the GPU.
-   **Animation Loop:** Uses the `requestAnimationFrame()` method to create a smooth and efficient rendering loop. In each frame, it updates the rotation angle and re-renders the scene.
-   **User Interaction:** Listens for keyboard events (`keydown`) to update the translation and scaling transformation matrices based on user input.

## Technologies Used

-   **HTML5:** For the basic page structure and `` element.
-   **CSS3:** For styling the page and canvas container.
-   **JavaScript (ES6+):** For all application logic, user interaction, and communication with the WebGL API.
-   **WebGL:** The core API for rendering 2D and 3D graphics in the browser.
-   **GLSL (OpenGL Shading Language):** The language used to write the vertex and fragment shaders.

## Future Enhancements

-   **Mouse Controls:** Implement camera rotation and object manipulation using mouse movements (click and drag).
-   **Texturing:** Apply textures to the faces of the cube for a more realistic appearance.
-   **Advanced Lighting:** Introduce a light source to create shadows and highlights on the cube.
-   **More Shapes:** Extend the application to support other geometric primitives like spheres and pyramids.
