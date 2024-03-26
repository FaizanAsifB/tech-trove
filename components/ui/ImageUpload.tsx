'use client'

import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import deleteCloudImage from '@/lib/actions'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { Image as ImageDb } from '@prisma/client'
import { ImagePlus, Trash } from 'lucide-react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type ImageUploadProps = {
  disabled?: boolean
  onChange: (images: { url: string; public_id: string }[]) => void
  onRemove: (url: string) => void
  value: NewImage[]
}

type NewImage = Pick<ImageDb, 'url' | 'public_id' | 'isDefault'>

const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<NewImage[]>(value)
  // const [defaultImage, setDefaultImage] = useState('')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    onChange(uploadedImages)
  }, [onChange, uploadedImages])

  const onUpload = (result: any) => {
    const newImage = {
      url: result.info?.secure_url,
      public_id: result.info?.public_id,
    }

    // if (!defaultImage) {
    //   setDefaultImage(newImage.public_id)
    // }

    setUploadedImages(prev => {
      const isDefault = prev.length === 0 ? true : false
      const updatedNewImage = { ...newImage, isDefault }
      return [...prev, updatedNewImage]
    })
  }

  const onRemoveHandler = async (url: string, public_id: string) => {
    onRemove(url)
    await deleteCloudImage(public_id)
  }

  const toggleIsDefault = (public_id: string, isDefault: boolean) => {
    if (isDefault) return
    const updatedImages = uploadedImages.map(image => {
      if (image.public_id === public_id) {
        return { ...image, isDefault: true }
      }
      return { ...image, isDefault: false }
    })
    setUploadedImages(updatedImages)
    // setDefaultImage(public_id)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map(image => {
          // const isDefault = defaultImage === image.public_id
          return (
            <div
              key={image.url}
              className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
            >
              <div className="z-10 absolute top-2 right-2">
                <Button
                  type="button"
                  onClick={() => onRemoveHandler(image.url, image.public_id)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image
                fill
                className="object-cover"
                alt="Image"
                src={image.url}
              />

              <div className="z-10 absolute bottom-2 left-1/2 -translate-x-1/2">
                <Button
                  variant={'secondary'}
                  size={'sm'}
                  type="button"
                  onClick={() =>
                    toggleIsDefault(image.public_id, image.isDefault)
                  }
                  disabled={image.isDefault}
                >
                  <CheckCircleIcon
                    className={twMerge(
                      'h-6 w-6 text-muted-foreground/40',
                      image.isDefault ? 'text-green-600' : ''
                    )}
                  />{' '}
                  {image.isDefault ? 'Default Image' : 'Set as default'}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
      <CldUploadWidget
        uploadPreset="xkdjouzr"
        onSuccess={result => {
          onUpload(result)
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open()
          }

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
