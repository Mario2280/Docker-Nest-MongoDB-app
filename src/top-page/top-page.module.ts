import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { ConfigService } from '@nestjs/config';
import { TopPageModel } from './top-page.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { TopPageService } from './top-page.service';

@Module({
  controllers: [TopPageController],
  providers: [ConfigService, TopPageService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TopPageModel,
        schemaOptions: {
          collection: 'TopPage',
        },
      },
    ]),
  ],
})
export class TopPageModule {}
