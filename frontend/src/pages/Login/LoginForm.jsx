import React from 'react';
import {hasLength, isEmail, useForm} from "@mantine/form";
import styles from "../../forms/RegisterForm.module.css";
import {host} from "../../axios.js";
import {Button, Flex, Group, TextInput} from "@mantine/core";
import {Link, useNavigate} from "react-router-dom";
import {useAuthStore} from "../../store/index.js";
import {notifications} from "@mantine/notifications";
import {useShallow} from "zustand/react/shallow";


const LoginForm = () => {
    const navigate = useNavigate()
    const setAuth = useAuthStore(useShallow(state => state.setAuth))

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: isEmail('Почтовый адрес должен содержать домен "@"'),
            password: hasLength({min: 2, max: 20}, 'Пароль должнен быть от 2 до 20 Символов'),
        },
    });
    return (
        <div className={styles.mainBox}>
            <form className={styles.container} onSubmit={form.onSubmit(async (values) => {
                await host.post("/auth/login", values)
                    .then(res => {
                        console.log(res)
                        if (res.status === 200) {
                            console.log('success')
                            setAuth(true)
                            navigate('/home')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        notifications.show({
                            title: 'Ошибка авторизации',
                            message: 'Пользователь не найден, пожалуйста введите корректный логин и пароль'
                        })
                    })
            })}>
                <Flex direction='column' gap='md'>
                    <TextInput
                        label="Ваша почта"
                        placeholder="Ваша почта"
                        withAsterisk
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        label="Ваш пароль"
                        placeholder="Ваш пароль"
                        withAsterisk
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />
                </Flex>
                <Group justify="flex-end" mt="md">
                    <Button type="Отправить">Отправить</Button>
                </Group>
                <div>Нет аккаунта? <Link to={'/registration'}>Зарегистрируйтесь!</Link></div>
            </form>
        </div>
    );
};

export default LoginForm;