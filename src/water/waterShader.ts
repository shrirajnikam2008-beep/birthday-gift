export const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }
`;

/**
 * Transparent water sheet. uFront = height (0..1, bottom-up) of the waterline.
 * uVel > 0 while surging up (crest overhangs, spray flies), < 0 while draining.
 */
export const FRAG = `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
uniform float uFront;
uniform float uTime;
uniform float uVel;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1,0)), f.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
}
float fbm(vec2 p){ float v = 0.0, a = 0.5; for(int i = 0; i < 4; i++){ v += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; } return v; }

float edgeAt(float x){
  float swell = sin(x * 4.8 + uTime * 2.2) * 0.036
              + sin(x * 10.7 - uTime * 3.1) * 0.016
              + cos(x * 17.3 + uTime * 1.6) * 0.007;
  float turb = (fbm(vec2(x * 4.2, uTime * 0.85)) - 0.5) * 0.125;
  return uFront + swell + turb;
}

// Spray / droplets as lens-like beads with specular highlight & rim refraction
vec4 droplets(vec2 p, float edge, float scale, float seed){
  vec2 g = p * scale;
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;
  float h = hash(id + seed);
  float h2 = hash(id * 1.7 + seed + 3.0);
  vec2 off = (vec2(h, h2) - 0.5) * 0.55;
  float speed = uVel * 0.065;
  vec2 c = off + vec2(0.0, speed * (h2 - 0.3));
  float r = mix(0.048, 0.185, hash(id + seed + 9.0));
  float d = length(f - c);
  float cellY = (id.y + 0.5) / scale;
  float band = smoothstep(edge - 0.02, edge + 0.04, cellY) * (1.0 - smoothstep(edge + 0.06, edge + 0.34, cellY));
  float live = step(0.60, h) * band * smoothstep(0.0, 0.24, abs(uVel));
  float body = (1.0 - smoothstep(r - 0.012, r, d)) * live;
  float rim = smoothstep(r * 0.52, r, d) * body;
  vec2 hl = (f - c) / r - vec2(-0.34, 0.38);
  float spec = smoothstep(0.30, 0.0, length(hl)) * body;
  float a = body * 0.14 + rim * 0.44 + spec * 0.92;
  vec3 col = mix(vec3(0.74, 0.91, 0.98), vec3(1.0), spec);
  return vec4(col, clamp(a, 0.0, 1.0));
}

void main(){
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(vUv.x * aspect, vUv.y);
  float edge = edgeAt(vUv.x);
  // rolling crest: lip leans over while surging up
  float lip = smoothstep(0.0, 1.0, uVel) * 0.046 * (0.6 + 0.4 * sin(vUv.x * 9.0 + uTime * 2.0));
  float d = (edge + lip) - vUv.y;

  // surface height field + normal for lighting
  vec2 q = p * vec2(2.4, 2.4) + vec2(uTime * 0.25, -uTime * 0.18);
  float h0 = fbm(q), hx = fbm(q + vec2(0.02, 0.0)), hy = fbm(q + vec2(0.0, 0.02));
  vec3 n = normalize(vec3((h0 - hx) * 9.2, (h0 - hy) * 9.2, 1.0));
  vec3 L = normalize(vec3(-0.38, 0.62, 0.69));
  float spec = pow(max(dot(reflect(-L, n), vec3(0,0,1)), 0.0), 52.0);
  float fresnel = pow(1.0 - max(n.z, 0.0), 2.4);

  float inside = smoothstep(-0.004, 0.006, d);
  float depth = clamp(d / 0.52, 0.0, 1.0);

  // dual-interference caustic network
  float c1 = abs(fbm(q * 1.6 + uTime * 0.35) - 0.5);
  float c2 = abs(fbm(q * 2.3 - uTime * 0.28 + 4.2) - 0.5);
  float caustic = pow(1.0 - smoothstep(0.0, 0.075, min(c1, c2)), 2.1);

  vec3 shallow = vec3(0.82, 0.95, 0.99);
  vec3 deep = vec3(0.52, 0.81, 0.93);
  vec3 col = mix(shallow, deep, depth);
  col += caustic * 0.19 + spec * 0.92 + fresnel * 0.15;
  float alpha = (0.15 + depth * 0.21 + caustic * 0.065) * inside;
  alpha += spec * 0.52 * inside;

  // surface-tension rim + organic crest foam
  float rim = smoothstep(0.036, 0.0, abs(d - 0.006)) * inside;
  float foam = rim * (0.56 + 0.44 * fbm(p * 14.5 + uTime));
  col = mix(col, vec3(1.0), foam);
  alpha = max(alpha, foam * 0.86);

  // underside darkening just inside the rim gives the glassy meniscus
  float meniscus = smoothstep(0.0, 0.05, d) * (1.0 - smoothstep(0.05, 0.16, d));
  col *= 1.0 - meniscus * 0.085;

  vec4 res = vec4(col, alpha);
  vec4 s1 = droplets(p, edge, 14.0, 1.0);
  vec4 s2 = droplets(p + 3.1, edge, 25.0, 7.0);
  vec4 s3 = droplets(p + 6.7, edge, 38.0, 13.0);
  vec4 sp = mix(s1, s2, step(s1.a, s2.a));
  sp = mix(sp, s3, step(sp.a, s3.a));
  float a = sp.a + res.a * (1.0 - sp.a);
  vec3 c = (sp.rgb * sp.a + res.rgb * res.a * (1.0 - sp.a)) / max(a, 0.0001);

  gl_FragColor = vec4(c * a, a); // premultiplied
}
`;
