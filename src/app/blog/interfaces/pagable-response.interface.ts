export interface PageableResponse {
    content : any[],
    first : boolean,
    last : boolean,
    number : number,
    numberOfElements : number,
    pageable : Pageable,
    size : number,
    sort : any,
    totalElements : number,
    totalPages : number
}

export interface PageableSort {
    sorted : boolean
    unsorted : boolean
}

export interface Pageable {
    offset : number,
    pageNumber: number,
    pageSize : number,
    paged : boolean,
    sort : PageableSort,
    unpaged : boolean
}