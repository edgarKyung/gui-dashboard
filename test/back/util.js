function euler_to_quaternion(yaw, pitch, roll) {
  const qx = Math.cos(roll / 2) * Math.sin(pitch / 2) * Math.cos(yaw / 2) + Math.sin(roll / 2) * Math.cos(pitch / 2) * Math.sin(yaw / 2);
  const qy = Math.cos(roll / 2) * Math.cos(pitch / 2) * Math.sin(yaw / 2) - Math.sin(roll / 2) * Math.sin(pitch / 2) * Math.cos(yaw / 2);
  const qz = Math.cos(roll / 2) * Math.cos(pitch / 2) * Math.cos(yaw / 2) + Math.sin(roll / 2) * Math.sin(pitch / 2) * Math.sin(yaw / 2);
  const qw = Math.sin(roll / 2) * Math.cos(pitch / 2) * Math.cos(yaw / 2) - Math.cos(roll / 2) * Math.sin(pitch / 2) * Math.sin(yaw / 2);
  return { x: qx, y: qy, z: qz, w: qw };
}

function quaternion_to_euler(x, y, z, w) {
  let t0 = 2 * (w * x + y * z);
  let t1 = 1 - 2 * (x * x + y * y);
  let t2 = 2 * (w * y - z * x);
  t2 = t2 > 1 ? 1 : t2;
  t2 = t2 < -1 ? -1 : t2;
  let t3 = 2 * (w * z + x * y);
  let t4 = 1 - 2 * (y * y + z * z);
  return {
    x: Math.atan2(t0, t1),
    y: Math.asin(t2),
    z: Math.atan2(t3, t4)
  };
}

module.exports = {
  euler_to_quaternion: euler_to_quaternion,
  quaternion_to_euler: quaternion_to_euler
};
