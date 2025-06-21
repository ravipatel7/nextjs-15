import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";

// Get User by Id
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = await params;
  if (!id) throw new NotFoundError("Account");

  try {
    await dbConnect();
    const account = await Account.findById(id);
    if (!account) throw new NotFoundError("Account");

    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// Delete /api/accounts/[id]
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = await params;
  if (!id) throw new NotFoundError("Account");

  try {
    await dbConnect();
    const account = await Account.findByIdAndDelete(id);
    if (!account) throw new NotFoundError("Account");

    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// PUT  /api/accounts/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = await params;
  if (!id) throw new NotFoundError("Account");

  try {
    await dbConnect();
    const body = await request.json();

    const validateData = AccountSchema.partial().safeParse(body);

    if (!validateData.success) {
      throw new ValidationError(validateData.error.flatten().fieldErrors);
    }

    const updatedAccount = await Account.findByIdAndUpdate(id, validateData, {
      new: true,
    });
    if (!updatedAccount) throw new NotFoundError("Account");

    return NextResponse.json(
      {
        success: true,
        data: updatedAccount,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
