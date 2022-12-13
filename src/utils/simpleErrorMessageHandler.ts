export default function simpleteErrorMessageHandler(error: string) {
  const errorMap = {
    CredentialsSignin: "Invalid email or password",
  } as const;

  return errorMap[error as keyof typeof errorMap];
}
