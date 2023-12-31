import {
  Param,
  Get,
  Delete,
  Patch,
  Body,
  Controller,
  Post,
  HttpCode,
  NotFoundException,
	ValidationPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { ProductService } from './product.service';
import { NOT_FOUND_PRODUCT_ERROR } from './product.constants';
import { CreateProductDto } from './dto/create-product.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.findById(id);
    if (!product) throw new NotFoundException(NOT_FOUND_PRODUCT_ERROR);
    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedProduct = await this.productService.deleteById(id);
    if (!deletedProduct) throw new NotFoundException(NOT_FOUND_PRODUCT_ERROR);
    return deletedProduct;
	}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateProductDto) {
		const updatedProduct = await this.productService.updateById(id, dto);
    if (!updatedProduct) throw new NotFoundException(NOT_FOUND_PRODUCT_ERROR);
    return updatedProduct;
	}

	@UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReviews(dto)
	}
}
