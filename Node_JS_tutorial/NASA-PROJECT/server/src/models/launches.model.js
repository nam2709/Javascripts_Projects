const launches = new Map();

let latesfightnumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    custormer: ['ZTM', 'Nasa'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

function addNewLaunch(launch) {
    latesfightnumber++;
    launches.set(
        latesfightnumber, 
        Object.assign(launch, {
            custormer: ['Zero to Mastery', 'Nasa'],
            upcoming: true,
            success: true,
            flightNumber: latesfightnumber,
        })
    );
}

function exitsLaunchWithId(launchId) {
    return launches.has(launchId);
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    launches, 
    addNewLaunch, 
    exitsLaunchWithId, 
    abortLaunchById
}