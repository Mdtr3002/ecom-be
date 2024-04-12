export class ErrorUnauthorized extends Error {}

export class ErrorInvalidData extends Error {}

export class ErrorNotFound extends Error {}

// User error
export class ErrorUserInvalid extends Error {
    public static readonly code = 'user/invalid';
    message = 'Invalid User';
}

// Bundle error
export class ErrorBundleInvalid extends Error {
    public static readonly code = 'bundle/invalid';
    message = 'Invalid Bundle';
}

export class ErrorRoomInvalid extends Error {
    public static readonly code = 'room/invalid';
    message = 'Invalid Room';
}
export class ErrorHomeInvalid extends Error {
    public static readonly code = 'home/invalid';
    message = 'Invalid Home';
}

export class ErrorRoutineInvalid extends Error {
    public static readonly code = 'routine/invalid';
    message = 'Invalid Routine';
}

export class ErrorDeviceInvalid extends Error {
    public static readonly code = 'device/invalid';
    message = 'Invalid Device';
}

export class ErrorDeviceStatusInvalid extends Error {
    public static readonly code = 'device_status/invalid';
    message = 'Invalid Device status';
}

export class ErrorItemInvalid extends Error {
    public static readonly code = 'item/invalid';
    message = 'Invalid Item';
}

export class ErrorBidInvalid extends Error {
    public static readonly code = 'bid/invalid';
    message = 'Invalid Bid';
}

export class ErrorBalance extends Error {
    public static readonly code = 'transfer/balance';
    message = 'Invalid Balance';
}
