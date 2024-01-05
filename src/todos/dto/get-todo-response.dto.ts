export class GetTodoResponseDto {
    id: string;
    title: string;
    text: string;
    deadline: Date;
    author: Author;
    list: List;
}

class Author {
    id: string;
    username: string;
}

class List {
    id: string;
    name: string;
}
