import { useEffect, useState } from "react";

import * as S from "./_ConfettiBurst.styles";
import { type ConfettiBurstProps, type Particle } from "./_ConfettiBurst.types";

export function ConfettiBurst({ trigger }: ConfettiBurstProps) {
	const [particles, setParticles] = useState<Particle[]>([]);

	useEffect(() => {
		if (trigger) {
			const colors = [
				"#FBBF24",
				"#FB923C",
				"#F472B6",
				"#A78BFA",
				"#60A5FA",
				"#34D399",
				"#EF4444",
				"#10B981",
			];
			const shapes = ["●", "★", "■", "▲", "♦"];

			const newParticles = Array.from({ length: 25 }, (_, i) => ({
				id: Date.now() + i,
				x: (Math.random() - 0.5) * 250,
				y: -Math.random() * 200 - 80,
				color: colors[Math.floor(Math.random() * colors.length)],
				shape: shapes[Math.floor(Math.random() * shapes.length)],
				size: Math.random() * 16 + 16,
				rotation: Math.random() * 720,
				duration: Math.random() * 0.4 + 0.7,
			}));

			setParticles(newParticles);

			const timeout = setTimeout(() => {
				setParticles([]);
			}, 1500);

			return () => clearTimeout(timeout);
		}
	}, [trigger]);

	if (particles.length === 0) return null;

	return (
		<S.ConfettiBurst>
			{particles.map((particle) => (
				<S.ConfettiBurst_ParticleContainer
					key={particle.id}
					style={{
						// @ts-expect-error - CSS variables
						"--duration": `${particle.duration}s`,
						"--tx": `${particle.x}px`,
						"--ty": `${particle.y}px`,
						"--rotation": `${particle.rotation}deg`,
						"--particle-color": particle.color,
						"--particle-size": `${particle.size}px`,
					}}
				>
					<S.ConfettiBurst_Particle>
						{particle.shape}
					</S.ConfettiBurst_Particle>
				</S.ConfettiBurst_ParticleContainer>
			))}
		</S.ConfettiBurst>
	);
}
