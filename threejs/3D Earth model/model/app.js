let scene, camera, renderer, earth;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        3000
    );

    camera.rotation.y = (45 / 180) * Math.PI;
    camera.position.z = 250;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener("update", renderer);

    let loader = new THREE.GLTFLoader();
    loader.load("./assets/scene.gltf", function (gltf) {
        earth = gltf.scene.children[0];
        earth.scale.set(1, 1, 1);
        scene.add(gltf.scene);
        animate();
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

function animate() {
    renderer.render(scene, camera);
    earth.rotation.z += 0.004;
    requestAnimationFrame(animate);
}

init();
