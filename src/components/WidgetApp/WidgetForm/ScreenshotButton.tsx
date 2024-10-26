import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { useState } from "react";
import { Loading } from "./Loading";
import ImageKit from "imagekit";

interface ScreenshotButtonProps {
  screenshot: string | null;
  setScreenshot: (screenshot: string | null) => void;
}

export function ScreenshotButton({
  screenshot,
  setScreenshot,
}: ScreenshotButtonProps) {
  const [isTakeScreenshhot, setIsTakeScreenshot] = useState(false);

  const imagekit = new ImageKit({
    publicKey: import.meta.env.VITE_PUBLIC_KEY,
    privateKey: import.meta.env.VITE_PRIVATE_KEY,
    urlEndpoint: import.meta.env.VITE_URL_ENDPOINT,
  });

  async function handleTakeScreenshot() {
    setIsTakeScreenshot(true);
    const canvas = await html2canvas(document.querySelector("html")!);
    const base64image = canvas.toDataURL("image/png");

    imagekit.upload(
      {
        file: base64image,
        fileName: `screenshot.jpg`,
      },
      function (error, result: any) {
        if (error) {
          console.log(error);
          setIsTakeScreenshot(false);
        } else {
          setScreenshot(result?.url);
          setIsTakeScreenshot(false);
        }
      }
    );
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-center text-zinc-400 hover:text-zinc-100 transition-colors"
        onClick={() => setScreenshot(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: "right bottom",
          backgroundSize: 180,
        }}
      >
        <Trash width={"fill"} size={20} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-blue-600"
    >
      {isTakeScreenshhot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  );
}
