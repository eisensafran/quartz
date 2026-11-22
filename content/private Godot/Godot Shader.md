Einfacher Nebel Shader

Vorher

1. Enable **Volumetric Fog** in your `WorldEnvironment`.
2. Add a `FogVolume`.
3. Set its **Material** to a new `ShaderMaterial`.
4. Paste this shader into that material.
5. Increase `density` for thicker fog, lower `height_falloff` for more uniform fog, and raise `edge_softness` for softer volume edges.


```gdscript
shader_type fog;

uniform float density : hint_range(0.0, 2.0, 0.01) = 0.25;
uniform vec4 fog_color : source_color = vec4(0.75, 0.85, 1.0, 1.0);

uniform float height_falloff : hint_range(0.0, 8.0, 0.1) = 1.5;
uniform float edge_softness : hint_range(0.001, 2.0, 0.01) = 0.5;

void fog() {
	// SDF is negative inside the FogVolume and approaches 0 at the edge.
	float edge_fade = smoothstep(0.0, edge_softness, -SDF);

	// UVW.y is 0 at the bottom of the volume and 1 at the top.
	float height_fade = exp(-UVW.y * height_falloff);

	DENSITY = density * edge_fade * height_fade;
	ALBEDO = fog_color.rgb;
	EMISSION = vec3(0.0);
}
```

### Erklärungen
Was macht `: hint_range(0.0, 2.0, 0.01)`? -> exponiert diesen Parameter an den Inspector auf der Seite (zu finden unter *Shader Parameters* im Shader Material