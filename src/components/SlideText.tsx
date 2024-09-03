import { useEffect, useState } from "react";
import { Rect, useRect } from "react-use-rect";

const SlideText = ({ source }: { source: string[] }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [rectRef] = useRect(setRect);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItemIndex((index) =>
        index === source.length - 1 ? 0 : index + 1
      );
    }, 4000); // Keep a longer interval to accommodate the stay duration
    return () => clearInterval(interval);
  }, [source]);

  return (
    <div
      style={{
        display: "inline-flex",
        overflow: "hidden",
        position: "relative",
        width: "100%", // Use full screen width
        height: `${rect?.height}px`,
      }}
    >
      <span style={{ visibility: "hidden" }}>{source[currentItemIndex]}</span>
      {source.map((text, index) => (
        <span
          key={index}
          ref={currentItemIndex === index ? rectRef : null}
          style={{
            position: "absolute",
            top: 0,
            left: currentItemIndex === index ? "50%" : "-100%", // Start off-screen to the left, exit to the left
            transform: `translateX(${
              currentItemIndex === index ? "-50%" : "0%"
            })`,
            transition:
              currentItemIndex === index
                ? "left 1s ease-in-out, transform 1s ease-in-out"
                : "left 1s ease-in-out",
            whiteSpace: "nowrap",
            opacity: currentItemIndex === index ? 1 : 0,
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
};

export default SlideText;
