import { useEffect, useRef, useState } from "react";
import { setupMediaPipeline,detectFace } from "../utils/utils";

function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);

  const [expression, setExpression] = useState("Neutral 😐");


  useEffect(() => {
    setupMediaPipeline({videoRef,landmarkerRef});
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="500"
      />

      <h2>{expression}</h2>

      <button onClick={()=>detectFace({videoRef,landmarkerRef,setExpression})}>
        Detect Expression
      </button>
    </div>
  );
}

export default FaceExpression;