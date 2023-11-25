export class GetListResponseDto {
    name: string;
    id: string;    
    owners: Owner[]
}

class Owner {
    id: string;
    username: string;
}
