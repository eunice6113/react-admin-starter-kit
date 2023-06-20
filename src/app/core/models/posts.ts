import { Post } from "./post";

export interface Posts {
    contents?: Post[];
    contentsNbi?: number;
    pageGrpNoList?: number[];
    pageNo?: number;
    pageSize?: number;
    totalPages?: number;
    ttalDataNbi?: number;
}