import { Transform, TransformFnParams } from "class-transformer";
import { IsInt } from "class-validator";

export class CreatePostDto {
    title: string;
    content: string;

    @Transform(({ value }: TransformFnParams) => parseInt(value))
    @IsInt()
    authorId: number;
}
