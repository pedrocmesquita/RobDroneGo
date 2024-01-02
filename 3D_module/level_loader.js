

let roomsN = [];
let connectionsN = [];
let elevatorsN = [];


function getBuildingsFromBackend() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:4000/api/3d/buildings');
        xhr.onload = () => resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        console.log(xhr.responseText);
        xhr.send();
    });
}

function createJsonOnBackend(floorId) {
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


async function displaySelectors(selectedBuilding, selectedFloor) {
    try {
        // Get the buildings from the backend
        console.log('Getting buildings from backend...')
        const buildings = await getBuildingsFromBackend();
        console.log('Buildings:', buildings);

        const buildingSelect = document.getElementById('building');
        buildingSelect.innerHTML = '';
        buildings.forEach(building => {
            const option = document.createElement('option');
            option.value = building.buildingId;
            option.text = building.buildingId + ': ' + building.buildingName;
            option.selected = building.buildingId === selectedBuilding;
            buildingSelect.appendChild(option);
        });

        let currentFloor = selectedFloor;

        buildingSelect.addEventListener('change', async () => {
            const selectedBuildingId = buildingSelect.value;
            const selectedBuilding = buildings.find(building => building.buildingId === selectedBuildingId);
            const floors = selectedBuilding.floors;
            console.log('Floors:', floors);

            const floorSelect = document.getElementById('floor');
            floorSelect.innerHTML = '';
            floors.forEach(floor => {
                const option = document.createElement('option');
                option.value = floor.floorId;
                option.text = `Floor ${floor.floorNumber}: ${floor.floorDescription}`;
                option.selected = floor.floorId === selectedFloor;
                floorSelect.appendChild(option);
            });

            currentFloor = floorSelect.value;
        });

        // Create a button that calls the goToBuilding function when clicked
        const goButton = document.createElement('button');
        goButton.innerText = 'Go';
        goButton.addEventListener('click', goToBuilding);


        // Create a home button that redirects to the home page
        const homeButton = document.createElement('button');
        homeButton.innerText = 'Home';
        homeButton.addEventListener('click', () => {
            window.open('http://localhost:4200/home', '_blank');
        });
        // Append the button to the building-container div
        const container = document.getElementById('building-container');
        container.appendChild(goButton);
        container.appendChild(homeButton);

        // Trigger the change event to populate the floor select element
        buildingSelect.dispatchEvent(new Event('change'));
    } catch (error) {
        console.error('Error displaying selectors:', error);
    }
}

async function goToBuilding() {
    const buildingId = document.getElementById("building").value;
    const floorId = document.getElementById('floor').value;


    if (!buildingId || !floorId) {
        alert("Select a valid building and floor option");
        return;
    }

    console.log('FloorId:', floorId);

    await createJsonOnBackend(floorId);

    //let url = `http://127.0.0.1:5500/Thumb_Raiser.html`;
    let url = `http://127.0.0.1:5500/Thumb_Raiser.html?buildingId=${encodeURIComponent(buildingId)}&floorId=${encodeURIComponent(floorId)}`;

    const response = await fetch(url);
    if (response.status === 200) {
        // If the status is 200, the file exists. Redirect to the new URL
        window.location.href = url;
    } else if (response.status === 404) {
        // If the status is 404, the file does not exist. Show an alert message
        alert("The selected building and floor do not exist");
    }
}

async function elevatorMenu(selectedBuilding, selectedFloor){
    const buildingId = selectedBuilding;
    const floorId = selectedFloor;
    console.log('FloorId:', floorId);

    const buildings = await getBuildingsFromBackend();

    // Compare buildingId and floorId to the buildings array
    const building = buildings.find(building => building.buildingId === buildingId);

    // Loop through the floors array
    const floors = building.floors;
    const floor = floors.find(floor => floor.floorId === floorId);

    // Loop through the elevators array
    const elevators = floor.elevators;
    console.log('Elevators:', elevators);

    // Create a select element for the floors
    const elevatorSelect = document.createElement('select');
    elevatorSelect.id = 'elevator';
    floors.forEach(floor => {
        const option = document.createElement('option');
        option.value = floor.floorId;
        option.text = `Floor ${floor.floorNumber}: ${floor.floorDescription}`;
        elevatorSelect.appendChild(option);
    });

    // Create a button that calls the goToElevator function when clicked
    const goButton = document.createElement('button');
    goButton.innerText = 'Go';
    goButton.addEventListener('click', goToElevator);

    // Append the select element and the button to the elevator-container
    const container = document.getElementById('elevator-container');
    container.innerHTML = ''; // Clear the container
    container.appendChild(elevatorSelect);
    container.appendChild(goButton);
}


async function moveRobot() {
    const urlParams = new URLSearchParams(window.location.search);
    const buildingId = urlParams.get('buildingId');
    const floorId = urlParams.get('floorId');

    const buildings = await getBuildingsFromBackend();
    const building = buildings.find(building => building.buildingId === buildingId);
    const floors = building.floors;
    const currentFloor = floors.find(floor => floor.floorId === floorId);

    showSelector(floors, currentFloor);
}

function showSelector(floors, currentFloor) {
    const floorSelect = document.createElement('select');
    floorSelect.id = 'floorSelector';
    floors.forEach(floor => {
        if (floor.floorId !== currentFloor.floorId) {
            const option = document.createElement('option');
            option.value = floor.floorId;
            option.text = `Floor ${floor.floorNumber}: ${floor.floorDescription}`;
            floorSelect.appendChild(option);
        }
    });

    const moveButton = document.createElement('button');
    moveButton.innerText = 'Move';
    moveButton.addEventListener('click', function() {
        goToFloor(floorSelect.value);
    });

    const container = document.getElementById('moveRobotButton');
    container.innerHTML = '';
    container.appendChild(floorSelect);
    container.appendChild(moveButton);
}

async function goToFloor(floorToId) {
    const urlParams = new URLSearchParams(window.location.search);
    const buildingFromId = urlParams.get('buildingId');
    const floorFromId = urlParams.get('floorId');

    let obstacleCoordinates = await requestData(buildingFromId, floorFromId);
    //let obstacles = parseObstacleData(obstacleCoordinates);
    console.log("VAMOSSSSSSS: ", obstacleCoordinates)


    console.log('Este é o piso de destino:', floorToId);
}

async function requestData(buildingId, floorId) {
    const url = 'http://localhost:4000/api/buildings/';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg4NjFhNGI0LTU4ZDktNGE4ZC1hZGU0LTAyNzgzZGU4YmVlYyIsImVtYWlsIjoibWNAZ21haWwuY29tIiwicm9sZSI6IjRlZThkYjQ0LWRmZGUtNDcxMi1hZjQ0LTkzMjE0M2JiNzk5NCIsImZpcnN0TmFtZSI6Ik1hcnRhIiwibGFzdE5hbWUiOiJDYW1wb3MiLCJleHAiOjE3MDg5ODY3NjYuODEyLCJpYXQiOjE3MDM4MDI3NjZ9.5BYoDCPWivsxc6vnMG0yJtSg4CyoAusMEf3QG790v_E';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const jsonData = await response.json();
        return processMazeData(jsonData, buildingId, floorId); // Return the processed data
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null in case of an error
    }
}



function processMazeData(jsonData, buildingId, floorId) {
    const building = jsonData.find(b => b.buildingId === buildingId);
    if (!building) {
        console.error(`Building with ID ${buildingId} not found.`);
        return [];
    }

    const floor = building.floors.find(f => f.floorId === floorId);
    if (!floor) {
        console.error(`Floor with ID ${floorId} not found in building ${buildingId}.`);
        return [];
    }

    let combinedData = [];

    // Combine rooms data
    floor.rooms.forEach(room => {
        combinedData.push({ x: room.originCoordinateX, y: room.originCoordinateY });
        combinedData.push({ x: room.destinationCoordinateX, y: room.destinationCoordinateY });
    });

    // Combine connections data
    floor.connections.forEach(connection => {
        combinedData.push({ x: connection.locationX, y: connection.locationY });
    });

    // Combine elevators data
    floor.elevators.forEach(elevator => {
        combinedData.push({ x: elevator.locationX, y: elevator.locationY });
    });

    return combinedData;
}



async function goToElevator() {
    const buildingId = document.getElementById("building").value;
    const floorId = document.getElementById('elevator').value; // Changed from 'elevator' to 'floor'

    if (!buildingId || !floorId) {
        alert("Select a valid building and floor option");
        return;
    }

    console.log('FloorId:', floorId);

    await createJsonOnBackend(floorId);

    let url = `http://127.0.0.1:5500/Thumb_Raiser.html?buildingId=${encodeURIComponent(buildingId)}&floorId=${encodeURIComponent(floorId)}`;
    const response = await fetch(url);
    if (response.status === 200) {
        // If the status is 200, the file exists. Redirect to the new URL
        window.location.href = url;
    } else if (response.status === 404) {
        // If the status is 404, the file does not exist. Show an alert message
        alert("The selected building and floor do not exist");
    }
}

