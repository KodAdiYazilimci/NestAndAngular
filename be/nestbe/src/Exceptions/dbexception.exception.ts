export class DbException extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, DbException.prototype);
    }
}