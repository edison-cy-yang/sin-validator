import { validateSIN } from "@utils/sinValidator"

export async function POST(req: Request) {
  const { sin } = await req.json()
  const isValid = validateSIN(sin)
  return Response.json({ isValid })
}