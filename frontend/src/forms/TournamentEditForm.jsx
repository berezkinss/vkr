import { useState, useEffect } from 'react';
import { Select,  Button, Group, Input, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import {DatePicker} from '@mantine/dates';

const TournamentEditForm = ({ tournament, onSubmit, onClose }) => {
  const [form, { setValues, errors, isValid }] = useForm({
    initialValues: {
      name: tournament?.name || '',
      startDate: tournament?.startDate || new Date(),
      endDate: tournament?.endDate || new Date(),
      teamCount: tournament?.teamCount || 2,
      referees: tournament?.referees || [],
    },
    validate: {
      name: (value) => value.trim().length > 0,
      startDate: (value) => value <= endDate,
      endDate: (value) => value >= startDate,
      teamCount: (value) => value >= 2,
      referees: (value) => value.length > 0,
    },
  });

  const [refereesList, setRefereesList] = useState([]);

  useEffect(() => {
    // Загрузить список судей из системы
    const fetchReferees = async () => {
      // ...
      setRefereesList(refereesData);
    };
    fetchReferees();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      onSubmit(form.values);
      onClose();
    }
  };

  return (
    <Modal title="Редактирование турнира" opened={true}>
      <form onSubmit={handleSubmit}>
        <Group>
          <Input
            label="Название турнира"
            placeholder="Введите название"
            value={form.values.name}
            onChange={(event) => setValues({ name: event.target.value })}
            error={errors.name}
          />
          <DatePicker
            label="Дата начала"
            placeholder="Выберите дату"
            value={form.values.startDate}
            onChange={(date) => setValues({ startDate: date })}
            error={errors.startDate}
          />
          <DatePicker
            label="Дата окончания"
            placeholder="Выберите дату"
            value={form.values.endDate}
            onChange={(date) => setValues({ endDate: date })}
            error={errors.endDate}
          />
        </Group>

        <Group>
          <Input
            label="Количество команд"
            type="number"
            placeholder="Введите количество"
            value={form.values.teamCount}
            onChange={(event) => setValues({ teamCount: parseInt(event.target.value) })}
            error={errors.teamCount}
          />
          <Select
            label="Активные судьи"
            placeholder="Выберите судей"
            multiple
            value={form.values.referees}
            onChange={(value) => setValues({ referees: value })}
            data={refereesList.map((referee) => ({ label: referee.name, value: referee.id }))}
            error={errors.referees}
          />
        </Group>

        <Group mt="md">
          <Button type="submit" disabled={!isValid}>Сохранить</Button>
          <Button type="button" onClick={onClose}>Отмена</Button>
        </Group>
      </form>
    </Modal>
  );
};
export default TournamentEditForm;