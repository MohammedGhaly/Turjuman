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

  const drawVisualizer = () => {
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
      const radius = Math.max(45 / 1.5, Math.min(avg, 62));

      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      ctx.beginPath();
      ctx.arc(
        canvasRef.current!.width / 2,
        canvasRef.current!.height / 2,
        radius,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = "rgba(0, 128, 255, 0.5)";
      ctx.fill();
    };

    draw();
  };

  const startRecording = async () => {
    console.log("started recording");
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const context = new (window.AudioContext || window.AudioContext)();
    const analyser = context.createAnalyser();
    const source = context.createMediaStreamSource(stream);

    void context.resume();
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
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorder?.stop();
    if (audioContextRef.current) {
      void audioContextRef.current.close();
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className="border z-10 absolute border-gray-300 rounded-full p-2 hover:shadow-lg transition-all duration-200 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
      >
        <Mic className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />
      </button>
      <canvas
        ref={canvasRef}
        width={125}
        height={125}
        className="border rounded-lg absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
      />
    </div>
  );
}

export default AudioRecorder;
