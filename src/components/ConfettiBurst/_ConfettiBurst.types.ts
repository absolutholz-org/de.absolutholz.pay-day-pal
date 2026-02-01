export interface ConfettiBurstProps {
  trigger: boolean;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  shape: string;
  size: number;
  rotation: number;
  duration: number;
}
