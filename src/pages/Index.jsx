import { Box, Button, Container, Flex, Heading, IconButton, Input, SimpleGrid, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  const handleAddNote = () => {
    if (input.trim()) {
      setNotes([...notes, input]);
      setInput("");
    }
  };

  const handleDeleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  const bgColor = useColorModeValue("white", "gray.700");
  const colorScheme = "teal";

  return (
    <Container maxW="container.xl" p={5}>
      <VStack spacing={8}>
        <Flex w="full" justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="xl">
            Notes
          </Heading>
          <Flex>
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a new note..." size="md" mr={2} />
            <IconButton icon={<FaPlus />} onClick={handleAddNote} aria-label="Add note" colorScheme={colorScheme} />
          </Flex>
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
          {notes.map((note, index) => (
            <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg={bgColor} position="relative">
              <Text fontSize="md">{note}</Text>
              <IconButton icon={<FaTrash />} aria-label="Delete note" size="sm" colorScheme="red" position="absolute" top={2} right={2} onClick={() => handleDeleteNote(index)} />
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;
