import { API_MANAGEMENT_TOOLS } from "../enums/api-management-tools.enum";

const _API_MANAGEMENT_TOOLS_ARRAY = [];

Object.keys(API_MANAGEMENT_TOOLS).forEach(key => {
    _API_MANAGEMENT_TOOLS_ARRAY.push({label : API_MANAGEMENT_TOOLS[key], value : key });
});

export const API_MANAGEMENT_TOOLS_ARRAY = _API_MANAGEMENT_TOOLS_ARRAY;