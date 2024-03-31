import { z } from 'zod';
export const authSchema = z.object({
  email: z.string().email({ message: 'Geçersiz E-posta Formatı' }),
  password: z.string().min(8, {
    message: 'Minimum 8 karakterli bir şifre girilmesi gerekmekte.',
  }),
  name: z.string(),
});
export const authSchemaValidate = async (
  email: string,
  password: string,
  name: string
): Promise<{ message: boolean; error: any }> => {
  try {
    authSchema.parse({
      email,
      password,
      name,
    });
    return { message: true, error: null };
  } catch (error) {
    //@ts-expect-error "type error"
    console.log(error.issues);
    //@ts-expect-error "type error"
    return { message: false, error: error.issues };
  }
};
export const LoginSchema = z.object({
  email: z.string().email({ message: 'Geçersiz E-posta Formatı' }),
  password: z.string().min(8, {
    message: 'Lütfen geçerli bir parola girin.',
  }),
});
export const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: 'Geçersiz E-posta Formatı' }),
  password: z.string().min(8, {
    message: 'Lütfen geçerli bir parola girin.',
  }),
});
