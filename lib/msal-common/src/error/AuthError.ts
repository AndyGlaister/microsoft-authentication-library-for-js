/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * AuthErrorMessage class containing string constants used by error codes and messages.
 */
export const AuthErrorMessage = {
    unexpectedError: {
        code: "unexpected_error",
        desc: "Unexpected error in authentication."
    }
};

/**
 * General error class thrown by the MSAL.js library.
 */
export class AuthError extends Error {

    // Short string denoting error
    errorCode: string;
    // Detailed description of error
    errorMessage: string;
    suberror: string;

    constructor(errorCode: string, errorMessage?: string, suberror?: string) {
        const errorString = errorMessage ? `${errorCode}: ${errorMessage}` : errorCode;
        super(errorString);
        Object.setPrototypeOf(this, AuthError.prototype);

        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.suberror = suberror;
        this.name = "AuthError";
    }

    /**
     * Creates an error that is thrown when something unexpected happens in the library.
     * @param errDesc 
     */
    static createUnexpectedError(errDesc: string): AuthError {
        return new AuthError(AuthErrorMessage.unexpectedError.code, `${AuthErrorMessage.unexpectedError.desc}: ${errDesc}`);
    }
}
