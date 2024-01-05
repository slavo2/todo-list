import { GetTodoResponseDto } from "./get-todo-response.dto";

export class GetOneTodoResponseDto extends GetTodoResponseDto {
    flags: Flag[];
}

class Flag {
    id: string;
    name: string;
}
