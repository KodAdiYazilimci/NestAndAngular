// import { Injectable } from "@nestjs/common";
import { Document } from "mongoose";

// @Injectable()
export interface IProductEntity extends Document {
    Id: number;
    Name: string;
}