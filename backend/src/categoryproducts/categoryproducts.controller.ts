import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryproductsService } from './categoryproducts.service';
import { CreateCategoryproductDto } from './dto/create-categoryproduct.dto';
import { UpdateCategoryproductDto } from './dto/update-categoryproduct.dto';

@Controller('categoryproducts')
export class CategoryproductsController {
  constructor(
    private readonly categoryproductsService: CategoryproductsService,
  ) {}

  @Post()
  create(@Body() createCategoryproductDto: CreateCategoryproductDto) {
    return this.categoryproductsService.create(createCategoryproductDto);
  }

  @Get()
  findAll() {
    return this.categoryproductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryproductsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryproductDto: UpdateCategoryproductDto,
  ) {
    return this.categoryproductsService.update(id, updateCategoryproductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryproductsService.remove(id);
  }
}
