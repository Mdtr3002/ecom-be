class TrackingDevice {
    private deviceConnecting: any;

    constructor() {
        this.deviceConnecting = [];
    }

    add(obj: any, deviceName: any) {
        this.deviceConnecting.push({
            name: deviceName,
            observer: obj,
        });
    }

    remove(socketId: any) {
        this.deviceConnecting = this.deviceConnecting.filter(
            (val: any) => val.name !== name,
        );
    }

    update(deviceName: any, data: any) {
        this.deviceConnecting.map((e: any) => {
            if (e.name[0] == deviceName) {
                e.observer.update(data);
            }

            if (e.name.length > 1) {
                if (e.name[1] == deviceName) e.observer.update(data);
            }
        });
    }

    getDeviceConnecting() {
        return this.deviceConnecting;
    }
}

export default TrackingDevice;