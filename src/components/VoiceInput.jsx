import { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const VoiceInput = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    const fetchGroqReply = async () => {
      if (!transcript) return;

      try {
      
        const data = await res.json();  const res = await fetch("/api/voiceAgent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: transcript }),
        });

        const reply = data.reply;

        // Speak it out
        const utterance = new SpeechSynthesisUtterance(reply);
        speechSynthesis.speak(utterance);
      } catch (error) {
        console.error("Groq AI Error:", error);
      }

      resetTranscript();
    };

    if (!listening && transcript) {
      fetchGroqReply();
    }
  }, [listening, transcript, resetTranscript]);

  const handleClick = () => {
    SpeechRecognition.startListening({ continuous: false });
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser doesn’t support speech recognition.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow"
      >
        {listening ? "Listening..." : "🎙️ Speak to EMBPROTO-AI"}
      </button>
      {transcript && <p className="text-sm text-gray-600">You said: {transcript}</p>}
    </div>
  );
};

export default VoiceInput;
