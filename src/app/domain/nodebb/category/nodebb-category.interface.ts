
export interface NodeBBCategory {
    cid?: number;
    description: string;
    disabled?: boolean;
    name: string;
    privileges : NodeBBPrivilege[]
    title: string;
    icon ? : string;
}

export interface NodeBBPrivilege {
    cid?: number;
    editable?: boolean;
    isAdminOrMod?: boolean;
    read?: boolean;
    "topics:create"?: boolean;
    "topics:read"?: boolean;
    "topics:tag"?: boolean;
    uid?: number
}