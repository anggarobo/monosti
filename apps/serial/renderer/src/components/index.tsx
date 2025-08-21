import { Box, Container, Paper, Text } from "@mantine/core";

import '@mantine/core/styles.css';

export default function Component() {
    return (
        <Container strategy="grid" size={500}>
            <Paper shadow="xs" p="xl">
                <Text>Paper is the most basic ui component</Text>
                <Text>
                    Use it to create cards, dropdowns, modals and other components that require background
                    with shadow
                </Text>
            </Paper>

            <Box data-breakout bg="var(--mantine-color-indigo-light)" mt="xs">
                <div>Breakout</div>

                <Box data-container bg="indigo" c="white" h={50}>
                <div>Container inside breakout</div>
                </Box>
            </Box>
        </Container>
    )
}