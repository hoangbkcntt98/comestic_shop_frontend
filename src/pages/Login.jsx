import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import Breadcrumb from "../components/bread-cumb/BreadCumb";
import { setLinks } from "../redux/product/ProductSlice";
import userServices from "../services/userServices";
import { checkLength } from "../utils/checkLength";
import { Status, checkStatus } from "../status";
import { error, success, warn } from "../components/noti/noti";
import CookieService from "../services/cookieServices";
import { loginValidationSchema } from "../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { ApiUrl } from "../services/constant";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        MinimumShop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    console.log(formData);
    // alert('login')
    let res = await userServices.login(formData);
    console.log(res);
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });
  React.useEffect(() => {
    const fetchUser = async () => {
      let data = await userServices.fetchUser();
      console.log(data);
    };
    fetchUser();
  }, []);
  React.useEffect(() => {
    dispatch(
      setLinks([
        {
          display: "Dang nhap",
          link: "/login",
        },
      ])
    );
  }, []);
  return (
    <React.Fragment>
      <Breadcrumb />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",

              borderRadius: "10px",
              p: 2,

              paddingBottom: 3,
              boxShadow:
                "2px 2px 2px 4px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
            }}
          >
            <Typography component="h1" variant="h5">
              Đăng Nhập Tài Khoản
            </Typography>

            <Box
              noValidate
              sx={{ mt: 1 }}
              style={{ display: "block", width: "90%" }}
            >
              <hr className="login__hr-title" />
              <div className="login__social">
                <a
                  href="http://localhost/api/auth/google"
                  className="login__social__button login__social__button__gg"
                >
                  <i className="bx bxl-google-plus"></i>
                  <div className="login__social__button__divider"></div>
                  <div className="login__social__button__text">Google</div>
                </a>
                <a
                  href="http://localhost/api/auth/facebook"
                  className="login__social__button login__social__button__fb"
                >
                  <i className="bx bxl-facebook"></i>
                  <div className="login__social__button__divider"></div>
                  <div className="login__social__button__text">Facebook</div>
                </a>
              </div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Địa chỉ Email"
                name="email"
                // onChange={handleEmail}
                {...register("email")}
                helperText={errors.email?.message}
                error={errors.email ? true : false}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                type="password"
                fullWidth
                id="password"
                label="Mật khẩu"
                name="password"
                // onChange={handlePassword}
                {...register("password")}
                helperText={errors.password?.message}
                error={errors.password ? true : false}
                autoFocus
              />
              <div className="login__button">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  // onClick={handleSubmit}
                  onClick={handleSubmit(onSubmit)}
                  sx={{
                    // mt: 3,
                    // mb: 2,
                    border: "1px solid #ed71a3",
                    backgroundColor: "#ed71a3",
                    color: "white",
                    borderRadius: "50px",
                    width: "50%",
                  }}
                >
                  Đăng Nhập
                </Button>
              </div>

              <hr className="login__hr-title" />
              <Grid container className="login__footer">
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Quên mật khẩu
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    <p>Bạn chưa có tài khoản ?</p>
                    <p>Đăng kí tại đây</p>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
