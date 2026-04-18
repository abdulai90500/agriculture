import { loginUser } from "../app/auth/actions";
async function test() {
  const fd = new FormData();
  fd.append("email", "admin@mne-agriculture.com");
  fd.append("password", "admin123");
  const res = await loginUser(fd);
  console.log("Login result:", res);
}
test();
