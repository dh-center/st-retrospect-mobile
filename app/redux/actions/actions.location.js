export const SET_DEVICE_LOCATION = 'SET_DEVICE_LOCATION';
export function setDeviceLocation(latitude, longitude) {
    return {
        type: 'SET_DEVICE_LOCATION',
        latitude: latitude,
        longitude: longitude,
    };
}

export const UNSET_DEVICE_LOCATION = 'UNSET_DEVICE_LOCATION';
export function unsetDeviceLocation() {
    return {
        type: 'UNSET_DEVICE_LOCATION',
    };
}
