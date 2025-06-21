import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { RequestError, ValidationError } from "../http-errors";
import logger from "../logger";

export type ResponseType = "api" | "server";

const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]>
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };

  return responseType === "api" ?
      NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};

const handleError = (error: unknown, responseType: ResponseType = "server") => {
  if (error instanceof RequestError) {
    logger.error(
      `RequestError: ${error.message}, Status Code: ${error.statusCode}, Errors: ${JSON.stringify(error.errors)}`
    );
    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors
    );
  }

  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    );
    logger.error(
      `ValidationError: ${validationError.message}, Errors: ${JSON.stringify(validationError.errors)}`
    );
    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }

  if (error instanceof Error) {
    logger.error(`Error: ${error.message}`);
    // Handle generic errors
    return formatResponse(responseType, 500, error.message);
  }

  // Fallback for unexpected errors
  logger.error("An unexpected error occurred:", error);
  return formatResponse(responseType, 500, "An unexpected error occurred");
};

export default handleError;
