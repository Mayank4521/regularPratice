import { useEffect, useRef, useState } from "react";
import { setupMediaPipeline,detectFace } from "../utils/utils";


function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);



  const [expression, setExpression] = useState("Detecting...");

    useEffect(() => {
    setupMediaPipeline({videoRef,landmarkerRef});
  }, []);

  function handleClick() {
    const detectedExpression = detectFace({
      landmarkerRef,
      videoRef,
      setExpression,
    });

    if (detectedExpression) {
      onClick(detectedExpression);
    }
  }

  return (
    <div className="expression-container">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="500"
      />

      <h2>{expression}</h2>

      <button onClick={handleClick}>
        Detect Expression
      </button>
    </div>
  );
}

export default FaceExpression;