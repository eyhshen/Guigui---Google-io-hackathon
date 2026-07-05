import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, Upload, Sparkles, HelpCircle } from 'lucide-react';
import { scanProductImage } from '../api';
import { ScanResult } from '../types';

interface ScannerProps {
  onScanSuccess: (result: ScanResult) => void;
  onCancel: () => void;
}

export function Scanner({ onScanSuccess, onCancel }: ScannerProps) {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState(false);

  const captureAndScan = useCallback(async () => {
    if (webcamRef.current) {
      try {
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
          setError('未捕捉到画面，请确保相机已开启，或使用下方本地上传。');
          return;
        }

        setIsScanning(true);
        setError(null);
        const result = await scanProductImage(imageSrc);
        onScanSuccess(result);
      } catch (err: any) {
        setError(err.message || '扫描失败，请重试或直接上传清晰照片。');
        setIsScanning(false);
      }
    }
  }, [webcamRef, onScanSuccess]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      try {
        const result = await scanProductImage(base64String);
        onScanSuccess(result);
      } catch (err: any) {
        setError(err.message || 'AI 识别失败，请确保图片清晰且包含完整品牌及成分。');
        setIsScanning(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const onUserMediaError = () => {
    setPermissionError(true);
  };

  return (
    <div className="absolute inset-0 z-50 bg-stone-950 flex flex-col">
      <div className="relative flex-1 overflow-hidden flex flex-col justify-between">
        
        {/* Webcam View */}
        {!permissionError ? (
          /* @ts-ignore */
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "environment" }}
            onUserMediaError={onUserMediaError}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900 p-8 text-center text-white/90">
            <HelpCircle className="w-12 h-12 text-stone-400 mb-4 animate-pulse" />
            <p className="text-sm font-semibold mb-2">未检测到相机或权限受限</p>
            <p className="text-xs text-stone-400 max-w-xs leading-relaxed">
              在 iframe 预览环境中，浏览器默认会阻止摄像头调用。建议点击下方「上传照片」或直接在独立标签页中打开本应用。
            </p>
          </div>
        )}
        
        {/* Overlay guides */}
        {!permissionError && (
          <div className="absolute inset-0 border-[45px] border-stone-950/70 flex items-center justify-center pointer-events-none">
            <div className="w-full h-1/2 border border-white/40 rounded-3xl relative">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white rounded-tl-xl -mt-0.5 -ml-0.5"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white rounded-tr-xl -mt-0.5 -mr-0.5"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white rounded-bl-xl -mb-0.5 -ml-0.5"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white rounded-br-xl -mb-0.5 -mr-0.5"></div>
            </div>
          </div>
        )}

        {/* Top bar */}
        <div className="relative z-10 p-6 flex justify-between items-start">
          <button 
            onClick={onCancel}
            className="px-4 py-2 bg-black/40 text-white rounded-full text-xs font-medium backdrop-blur-md hover:bg-white hover:text-stone-900 transition-colors shadow-sm"
          >
            返回
          </button>
          
          <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] text-white/80 font-medium uppercase tracking-wider">
            AI 空间感知扫描
          </div>
        </div>

        {/* Bottom controls */}
        <div className="relative z-10 p-8 flex flex-col items-center justify-end bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent">
          {error && (
            <div className="mb-6 mx-4 px-4 py-3 bg-red-500/90 text-white text-xs font-medium rounded-2xl text-center backdrop-blur-md shadow-lg max-w-xs">
              {error}
            </div>
          )}
          
          <div className="flex items-center gap-6 mb-6">
            {/* Native camera trigger */}
            {!permissionError && (
              <button
                onClick={captureAndScan}
                disabled={isScanning}
                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white backdrop-blur-sm active:scale-95 transition-transform shadow-xl"
              >
                {isScanning ? (
                  <RefreshCw className="w-6 h-6 text-white animate-spin" />
                ) : (
                  <div className="w-11 h-11 bg-white rounded-full shadow-inner" />
                )}
              </button>
            )}

            {/* File Upload Trigger */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isScanning}
              className="flex items-center gap-2 bg-white text-stone-900 font-medium text-xs px-5 py-3 rounded-full hover:bg-stone-100 shadow-lg active:scale-95 transition-all"
            >
              {isScanning ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              {permissionError ? '本地相册选择 / 拍摄' : '上传照片识别'}
            </button>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
          
          <p className="text-white/60 text-xs text-center max-w-xs leading-relaxed">
            {isScanning 
              ? '✨ AI 正在为您深度解析包装信息...' 
              : '对准化妆品正面或上传标签图，秒级自动分析品牌、成分及PAO。'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
