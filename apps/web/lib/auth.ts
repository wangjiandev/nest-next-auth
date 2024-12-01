"use server";

import { FormState } from "./type";

export const signup = async (state: FormState, formData: FormData) => {
  const email = formData.get("email");
};
