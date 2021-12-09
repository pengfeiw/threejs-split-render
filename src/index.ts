import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const container = document.getElementById("container") as HTMLElement;
const viewEle1 = document.getElementById("view1") as HTMLElement;
const viewEle2 = document.getElementById("view2") as HTMLElement;

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
    antialias:true
});
renderer.physicallyCorrectLights = true;
renderer.setScissorTest(true); // enable scissor test

container.appendChild(renderer.domElement);

// camera one
const camera1 = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera1.position.set(0, 0, 10);

const control1 = new OrbitControls(camera1, viewEle1);
control1.update();

// camera two
const camera2 = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera2.position.set(0, 0, -10);

const control2 = new OrbitControls(camera2, viewEle2);
control2.update();

// cube
const cubeSize = 1;
const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

const cubeMat = new THREE.MeshPhongMaterial({
    color: new THREE.Color("yellow")
});

const cube = new THREE.Mesh(cubeGeo, cubeMat);

scene.add(cube);

// directional light
const light1 = new THREE.DirectionalLight(new THREE.Color("white"), 3);
light1.position.set(1, 1, 1);

scene.add(light1);

// ambient light
const light2 = new THREE.AmbientLight(new THREE.Color("white"), 1);

scene.add(light2);

const resizer = () => {
    const screenH = container.clientHeight;
    const screenW = container.clientWidth;
    
    const aspect = screenW / screenH * 0.5;

    camera1.aspect = aspect;
    camera1.updateProjectionMatrix();

    camera2.aspect = aspect;
    camera2.updateProjectionMatrix();

    renderer.setSize(screenW, screenH);
}

resizer();

window.addEventListener("resize", resizer);

const renderScene = () => {
    const halfW = container.clientWidth / 2;

    // view1
    scene.background = new THREE.Color("black");
    
    renderer.setViewport(0, 0, halfW, container.clientHeight);
    renderer.setScissor(0, 0, halfW, container.clientHeight);

    renderer.render(scene, camera1);

    // view2
    scene.background = new THREE.Color("gray");

    renderer.setViewport(halfW, 0, container.clientWidth / 2, container.clientHeight);
    renderer.setScissor(halfW, 0, container.clientWidth / 2, container.clientHeight);

    renderer.render(scene, camera2);

    requestAnimationFrame(renderScene);
};

requestAnimationFrame(renderScene);
