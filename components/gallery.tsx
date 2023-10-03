"use client";

import React, { useState, useEffect } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import NextJsImage from "./nextjs-image-render";

export default function Gallery({ images }: { images: any }) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <PhotoAlbum
        layout="masonry"
        photos={images.map((image: any) => ({
          src: image.secure_url,
          width: image.width,
          height: image.height,
        }))}
        renderPhoto={NextJsImage}
        targetRowHeight={150}
        sizes={{ size: "calc(100vw - 240px)" }}
        onClick={({ index: current }) => setIndex(current)}
      />

      <Lightbox
        index={index}
        slides={images.map((image: any) => ({
          src: image.secure_url,
          width: image.width,
          height: image.height,
          caption: image.filename,
        }))}
        open={index >= 0}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Zoom, Thumbnails, Captions]}
      />
    </>
  );
}
