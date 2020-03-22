const api = () => {
    const link = 'https://api.spacexdata.com/v3'

    const fetchCapsules = (single_capsule) => {
        return  fetch(`${link}/capsules/${single_capsule  || ''}`)
        .then(res => res.json())
    }
    const fetchCores = (single_core) => {
        return  fetch(`${link}/cores/${single_core  || ''}`)
        .then(res => res.json())
    }
    const fetchHistory = (single_history) => {
        return  fetch(`${link}/history/${single_history  || ''}`)
            .then(res => res.json())
    }
    const fetchInfo = () => {
        return  fetch(`${link}/info`)
        .then(res => res.json())
    }
    const fetchLandingPads = (single_landpad) => {
        return  fetch(`${link}/landpads/${single_landpad || ''}`)
        .then(res => res.json())
    }
    const fetchLaunches = (single_launch) => {
        return  fetch(`${link}/launches/${single_launch || ''}`)
        .then(res => res.json())
    }
    const fetchMissions = (single_mission) => {
        return  fetch(`${link}/missions/${single_mission || ''}`)
        .then(res => res.json())
    }
    const fetchRockets = (single_rocket) => {
        return  fetch(`${link}/rockets/${single_rocket || ''}`)
        .then(res => res.json())
    }
    const fetchLaunchPads = (single_rocket) => {
        return  fetch(`${link}/launchpads/${single_rocket || ''}`)
        .then(res => res.json())
    }
    const fetchElonsRoadster = () => {
        return  fetch(`${link}/roadster`)
        .then(res => res.json())
    }

    return  {
        fetchCapsules,
        fetchCores,
        fetchHistory,
        fetchInfo,
        fetchLandingPads,
        fetchLaunches,
        fetchMissions,
        fetchRockets,
        fetchLaunchPads,
        fetchElonsRoadster
    } 
}

export default api();