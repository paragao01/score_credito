import { NextResponse } from "next/server"
import { z } from "zod"
import { CreditService } from "@/lib/credit-service"

// Schema de validação
const userSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().min(11, "CPF inválido"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  email: z.string().email("Email inválido"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Valida os dados recebidos
    const validatedData = userSchema.parse(body)

    // Busca o score usando o serviço
    const creditScore = await CreditService.getScoreByDocument(validatedData.cpf)

    return NextResponse.json(creditScore)
  } catch (error) {
    console.error("Error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
          details: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 },
      )
    }

    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

