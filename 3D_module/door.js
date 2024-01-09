import * as THREE from "three";
import * as TWEEN from "three/addons/libs/tween.module.js";

export default class Door {

    isOpen = false;
    constructor(parameters) {
        this.scale = parameters.scale || new THREE.Vector3(1, 1, 1);

        // Create a group to hold the door components
        this.object = new THREE.Group();

        // Create the frame
        const frameSize = { width: 1.2, height: 0.97, depth: 0.045 };
        const frameGeometry = new THREE.BoxGeometry(frameSize.width, frameSize.height, frameSize.depth);
        const sideMaterial = new THREE.MeshBasicMaterial({ color: 0xc36e2d });

        // Create a texture for the frame front
        const frameFrontTexture = new THREE.TextureLoader().load("./textures/door_front.png");
        frameFrontTexture.colorSpace = THREE.SRGBColorSpace;

        // Create a material for the frame front
        const frameFrontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: frameFrontTexture });
        frameFrontMaterial.transparent = true;

        // Create a texture for the frame back
        const frameBackTexture = new THREE.TextureLoader().load("./textures/door_back.png");
        frameBackTexture.colorSpace = THREE.SRGBColorSpace;

        // Create a material for the frame back
        const frameBackMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: frameBackTexture });
        frameBackMaterial.transparent = true;

        const frameMesh = new THREE.Mesh(frameGeometry, [sideMaterial, sideMaterial, sideMaterial, sideMaterial, frameFrontMaterial, frameBackMaterial]);
        this.object.add(frameMesh);

        // Create the door
        const doorSize = { width: 1.1, height: 0.95, depth: 0.035, gap: 0.0465 };
        const doorGeometry = new THREE.BoxGeometry(doorSize.width, doorSize.height, doorSize.depth);
        //doorGeometry.translate(-doorSize.width / 2, 0, 0);

        // Create a texture for the door front
        const doorFrontTexture = new THREE.TextureLoader().load("./textures/door_front.png");
        doorFrontTexture.colorSpace = THREE.SRGBColorSpace;

        // Create a material for the door front
        const doorFrontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: doorFrontTexture });
        doorFrontMaterial.transparent = true;

        // Create a texture for the door back
        const doorBackTexture = new THREE.TextureLoader().load("./textures/door_back.png");
        doorBackTexture.colorSpace = THREE.SRGBColorSpace;

        // Create a material for the door back
        const doorBackMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: doorBackTexture });
        doorBackMaterial.transparent = true;

        const doorMesh = new THREE.Mesh(doorGeometry, [sideMaterial, sideMaterial, sideMaterial, sideMaterial, doorFrontMaterial, doorBackMaterial]);

        // Group for the door to handle rotation around its edge
        this.doorGroup = new THREE.Group();
        this.doorGroup.position.set(-doorSize.width / 2, 0, 0); // Ajuste para o ponto de pivô estar na borda
        this.doorGroup.add(doorMesh);
        this.object.add(this.doorGroup);

        this.object.scale.copy(this.scale);
        this.isOpen = false;
    }
    
}

