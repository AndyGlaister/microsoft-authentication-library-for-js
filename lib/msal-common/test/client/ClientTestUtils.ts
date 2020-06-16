import { ClientConfiguration, Constants, LogLevel, NetworkRequestOptions, PkceCodes, ClientAuthError, CacheManager} from "../../src";
import { RANDOM_TEST_GUID, TEST_CONFIG } from "../utils/StringConstants";
import { AuthorityFactory } from "../../src";

export class MockStorageClass extends CacheManager {
    store = {};
    setItem(key: string, value: string | object, type?: string): void {
        this.store[key] = value;
    }
    getItem(key: string, type?: string): string | object {
        return this.store[key];
    }
    removeItem(key: string, type?: string): boolean {
        delete this.store[key];
        return true;
    }
    containsKey(key: string, type?: string): boolean {
        return !!this.store[key];
    }
    getKeys(): string[] {
        return Object.keys(this.store);
    }
    clear(): void {
        this.store = {};
    }
}

export class ClientTestUtils {

    static async createTestClientConfiguration(): Promise<ClientConfiguration>{

        const testLoggerCallback = (level: LogLevel, message: string, containsPii: boolean): void => {
            if (containsPii) {
                console.log(`Log level: ${level} Message: ${message}`);
            }
        };

        const mockHttpClient = {
            sendGetRequestAsync<T>(url: string, options?: NetworkRequestOptions): T {
                return null;
            },
            sendPostRequestAsync<T>(url: string, options?: NetworkRequestOptions): T {
                return null;
            }
        };

        const authority  = AuthorityFactory.createInstance(TEST_CONFIG.validAuthority, mockHttpClient);

        await authority.resolveEndpointsAsync().catch(error => {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError(error);
        });

        let store = {};
        return {
            authOptions: {
                clientId: TEST_CONFIG.MSAL_CLIENT_ID,
                authority: authority,
                knownAuthorities: [],
            },
            storageInterface: new MockStorageClass(),
            networkInterface: {
                sendGetRequestAsync<T>(
                    url: string,
                    options?: NetworkRequestOptions
                ): T {
                    return null;
                },
                sendPostRequestAsync<T>(
                    url: string,
                    options?: NetworkRequestOptions
                ): T {
                    return null;
                },
            },
            cryptoInterface: {
                createNewGuid(): string {
                    return RANDOM_TEST_GUID;
                },
                base64Decode(input: string): string {
                    return input;
                },
                base64Encode(input: string): string {
                    return input;
                },
                async generatePkceCodes(): Promise<PkceCodes> {
                    return {
                        challenge: TEST_CONFIG.TEST_CHALLENGE,
                        verifier: TEST_CONFIG.TEST_VERIFIER,
                    };
                },
            },
            loggerOptions: {
                loggerCallback: testLoggerCallback,
            },
            libraryInfo: {
                sku: Constants.SKU,
                version: TEST_CONFIG.TEST_VERSION,
                os: TEST_CONFIG.TEST_OS,
                cpu: TEST_CONFIG.TEST_CPU,
            },
        };
    }
}
