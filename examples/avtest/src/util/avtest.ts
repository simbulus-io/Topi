export interface Device {
    kind: string;
    deviceId: string;
    status: string;
    label: string;
  }
  
export function enumerate_devices(): Promise<Device[]> {
    return new Promise((resolve, reject) => {
        navigator.mediaDevices.enumerateDevices().then((devices: MediaDeviceInfo[]) => {
            const promises: Array<Promise<Device>> = [];
            for (const di of devices) {
                promises.push(check_device(di));
            }
            Promise.all(promises).then((dev) => {
                resolve(dev);
            });
        }).catch((e) => {
            reject(e);
        });
    });
}
  
async function check_device({ kind, deviceId, label }: MediaDeviceInfo): Promise<Device> {
  let status: string = 'Nominal';
  try {
    let constraints: any;
    if (deviceId && kind.match(/audio/)) {
      constraints = { audio: { deviceId: { exact: deviceId } } };
    } else if (deviceId && kind.match(/video/)) {
      constraints = { video: { deviceId: { exact: deviceId } } };
    } else if (kind.match(/video/)) {
      constraints = { video: true };
    } else if (kind.match(/audio/)) {
      constraints = { audio: true };
    }
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    // release tracks
    stream.getTracks().forEach((track) => { track.stop(); });
  } catch (err) {
    if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
      status = `${err.name},  ${err.message}`;
    } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
      status = 'Already in use ';
    } else if (err.name === 'OverconstrainedError' || err.name === 'ConstraintNotSatisfiedError') {
      status = 'Constraint error';
    } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      status = 'Permission error';
    } else {
      status = `Unexpected error -- ${err}`;
    }
  }
  return { kind, deviceId, label, status };
}