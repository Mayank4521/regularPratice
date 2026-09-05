import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

export const setupMediaPipeline = async ({ videoRef, landmarkerRef }) => {
    try {
      // -----------------------
      // 1. SETUP CAMERA
      // -----------------------
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;

      // -----------------------
      // 2. SETUP MEDIAPIPE
      // -----------------------
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      const faceLandmarker =
        await FaceLandmarker.createFromOptions(
          vision,
          {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
            },

            runningMode: "VIDEO",
            outputFaceBlendshapes: true,
            outputFacialTransformationMatrixes: true,
            numFaces: 1,
          }
        );

      // Save MediaPipe instance
      landmarkerRef.current = faceLandmarker;

      console.log("Everything is ready 🚀");
    } catch (error) {
      console.error(error);
    }
  };

export const detectFace = ({videoRef, landmarkerRef, setExpression }) => {
    if (
      !videoRef.current ||
      !landmarkerRef.current
    ) {
      return;
    }

    const detectExpression = (data) => {
    if (
      data.mouthSmileLeft > 0.5 &&
      data.mouthSmileRight > 0.5
    ) {
      setExpression("Smiling 😄");
    } else if (data.jawOpen > 0.3) {
      setExpression("Surprised 😮");
    } else if (
      data.mouthFrownLeft > 0.01 &&
      data.mouthFrownRight > 0.01
    ) {
      setExpression("Sad 😢");
    } else {
      setExpression("Neutral 😐");
    }
  };

    const video = videoRef.current;

    if (video.readyState >= 2) {
      const result =
        landmarkerRef.current.detectForVideo(
          video,
          performance.now()
        );

      if (result.faceBlendshapes.length > 0) {
        const categories =
          result.faceBlendshapes[0].categories;

        const expressions = {};

        categories.forEach((item) => {
          expressions[item.categoryName] =
            item.score;
        });

        detectExpression(expressions);
      }
    }

  };
