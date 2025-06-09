// import { NextRequest } from "next/server";

// type HandlerFunc<T> = (req: NextRequest, ...args: any[]) => Promise<T>;

// type ApiResponse<T> = {
//   data?: T;
//   error?: string;
//   status: number;
// };

// export async function handleApi<T>(
//   req: NextRequest,
//   handler: HandlerFunc<T>,
//   ...args: any[]
// ): Promise<ApiResponse<T>> {
//   try {
//     const result = await handler(req, ...args);
//     return {
//       data: result as T,
//       status: (result as any)?.status || 200,
//     };
//   } catch (err) {
//     return {
//       error: (err as Error).message || "Something went wrong",
//       status: 500,
//     };
//   }
// }
