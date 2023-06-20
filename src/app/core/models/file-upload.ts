export interface FileUpload {
    fileId: string;
    fileName: string;
    originalFileName: string;
    fileSize: number;
    mimeType: string;
    storageEtag: string;
    storageLocation: string;
    storageKey: string;
    readonly createdDate?: Date;
    readonly updatedDate?: Date;
    readonly deletedDate?: Date;
}

