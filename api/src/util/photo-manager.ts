// Dependências e Tipos
import { DiskStorage } from '../providers/disk-storage';

const diskStorage = new DiskStorage();

export async function handlePhotoUpdateAndCleanup(
  oldPhotoFileName: string | null | undefined,
  newPhotoFileName: string | null | undefined,
): Promise<string | null | undefined> {
  if (newPhotoFileName) {
    if (oldPhotoFileName) {
      await diskStorage.deleteFile(oldPhotoFileName, 'upload');
    }

    return newPhotoFileName;
  }

  if (newPhotoFileName === null) {
    if (oldPhotoFileName) {
      await diskStorage.deleteFile(oldPhotoFileName, 'upload');
    }

    return null;
  }

  return oldPhotoFileName;
}
