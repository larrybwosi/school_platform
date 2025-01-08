import { NextResponse } from 'next/server';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  roleId: z.number().optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = registerSchema.parse(json);
    return new NextResponse('Skibiddy')

  //   const existingUser = await getUserByEmail(body.email);
  //   if (existingUser) {
  //     return NextResponse.json(
  //       { error: 'User already exists' },
  //       { status: 400 }
  //     );
  //   }

  //   const user = await createUser(body);
  //   return NextResponse.json(
  //     {
  //       user: {
  //         id: user.id,
  //         email: user.email,
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //       },
  //     },
  //     { status: 201 }
  //   );
  // } catch (error) {
  //   if (error instanceof z.ZodError) {
  //     return NextResponse.json({ error: error.issues }, { status: 400 });
  //   }

  //   return NextResponse.json(
  //     { error: 'Internal Server Error' },
  //     { status: 500 }
  //   );
  // }
}