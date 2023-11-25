import { IsUUID } from "class-validator";

export class ShareListDto {
    @IsUUID()
    userId: string;
}
