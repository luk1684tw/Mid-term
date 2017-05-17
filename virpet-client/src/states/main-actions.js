export function toggleNavbar() {
    return {
        type: '@MAIN/TOGGLE_NAVBAR'
    };
}

export function Animated(pictureNum) {
    return {
        type: '@MAIN/Animated',
        pictureNum: pictureNum
    };
}

export function Show() {
    return {
        type: '@MAIN/Show'
    };
}
