import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from './file.schema';

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async saveFileData(fileData: Express.Multer.File): Promise<File> {
    try {
      const createdFile = new this.fileModel({
        filename: fileData.filename,
        path: fileData.path,
        mimetype: fileData.mimetype,
        size: fileData.size,
      });

      return await createdFile.save();
    } catch (error) {
      console.error('Error saving file to database:', error);
      throw new Error('Could not save file');
    }
  }

  async findAllFiles(): Promise<File[]> {
    return this.fileModel.find().exec();
  }
}
