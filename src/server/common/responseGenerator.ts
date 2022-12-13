export default function responseGenerator<T>(
  status: number,
  message: string,
  result: T
) {
  return {
    status,
    message,
    result,
  };
}
