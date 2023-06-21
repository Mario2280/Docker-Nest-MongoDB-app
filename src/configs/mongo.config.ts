import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';
export const getMongoConfig = async (
  configeService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configeService),
    ...getMongoOptions()
  };
};


const getMongoString = (configeService: ConfigService) => {
	console.log('mongodb://' +
  configeService.get('MONGO_LOGIN') +
  ':' +
  configeService.get('MONGO_PASSWORD') +
  '@' +
  configeService.get('MONGO_HOST') +
  ':' +
  configeService.get('MONGO_PORT') +
  '/' +
  configeService.get('MONGO_AUTHDATABASE'));
	return ('mongodb://' +
  configeService.get('MONGO_LOGIN') +
  ':' +
  configeService.get('MONGO_PASSWORD') +
  '@' +
  configeService.get('MONGO_HOST') +
  ':' +
  configeService.get('MONGO_PORT') +
  '/' +
  configeService.get('MONGO_AUTHDATABASE'));
}
  

	const getMongoOptions = () => ({
		useNewUrlParser: true,
		useUnifiedTopology: true
	});