import { useState } from "react";
import { Container, Button, SimpleGrid, Text, VStack, Box } from "@chakra-ui/react";
import { FaTimes, FaRegCircle } from "react-icons/fa";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index) => {
    return (
      <Button h="20" w="20" fontSize="3xl" onClick={() => handleClick(index)} colorScheme={board[index] === "X" ? "red" : "blue"}>
        {board[index] === "X" ? <FaTimes /> : board[index] === "O" ? <FaRegCircle /> : ""}
      </Button>
    );
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">{winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`}</Text>
        <SimpleGrid columns={3} spacing={2}>
          {Array.from({ length: 9 }).map((_, index) => (
            <Box key={index}>{renderSquare(index)}</Box>
          ))}
        </SimpleGrid>
        <Button mt={4} colorScheme="teal" onClick={restartGame}>
          Restart Game
        </Button>
      </VStack>
    </Container>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Index;
