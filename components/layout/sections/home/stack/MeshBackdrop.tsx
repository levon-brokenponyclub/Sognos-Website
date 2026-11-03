"use client";

import { useEffect, useRef } from "react";

// Animated "mesh drift" backdrop for the home product-stack panels (after the
// 21st.dev "dwd" shader; own implementation, 2026-11-03). Domain-warped fbm
// mapped onto a four-stop product palette (deep → base → accent → soft), with
// light grain and a soft vignette. Renders at half resolution (it is a soft
// field) and DPR ≤ 1.5, animates only while on screen, draws one still frame
// under reduced motion, and leaves the CSS gradient showing if WebGL fails.

const FRAGMENT = `precision highp float;
uniform vec2 r; uniform float t; uniform vec3 c0, c1, c2, c3;
float h(vec2 p) { p = fract(p * vec2(234.34, 435.345)); p += dot(p, p + 34.23); return fract(p.x * p.y); }
float n(vec2 p) { vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3. - 2. * f);
  return mix(mix(h(i), h(i + vec2(1., 0.)), u.x), mix(h(i + vec2(0., 1.)), h(i + vec2(1., 1.)), u.x), u.y); }
float fbm(vec2 p) { float v = 0., a = .5; for (int i = 0; i < 4; i++) { v += a * n(p); p *= 2.; a *= .5; } return v; }
vec3 pal(float x) { x = clamp(x, 0., 1.);
  if (x < .33) return mix(c0, c1, x / .33); if (x < .66) return mix(c1, c2, (x - .33) / .33); return mix(c2, c3, (x - .66) / .34); }
void main() {
  vec2 uv = gl_FragCoord.xy / r; vec2 p = uv * vec2(r.x / r.y, 1.) * 1.6; float s = t * .05;
  vec2 q = vec2(fbm(p + vec2(0., s)), fbm(p + vec2(5.2, 1.3) - s));
  vec2 w = vec2(fbm(p + 3. * q + vec2(1.7, 9.2) + s * .6), fbm(p + 3. * q + vec2(8.3, 2.8) - s * .4));
  float x = smoothstep(.15, .85, fbm(p + 2.5 * w) * 1.1 + uv.y * .25 - .1);
  vec3 col = pal(x) * mix(.85, 1., smoothstep(1.2, .2, length(uv - .5)));
  col += (h(gl_FragCoord.xy + fract(t)) - .5) * .03;
  gl_FragColor = vec4(col, 1.);
}`;

const VERTEX = "attribute vec2 a; void main() { gl_Position = vec4(a, 0., 1.); }";

const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);

export default function MeshBackdrop({ colors }: { colors: readonly [string, string, string, string] }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const gl = cv?.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!cv || !gl) return;
    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    colors.forEach((c, i) => gl.uniform3fv(gl.getUniformLocation(prog, `c${i}`), rgb(c)));
    const uR = gl.getUniformLocation(prog, "r");
    const uT = gl.getUniformLocation(prog, "t");

    const size = () => {
      const k = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5;
      cv.width = Math.max(1, Math.round(cv.clientWidth * k));
      cv.height = Math.max(1, Math.round(cv.clientHeight * k));
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(uR, cv.width, cv.height);
    };
    const draw = (sec: number) => {
      gl.uniform1f(uT, sec);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let raf = 0;
    let on = false;
    // Random start, so the three panels never show the same frame.
    const t0 = performance.now() - Math.random() * 20000;
    const loop = (now: number) => {
      draw((now - t0) / 1000);
      raf = on ? requestAnimationFrame(loop) : 0;
    };
    const onResize = () => {
      size();
      if (!on) draw(8);
    };
    size();
    draw(8);
    cv.dataset.ready = "true";
    window.addEventListener("resize", onResize);

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = still
      ? null
      : new IntersectionObserver(([e]) => {
          on = e.isIntersecting;
          if (on && !raf) raf = requestAnimationFrame(loop);
        });
    io?.observe(cv);

    return () => {
      on = false;
      cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [colors]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${colors[0]}, ${colors[1]} 45%, ${colors[2]} 75%, ${colors[3]})`,
      }}
    >
      <canvas ref={ref} className="absolute inset-0 size-full" />
    </div>
  );
}
