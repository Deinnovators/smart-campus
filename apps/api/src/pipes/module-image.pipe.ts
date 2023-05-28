import { Express } from 'express';
import { moduleImageDir } from '@api/modules/module-registry/module-registry.contants';
import { Injectable, PipeTransform } from '@nestjs/common';
import path from 'path';
import sharp from 'sharp';

@Injectable()
export class ModuleImagePipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: Express.Multer.File): Promise<string> {
    if (!image) return;
    const originalName = path.parse(image.originalname).name;
    const filename = originalName + '-' + Date.now() + '.webp';

    await sharp(image.buffer)
      .resize(500, 500)
      .webp({ effort: 3 })
      .toFile(path.join(moduleImageDir, filename));

    return filename;
  }
}
