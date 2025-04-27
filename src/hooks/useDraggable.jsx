import { useState, useEffect } from "react";

export default function useDraggable(initialFields, containerRef) {
  const [fields, setFields] = useState(initialFields);
  const [activeFieldId, setActiveFieldId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const startDrag = (id, e) => {
    e.preventDefault();

    const field = fields.find((f) => f.id === id);

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDragOffset({ x: offsetX, y: offsetY });
    setActiveFieldId(id);

    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, isDragging: true } : field
      )
    );

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (activeFieldId !== null && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();

      const newX = e.clientX - containerRect.left - dragOffset.x;
      const newY = e.clientY - containerRect.top - dragOffset.y;

      setFields((prevFields) =>
        prevFields.map((field) =>
          field.id === activeFieldId ? { ...field, x: newX, y: newY } : field
        )
      );
    }
  };

  const handleMouseUp = () => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === activeFieldId ? { ...field, isDragging: false } : field
      )
    );

    setActiveFieldId(null);

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeFieldId]);

  return {
    fields,
    setFields,
    startDrag,
    activeFieldId,
  };
}
