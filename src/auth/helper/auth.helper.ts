import * as bcrypt from 'bcryptjs';
export const hashPassword = async (pwd: string) => {
  const salt = process.env.HASH_SALT;
  return await bcrypt.hash(pwd, salt);
};
