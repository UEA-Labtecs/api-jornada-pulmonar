import { Injectable } from '@nestjs/common';
import { FileDTO } from '../../presentation/dto/upload.dto';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UploadsUseCase {
  private readonly supabaseURL = 'https://znqjwdtfhhyecxhgrhbe.supabase.co';
  private readonly supabaseKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpucWp3ZHRmaGh5ZWN4aGdyaGJlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTIzMzg1NywiZXhwIjoyMDI2ODA5ODU3fQ.62wfN8UqEHYuswN_Y9dyVHXmn01xkvxmRK9FY3XWUyM';
  private readonly supabase = createClient(this.supabaseURL, this.supabaseKEY, {
    auth: {
      persistSession: false,
    },
  });

  async upload(file: FileDTO) {
    const data = await this.supabase.storage
      .from('pulmao')
      .upload(file.originalname, file.buffer, {
        upsert: true,
      });

    return data;
  }

  async getFileURL(fileName: string) {
    const { data, error } = await this.supabase.storage
      .from('pulmao')
      .createSignedUrl(fileName, 60); // Tempo de expiração em segundos

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

}