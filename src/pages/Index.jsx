import { Box, Button, Container, Flex, Heading, IconButton, Input, SimpleGrid, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaStar, FaRegStar } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [input, setInput] = useState("");

  const handleAddNote = () => {
    if (input.trim()) {
      setNotes([...notes, input]);
      setInput("");
    }
  };

  const handleToggleFavorite = (index) => {
    setFavorites((prev) => {
      const newFavs = new Set(prev);
      if (newFavs.has(index)) {
        newFavs.delete(index);
      } else {
        newFavs.add(index);
      }
      return newFavs;
    });
  };

  const handleEditNote = (index, newValue) => {
    const newNotes = [...notes];
    newNotes[index] = newValue;
    setNotes(newNotes);
  };

  const handleDeleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
    setFavorites((prev) => {
      const newFavs = new Set(prev);
      newFavs.delete(index);
      return newFavs;
    });
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
              <Input value={note} onChange={(e) => handleEditNote(index, e.target.value)} size="md" variant="unstyled" />
              <IconButton icon={favorites.has(index) ? <FaStar /> : <FaRegStar />} aria-label="Toggle favorite" size="sm" colorScheme="yellow" position="absolute" top={2} left={2} onClick={() => handleToggleFavorite(index)} />
              <IconButton icon={<FaTrash />} aria-label="Delete note" size="sm" colorScheme="red" position="absolute" top={2} right={2} onClick={() => handleDeleteNote(index)} />
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;
