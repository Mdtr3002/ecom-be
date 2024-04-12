class TrackingUser {
    private userIsConnecting: any;

    constructor() {
        this.userIsConnecting = [];
    }

    addUserConnecting(socketId: any, userId: any) {
        this.userIsConnecting.push({
            userId: userId,
            socketId: socketId,
        });
    }

    removeUserConnecting(socketId: any) {
        this.userIsConnecting = this.userIsConnecting.filter(
            (val: any) => val.socketId !== socketId,
        );
    }

    getUserConnecting() {
        return this.userIsConnecting;
    }
}

export default TrackingUser;
