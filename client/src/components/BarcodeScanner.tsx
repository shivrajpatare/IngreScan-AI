import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface BarcodeScannerProps {
  onScanSuccess: (barcode: string) => void;
  onClose: () => void;
}

const SCANNER_ID = "barcode-scanner-container";

export function BarcodeScanner({ onScanSuccess, onClose }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startScanning = async () => {
    setIsInitializing(true);
    try {
      // Ensure container exists
      if (!containerRef.current) {
        throw new Error("Scanner container not found");
      }

      // Create scanner instance
      const scanner = new Html5Qrcode(SCANNER_ID);
      scannerRef.current = scanner;

      // Start scanning
      await scanner.start(
        { facingMode: "environment" }, // Use back camera
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          // Successfully scanned
          onScanSuccess(decodedText);
          stopScanning();
        },
        (errorMessage) => {
          // Scanning errors (ignore most of them as they're just "no barcode found")
          console.debug("Scan error:", errorMessage);
        }
      );

      setIsScanning(true);
      setIsInitializing(false);
    } catch (err) {
      console.error("Error starting scanner:", err);
      toast.error("Failed to start camera. Please check permissions.");
      setIsInitializing(false);
      onClose();
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
    setIsScanning(false);
    scannerRef.current = null;
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Barcode Scanner
            </CardTitle>
            <CardDescription>
              Point your camera at a product barcode
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isScanning && !isInitializing && (
          <div className="text-center py-8">
            <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-4">
              Click the button below to start scanning
            </p>
            <Button onClick={startScanning} className="w-full">
              <Camera className="mr-2 h-4 w-4" />
              Start Camera
            </Button>
          </div>
        )}

        {isInitializing && (
          <div className="text-center py-8">
            <Loader2 className="h-16 w-16 mx-auto mb-4 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">
              Initializing camera...
            </p>
          </div>
        )}

        {isScanning && (
          <div className="space-y-4">
            <div 
              ref={containerRef}
              id={SCANNER_ID} 
              className="rounded-lg overflow-hidden border bg-black" 
              style={{ width: "100%", height: "300px" }} 
            />
            <p className="text-sm text-center text-muted-foreground">
              Position the barcode within the frame
            </p>
            <Button variant="outline" onClick={stopScanning} className="w-full">
              Stop Scanning
            </Button>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Tip:</strong> Make sure the barcode is well-lit and clearly visible. The scanner works with most standard barcodes (EAN-13, UPC-A, etc.).
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
