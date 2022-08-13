import { PlusIcon, XIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';

interface Props {
    multiple?: any,
    selectedPictures?: any
}

export default function FileUploadComponent({ multiple, selectedPictures }: Props) {
    let fileObj: any = []
    let fileArray: any = []
    const upload_files: any = []

    const [preview_files, setPreviewFiles] = useState<any>([])
    const [files_to_upload, setUploadFiles] = useState<any>([])

    const uploadMultipleFiles = (e: any) => {
        fileObj.push(e.target.files)
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]))
            upload_files.push(fileObj[0][i])
        }
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            selectedPictures((prevState: any) => [...prevState, newImage]);
        }
        setPreviewFiles(fileArray)
        setUploadFiles(upload_files)
        // selectedPictures(upload_files)
    }

    const removePicture = (index: number) => {
        setUploadFiles([...files_to_upload.filter((file_to_upload: any) => files_to_upload.indexOf(file_to_upload) !== index)]);
        setPreviewFiles([...preview_files.filter((preview_file: any) => preview_files.indexOf(preview_file) !== index)]);
        selectedPictures([...preview_files.filter((preview_file: any) => preview_files.indexOf(preview_file) !== index)]);
    };

    const addPicture = (event: any) => {
        fileObj.push(event.target.files)
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]))
            upload_files.push(fileObj[0][i])
        }
        setPreviewFiles([...preview_files, fileArray])
        setUploadFiles([...files_to_upload, upload_files])
        selectedPictures([...files_to_upload, upload_files])
    }

    // const uploadFiles = (e) => {
    //     e.preventDefault()
    // }

    return (
        <div className={` py-2`}>
            <div className="grid grid-cols-3 items-center gap-8 my-2 mx-4 w-full">
                {preview_files.length >= 1 && <>
                    {(preview_files).map((url: string | undefined, index: number) => (
                        <div key={index} className="relative col-span-1 rounded flex flex-col items-center">
                            <span onClick={() => removePicture(index)} className='cursor-pointer absolute top-0 right-0 bg-white rounded-full p-1'>
                                <XIcon height={12} width={12} className='text-gray-700' />
                            </span>
                            <img src={url} alt="..." className='h-28 rounded' />
                        </div>
                    ))}
                    <div className="relative col-span-1 h-16 w-16 rounded-lg border bg-gray-200 border-dashed border-gray-500 flex justify-center items-center">
                        <div className="absolute">
                            <div className="flex flex-col items-center">
                                <PlusIcon height={20} width={20} className='text-gray-700' />
                            </div>
                        </div>

                        <input onChange={addPicture} type="file" className="h-full w-full opacity-0" name="" />

                    </div>
                </>}
            </div>
            <div className="form-group w-full">
                <div className="px-4 py-5 bg-gray-100 dark:bg-gray-700 rounded shadow w-full">
                    <div className="mx-auto rounded-lg overflow-hidden max-w-xl">
                        <div className="md:flex">
                            <div className="w-full p-3">
                                <div className={` cursor-pointer relative h-20 rounded-lg border-dashed border-2 border-gray-300 flex justify-center items-center `}>

                                    <div className="absolute">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex flex-col items-center">
                                            <span className="block text-gray-400 font-normal">Select Picture</span> </div>
                                    </div>
                                    {
                                        multiple ? (
                                            <input onChange={uploadMultipleFiles} type="file" className="h-full w-full opacity-0" name="" multiple />
                                        ) : (
                                                <input onChange={uploadMultipleFiles} type="file" className="h-full w-full opacity-0" name="" />
                                            )
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
