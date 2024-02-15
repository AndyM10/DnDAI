import * as cdk from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import path = require('path');

export class DnDStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Function(this, 'GenerationHandler', {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset(path.join(__dirname, '../../api/dist/')),
      handler: 'generate.handler'
    })
  }
}
