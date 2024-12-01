import { z } from "zod";

export type FormState =
  | {
      error?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const SignupFormSchema = z.object({
  name: z.string().min(2, { message: "名字不能少于2个字符" }).trim(),
  email: z.string().email({ message: "邮箱格式不正确" }).trim(),
  password: z
    .string()
    .min(8, { message: "密码不能少于8个字符" })
    .regex(/[a-zA-Z]/, {
      message: "密码必须包含至少1个大写字母",
    })
    .regex(/[0-9]/, {
      message: "密码必须包含至少1个数字",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "密码必须包含至少1个特殊字符",
    })
    .trim(),
});

export const SigninFormSchema = z.object({
  email: z.string().email({ message: "邮箱格式不正确" }).trim(),
  password: z.string().min(1, { message: "密码不能为空" }).trim(),
});
