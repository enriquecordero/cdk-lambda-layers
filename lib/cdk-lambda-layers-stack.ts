import * as cdk from 'aws-cdk-lib';
import { Code, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkLambdaLayersStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const layers = new LayerVersion(this,'cal-layers',{
      compatibleRuntimes:[
        Runtime.NODEJS_16_X,
        Runtime.NODEJS_18_X,
      ],
      code: Code.fromAsset('src/layers/calc')
    })

    new NodejsFunction(this,'myfunction',{
      runtime:Runtime.NODEJS_18_X,
      handler: 'handler',     
      entry: join(__dirname, '..', 'lambda', 'index.ts'), 
      layers: [layers]
    })

  }
}
