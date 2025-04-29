// hooks/useImageDraggable.jsx
import { useState, useEffect } from "react";

export default function useImageDraggable(initialImages, containerRef) {
  const [images, setImages] = useState(initialImages || []);
  const [activeImageId, setActiveImageId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [initialMouse, setInitialMouse] = useState({ x: 0, y: 0 });

  const startDrag = (id, e) => {
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDragOffset({ x: offsetX, y: offsetY });
    setActiveImageId(id);
    setIsResizing(false);

    setImages(
      images.map((image) =>
        image.id === id ? { ...image, isDragging: true } : image
      )
    );

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const startResize = (id, e) => {
    e.preventDefault();
    e.stopPropagation();

    const image = images.find((img) => img.id === id);

    setActiveImageId(id);
    setIsResizing(true);
    setInitialSize({ width: image.width, height: image.height });
    setInitialMouse({ x: e.clientX, y: e.clientY });

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (activeImageId === null || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    if (isResizing) {
      // Calculando o novo tamanho baseado no movimento do mouse
      const deltaX = e.clientX - initialMouse.x;
      const deltaY = e.clientY - initialMouse.y;

      // Manter a proporção enquanto redimensiona
      const aspectRatio = initialSize.height / initialSize.width;
      const newWidth = Math.max(30, initialSize.width + deltaX);
      const newHeight = Math.max(30, newWidth * aspectRatio);

      setImages((prevImages) =>
        prevImages.map((image) =>
          image.id === activeImageId
            ? { ...image, width: newWidth, height: newHeight }
            : image
        )
      );
    } else {
      // Movendo a imagem
      const newX = e.clientX - containerRect.left - dragOffset.x;
      const newY = e.clientY - containerRect.top - dragOffset.y;

      setImages((prevImages) =>
        prevImages.map((image) =>
          image.id === activeImageId ? { ...image, x: newX, y: newY } : image
        )
      );
    }
  };

  const handleMouseUp = () => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.id === activeImageId ? { ...image, isDragging: false } : image
      )
    );

    setActiveImageId(null);
    setIsResizing(false);

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeImageId, isResizing]);

  return {
    images,
    setImages,
    startDrag,
    startResize,
    activeImageId,
  };
}
