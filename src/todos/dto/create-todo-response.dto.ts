import { GetListResponseDto } from "./get-list-response.dto";

export class CreateTodoResponseDto {
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
