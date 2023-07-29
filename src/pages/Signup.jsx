import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import Breadcrumb from '../components/bread-cumb/BreadCumb';
import { setLinks } from '../redux/product/ProductSlice';
import userServices from '../services/userServices';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkStatus, Status } from '../status';
import { error,success } from '../components/noti/noti';
import CookieService from '../services/cookieServices';
import { signupValidationSchema } from '../utils/validationSchema';
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                MinimumShop
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Signup() {

    const dispatch = useDispatch()
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(signupValidationSchema)
    });
    const onSubmit = async (formData) => {
        let res = await userServices.signup(formData);
        console.log(res)
        // if(checkStatus(res?.status)){
        //     success(res.message)
        //     let token =res.data.token.accessToken
        //     let expires = new Date(res.data.token.token.expires_at)
        //     console.log(expires)
        //     CookieService.set('token',token,{
        //         path:'/',
        //         expires: expires
        //         // add sercure while deploy 
        //     })
        //     console.log(CookieService.getAll())
        // }else{
        //     error(res.message)
        // }
        
    };

    React.useEffect(() => {
        dispatch(setLinks([{
            display: "Đăng kí",
            link: '/signup'
        }]))
    }, [])
    return (
        <React.Fragment>
            <Breadcrumb />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="md" >
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            border: 'mediu',
                            borderRadius: '10px',
                            p: 2,
                            paddingBottom: 3,
                            boxShadow: "2px 2px 2px 4px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Đăng Kí Tài Khoản
                        </Typography>

                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <hr className="login__hr-title" />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Tên"
                                name="name"
                                // onChange={(e)=>handleName(e)}
                                {...register('name')}
                                helperText={errors.name?.message}
                                error={errors.name ? true : false}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Số Điện Thoại"
                                name="phone"
                                // onChange={handlePhone}
                                {...register('phone')}
                                helperText={errors.phone?.message}
                                error={errors.phone ? true : false}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Địa chỉ Email"
                                name="email"
                                // onChange={handleEmail}
                                {...register('email')}
                                helperText={errors.email?.message}
                                error={errors.email? true : false}
                                autoFocus
                            />
                             <TextField
                                margin="normal"
                                required
                                type = "password"
                                fullWidth
                                id="password"
                                label="Mật khẩu"
                                name="password"
                                // onChange={handlePassword}
                                {...register('password')}
                                helperText={errors.password?.message}
                                error={errors.password ? true : false}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password_confirmation"
                                label="Nhập lại mật khẩu"
                                type = "password"
                                name="password_confirmation"
                                // onChange={}
                                {...register('password_confirmation')}
                                helperText={errors.password_confirmation?.message}
                                error={errors.password_confirmation ? true : false}
                                autoFocus
                            />
                            <div className="login__button">
                                <Button
                                    type="submit"
                                    fullWidth
                                    onClick={handleSubmit(onSubmit)}
                                    variant="contained"
                                    sx={{
                                        // mt: 3,
                                        // mb: 2,
                                        border: '1px solid #ed71a3',
                                        backgroundColor: '#ed71a3',
                                        color: "white",
                                        borderRadius: '50px',
                                        width: '50%',

                                    }}
                                >
                                    Đăng Kí
                                </Button>

                            </div>


                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        </React.Fragment>

    );
}