import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, ValidateNested, IsString } from 'class-validator';

class ProductCharacteristicDto{
	@IsString()ТЧСЯКТЧСЯКТТЧСЯКТЧСЯКТЧСЯКТЧСЯК
	name: string;
	@IsString()
	vale: string;
}


export class CreateProductDto {
	@IsString()
	image: string;
	
	@IsString()
	title: string;
	
	@IsNumber()
	price: number;
	
	@IsNumber()
	@IsOptional()
	oldPrice?: number;

	credit: number;
	
	@IsString()
	description: string;
	
	@IsString()
	advantages: string;
	
	@IsString()
	disAdvantages: string;
	
	@IsArray()
	@IsString({ each: true})
	tags: string[];
	
	@IsArray()
	@IsString({ each: true})
	categories: string[];
	
	@IsArray()
	@ValidateNested()
	@Type(() => ProductCharacteristicDto)
	characteristics: ProductCharacteristicDto[];
}