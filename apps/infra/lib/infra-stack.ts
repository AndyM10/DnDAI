import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodefunction from 'aws-cdk-lib/aws-lambda-nodejs';
import * as ssm from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs';
import path = require('path');

export class DnDStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    console.log(process.env.OPENAI_API_KEY)

    const OPENAI_API_KEY = ssm.StringParameter.fromStringParameterName(this, 'AI key', '/dndai/open_ai_key').stringValue
    const SUPBASE_URL = ssm.StringParameter.fromStringParameterName(this, 'Supabase Url', '/dndai/supabase_url').stringValue
    const SUPABASE_ANON_KEY = ssm.StringParameter.fromStringParameterName(this, 'Supbase Anon Key', '/dndai/supabase_anon_key').stringValue

    const generateFunction = new nodefunction.NodejsFunction(this, 'GenerateFunction', {
      entry: path.join(__dirname, '../../api/src/generate.ts'),
      timeout: cdk.Duration.seconds(20),
      environment: {
        OPENAI_API_KEY,
        SUPBASE_URL,
        SUPABASE_ANON_KEY
      }
    })

    const functionUrl = generateFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['http://localhost:3000', 'https://dnd-ai-pi.vercel.app'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        allowedMethods: [lambda.HttpMethod.POST],
        allowCredentials: true
      }
    })

    new cdk.CfnOutput(this, 'functionUrl', {
      value: functionUrl.url.toString()
    })
  }
}
