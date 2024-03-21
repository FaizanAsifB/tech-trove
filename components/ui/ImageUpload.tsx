'use client'

import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import deleteCloudImage from '@/lib/actions'
import { Image as ImageDb } from '@prisma/client'
import { ImagePlus, Trash } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (url: string, public_id: string) => void
  onRemove: (url: string) => void
  value: { url: string; public_id: string }[]
}

const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpload = (result: any) => {
    console.log(result)
    onChange(result.info?.secure_url, result.info?.public_id)
  }

  const onRemoveHandler = async (url: string, public_id: string) => {
    onRemove(url)
    await deleteCloudImage(public_id)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map(image => (
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
            <Image fill className="object-cover" alt="Image" src={image.url} />
          </div>
        ))}
      </div>
      <CldUploadWidget
        uploadPreset="xkdjouzr"
        onSuccess={result => onUpload(result)}
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
