import { Box, Text, Paper, Group, List, ListItem, Button } from '@mantine/core';

const TournamentForm = ({ tournamentData }) => {
  return (
    <Paper shadow="md" p={20}>
      <Group>
        <Text size="lg" weight="bold">{tournamentData.name}</Text>
        <Button color="blue" variant="outline">Изменить</Button>
      </Group>

      <Box mt={4}>
        <Text size="sm">Дата начала:</Text>
        <Text size="sm" weight="bold">{tournamentData.startDate}</Text>
      </Box>

      <Box mt={4}>
        <Text size="sm">Дата окончания:</Text>
        <Text size="sm" weight="bold">{tournamentData.endDate}</Text>
      </Box>

      <Box mt={4}>
        <Text size="sm">Количество команд:</Text>
        <Text size="sm" weight="bold">{tournamentData.numberOfTeams}</Text>
      </Box>

      <Box mt={4}>
        <Text size="sm">Активные судьи:</Text>
        <List>
          {tournamentData.activeReferees.map((referee) => (
            <ListItem key={referee}>{referee}</ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default TournamentForm;