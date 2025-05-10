import useTranslationPage from "@/hooks/useTranslationPage";
import { Mic } from "lucide-react";
import { useRef, useState } from "react";

function AudioRecorder() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const audioChunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);

  const { optionTranslate } = useTranslationPage();

  function drawVisualizer() {
    if (!analyserRef.current || !dataArrayRef.current || !canvasRef.current)
      return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyserRef.current!.getByteFrequencyData(dataArrayRef.current!);
      const avg =
        dataArrayRef.current!.reduce((sum, val) => sum + val, 0) /
        dataArrayRef.current!.length;
      // const radius = Math.max(30, Math.min(avg / 2 + 20, 62));
      const radius = Math.min(30 + avg / 2, 62);

      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      ctx.beginPath();
      ctx.arc(
        canvasRef.current!.width / 2,
        canvasRef.current!.height / 2,
        radius,
        0,
        2 * Math.PI
      );
      // ctx.fillStyle = "rgba(0, 128, 255, 0.5)";

      const gradient = ctx.createRadialGradient(
        canvasRef.current!.width / 2,
        canvasRef.current!.height / 2,
        10, // inner radius
        canvasRef.current!.width / 2,
        canvasRef.current!.height / 2,
        radius // outer radius
      );
      gradient.addColorStop(0, "rgba(4, 0, 255, 0.8)"); // center
      gradient.addColorStop(0.5, "rgba(111, 0, 255, 0.4)"); // center
      gradient.addColorStop(1, "rgba(255, 0, 200, 0.01)"); // center

      ctx.fillStyle = gradient;

      ctx.fill();
    };

    draw();
  }

  function clearCanvas() {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
  }

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const context = new (window.AudioContext || window.AudioContext)();
    const analyser = context.createAnalyser();
    const source = context.createMediaStreamSource(stream);

    context.resume();
    analyser.fftSize = 256;
    source.connect(analyser);

    audioContextRef.current = context;
    analyserRef.current = analyser;
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

    // Setup MediaRecorder
    const recorder = new MediaRecorder(stream);
    audioChunksRef.current = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    recorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      const file = new File([audioBlob], "recording.webm", {
        type: "audio/webm",
      });
      optionTranslate?.(file, true);
    };

    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
    drawVisualizer();
  }

  async function stopRecording() {
    setIsRecording(false);
    if (mediaRecorder?.stream) {
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      mediaRecorder.stop();
    }
    mediaRecorder?.stop();
    if (audioContextRef.current) {
      void audioContextRef.current.close();
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    clearCanvas();
  }

  return (
    <div className="relative">
      <div
        className={`${
          isRecording && "gradient-border-sm"
        } p-[2px] rounded-full z-10 relative`}
      >
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`border ${
            isRecording ? "border-transparent" : "border-gray-300"
          } rounded-full p-2 hover:shadow-lg transition-all duration-200 bg-[var(--background)]`}
        >
          <Mic className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={125}
        height={125}
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
      />
    </div>
  );
}

export default AudioRecorder;
