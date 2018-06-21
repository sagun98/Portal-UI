export interface Comment {
    id? : string,
    commentor? : string,
    commentDate : Date,
    content : string,
    comments : Comment[]
}