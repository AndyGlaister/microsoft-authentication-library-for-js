/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { WamExtensionMethod } from "../../utils/BrowserConstants";
import { WamRequest } from "../../request/WamRequest";

export type WamExtensionRequestBody = {
    method: WamExtensionMethod;
    request?: WamRequest;
};

export type WamExtensionRequest = {
    channel: string;
    responseId: number;
    extensionId?: string;
    body: WamExtensionRequestBody
};