import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = CryptoState();

  // password matching
  function updatedKey(key, size) {
    let res = "";
    let len = key.length;
    for (let i = 0; i < size; i++) {
      let ch = key[i % len];
      let org = String.fromCharCode(
        ch.charCodeAt(0) + (Math.floor(i / len) % 26)
      );

      res += org;
    }
    return res;
  }

  function encrypt(str, key) {
    let encoded = "";
    let ksize = key.length;
    for (let i = 0; i < str.length; i++) {
      if (/[a-zA-Z]/.test(str[i])) {
        let base =
          str[i] === str[i].toUpperCase()
            ? "A".charCodeAt(0)
            : "a".charCodeAt(0);
        let kBase =
          key[i % ksize] === key[i % ksize].toUpperCase()
            ? "A".charCodeAt(0)
            : "a".charCodeAt(0);

        let ch = String.fromCharCode(
          ((str[i].charCodeAt(0) -
            base +
            (key[i % ksize].charCodeAt(0) - kBase) +
            26) %
            26) +
            base
        );

        encoded += ch;
      } else {
        encoded += str[i];
      }
    }
    return encoded;
  }

  let key = updatedKey(password, password.length);

  const plain = encrypt(password, key);

  console.log(plain);

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        style={{ backgroundColor: "#EEBC1D" }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
