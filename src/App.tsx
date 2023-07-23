import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Show,
  useSafeLayoutEffect,
  useStatStyles,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Game, Platform } from "./hooks/useGames";
import SortSelector from "./components/SortSelector";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [GameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar
          onSearch={(searchText) => setGameQuery({ ...GameQuery, searchText })}
        ></NavBar>
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenre={GameQuery.genre}
            onSelectGenre={(genre) => setGameQuery({ ...GameQuery, genre })}
          ></GenreList>
        </GridItem>
      </Show>
      <GridItem area="main">
        <Flex paddingLeft={2} marginBottom={5}>
          <Box marginRight={5}>
            <PlatformSelector
              selectedPlatform={GameQuery.platform}
              onSelectPlatform={(platform) =>
                setGameQuery({ ...GameQuery, platform })
              }
            ></PlatformSelector>
          </Box>
          <SortSelector
            onSelectSortOrder={(sortOrder) =>
              setGameQuery({ ...GameQuery, sortOrder })
            }
            sortOrder={GameQuery.sortOrder}
          ></SortSelector>
        </Flex>
        <GameGrid gameQuery={GameQuery}></GameGrid>
      </GridItem>
    </Grid>
  );
}

export default App;
