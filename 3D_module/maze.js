import * as THREE from "three";
import Ground from "./ground.js";
import Wall from "./wall.js";
import Door from "./door.js";
import Elevator from "./elevator.js";
import Access from "./access.js";
import * as TWEEN from "three/addons/libs/tween.module.js";

/*
 * parameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 */

export default class Maze {
    
    constructor(parameters) {
        this.onLoad = function (description) {
            // Store the maze's map and size
            this.map = description.map;
            this.size = description.size;

            //this.loadMazeData('http://localhost:4000/api/buildings/');
            this.floorData = null;

            this.roomsN = [];
            this.connectionsN = [];
            this.elevatorsN = [];

            // Create an array to store the doors
            this.doors = [];

            // Create an array to store the accesses
            this.accesses = [];

            // Create an array to store the elevators
            this.elevators = [];

            // Store the player's initial position and direction
            this.initialPosition = this.cellToCartesian(description.initialPosition);
            this.initialDirection = description.initialDirection;

            // Store the maze's exit location
            this.exitLocation = this.cellToCartesian(description.exitLocation);

            // Create a group of objects
            this.object = new THREE.Group();

            // Create the ground
            this.ground = new Ground({ textureUrl: description.groundTextureUrl, size: description.size });
            this.object.add(this.ground.object);

            // Create a wall
            this.wall = new Wall({ textureUrl: description.wallTextureUrl });

            // Create a door
            //this.door = new Door({ textureUrl: description.doorTextureUrl });
            this.door = new Door({ textureUrl: description.doorTextureUrl, scale: new THREE.Vector3(1, 1, 1) });

            // Create a elevator
            this.elevator = new Elevator({ textureUrl: description.elevatorTextureUrl});

            // Create an access point
            this.access = new Access({ textureUrl: description.doorTextureUrl});

            // Build the maze
            let wallObject;
            let doorObject;
            let elevatorObject;
            for (let i = 0; i <= description.size.width; i++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
                for (let j = 0; j <= description.size.height; j++) { // In order to represent the southmost walls, the map height is one row greater than the actual maze height
                    /*
                     * description.map[][] | North wall | West wall
                     * --------------------+------------+-----------
                     *          0          |     No     |     No
                     *          1          |     No     |    Yes
                     *          2          |    Yes     |     No
                     *          3          |    Yes     |    Yes
                     */
                    if (description.map[j][i] == 2 || description.map[j][i] == 3) {
                        wallObject = this.wall.object.clone();
                        wallObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(wallObject);
                    }
                    if (description.map[j][i] == 1 || description.map[j][i] == 3) {
                        wallObject = this.wall.object.clone();
                        wallObject.rotateY(Math.PI / 2.0);
                        wallObject.position.set(i - description.size.width / 2.0, 0.5, j - description.size.height / 2.0 + 0.5);
                        this.object.add(wallObject);
                    }
                }
            }

            
            //adicionar portas
            //1: horizontal
            //2: vertical
            for(let i = 0; i < description.doors.length; i++){
                doorObject = this.door.object.clone();
                //const tween = new TWEEN.Tween(this.door.rotation);
                let doorCoordinates = description.doors[i];
                let x = doorCoordinates[0];
                let y = doorCoordinates[1];
                let orientation = doorCoordinates[2];
                console.log(orientation);
                if(orientation == 2){
                    doorObject.rotateY(Math.PI / 2.0);
                    doorObject.position.set(y - description.size.width / 2.0  , 0.5,x - description.size.height / 2.0 + 0.5);
                    this.object.add(doorObject);
                    this.doors.push(doorObject);
                }else{
                    doorObject.position.set(y - description.size.width / 2.0 + 0.5 , 0.5,x - description.size.height / 2.0);
                    console.log(doorObject);
                    this.object.add(doorObject);
                    this.doors.push(doorObject);
                }
            }

            // adicionar elevadores
            //1: horizontal
            //2: vertical
            for(let i = 0; i < description.elevators.length; i++){
                const elevator1 = new Elevator({ textureUrl: description.elevatorTextureUrl, scale: new THREE.Vector3(1, 1, 1) });
                elevatorObject = elevator1.object;
                let elevatorCoordinates = description.elevators[i];
                let x = elevatorCoordinates[0];
                let y = elevatorCoordinates[1];
                let orientation = elevatorCoordinates[2];

                if(orientation == 2){
                    elevatorObject.rotateY(Math.PI / 2.0);
                    elevatorObject.position.set(y - description.size.width / 2.0  , 0.5,x - description.size.height / 2.0 + 0.5);
                    this.object.add(elevatorObject);
                    this.elevators.push(elevator1);
                }else{
                    elevatorObject.position.set(y - description.size.width / 2.0 + 0.5 , 0.5,x - description.size.height / 2.0);
                    this.object.add(elevatorObject);
                    this.elevators.push(elevator1);
                }
            }


            //adicionar acessos
            for(let i = 0; i < description.accesses.length; i++){
                let accessCoordinates = description.accesses[i];
                let x = accessCoordinates[0];
                console.log(x);
                let y = accessCoordinates[1];
                console.log(y);
                let orientation = accessCoordinates[2];
                let accessObject = this.access.object.clone();
                if(orientation == 2){
                    accessObject.rotateY(Math.PI / 2.0);
                    accessObject.position.set(y - description.size.width / 2.0  , 0.5,x - description.size.height / 2.0 + 0.5);
                    this.object.add(accessObject);
                    this.accesses.push(accessObject);
                }else{
                    accessObject.position.set(y - description.size.width / 2.0 + 0.5 , 0.5,x - description.size.height / 2.0);
                    this.object.add(accessObject);
                    this.accesses.push(accessObject);
                }
            }
                

            this.object.scale.set(this.scale.x, this.scale.y, this.scale.z);
            this.loaded = true;
        }

        this.onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
        }

        this.onError = function (url, error) {
            console.error("Error loading resource " + url + " (" + error + ").");
        }

        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }
        this.loaded = false;

        // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
        THREE.Cache.enabled = true;

        // Create a resource file loader
        const loader = new THREE.FileLoader();

        // Set the response type: the resource file will be parsed with JSON.parse()
        loader.setResponseType("json");

        // Load a maze description resource file
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            description => this.onLoad(description),

            // onProgress callback
            xhr => this.onProgress(this.url, xhr),

            // onError callback
            error => this.onError(this.url, error)
        );
    }

    // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
    cellToCartesian(position) {
        return new THREE.Vector3((position[1] - this.size.width / 2.0 + 0.5) * this.scale.x, 0.0, (position[0] - this.size.height / 2.0 + 0.5) * this.scale.z)
    }

    // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
    cartesianToCell(position) {
        return [Math.floor(position.z / this.scale.z + this.size.height / 2.0), Math.floor(position.x / this.scale.x + this.size.width / 2.0)];
    }

    distanceToWestWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToEastWall(position) {
        const indices = this.cartesianToCell(position);
        indices[1]++;
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3) {
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }
        return Infinity;
    }

    distanceToNorthWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    distanceToSouthWall(position) {
        const indices = this.cartesianToCell(position);
        indices[0]++;
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }
        return Infinity;
    }

    foundExit(position) {
        return Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x && Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z
    };

    closestDoor(position) {
        let closestDoor = null;
        let closestDistance = Infinity;
        for (let door of this.doors) {
            let doorPosition = door.position;
            let dx = position.x - doorPosition.x;
            let dz = position.z - doorPosition.z;
            let distance = Math.sqrt(dx * dx + dz * dz);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestDoor = door;
            }
        }
        return closestDoor;
    }
    
    distanceToNearestDoor(position) {
        let closestDistance = Infinity;
        for (let door of this.doors) {
            let doorPosition = door.position;
            let dx = position.x - doorPosition.x;
            let dz = position.z - doorPosition.z;
            let distance = Math.sqrt(dx * dx + dz * dz);
            if (distance < closestDistance) {
                closestDistance = distance;
            }
        }
        return closestDistance;
    }

    distanceToAcess(position) {
        let closestDistance = Infinity;
        for (let access of this.accesses) {
            let accessPosition = access.position;
            let dx = position.x - accessPosition.x;
            let dz = position.z - accessPosition.z;
            let distance = Math.sqrt(dx * dx + dz * dz);
            if (distance < closestDistance) {
                closestDistance = distance;
            }
        }
        return closestDistance;
    }

    distanceToElevator(position) {
        let closestDistance = Infinity;
        for (let elevator of this.elevators) {
            let elevatorPosition = elevator.object.position;
            let dx = position.x - elevatorPosition.x;
            let dz = position.z - elevatorPosition.z;
            let distance = Math.sqrt(dx * dx + dz * dz);
            if (distance < closestDistance) {
                closestDistance = distance;
            }
        }
        return closestDistance;
    }


    openDoor(doorObject) {
        if(doorObject.rotation.y == 0){
            if(doorObject.isOpen == false){
                doorObject.rotation.y += Math.PI / 2;
                doorObject.position.x += 0.5;
                doorObject.position.z -= 0.5;
                doorObject.isOpen = true;
                console.log("1");
            } else {
                doorObject.rotation.y += Math.PI / 2;
                doorObject.position.x += 0.5;
                doorObject.position.z -= 0.5;
                doorObject.isOpen = false;
                console.log("2");
            }
        } else if(doorObject.rotation.y == Math.PI / 2){
            if(doorObject.isOpen == false){
                doorObject.rotation.y += Math.PI / 2;
                doorObject.position.x += 0.5;
                doorObject.position.z += 0.5;
                doorObject.isOpen = true;
                console.log("3");
            } else {
                doorObject.rotation.y -= Math.PI / 2;
                doorObject.position.x -= 0.5;
                doorObject.position.z += 0.5;
                doorObject.isOpen = false;
                console.log("4");
            }
        } else if(doorObject.rotation.y == Math.PI){
            if(doorObject.isOpen == false){
                doorObject.rotation.y -= Math.PI / 2;
                doorObject.position.x -= 0.5;
                doorObject.position.z += 0.5;
                doorObject.isOpen = true;
                console.log("5");
            } else {
                doorObject.rotation.y -= Math.PI / 2;
                doorObject.position.x -= 0.5;
                doorObject.position.z -= 0.5;
                doorObject.isOpen = false;
                console.log("6");
            }
        } else if(doorObject.rotation.y == 3 * Math.PI / 2){
            if(doorObject.isOpen == false){
                doorObject.rotation.y += Math.PI / 2;
                doorObject.position.x -= 0.5;
                doorObject.position.z -= 0.5;
                doorObject.isOpen = true;
                console.log("7");
            } else {
                doorObject.rotation.y -= Math.PI / 2;
                doorObject.position.x += 0.5;
                doorObject.position.z -= 0.5;
                doorObject.isOpen = false;
                console.log("8");
            }
        }
    }

    async requestData(buildingId, floorId) {
        const url = 'http://localhost:4000/api/3d/buildings';
        //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg4NjFhNGI0LTU4ZDktNGE4ZC1hZGU0LTAyNzgzZGU4YmVlYyIsImVtYWlsIjoibWNAZ21haWwuY29tIiwicm9sZSI6IjRlZThkYjQ0LWRmZGUtNDcxMi1hZjQ0LTkzMjE0M2JiNzk5NCIsImZpcnN0TmFtZSI6Ik1hcnRhIiwibGFzdE5hbWUiOiJDYW1wb3MiLCJleHAiOjE3MDg5ODY3NjYuODEyLCJpYXQiOjE3MDM4MDI3NjZ9.5BYoDCPWivsxc6vnMG0yJtSg4CyoAusMEf3QG790v_E';

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${token}`
                }
            });
            const jsonData = await response.json();
            this.processMazeData(jsonData, buildingId, floorId);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    processMazeData(jsonData, buildingId, floorId) {
        const building = jsonData.find(b => b.buildingId === buildingId);
        if (!building) {
            console.error(`Building with ID ${buildingId} not found.`);
            return;
        }

        const floor = building.floors.find(f => f.floorId === floorId);
        if (!floor) {
            console.error(`Floor with ID ${floorId} not found in building ${buildingId}.`);
            return;
        }

        this.roomsN = floor.rooms.map(room => ({
            roomName: room.roomName,
            originCoordinateX: room.originCoordinateX,
            originCoordinateY: room.originCoordinateY,
            destinationCoordinateX: room.destinationCoordinateX,
            destinationCoordinateY: room.destinationCoordinateY
        }));

        this.connectionsN = floor.connections.map(connection => ({
            connectionId: connection.connectionId,
            locationX: connection.locationX,
            locationY: connection.locationY,
            locationToX: connection.locationToX,
            locationToY: connection.locationToY
        }));

        this.elevatorsN = floor.elevators.map(elevator => ({
            elevatorId: elevator.elevatorId,
            locationX: elevator.locationX,
            locationY: elevator.locationY
        }));
    }

    sizeToAdd(){
        return this.size;
    }

    whatRoom(position) {
        console.log("Checking position:", position);


        if (this.roomsN && this.roomsN.length > 0) {
            for (const room of this.roomsN) {
                //console.log("Checking room:", room);

                if (position.x >= room.originCoordinateX &&
                    position.x <= room.destinationCoordinateX &&
                    position.z >= room.originCoordinateY &&
                    position.z <= room.destinationCoordinateY) {
                    console.log(`Found Room: ${room.roomName}`);
                    return `Room: ${room.roomName}`;
                }
            }
        } else {
            console.log("No rooms data available.");
        }

        if (this.connectionsN && this.connectionsN.length > 0) {
            for (const connection of this.connectionsN) {
                if (position.z >= connection.locationX &&
                    position.z <= connection.locationToX &&
                    position.x >= connection.locationY &&
                    position.z <= connection.locationToY) {
                    //console.log(`Found Connection: ${connection.connectionId}`);
                    return `Connection: ${connection.connectionId}`;
                }
            }
            console.log("No connection found for the given position.");
        }



        if (this.elevatorsN && this.elevatorsN.length > 0) {
            for (const elevator of this.elevatorsN) {
                if (position.z >= elevator.locationX &&
                    position.z <= elevator.locationX + 1 &&
                    position.x >= elevator.locationY &&
                    position.x <= elevator.locationY + 1) {
                    return `Elevator: ${elevator.elevatorId}`;
                }
            }
        }

        const urlParams = new URLSearchParams(window.location.search);
        const buildingName = urlParams.get('buildingId');
        console.log("Only building found:", buildingName);
        return `Building: ${buildingName}`;
    }


    getObstacleCoordinates() {

    }





}
