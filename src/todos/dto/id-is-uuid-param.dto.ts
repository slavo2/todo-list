import { IsUUID } from "class-validator";

export class idIsUUIDParam {
    @IsUUID()
    id: string;
}
