import { APIGatewayProxyEventV2, Context, Handler } from "aws-lambda"

export const handler: Handler = async (event: APIGatewayProxyEventV2, context: Context) => {
  console.log(context, event)
  return {
    statusCode: 200,
    body: "Hello, world!"
  }
}

