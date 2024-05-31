import React, { useState } from 'react';
import {List, TextInput, Button, Group, ListItem} from '@mantine/core';

const EditTournamentComponent = () => {
  const [tournamentName, setTournamentName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teamCount, setTeamCount] = useState('');
  const [referees, setReferees] = useState(['Судья 1', 'Судья 2', 'Судья 3']);

  const handleTournamentNameChange = (event) => {
    setTournamentName(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleTeamCountChange = (event) => {
    setTeamCount(event.target.value);
  };

  const handleSubmit = () => {
    // Обработать данные формы
    console.log({
      tournamentName,
      startDate,
      endDate,
      teamCount,
      referees,
    });
  };

  return (
    <div>
      <Group>
        <TextInput
          label="Название турнира"
          placeholder="Введите название"
          value={tournamentName}
          onChange={handleTournamentNameChange}
        />
      </Group>

      <Group>
        <TextInput
          label="Дата начала"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <TextInput
          label="Дата окончания"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </Group>

      <Group>
        <TextInput
          label="Количество команд"
          type="number"
          value={teamCount}
          onChange={handleTeamCountChange}
        />
      </Group>

      <Group title="Назначенные судьи">
        <List>
          {referees.map((referee) => (
            <ListItem key={referee}>
              <div className="referee-item">
                {referee}
                <span className="close-icon">×</span>
              </div>
            </ListItem>
          ))}
        </List>
      </Group>

      <Button onClick={handleSubmit}>Сохранить</Button>
    </div>
  );
};

export default EditTournamentComponent;