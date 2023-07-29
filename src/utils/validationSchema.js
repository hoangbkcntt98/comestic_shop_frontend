import * as Yup from 'yup';
export const signupValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Tên không được để trống')
        .max(50, 'Tên tối đa 50 kí tự'),
    email: Yup.string()
        .required('Email không được để trống')
        .email('Email không đúng định dạng'),
    password: Yup.string()
        .required('Mật khẩu không được để trống')
        .min(3, 'Mật khẩu có ít nhất 3 kí tự')
        .max(40, 'Mật khẩu tối đa 40 kí tự'),
    password_confirmation: Yup.string()
        .required('Yêu cầu nhập lại mật khẩu')
        .oneOf([Yup.ref('password'), null], 'Nhập lại mật khẩu không khớp'),
    phone: Yup.string()
        .required('Yêu cầu số điện thoại')
        .matches(/^[0-9]+$/, "SĐT phải là số")
        .min(10, 'Số điện thoại khô  ng đúng')
        .max(13, 'Số điện thoại không đúng- long')

});
export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email không được để trống')
        .email('Email không đúng định dạng'),
    password: Yup.string()
        .required('Mật khẩu không được để trống')
        .min(3, 'Mật khẩu có ít nhất 3 kí tự')
});
// export default validationSchema;