var isPhoneGapReady = false;

function init() {
document.addEventListener("deviceready",onDeviceReady, false);
}

function onDeviceReady() {
isPhoneGapReady = true;
alert('The device is now ready');
}

window.onload = init;