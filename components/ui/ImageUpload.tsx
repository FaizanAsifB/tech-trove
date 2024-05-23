"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Fragment, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import deleteCloudImage from "@/lib/actions";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Image as ImageDb } from "@prisma/client";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { DeleteDialog } from "./delete-dialog";

type ImageUploadProps = {
  disabled?: boolean;
  onChange: (images: { url: string; public_id: string }[]) => void;
  onRemove: (url: string) => void;
  value: NewImage[];
};

type NewImage = Pick<ImageDb, "url" | "public_id" | "isPrimary">;

const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<NewImage[]>(value);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onChange(uploadedImages);
  }, [onChange, uploadedImages]);

  const onUpload = (result: any) => {
    const newImage = {
      url: result.info?.secure_url,
      public_id: result.info?.public_id,
    };

    setUploadedImages((prev) => {
      const isPrimary = prev.length === 0 ? true : false;
      const updatedNewImage = { ...newImage, isPrimary };
      return [...prev, updatedNewImage];
    });
  };

  const onRemoveHandler = async (url: string, public_id: string) => {
    onRemove(url);
    setUploadedImages((prev) => {
      return prev.filter((image) => image.public_id !== public_id);
    });
    await deleteCloudImage(public_id);
    // setUploadedImages(prev =>
    //   prev.filter(image => image.public_id !== public_id)
    // )
  };

  const toggleIsPrimary = (public_id: string, isPrimary: boolean) => {
    if (isPrimary) return;
    const updatedImages = uploadedImages.map((image) => {
      if (image.public_id === public_id) {
        return { ...image, isPrimary: true };
      }
      return { ...image, isPrimary: false };
    });
    setUploadedImages(updatedImages);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((image) => {
          return (
            <Fragment key={image.url}>
              <DeleteDialog
                open={open}
                setOpen={setOpen}
                onConfirm={() => onRemoveHandler(image.url, image.public_id)}
                infoText="delete this image"
              />
              <div className="space-y-4">
                <div className="relative h-[200px] w-[200px] overflow-hidden rounded-md ">
                  <div className="absolute right-2 top-2 z-10">
                    <Button
                      type="button"
                      onClick={() => setOpen(true)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>

                  <Image
                    fill
                    className="object-contain"
                    alt="Image"
                    src={image.url}
                  />
                </div>
                <div className="">
                  <Button
                    variant={"secondary"}
                    size={"sm"}
                    type="button"
                    onClick={() =>
                      toggleIsPrimary(image.public_id, image.isPrimary)
                    }
                    disabled={image.isPrimary}
                  >
                    <CheckCircleIcon
                      className={twMerge(
                        "h-6 w-6 text-muted-foreground/40",
                        image.isPrimary ? "text-green-600" : "",
                      )}
                    />{" "}
                    {image.isPrimary ? "Primary Image" : "Set as primary image"}
                  </Button>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
      <CldUploadWidget
        uploadPreset="xkdjouzr"
        onSuccess={(result) => {
          onUpload(result);
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
