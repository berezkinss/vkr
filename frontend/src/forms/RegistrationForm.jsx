import { useForm, isEmail, hasLength} from '@mantine/form';
import { Button, Group, TextInput,Flex } from '@mantine/core';
import styles from './RegisterForm.module.css'
import {host} from '../axios.js'
import {useNavigate} from "react-router-dom";
import React from "react";
function RegistrationForm() {
  const navigate = useNavigate();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
    },

    validate: {
      name: hasLength({ min: 2, max: 20 }, 'Имя должно быть от 2 до 20 Символов'),
      surname: hasLength({ min: 2, max: 20 }, 'Фамилия должно быть от 2 до 20 Символов'),
      email: isEmail('Почта должна содержать домен "@"'),
      password: hasLength({ min: 2, max: 20 }, 'Пароль должнен быть от 2 до 20 Символов'),
    },
  });
  return (
<div className={styles.mainBox}>
    <form className={styles.container} onSubmit={form.onSubmit((values) => {
      console.log(values)
      const response = host.post("/auth/new_user", values)
          .then((res) => {
            if (res.status === 200) {
              // Success
              navigate('/home')
            } else {
              // Not success
            }
          })
      console.log(response)
    })}>
        <Flex direction='column' gap='md'>
          <TextInput
            label="Имя"
            placeholder="Имя"
            withAsterisk
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Фамилия"
            placeholder="Фамилия"
            withAsterisk
            key={form.key('surname')}
            {...form.getInputProps('surname')}
          />
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
    </form>
    </div>
  );
}

export default RegistrationForm;