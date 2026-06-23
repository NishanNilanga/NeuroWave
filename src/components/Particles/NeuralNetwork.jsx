import { Line } from "@react-three/drei";

export default function NeuralNetwork() {
const nodes = [
[-4, 2, 0],
[-2, 1, 0],
[0, 2, 0],
[2, 1, 0],
[4, 2, 0],

[-3, -1, 0],
[0, -2, 0],
[3, -1, 0],

];

const links = [
[0, 1],
[1, 2],
[2, 3],
[3, 4],

[1, 5],
[2, 6],
[3, 7],

[5, 6],
[6, 7],

];

return (
<>
{links.map((link, i) => (
<Line
key={i}
points={[
nodes[link[0]],
nodes[link[1]],
]}
color="#00ffff"
lineWidth={1}
/>
))}
</>
);
}