import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Length, IsEmail } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 80,
  })
  @Length(10, 80)
  name: string;

  @Column({
    length: 100,
  })
  @Length(10, 80)
  @IsEmail()
  email: string;
}

export const userSchema = {
  id: {
    type: "number",
    require: true,
    example: 1,
  },
  name: {
    type: "string",
    require: true,
    example: "Arron",
  },
  email: {
    type: "string",
    require: true,
    example: "arronf2e@163.com",
  },
};
