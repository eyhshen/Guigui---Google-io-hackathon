import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Icon } from '../np/ui';
import { scanProductImage } from '../api';
import { ScanResult } from '../types';

interface ScannerProps {
  onScanSuccess: (result: ScanResult) => void;
  onCancel: () => void;
}

const CORNERS = [
  { top: '15%', left: '13%', edges: ['top', 'left'], r: '10px 0 0 0' },
  { top: '15%', right: '13%', edges: ['top', 'right'], r: '0 10px 0 0' },
  { bottom: '15%', left: '13%', edges: ['bottom', 'left'], r: '0 0 0 10px' },
  { bottom: '15%', right: '13%', edges: ['bottom', 'right'], r: '0 0 10px 0' },
] as const;

export function Scanner({ onScanSuccess, onCancel }: ScannerProps) {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const captureAndScan = useCallback(async () => {
    if (webcamRef.current) {
      try {
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
          setError('未捕捉到画面，请确保相机已开启，或使用下方本地上传。');
          return;
        }

        // Freeze the frame the instant the shutter fires so the user sees the shot was taken.
        setCapturedImage(imageSrc);
        setIsScanning(true);
        setError(null);
        const result = await scanProductImage(imageSrc);
        onScanSuccess(result);
      } catch (err: any) {
        setError(err.message || '扫描失败，请重试或直接上传清晰照片。');
        setIsScanning(false);
        setCapturedImage(null);
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
    <div style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', background: 'var(--bg-scan)' }}>
      {/* Top bar: back + eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 0' }}>
        <button
          onClick={onCancel}
          style={{ font: 'inherit', fontSize: 12, color: 'var(--ink)', background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 999, padding: '8px 15px', cursor: 'pointer' }}
        >
          返回
        </button>
        <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--dim)' }}>
          SCAN · AI 空间感知扫描
        </span>
      </div>

      {/* Viewfinder */}
      <div style={{ flex: 1, position: 'relative', margin: '16px 20px 6px', borderRadius: 26, overflow: 'hidden', background: 'radial-gradient(120% 90% at 50% 30%, #232033 0%, #141220 60%, #0D0C13 100%)', border: '1px solid var(--line)' }}>
        {!permissionError ? (
          // @ts-ignore react-webcam ref typing
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: 'environment' }}
            onUserMediaError={onUserMediaError}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center', color: 'var(--ink)' }}>
            <Icon name="HelpCircle" size={44} style={{ color: 'var(--dim)', marginBottom: 16 }} />
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>未检测到相机或权限受限</p>
            <p style={{ fontSize: 11.5, color: 'var(--muted)', maxWidth: 280, lineHeight: 1.7 }}>
              第一次使用时浏览器会询问相机权限，请点「允许」。如果之前拒绝过，需要在浏览器地址栏的站点设置里重新开启相机；也可以直接点下方「上传照片」。
            </p>
          </div>
        )}

        {/* Frozen still: shown the moment the shutter fires as confirmation the photo was taken */}
        {capturedImage && (
          <img
            src={capturedImage}
            alt="已拍摄画面"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}

        {/* Corner guides */}
        {!permissionError && CORNERS.map((c, i) => (
          <i key={i} style={{
            position: 'absolute', width: 26, height: 26, borderRadius: c.r,
            top: (c as any).top, bottom: (c as any).bottom, left: (c as any).left, right: (c as any).right,
            borderStyle: 'solid', borderColor: 'rgba(241,237,247,.85)', borderWidth: 0,
            ...(c.edges.includes('top' as never) ? { borderTopWidth: 2.5 } : {}),
            ...(c.edges.includes('bottom' as never) ? { borderBottomWidth: 2.5 } : {}),
            ...(c.edges.includes('left' as never) ? { borderLeftWidth: 2.5 } : {}),
            ...(c.edges.includes('right' as never) ? { borderRightWidth: 2.5 } : {}),
          }} />
        ))}

        {/* Error / helper caption at viewfinder bottom */}
        {error ? (
          <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16, textAlign: 'center', fontSize: 11.5, fontWeight: 600, color: 'var(--on-prism)', background: 'rgba(240,138,155,.9)', borderRadius: 14, padding: '9px 14px', backdropFilter: 'blur(8px)' } as React.CSSProperties}>
            {error}
          </div>
        ) : (
          <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center', fontSize: 11.5, color: 'var(--muted)', letterSpacing: '.04em' }}>
            {isScanning ? '识别中… Gemini 在读瓶身' : '对准化妆品正面或标签，让它认出这是什么'}
          </div>
        )}
      </div>

      {/* Bottom controls: upload · shutter · caption */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 24px calc(18px + var(--sab))' }}>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isScanning}
          style={{ width: 92, font: 'inherit', fontSize: 11.5, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, textAlign: 'left', opacity: isScanning ? 0.5 : 1 }}
        >
          <Icon name={isScanning ? 'RefreshCw' : 'Upload'} size={15} />
          {permissionError ? '本地相册' : '上传照片'}
        </button>

        <button
          onClick={captureAndScan}
          aria-label="拍照识别"
          disabled={isScanning || permissionError}
          style={{ width: 74, height: 74, borderRadius: '50%', background: 'var(--prism)', border: 'none', cursor: isScanning || permissionError ? 'default' : 'pointer', position: 'relative', boxShadow: 'var(--shutter-ring)', opacity: permissionError ? 0.4 : 1 }}
        >
          <span style={{ position: 'absolute', inset: 6, borderRadius: '50%', border: '2.5px solid var(--on-prism)' }} />
        </button>

        <div style={{ width: 92, fontSize: 11, color: 'var(--dim)', textAlign: 'right', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
          {isScanning ? '✨ AI 解析\n包装信息…' : '秒级分析品牌\n成分及 PAO'}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
}
