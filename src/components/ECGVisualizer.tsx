
import { useEffect, useRef, useState } from 'react';
import { ECGDataPoint } from '@/lib/mockData';

interface ECGVisualizerProps {
  data: ECGDataPoint[];
  width?: number;
  height?: number;
  lineColor?: string;
  animated?: boolean;
  label?: string;
}

const ECGVisualizer = ({
  data,
  width = 800,
  height = 200,
  lineColor = 'rgb(16, 185, 129)',
  animated = true,
  label
}: ECGVisualizerProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Normalize data to fit in the view
  const normalizedData = () => {
    if (!data.length) return [];
    
    // Find min and max values
    const minValue = Math.min(...data.map(point => point.value));
    const maxValue = Math.max(...data.map(point => point.value));
    const range = maxValue - minValue;
    
    // Calculate padding
    const padding = range * 0.1;
    
    // Normalize to fit in height with padding
    return data.map((point, index) => {
      const normalizedY = height - ((point.value - minValue + padding) / (range + 2 * padding)) * height;
      return {
        x: (index / (data.length - 1)) * width,
        y: normalizedY
      };
    });
  };

  const pathData = () => {
    const points = normalizedData();
    if (!points.length) return '';
    
    // If animated, only show up to the animation progress
    const pointsToShow = animated
      ? points.slice(0, Math.floor(points.length * animationProgress))
      : points;
    
    return pointsToShow.map((point, i) => {
      return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    }).join(' ');
  };

  // Animation effect
  useEffect(() => {
    if (!animated) return;
    
    let animationFrame: number;
    let startTime: number | null = null;
    const animationDuration = 4000; // 4 seconds
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      setAnimationProgress(progress);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Loop the animation
        startTime = null;
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [animated, data]);

  return (
    <div className="relative">
      {label && (
        <div className="absolute top-2 left-4 bg-background/80 px-2 py-1 rounded text-xs font-medium">
          {label}
        </div>
      )}
      <div className="ecg-grid rounded-lg overflow-hidden border">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full"
        >
          {/* ECG line */}
          <path
            d={pathData()}
            fill="none"
            stroke={lineColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={animated ? "ecg-line" : ""}
          />
        </svg>
      </div>
    </div>
  );
};

export default ECGVisualizer;
