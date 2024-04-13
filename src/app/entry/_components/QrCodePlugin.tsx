import { useEffect, useRef, useState } from "react";

// Qr Scanner
import QrScanner from "qr-scanner";

const QrReader = (props: {
  onScanSuccess: (result: string | null) => void;
}) => {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  useEffect(() => {

    // Success
    const onScanSuccess = (result: QrScanner.ScanResult) => {
      // ✅ Handle success.
      scanner.current?.stop();
      props.onScanSuccess(result.data);
    };

    // Fail
    const onScanFail = (err: string | Error) => {
      // 🖨 Print the "err" to browser console.
      // console.log(err);
    };


    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
        maxScansPerSecond: 5,
        returnDetailedScanResult: true,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => {
          // ask for camera permission
          navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            setQrOn(true);
          }).catch((err) => {
            // if (err) setQrOn(false);
          });
        })
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl) {
        scanner?.current?.stop();
      }
    };
  }, [props]);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    // Make the video section take up the whole div
    <div className="qr-reader h-full flex flex-col justify-center items-center w-full mx-auto">
      {/* QR */}
      <video 
      className="h-full"
      ref={videoEl} />
    </div>
  );
};

export default QrReader;