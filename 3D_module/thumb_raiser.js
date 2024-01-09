import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import Orientation from "./orientation.js";
import { cameraData, fogData, generalData, lightsData, mazeData, playerData } from "./default_data.js";
import { merge } from "./merge.js";
import Maze from "./maze.js";
import Player from "./player.js";
import Lights from "./lights.js";
import Fog from "./fog.js";
import Camera from "./camera.js";
import Animations from "./animations.js";
import UserInterface from "./user_interface.js";


export default class ThumbRaiser {

    constructor(generalParameters, mazeParameters, playerParameters, lightsParameters,
                fogParameters, fixedViewCameraParameters, firstPersonViewCameraParameters,
                thirdPersonViewCameraParameters, topViewCameraParameters, miniMapCameraParameters) {
        this.generalParameters = merge({}, generalData, generalParameters);
        this.mazeParameters = merge({}, mazeData, mazeParameters);
        this.playerParameters = merge({}, playerData, playerParameters);
        this.lightsParameters = merge({}, lightsData, lightsParameters);
        this.fogParameters = merge({}, fogData, fogParameters);
        this.fixedViewCameraParameters = merge({}, cameraData, fixedViewCameraParameters);
        this.firstPersonViewCameraParameters = merge({}, cameraData, firstPersonViewCameraParameters);
        this.thirdPersonViewCameraParameters = merge({}, cameraData, thirdPersonViewCameraParameters);
        this.topViewCameraParameters = merge({}, cameraData, topViewCameraParameters);
        this.miniMapCameraParameters = merge({}, cameraData, miniMapCameraParameters);
        this.raycaster = new THREE.Raycaster();


        // Set the game state
        this.gameRunning = false;

        // Create a 2D scene (the viewports frames)
        this.scene2D = new THREE.Scene();

        // Create a square
        let points = [new THREE.Vector3(0.0, 0.0, 0.0), new THREE.Vector3(1.0, 0.0, 0.0), new THREE.Vector3(1.0, 1.0, 0.0), new THREE.Vector3(0.0, 1.0, 0.0)];
        let geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        this.square = new THREE.LineLoop(geometry, material);
        this.scene2D.add(this.square);

        // Create the camera corresponding to the 2D scene
        this.camera2D = new THREE.OrthographicCamera(0.0, 1.0, 1.0, 0.0, 0.0, 1.0);

        // Create a 3D scene (the game itself)
        this.scene3D = new THREE.Scene();

        // Create the maze
        this.maze = new Maze(this.mazeParameters);

        // Create the player
        this.player = new Player(this.playerParameters);

        // Export player instance to global scope
        window.player = this.player;


        // Create the lights
        this.lights = new Lights(this.lightsParameters);

        // Create the fog
        this.fog = new Fog(this.fogParameters);

        // Create the cameras corresponding to the four different views: fixed view, first-person view, third-person view and top view
        this.fixedViewCamera = new Camera(this.fixedViewCameraParameters, window.innerWidth, window.innerHeight);
        this.firstPersonViewCamera = new Camera(this.firstPersonViewCameraParameters, window.innerWidth, window.innerHeight);
        this.thirdPersonViewCamera = new Camera(this.thirdPersonViewCameraParameters, window.innerWidth, window.innerHeight);
        this.topViewCamera = new Camera(this.topViewCameraParameters, window.innerWidth, window.innerHeight);

        // Create the mini-map camera
        this.miniMapCamera = new Camera(this.miniMapCameraParameters, window.innerWidth, window.innerHeight);

        // Create the statistics and make its node invisible
        this.statistics = new Stats();
        this.statistics.dom.style.visibility = "hidden";
        document.body.appendChild(this.statistics.dom);

        // Create a renderer and turn on shadows in the renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        if (this.generalParameters.setDevicePixelRatio) {
            this.renderer.setPixelRatio(window.devicePixelRatio);
        }
        this.renderer.autoClear = false;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Set the mouse move action (none)
        this.dragMiniMap = false;
        this.changeCameraDistance = false;
        this.changeCameraOrientation = false;

        // Set the game state
        this.gameRunning = false;

        // Get and configure the panel's <div> elements
        this.viewsPanel = document.getElementById("views-panel");
        this.view = document.getElementById("view");
        this.projection = document.getElementById("projection");
        this.horizontal = document.getElementById("horizontal");
        this.horizontal.step = 1;
        this.vertical = document.getElementById("vertical");
        this.vertical.step = 1;
        this.distance = document.getElementById("distance");
        this.distance.step = 0.1;
        this.zoom = document.getElementById("zoom");
        this.zoom.step = 0.1;
        this.reset = document.getElementById("reset");
        this.resetAll = document.getElementById("reset-all");
        this.helpPanel = document.getElementById("help-panel");
        this.helpPanel.style.visibility = "hidden";
        this.subwindowsPanel = document.getElementById("subwindows-panel");
        this.multipleViewsCheckBox = document.getElementById("multiple-views");
        this.multipleViewsCheckBox.checked = false;
        this.userInterfaceCheckBox = document.getElementById("user-interface");
        this.userInterfaceCheckBox.checked = true;
        this.miniMapCheckBox = document.getElementById("mini-map");
        this.miniMapCheckBox.checked = true;
        this.helpCheckBox = document.getElementById("help");
        this.helpCheckBox.checked = false;
        this.statisticsCheckBox = document.getElementById("statistics");
        this.statisticsCheckBox.checked = false;

        // Build the help panel
        this.buildHelpPanel();

        // Set the active view camera (fixed view)
        this.setActiveViewCamera(this.fixedViewCamera);

        // Arrange viewports by view mode
        this.arrangeViewports(this.multipleViewsCheckBox.checked);

        // Register the event handler to be called on window resize
        window.addEventListener("resize", event => this.windowResize(event));

        // Register the event handler to be called on key down
        document.addEventListener("keydown", event => this.keyChange(event, true));

        // Register the event handler to be called on key release
        document.addEventListener("keyup", event => this.keyChange(event, false));

        // Register the event handler to be called on mouse down
        this.renderer.domElement.addEventListener("mousedown", event => this.mouseDown(event));

        // Register the event handler to be called on mouse move
        this.renderer.domElement.addEventListener("mousemove", event => this.mouseMove(event));

        // Register the event handler to be called on mouse up
        this.renderer.domElement.addEventListener("mouseup", event => this.mouseUp(event));

        // Register the event handler to be called on mouse wheel
        this.renderer.domElement.addEventListener("wheel", event => this.mouseWheel(event));

        // Register the event handler to be called on context menu
        this.renderer.domElement.addEventListener("contextmenu", event => this.contextMenu(event));

        // Register the event handler to be called on select, input number, or input checkbox change
        this.view.addEventListener("change", event => this.elementChange(event));
        this.projection.addEventListener("change", event => this.elementChange(event));
        this.horizontal.addEventListener("change", event => this.elementChange(event));
        this.vertical.addEventListener("change", event => this.elementChange(event));
        this.distance.addEventListener("change", event => this.elementChange(event));
        this.zoom.addEventListener("change", event => this.elementChange(event));
        this.multipleViewsCheckBox.addEventListener("change", event => this.elementChange(event));
        this.userInterfaceCheckBox.addEventListener("change", event => this.elementChange(event));
        this.helpCheckBox.addEventListener("change", event => this.elementChange(event));
        this.statisticsCheckBox.addEventListener("change", event => this.elementChange(event));

        // Register the event handler to be called on input button click
        this.reset.addEventListener("click", event => this.buttonClick(event));
        this.resetAll.addEventListener("click", event => this.buttonClick(event));

        this.activeElement = document.activeElement;

        const urlParams = new URLSearchParams(window.location.search);
        const buildingId = urlParams.get('buildingId');
        const floorId = urlParams.get('floorId');
        //console.log("INTERSECTS.LENGTH: ", intersects.length)
        this.maze.requestData(buildingId, floorId);
    }

    buildHelpPanel() {
        const table = document.getElementById("help-table");
        let i = 0;
        for (const key in this.player.keyCodes) {
            while (table.rows[i].cells.length < 2) {
                i++;
            };
            table.rows[i++].cells[0].innerHTML = this.player.keyCodes[key];
        }
        table.rows[i].cells[0].innerHTML = this.maze.credits + "<br>" + this.player.credits;
    }

    displayPanel() {
        this.view.options.selectedIndex = ["fixed", "first-person", "third-person", "top"].indexOf(this.activeViewCamera.view);
        this.projection.options.selectedIndex = ["perspective", "orthographic"].indexOf(this.activeViewCamera.projection);
        this.horizontal.value = this.activeViewCamera.orientation.h.toFixed(0);
        this.vertical.value = this.activeViewCamera.orientation.v.toFixed(0);
        this.distance.value = this.activeViewCamera.distance.toFixed(1);
        this.zoom.value = this.activeViewCamera.zoom.toFixed(1);
    }

    // Set active view camera
    setActiveViewCamera(camera) {
        this.activeViewCamera = camera;
        this.horizontal.min = this.activeViewCamera.orientationMin.h.toFixed(0);
        this.horizontal.max = this.activeViewCamera.orientationMax.h.toFixed(0);
        this.vertical.min = this.activeViewCamera.orientationMin.v.toFixed(0);
        this.vertical.max = this.activeViewCamera.orientationMax.v.toFixed(0);
        this.distance.min = this.activeViewCamera.distanceMin.toFixed(1);
        this.distance.max = this.activeViewCamera.distanceMax.toFixed(1);
        this.zoom.min = this.activeViewCamera.zoomMin.toFixed(1);
        this.zoom.max = this.activeViewCamera.zoomMax.toFixed(1);
        this.displayPanel();
    }

    arrangeViewports(multipleViews) {
        this.fixedViewCamera.setViewport(multipleViews);
        this.firstPersonViewCamera.setViewport(multipleViews);
        this.thirdPersonViewCamera.setViewport(multipleViews);
        this.topViewCamera.setViewport(multipleViews);
    }

    pointerIsOverViewport(pointer, viewport) {
        return (
          pointer.x >= viewport.x &&
          pointer.x < viewport.x + viewport.width &&
          pointer.y >= viewport.y &&
          pointer.y < viewport.y + viewport.height);
    }

    getPointedViewport(pointer) {
        let viewport;
        // Check if the pointer is over the mini-map camera viewport
        if (this.miniMapCheckBox.checked) {
            viewport = this.miniMapCamera.getViewport();
            if (this.pointerIsOverViewport(pointer, viewport)) {
                return this.miniMapCamera.view;
            }
        }
        // Check if the pointer is over the remaining camera viewports
        let cameras;
        if (this.multipleViewsCheckBox.checked) {
            cameras = [this.fixedViewCamera, this.firstPersonViewCamera, this.thirdPersonViewCamera, this.topViewCamera];
        }
        else {
            cameras = [this.activeViewCamera];
        }
        for (const camera of cameras) {
            viewport = camera.getViewport();
            if (this.pointerIsOverViewport(pointer, viewport)) {
                return camera.view;
            }
        }
        // No camera viewport is being pointed
        return "none";
    }

    setViewMode(multipleViews) { // Single-view mode: false; multiple-views mode: true
        this.multipleViewsCheckBox.checked = multipleViews;
        this.arrangeViewports(this.multipleViewsCheckBox.checked);
    }

    setUserInterfaceVisibility(visible) {
        this.userInterfaceCheckBox.checked = visible;
        this.viewsPanel.style.visibility = visible ? "visible" : "hidden";
        this.subwindowsPanel.style.visibility = visible ? "visible" : "hidden";
        this.userInterface.setVisibility(visible);
    }

    setMiniMapVisibility(visible) { // Hidden: false; visible: true
        this.miniMapCheckBox.checked = visible;
    }

    setHelpVisibility(visible) { // Hidden: false; visible: true
        this.helpCheckBox.checked = visible;
        this.helpPanel.style.visibility = visible ? "visible" : "hidden";
    }

    setStatisticsVisibility(visible) { // Hidden: false; visible: true
        this.statisticsCheckBox.checked = visible;
        this.statistics.dom.style.visibility = visible ? "visible" : "hidden";
    }

    windowResize() {
        this.fixedViewCamera.updateWindowSize(window.innerWidth, window.innerHeight);
        this.firstPersonViewCamera.updateWindowSize(window.innerWidth, window.innerHeight);
        this.thirdPersonViewCamera.updateWindowSize(window.innerWidth, window.innerHeight);
        this.topViewCamera.updateWindowSize(window.innerWidth, window.innerHeight);
        this.miniMapCamera.updateWindowSize(window.innerWidth, window.innerHeight);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    keyChange(event, state) {
        // Allow digit and arrow keys to be used when entering numbers
        if (["horizontal", "vertical", "distance", "zoom"].indexOf(event.target.id) < 0) {
            event.target.blur();
        }
        if (document.activeElement == document.body) {
            // Prevent the "Space" and "Arrow" keys from scrolling the document's content
            if (event.code == "Space" || event.code == "ArrowLeft" || event.code == "ArrowRight" || event.code == "ArrowDown" || event.code == "ArrowUp") {
                event.preventDefault();
            }
            if (event.code == this.player.keyCodes.fixedView && state) { // Select fixed view
                this.setActiveViewCamera(this.fixedViewCamera);
            }
            else if (event.code == this.player.keyCodes.firstPersonView && state) { // Select first-person view
                this.setActiveViewCamera(this.firstPersonViewCamera);
            }
            else if (event.code == this.player.keyCodes.thirdPersonView && state) { // Select third-person view
                this.setActiveViewCamera(this.thirdPersonViewCamera);
            }
            else if (event.code == this.player.keyCodes.topView && state) { // Select top view
                this.setActiveViewCamera(this.topViewCamera);
            }
            if (event.code == this.player.keyCodes.viewMode && state) { // Single-view mode / multiple-views mode
                this.setViewMode(!this.multipleViewsCheckBox.checked);
            }
            if (event.code == this.player.keyCodes.userInterface && state) { // Display / hide user interface
                this.setUserInterfaceVisibility(!this.userInterfaceCheckBox.checked);
            }
            if (event.code == this.player.keyCodes.miniMap && state) { // Display / hide mini-map
                this.setMiniMapVisibility(!this.miniMapCheckBox.checked);
            }
            if (event.code == this.player.keyCodes.help && state) { // Display / hide help
                this.setHelpVisibility(!this.helpCheckBox.checked);
            }
            if (event.code == this.player.keyCodes.statistics && state) { // Display / hide statistics
                this.setStatisticsVisibility(!this.statisticsCheckBox.checked);
            }
            if (event.code == this.player.keyCodes.run) {
                this.player.keyStates.run = state;
            }
            if (event.code == this.player.keyCodes.left) {
                this.player.keyStates.left = state;
            }
            else if (event.code == this.player.keyCodes.right) {
                this.player.keyStates.right = state;
            }
            if (event.code == this.player.keyCodes.backward) {
                this.player.keyStates.backward = state;
            }
            else if (event.code == this.player.keyCodes.forward) {
                this.player.keyStates.forward = state;
            }
            if (event.code == this.player.keyCodes.jump) {
                this.player.keyStates.jump = state;
            }
            else if (event.code == this.player.keyCodes.yes) {
                this.player.keyStates.yes = state;
            }
            else if (event.code == this.player.keyCodes.no) {
                this.player.keyStates.no = state;
            }
            else if (event.code == this.player.keyCodes.wave) {
                this.player.keyStates.wave = state;
            }
            else if (event.code == this.player.keyCodes.punch) {
                this.player.keyStates.punch = state;
            }
            else if (event.code == this.player.keyCodes.thumbsUp) {
                this.player.keyStates.thumbsUp = state;
            }

            this.player.shiftKey = event.shiftKey;
        }
    }

    mouseDown(event) {
        if (event.buttons == 1 || event.buttons == 2) { // Primary or secondary button down
            // Store current mouse position in window coordinates (mouse coordinate system: origin in the top-left corner; window coordinate system: origin in the bottom-left corner)
            this.mousePosition = new THREE.Vector2(event.clientX, window.innerHeight - event.clientY - 1);
            // Select the camera whose view is being pointed
            const cameraView = this.getPointedViewport(this.mousePosition);
            if (cameraView != "none") {
                if (cameraView == "mini-map") { // Mini-map camera selected
                    if (event.buttons == 1) { // Primary button down
                        this.dragMiniMap = true;
                    }
                }
                else { // One of the remaining cameras selected
                    const cameraIndex = ["fixed", "first-person", "third-person", "top"].indexOf(cameraView);
                    this.view.options.selectedIndex = cameraIndex;
                    this.setActiveViewCamera([this.fixedViewCamera, this.firstPersonViewCamera, this.thirdPersonViewCamera, this.topViewCamera][cameraIndex]);
                    if (event.buttons == 1) { // Primary button down
                        this.changeCameraDistance = true;
                    }
                    else { // Secondary button down
                        this.changeCameraOrientation = true;
                    }
                }
            }
        }
    }

    mouseMove(event) {
        this.activeViewCamera.updateRaycaster();

        if (this.activeViewCamera.intersections(this.maze.object).length > 0){
            const pos = this.activeViewCamera.intersections(this.maze.object)[0].point;
            const playerPos = this.activeViewCamera.intersections(this.player.object)
            const size = this.maze.sizeToAdd();
            const newx = size.width / 2;
            const newz = size.height / 2;
            const pos2 = {x:pos.x + newx, z: pos.z + newz};

            // Export player position to global scope
            window.playerPos = { x: playerPos.x + newx, z: playerPos.z + newz };

            const tooltip = document.getElementById('tooltip');
            const roomFound = this.maze.whatRoom(pos2);
            if (roomFound != null){
                const sizeBx = tooltip.offsetWidth;
                const sizeBy = tooltip.offsetHeight;
                console.log(roomFound);
                tooltip.style.display = 'block';
                tooltip.style.left = (event.clientX - sizeBx) + 'px';
                tooltip.style.top = (event.clientY - sizeBy) + 'px';
                tooltip.innerHTML = roomFound;
            }else {
                tooltip.style.display = 'none';
            }
        } else {
            tooltip.style.display = 'none';
        }

        if (event.buttons == 1 || event.buttons == 2) { // Primary or secondary button down
            if (this.changeCameraDistance || this.changeCameraOrientation || this.dragMiniMap) { // Mouse action in progress
                // Compute mouse movement and update mouse position
                const newMousePosition = new THREE.Vector2(event.clientX, window.innerHeight - event.clientY - 1);
                const mouseIncrement = newMousePosition.clone().sub(this.mousePosition);
                this.mousePosition = newMousePosition;
                this.updateRaycaster(event);

                if (event.buttons == 1) { // Primary button down
                    if (this.changeCameraDistance) {
                        this.activeViewCamera.updateDistance(-0.05 * (mouseIncrement.x + mouseIncrement.y));
                        this.displayPanel();
                    }
                    else if (this.dragMiniMap) {
                        const windowMinSize = Math.min(window.innerWidth, window.innerHeight);
                        const width = this.miniMapCamera.viewport.width * windowMinSize;
                        const height = this.miniMapCamera.viewport.height * windowMinSize;
                        this.miniMapCamera.viewport.x += mouseIncrement.x / (window.innerWidth - width);
                        this.miniMapCamera.viewport.y += mouseIncrement.y / (window.innerHeight - height);
                    }
                }
                else { // Secondary button down
                    if (this.changeCameraOrientation) {
                        this.activeViewCamera.updateOrientation(mouseIncrement.multiply(new THREE.Vector2(-0.5, 0.5)));
                        this.displayPanel();
                    }
                }
            }
        }
    }

    mouseUp(event) {
        // Reset mouse move action
        this.dragMiniMap = false;
        this.changeCameraDistance = false;
        this.changeCameraOrientation = false;
    }

    mouseWheel(event) {
        // Prevent the mouse wheel from scrolling the document's content
        event.preventDefault();
        // Store current mouse position in window coordinates (mouse coordinate system: origin in the top-left corner; window coordinate system: origin in the bottom-left corner)
        this.mousePosition = new THREE.Vector2(event.clientX, window.innerHeight - event.clientY - 1);
        // Select the camera whose view is being pointed
        const cameraView = this.getPointedViewport(this.mousePosition);
        if (cameraView != "none" && cameraView != "mini-map") { // One of the remaining cameras selected
            const cameraIndex = ["fixed", "first-person", "third-person", "top"].indexOf(cameraView);
            this.view.options.selectedIndex = cameraIndex;
            const activeViewCamera = [this.fixedViewCamera, this.firstPersonViewCamera, this.thirdPersonViewCamera, this.topViewCamera][cameraIndex];
            activeViewCamera.updateZoom(-0.001 * event.deltaY);
            this.setActiveViewCamera(activeViewCamera);
        }
    }

    contextMenu(event) {
        // Prevent the context menu from appearing when the secondary mouse button is clicked
        event.preventDefault();
    }

    elementChange(event) {
        switch (event.target.id) {
            case "view":
                this.setActiveViewCamera([this.fixedViewCamera, this.firstPersonViewCamera, this.thirdPersonViewCamera, this.topViewCamera][this.view.options.selectedIndex]);
                break;
            case "projection":
                this.activeViewCamera.setActiveProjection(["perspective", "orthographic"][this.projection.options.selectedIndex]);
                this.displayPanel();
                break;
            case "horizontal":
            case "vertical":
            case "distance":
            case "zoom":
                if (event.target.checkValidity()) {
                    switch (event.target.id) {
                        case "horizontal":
                        case "vertical":
                            this.activeViewCamera.setOrientation(new Orientation(this.horizontal.value, this.vertical.value));
                            break;
                        case "distance":
                            this.activeViewCamera.setDistance(this.distance.value);
                            break;
                        case "zoom":
                            this.activeViewCamera.setZoom(this.zoom.value);
                            break;
                    }
                }
                break;
            case "multiple-views":
                this.setViewMode(event.target.checked);
                break;
            case "user-interface":
                this.setUserInterfaceVisibility(event.target.checked);
                break;
            case "help":
                this.setHelpVisibility(event.target.checked);
                break;
            case "statistics":
                this.setStatisticsVisibility(event.target.checked);
                break;
        }
    }

    buttonClick(event) {
        switch (event.target.id) {
            case "reset":
                this.activeViewCamera.initialize();
                break;
            case "reset-all":
                this.fixedViewCamera.initialize();
                this.firstPersonViewCamera.initialize();
                this.thirdPersonViewCamera.initialize();
                this.topViewCamera.initialize();
                break;
        }
        this.displayPanel();
    }

    finalSequence() {
        // Disable the fog
        this.fog.enabled = false;
        // Reconfigure the third-person view camera
        this.thirdPersonViewCamera.setOrientation(new Orientation(180.0, this.thirdPersonViewCamera.initialOrientation.v));
        this.thirdPersonViewCamera.setDistance(this.thirdPersonViewCamera.initialDistance);
        this.thirdPersonViewCamera.setZoom(2.0);
        // Set it as the active view camera
        this.setActiveViewCamera(this.thirdPersonViewCamera);
        // Set single-view mode
        this.setViewMode(false);
        // Set the final action
        this.animations.fadeToAction("Dance", 0.2);
    }

    collision(position) {
        return this.maze.distanceToWestWall(position) < this.player.radius || this.maze.distanceToEastWall(position) < this.player.radius || this.maze.distanceToNorthWall(position) < this.player.radius || this.maze.distanceToSouthWall(position) < this.player.radius;
    }

    openDoor(position) {
        return this.maze.distanceToNearestDoor(position) < this.player.radius;
    }

    access(){
        return this.maze.distanceToAcess(this.player.position) < this.player.radius;
    }

    elevator(){
        return this.maze.distanceToElevator(this.player.position) < this.player.radius;
    }

    update() {
        if (!this.gameRunning) {
            if (this.maze.loaded && this.player.loaded) { // If all resources have been loaded
                // Add the maze, the player and the lights to the scene
                this.scene3D.add(this.maze.object);
                this.scene3D.add(this.player.object);
                this.scene3D.add(this.lights.object);

                // Create the clock
                this.clock = new THREE.Clock();

                // Create model animations (states, emotes and expressions)
                this.animations = new Animations(this.player.object, this.player.animations);

                this.scene2D.add(this.player);

                // Set the player's position and direction
                this.player.position = this.maze.initialPosition.clone();
                this.player.direction = this.maze.initialDirection;

                // Create the user interface
                this.userInterface = new UserInterface(this.scene3D, this.renderer, this.lights, this.fog, this.player.object, this.animations, this.maze);

                // Start the game
                this.gameRunning = true;
            }
        }
        else {
            // Update the model animations
            const deltaT = this.clock.getDelta();
            this.animations.update(deltaT);

            // Update the player
            if (!this.animations.actionInProgress) {
                // Check if the player found the exit
                if (this.maze.foundExit(this.player.position)) {
                    this.finalSequence();
                }
                else {
                    let coveredDistance = this.player.walkingSpeed * deltaT;
                    let directionIncrement = this.player.turningSpeed * deltaT;

                    if (this.player.shiftKey) {
                        coveredDistance *= this.player.runningFactor;
                        directionIncrement *= this.player.runningFactor;
                    }

                    if (this.player.keyStates.run) {
                        coveredDistance *= this.player.runningFactor;
                        directionIncrement *= this.player.runningFactor;
                    }
                    if (this.player.keyStates.left) {
                        this.player.direction += directionIncrement;
                    }
                    else if (this.player.keyStates.right) {
                        this.player.direction -= directionIncrement;
                    }
                    const direction = THREE.MathUtils.degToRad(this.player.direction);
                    if (this.player.keyStates.backward) {
                        const newPosition = new THREE.Vector3(-coveredDistance * Math.sin(direction), 0.0, -coveredDistance * Math.cos(direction)).add(this.player.position);

                        if(this.openDoor(newPosition)){
                            console.log("Door opened");
                            let closestDoor = this.maze.closestDoor(newPosition);
                            this.maze.openDoor(closestDoor);
                        }

                        if(this.access()){
                            console.log("Access to another floor");
                            let newJsonFile = "thum_raiser.js";
                            window.location.href = window.location.pathname + "?json=" + newJsonFile;
                        }

                        if (this.elevator()){
                            console.log("Elevator");

                        }

                        if (this.collision(newPosition)) {
                            this.animations.fadeToAction("Death", 0.2);
                        }
                        else {
                            this.animations.fadeToAction(this.player.keyStates.run ? "Running" : "Walking", 0.2);
                            this.player.position = newPosition;
                        }
                    }
                    else if (this.player.keyStates.forward) {
                        const newPosition = new THREE.Vector3(coveredDistance * Math.sin(direction), 0.0, coveredDistance * Math.cos(direction)).add(this.player.position);

                        if(this.openDoor(newPosition)){
                            console.log("Door opened");
                            let closestDoor = this.maze.closestDoor(newPosition);
                            this.maze.openDoor(closestDoor);
                        }

                        if (this.access()) {
                            const buildingElement = document.getElementById("building");
                            const floorElement = document.getElementById('floor');

                            if (!buildingElement || !floorElement) {
                                console.error("Os elementos de seleção de edifício e piso não estão presentes no DOM.");
                                return;
                            }

                            const buildingId = buildingElement.value;
                            const floorId = floorElement.value;

                            if (!buildingId || !floorId) {
                                alert("ERROR! This floor does not exist!");
                                return;
                            }

                            this.getBuildings().then(async buildings => {
                                const building = buildings.find(b => b.buildingId === buildingId);
                                if (!building) {
                                    console.error("Buildings not found");
                                    return;
                                }

                                const floor = building.floors.find(f => f.floorId === floorId);
                                if (!floor) {
                                    console.error("Floor not found");
                                    return;
                                }

                                const connection = floor.connections.find(c => c.floorfromId === floorId || c.floortoId === floorId);
                                if (connection) {
                                    let newFloorId = connection.floorfromId === floorId ? connection.floortoId : connection.floorfromId;
                                    let newBuildingId = connection.buildingfromId === buildingId ? connection.buildingtoId : connection.buildingfromId;

                                    await this.createJsonOnBackend(newFloorId)

                                    console.log("Connection found:", connection);
                                    console.log("New floor:", newFloorId);
                                    console.log("New building:", newBuildingId);
                                    //Old floor
                                    console.log("Old floor:", floorId);

                                    let url = `http://127.0.0.1:5500/Thumb_Raiser.html?buildingId=${encodeURIComponent(newBuildingId)}&floorId=${encodeURIComponent(newFloorId)}`;

                                    const response = await fetch(url);
                                    if (response.status === 200) {
                                        // If the status is 200, the file exists. Redirect to the new URL
                                        window.location.href = url;
                                    } else if (response.status === 404) {
                                        // If the status is 404, the file does not exist. Show an alert message
                                        alert("The selected building and floor do not exist");
                                    }

                                } else {
                                    console.error("No connection in this floor:", floorId);
                                }
                            }).catch(error => {
                                console.error("Error loading buildings:", error);
                            });


                        }

                        if (this.elevator()){

                            console.log("Elevator found");
                            window.postMessage({ type: "SHOW_MENU" }, "*");
                        }


                        if (this.collision(newPosition)) {
                            this.animations.fadeToAction("Death", 0.2);
                        }
                        else {
                            this.animations.fadeToAction(this.player.shiftKey ? "Running" : "Walking", 0.2);
                            this.player.position = newPosition;
                        }
                    }

                    else if (this.player.keyStates.jump) {
                        this.animations.fadeToAction("Jump", 0.2);
                    }
                    else if (this.player.keyStates.yes) {
                        this.animations.fadeToAction("Yes", 0.2);
                    }
                    else if (this.player.keyStates.no) {
                        this.animations.fadeToAction("No", 0.2);
                    }
                    else if (this.player.keyStates.wave) {
                        this.animations.fadeToAction("Wave", 0.2);
                    }
                    else if (this.player.keyStates.punch) {
                        this.animations.fadeToAction("Punch", 0.2);
                    }
                    else if (this.player.keyStates.thumbsUp) {
                        this.animations.fadeToAction("ThumbsUp", 0.2);
                    }
                    else {
                        this.animations.fadeToAction("Idle", this.animations.activeName != "Death" ? 0.2 : 0.6);
                    }
                    this.player.object.position.set(this.player.position.x, this.player.position.y, this.player.position.z);
                    this.player.object.rotation.y = direction - this.player.initialDirection;
                }
            }

            // Update first-person, third-person and top view cameras parameters (player direction and target)
            this.firstPersonViewCamera.playerDirection = this.player.direction;
            this.thirdPersonViewCamera.playerDirection = this.player.direction;
            this.topViewCamera.playerDirection = this.player.direction;
            const target = new THREE.Vector3(this.player.position.x, this.player.position.y + this.player.eyeHeight, this.player.position.z);
            this.firstPersonViewCamera.setTarget(target);
            this.thirdPersonViewCamera.setTarget(target);
            this.topViewCamera.setTarget(target);

            // Update statistics
            this.statistics.update();

            // Render primary viewport(s)
            this.renderer.clear();

            if (this.fog.enabled) {
                this.scene3D.fog = this.fog.object;
            }
            else {
                this.scene3D.fog = null;
            }
            let cameras;
            if (this.multipleViewsCheckBox.checked) {
                cameras = [this.fixedViewCamera, this.firstPersonViewCamera, this.thirdPersonViewCamera, this.topViewCamera];
            }
            else {
                cameras = [this.activeViewCamera];
            }
            for (const camera of cameras) {
                this.player.object.visible = (camera != this.firstPersonViewCamera);
                const viewport = camera.getViewport();
                this.renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
                this.renderer.render(this.scene3D, camera.object);
                this.renderer.render(this.scene2D, this.camera2D);
                this.renderer.clearDepth();
            }

            // Render secondary viewport (mini-map)
            if (this.miniMapCheckBox.checked) {
                this.scene3D.fog = null;
                this.player.object.visible = true;
                const viewport = this.miniMapCamera.getViewport();
                this.renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
                this.renderer.render(this.scene3D, this.miniMapCamera.object);
                this.renderer.render(this.scene2D, this.camera2D);
            }
        }
    }

    getBuildings() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:4000/api/3d/buildings', true);

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject("Error: " + xhr.statusText);
                }
            };

            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }


    createJsonOnBackend(floorId) {
        return new Promise((resolve, reject) => {
            console.log('floorId:', floorId);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:4000/api/3d/json/' + floorId);
            xhr.onload = () => {
                console.log(xhr.responseText);
                resolve(JSON.parse(xhr.responseText));
            };
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }


    async moveRobot(oldBuildingId,oldFloorId, allBuildings) {
        console.log('All Buildings:', allBuildings);

        const newBuildingId = document.getElementById("building").value;
        const newFloorId = document.getElementById("floor").value;

        console.log('Old Building:', oldBuildingId);
        console.log('Old Floor:', oldFloorId);

        console.log('New Building:', newBuildingId);
        console.log('New Floor:', newFloorId);

        let stringResult = this.canTravel(allBuildings, oldBuildingId, oldFloorId, newFloorId)

        //if (stringResult === 'elevator' || stringResult === 'connection') {
            console.log('Possible');

            const floorJson = this.getJsonFromBackend(oldFloorId)
              .then(async data => {
                  const mapGrid = data.map;
                  let doors = data.doors;
                  const elevators = data.elevators;
                  const connections = data.accesses;
                  const initialPosition = data.initialPosition;

                  console.log("MapGrid:", mapGrid);
                  console.log("Doors:", doors);
                  console.log("Elevators:", elevators);
                  console.log("Connections:", connections);
                  console.log("Initial Position:", initialPosition);

                  let goals;

                  // Loop buildings and find the floor with the same id as the one we want to go to
                  const building = allBuildings.find(building => building.buildingId === oldBuildingId);
                  const floor = building.floors.find(floor => floor.floorId === oldFloorId);

                  // If we want to change floors
                  if (oldBuildingId === newBuildingId) {
                      /// Get the elevator of the floor
                      const floorElevators = floor.elevators;
                      console.log("Floor Elevators:", floorElevators);

                      // Get the elevator that connects the floors
                      const elevator = floorElevators.find(elevator => elevator.floorsAttended.includes(oldFloorId) && elevator.floorsAttended.includes(newFloorId));

                      const positionGoalX = elevator.locationX;
                      const positionGoalY = elevator.locationY;

                      let initialPos = initialPosition;

                      // Print mapGrid
                      console.log('MapGrid:', mapGrid);

                      let playerPosition = this.player.position; // Get the player's position
                      let playerCellPosition = this.maze.cartesianToCell(playerPosition); // Convert the player's position to cell coordinates

                      console.log('Player cell position:', playerCellPosition);


                      // I want to create an array with the path to the goal, we need to read the mapGrid and find the path, we can only move where there is a 0

                      goals = [positionGoalX, positionGoalY];

                      // print goals
                      console.log('Goals:', goals);

                      let path = this.findPath(mapGrid, playerCellPosition, goals);
                      console.log('Path:', path);

                      if (path != null) {
                          // Move the robot along the path
                          await this.moveRobotAlongPath(path);

                          // PRINT TEST
                          console.log("TEST1");

                          // Teleport the robot to the other floor
                          await this.createJsonOnBackend(newFloorId);

                          console.log("TEST2");

                          let url = `http://127.0.0.1:5500/Thumb_Raiser.html?buildingId=${encodeURIComponent(newBuildingId)}&floorId=${encodeURIComponent(newFloorId)}`;
                          const response = await fetch(url);
                          if (response.status === 200) {
                              // If the status is 200, the file exists. Redirect to the new URL
                              window.location.href = url;
                          } else if (response.status === 404) {
                              // If the status is 404, the file does not exist. Show an alert message
                              alert("The selected building and floor do not exist");
                          }


                      }
                  }

                  // If stringResult is connection, we need to find the connection that connects the floors
                  if (oldBuildingId !== newBuildingId && oldFloorId !== newFloorId) {

                      const floorConnections = floor.connections;
                      console.log("Floor Connections:", floorConnections);

                      // Get the connection that connects the floors
                      const connection = floorConnections.find(connection => connection.floorfromId === oldFloorId && connection.floortoId === newFloorId ||
                        connection.floorfromId === newFloorId && connection.floortoId === oldFloorId);

                      const positionGoalX = connection.locationX;
                      const positionGoalY = connection.locationY;

                      goals = [positionGoalX, positionGoalY];

                      // Print mapGrid
                      console.log('MapGrid:', mapGrid);

                      let initialPos = initialPosition;


                      let playerPosition = this.player.position; // Get the player's position
                      let playerCellPosition = this.maze.cartesianToCell(playerPosition); // Convert the player's position to cell coordinates

                      console.log('Player cell position:', playerCellPosition);


                      console.log('Goals:', goals);
                      // I want to create an array with the path to the goal, we need to read the mapGrid and find the path, we can only move where there is a 0

                      let path = this.findPath(mapGrid, playerCellPosition, goals);
                      console.log('Path:', path);

                      // Move the robot along the path
                      if (path != null) {
                          // Move the robot along the path
                          await this.moveRobotAlongPath(path);

                          // PRINT TEST
                          console.log("TEST1");

                          // Teleport the robot to the other floor
                          await this.createJsonOnBackend(newFloorId);

                          console.log("TEST2");

                          let url = `http://127.0.0.1:5500/Thumb_Raiser.html?buildingId=${encodeURIComponent(newBuildingId)}&floorId=${encodeURIComponent(newFloorId)}`;
                          const response = await fetch(url);
                          if (response.status === 200) {
                              // If the status is 200, the file exists. Redirect to the new URL
                              window.location.href = url;
                          } else if (response.status === 404) {
                              // If the status is 404, the file does not exist. Show an alert message
                              alert("The selected building and floor do not exist");
                          }
                      }
                  }


              })
              .catch(e => {
                  console.log('There was a problem with the fetch operation: ' + e.message);
              });

        /*}
        else {
            console.log('Not possible');
        }*/
    }

    async createJsonOnBackend(floorId) {
        return new Promise((resolve, reject) => {
            console.log('floorId:', floorId);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:4000/api/3d/json/' + floorId);
            xhr.onload = () => {
                console.log(xhr.responseText);
                resolve(JSON.parse(xhr.responseText));
            };
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }

    findPath(mapGrid, start, goal) {
        let queue = [];
        let visited = {};

        // Start node
        queue.push({ position: start, path: [start] });

        while (queue.length > 0) {
            let node = queue.shift();
            let position = node.position;

            // If this position is the goal, return the path that led to it
            if (position[0] === goal[0] && position[1] === goal[1]) {
                return node.path;
            }

            // Get the valid neighbors of the current position
            let neighbors = [[position[0], position[1] - 1], [position[0] + 1, position[1]], [position[0], position[1] + 1], [position[0] - 1, position[1]]]; // Up, right, down, left

            for (let neighbor of neighbors) {
                // Check if the neighbor is valid and if it has not been visited yet
                if (neighbor[0] >= 0 && neighbor[0] < mapGrid.length && neighbor[1] >= 0 && neighbor[1] < mapGrid[0].length && mapGrid[neighbor[0]][neighbor[1]] === 0 && !visited[neighbor.toString()]) {
                    // Add the neighbor to the visited set
                    visited[neighbor.toString()] = true;

                    // Add the path to this neighbor to the queue
                    queue.push({ position: neighbor, path: [...node.path, neighbor] });
                }
            }
        }

        // No path found
        return null;
    }






     getJsonFromBackend(floorId) {
        return fetch('http://localhost:4000/api/3d/json/' + floorId)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
          })
          .then(json => {
              console.log(json);
              return json;
          })
          .catch(e => {
              console.log('There was a problem with the fetch operation: ' + e.message);
          });
    }

     canTravel(allBuildings, originalBuildingId, originalFloorId, destinationFloorId) {
        // Find the original and destination buildings
        const originalBuilding = allBuildings.find(building => building.buildingId === originalBuildingId);
        const destinationBuilding = allBuildings.find(building => building.floors.some(floor => floor.floorId === destinationFloorId));

        // If the buildings are the same
        if (originalBuildingId === destinationBuilding.buildingId) {
            // Find the elevator that connects the original and destination floors
            const elevator = originalBuilding.floors
              .flatMap(floor => floor.elevators)
              .find(elevator => elevator.floorsAttended.includes(originalFloorId) && elevator.floorsAttended.includes(destinationFloorId));

            // If the elevator exists, return true
            if (elevator) {
                return 'elevator';
            }
        } else {
            // If the buildings are different, find the connection between the buildings
            const connection = originalBuilding.floors
              .flatMap(floor => floor.connections)
              .find(connection => connection.buildingtoId === destinationBuilding.buildingId);

            // If the connection exists
            if (connection) {

                return 'connection';
            }
        }

        // If no path was found, return false
        return 'false';
    }

    async moveRobotAlongPath(path) {
        // Print path
        console.log('Path:', path);
        for (let i = 0; i < path.length; i++) {
            const y = path[i][0];
            const x = path[i][1];
            console.log('Moving to cell', x, y);
            await this.autoMoveToCell(x, y);
        }
    }
     async autoMoveToCell(targetX, targetY) {
        //targetY = targetY -1;
        //targetX = targetX -1;
        const position = [targetY, targetX];
        const targetPosition =  this.maze.cellToCartesian(position);
        const targetDistance = 0.1; // Adjust this value as needed

        return new Promise(resolve => {
            const movePlayer = () => {
                const deltaT = this.clock.getDelta();
                const direction = targetPosition.clone().sub(this.player.position).normalize();
                const coveredDistance = this.player.walkingSpeed * deltaT;
                const newPosition = direction.clone().multiplyScalar(coveredDistance).add(this.player.position);

                // Check for collisions and update the player's position
                if (!this.collision(newPosition)) {
                    this.player.position = newPosition;
                }

                // Update player's direction based on the target position
                this.player.direction = Math.atan2(direction.x, direction.z) * THREE.MathUtils.RAD2DEG;

                // Update animations
                const animationName = this.player.keyStates.run ? "Running" : "Walking";
                this.animations.fadeToAction("Walking", 0.2);

                // Update first-person, third-person, and top view cameras parameters
                this.firstPersonViewCamera.playerDirection = this.player.direction;
                this.thirdPersonViewCamera.playerDirection = this.player.direction;
                this.topViewCamera.playerDirection = this.player.direction;
                const cameraTarget = new THREE.Vector3(targetPosition.x, targetPosition.y + this.player.eyeHeight, targetPosition.z);
                this.firstPersonViewCamera.setTarget(cameraTarget);
                this.thirdPersonViewCamera.setTarget(cameraTarget);
                this.topViewCamera.setTarget(cameraTarget);

                // Check if the player has reached the target cell
                if (this.player.position.distanceTo(targetPosition) > targetDistance) {
                    requestAnimationFrame(movePlayer);
                } else {
                    console.log("Player reached the target cell!");
                    resolve();
                }
            };

            // Start the animation loop
            movePlayer();
        });
    }


}

