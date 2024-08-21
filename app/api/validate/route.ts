import { validateSIN } from "@utils/validateSIN"

/**
 * POST endpoint on /api/validate
 * @param req - The API request
 * @returns {Promise<Response>}
 */
export async function POST(req: Request): Promise<Response> {
  const { sin } = await req.json()
  const { isValid, error } = validateSIN(sin)
  return Response.json({ isValid, error })
}