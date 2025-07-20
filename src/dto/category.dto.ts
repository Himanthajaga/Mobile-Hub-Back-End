import {Types} from "mongoose";
import UUID = module

export interface CategoryDto {
    id: string;
    name: string;
    description: string;
    image: string;
}