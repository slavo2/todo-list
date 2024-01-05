import { GetListResponseDto } from "./get-list-response.dto";

export class GetTodoResponseDto {
    id: string;
    title: string;
    text: string;
    deadline: Date;
    author: Author;
    list: GetListResponseDto;
}

class Author {
    id: string;
    username: string;
}
