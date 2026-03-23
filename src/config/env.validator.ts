import { plainToInstance } from 'class-transformer';
import {
  IsInt,
  IsUrl,
  IsEnum,
  IsOptional,
  validateSync,
} from 'class-validator';

enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(NodeEnv)
  @IsOptional()
  NODE_ENV: NodeEnv = NodeEnv.Development;

  @IsInt()
  @IsOptional()
  PORT: number = 3000;

  @IsUrl({ require_tld: false, protocols: ['mongodb'] })
  @IsOptional()
  MONGODB_URI: string = 'mongodb://localhost:27017/nestjs-playground';
}

export default function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const cause = errors.map((error) => ({
      property: error.property,
      constraints: error.constraints,
    }));
    throw new Error('Invalid environment variable(s)', { cause });
  }
  return validatedConfig;
}
