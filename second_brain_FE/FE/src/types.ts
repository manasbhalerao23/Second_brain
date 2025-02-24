export interface contentdata{
    id:string,
    type: contentTypeEnum,
    link: string,
    title: string,
    tags: string[]
}

export enum contentTypeEnum{
    Image= "Image",
    Video= "Video",
    Tweet= "Tweet",
    Documnet= "Document",
    Link= "Link"
}