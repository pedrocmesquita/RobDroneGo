

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
            option.text = building.buildingName;
            option.selected = building.buildingId === selectedBuilding;
            buildingSelect.appendChild(option);
        });

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
        });

        // Create a button that calls the goToBuilding function when clicked
        const goButton = document.createElement('button');
        goButton.innerText = 'Go';
        goButton.addEventListener('click', goToBuilding);

        // Append the button to the building-container div
        const container = document.getElementById('building-container');
        container.appendChild(goButton);

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

    let url = `http://127.0.0.1:5500/Thumb_Raiser.html`;

    const response = await fetch(url);
    if (response.status === 200) {
        // If the status is 200, the file exists. Redirect to the new URL
        window.location.href = url;
    } else if (response.status === 404) {
        // If the status is 404, the file does not exist. Show an alert message
        alert("The selected building and floor do not exist");
    }
}
