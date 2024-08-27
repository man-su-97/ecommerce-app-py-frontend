import { useEffect, useState } from "react";
import { Rect, useRect } from "react-use-rect";

const SlideText = ({ source }: { source: string[] }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [rectRef] = useRect(setRect);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("int");
      setCurrentItemIndex((index) =>
        index === source.length - 1 ? 0 : index + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [currentItemIndex, source]);

  return (
    <div
      style={{
        display: "inline-flex",
        overflow: "hidden",
        position: "relative",
        width: `${rect?.width}px`,
        transition: "all 0.5s ease-out",
      }}
    >
      <span style={{ visibility: "hidden" }}>{source[currentItemIndex]}</span>
      {source.map((text, index) => (
        <span
          ref={currentItemIndex === index ? rectRef : null}
          style={{
            position: "absolute",
            top: (rect?.height ?? 0) * 2,
            transform: `translateY(${
              currentItemIndex === index ? `-${(rect?.height ?? 0) * 2}px` : 0
            })`,
            transition: "all 1s ease-in-out",
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
};

export default SlideText;
