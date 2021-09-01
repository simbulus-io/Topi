import { Device, enumerate_devices } from '@/util/avtest';

export class DeviceUtils {

    // public static devices() {
    //     return enumerate_devices();
    // }

    public static audio_devices(listOfDevices: Device[]) {
        const audioDevices: Device[] = [];
        listOfDevices.forEach((device) => {
        if (device.kind === 'audioinput') {
            audioDevices.push(device);
        }
        });
        return audioDevices;
    }

    public static videoDevices(listOfDevices: Device[]) {
        const videoDevices: Device[] = [];
        listOfDevices.forEach((device) => {
            if (device.kind === 'videoinput') {
                videoDevices.push(device);
            }
        });
        return videoDevices;
    }
    
 }