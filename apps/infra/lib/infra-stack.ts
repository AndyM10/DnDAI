import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodefunction from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import path = require('path');

export class DnDStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const generateFunction = new nodefunction.NodejsFunction(this, 'GenerateFunction', {
      entry: path.join(__dirname, '../../api/src/generate.ts'),
      environment: {
        OPENAI_API_KEY: "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"
      }
    })

    const functionUrl = generateFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedHeaders: ['*'],
        allowedMethods: [lambda.HttpMethod.POST]
      }
    })

    new cdk.CfnOutput(this, 'functionUrl', {
      value: functionUrl.toString()
    })
  }
}
